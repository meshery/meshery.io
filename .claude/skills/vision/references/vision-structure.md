# VISION.md structure

Reference for Step 4. The shape is fixed. The content is derived per repository.

## The whole document

```markdown
# Vision

<Why this project exists and for whom.>
<Who it serves, and what it turns into what.>
<The single thing it owns.>

## <Principle 1>

<Four to six declarative sentences.>

## <Principle 2>

## <Principle 3>

## Scope

<Four to six "This project is not X" sentences.>

<When a change aligns.>
<When a change should be resisted.>
```

Three to five principles. Under roughly 60 lines total. No other sections: no goals list, no roadmap, no metrics, no acknowledgements. Those belong in other documents and they dilute the one thing a vision is for, which is settling arguments about scope.

## The opening three sentences

They carry the most weight and get read the most often.

The third is the hardest and the most useful. "It owns exactly one thing: X." If you cannot finish that sentence, the repository has a scope problem and the vision is about to paper over it. Say so to the maintainer rather than writing something diplomatic.

Weak, because it describes every website ever built:

> Meshery.io is the official website for the Meshery project, providing information about features and documentation to users and contributors.

Strong, because only this repository could claim it:

> Meshery.io owns exactly one thing: the public front door to Meshery, including the generated model and catalog pages that publish the registry from `meshery/meshery` to the web.

## Principle headings

A short declarative claim about how the project behaves. Not a noun phrase, not a category label.

| Weak | Strong |
| --- | --- |
| Accessibility | Every page ships as a public artifact |
| Content management | Generated content stays generated |
| Data | Jekyll collections are the content contract |

The heading should be quotable in a review comment on its own: "Generated content stays generated, so this edit will be overwritten on the next sync."

## Principle sentences

Declarative present tense. One idea each. Falsifiable.

Weak, in the ways that matter:

> Meshery.io strives to provide a high-quality, performant, and accessible experience for all users across all devices.

Unfalsifiable, unattributable, and true of any site. Nothing in it can be violated by a specific pull request.

> The site should probably avoid hardcoding data that exists upstream.

Hedged into uselessness. "Should probably" cannot decide a review.

Strong:

> Catalog and model pages under `collections/_catalog` and `collections/_models` are written by `.github/workflows/update-catalog.yml` and are not hand-edited.

Names the trees, names the mechanism, and tells you exactly which pull request it rejects.

The test: can you point at a change that this sentence forbids? If not, cut it.

## The Scope section

Non-goals, each phrased as "This project is not X."

Every non-goal must be something a contributor has proposed or plausibly could. "Meshery.io is not a database engine" is filler. "Meshery.io is not the documentation site" is a boundary people cross monthly.

The best source is the correction maintainers repeat in review. Search closed pull requests for the sentence a maintainer has typed more than twice; that is a non-goal that has been enforced without ever being written down.

## The closing pair

Exactly two sentences.

> A change aligns when it <specific, checkable conditions>.
>
> A change should be resisted when it <specific, checkable conditions>.

These are what a reviewer quotes. Make them enumerate concrete conditions rather than restating the principles as adjectives. "A change aligns when it improves quality" is not usable in a review; "A change aligns when it keeps generated trees generated, keeps content in a collection with a layout, and does not duplicate docs.meshery.io" is.

## Tense and voice

Present tense, indicative. The vision describes how the project behaves now, calibrated by maintainers who intend to keep it behaving that way.

- Not aspirational: "we will," "we aim to," "our goal is."
- Not hedged: "should probably," "generally tries to," "where possible."
- Not first-person plural: "we believe in composability." Name the project instead.

Where a claim genuinely describes direction rather than current state, it can stay, but it is marked `Direction, not shipped state.` in the evidence sheet. Keep those rare. A vision that is mostly direction is a roadmap wearing a disguise.
