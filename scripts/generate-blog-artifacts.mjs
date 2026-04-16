import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITE_URL = 'https://birat.codes';
const BLOG_BASE = `${SITE_URL}/blog`;

function slugFromFile(fileName) {
  return fileName.replace(/\.md$/, '');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { attributes: {}, content: raw.trim() };

  const attributes = {};
  const frontmatterStr = match[1];
  const content = match[2].trim();

  for (const line of frontmatterStr.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else if (!Number.isNaN(Number(value)) && value !== '') {
      value = Number(value);
    }

    attributes[key] = value;
  }

  return { attributes, content };
}

function toIsoDate(input) {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function toDateOnly(input) {
  const iso = toIsoDate(input);
  if (!iso) return null;
  return iso.split('T')[0];
}

function escapeXml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/[>*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function loadPosts() {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
  const markdownFiles = entries.filter(
    (e) => e.isFile() && e.name.endsWith('.md'),
  );

  const posts = [];

  for (const file of markdownFiles) {
    const fullPath = path.join(CONTENT_DIR, file.name);
    const raw = await fs.readFile(fullPath, 'utf8');
    const { attributes, content } = parseFrontmatter(raw);
    const slug = slugFromFile(file.name);

    let tags = attributes.tags || [];
    if (typeof tags === 'string') tags = [tags];
    if (!tags.length && attributes.tag) tags = [attributes.tag];

    const datePublished =
      toIsoDate(attributes.date) || new Date().toISOString();
    const dateModified =
      toIsoDate(
        attributes.dateModified || attributes.updated || attributes.date,
      ) || datePublished;

    posts.push({
      slug,
      url: `${BLOG_BASE}/${slug}`,
      title: attributes.title || slug,
      excerpt: attributes.excerpt || attributes.description || '',
      author: attributes.author || 'Birat Gautam',
      authorUrl: attributes.authorUrl || `${SITE_URL}/#profile`,
      tags,
      coverImage: attributes.coverImage || '',
      datePublished,
      dateModified,
      content,
    });
  }

  posts.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
  return posts;
}

function buildSitemap(posts) {
  const urls = [
    {
      loc: `${SITE_URL}/`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${BLOG_BASE}`,
      lastmod: posts[0]?.dateModified || new Date().toISOString(),
    },
    ...posts.map((post) => ({
      loc: post.url,
      lastmod: post.dateModified,
    })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${escapeXml(u.lastmod)}</lastmod>\n  </url>`,
    ),
    '</urlset>',
    '',
  ].join('\n');

  return xml;
}

function buildRss(posts) {
  const items = posts
    .map((post) => {
      const description = escapeXml(
        post.excerpt || stripMarkdown(post.content).slice(0, 240),
      );
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(post.url)}</link>`,
        `      <guid>${escapeXml(post.url)}</guid>`,
        `      <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>`,
        `      <description>${description}</description>`,
        ...post.tags.map(
          (tag) => `      <category>${escapeXml(tag)}</category>`,
        ),
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    "    <title>Birat's Notebook</title>",
    `    <link>${BLOG_BASE}</link>`,
    '    <description>Deep dives into AI Agents, MLOps, and the systems behind intelligence.</description>',
    '    <language>en-US</language>',
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

function buildLlmsTxt(posts) {
  const lines = [
    '# Birat Gautam Portfolio and Blog',
    '',
    '> Personal portfolio and technical blog focused on AI engineering, MCP, RAG systems, and production ML workflows.',
    '',
    'Use this file as a curated index of high-value pages for question answering and retrieval.',
    '',
    '## Primary Pages',
    '',
    `- [Portfolio Home](${SITE_URL}/): Overview, profile, projects, achievements, and contact.`,
    `- [Blog Home](${BLOG_BASE}): All technical posts with metadata.`,
    '',
    '## Blog Posts',
    '',
    ...posts.map(
      (post) =>
        `- [${post.title}](${post.url}): ${post.excerpt || 'Technical article.'}`,
    ),
    '',
    '## Optional',
    '',
    `- [Sitemap](${SITE_URL}/sitemap.xml): Full indexable URL list.`,
    `- [RSS Feed](${SITE_URL}/rss.xml): Recent publishing updates.`,
    '',
  ];

  return lines.join('\n');
}

function buildLlmsFull(posts) {
  const lines = [
    '# Birat Gautam Blog Full Context',
    '',
    '> Expanded context view for AI assistants. Includes article metadata plus content excerpts.',
    '',
  ];

  for (const post of posts) {
    lines.push(`## ${post.title}`);
    lines.push('');
    lines.push(`- URL: ${post.url}`);
    lines.push(`- Published: ${toDateOnly(post.datePublished)}`);
    lines.push(`- Updated: ${toDateOnly(post.dateModified)}`);
    lines.push(`- Author: ${post.author}`);
    if (post.tags.length) {
      lines.push(`- Tags: ${post.tags.join(', ')}`);
    }
    lines.push('');
    lines.push(post.excerpt || stripMarkdown(post.content).slice(0, 500));
    lines.push('');
  }

  return lines.join('\n');
}

async function main() {
  const posts = await loadPosts();

  await fs.mkdir(PUBLIC_DIR, { recursive: true });

  await Promise.all([
    fs.writeFile(
      path.join(PUBLIC_DIR, 'sitemap.xml'),
      buildSitemap(posts),
      'utf8',
    ),
    fs.writeFile(path.join(PUBLIC_DIR, 'rss.xml'), buildRss(posts), 'utf8'),
    fs.writeFile(
      path.join(PUBLIC_DIR, 'llms.txt'),
      buildLlmsTxt(posts),
      'utf8',
    ),
    fs.writeFile(
      path.join(PUBLIC_DIR, 'llms-full.txt'),
      buildLlmsFull(posts),
      'utf8',
    ),
  ]);

  console.log(`Generated blog artifacts for ${posts.length} post(s).`);
}

main().catch((err) => {
  console.error('Failed to generate blog artifacts:', err);
  process.exitCode = 1;
});
