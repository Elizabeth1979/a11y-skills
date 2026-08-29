---
description: Router index — maps a UI element or accessibility symptom to exactly one pattern file
applyTo: '**/*.{html,css,scss,jsx,tsx,vue,svelte,astro}'
---

# Pattern Index (Router)

**For AI agents: read this file first, then open _only_ the one or two pattern files you need.**
Each pattern file is 8–16 KB. Loading all 40 wastes context and degrades output quality.
Match on what you are building, not on category names.

## How to route

1. Identify the concrete UI element or symptom in the task.
2. Find its row below and open that single file: `patterns/<name>.instructions.md`.
3. If nothing matches, open [accessibility.instructions.md](accessibility.instructions.md) for the general rules.
4. Prefer the native-HTML row over the ARIA-widget row whenever both could apply.

## Build-a-widget routing

| If you are building… | Open |
|---|---|
| A clickable action, icon button, toggle button | [buttons](buttons.instructions.md) |
| A navigation link, "read more", link vs button | [link](link.instructions.md) |
| Any `<form>`, labels, fieldsets, required fields | [forms](forms.instructions.md) |
| Validation messages, invalid states, error summaries | [error-handling](error-handling.instructions.md) |
| A checkbox, including indeterminate/tri-state | [checkbox](checkbox.instructions.md) |
| A group of mutually exclusive options | [radio](radio.instructions.md) |
| An on/off toggle switch | [switch](switch.instructions.md) |
| A single-value slider | [slider](slider.instructions.md) |
| A min/max range slider with two thumbs | [slider-multithumb](slider-multithumb.instructions.md) |
| A number input with steppers | [spinbutton](spinbutton.instructions.md) |
| Autocomplete, typeahead, searchable select | [combobox](combobox.instructions.md) |
| A selectable option list (not a native `<select>`) | [listbox](listbox.instructions.md) |
| An application menu or menubar | [menu](menu.instructions.md) |
| A button that opens a menu | [menu-button](menu-button.instructions.md) |
| Stacked collapsible sections | [accordion](accordion.instructions.md) |
| A single show/hide toggle | [disclosure](disclosure.instructions.md) |
| Tabbed panels | [tabs](tabs.instructions.md) |
| A modal dialog, drawer, overlay | [dialog-modal](dialog-modal.instructions.md) |
| A destructive-action confirmation | [alertdialog](alertdialog.instructions.md) |
| A hover/focus tooltip | [tooltip](tooltip.instructions.md) |
| A non-interrupting status or error banner | [alert](alert.instructions.md) |
| A gauge, rating, or capacity display | [meter](meter.instructions.md) |
| A static data table | [tables](tables.instructions.md) |
| An interactive data grid with arrow-key navigation | [grid](grid.instructions.md) |
| A grid with expandable hierarchical rows | [treegrid](treegrid.instructions.md) |
| A file tree or nested navigation tree | [treeview](treeview.instructions.md) |
| An infinite-scroll or auto-loading stream | [feed](feed.instructions.md) |
| A carousel or slideshow | [carousel](carousel.instructions.md) |
| A grouped row of controls | [toolbar](toolbar.instructions.md) |
| A resizable split pane | [windowsplitter](windowsplitter.instructions.md) |
| Breadcrumb navigation | [breadcrumbs](breadcrumbs.instructions.md) |
| A sign-in, registration, or two-factor form | [authentication](authentication.instructions.md) |

## Page-and-behavior routing

| If the task involves… | Open |
|---|---|
| Page outline, `h1`–`h6` order, section titles | [headings](headings.instructions.md) |
| `<header>`/`<nav>`/`<main>`/`<aside>`/`<footer>`, page regions | [landmarks](landmarks.instructions.md) |
| Bypassing repeated navigation | [skip-links](skip-links.instructions.md) |
| `<img>`, SVG, icons, decorative graphics, alt text | [image-labeling](image-labeling.instructions.md) |
| Where focus goes after a route change, modal, or delete | [focus-management](focus-management.instructions.md) |
| Announcing async results, toasts, cart counts, search results | [live-regions](live-regions.instructions.md) |
| Colors, themes, text/UI contrast ratios | [color-contrast](color-contrast.instructions.md) |
| Transitions, autoplay, parallax, `prefers-reduced-motion` | [motion-animation](motion-animation.instructions.md) |
| Icon button sizes, dense control clusters, touch targets | [target-size](target-size.instructions.md) |
| Drag-to-reorder, drag-to-resize, drop zones, kanban | [dragging-movements](dragging-movements.instructions.md) |
| Re-asking for data already entered in a multi-step flow | [authentication](authentication.instructions.md) |
| Anything not listed above | [accessibility](accessibility.instructions.md) |

## Symptom routing (bug reports and audit findings)

| Reported symptom | Open |
|---|---|
| "axe: elements must have alternate text" | [image-labeling](image-labeling.instructions.md) |
| "axe: form elements must have labels" | [forms](forms.instructions.md) |
| "axe: insufficient color contrast" | [color-contrast](color-contrast.instructions.md) |
| "axe: page must have one main landmark" / "region" | [landmarks](landmarks.instructions.md) |
| "axe: heading order invalid" | [headings](headings.instructions.md) |
| "axe: ARIA attribute not allowed / invalid role" | the widget's own file, then [accessibility](accessibility.instructions.md) |
| "Keyboard user cannot reach / escape this control" | [focus-management](focus-management.instructions.md) |
| "Screen reader does not announce the update" | [live-regions](live-regions.instructions.md) |
| "Focus is lost after closing / deleting" | [focus-management](focus-management.instructions.md) |
| "Tab order jumps around" | [focus-management](focus-management.instructions.md) + [landmarks](landmarks.instructions.md) |
| "Animation causes discomfort / cannot be paused" | [motion-animation](motion-animation.instructions.md) |
| "axe: touch targets must be large enough" | [target-size](target-size.instructions.md) |
| "This can only be done by dragging" | [dragging-movements](dragging-movements.instructions.md) |
| "Focus ring is hidden behind the sticky header" | [focus-management](focus-management.instructions.md) |
| "Password field blocks paste / password managers" | [authentication](authentication.instructions.md) |

## After you change code

Run the automated checks in [../docs/verification.md](../docs/verification.md). Automated tooling
catches roughly a third of WCAG failures — treat a clean axe run as necessary, never sufficient,
and state plainly which criteria still need a human or assistive-technology check.
