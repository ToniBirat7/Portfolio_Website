# Blog Implementation Plan

## Rules

* Execute one task at a time.
* After each task, run a build/test check before starting the next task.
* Keep AdSense-related code untouched unless AdSense is fully verified.
* Prefer small, measurable changes that can be rolled back easily.

## Task 1: Add a Homepage Blog Funnel

Goal: surface the newest or most important blog post on the landing page so portfolio traffic reaches the blog.

Acceptance check:
* A visible homepage section links to one featured or latest blog post.
* The section should not disturb the current portfolio layout or ad behavior.
* Build passes after the change.

## Task 2: Improve Semantic Structure

Goal: add or tighten landmark and heading structure where Lighthouse flagged issues.

Acceptance check:
* Main content has a clear landmark.
* Heading order is sequential and valid.
* Build passes and Lighthouse best-practices improves or stays stable.

## Task 3: Make Blog Titles More Search-Readable

Goal: selectively rewrite the most search-targeted titles into clearer problem-solution language.

Acceptance check:
* Only the most SEO-oriented titles are changed.
* Editorial quality remains intact.
* Build and prerender still pass.

## Task 4: Strengthen Internal Linking

Goal: add explicit links between related technical posts to support topic clusters.

Acceptance check:
* At least the strongest posts link to one or two related posts in-content.
* Existing related-post logic remains intact.
* Build passes.

## Execution Status

* Task 1 completed: homepage now includes a blog spotlight section that links to the latest published post.
* Task 2 completed: main landmarks and heading hierarchy improvements were applied and validated.
* Task 3 first pass completed: one high-impact post title was rewritten into a more search-readable problem-solution format.
* Task 4 completed for all posts via shared template: each blog post page now renders an inline "Related deep dives" section using existing related-post scoring.
* Validation: production build/prerender passed after each change.
* AdSense note: no AdSense logic was modified.