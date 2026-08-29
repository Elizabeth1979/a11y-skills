---
name: accessibility
description: Write or fix accessible web UI following WCAG 2.2 and the WAI-ARIA Authoring Practices Guide. Use when building or reviewing any interactive component (buttons, forms, dialogs, menus, tabs, tables, comboboxes, carousels), when fixing axe/Lighthouse/WAVE findings, or when handling keyboard navigation, focus management, ARIA roles, alt text, color contrast, or reduced motion.
---

# Accessibility Patterns

A routed reference of 43 accessibility pattern files covering every WAI-ARIA APG widget
plus cross-cutting concerns (focus, live regions, contrast, motion).

## How to use this skill

**Do not read all the pattern files.** Each is 8–16 KB; loading them all wastes context
and makes your output worse. Use progressive disclosure:

1. **Route.** Read `patterns/INDEX.md` — a decision table mapping UI elements and
   audit symptoms to exactly one file.
2. **Load one.** Open only the pattern file the index points to.
3. **Apply.** Each pattern file has `CRITICAL RULES`, good/bad examples, framework
   snippets, WCAG references, and an implementation checklist. Work the checklist.
4. **Verify.** Run the checks in `docs/verification.md` and report what tooling
   cannot cover.

If the task spans several widgets, load the pattern files one at a time as you reach
each widget, rather than loading them all up front.

## Non-negotiable defaults

Eleven rules hold regardless of which pattern file you load — native HTML before ARIA, no
redundant ARIA, keyboard operability, visible focus, an accessible name on every control,
announced change, 24x24 pointer targets, and so on.

**They live in one place: the "The Non-Negotiables" section of
`patterns/accessibility.instructions.md`.** Read it once at the start of accessibility work.
It is not restated here, because a rule that lives in four files drifts in four directions.

## Scope discipline

Two distinct modes — pick the one the task calls for and say which you are in:

- **Remediation mode** (retrofitting an existing page): change markup, semantics, and
  ARIA only. Do not restyle. The page must look identical to sighted users afterward.
  The exceptions are the two failures that are *inherently* visual and cannot be fixed
  in markup: insufficient color contrast and motion that ignores
  `prefers-reduced-motion`. Fix those in CSS, and call the change out explicitly.
- **Greenfield mode** (new components): accessibility and visual design are decided
  together, so CSS is in scope from the start.

## Honest reporting

Automated tools detect roughly a third of WCAG failures. When you finish, state which
criteria you verified mechanically and which still need a human keyboard pass or a
screen-reader pass. Never describe a component as "WCAG AA compliant" on the strength
of a clean axe run alone.

## Reference map

Paths are relative to the library root — the repository root if this was cloned, or
`${CLAUDE_PLUGIN_ROOT}` if installed as a plugin. If a path below does not resolve, search the
workspace for `INDEX.md` under a `patterns/` directory and read paths relative to that.

| Area | Path |
|---|---|
| Router — read this first | `patterns/INDEX.md` |
| General rules and scope modes | `patterns/accessibility.instructions.md` |
| One-line catalog of all 43 | `docs/quick-reference.md` |
| Automated checks | `docs/verification.md` |
| The patterns themselves | `patterns/<name>.instructions.md` |
