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
    const description = post.seoDescription || post.excerpt || '';
    const authorSameAs =
      Array.isArray(post.authorSameAs) && post.authorSameAs.length
        ? post.authorSameAs
        : [authorUrl];
    const keywords = [...(post.tags || []), ...(post.relatedTags || [])].filter(
      Boolean,
    );
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
      setMeta('name', 'description', description);
      setMeta('name', 'author', authorName);
      setMeta('property', 'article:published_time', publishedAt || '');
      setMeta('property', 'article:modified_time', modifiedAt || '');
      if (keywords.length) {
        setMeta('name', 'keywords', keywords.join(', '));
      }

      // Open Graph
      setMeta('property', 'og:type', 'article');
      setMeta('property', 'og:title', post.title);
      setMeta('property', 'og:description', description);
      setMeta('property', 'og:url', postUrl);
      if (post.coverImage) {
        setMeta('property', 'og:image', `${siteUrl}${post.coverImage}`);
      }

      // Twitter Card
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', post.title);
      setMeta('name', 'twitter:description', description);

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
      const schemas = [
        {
          '@type': 'WebPage',
          '@id': postUrl,
          url: postUrl,
          name: post.title,
          description,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: `${siteUrl}/blog`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: postUrl,
            },
          ],
        },
        {
          '@type': 'BlogPosting',
          headline: post.title,
          description,
          author: {
            '@type': 'Person',
            name: authorName,
            url: authorUrl,
            sameAs: authorSameAs,
          },
          datePublished: publishedAt,
          dateModified: modifiedAt,
          url: postUrl,
          mainEntityOfPage: postUrl,
          articleSection: post.tags || [],
          keywords: keywords.join(', '),
          ...(post.coverImage && {
            image: {
              '@type': 'ImageObject',
              url: `${siteUrl}${post.coverImage}`,
              width: 1200,
              height: 630,
            },
          }),
          publisher: {
            '@type': 'Person',
            name: authorName,
            url: siteUrl,
          },
        },
      ];

      if (Array.isArray(post.faqs) && post.faqs.length) {
        schemas.push({
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        });
      }

      ldScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': schemas,
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
    seoDescription: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    relatedTags: PropTypes.arrayOf(PropTypes.string),
    authorSameAs: PropTypes.arrayOf(PropTypes.string),
    faqs: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
      }),
    ),
  }),
  type: PropTypes.string,
};

export default BlogSEO;
