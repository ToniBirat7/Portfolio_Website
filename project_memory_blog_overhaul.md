# Project Memory: Portfolio Restoration & Technical Blog Overhaul

This document serves as a persistent record of the architectural decisions, research findings, and technical implementations performed to restore the portfolio website and build a premium technical blog section.

---

## 1. Executive Summary & Objectives
The project aimed to transform a standard developer portfolio into a high-end "AI/ML Authority" brand. This involved:
- **Restoration**: Fixing broken animations and rendering issues in the Career Highlights section.
- **Editorial Overhaul**: Architecting a professional blog inspired by top-tier technical writers.
- **Environment Stability**: Recovering from local environment corruption and ensuring dev-to-prod parity.

---

## 2. Phase 1: Environment & Stability (The "Nuclear" Recovery)
The local development environment was initially compromised by a version mismatch and invalid Vite/Rollup configurations.

### Key Actions:
- **Hard Reset**: Reverted local codebase to the last stable remote commit (`fc9626d`).
- **Clean Reinstall**: Wiped `node_modules` and re-installed dependencies (Vite 5.4.9) to match production.
- **Local Dev Fallback**: Implemented a "Nuclear Fallback" in `main.jsx` and `index.css`. It applies an `.is-local` class to the body during development, forcing all `.animate-in` and `.timeline-content` elements to `opacity: 1` if the `IntersectionObserver` fails locally.

---

## 3. Phase 2: Career Highlights Restoration
The community-voted most impactful section, Career Highlights, was broken locally.

### The Debugging:
- **The Issue**: Timeline dots were visible, but the text cards were missing.
- **The Culprit**: A combination of `contain: content` in `index.css` (which clipped positioned children) and the animation logic requiring a specific viewport-entry trigger that was failing in some browser configurations.
- **The Fix**: Removed `contain: content` from the career container and expanded the local visibility fallback to explicitly target `.timeline-content` and `.stagger-item`.

---

## 4. Phase 3: The Blog Section - "Technical Editorial" Theme
The user requested a blog that feels "professional, readable, and techy," explicitly avoiding generic "Kibs-style" themes.

### Research & Inspiration:
We performed deep-dive analysis on three primary references:
- **[steipete.me](https://steipete.me/)**: Monospace metadata (dates/read-time), minimal vertical post lists, and a "clean engineer" vibe.
- **[leerob.com](https://leerob.com/)**: Authoritative serif typography, extreme minimalism, and high-quality long-form layout.
- **[Medium](https://medium.com/)**: Focus on readability (680px width), standard content hierarchy, and auto-generated structured data.

### Implementation Architecture:
| Component | Implementation Detail |
| :--- | :--- |
| **Typography** | `Source Serif 4` for body text (readability), `Space Mono` for metadata (tech vibe). |
| **Markdown Loader** | Custom `blogLoader.js` using Vite's `import.meta.glob` with `?raw`. It manually parses YAML frontmatter and extracts H2/H3 headings for navigation. |
| **SEO Suite** | A custom `BlogSEO.jsx` component that manually injects JSON-LD, OG Tags, and Dynamic Titles without relying on `react-helmet-async` (avoiding previous crashes). |
| **Features** | Sticky Table of Contents, Reading Progress Bar, Language-labeled Code Blocks with Copy Feedback, and Adjacent Post Navigation. |

---

## 5. Phase 4: Professional Polish & Interactivity
To make the site feel premium, we implemented high-end micro-interactions.

### Refined Hover Effects:
- **Post Item Lift**: Blog home items now have a subtle background shift (`rgba(100, 255, 218, 0.02)`) and rounded corners on hover.
- **Interactive Tags**: Tag pills now scale slightly (`translateY(-1px)`) and glow on hover.
- **Share Suite**: Share icons were upgraded from flat text links to rounded square buttons with interactive states.
- **Code Copy**: The copy button now has a pill-shaped background hover state, mirroring modern IDEs like VS Code.
- **Nav Nudges**: The "Portfolio" back-link features a horizontal nudge (gap widening) on hover.

---

## 6. Current Technical Stack
- **Framework**: Vite + React
- **Routing**: `react-router-dom` (managed routes for `/blog` and `/blog/:slug`)
- **Styling**: Vanilla CSS (modularized per component)
- **Markdown**: `react-markdown` + `remark-gfm` + `react-syntax-highlighter` (Prism/oneDark)
- **SEO**: Custom Schema/OG injection utility

---

## 7. Strategic Context for Future Work
- **Content Pipeline**: Articles are stored as `.md` files in `src/content/blog/`. Frontmatter supports `title`, `date`, `excerpt`, `tags[]`, `author`, and `coverImage`. 
- **Style Tokens**: Global blog tokens are stored in `index.css` (e.g., `--blog-font-body`, `--blog-content-width`).
- **Visibility**: Always keep the `.is-local` fallback updated if new animated sections are added to avoid "blank page" issues during development.

---
*Created by Antigravity AI on April 16, 2026*
