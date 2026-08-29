# CLAUDE.md

Guidance for Claude Code working **on this repository**.

If you are looking for accessibility guidance to apply to *other* code, this is the wrong file —
use `skills/accessibility/SKILL.md` and route through `patterns/INDEX.md`.

## What this repository is

A documentation library, not an application. There is no `src/`, no build step, and no runtime.
It ships 43 markdown pattern files plus the packaging that lets four different agent ecosystems
find the right one.

```
patterns/            43 pattern files + INDEX.md, the single source of truth
  INDEX.md           routing table: UI element or axe finding -> exactly one file
docs/
  quick-reference.md one-line catalog of all 43
  verification.md    checks an agent can actually run
skills/accessibility/SKILL.md    Claude Code skill (router)
.claude-plugin/      plugin + marketplace manifests
.github/copilot-instructions.md  Copilot router
.cursor/rules/       Cursor router
AGENTS.md            cross-agent router (agents.md convention)
scripts/validate.mjs structure, link, and coverage checks
```

**Content lives in `patterns/` only.** Everything else routes to it. If you find yourself copying
pattern text into a router file, stop — the routers exist so that the content has exactly one home.

## The one rule that shapes everything

Loading all 43 pattern files costs roughly 131,000 tokens and makes output *worse*, because the
rules that matter get buried. Every design decision here follows from that:

- Routers are short and stay short. They point; they do not teach.
- `patterns/INDEX.md` must route to every pattern, or that pattern is unreachable in practice.
- New patterns go in `patterns/`, never into a router.

When editing a router, ask whether you are adding a pointer or adding content. Only the first is
in scope.

## Before you commit

```bash
npm run validate
```

Checks frontmatter (`description` + `applyTo`), required sections (`WCAG References`,
`Implementation Checklist`), kebab-case filenames, every relative link across the repo, that each
pattern is reachable from `INDEX.md`, `README.md`, and `docs/quick-reference.md`, and that stated
counts match reality. It runs in CI on every pull request.

Adding a pattern means touching four files, and the validator will tell you if you missed one:

1. `patterns/<name>.instructions.md`
2. `patterns/INDEX.md` — at least one routing row
3. `README.md` — catalog table
4. `docs/quick-reference.md` — one-line summary

Then note it in `CHANGELOG.md` under `[Unreleased]`.

## Pattern file structure

```markdown
---
description: ...
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# <Thing> Accessibility

## CRITICAL RULES              numbered, each with a good and a bad example
## Complete <Thing> Structure  one full copy-ready implementation
## Examples                    framework variants
## WCAG References             criteria by number and name
## Implementation Checklist    checkboxes an agent works through
## Quick Reference             attribute and keyboard tables
```

The bad examples are load-bearing. They are what the model would otherwise generate, so removing
them to "tidy up" makes the pattern less effective, not cleaner.

## Writing standards for pattern content

- **Cite the spec.** Every rule needs a WCAG criterion, an APG pattern, or an ARIA spec section.
- **Native HTML before ARIA.** If a native element does the job, say so before showing an ARIA
  alternative. An ARIA role is a commitment to implement that role's entire keyboard model.
- **Complete keyboard tables.** Partial tables are how half-implemented widgets ship.
- **Name the divergence.** Where screen readers behave differently, say which ones and what
  happens. Do not present a workaround as if it were the spec.
- **No compliance claims.** No document makes a product conformant.

## Commits

Format: `type: description`, where type is one of `feat`, `fix`, `docs`, `a11y`, `refactor`,
`test`, `chore`.

```
feat: add date-picker pattern
fix: correct combobox aria-activedescendant guidance
docs: clarify remediation vs greenfield scope
```

Develop on `claude/`-prefixed branches. `main` is protected.

## Things that are easy to get wrong here

- **Editing a router instead of a pattern.** Routers point; patterns teach.
- **Adding a pattern without routing it.** An unrouted pattern is a file no agent will ever open.
  The validator catches this.
- **Stating a count.** Skill counts drift. The validator checks the ones in `README.md` and
  `AGENTS.md`; prefer not to add more.
- **Assuming a build step.** There isn't one. `npm run validate` is the whole toolchain.
