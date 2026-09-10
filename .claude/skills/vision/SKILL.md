---
name: vision
description: Derives a VISION.md for this repository from evidence that is verified before it is written down, together with a claim-by-claim evidence sheet and a calibration record of ten stress-test hypotheticals answered by a maintainer. Use this skill when the user wants to create, revise, or re-derive a project vision, a VISION.md, a statement of project scope and non-goals, or the supporting vision artifacts under docs/vision/. Also use when the user says "run /vision", "write the vision doc", "what does this repo own", "define our non-goals", "calibrate the vision", or asks to redo the vision after the project's scope has shifted.
---

# Vision

You derive a `VISION.md` for this repository, plus the two artifacts that make it durable: an evidence sheet where every claim resolves to something real, and a calibration record of ten hypotheticals answered by a maintainer in their own words.

A vision document is cheap to write and worthless if it is generic or unverifiable. This skill exists to make both failure modes hard.

## What you produce

| Path | Purpose |
| --- | --- |
| `VISION.md` | Repository root. Purpose, principles, scope non-goals, alignment criteria. |
| `docs/vision/vision-evidence.md` | Every sentence of `VISION.md` with a citation you resolved during this run. |
| `docs/vision/vision-hypotheticals.md` | Ten hypotheticals, verbatim maintainer verdicts, and a changelog mapping each verdict to the edit it caused. |

## Two rules that override everything else

**1. Nothing generic.** A sentence that could be pasted into another repository's vision is a defect, not a rough draft. Every principle sentence must name something that exists only here: a path, a collection, a workflow, a schema, a named contract, a downstream consumer. Step 7 checks this mechanically.

**2. Nothing unverified.** You do not write a citation you have not resolved in this run. When a citation fails to resolve, delete the claim. Do not soften it into something vaguer that survives review. A vision built on plausible-sounding evidence is worse than no vision, because it launders guesses into policy.

## Voice

Match the repository. For Meshery properties that means the conventions already written down in `.claude/skills/meshery-blog-writer/SKILL.md`: confident and community-forward, concrete over abstract, active voice, American English, brand names case-sensitive (Meshery, Meshery Server, mesheryctl, Meshery Catalog, Kanvas, CNCF).

Hyphens only, never em dashes, in every file this skill writes.

Vision prose is declarative present tense. "Meshery.io publishes the model registry as generated pages." Not "Meshery.io should aim to publish" and not "we believe in publishing."

### Step 1 - Establish what the repository actually is

Do not start from a template of principles. Start from the repository and let the principles fall out of it.

```bash
git -C "$(git rev-parse --show-toplevel)" ls-files | wc -l
ls .github/workflows/
ls collections/ _data/ _plugins/ 2>/dev/null
sed -n '1,60p' README.md
ls *.md
```

Answer these before writing a word of vision prose:

- **What does this repository own that no sibling repository owns?** The answer is one sentence and it becomes the third line of `VISION.md`.
- **Which trees are hand-authored and which are generated?** Read every workflow that writes to the repository. Generated trees are almost always the source of a real principle, because contributors cannot tell them apart by looking.
- **Where are the boundaries people actually get wrong?** Search closed issues and PRs for the corrections maintainers repeat. Those repetitions are non-goals that have not been written down yet.
- **What is already documented elsewhere?** `GOVERNANCE.md`, `MAINTAINERS.md`, `CONTRIBUTING.md`, and `CODE_OF_CONDUCT.md` are not vision. Do not restate them. The vision covers purpose and boundaries only.

Record the answers in a scratch file. They are the raw material for Step 2, and you will cite them in Step 3.

### Step 2 - Derive candidate principles

Group what you found in Step 1 into three to five principles. Fewer than three means you have not looked hard enough. More than five means you are listing practices, not principles.

Each principle is an H2 heading, phrased as a short declarative claim about how this project behaves, followed by four to six declarative sentences that make the claim concrete and falsifiable.

A principle earns its place only if you can name a real change that it would reject. Write that rejection down next to each candidate; it becomes a hypothetical in Step 6. If you cannot name one, the principle is decoration. Cut it.

Then write the scope section: four to six sentences of the form "This project is not X." Each non-goal must correspond to something a contributor has actually proposed or could plausibly propose. Non-goals that nobody would ever attempt are filler.

Close with exactly two sentences: one naming what makes a change aligned, one naming what makes a change worth resisting.

### Step 3 - Verify every citation, then delete what fails

