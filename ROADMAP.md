# Roadmap

Where this library is going, and the reasoning behind the sequence. Phases are ordered by what
unblocks the next thing, not by effort.

---

## Phase 0 — Open-source readiness ✅

Shipped. The repository was previously a flat pile of 40 files with no license, no contribution
path, and no way for an agent to find the right one.

- MIT license, contribution guide, code of conduct, issue and PR templates
- `patterns/INDEX.md` — routing table replacing "read whatever looks relevant"
- Native packaging for Claude Code (plugin + skill), GitHub Copilot, Cursor, and `AGENTS.md`
- `docs/verification.md` — checks an agent can actually run
- `npm run validate` in CI — frontmatter, structure, links, and catalog coverage

---

## Phase 1 — Earn trust in the content

**The problem:** nobody can currently tell whether these 40 files are *correct*. They read well
and follow APG structure, but there is no review trail, no provenance, and no record of which
patterns were checked against a real screen reader. For a library whose entire value proposition
is "trust this over the model's priors", that gap is the biggest risk in the repository.

- **Expert technical review.** Route each pattern past someone who does this professionally.
  Record the reviewer and date in the file, so a reader can see what has been checked and what
  has not. Unreviewed is fine; unreviewed-and-unmarked is not.
- **Assistive-technology behaviour notes.** ARIA is implemented unevenly. Where NVDA, JAWS, and
  VoiceOver diverge, the pattern should say so and name versions, rather than presenting one
  behaviour as universal.
- **Provenance.** For each pattern derived from an APG reference implementation, link the APG
  pattern it derives from. Good practice, and it heads off licensing ambiguity.
- **WCAG 2.2 sweep — done at A/AA.** All six criteria WCAG 2.2 added at Level A and AA now have
  a home: `target-size`, `dragging-movements`, and `authentication` are new files; 2.4.11 went
  into `focus-management`, 3.2.6 into `landmarks`, 3.3.7 into `forms` and `authentication`. The
  three AAA additions are named where relevant but not developed. Like everything else here,
  this content is written from the spec and has not been through expert review.
- **Deduplicate the remaining boilerplate.** The cross-router duplication is fixed — the eleven
  non-negotiables now live only in `patterns/accessibility.instructions.md` and the four routers
  point at it. Several *pattern* files still repeat near-identical focus and labelling rules;
  each repetition is a place the guidance can drift out of sync with itself.

- **Collapse three catalogs into one.** Adding a pattern currently means editing `INDEX.md`,
  `README.md`, and `docs/quick-reference.md`, and the validator enforces all three.
  `quick-reference.md` substantially duplicates `INDEX.md`; generating the README table and the
  quick reference from the index would leave one file to edit instead of three.

- **Verify the packaging actually loads.** The plugin manifest, marketplace schema, and skill
  discovery have been checked for valid JSON and required keys, not for a working
  `/plugin install`. Until someone runs that command, the README's headline install instruction
  is unverified.

---

## Phase 2 — Measure whether it works

**The problem:** the claim "these patterns make agents write more accessible code" is untested.
Every skill library on GitHub makes that claim. Almost none can support it, and a library that
cannot show its effect is indistinguishable from one that has none.

This is the phase that would make the project genuinely unusual.

**Build an eval harness.** The loop:

1. A fixed set of prompts — *"build a searchable country picker"*, *"add a delete confirmation"*,
   *"make this table sortable"* — chosen to hit different patterns.
2. Generate each twice: baseline model, and model with the library installed.
3. Score both mechanically:
   - axe-core violations (count and severity)
   - keyboard assertions in Playwright — reachability, `Escape`, focus return, arrow-key movement
   - accessibility-tree snapshot diffed against the expected roles and names
4. Report the delta per pattern.

**What this gives you that nothing else does:**

- Evidence for the README, replacing an assertion with a number
- Per-pattern quality signal — a pattern that fails to move the score is badly written, not
  merely unlucky, and you find out which ones
- Regression protection when patterns are edited
- A basis for the honest negative result: patterns where the baseline model is already fine, and
  the file earns its context cost only rarely

**Sequence.** Ten prompts across five patterns is enough to learn something. Do that before
building anything general.

---

## Phase 3 — Distribution

**The problem:** a library nobody installs helps nobody. Installation is currently a `git clone`
and some `cp` commands for every ecosystem except Claude Code.

- **Publish the Claude Code plugin** to a public marketplace so `/plugin install` works without
  adding the marketplace by hand.
- **`npx a11y-skills init`** — detect the project's agent tooling and framework, then write the
  right router into the right place. One command instead of a clone plus three copies.
- **Framework coverage.** Examples currently lean React. Vue, Svelte, Angular, and Astro users
  each need to translate the snippets mentally, which is exactly the friction that makes people
  skip the file.
- **A worked example repository.** A small deliberately-inaccessible app, plus the transcript of
  an agent fixing it with the library. More persuasive than any README paragraph, and it doubles
  as an eval fixture.

---

## Phase 4 — Sustain it

**The problem:** documentation repositories decay quietly. WCAG 3.0 is in draft, the APG changes,
screen readers ship new behaviour, and nothing in the repo notices.

- **Scheduled link checking** for the external spec URLs — W3C reorganises.
- **Spec-drift watch.** A quarterly issue to diff the APG against the patterns.
- **Release discipline.** Tag versions so consumers can pin, and keep the changelog honest about
  what changed in guidance rather than only what files moved.
- **Coverage gaps worth filling.** Data visualisation and charts; drag-and-drop (WCAG 2.5.7);
  rich text editors; date pickers; maps; video players and captions; internationalisation and
  right-to-left. Each is a common source of inaccessible code and none is in the APG.
- **Governance.** As contributor count grows, write down who decides what a "correct" pattern is.

---

## Deliberately not doing

- **A linter or runtime library.** Static analysis and axe-core already do this well. The gap
  this project fills is what the agent writes, not what the CI checks afterwards.
- **A skill per WCAG criterion.** Criteria are an auditor's mental model. Developers and agents
  think in widgets, and routing works better when it matches how the task arrives.
- **Compliance claims.** No document makes a product conformant. Overstating this is how
  accessibility work loses credibility with the teams that have to do it.
