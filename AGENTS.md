# AGENTS.md

Guidance for any AI coding agent working in a project that uses this accessibility pattern
library. This file follows the [agents.md](https://agents.md) convention and is read by Cursor,
GitHub Copilot, OpenAI Codex, Google Jules, Aider, and others.

## What this library is

40 accessibility pattern files covering every widget in the
[WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) plus the cross-cutting
concerns APG does not: focus management, live regions, colour contrast, and motion. Each file
carries critical rules, correct and incorrect examples, framework snippets, WCAG references, and
an implementation checklist.

## Read them one at a time

`patterns/INDEX.md` is a router: a decision table that maps a UI element, or an axe/Lighthouse
finding, to exactly one pattern file. Read the index, open the single file it points to, and stop.

Files average 12 KB. Loading all 40 costs roughly 130,000 tokens and measurably degrades output
quality — the relevant rules get buried under 39 files of irrelevant ones. Progressive disclosure
is not a nicety here; it is how the library is designed to work.

## Rules that apply to every UI change

1. **Native HTML first.** `<button>`, `<a href>`, `<input>`, `<select>`, `<details>`, `<dialog>`
   before any `role=` reimplementation. Adopting an ARIA role commits you to that role's entire
   keyboard model.
2. **No redundant ARIA.** Do not restate semantics the element already has.
3. **Keyboard operability.** Every interactive element reachable, operable, escapable, and
   visibly focused. Never remove a focus outline without replacing it.
4. **Accessible names.** Visible text, `<label for>`, `aria-label`, or `aria-labelledby`.
5. **Announce change.** Anything that appears, updates, or fails without a page load needs a live
   region or a deliberate focus move.
6. **`aria-hidden` is not access control.** It hides from assistive technology and nothing else.

## Scope discipline

State which mode you are in before you edit:

- **Remediation** — retrofitting an existing page. Markup, semantics, and ARIA only; the page must
  look identical to sighted users afterward. Two exceptions are inherently visual and cannot be
  fixed in markup: insufficient colour contrast and animation that ignores
  `prefers-reduced-motion`. Fix those in CSS and call them out.
- **Greenfield** — new components. Visual design and accessibility are decided together, so CSS is
  in scope.

## Verification and honest reporting

Run the checks in `docs/verification.md` after changing UI code. Automated tooling catches roughly
a third of WCAG failures, so:

- Report which criteria you verified mechanically.
- Report which need a human keyboard pass or screen-reader pass.
- Do not call a component "WCAG AA compliant" on the strength of a clean axe run.

## Contributing to this library

See [CONTRIBUTING.md](CONTRIBUTING.md). Every pattern file must follow the standard section
structure and cite the WCAG success criteria it addresses; `npm run validate` enforces the
mechanical parts.
