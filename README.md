# a11y-skills

**Accessibility patterns that AI coding agents actually load.**

43 reference files covering every widget in the [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/), plus the cross-cutting concerns the APG leaves out — focus management, live regions, colour contrast, and motion. Each file carries critical rules, correct and incorrect examples, framework snippets, WCAG references, and an implementation checklist.

Works with Claude Code, GitHub Copilot, Cursor, and any agent that reads `AGENTS.md`.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![WCAG 2.2 A/AA covered](https://img.shields.io/badge/WCAG%202.2-A%2FAA%20covered-blue.svg)](https://www.w3.org/WAI/WCAG22/quickref/)

---

## Why this exists

Ask an agent for a dropdown and you get `<div onClick>`. Ask it for an accessible dropdown and you get `<div onClick aria-label="dropdown">` — ARIA sprinkled on top of a broken keyboard model, which is worse than no ARIA at all, because it now *claims* to be a combobox.

The fix is not more prompting. It is giving the agent the same reference a senior accessibility engineer would reach for, and giving it at the moment the agent is writing that specific widget.

## Install

### Claude Code

```bash
/plugin marketplace add Elizabeth1979/a11y-skills
/plugin install a11y-skills
```

The `accessibility` skill activates on its own whenever you build or review UI. Nothing else to configure.

<details>
<summary>Or install without the plugin system</summary>

```bash
git clone https://github.com/Elizabeth1979/a11y-skills.git .a11y-skills
mkdir -p .claude/skills
cp -r .a11y-skills/skills/accessibility .claude/skills/
cp -r .a11y-skills/patterns .a11y-skills/docs .
```
</details>

### GitHub Copilot

```bash
git clone https://github.com/Elizabeth1979/a11y-skills.git .a11y-skills
cp -r .a11y-skills/patterns .a11y-skills/docs .
cp .a11y-skills/.github/copilot-instructions.md .github/
```

Copilot reads `.github/copilot-instructions.md` on every request; it routes to the right pattern file from there.

<details>
<summary>Or use per-file instructions with <code>applyTo</code> globs</summary>

Every pattern file already carries Copilot frontmatter. Drop the ones you want into `.github/instructions/` and Copilot will scope each to its own glob:

```bash
mkdir -p .github/instructions
cp .a11y-skills/patterns/{forms,buttons,dialog-modal}.instructions.md .github/instructions/
```

This loads those files eagerly on matching edits. Prefer the router above unless you want a small, fixed subset always in context.
</details>

### Cursor

```bash
git clone https://github.com/Elizabeth1979/a11y-skills.git .a11y-skills
cp -r .a11y-skills/patterns .a11y-skills/docs .
mkdir -p .cursor/rules && cp .a11y-skills/.cursor/rules/accessibility.mdc .cursor/rules/
```

### Any other agent

Copy `AGENTS.md`, `patterns/`, and `docs/` into your project. `AGENTS.md` is the [agents.md](https://agents.md) convention, read by Codex, Jules, Aider, and a growing list of others.

### Keeping it updated

Add the clone as a submodule instead of copying, and `git submodule update --remote` picks up new patterns:

```bash
git submodule add https://github.com/Elizabeth1979/a11y-skills.git .a11y-skills
```

## How it works

The library is built around one constraint: **an agent that loads all 43 files writes worse code than one that loads the right one.**

The 43 files total about 512 KB — roughly 131,000 tokens. Dumping that into context buries the twelve rules that matter under forty-two files of rules that do not, and it competes for attention with the code the agent is actually editing.

So the entry point is [`patterns/INDEX.md`](patterns/INDEX.md), a routing table:

```
| If you are building…                        | Open                |
|---------------------------------------------|---------------------|
| Autocomplete, typeahead, searchable select   | combobox            |
| A destructive-action confirmation            | alertdialog         |
| "axe: form elements must have labels"        | forms               |
```

The agent reads the index (6 KB), opens the one file it needs (12 KB), and stops. Three routing tables cover the three ways a task arrives: *build this widget*, *handle this page-level concern*, *fix this audit finding*.

That last table matters more than it looks. Most accessibility work in a real codebase starts as an axe violation string pasted into a chat window, not as "please build an accessible combobox".

## What's inside

43 patterns. Full one-line catalog in [`docs/quick-reference.md`](docs/quick-reference.md); routing table in [`patterns/INDEX.md`](patterns/INDEX.md).

<details>
<summary><strong>Widgets</strong> (31 files)</summary>

| | |
|---|---|
| [accordion](patterns/accordion.instructions.md) | Stacked collapsible sections |
| [alert](patterns/alert.instructions.md) | Non-interrupting status messages |
| [alertdialog](patterns/alertdialog.instructions.md) | Destructive-action confirmations |
| [breadcrumbs](patterns/breadcrumbs.instructions.md) | Hierarchical trail navigation |
| [buttons](patterns/buttons.instructions.md) | Actions, icon buttons, toggle buttons |
| [carousel](patterns/carousel.instructions.md) | Slideshows and auto-rotation |
| [checkbox](patterns/checkbox.instructions.md) | Dual-state and tri-state |
| [combobox](patterns/combobox.instructions.md) | Autocomplete and typeahead |
| [dialog-modal](patterns/dialog-modal.instructions.md) | Modals, drawers, overlays |
| [disclosure](patterns/disclosure.instructions.md) | Single show/hide toggles |
| [feed](patterns/feed.instructions.md) | Infinite scroll and auto-loading streams |
| [grid](patterns/grid.instructions.md) | Interactive data grids |
| [link](patterns/link.instructions.md) | Links, and link-versus-button |
| [listbox](patterns/listbox.instructions.md) | Selectable option lists |
| [menu](patterns/menu.instructions.md) | Menus and menubars |
| [menu-button](patterns/menu-button.instructions.md) | Buttons that open menus |
| [meter](patterns/meter.instructions.md) | Gauges, ratings, capacity displays |
| [radio](patterns/radio.instructions.md) | Mutually exclusive option groups |
| [slider](patterns/slider.instructions.md) | Single-value sliders |
| [slider-multithumb](patterns/slider-multithumb.instructions.md) | Two-thumb range sliders |
| [spinbutton](patterns/spinbutton.instructions.md) | Number inputs with steppers |
| [switch](patterns/switch.instructions.md) | On/off toggles |
| [tables](patterns/tables.instructions.md) | Static data tables |
| [tabs](patterns/tabs.instructions.md) | Tabbed panels |
| [toolbar](patterns/toolbar.instructions.md) | Grouped control rows |
| [tooltip](patterns/tooltip.instructions.md) | Hover and focus tooltips |
| [treegrid](patterns/treegrid.instructions.md) | Grids with expandable rows |
| [treeview](patterns/treeview.instructions.md) | File trees and nested navigation |
| [windowsplitter](patterns/windowsplitter.instructions.md) | Resizable split panes |
| [forms](patterns/forms.instructions.md) | Form structure, labels, fieldsets |
| [error-handling](patterns/error-handling.instructions.md) | Validation and error messaging |
| [authentication](patterns/authentication.instructions.md) | Sign-in, two-factor, redundant entry |
</details>

<details>
<summary><strong>Page structure and cross-cutting concerns</strong> (9 files)</summary>

| | |
|---|---|
| [accessibility](patterns/accessibility.instructions.md) | General rules and scope discipline |
| [headings](patterns/headings.instructions.md) | Document outline, `h1`–`h6` order |
| [landmarks](patterns/landmarks.instructions.md) | Page regions and the eight landmark roles |
| [skip-links](patterns/skip-links.instructions.md) | Bypassing repeated navigation |
| [image-labeling](patterns/image-labeling.instructions.md) | Alt text, SVG, decorative images |
| [focus-management](patterns/focus-management.instructions.md) | Focus in SPAs, modals, dynamic content |
| [live-regions](patterns/live-regions.instructions.md) | Announcing async change |
| [color-contrast](patterns/color-contrast.instructions.md) | WCAG ratios and accessible palettes |
| [motion-animation](patterns/motion-animation.instructions.md) | `prefers-reduced-motion`, autoplay |
| [target-size](patterns/target-size.instructions.md) | 24x24 pointer targets and the five exceptions |
| [dragging-movements](patterns/dragging-movements.instructions.md) | Single-pointer alternatives to dragging |
</details>

## Verifying the agent's work

[`docs/verification.md`](docs/verification.md) covers the checks an agent can actually run — `eslint-plugin-jsx-a11y`, axe-core in Playwright or Vitest, accessibility-tree snapshots, mechanical keyboard assertions — and, just as importantly, where those checks stop.

Automated tooling detects roughly a third of WCAG failures. It can tell you alt text exists; it cannot tell you the alt text is right. It can tell you a live region is present; it cannot tell you the announcement is useful. The library asks agents to report which criteria they verified mechanically and which still need a human keyboard or screen-reader pass, rather than declaring a component "WCAG AA compliant" off a green axe run.

## What this is not

- **Not a compliance guarantee.** It is a reference that makes good output likelier, not a certification.
- **Not a replacement for testing with disabled users.** Nothing in a pattern file tells you whether your product is usable, only whether it is conformant.
- **Not a linter.** It changes what the agent writes; `docs/verification.md` covers checking what it wrote.

## Contributing

New patterns, corrections, and framework examples are all welcome — corrections most of all. See [CONTRIBUTING.md](CONTRIBUTING.md) for the file format and the review bar. `npm run validate` enforces the mechanical parts (frontmatter, structure, links, index coverage) and runs in CI.

Planned work is in [ROADMAP.md](ROADMAP.md).

## Standards

- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) — the current W3C Recommendation
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — widget keyboard models
- [ARIA in HTML](https://www.w3.org/TR/html-aria/) — which roles are valid where

### What the WCAG 2.2 badge means

It means every criterion WCAG 2.2 *added* at Level A and AA has a pattern that covers it. It does
not mean your product conforms — no document can do that.

WCAG 2.2 introduced nine criteria. Where they live here:

| Criterion | Level | Covered in |
|---|---|---|
| 2.4.11 Focus Not Obscured (Minimum) | AA | [focus-management](patterns/focus-management.instructions.md) |
| 2.5.7 Dragging Movements | AA | [dragging-movements](patterns/dragging-movements.instructions.md) |
| 2.5.8 Target Size (Minimum) | AA | [target-size](patterns/target-size.instructions.md) |
| 3.2.6 Consistent Help | A | [landmarks](patterns/landmarks.instructions.md) |
| 3.3.7 Redundant Entry | A | [authentication](patterns/authentication.instructions.md) |
| 3.3.8 Accessible Authentication (Minimum) | AA | [authentication](patterns/authentication.instructions.md) |
| 2.4.12 Focus Not Obscured (Enhanced) | AAA | noted, not covered in depth |
| 2.4.13 Focus Appearance | AAA | noted, not covered in depth |
| 3.3.9 Accessible Authentication (Enhanced) | AAA | noted, not covered in depth |

The AAA criteria are named where relevant but not developed — the badge claims A/AA, and that is
what the patterns deliver.

Individual pattern files cite criteria as "WCAG 2.1" where the criterion originated in 2.1 and
carries into 2.2 unchanged. That is accurate, not stale.

Pattern content is original prose written against these specifications. Where an example follows an APG reference implementation, the pattern file names the APG pattern it derives from.

## License

[MIT](LICENSE).