This is the gate the whole skill turns on. Build a verification ledger before you write the evidence sheet.

For each claim, resolve its citation with a command whose output you actually read:

```bash
# A path must exist on the default branch, not just in your working tree
git cat-file -e "origin/master:path/to/file" && echo "OK: path/to/file"

# A directory must be non-empty, and the count is often the evidence itself
git ls-tree -r --name-only origin/master collections/_models | wc -l

# A PR or issue number must resolve, and its title must match the claim
gh pr view <n> --repo <owner>/<repo> --json number,title,state,mergedAt

# A workflow claim must be read, not assumed from the filename
sed -n '1,40p' .github/workflows/<name>.yml

# A published page must contain the text you attribute to it
curl -fsSL "https://meshery.io/<page>" | grep -io "<the phrase>"
```

Then apply the disposition rules, in order:

- **Resolves and supports the claim.** Keep the claim. Record the exact path, number, or URL.
- **Resolves but supports something narrower.** Rewrite the claim down to what the evidence actually shows. Never keep the broad claim with the narrow citation.
- **Does not resolve.** Delete the claim. Do not substitute a nearby file that looks similar. Do not rephrase the claim until it is too vague to be wrong.
- **Describes intent rather than shipped state.** Keep it only if a maintainer states it in Step 6, and mark it in the evidence sheet as `Direction, not shipped state.` Never let a direction claim sit unmarked among shipped facts.

Live counts drift. When you cite a count, timestamp it: "788 pages under `collections/_models` as of 2026-09-10."

See `references/evidence-verification.md` for the citation types, the ledger format, and the failure cases that look like passes.

### Step 4 - Write VISION.md

Structure, in order, with no additional sections:

```markdown
# Vision

<One sentence: why this project exists and for whom.>
<One sentence: who it serves and what it turns into what.>
<One sentence: the single thing it owns.>

## <Principle 1 as a short declarative claim>

<Four to six declarative sentences.>

## <Principle 2>
...

## Scope

<Four to six "This project is not X" sentences.>

<One sentence: when a change aligns.>
<One sentence: when a change should be resisted.>
```

Keep it under roughly 60 lines. A vision that needs scrolling is a handbook. Every sentence here must appear verbatim in the evidence sheet in Step 5, so write sentences you are prepared to defend one at a time.

`references/vision-structure.md` has the full annotated shape and worked examples of strong and weak principle sentences.

### Step 5 - Write the evidence sheet

`docs/vision/vision-evidence.md` mirrors `VISION.md` section for section. For every sentence:

```markdown
* **Claim**: "<the sentence, quoted exactly as it appears in VISION.md>"
  * **Evidence**: <what you resolved in Step 3, with the specific path, number, or URL>
```

Rules:

- One entry per sentence. No sentence merged, none skipped, including the two alignment sentences at the end. The sheet claims to be exhaustive, so it must be.
- Evidence is specific. `src/theme/` is not evidence. `src/theme/palette.ts` is.
- A claim with two independent citations is stronger than a claim with one vague one. Prefer the pair.
- Mark direction claims explicitly with `Direction, not shipped state.`

### Step 6 - Run the hypothetical interview

Ten hypotheticals, answered by a maintainer. Their words, not yours.

Construct the ten from Step 2: each principle contributes the rejection you wrote next to it, and the remainder come from the boundaries in Step 1 that people actually get wrong. A good hypothetical is one where you genuinely cannot predict the answer. If you already know the verdict, it is a restatement of the principle and it teaches nobody anything. See `references/hypothetical-bank.md` for the construction patterns and the categories to cover.

Present them one at a time. For each, give the proposal in two sentences, name the principle it tests, and steelman both directions honestly. The case *for* must be the strongest version a real contributor would make, not a strawman you can knock down.

Collect the verdict with `AskUserQuestion`, offering **Align**, **Resist**, and **Refine the principle**, and ask for the reasoning in the same turn. Capture what comes back exactly:

- Quote the maintainer's words verbatim under `**Reasoning (verbatim)**`. Preserve their phrasing, their emphasis, and their hedges.
- If they answer with a verdict but no prose, ask once for a sentence of reasoning. If they decline, write `No reasoning recorded.` Never fill the gap yourself.
- **Do not write the quotes.** A synthesized quote under a "verbatim" label is a fabrication, and it destroys the only thing this file is for.

A `Refine` verdict means the principle as drafted is wrong or incomplete. Go back to Step 4, change it, and record what changed.

