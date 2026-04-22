import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { marked } from 'marked';
import NavBar from './NavBar';
import ScrollProgress from './ScrollProgress';
import { trackPageView } from '../utils/analytics';
import './Page.css';

/**
 * Generic page wrapper for static content pages.
 * Fetches and renders markdown content at runtime.
 */
export default function Page({ filename, title }) {
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const siteUrl = 'https://biratcodes.dev';
    const canonicalUrl = `${siteUrl}${location.pathname}`;

    if (title) {
      document.title = `${title} | Birat Gautam`;
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('property', 'og:url', canonicalUrl);
    setMeta('name', 'twitter:url', canonicalUrl);
  }, [location.pathname, title]);

  useEffect(() => {
    // Track page view
    trackPageView(location.pathname, title || document.title);
  }, [location.pathname, title]);

  useEffect(() => {
    // Fetch markdown file dynamically at runtime
    fetch(`/content/pages/${filename}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Page not found');
        return res.text();
      })
      .then((mdText) => {
        // Parse frontmatter if present
        const match = mdText.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        const contentText = match ? match[2] : mdText;

        // Convert markdown to HTML
        const html = marked(contentText);
        setContent(html);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [filename]);

  if (loading) return <div className="page-loading">Loading...</div>;
  if (error) return <div className="page-error">Error loading page</div>;

  return (
    <>
      <ScrollProgress />
      <NavBar />
      <div className="page-container">
        <article
          className="page-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
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
    </>
  );
}

Page.propTypes = {
  filename: PropTypes.string.isRequired,
  title: PropTypes.string,
};
