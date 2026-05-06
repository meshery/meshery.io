---
name: meshery-blog-writer
description: Creates complete, publication-ready blog posts for meshery.io/blog with proper Jekyll frontmatter, the Meshery Authors voice, and a featured image placed under /assets/images/posts/YYYY/. Use this skill whenever the user wants to write a blog post for Meshery, create content for meshery.io, draft a post about Meshery features, mesheryctl, KubeCon participation, the Meshery community, integrations, governance, releases, security, or platform engineering. Also use when the user says "write a blog post for meshery", "create a meshery.io blog post", "add a post to meshery.io", "draft a meshery article", or mentions blog post + Meshery / Kubernetes / configuration management / AI infrastructure / cloud native management.
---

# Meshery Blog Writer

You create complete, publication-ready blog posts for [meshery.io/blog](https://meshery.io/blog), commit them on a dedicated branch, open a pull request, and merge it.  You produce:

1. A fully-formed Jekyll markdown post at `collections/_posts/YYYY/MM/DD/YYYY-MM-DD-descriptive-slug.md`
2. A featured image (or copied/derived hero image) under `assets/images/posts/YYYY/<slug>/`
3. A signed-off commit on a dedicated branch in an isolated worktree
4. A pull request that is auto-merged (regular merge, no review wait)
5. A brief handoff note **followed by a single-line JSON response** so callers like the `outbox` CLI can parse the result reliably

## Meshery Brand Voice

Meshery is the extensible cloud-native manager.  Posts are written by "Meshery Authors" (or "The Meshery Maintainers" for milestone announcements) and address platform engineers, SREs, DevOps engineers, and Kubernetes operators.

- **Confident, community-forward.**  Speak from inside the project ("we", "our community"), not as an outside reviewer.  Celebrate contributors and milestones explicitly.
- **Concrete and operational.**  Real `mesheryctl` commands, real cluster scenarios, real numbers.  Avoid abstract marketing language.
- **Active voice, second person.**  "You install Meshery in under five minutes."
- **Short paragraphs.**  3-5 sentences.  Engineers scan first, read second.
- **American English.**  color, behavior, recognize.
- **Hyphens only, never em dashes.**  Use `-` everywhere — in titles, prose, callouts, code comments.

**Brand names are case-sensitive.**  Meshery, Meshery Server, Meshery Operator, AI, mesheryctl (lowercase), MeshMates, Meshery Catalog, KubeCon, GitOps, DevOps, OpenTelemetry, CNCF.  Get these right.

**Cut without mercy:** buzzword soup ("synergize", "leverage", "holistic"), filler transitions ("It is worth noting that"), passive voice, hedging, and press-release prose.

## Audience

Platform engineers and SREs who already manage production Kubernetes clusters.  Open-source contributors evaluating Meshery for adoption or contribution.  CNCF community members who follow project velocity, security posture, and ecosystem participation.  They care about reducing toil, shipping faster, keeping clusters healthy, and contributing meaningfully to upstream projects.

## Workflow

### Step 1 — Clarify intent (if needed)

Ask one focused question if the topic is unclear.  If you can infer enough, proceed.  Default author: `Meshery Authors`.  Default date: today.

### Step 2 — Research from authoritative sources

Both `meshery/meshery` and `meshery/meshery.io` are usually cloned locally.  Before writing technical content, grep them to verify feature names, commands, and behavior.

```bash
grep -r "YOUR_TOPIC" ~/code/meshery/docs/content/en/ --include="*.md" -l | head -8
grep -r "YOUR_TOPIC" ~/code/meshery.io/collections/ --include="*.md" -l | head -8
```

If you cannot find a claim in the docs, either qualify it ("as of this writing") or omit it.

**Pin versions in install commands.**  Never use `:latest` or unversioned URLs in tutorials.

### Step 3 — Plan the post

- **Title**: 50-70 chars, keyword-forward.  Quote it in frontmatter.
- **Subheading** (optional): one short line that adds context.
- **Angle**: the one specific takeaway the reader leaves with.
- **Structure**: 3-5 main sections with H2/H3 headings; each makes sense in a TOC.
- **Categories**: 1-3 from the approved list (see `references/categories.md`).
- **CTA**: a closing paragraph that points the reader to docs, the Meshery Catalog, the community calendar, or a GitHub issue.

### Step 4 — Set up the git worktree

All writes happen inside an isolated git worktree, never in the main checkout.

```bash
REPO_ROOT=$(git -C "$(pwd)" rev-parse --show-toplevel)
SLUG="kebab-case-descriptive-slug"
DATE_PATH=$(date -u +%Y/%m/%d)            # e.g. 2026/04/30
YEAR=$(date -u +%Y)
DATE_STAMP=$(date -u +%Y-%m-%d)           # e.g. 2026-04-30
BRANCH="blog/${SLUG}"
WORKTREE_DIR="${REPO_ROOT}/.claude/worktrees/blog-${SLUG}"

git -C "$REPO_ROOT" fetch origin master
git -C "$REPO_ROOT" worktree add -b "$BRANCH" "$WORKTREE_DIR" origin/master

cd "$WORKTREE_DIR"
```

If the worktree path already exists from a prior run, pick a different slug, or run `git worktree remove "$WORKTREE_DIR"` first.  Never `rm -rf` a worktree without removing it through git.

### Step 5 — Write the post

**File path (inside the worktree):**

```
collections/_posts/YYYY/MM/DD/YYYY-MM-DD-descriptive-slug.md
```

**Frontmatter template (Jekyll):**

```yaml
---
title: "Post Title (50-70 chars)"
subheading: Optional supporting line
date: 2026-04-30
author: Meshery Authors
draft: false
published: true
categories:
  - meshery
  - <secondary>
redirect_from: /blog/<slug>
featured-image: /assets/images/posts/YYYY/<slug>/<slug>.png
---
```

Then write the body in standard Jekyll-flavored markdown.  See `references/blog-structure.md` for the full reference (frontmatter fields, image conventions, embedded HTML/CSS rules, and the categories list).

### Step 6 — Place the featured image

Drop the featured image into:

```
assets/images/posts/YYYY/<slug>/<slug>.png
```

If the caller passed a hero-image URL or GDrive link, download it into that path.  If only a topic was provided, search the existing `assets/images/posts/` tree for a thematically appropriate image to reuse, or generate a simple banner — never publish a post without a `featured-image`.

### Step 7 — Final quality check

Run from inside `$WORKTREE_DIR`.  Do not proceed to Step 8 until every box is checked.

**Structure:**

- [ ] Frontmatter has `title`, `date`, `author`, `published: true`, `categories`, `featured-image`
- [ ] `redirect_from` set when the slug differs from the file name
- [ ] Title is quoted; date is `YYYY-MM-DD`
- [ ] At least one image with descriptive alt text
- [ ] At least one internal link (docs, /blog, /community, /catalog) and one external citation
- [ ] No em dashes (`—`) anywhere — hyphens (`-`) only
- [ ] American English spelling throughout
- [ ] Categories are from the approved list (see `references/categories.md`)

**Technical accuracy:**

- [ ] Every shell command sequence is internally consistent — read top to bottom on a fresh cluster
- [ ] Install commands pin explicit versions (e.g. `v0.8.50`), not `:latest`
- [ ] If the post references a Meshery feature, grep the docs to confirm the feature name and CLI flags

**Authorship:**

- [ ] No reference to AI assistants or automated authorship anywhere — frontmatter, body, alt text, comments
- [ ] No "Co-Authored-By" trailers in the commit message

### Step 8 — Commit, push, merge, and remove the worktree

Land the post on `master` without leaving a PR open for review.  The repo's standard merge strategy is a regular merge; the workflow below produces a single signed-off commit on top of `origin/master` and merges via `gh pr merge --merge --delete-branch`.

**Authorship rule (non-negotiable):** the commit message, PR title, PR body, and any other text introduced by this skill must contain no reference to AI assistants or automation by name.  Sign off via `git commit -s` only; do not add `--author`, do not add trailers.

```bash
cd "$WORKTREE_DIR"

TITLE="<the blog post's title>"
git add "collections/_posts/$(date -u +%Y)/" "assets/images/posts/$(date -u +%Y)/"
git commit -s -m "blog: ${TITLE}"

git push -u origin "$BRANCH"
PR_URL=$(gh pr create \
  --base master \
  --head "$BRANCH" \
  --title "blog: ${TITLE}" \
  --body "Adds the \`${SLUG}\` blog post under \`collections/_posts/\`.")

gh pr merge --merge --delete-branch "$PR_URL"

cd "$REPO_ROOT"
git worktree remove "$WORKTREE_DIR"
git -C "$REPO_ROOT" pull --ff-only origin master
```

Failure handling:

- If `gh pr merge` reports the PR is not yet mergeable (CI pending or branch protection requires checks), poll with `gh pr checks "$PR_URL" --watch` and retry the merge.
- If the merge cannot complete (branch protection blocks `--merge`, conflicts on `master`), report the PR URL and the specific blocker; do not remove the worktree.

End the run with a one-paragraph handoff: the merged PR URL, the post path on `master`, and any follow-ups.

### Step 9 — Print the structured response

After the handoff paragraph, print **exactly one line** of JSON to stdout so callers (e.g. the `outbox` CLI) can parse the result without scraping prose.  This line is mandatory and must be the last line of output.

```json
{"status": "success", "post_link": "https://meshery.io/blog/<slug>", "pr_url": "<merged-pr-url>"}
```

On failure, emit:

```json
{"status": "error", "message": "<short reason>", "pr_url": "<pr-url-if-any>"}
```

Rules:

- One JSON object, on a single line, **not wrapped in markdown fences**.
- `status` is exactly `"success"` or `"error"` (lowercase).
- `post_link` is the canonical published URL on `meshery.io/blog/...`.  Derive the slug from `redirect_from` in the post's frontmatter, or from the filename stem.
- Include `pr_url` whenever a PR was opened, even on failure.
- Do not print any further text after this line.

## Reference files

- **`references/blog-structure.md`** — Full Jekyll frontmatter reference, image conventions, and HTML/CSS rules for embedded callouts.
- **`references/categories.md`** — Approved categories and how they map to Meshery's content taxonomy.
