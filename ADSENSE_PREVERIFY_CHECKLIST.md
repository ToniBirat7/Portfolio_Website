# AdSense Pre-Verify Checklist (birat.codes)

Use this checklist before clicking **Verify** and then **Request review** in AdSense.

## 1) Code Placement (Required)

- Confirm the AdSense script exists in the global HTML head:
  - `index.html`
  - Script URL includes: `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1567291488769443`
- Confirm there is only one global AdSense loader and no duplicate script injection in runtime components.

## 2) Ads Rendering Config (Required)

- Confirm slot ID is configured in production build environment:
  - `VITE_ADSENSE_BLOG_SLOT_ID=<your slot id>`
- Confirm blog post ad rendering is gated by valid config:
  - `src/utils/adsense.js`
  - `src/components/blog/BlogPost.jsx`
  - `src/components/AdSlot.jsx`
- In local dev, open a blog post and verify the **AdSense debug** badge shows:
  - `READY (...)` means config detected.
  - `MISSING SLOT CONFIG` means slot env var is missing.

## 3) Crawlability and Policy Surface (Required)

- Confirm these pages are live and indexable:
  - `/about`
  - `/contact`
  - `/privacy-policy`
  - `/terms`
- Confirm sitemap includes legal and contact pages:
  - `public/sitemap.xml`
- Confirm robots and sitemap are accessible:
  - `/robots.txt`
  - `/sitemap.xml`
- Confirm ads.txt is published and accessible:
  - `/ads.txt`

## 4) Content Readiness (High Impact)

- Current blog post count in repo: **12**.
- Recommended safer threshold before review: **15-20+ high-quality posts**.
- Expand to at least 15 before requesting review to reduce rejection risk.

## 5) UX & Trust Signals (High Impact)

- No broken links/images on blog home and post pages.
- Clear author identity and real contact methods.
- Avoid thin pages and empty sections.
- Avoid placeholder categories/navigation without content.

## 6) Final Go/No-Go

Click **Verify** only when all checks above pass.

After successful verify:
1. Click **Request review**.
2. Do not make major structure changes during review window.
3. Monitor Search Console coverage and crawl issues.

## 7) Post-Deploy Smoke Checks (Command/Browser)

- Visit homepage, blog home, and 2-3 blog posts on desktop + mobile width.
- Open page source and confirm AdSense script appears once.
- Confirm `/ads.txt` returns:
  - `google.com, pub-1567291488769443, DIRECT, f08c47fec0942fa0`
- Confirm no 404 for legal/contact pages.
