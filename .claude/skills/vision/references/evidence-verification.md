# Evidence verification

Reference for Step 3. The evidence sheet is the only thing separating a vision from a wish list, so a citation that was never resolved is worse than a missing one: it looks like diligence.

## Why this is strict

The first vision document written in a peer repository cited seven paths that a reviewer later spot-checked. Five did not exist on the default branch. They were plausible: the right directory, the right naming style, the file a reasonable person would expect to find. Every one of them had been inferred rather than looked up. The document read as the most rigorous thing in the repository and could not survive a five-minute check.

Inference is the failure mode. Not laziness, not carelessness. You will know what file *should* hold the theme tokens. Look anyway.

## Citation types and how to resolve each

### A path in this repository

Resolve against the default branch, not your working tree. A file you created earlier in the run will pass a local `test -f` and fail for every reader.

```bash
git cat-file -e "origin/master:collections/_models/index.html" && echo OK
```

Cite the file, never the directory. `_data/` is not evidence for anything. `_data/integrations-data.json` is.

### A count of files

The count is often the evidence. It is also the fastest thing to go stale.

```bash
git ls-tree -r --name-only origin/master collections/_catalog | wc -l
```

Write it with a date: "365 entries under `collections/_catalog` as of 2026-09-10."

### A workflow behavior

Filenames lie. `update-catalog.yml` might update the catalog, or might only open an issue about it. Read the steps.

```bash
sed -n '1,60p' .github/workflows/update-catalog.yml
```

Cite the workflow and what it actually does: "`.github/workflows/update-catalog.yml` commits regenerated catalog entries on a schedule."

### A pull request or issue

The number must resolve and the title must match the claim you are attaching it to.

```bash
gh pr view 1832 --repo layer5io/sistent --json number,title,state,mergedAt
```

State matters. An open PR is evidence of intent, not of shipped behavior. If you cite one, it is a direction claim and gets marked as such.

### A published page

The page must contain the text you attribute to it. A URL that merely exists proves nothing.

```bash
curl -fsSL "https://meshery.io/projects" | grep -io "extensible cloud native manager"
```

### A downstream consumer

Check the consumer's manifest, not your own README's claim about it.

```bash
gh api repos/meshery/meshery/contents/ui/package.json --jq '.content' | base64 -d | grep -i sistent
```

## The ledger

Keep this in a scratch file during the run. It is not committed; the evidence sheet is its published form.

| Claim (first 60 chars) | Citation | Command | Result | Disposition |
| --- | --- | --- | --- | --- |
| Meshery.io publishes the model registry... | `collections/_models` | `git ls-tree ... \| wc -l` | 788 | keep |
| The site enforces a page weight budget | `.github/workflows/lighthouse.yml` | `git cat-file -e` | not found | **delete** |

Every row reaches a disposition before you write a line of the evidence sheet.

## Failures that look like passes

**The nearby file.** You cite `src/colors/colors.ts`, it does not exist, and `src/colors/index.ts` does. Substituting it is only correct if you read it and it supports the claim. Usually you are pattern-matching on a filename.

**The vaguer rewrite.** The citation fails, so the claim becomes "the project generally favors centralized color definitions." Now it is unfalsifiable and it survived review. This is the worst outcome available to you. Delete instead.

**The directory stand-in.** `src/theme/` exists, so a claim about token synchronization gets `src/theme/` as its evidence. Directory existence supports almost nothing.

**The plural from a single instance.** One component has an ARIA label, and the claim becomes "components are instrumented with ARIA labels." Count them, then either narrow the claim to what you counted or drop it.

**The self-citation.** A claim in `VISION.md` cited to `CONTRIBUTING.md` where that line was added in the same series of changes. Vision may not cite documents this work introduced.

**Intent read as fact.** An open PR, a roadmap item, or a discussion thread is evidence that someone wants something. Mark it `Direction, not shipped state.` and keep it out of the shipped-fact sections.

**The command that will not run.** You cite `grep -l 'pattern'` with no file operand, having actually run it with a glob. The number is right and the command reads standard input, so a reader who pastes it gets a hang or a blank. Cite commands exactly as you ran them, operands included. An evidence sheet whose commands cannot be re-executed is an assertion wearing a costume.

**The count you subtracted.** You measure 377 of 394 matching one path and write "the remaining 17 are under X" without measuring X. Arithmetic is not verification: the residual may be spread across five different shapes, and one of them may be a defect worth naming. Measure every bucket you name.

## When a whole principle loses its evidence

Cut the principle. Three well-evidenced principles beat five where two are decorative, and the reviewer who finds the decorative one stops trusting the other four.
