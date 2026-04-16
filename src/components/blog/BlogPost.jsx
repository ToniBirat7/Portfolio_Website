import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getAdjacentPosts } from '../../utils/blogLoader';
import BlogNav from './BlogNav';
import BlogSEO from './BlogSEO';
import PostBody from './PostBody';
import './BlogPost.css';

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
  };

  return (
    <div className="share-row">
      <a
        href={`https://x.com/intent/post?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noreferrer"
        title="Share on X"
      >
        <i className="fab fa-x-twitter"></i>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noreferrer"
        title="Share on LinkedIn"
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
            <img src={post.coverImage} alt={post.title} loading="lazy" />
          </figure>
        )}

        {/* ── Content + TOC Grid ── */}
        <div className="post-grid">
          <PostBody content={post.content} />
          <TableOfContents toc={post.toc} />
        </div>

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
    </div>
  );
};

export default BlogPost;
