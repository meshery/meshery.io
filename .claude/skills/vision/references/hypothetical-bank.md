# Hypotheticals

Reference for Step 6. Ten stress tests, answered by a maintainer, recorded in their words.

## What the ten are for

A principle written in calm weather tells you nothing about what happens under pressure. The hypotheticals apply the pressure while the cost is still zero, and the record of how a maintainer ruled is what makes the vision usable a year later by someone who was not in the room.

The verdicts are the deliverable. The prose around them is packaging.

## What makes a hypothetical worth asking

**You cannot predict the answer.** This is the whole test. If the principle already settles it, you have written a restatement and it teaches nobody anything.

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

```markdown
* **Verdict**: **RESIST**
* **Reasoning (verbatim)**:
  > "<the maintainer's words, exactly as given>"
* **Changelog**: <the edit this produced in VISION.md, or "No edit; principle already covered this.">
```

Rules, in order of importance:

1. **Verbatim means verbatim.** Their phrasing, their emphasis, their hedges, their sentence fragments. Do not tidy the grammar. Do not expand an abbreviation. Do not merge two sentences into one better one.
2. **Never write a quote.** A synthesized quote under a verbatim label is a fabrication. It is the single worst thing this skill can produce, because the entire value of the file rests on the quotes being real.
3. **A verdict with no prose gets `No reasoning recorded.`** Ask once. If the maintainer does not want to elaborate, that is a legitimate answer and the gap is honest.
4. **`Refine` sends you back to Step 4.** The principle as drafted is wrong. Change it, then record what changed.

## The changelog

Every verdict maps to an edit or to an explicit note that none was needed.

The recurring defect in this format is a changelog entry describing an edit that never landed: "Added a partial-data fallback rule to Principle 2," where Principle 2 says nothing about fallbacks. Reviewers catch it, and it undermines the document that was supposed to be the rigorous one. After writing each changelog line, open `VISION.md` and confirm the text it describes is actually there.

"No edit; the principle already covered this" is a good outcome and worth recording. It means the principle held under pressure.

## Keeping the file honest over time

`docs/vision/vision-hypotheticals.md` is append-only. A verdict records what a maintainer decided on a date, and that stays true even after the vision moves past it. When re-running, add a new dated section. Do not rewrite history to agree with the current text.
