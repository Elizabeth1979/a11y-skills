# Verification

Guidance an agent cannot act on is guidance an agent will skip. "Test with NVDA" is sound advice
for a human and useless to a coding agent — it has no screen reader. This page lists the checks an
agent *can* run, and states plainly where the machine-checkable part stops.

## The ceiling on automation

Automated accessibility tooling detects roughly **30–40%** of WCAG failures. Deque, the maintainer
of axe-core, puts axe's own coverage at about 57% of issues *by volume* on typical pages, because
a handful of mechanical failures (missing alt text, low contrast, unlabelled inputs) are extremely
common. Neither number means a clean run implies compliance.

What automation reliably catches:

- Missing or empty accessible names
- Colour contrast below threshold for static text
- Invalid ARIA roles, states, and properties
- Broken `aria-labelledby` / `aria-describedby` / `aria-controls` references
- Duplicate `id`s, missing `lang`, heading-order violations
- Missing landmarks, missing form labels

What automation cannot judge:

- Whether alt text is *accurate* or merely present
- Whether the tab order is *logical*
- Whether a live-region announcement is *useful* or floods the user
- Whether focus lands somewhere *sensible* after a route change or a delete
- Whether an error message tells the user *how to fix* the problem
- Whether a custom widget's keyboard model actually matches the APG

Everything in the second list needs a human. Say so in your report.

## Static analysis

Fastest feedback, no browser required. Catches problems as code is written.

```bash
npm install --save-dev eslint-plugin-jsx-a11y      # React / JSX
npm install --save-dev eslint-plugin-vuejs-accessibility  # Vue
npm install --save-dev @html-eslint/eslint-plugin  # plain HTML
```

Svelte and Astro ship accessibility warnings in their compilers — do not silence them.

Static analysis sees markup, not the rendered page, so it misses contrast, computed names, and
anything produced at runtime.

## Runtime auditing

### axe-core in a test suite

The highest-value check to add to a project, because it runs in CI on every change.

```bash
npm install --save-dev @axe-core/playwright
```

```js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has no detectable accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

Equivalents: `jest-axe` and `vitest-axe` for component tests, `cypress-axe` for Cypress,
`@axe-core/react` for development-time console warnings.

Component-level axe runs are worth as much as page-level ones and are far faster — assert on every
component in your library.

### Command line

```bash
npx @axe-core/cli http://localhost:3000
npx pa11y --standard WCAG2AA http://localhost:3000
npx lighthouse http://localhost:3000 --only-categories=accessibility --output=json
```

## Keyboard verification

An agent driving a browser can check the parts of keyboard access that are mechanical.

```js
// Every interactive element must be reachable and must show a focus indicator.
test('modal traps focus and returns it on close', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open settings' }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Focus must have moved into the dialog.
  await expect(dialog).toContainText(await page.evaluate(() => document.activeElement.textContent));

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();

  // Focus must return to the trigger.
  await expect(page.getByRole('button', { name: 'Open settings' })).toBeFocused();
});
```

Checks worth automating this way:

- Tab reaches every interactive element; nothing is stranded behind a mouse-only handler
- `Escape` closes dialogs, menus, and comboboxes
- Focus enters a dialog on open and returns to the trigger on close
- Arrow keys move within composite widgets (grid, listbox, menu, tabs, treeview)
- No positive `tabindex` values anywhere in the document

## The accessibility tree

Playwright and Puppeteer can dump the computed accessibility tree — the closest an agent gets to
"what a screen reader would say".

```js
const snapshot = await page.accessibility.snapshot();
console.log(JSON.stringify(snapshot, null, 2));
```

Read it for names and roles that are missing, wrong, or unhelpfully generic ("button", "link",
"image" with nothing else). Playwright's `page.getByRole()` locators are themselves an
accessibility assertion: if you cannot select an element by its role and accessible name, a screen
reader user cannot find it either. Prefer role-based locators over `data-testid` for exactly this
reason.

## Contrast

`patterns/color-contrast.instructions.md` carries the ratios and the maths. To check
programmatically, axe-core covers static text; for design tokens, compute the ratio directly from
the WCAG relative-luminance formula rather than eyeballing swatches.

## Suggested CI gate

```yaml
- run: npm run lint          # includes eslint-plugin-jsx-a11y
- run: npm run test:a11y     # axe-core assertions, fail on any violation
```

Fail the build on violations rather than reporting them. A warning nobody blocks on becomes
permanent.

## What to write in your report

After changing UI code, state:

1. Which pattern file you applied.
2. Which checks you ran, and their results.
3. Which WCAG criteria remain unverified and need a human — specifically a keyboard pass, a
   screen-reader pass, or a judgement call on wording.

That third item is not a hedge. It is the honest boundary of what a coding agent can establish on
its own, and stating it is what makes the first two items trustworthy.
