# AGENTS.md

Guidance for any AI coding agent working in a project that uses this accessibility pattern
library. This file follows the [agents.md](https://agents.md) convention and is read by Cursor,
GitHub Copilot, OpenAI Codex, Google Jules, Aider, and others.

## What this library is

43 accessibility pattern files covering every widget in the
[WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) plus the cross-cutting
concerns APG does not: focus management, live regions, colour contrast, and motion. Each file
carries critical rules, correct and incorrect examples, framework snippets, WCAG references, and
an implementation checklist.

## Read them one at a time

`patterns/INDEX.md` is a router: a decision table that maps a UI element, or an axe/Lighthouse
finding, to exactly one pattern file. Read the index, open the single file it points to, and stop.

Files average 12 KB. Loading all 43 costs roughly 131,000 tokens and measurably degrades output
quality — the relevant rules get buried under 39 files of irrelevant ones. Progressive disclosure
is not a nicety here; it is how the library is designed to work.

## Rules that apply to every UI change

Eleven non-negotiables govern every UI change: native HTML before ARIA, no redundant ARIA,
keyboard operability, visible focus, an accessible name on every control, announced change,
24x24 pointer targets, a no-drag alternative for anything draggable, contrast, described errors,
and `aria-hidden` never being access control.

**They are written once, in the "The Non-Negotiables" section of
`patterns/accessibility.instructions.md`.** Read that section at the start of accessibility work.
This file deliberately does not restate them — four copies of a rule drift in four directions,
and the routers exist to point, not to teach.

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
