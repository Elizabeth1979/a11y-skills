# Contributing

Corrections are the most valuable contribution here. A pattern file that teaches an agent the
wrong keyboard model does damage at scale — it produces confidently broken code in every project
that installs this library. If you find one, please open an issue even if you have no fix.

## Ways to contribute

| | |
|---|---|
| **Correct a pattern** | Something contradicts the spec, the APG, or observed AT behaviour |
| **Add a framework example** | React, Vue, Svelte, Angular, Astro snippets for an existing pattern |
| **Add a pattern** | A widget or concern not yet covered |
| **Improve routing** | A symptom or phrasing that should map to a pattern but doesn't |

## Ground rules

**Cite the spec.** Every rule needs a source: a WCAG success criterion, an
[APG pattern](https://www.w3.org/WAI/ARIA/apg/patterns/), the
[ARIA spec](https://www.w3.org/TR/wai-aria-1.2/), or [ARIA in HTML](https://www.w3.org/TR/html-aria/).
"I've always done it this way" is not a source.

**Native HTML first.** If a native element does the job, the pattern must say so before it shows
an ARIA alternative. Patterns that reach for `role=` where `<button>` would do get rejected.

**Show the failure, not just the fix.** The bad example teaches more than the good one, because it
is what the agent would otherwise have written. Say *why* it fails and *who* it fails for.

**Where AT behaviour diverges from spec, document the divergence.** Screen readers do not
implement ARIA uniformly. If a pattern only works in some, name them and say what happens in the
others. Do not present a workaround as if it were the spec.

**No visual-design opinions.** Patterns govern semantics, keyboard, and announcement. Colour
contrast and reduced motion are the two exceptions, because those failures are inherently visual.

## Adding a pattern

1. Create `patterns/<kebab-case-name>.instructions.md`.
2. Use this frontmatter:

   ```yaml
   ---
   description: Instructions for proper <thing> accessibility following WAI-ARIA APG patterns
   applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
   ---
   ```

   Add `css,scss` to `applyTo` only if the pattern genuinely concerns styling.

3. Follow the standard section order:

   ```markdown
   # <Thing> Accessibility

   ## CRITICAL RULES          numbered rules, each with a good and a bad example
   ## Complete <Thing> Structure   one full, copy-ready implementation
   ## Examples                framework variants and real-world cases
   ## WCAG References         success criteria, each with number and name
   ## Implementation Checklist  checkbox list an agent can work through
   ## Quick Reference         the attribute/keyboard table
   ```

4. Add a row to `patterns/INDEX.md` — under the widget table, the page-concern table, or both.
   If the pattern fixes a named axe rule, add a symptom row too.
5. Add a row to `docs/quick-reference.md` and to the catalog in `README.md`.
6. Run `npm run validate`. It checks frontmatter, required sections, kebab-case naming, every
   relative link, and that the new file is reachable from all three catalogs.
7. Note the change in `CHANGELOG.md` under `[Unreleased]`.

Steps 4–6 are not busywork: a pattern absent from the index is a pattern no agent will ever open.

## Keyboard interaction tables

Every widget pattern needs a complete keyboard table. Incomplete tables are how agents ship
half-implemented ARIA widgets — the role promises behaviour the code doesn't have. Cover, at
minimum: `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, the arrow keys the role requires, and
`Home`/`End` where the APG specifies them.

## Pull requests

Keep one pattern per PR where you can. In the description, say:

- Which WCAG criteria the change addresses
- Which spec or APG section supports it
- How you verified it — axe, a real screen reader (name it and its browser), or spec reading alone

Spec reading alone is an acceptable answer. Say so rather than implying testing you didn't do.

## Code of conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
