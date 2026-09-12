# Hypotheticals

Reference for Step 6. Ten stress tests on the project's boundaries, each recorded with a verdict of one of three kinds: answered by a maintainer and quoted verbatim, derived from repository behavior with the line that settles it, or left explicitly `Open`.

## What the ten are for

A principle written in calm weather tells you nothing about what happens under pressure. The hypotheticals apply the pressure while the cost is still zero, and the record of how the question was settled is what makes the vision usable a year later by someone who was not in the room.

The verdicts are the deliverable. The prose around them is packaging. A record that is honest about which verdicts came from a person, which from a workflow, and which are still open is worth more than a complete-looking one where you cannot tell the difference.

## What makes a hypothetical worth asking

**You cannot predict the answer from the principle.** If the principle as drafted already settles it, you have written a restatement and it teaches nobody anything.

That is different from a question the *repository* settles. Those are worth asking and are recorded as derived verdicts: the contributor reading the vision does not know that a workflow deletes the tree, even though the workflow does. What you must not do is guess which way a maintainer would rule and record the guess.

**A real contributor would propose it.** Draw from open issues, from recurring review comments, from the thing someone tried last quarter. Invented dilemmas produce invented answers.

**It is genuinely appealing.** The case *for* has to be the strongest version, argued the way its advocate would argue it. A hypothetical you can knock down in one sentence was not a test.

**It pushes on a boundary, not a preference.** "Should the nav bar be sticky" is a design question. "Should the site host API reference content that duplicates docs.meshery.io" is a boundary question.

## Construction

Each of your three to five principles contributes the rejection you wrote beside it in Step 2. That gives three to five. Fill the rest from these angles:

- **The convenience trade.** Something that would genuinely make contributors' lives easier and costs a boundary to get.
- **The single exception.** One special case, just this once, for a good reason. Tests whether the principle is a rule or a preference.
- **The upstream pull.** A sibling repository wants this one to absorb a responsibility. Tests the ownership sentence.
- **The scale case.** The principle holds at the current size. Does it hold at ten times the content, contributors, or consumers?
- **The deprecation case.** Something the project already does that the new principles would now forbid. Frequently the most uncomfortable and the most informative.
- **The reversal.** Take a non-goal from the Scope section and make the best case for doing it anyway.

Cover different principles. Ten hypotheticals all testing Principle 1 leave the rest uncalibrated.

## Presenting one

Two sentences of proposal, the principle it tests, then both sides honestly.

```markdown
## Hypothetical N: <short title>

* **Proposal**: <two sentences, concrete and specific to this repository>
* **Tests**: Principle <n> (<heading>)
* **For**: <the strongest real argument, stated as its advocate would state it>
* **Against**: <what it costs, named concretely>
```

Then collect the verdict. Do not editorialize before the maintainer answers, and do not signal which way you lean.

## Recording the answer

Three record types. Pick by where the answer actually came from, never by which one is easiest to fill.

**Maintainer verdict.** A person ruled.

```markdown
* **Verdict**: **RESIST**
* **Reasoning (verbatim)**:
  > "<the maintainer's words, exactly as given>"
* **Changelog**: <the edit this produced in VISION.md, or "No edit; principle already covered this.">
```

**Derived verdict.** The repository settles it, and a repository file or command is the answer: a workflow, a config file, a plugin or script, a committed data file, or the observable result of a command run against the repository.

```markdown
* **Verdict (derived from repository behavior)**: **RESIST**. <the mechanism, with the file and lines that establish it>
* **Changelog**: <the edit this produced, or "No edit; principle already covered this.">
```

**Open.** Nobody has ruled and the repository does not settle it.

```markdown
* **Verdict**: Open - awaiting maintainer.
* **Changelog**: Pending.
```

Rules, in order of importance:

1. **Verbatim means verbatim.** Their phrasing, their emphasis, their hedges, their sentence fragments. Do not tidy the grammar. Do not expand an abbreviation. Do not merge two sentences into one better one.
2. **Never write a quote.** A synthesized quote under a verbatim label is a fabrication. It is the single worst thing this skill can produce, because the entire value of the file rests on the quotes being real. A derived verdict never gets a `verbatim` block, because there is nobody to quote.
3. **Derive only what the repository actually settles.** "This workflow deletes the tree before regenerating it, so hand edits do not survive" is derived. "This tree should stay off limits" is a judgment about what the project wants, and it is not yours to make. If the cited line does not establish the mechanism, the record is `Open`, not derived.
4. **`Open` is a finished record, not a gap.** Leaving a judgment call open is correct. Filling it to make the file look complete is the failure this whole format exists to prevent.
5. **A maintainer verdict with no prose gets `No reasoning recorded.`** Ask once. If they do not want to elaborate, that is a legitimate answer.
6. **`Refine` sends you back to Step 4.** The principle as drafted is wrong. Change it, then record what changed.

If review later shows a derived verdict rested on a citation that does not support it, the honest repair is to demote the record to `Open` and say so in the entry, not to hunt for a different citation that reaches the same conclusion.

## The changelog

Every settled verdict maps to an edit or to an explicit note that none was needed. An `Open` record carries `Pending.` until someone rules.

The recurring defect in this format is a changelog entry describing an edit that never landed: "Added a partial-data fallback rule to Principle 2," where Principle 2 says nothing about fallbacks. Reviewers catch it, and it undermines the document that was supposed to be the rigorous one. After writing each changelog line, open `VISION.md` and confirm the text it describes is actually there.

"No edit; the principle already covered this" is a good outcome and worth recording. It means the principle held under pressure.

## Keeping the file honest over time

`docs/vision/vision-hypotheticals.md` is append-only. A verdict records what a maintainer decided on a date, and that stays true even after the vision moves past it. When re-running, add a new dated section. Do not rewrite history to agree with the current text.
