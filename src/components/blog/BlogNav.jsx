import { Link } from 'react-router-dom';
import './BlogNav.css';

const BlogNav = () => {
  return (
    <nav className="blog-nav" aria-label="Blog navigation">
      <div className="blog-nav-content">
        <Link to="/" className="blog-nav-back" aria-label="Back to portfolio">
          <i className="fas fa-arrow-left" aria-hidden="true"></i>
          <span>Portfolio</span>
        </Link>

        <Link to="/blog" className="blog-nav-brand">
          birat<span className="brand-dot">.</span>codes
          <span className="brand-slash">/</span>blog
        </Link>

        <div className="blog-nav-actions">
          <Link to="/about" className="blog-nav-icon" aria-label="About">
            <i className="fas fa-user" aria-hidden="true"></i>
          </Link>
          <Link
            to="/privacy-policy"
            className="blog-nav-icon"
            aria-label="Privacy Policy"
          >
            <i className="fas fa-shield-alt" aria-hidden="true"></i>
          </Link>
          <Link
            to="/terms"
            className="blog-nav-icon"
            aria-label="Terms of Service"
          >
            <i className="fas fa-file-contract" aria-hidden="true"></i>
          </Link>
          <a
            href="/rss.xml"
            className="blog-nav-icon"
            title="RSS Feed"
            aria-label="RSS Feed"
          >
            <i className="fas fa-rss" aria-hidden="true"></i>
          </a>
          <a
            href="https://github.com/ToniBirat7"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-nav-icon"
            aria-label="GitHub"
          >
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default BlogNav;
