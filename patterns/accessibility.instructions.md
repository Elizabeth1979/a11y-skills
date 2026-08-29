---
description: Main accessibility instruction file for generating WCAG-compliant code
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# Accessibility Coding Guidelines

## SCOPE: pick a mode before you edit

Accessibility work arrives in two shapes, and they have different rules about touching CSS.
State which mode you are in before changing anything.

### Remediation mode — retrofitting an existing page

The page already has a visual design that someone approved. Your job is to fix what assistive
technology receives, **without changing what sighted users see.**

- ✅ Add or fix HTML attributes (`alt`, `aria-label`, `role`, `for`, `id`)
- ✅ Swap generic elements for semantic ones (`div` → `button`, `div` → `nav`)
- ✅ Add or correct heading levels
- ✅ Add landmarks, labels, and live regions
- ❌ Do not restyle, re-lay-out, or change colours, fonts, or sizes
- ❌ Do not add or remove visual elements

**Two exceptions.** Insufficient colour contrast and animation that ignores
`prefers-reduced-motion` are failures that exist *in the CSS* and cannot be fixed in markup. Fix
those in CSS, keep the change as small as the criterion requires, and say explicitly that you
changed the appearance and why. See [color-contrast.instructions.md](color-contrast.instructions.md)
and [motion-animation.instructions.md](motion-animation.instructions.md).

### Greenfield mode — building something new

Visual design and accessibility are decided together. CSS is in scope from the start: focus
indicators, contrast, target size, and motion are design decisions, not retrofits.

## Core Principles

Follow these fundamental accessibility principles:

1. **Perceivable** - Information must be presentable to users in ways they can perceive
2. **Operable** - User interface components must be operable by all users
3. **Understandable** - Information and UI operation must be understandable
4. **Robust** - Content must be robust enough to work with assistive technologies

## Specific Accessibility Skills

**Route through [INDEX.md](INDEX.md) rather than reading this list top to bottom.** It maps a UI
element, a page-level concern, or an axe finding to exactly one file. Open that one file and stop —
these average 12 KB each, and loading them all buries the rules that matter.

All widget patterns follow the [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/).

### Document Structure
- [headings.instructions.md](headings.instructions.md) - Proper heading hierarchy and semantic structure
- [landmarks.instructions.md](landmarks.instructions.md) - Page landmarks and regions (banner, navigation, main, complementary, contentinfo, search, form, region)
- [breadcrumbs.instructions.md](breadcrumbs.instructions.md) - Breadcrumb navigation patterns
- [skip-links.instructions.md](skip-links.instructions.md) - Skip links to bypass repetitive content

### Images and Media
- [image-labeling.instructions.md](image-labeling.instructions.md) - Proper alt text and image labeling

### Buttons and Interactive Elements
- [buttons.instructions.md](buttons.instructions.md) - Button accessibility and clickable elements
- [link.instructions.md](link.instructions.md) - Link accessibility and navigation elements

### Form Controls and Inputs
- [forms.instructions.md](forms.instructions.md) - Overall form structure, labels, and accessibility patterns
- [checkbox.instructions.md](checkbox.instructions.md) - Checkbox accessibility (dual-state and tri-state)
- [radio.instructions.md](radio.instructions.md) - Radio button groups (mutually exclusive selection)
- [switch.instructions.md](switch.instructions.md) - Switch/toggle controls (on/off states)
- [slider.instructions.md](slider.instructions.md) - Single-thumb slider controls
- [slider-multithumb.instructions.md](slider-multithumb.instructions.md) - Multi-thumb range sliders
- [spinbutton.instructions.md](spinbutton.instructions.md) - Number input with increment/decrement
- [error-handling.instructions.md](error-handling.instructions.md) - Accessible form validation and error messages

### Selection and Dropdown Patterns
- [combobox.instructions.md](combobox.instructions.md) - Combobox/autocomplete patterns
- [listbox.instructions.md](listbox.instructions.md) - Selectable option lists

### Menus and Navigation
- [menu.instructions.md](menu.instructions.md) - Menu and menubar patterns
- [menu-button.instructions.md](menu-button.instructions.md) - Button that opens a menu

### Disclosure and Expansion Patterns
- [accordion.instructions.md](accordion.instructions.md) - Vertically stacked collapsible sections
- [disclosure.instructions.md](disclosure.instructions.md) - Show/hide toggles (expand/collapse)
- [tabs.instructions.md](tabs.instructions.md) - Layered tabbed content panels

### Dialog and Modal Patterns
- [dialog-modal.instructions.md](dialog-modal.instructions.md) - Modal dialog accessibility
- [alertdialog.instructions.md](alertdialog.instructions.md) - Alert dialog for critical messages
- [tooltip.instructions.md](tooltip.instructions.md) - Tooltip and popup information

### Alerts and Status Messages
- [alert.instructions.md](alert.instructions.md) - Non-interrupting alert messages
- [meter.instructions.md](meter.instructions.md) - Meter/gauge displays

### Tables and Data Display
- [tables.instructions.md](tables.instructions.md) - Proper table structure and semantics
- [grid.instructions.md](grid.instructions.md) - Interactive data grids with keyboard navigation
- [treegrid.instructions.md](treegrid.instructions.md) - Hierarchical grids with expandable rows

### Hierarchical and Feed Patterns
- [treeview.instructions.md](treeview.instructions.md) - Tree view for hierarchical data
- [feed.instructions.md](feed.instructions.md) - Auto-loading scrollable content feeds

### Layout and Presentation
- [carousel.instructions.md](carousel.instructions.md) - Carousel/slideshow patterns
- [toolbar.instructions.md](toolbar.instructions.md) - Toolbar grouping of controls
- [windowsplitter.instructions.md](windowsplitter.instructions.md) - Resizable pane splitters

### Keyboard and Focus
- [focus-management.instructions.md](focus-management.instructions.md) - Managing keyboard focus in dynamic content and SPAs
- [live-regions.instructions.md](live-regions.instructions.md) - ARIA live regions for announcing dynamic content changes

### Visual Design
- [color-contrast.instructions.md](color-contrast.instructions.md) - WCAG color contrast requirements and accessible color usage
- [motion-animation.instructions.md](motion-animation.instructions.md) - Accessible animations and respecting motion preferences

## General Rules

1. **Respect the mode** - In remediation mode, work through markup and ARIA only; the two CSS exceptions above are the whole list
2. **Use semantic HTML** - Use appropriate HTML elements (`<button>`, `<nav>`, `<main>`, etc.) rather than generic divs
3. **Keyboard accessibility** - Ensure all interactive elements are keyboard accessible
4. **Focus indicators** - Never remove focus outlines without providing alternatives
5. **Color contrast** - Text must meet WCAG contrast ratios (4.5:1 for normal text, 3:1 for large text)
6. **Error identification** - Clearly identify and describe errors to users
7. **Labels and instructions** - Provide clear labels for all form inputs

## Testing Recommendations

Run what you can and report the boundary honestly. [../docs/verification.md](../docs/verification.md)
has the runnable checks — `eslint-plugin-jsx-a11y`, axe-core in Playwright or Vitest,
accessibility-tree snapshots, mechanical keyboard assertions.

Automated tooling detects roughly a third of WCAG failures. It confirms alt text exists; it cannot
confirm the alt text is accurate. It confirms a live region is present; it cannot confirm the
announcement is useful. When you finish, state which criteria you verified mechanically and which
still need a human keyboard pass or screen-reader pass. Do not call a component "WCAG AA compliant"
on the strength of a clean axe run.

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
