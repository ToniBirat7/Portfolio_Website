import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getAdjacentPosts } from '../../utils/blogLoader';
import BlogNav from './BlogNav';
import BlogSEO from './BlogSEO';
import PostBody from './PostBody';
import AdSlot from '../AdSlot';
import './BlogPost.css';
import { trackEvent, trackScrollDepth } from '../../utils/analytics.js';
import NewsletterSignup from './NewsletterSignup.jsx';

/* ── Reading Progress Bar ──────────────────────── */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-label="Reading progress"
    />
  );
};

/* ── Table of Contents (sticky sidebar) ────────── */
const TableOfContents = ({ toc }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc.length) return null;

  return (
    <aside className="toc-sidebar" aria-label="Table of contents">
      <div className="toc-sticky">
        <h4 className="toc-title">On this page</h4>
        <ul className="toc-list">
          {toc.map(({ id, text, level }) => (
            <li
              key={id}
              className={`toc-item ${level === 3 ? 'toc-sub' : ''} ${activeId === id ? 'toc-active' : ''}`}
            >
              <a href={`#${id}`}>{text}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

TableOfContents.propTypes = {
  toc: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

/* ── Share Buttons ─────────────────────────────── */
const ShareRow = ({ title }) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    trackEvent('share_copy_link', {
      title,
      url,
    });
  };

  const shareClick = (network) => {
    trackEvent('share_click', {
      network,
      title,
      url,
    });
  };

  return (
    <div className="share-row">
      <a
        href={`https://x.com/intent/post?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noreferrer"
        title="Share on X"
        onClick={() => shareClick('x')}
      >
        <i className="fab fa-x-twitter"></i>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noreferrer"
        title="Share on LinkedIn"
        onClick={() => shareClick('linkedin')}
      >
        <i className="fab fa-linkedin-in"></i>
      </a>
      <button onClick={copyLink} className="share-copy" title="Copy link">
        <i className="fas fa-link"></i>
      </button>
    </div>
  );
};

ShareRow.propTypes = {
  title: PropTypes.string.isRequired,
};

const MonetizationPanel = ({ post }) => {
  const ctaType = post.monetizationCTA?.type || 'newsletter';
  const primaryLabel =
    post.monetizationCTA?.primaryLabel ||
    (ctaType === 'consulting' ? 'Book a call' : 'Join the newsletter');
  const primaryHref =
    post.monetizationCTA?.primaryHref ||
    (ctaType === 'consulting' ? '/#contact' : '/#contact');
  const secondaryLabel =
    post.monetizationCTA?.secondaryLabel || 'View services';
  const secondaryHref = post.monetizationCTA?.secondaryHref || '/#contact';
  const bodyCopy =
    post.monetizationCTA?.copy ||
    'If this post was useful, stay close to the next deep dive or reach out when you want help applying it in a real project.';

  return (
    <section className="post-cta" aria-label="Next steps">
      <div className="post-cta-copy">
        <span className="post-cta-kicker">Next step</span>
        <h2>
          {ctaType === 'consulting'
            ? 'Need help applying this in a real system?'
            : 'Keep the technical edge sharp.'}
        </h2>
        <p>{bodyCopy}</p>
      </div>
      <div className="post-cta-actions">
        <a
          className="post-cta-primary"
          href={primaryHref}
          onClick={() =>
            trackEvent('cta_click', {
              cta_type: ctaType,
              cta_label: primaryLabel,
              cta_target: primaryHref,
              post_slug: post.slug,
            })
          }
        >
          {primaryLabel}
        </a>
        <a
          className="post-cta-secondary"
          href={secondaryHref}
          onClick={() =>
            trackEvent('cta_click', {
              cta_type: ctaType,
              cta_label: secondaryLabel,
              cta_target: secondaryHref,
              post_slug: post.slug,
            })
          }
        >
          {secondaryLabel}
        </a>
      </div>
    </section>
  );
};

MonetizationPanel.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string,
    monetizationCTA: PropTypes.shape({
      type: PropTypes.string,
      copy: PropTypes.string,
      primaryLabel: PropTypes.string,
      primaryHref: PropTypes.string,
      secondaryLabel: PropTypes.string,
      secondaryHref: PropTypes.string,
    }),
  }).isRequired,
};

/* ── Main BlogPost Component ───────────────────── */
const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [adjacent, setAdjacent] = useState({ prev: null, next: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      const data = await getPostBySlug(slug);
      const adj = await getAdjacentPosts(slug);
      setPost(data);
      setAdjacent(adj);
      setLoading(false);
    };
    load();
  }, [slug]);

  useEffect(() => {
    if (!post) return undefined;

    trackEvent('post_view', {
      post_slug: post.slug,
      post_title: post.title,
      read_time: post.readTime,
      topic: post.topic,
      tags: post.tags,
    });

    const thresholds = new Set([25, 50, 75, 100]);
    let lastSent = 0;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const depth =
        total > 0 ? Math.min(100, Math.round((scrolled / total) * 100)) : 0;

      for (const threshold of thresholds) {
        if (depth >= threshold && lastSent < threshold) {
          trackScrollDepth(threshold);
          lastSent = threshold;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [post]);

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="blog-spinner"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-page">
        <BlogNav />
        <div className="blog-not-found">
          <h2>Post not found</h2>
          <Link to="/blog">← Back to all posts</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <BlogSEO post={post} />
      <ReadingProgress />
      <BlogNav />

      <article className="post-article">
        {/* ── Header ── */}
        <header className="post-hero">
          <div className="post-hero-meta">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="meta-sep">•</span>
            <span>{post.readTime} min read</span>
            {post.difficulty && (
              <>
                <span className="meta-sep">•</span>
                <span className="meta-pill">{post.difficulty}</span>
              </>
            )}
          </div>
          <h1>{post.title}</h1>
          <p className="post-hero-desc">{post.excerpt}</p>
          <div className="post-hero-author">
            <span>By {post.author}</span>
          </div>
        </header>

        {/* ── Cover Image ── */}
        {post.coverImage && (
          <figure className="post-cover">
            <img
              src={post.coverImage}
              alt={post.title}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </figure>
        )}

        {/* ── Content + TOC Grid ── */}
        <div className="post-grid">
          <PostBody content={post.content} postSlug={post.slug} />
          <TableOfContents toc={post.toc} />
        </div>

        {/* ── Ad Slot (inline, after content) ── */}
        <AdSlot placement="blog-inline" width="300px" height="250px" />

        <NewsletterSignup source="blog_post" postSlug={post.slug} />

        <MonetizationPanel post={post} />

        {/* ── Post Footer ── */}
        <footer className="post-end">
          {/* Tags */}
          <div className="post-end-tags">
            {post.tags.map((tag) => (
              <span className="tag-pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <ShareRow title={post.title} />

          {/* Prev/Next */}
          <nav className="post-adjacent" aria-label="Adjacent posts">
            <div className="adj-link adj-prev">
              {adjacent.prev && (
                <Link to={`/blog/${adjacent.prev.slug}`}>
                  <span className="adj-label">← Previous</span>
                  <span className="adj-title">{adjacent.prev.title}</span>
                </Link>
              )}
            </div>
            <div className="adj-link adj-next">
              {adjacent.next && (
                <Link to={`/blog/${adjacent.next.slug}`}>
                  <span className="adj-label">Next →</span>
                  <span className="adj-title">{adjacent.next.title}</span>
                </Link>
              )}
            </div>
          </nav>
        </footer>
      </article>

      <footer className="site-footer">
        <p>
          &copy; {new Date().getFullYear()} Birat Gautam. All rights reserved.
        </p>
        <p className="site-footer-links">
          <a href="/about">About</a>
          <span> · </span>
          <a href="/privacy-policy">Privacy Policy</a>
          <span> · </span>
          <a href="/terms">Terms</a>
        </p>
      </footer>
    </div>
  );
};

export default BlogPost;
