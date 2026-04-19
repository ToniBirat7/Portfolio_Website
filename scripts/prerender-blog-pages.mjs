import fs from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import {
  isPostPublished,
  normalizeStringArray,
  parseFrontmatter,
  toIsoDate,
} from '../src/utils/frontmatter.js';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'blog');
const DIST_DIR = path.join(ROOT, 'dist');
const SITE_URL = 'https://birat.codes';
const BLOG_BASE = `${SITE_URL}/blog`;
const ADSENSE_SCRIPT_SRC =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

function readEnvFile(filePath) {
  return fs
    .readFile(filePath, 'utf8')
    .then((content) =>
      content
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
        .reduce((accumulator, line) => {
          const separatorIndex = line.indexOf('=');
          if (separatorIndex === -1) return accumulator;
          const key = line.slice(0, separatorIndex).trim();
          const value = line.slice(separatorIndex + 1).trim();
          accumulator[key] = value;
          return accumulator;
        }, {}),
    )
    .catch(() => ({}));
}

async function loadAdsenseConfig() {
  const envFile = await readEnvFile(path.join(ROOT, '.env.production'));
  return {
    clientId:
      process.env.VITE_ADSENSE_CLIENT_ID ||
      envFile.VITE_ADSENSE_CLIENT_ID ||
      '',
    slotId:
      process.env.VITE_ADSENSE_BLOG_SLOT_ID ||
      envFile.VITE_ADSENSE_BLOG_SLOT_ID ||
      '',
  };
}

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

    if (!isPostPublished(attributes)) {
      continue;
    }

    let tags = normalizeStringArray(attributes.tags);
    if (!tags.length && attributes.tag) tags = [attributes.tag];
    const relatedTags = normalizeStringArray(attributes.relatedTags);

    const datePublished = toIsoDate(
      attributes.publishDate || attributes.publishedAt || attributes.date,
    );
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

