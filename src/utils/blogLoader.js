/**
 * Blog post loader & parser.
 * Discovers .md files via Vite glob, parses YAML frontmatter,
 * extracts table-of-contents headings, and calculates read time.
 */

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { attributes: {}, content: raw };

  const frontmatterStr = match[1];
  const content = match[2].trim();

  const attributes = {};
  for (const line of frontmatterStr.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Handle arrays: tags: ["AI", "MCP", "Agents"]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''));
    }
    // Strip surrounding quotes
    else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    // Numbers
    else if (!isNaN(value) && value !== '') {
      value = Number(value);
    }

    attributes[key] = value;
  }

  return { attributes, content };
}

/**
 * Extract h2/h3 headings from markdown for Table of Contents.
 */
function extractTOC(markdown) {
  const headings = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let m;
  while ((m = regex.exec(markdown)) !== null) {
    headings.push({
      level: m[1].length, // 2 or 3
      text: m[2].trim(),
      id: m[2]
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-'),
    });
  }
  return headings;
}

/**
 * Calculate reading time from word count (~238 wpm average).
 */
function calcReadTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 238));
}

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
      let tags = attributes.tags || [];
      if (typeof tags === 'string') tags = [tags];
      // Also keep legacy single `tag` field
      if (!tags.length && attributes.tag) {
        tags = [attributes.tag];
      }

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
        excerpt: attributes.excerpt || attributes.description || '',
        readTime: attributes.readTime || calcReadTime(content),
        coverImage: attributes.coverImage || null,
        author: attributes.author || 'Birat Gautam',
        authorUrl: attributes.authorUrl || 'https://birat.codes/#profile',
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
