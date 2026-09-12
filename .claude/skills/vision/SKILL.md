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
| `docs/vision/vision-hypotheticals.md` | Ten hypotheticals, each carrying a maintainer verdict quoted verbatim, a verdict derived from repository behavior, or an explicit `Open` marker, plus a changelog mapping each settled verdict to the edit it caused. |

## Two rules that override everything else

**1. Nothing generic.** A sentence that could be pasted into another repository's vision is a defect, not a rough draft. Every principle sentence must name something that exists only here: a path, a collection, a workflow, a schema, a named contract, a downstream consumer. Step 7 checks this mechanically.

**2. Nothing unverified.** You do not write a citation you have not resolved in this run. When a citation fails to resolve, delete the claim. Do not soften it into something vaguer that survives review. A vision built on plausible-sounding evidence is worse than no vision, because it launders guesses into policy.

## Voice

Match the repository. For Meshery properties: confident and community-forward, concrete over abstract, active voice, American English, and short paragraphs. Brand names are case-sensitive: Meshery, Meshery Server, Meshery Operator, mesheryctl (lowercase), Meshery Catalog, Kanvas, Layer5, KubeCon, CNCF.

These conventions are restated here on purpose. Do not read another skill's `SKILL.md` to pick up style rules: a skill file carries operational instructions with side effects of its own, and consulting one lets unrelated instructions influence a `/vision` run.

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

**When no maintainer is available.** Some questions are not opinions: the repository has already answered them, and a workflow or a config file is the answer. Those may be recorded as derived verdicts, under these rules:

- Label them `**Verdict (derived from repository behavior)**` and cite the file and line that settles it. Never label a derived verdict as a maintainer verdict, and never put derived reasoning inside a `verbatim` block.
- Derive only what the repository actually settles. "The workflow deletes these files before regenerating, so hand edits do not survive" is derived. "This tree should stay off limits" is a judgment about what the project wants and is not yours to make.
- Leave genuine judgment calls open rather than filling them. Record them as `**Verdict**: Open - awaiting maintainer` with a link to where the question was asked, and fill them in as answers arrive.

A calibration record that is honest about which verdicts came from a person and which came from a workflow is worth more than a complete-looking one where you cannot tell the difference.

### Step 7 - Apply verdicts and run the conformance checks

Every verdict produces either an edit to `VISION.md` or an explicit note that none was needed. Record the mapping in the changelog of `docs/vision/vision-hypotheticals.md`. A changelog line that claims an edit that is not in `VISION.md` is the most common defect in this format; Step 7's third check catches it.

Run all of these from the repository root. Do not open a pull request until every one passes.

