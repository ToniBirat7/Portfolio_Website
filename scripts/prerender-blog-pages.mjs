import fs from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import {
  normalizeStringArray,
  parseFrontmatter,
  toIsoDate,
} from '../src/utils/frontmatter.js';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'blog');
const DIST_DIR = path.join(ROOT, 'dist');
const SITE_URL = 'https://birat.codes';
const BLOG_BASE = `${SITE_URL}/blog`;

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function slugFromFile(fileName) {
  return fileName.replace(/\.md$/, '');
}

async function loadPosts() {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.md'));
  const posts = [];

  for (const file of files) {
    const raw = await fs.readFile(path.join(CONTENT_DIR, file.name), 'utf8');
    const { attributes, content } = parseFrontmatter(raw);
    const slug = slugFromFile(file.name);

    let tags = normalizeStringArray(attributes.tags);
    if (!tags.length && attributes.tag) tags = [attributes.tag];
    const relatedTags = normalizeStringArray(attributes.relatedTags);

    const datePublished = toIsoDate(attributes.date);
    const dateModified = toIsoDate(
      attributes.dateModified || attributes.updated || attributes.date,
    );

    const html = marked.parse(content, { mangle: false, headerIds: true });

    posts.push({
      slug,
      title: attributes.title || slug,
      excerpt: attributes.excerpt || attributes.description || '',
      author: attributes.author || 'Birat Gautam',
      authorUrl: attributes.authorUrl || `${SITE_URL}/#profile`,
      tags,
      relatedTags,
      coverImage: attributes.coverImage || '',
      datePublished,
      dateModified,
      html,
      difficulty: attributes.difficulty || '',
      url: `${BLOG_BASE}/${slug}`,
    });
  }

  posts.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
  return posts;
}

function pageShell({ title, description, canonical, bodyHtml, schema }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>
    :root { color-scheme: dark; }
    body {
      margin: 0;
      background: #0a192f;
      color: #c9d1d9;
      font-family: Georgia, Cambria, "Times New Roman", serif;
      line-height: 1.8;
      padding: 2rem 1rem 5rem;
    }
    main { max-width: 760px; margin: 0 auto; }
    a { color: #64ffda; }
    h1, h2, h3 { color: #e6f1ff; font-family: "Outfit", sans-serif; line-height: 1.2; }
    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .meta { color: #8892b0; font-family: monospace; font-size: 0.85rem; margin-bottom: 1.5rem; }
    .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0 2rem; }
    .tag { border: 1px solid rgba(100,255,218,0.2); color: #64ffda; padding: 0.25rem 0.55rem; border-radius: 4px; font-size: 0.75rem; font-family: monospace; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
    pre { background: #161b22; padding: 1rem; overflow-x: auto; border-radius: 8px; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>
`;
}

function renderPostHtml(post) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: post.url,
    author: {
      '@type': 'Person',
      name: post.author,
      url: post.authorUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Birat Gautam',
      url: SITE_URL,
    },
    ...(post.coverImage && { image: `${SITE_URL}${post.coverImage}` }),
  };

  const body = `
  <main>
    <p><a href="/blog">Back to all posts</a></p>
    <article>
      <h1>${escapeHtml(post.title)}</h1>
      <div class="meta">${new Date(post.datePublished).toDateString()} • ${escapeHtml(post.author)}</div>
      ${post.tags.length ? `<div class="tags">${post.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
      ${post.relatedTags.length ? `<div class="tags">${post.relatedTags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
      ${post.difficulty ? `<p class="meta">Difficulty: ${escapeHtml(post.difficulty)}</p>` : ''}
      ${post.coverImage ? `<p><img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.title)}" /></p>` : ''}
      ${post.html}
    </article>
  </main>
  `;

  return pageShell({
    title: `${post.title} | Birat Gautam`,
    description: post.excerpt || 'Technical blog post by Birat Gautam.',
    canonical: post.url,
    bodyHtml: body,
    schema,
  });
}

function renderBlogHomeHtml(posts) {
  const list = posts
    .map(
      (post) => `
      <article>
        <h2><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></h2>
        <div class="meta">${new Date(post.datePublished).toDateString()} • ${escapeHtml(post.author)}</div>
        <p>${escapeHtml(post.excerpt)}</p>
      </article>
      <hr style="border-color: rgba(100,255,218,0.12);" />
      `,
    )
    .join('\n');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: "Birat's Notebook",
    url: BLOG_BASE,
    description:
      'Deep dives into AI Agents, MLOps, and production engineering.',
  };

  const body = `
  <main>
    <p><a href="/">Back to portfolio</a></p>
    <h1>Birat's Notebook</h1>
    <p>Deep dives into AI Agents, MLOps, and the systems behind intelligence.</p>
    ${list}
  </main>
  `;

  return pageShell({
    title: "Birat's Notebook | Birat Gautam",
    description:
      'Technical writing on AI systems, MLOps, and software engineering.',
    canonical: BLOG_BASE,
    bodyHtml: body,
    schema,
  });
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function main() {
  const posts = await loadPosts();

  if (!posts.length) {
    console.log('No posts found. Skipping prerender step.');
    return;
  }

  await ensureDir(path.join(DIST_DIR, 'blog'));

  const blogIndexHtml = renderBlogHomeHtml(posts);
  await fs.writeFile(
    path.join(DIST_DIR, 'blog', 'index.html'),
    blogIndexHtml,
    'utf8',
  );

  for (const post of posts) {
    const postDir = path.join(DIST_DIR, 'blog', post.slug);
    await ensureDir(postDir);
    await fs.writeFile(
      path.join(postDir, 'index.html'),
      renderPostHtml(post),
      'utf8',
    );
  }

  console.log(
    `Prerendered blog home and ${posts.length} post page(s) into dist/blog.`,
  );
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exitCode = 1;
});
