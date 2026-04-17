import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../utils/blogLoader';
import BlogNav from './BlogNav';
import BlogSEO from './BlogSEO';
import './BlogHome.css';
import { trackEvent } from '../../utils/analytics.js';
import NewsletterSignup from './NewsletterSignup.jsx';

const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getPosts();
      setPosts(allPosts);
      setLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    trackEvent('blog_index_view', {
      post_count: posts.length,
    });
  }, [posts.length]);

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="blog-spinner"></div>
      </div>
    );
  }

  const featuredPosts = posts.slice(0, 3);
  const focusTopics = [
    ...new Set(posts.flatMap((post) => post.tags).filter(Boolean)),
  ].slice(0, 6);

  return (
    <div className="blog-page blog-home-page">
      <BlogSEO post={{ slug: '' }} type="list" />
      <BlogNav />

      <main className="blog-home">
        <header className="blog-hero">
          <span className="blog-hero-kicker">Field notes for builders</span>
          <h1>Birat&apos;s Notebook</h1>
          <p>
            Practical, opinionated posts on AI systems, production engineering,
            and the lessons that only show up after you ship.
          </p>
          <div className="blog-hero-metrics" aria-label="Blog summary">
            <div>
              <strong>{posts.length}</strong>
              <span>articles</span>
            </div>
            <div>
              <strong>{focusTopics.length}</strong>
              <span>topics</span>
            </div>
            <div>
              <strong>reader-first</strong>
              <span>editorial focus</span>
            </div>
          </div>
          {focusTopics.length > 0 && (
            <div className="blog-topic-row" aria-label="Focus topics">
              {focusTopics.map((topic) => (
                <span key={topic} className="blog-topic-pill">
                  {topic}
                </span>
              ))}
            </div>
          )}
        </header>

        {featuredPosts.length > 0 && (
          <section className="featured-posts" aria-label="Featured articles">
            <h2>Featured reads</h2>
            <div className="featured-grid">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="featured-card"
                >
                  <span className="featured-tag">Featured</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <NewsletterSignup source="blog_home" />

        {posts.length > 0 ? (
          <section className="post-list" aria-label="Blog posts">
            {posts.map((post) => (
              <article className="post-item" key={post.slug}>
                <div className="post-item-meta">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </time>
                  <span className="meta-sep">•</span>
                  <span>{post.readTime} min read</span>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="post-item-link"
                  onClick={() =>
                    trackEvent('blog_post_open', {
                      post_slug: post.slug,
                      post_title: post.title,
                      position:
                        posts.findIndex((item) => item.slug === post.slug) + 1,
                    })
                  }
                >
                  <h2>{post.title}</h2>
                </Link>
                <p className="post-item-excerpt">{post.excerpt}</p>
                <div className="post-item-tags">
                  {post.tags.map((tag) => (
                    <span className="tag-pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="blog-empty">
            <p>
              No posts found. Please check back shortly for new technical
              articles.
            </p>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p>
          &copy; {new Date().getFullYear()} Birat Gautam. All rights reserved.
        </p>
        <p className="site-footer-links">
          <a href="/about">About</a>
          <span> · </span>
          <a href="/contact">Contact</a>
          <span> · </span>
          <a href="/privacy-policy">Privacy Policy</a>
          <span> · </span>
          <a href="/terms">Terms</a>
        </p>
      </footer>
    </div>
  );
};

export default BlogHome;
