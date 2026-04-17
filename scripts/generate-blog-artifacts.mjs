import fs from 'node:fs/promises';
import path from 'node:path';
import {
  normalizeFaqs,
  normalizeStringArray,
  parseFrontmatter,
  stripMarkdown,
  toDateOnly,
  toIsoDate,
} from '../src/utils/frontmatter.js';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITE_URL = 'https://birat.codes';
const BLOG_BASE = `${SITE_URL}/blog`;

function slugFromFile(fileName) {
  return fileName.replace(/\.md$/, '');
}

function escapeXml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
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

    let tags = normalizeStringArray(attributes.tags);
    if (!tags.length && attributes.tag) tags = [attributes.tag];
    const relatedTags = normalizeStringArray(attributes.relatedTags);
    const faqs = normalizeFaqs(attributes.faqs);

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
      authorSameAs: normalizeStringArray(attributes.authorSameAs),
      tags,
      relatedTags,
      coverImage: attributes.coverImage || '',
      datePublished,
      dateModified,
      content,
      difficulty: attributes.difficulty || '',
      topic: attributes.topic || tags[0] || '',
      faqs,
      monetizationCTA: attributes.monetizationCTA || null,
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
      loc: `${SITE_URL}/about`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${SITE_URL}/contact`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${SITE_URL}/privacy-policy`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${SITE_URL}/terms`,
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
    `- [About](${SITE_URL}/about): Author background and credentials.`,
    `- [Contact](${SITE_URL}/contact): Direct contact channels and collaboration details.`,
    `- [Privacy Policy](${SITE_URL}/privacy-policy): Data handling and privacy disclosures.`,
    `- [Terms of Service](${SITE_URL}/terms): Site usage terms and legal conditions.`,
    `- [Blog Home](${BLOG_BASE}): All technical posts with metadata.`,
    '',
    '## Blog Posts',
    '',
    ...posts.map((post) => {
      const extras = [
        post.difficulty ? `Difficulty: ${post.difficulty}` : null,
        post.topic ? `Topic: ${post.topic}` : null,
      ].filter(Boolean);

      return `- [${post.title}](${post.url}): ${post.excerpt || 'Technical article.'}${extras.length ? ` (${extras.join(', ')})` : ''}`;
    }),
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
    if (post.authorSameAs.length) {
      lines.push(`- Author links: ${post.authorSameAs.join(', ')}`);
    }
    if (post.difficulty) {
      lines.push(`- Difficulty: ${post.difficulty}`);
    }
    if (post.topic) {
      lines.push(`- Topic: ${post.topic}`);
    }
    if (post.tags.length) {
      lines.push(`- Tags: ${post.tags.join(', ')}`);
    }
    if (post.relatedTags.length) {
      lines.push(`- Related tags: ${post.relatedTags.join(', ')}`);
    }
    if (post.monetizationCTA?.type) {
      lines.push(`- Monetization CTA: ${post.monetizationCTA.type}`);
    }
    if (post.faqs.length) {
      lines.push('- FAQs:');
      for (const faq of post.faqs) {
        lines.push(`  - Q: ${faq.question}`);
        lines.push(`    A: ${faq.answer}`);
      }
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
