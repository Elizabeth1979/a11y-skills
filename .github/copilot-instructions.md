# Accessibility instructions for GitHub Copilot

This project uses the [a11y-skills](https://github.com/Elizabeth1979/a11y-skills) accessibility
pattern library. Apply it to every change that touches user interface code.

## Routing

Do not read all 40 pattern files. Open `patterns/INDEX.md` first — it maps a UI element or an
audit finding to exactly one file — then read only that file.

## Always apply

- Use native HTML elements before ARIA-plus-JavaScript reimplementations.
- Do not add redundant ARIA to elements that already carry the semantics.
- Every interactive element must be keyboard-operable with a visible focus indicator.
- Every control must have an accessible name.
- Announce dynamic changes with a live region or a deliberate focus move.

## Scope

When retrofitting an existing page, change markup and ARIA only — the page must look unchanged
to sighted users. The two exceptions are colour contrast and `prefers-reduced-motion`, which
can only be fixed in CSS; make those changes explicitly and say so.

## Verify

Run the automated checks in `docs/verification.md`, then state which WCAG criteria still need a
manual keyboard or screen-reader pass. A clean axe run is necessary, not sufficient.
