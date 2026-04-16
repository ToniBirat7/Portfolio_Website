# Blog Operations Guide

This guide explains how to publish, update, and optimize blog posts without creating new React pages.

## How publishing works in this project

- Posts live in `src/content/blog/*.md`.
- The app loads all posts automatically using `src/utils/blogLoader.js`.
- Build automation generates these files from blog content:
  - `public/sitemap.xml`
  - `public/rss.xml`
  - `public/llms.txt`
  - `public/llms-full.txt`
- Build automation also prerenders static blog pages to `dist/blog/**` during production build.

## Add a new blog post

1. Create a markdown file in `src/content/blog`.
2. Use this frontmatter template:

```md
---
title: "Your Post Title"
date: "2026-04-16"
dateModified: "2026-04-16"
tags: ["AI", "MLOps"]
excerpt: "1-2 sentence summary used in snippets and feeds."
readTime: 8
coverImage: "/blog/your-slug/hero.png"
author: "Birat Gautam"
authorUrl: "https://birat.codes/#profile"
---
```

3. Write the post body in markdown.
4. Place images in `public/blog/your-slug/`.
5. Run build and deploy:

```bash
npm run build
```

## Edit an existing post

1. Update the markdown file in `src/content/blog`.
2. Update `dateModified` in frontmatter.
3. Run `npm run build` and deploy.

## SEO and AI discoverability checklist per post

- Clear, specific title aligned with search intent.
- Strong excerpt (used by meta tags and RSS).
- Accurate publish and modified dates.
- At least one representative cover image.
- Internal links to related posts.
- External links to authoritative sources.
- Useful H2/H3 heading structure.

## Generated files and what they do

- `public/sitemap.xml`: helps search engines discover blog URLs.
- `public/rss.xml`: helps feed readers and crawlers discover recent posts.
- `public/llms.txt`: curated index for LLM agents.
- `public/llms-full.txt`: expanded context for agent retrieval workflows.
- `dist/blog/index.html` and `dist/blog/<slug>/index.html`: prerendered static pages for better crawler reliability.

## Validation workflow

Run these before deploy:

```bash
npm run generate:blog
npm run build
npm run lint
```

After deploy, validate:

- Google Search Console URL Inspection for `/blog` and new post URL.
- Rich Results Test for a blog post URL.
- Confirm `https://birat.codes/sitemap.xml` and `https://birat.codes/rss.xml` are accessible.
- Confirm `https://birat.codes/llms.txt` is accessible.

## Recommended long-term publishing model

For easier non-code publishing, migrate markdown editing to a CMS workflow:

- Git-based CMS option: Decap CMS or Tina.
- Headless CMS option: Sanity or Contentful + webhook-triggered builds.

Until then, this markdown + automation pipeline is production-safe and scalable for a portfolio blog.
