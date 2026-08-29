# Accessibility instructions for GitHub Copilot

This project uses the [a11y-skills](https://github.com/Elizabeth1979/a11y-skills) accessibility
pattern library. Apply it to every change that touches user interface code.

## Routing

Do not read all 43 pattern files. Open `patterns/INDEX.md` first — it maps a UI element or an
audit finding to exactly one file — then read only that file.

## Always apply

Read the "The Non-Negotiables" section of `patterns/accessibility.instructions.md` — eleven rules
that hold for every UI change, kept in that one file so they cannot drift. The shortest version:
**use native HTML before reaching for ARIA**, because an ARIA role is a promise to implement its
whole keyboard model.

## Scope

When retrofitting an existing page, change markup and ARIA only — the page must look unchanged
to sighted users. The two exceptions are colour contrast and `prefers-reduced-motion`, which
can only be fixed in CSS; make those changes explicitly and say so.

## Verify

Run the automated checks in `docs/verification.md`, then state which WCAG criteria still need a
manual keyboard or screen-reader pass. A clean axe run is necessary, not sufficient.
