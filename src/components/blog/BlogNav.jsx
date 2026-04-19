import { Link } from 'react-router-dom';
import './BlogNav.css';

const BlogIcon = ({ name }) => {
  switch (name) {
    case 'back':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      );
    case 'user':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20 21a8 8 0 10-16 0" />
          <circle cx="12" cy="8" r="4" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 6h16v12H4z" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
        </svg>
      );
    case 'file':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case 'rss':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 11a9 9 0 019 9" />
          <path d="M4 4a16 16 0 0116 16" />
          <circle cx="6" cy="18" r="1.5" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.72c-2.78.61-3.37-1.16-3.37-1.16-.46-1.18-1.13-1.5-1.13-1.5-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.55 2.36 1.1 2.93.84.09-.66.35-1.1.64-1.35-2.22-.26-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.03a9.4 9.4 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.42.2 2.46.1 2.72.64.7 1.03 1.59 1.03 2.68 0 3.83-2.35 4.67-4.58 4.93.36.31.69.92.69 1.86v2.76c0 .27.18.58.69.48A10 10 0 0012 2z" />
        </svg>
      );
    default:
      return null;
  }
};

const BlogNav = () => {
  return (
    <nav className="blog-nav" aria-label="Blog navigation">
      <div className="blog-nav-content">
        <Link to="/" className="blog-nav-back" aria-label="Back to portfolio">
          <BlogIcon name="back" />
          <span>Portfolio</span>
        </Link>

        <Link to="/blog" className="blog-nav-brand">
          birat<span className="brand-dot">.</span>codes
          <span className="brand-slash">/</span>blog
        </Link>

        <div className="blog-nav-actions">
          <Link to="/about" className="blog-nav-icon" aria-label="About">
            <BlogIcon name="user" />
          </Link>
          <Link to="/contact" className="blog-nav-icon" aria-label="Contact">
            <BlogIcon name="mail" />
          </Link>
          <Link
            to="/privacy-policy"
            className="blog-nav-icon"
            aria-label="Privacy Policy"
          >
            <BlogIcon name="shield" />
          </Link>
          <Link
            to="/terms"
            className="blog-nav-icon"
            aria-label="Terms of Service"
          >
            <BlogIcon name="file" />
          </Link>
          <a
            href="/rss.xml"
            className="blog-nav-icon"
            title="RSS Feed"
            aria-label="RSS Feed"
          >
            <BlogIcon name="rss" />
          </a>
          <a
            href="https://github.com/ToniBirat7"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-nav-icon"
            aria-label="GitHub"
          >
            <BlogIcon name="github" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default BlogNav;
