import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Lightweight SEO component for blog pages.
 * Manually sets <title>, meta tags, and injects JSON-LD structured data.
 * No external dependencies (avoids react-helmet crashes).
 */
const BlogSEO = ({ post, type = 'article' }) => {
  useEffect(() => {
    if (!post) return;

    const siteUrl = 'https://birat.codes';
    const isArticle = type === 'article';
    const postUrl = isArticle
      ? `${siteUrl}/blog/${post.slug}`
      : `${siteUrl}/blog`;
    const authorName = post.author || 'Birat Gautam';
    const authorUrl = post.authorUrl || `${siteUrl}/#profile`;
    const toIso = (value) => {
      if (!value) return null;
      const d = new Date(value);
      return Number.isNaN(d.getTime()) ? null : d.toISOString();
    };

    const publishedAt = toIso(post.date);
    const modifiedAt = post.dateModified
      ? toIso(post.dateModified)
      : publishedAt;

    // Page title
    document.title =
      type === 'list'
        ? "Birat's Notebook — Deep dives into AI, MLOps & Engineering"
        : `${post.title} | Birat Gautam`;

    // Helper to set/create meta tags
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (isArticle) {
      setMeta('name', 'description', post.excerpt);
      setMeta('name', 'author', authorName);
      setMeta('name', 'article:published_time', publishedAt || '');
      setMeta('name', 'article:modified_time', modifiedAt || '');

      // Open Graph
      setMeta('property', 'og:type', 'article');
      setMeta('property', 'og:title', post.title);
      setMeta('property', 'og:description', post.excerpt);
      setMeta('property', 'og:url', postUrl);
      if (post.coverImage) {
        setMeta('property', 'og:image', `${siteUrl}${post.coverImage}`);
      }

      // Twitter Card
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', post.title);
      setMeta('name', 'twitter:description', post.excerpt);

      // Canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', postUrl);

      // JSON-LD Article structured data
      let ldScript = document.getElementById('blog-jsonld');
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.id = 'blog-jsonld';
        ldScript.type = 'application/ld+json';
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        author: {
          '@type': 'Person',
          name: authorName,
          url: authorUrl,
        },
        datePublished: publishedAt,
        dateModified: modifiedAt,
        url: postUrl,
        mainEntityOfPage: postUrl,
        ...(post.coverImage && {
          image: `${siteUrl}${post.coverImage}`,
        }),
        publisher: {
          '@type': 'Person',
          name: authorName,
          url: siteUrl,
        },
      });
    } else {
      setMeta(
        'name',
        'description',
        'Deep dives into AI Agents, MLOps, and the systems behind intelligence.',
      );
      setMeta('property', 'og:type', 'website');
      setMeta(
        'property',
        'og:title',
        "Birat's Notebook — Deep dives into AI, MLOps & Engineering",
      );
      setMeta(
        'property',
        'og:description',
        'Deep dives into AI Agents, MLOps, and the systems behind intelligence.',
      );
      setMeta('property', 'og:url', `${siteUrl}/blog`);
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta(
        'name',
        'twitter:title',
        "Birat's Notebook — Deep dives into AI, MLOps & Engineering",
      );
      setMeta(
        'name',
        'twitter:description',
        'Deep dives into AI Agents, MLOps, and the systems behind intelligence.',
      );

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `${siteUrl}/blog`);
    }

    // Cleanup on unmount — restore original title
    return () => {
      document.title = 'Birat Gautam | AI/ML Engineer & Full Stack Developer';
      const ldScript = document.getElementById('blog-jsonld');
      if (ldScript) ldScript.remove();
    };
  }, [post, type]);

  return null; // This component renders nothing — it's side-effect only
};

BlogSEO.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string,
    author: PropTypes.string,
    authorUrl: PropTypes.string,
    date: PropTypes.string,
    dateModified: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    coverImage: PropTypes.string,
  }),
  type: PropTypes.string,
};

export default BlogSEO;
