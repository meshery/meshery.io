# Meshery Blog Post Structure

Posts on `meshery.io/blog` are Jekyll markdown files under
`collections/_posts/YYYY/MM/DD/`.  This reference captures the conventions
used across the existing posts so a new post slots in cleanly.

## Directory Layout

```
collections/_posts/
└── YYYY/
    └── MM/
        └── DD/
            └── YYYY-MM-DD-descriptive-slug.md

assets/images/posts/
└── YYYY/
    └── <slug>/
        ├── <slug>.png         ← featured image
        └── [other images]     ← supporting images for the post body
```

The featured image path declared in frontmatter must match the file
location exactly (case-sensitive on the live site).

## Frontmatter (required fields)

```yaml
---
title: "Post Title — 50 to 70 chars"
subheading: Optional supporting line under the title
date: 2026-04-30
author: Meshery Authors
draft: false
published: true
categories:
  - meshery
  - community
redirect_from: /blog/<slug>
featured-image: /assets/images/posts/2026/<slug>/<slug>.png
---
```

| Field            | Required | Notes                                                        |
| ---------------- | -------- | ------------------------------------------------------------ |
| `title`          | yes      | Quoted; 50-70 chars; primary keyword early                   |
| `subheading`     | no       | One line, no quotes needed unless it has special chars       |
| `date`           | yes      | `YYYY-MM-DD` (no time component required)                    |
| `author`         | yes      | Default `Meshery Authors`; use real names for interviews     |
| `draft`          | no       | Default `false`; set `true` to keep a post unpublished       |
| `published`      | yes      | `true` for live posts                                        |
| `categories`     | yes      | 1-3 from the approved list (see `categories.md`)             |
| `redirect_from`  | yes      | Always `/blog/<slug>` so legacy URLs resolve                 |
| `featured-image` | yes      | Absolute site path; must point to a real file in the commit  |

Optional fields seen in existing posts: `tags`, `toc`, `popular`,
`series`.  Add them only when you need their behavior — most posts do
not.

## Body Conventions

- Open with a one-paragraph hook that names the specific problem and
  hints at the solution.  Do not open with "In this blog post...".
- H2 headings (`##`) for major sections; H3 (`###`) for subsections.
  Each H2 should make sense on its own in a TOC.
- Inline images: `<img src="/assets/images/posts/YYYY/<slug>/foo.png"
  style="width:100%; max-width:750px;" alt="Descriptive alt text" />`.
  The site does not auto-resize, so set explicit `style="width: ..."`
  to avoid full-bleed renders.
- External links open in a new tab implicitly via the site's link
  filter; no need to add `target="_blank"` manually.
- Code blocks use triple-backticks with a language hint
  (```` ```bash ```` , ```` ```yaml ```` , ```` ```go ```` ).
- Blockquotes (`>`) are used for callouts; some posts also embed
  custom HTML callouts — keep them simple.
- Avoid em dashes (`—`); use hyphens (`-`).

## Featured Image

Every post needs a featured image.  Aim for ~1200x630 PNG (banner
ratio) for clean previews on Twitter/LinkedIn/Slack.  If the caller
provided a hero-image URL or GDrive link, download into the per-slug
asset directory.  Otherwise reuse a thematically appropriate image
already in `assets/images/posts/` or generate a simple banner with the
post title.  Never publish without `featured-image` set.

## Authorship

The post body and frontmatter must read as a Meshery community
contribution — no mention of AI assistants, "generated with", or
co-authoring trailers anywhere in the post, commit, or PR description.
