import {
  calcReadTime,
  extractTOC,
  normalizeFaqs,
  normalizeStringArray,
  parseFrontmatter,
} from './frontmatter.js';

export const getPosts = async () => {
  const modules = import.meta.glob('../content/blog/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  });

  return Object.entries(modules)
    .map(([path, raw]) => {
      const slug = path.split('/').pop().replace('.md', '');
      const { attributes, content } = parseFrontmatter(raw);

      // Normalize tags to always be an array
      let tags = normalizeStringArray(attributes.tags);
      // Also keep legacy single `tag` field
      if (!tags.length && attributes.tag) {
        tags = [attributes.tag];
      }

      const relatedTags = normalizeStringArray(attributes.relatedTags);
      const faqs = normalizeFaqs(attributes.faqs);

      return {
        slug,
        title: attributes.title || slug,
        date: attributes.date || '',
        dateModified:
          attributes.dateModified ||
          attributes.updated ||
          attributes.date ||
          '',
        tags,
        tag: tags[0] || attributes.tag || '',
        relatedTags,
        excerpt: attributes.excerpt || attributes.description || '',
        seoDescription:
          attributes.seoDescription ||
          attributes.excerpt ||
          attributes.description ||
          '',
        readTime: attributes.readTime || calcReadTime(content),
        coverImage: attributes.coverImage || null,
        author: attributes.author || 'Birat Gautam',
        authorUrl: attributes.authorUrl || 'https://birat.codes/#profile',
        authorSameAs: normalizeStringArray(attributes.authorSameAs),
        difficulty: attributes.difficulty || '',
        topic: attributes.topic || tags[0] || '',
        faqs,
        monetizationCTA: attributes.monetizationCTA || null,
        content,
        toc: extractTOC(content),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostBySlug = async (slug) => {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
};

export const getAdjacentPosts = async (currentSlug) => {
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === currentSlug);

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
};
