import {
  calcReadTime,
  extractTOC,
  isPostPublished,
  normalizeFaqs,
  normalizeStringArray,
  parseFrontmatter,
} from './frontmatter.js';

const normalizeAssetPath = (value) => {
  if (!value) return null;

  const raw = String(value).trim();
  if (/^(https?:|data:|blob:)/i.test(raw)) return raw;

  let normalized = raw
    .replace(/^\.\/+/, '')
    .replace(/^public\//, '')
    .replace(/^\/public\//, '/');

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  return normalized;
};

const scoreRelatedPosts = (current, candidate) => {
  if (current.slug === candidate.slug) return -1;

  const currentTags = new Set(
    [...(current.tags || []), current.topic].filter(Boolean),
  );
  const candidateTags = [...(candidate.tags || []), candidate.topic].filter(
    Boolean,
  );

  let score = 0;
  candidateTags.forEach((tag) => {
    if (currentTags.has(tag)) score += 3;
  });

  const currentWords = new Set(
    `${current.title} ${current.excerpt} ${current.topic}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 3),
  );

  const candidateWords =
    `${candidate.title} ${candidate.excerpt} ${candidate.topic}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 3);

  candidateWords.forEach((word) => {
    if (currentWords.has(word)) score += 1;
  });

  return score;
};

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

      if (!isPostPublished(attributes)) {
        return null;
      }

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
        coverImage: normalizeAssetPath(attributes.coverImage),
        author: attributes.author || 'Birat Gautam',
        authorUrl: attributes.authorUrl || 'https://biratcodes.dev/#profile',
        authorSameAs: normalizeStringArray(attributes.authorSameAs),
        difficulty: attributes.difficulty || '',
        topic: attributes.topic || tags[0] || '',
        faqs,
        monetizationCTA: attributes.monetizationCTA || null,
        content,
        toc: extractTOC(content),
      };
    })
    .filter(Boolean)
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

export const getRelatedPosts = async (currentSlug, limit = 3) => {
  const posts = await getPosts();
  const current = posts.find((post) => post.slug === currentSlug);
  if (!current) return [];

  return posts
    .map((candidate) => ({
      post: candidate,
      score: scoreRelatedPosts(current, candidate),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
};