function pageShell({
  title,
  description,
  canonical,
  bodyHtml,
  schema,
  adsenseClientId,
  ogType = 'website',
  ogImage = `${SITE_URL}/pp.jpg`,
  articlePublishedTime = '',
  articleModifiedTime = '',
  includeBlogNav = false,
}) {
  const blogNavHtml = includeBlogNav
    ? `
  <nav class="blog-nav" aria-label="Blog navigation">
    <div class="blog-nav-content">
      <a href="/" class="blog-nav-back" aria-label="Back to portfolio">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 18l-6-6 6-6" /></svg>
        <span>Portfolio</span>
      </a>
      <a href="/blog" class="blog-nav-brand">birat<span class="brand-dot">.</span>codes<span class="brand-slash">/</span>blog</a>
      <div class="blog-nav-actions">
        <a href="/about" class="blog-nav-icon" aria-label="About"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 21a8 8 0 10-16 0" /><circle cx="12" cy="8" r="4" /></svg></a>
        <a href="/contact" class="blog-nav-icon" aria-label="Contact"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 6h16v12H4z" /><path d="M4 7l8 6 8-6" /></svg></a>
        <a href="/privacy-policy" class="blog-nav-icon" aria-label="Privacy Policy"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" /></svg></a>
        <a href="/terms" class="blog-nav-icon" aria-label="Terms of Service"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /></svg></a>
        <a href="/rss.xml" class="blog-nav-icon" aria-label="RSS Feed"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 11a9 9 0 019 9" /><path d="M4 4a16 16 0 0116 16" /><circle cx="6" cy="18" r="1.5" /></svg></a>
        <a href="https://github.com/ToniBirat7" target="_blank" rel="noopener noreferrer" class="blog-nav-icon" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.72c-2.78.61-3.37-1.16-3.37-1.16-.46-1.18-1.13-1.5-1.13-1.5-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.55 2.36 1.1 2.93.84.09-.66.35-1.1.64-1.35-2.22-.26-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.03a9.4 9.4 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.42.2 2.46.1 2.72.64.7 1.03 1.59 1.03 2.68 0 3.83-2.35 4.67-4.58 4.93.36.31.69.92.69 1.86v2.76c0 .27.18.58.69.48A10 10 0 0012 2z" /></svg></a>
      </div>
    </div>
  </nav>
`
    : '';

  const articleMeta =
    ogType === 'article'
      ? `
  ${articlePublishedTime ? `<meta property="article:published_time" content="${escapeHtml(articlePublishedTime)}" />` : ''}
  ${articleModifiedTime ? `<meta property="article:modified_time" content="${escapeHtml(articleModifiedTime)}" />` : ''}
`
      : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:type" content="${escapeHtml(ogType)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:image" content="${escapeHtml(ogImage)}" />
  <meta property="og:image:alt" content="${escapeHtml(title)}" />
  ${articleMeta}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
  ${adsenseClientId ? `<script async src="${ADSENSE_SCRIPT_SRC}?client=${escapeHtml(adsenseClientId)}" crossorigin="anonymous"></script>` : ''}
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>
    :root { color-scheme: dark; }
    body {
      margin: 0;
      background: #0a192f;
      color: #c9d1d9;
      font-family: Georgia, Cambria, "Times New Roman", serif;
      line-height: 1.8;
      padding: 6rem 1rem 5rem;
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
    .ad-slot { margin: 2rem 0; display: flex; justify-content: center; }
    .ad-slot ins { display: block; width: 100%; max-width: 300px; min-height: 250px; }
    .blog-nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 74px;
      z-index: 1000;
      display: flex;
      align-items: center;
    }
    .blog-nav-content {
      max-width: 1120px;
      margin: 0 auto;
      width: calc(100% - 2rem);
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      border-radius: 18px;
      border: 1px solid rgba(100, 255, 218, 0.12);
      background: rgba(8, 20, 37, 0.78);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 32px rgba(2, 10, 24, 0.35);
    }
    .blog-nav-back {
      text-decoration: none;
      color: #8892b0;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.76rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      letter-spacing: 0.5px;
      transition: color 0.2s;
    }
    .blog-nav-back:hover { color: #64ffda; }
    .blog-nav-brand {
      text-decoration: none;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.9rem;
      color: #e6f1ff;
      font-weight: 500;
      letter-spacing: -0.3px;
    }
    .brand-dot { color: #64ffda; }
    .brand-slash { color: #8892b0; opacity: 0.5; }
    .blog-nav-actions { display: flex; align-items: center; gap: 0.55rem; }
    .blog-nav-icon {
      color: #8892b0;
      text-decoration: none;
      padding: 0.42rem;
      border-radius: 999px;
      border: 1px solid transparent;
      background: rgba(100, 255, 218, 0.02);
      transition: color 0.2s, transform 0.15s;
    }
    .blog-nav-icon:hover {
      color: #64ffda;
      transform: translateY(-2px);
      border-color: rgba(100, 255, 218, 0.15);
      background: rgba(100, 255, 218, 0.08);
    }
    .blog-nav-back svg,
    .blog-nav-icon svg {
      width: 1em;
      height: 1em;
      stroke: currentColor;
      stroke-width: 1.8;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      flex: 0 0 auto;
    }
    @media (max-width: 600px) {
      .blog-nav {
        height: 66px;
      }
      .blog-nav-content {
        width: calc(100% - 1rem);
        padding: 0 0.7rem;
        height: 50px;
        border-radius: 14px;
      }
      .blog-nav-back span { display: none; }
      .blog-nav-brand { font-size: 0.82rem; }
    }
  </style>
</head>
<body>
  ${blogNavHtml}
  ${bodyHtml}
</body>
</html>
`;
}

function renderPostHtml(post, adsenseConfig) {
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
      ${
        adsenseConfig.clientId && adsenseConfig.slotId
          ? `
      <div class="ad-slot" aria-label="Advertisement">
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="${escapeHtml(adsenseConfig.clientId)}"
          data-ad-slot="${escapeHtml(adsenseConfig.slotId)}"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
      `
          : ''
      }
    </article>
  </main>
  `;

  return pageShell({
    title: `${post.title} | Birat Gautam`,
    description: post.excerpt || 'Technical blog post by Birat Gautam.',
    canonical: post.url,
    bodyHtml: body,
    schema,
    adsenseClientId: adsenseConfig.clientId,
    ogType: 'article',
    articlePublishedTime: post.datePublished,
    articleModifiedTime: post.dateModified,
    includeBlogNav: true,
    ogImage: post.coverImage
      ? `${SITE_URL}${post.coverImage}`
      : `${SITE_URL}/pp.jpg`,
  });
}

function renderBlogHomeHtml(posts, adsenseConfig) {
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
    adsenseClientId: adsenseConfig.clientId,
    ogType: 'website',
    includeBlogNav: true,
    ogImage: `${SITE_URL}/pp.jpg`,
  });
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function main() {
  const posts = await loadPosts();
  const adsenseConfig = await loadAdsenseConfig();

  if (!posts.length) {
    console.log('No posts found. Skipping prerender step.');
    return;
  }

  await ensureDir(path.join(DIST_DIR, 'blog'));

  const blogIndexHtml = renderBlogHomeHtml(posts, adsenseConfig);
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
      renderPostHtml(post, adsenseConfig),
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
