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
          birat<span className="brand-dot">.</span>codes<span className="brand-slash">/</span>blog
        </Link>

        <div className="blog-nav-actions">
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
