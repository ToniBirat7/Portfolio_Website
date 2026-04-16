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

  return (
    <div className="blog-page">
      <BlogSEO post={{ slug: '' }} type="list" />
      <BlogNav />

      <main className="blog-home">
        <header className="blog-hero">
          <h1>Birat&apos;s Notebook</h1>
          <p>
            Deep dives into AI Agents, MLOps, and the systems behind
            intelligence.
          </p>
        </header>

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
          <a href="/privacy-policy">Privacy Policy</a>
          <span> · </span>
          <a href="/terms">Terms</a>
        </p>
      </footer>
    </div>
  );
};

export default BlogHome;