### Step 7 - Apply verdicts and run the conformance checks

Every verdict produces either an edit to `VISION.md` or an explicit note that none was needed. Record the mapping in the changelog of `docs/vision/vision-hypotheticals.md`. A changelog line that claims an edit that is not in `VISION.md` is the most common defect in this format; Step 7's third check catches it.

Run all of these from the repository root. Do not open a pull request until every one passes.

```bash
# 1. No em dashes in the deliverables
#    (scoped to the three output files; this skill's own text contains the search
#     character in this very pattern, so do not point the check at the skill directory)
grep -rn "—" VISION.md docs/vision/ && echo "FAIL: em dash" || echo "OK: no em dashes"

# 2. No AI attribution anywhere.
#    A citation to a path under .claude/ is legitimate evidence in this repo, so the
#    match is stripped of those paths before the check, not excluded from the grep.
grep -rn "" VISION.md docs/vision/ | sed 's#`\?\.claude/[^ `)]*`\?##g' \
  | grep -iE "claude|copilot|chatgpt|generated with|co-authored-by|as an ai" \
  && echo "FAIL: attribution" || echo "OK: no attribution"

# 3. Bidirectional traceability: every VISION.md sentence appears in the evidence sheet
python3 - <<'PY'
import re, pathlib
vision = pathlib.Path("VISION.md").read_text()
ev = pathlib.Path("docs/vision/vision-evidence.md").read_text()
body = "\n".join(l for l in vision.splitlines() if l.strip() and not l.startswith("#"))
missing = [s.strip() for s in re.split(r"(?<=\.)\s+", body) if s.strip() and s.strip() not in ev]
print("OK: all claims traced" if not missing else "FAIL: untraced claims:")
for m in missing:
    print("  -", m[:90])
PY

# 4. Anti-generic: every principle sentence names something specific to this repo
#    Read the output. A sentence with no path, no proper noun, and no artifact name is generic.
awk '/^## /{p=1} p&&/^[A-Z]/' VISION.md | grep -vE "meshery|Meshery|mesheryctl|collections/|_data/|_plugins/|\.github/|Kanvas|Layer5|Jekyll|docs\.meshery\.io"

# 5. Ten hypotheticals, ten verdicts, ten reasoning blocks
grep -c "^## Hypothetical" docs/vision/vision-hypotheticals.md
grep -c "\*\*Verdict\*\*" docs/vision/vision-hypotheticals.md
grep -c "verbatim" docs/vision/vision-hypotheticals.md
```

Check 4 prints candidate generic sentences rather than passing or failing on its own. Read every line it prints and either make the sentence specific or cut it. Adjust the pattern list for the repository you are running in.

### Step 8 - Commit and open the pull request

Documentation only. This skill never changes build configuration, layouts, includes, plugins, workflows, or any published page. If a vision claim tempts you to fix the code it describes, note it as a follow-up issue instead.

**Authorship rule (non-negotiable):** no reference to AI assistants or automation in the commit message, branch name, PR title, PR body, or any file this skill writes. Sign off with `git commit -s`. Do not add trailers, do not add `--author`.

```bash
BRANCH="docs/<issue-number>-vision"
git checkout -b "$BRANCH" upstream/master

git add VISION.md docs/vision/
git commit -s -m "docs: add VISION.md and vision calibration artifacts

Signed-off-by: <name> <email>"

git push -u origin "$BRANCH"
gh pr create --repo meshery/meshery.io --base master \
  --title "docs: add VISION.md and vision artifacts" \
  --body "Closes #<issue-number>

Adds \`VISION.md\` at the repository root, the claim-by-claim evidence sheet, and the ten-hypothetical calibration record.

Every citation in the evidence sheet was resolved against \`master\` during authoring. Claims whose citations did not resolve were removed rather than reworded."
```

Close the run with a short handoff: the PR URL, the number of claims kept, the number deleted at Step 3 and why, and any principle a maintainer marked `Refine`.

## Re-running on a repository that already has a VISION.md

Do not regenerate from scratch. Re-verify instead:

1. Re-run Step 3 against the existing evidence sheet. Citations rot as files move. Report what no longer resolves before changing any prose.
2. Keep `docs/vision/vision-hypotheticals.md` append-only. Past verdicts are the record of what maintainers decided and when, and they stay accurate even when the vision moves on. Add a new dated section rather than rewriting old entries.
3. Only re-run the interview for principles that actually changed.