```bash
# Run from the repository root. Exits non-zero if any check fails, so this can
# gate a commit. Nothing here reports OK for a file it could not read.
set -u
FAIL=0
DELIVERABLES='VISION.md docs/vision/vision-evidence.md docs/vision/vision-hypotheticals.md'

# 0. Every deliverable exists and is readable. Without this, a grep over a
#    missing file finds no matches and the checks below would all report OK.
for f in $DELIVERABLES; do
  [ -r "$f" ] || { echo "FAIL: missing or unreadable: $f"; FAIL=1; }
done
[ "$FAIL" -eq 0 ] || { echo "Deliverables missing. Fix before running the rest."; exit 1; }

# 1. No em dashes in the deliverables.
#    Scoped to the three output files: this skill's own text contains the search
#    character in this very pattern, so never point the check at the skill directory.
if grep -rn "—" $DELIVERABLES; then echo "FAIL: em dash"; FAIL=1; else echo "OK: no em dashes"; fi

# 2. No AI attribution anywhere.
#    A citation to a path under .claude/ is legitimate evidence, so those paths are
#    stripped before the scan rather than excluded from the grep.
if grep -rn "" $DELIVERABLES | sed 's#`\?\.claude/[^ `)]*`\?##g' \
     | grep -iE "claude|copilot|chatgpt|generated with|co-authored-by|as an ai"; then
  echo "FAIL: attribution"; FAIL=1
else echo "OK: no attribution"; fi

# 3. Bidirectional traceability: every VISION.md sentence appears in the evidence sheet.
python3 - <<'CHK' || FAIL=1
import re, pathlib, sys
vision = pathlib.Path("VISION.md").read_text()
ev = pathlib.Path("docs/vision/vision-evidence.md").read_text()
body = "\n".join(l for l in vision.splitlines() if l.strip() and not l.startswith("#"))
sents = [s.strip() for s in re.split(r"(?<=\.)\s+", body) if s.strip()]
missing = [s for s in sents if s not in ev]
print(f"OK: all {len(sents)} claims traced" if not missing else "FAIL: untraced claims:")
for m in missing:
    print("  -", m[:90])
sys.exit(1 if missing else 0)
CHK

# 4. Anti-generic. Advisory: prints candidates rather than failing, because only
#    reading them tells you whether they are generic. Adjust the pattern list per repo.
echo "-- principle sentences naming nothing repo-specific (read and fix or cut):"
awk '/^## /{p=1} p&&/^[A-Z]/' VISION.md \
  | grep -vE "meshery|Meshery|mesheryctl|collections/|_data/|_plugins/|\.github/|_config\.yml|Kanvas|Layer5|Jekyll|docs\.meshery\.io" \
  || echo "  (none)"

# 5. Exactly ten hypotheticals, each with a verdict and a changelog line.
H=$(grep -c '^## Hypothetical' docs/vision/vision-hypotheticals.md || true)
V=$(grep -cE '^\* \*\*Verdict' docs/vision/vision-hypotheticals.md || true)   # matches every verdict form
C=$(grep -c '^\* \*\*Changelog\*\*' docs/vision/vision-hypotheticals.md || true)
if [ "$H" -eq 10 ] && [ "$V" -eq 10 ] && [ "$C" -eq 10 ]; then
  echo "OK: 10 hypotheticals, 10 verdicts, 10 changelog lines"
else echo "FAIL: expected 10/10/10, got $H/$V/$C"; FAIL=1; fi

# 6. Every changelog quote actually appears in VISION.md. A changelog claiming an
#    edit that never landed is the most common defect in this format.
python3 - <<'CHK' || FAIL=1
import re, pathlib, sys
v = pathlib.Path("VISION.md").read_text()
h = pathlib.Path("docs/vision/vision-hypotheticals.md").read_text()
quotes = re.findall(r'Produced "([^"]+)"', h) + re.findall(r'and "([^"]+)" in', h)
bad = [q for q in quotes if q not in v]
print(f"{len(quotes)} changelog quotes checked")
print("OK: all present" if not bad else "FAIL: changelog describes edits not in VISION.md:")
for b in bad:
    print("  -", b[:80])
sys.exit(1 if bad else 0)
CHK

# 7. Cited commands are runnable as written. Advisory: it cannot reliably tell a
#    verification command you ran from a workflow snippet quoted as evidence, so it
#    prints candidates instead of failing. Read each one and add the missing operands.
python3 - <<'CHK'
import re, pathlib
ev = pathlib.Path("docs/vision/vision-evidence.md").read_text()
sus = []
for cmd in re.findall(r'`([^`]+)`', ev):
    c = cmd.strip()
    if not re.match(r'^(grep|rg|find)\b', c):
        continue
    # strip program, flags, and the first quoted pattern; do NOT split on "|",
    # which appears inside grep alternation patterns
    rest = re.sub(r'^\S+\s*', '', c)
    rest = re.sub(r'^(-\S+\s*)+', '', rest)
    rest = re.sub(r'''^("[^"]*"|'[^']*'|\$\w+)\s*''', '', rest)
    rest = rest.split('|')[0]
    if not re.search(r'[/*]|\$\w+|\b\w+\.\w+\b', rest):
        sus.append(c)
print("-- cited commands with no visible file operand:")
for s in sus:
    print("  -", s[:100])
if not sus:
    print("  (none)")
CHK

[ "$FAIL" -eq 0 ] && echo "ALL CHECKS PASSED" || { echo "CHECKS FAILED"; exit 1; }
```

Check 4 prints candidate generic sentences rather than passing or failing on its own. Read every line it prints and either make the sentence specific or cut it. Adjust the pattern list for the repository you are running in.

### Step 8 - Commit and open the pull request

Documentation only. This skill never changes build configuration, layouts, includes, plugins, workflows, or any published page. If a vision claim tempts you to fix the code it describes, note it as a follow-up issue instead.

**Authorship rule (non-negotiable):** no reference to AI assistants or automation in the commit message, branch name, PR title, PR body, or any file this skill writes. Sign off with `git commit -s`. Do not add trailers, do not add `--author`.

```bash
BRANCH="docs/<issue-number>-vision"
git checkout -b "$BRANCH" upstream/master

git add .claude/skills/vision/ VISION.md docs/vision/
git commit -s -m "docs: add VISION.md and vision calibration artifacts"

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
