# A11y Skills Quick Reference

One-line summaries of all accessibility skills in this repository. Use this to quickly find the right skill for your needs.

## Document Structure
| Skill | Description |
|-------|-------------|
| [headings](headings.instructions.md) | Proper heading hierarchy (h1 → h2 → h3) and semantic structure |
| [landmarks](landmarks.instructions.md) | Page regions: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` |
| [breadcrumbs](breadcrumbs.instructions.md) | Breadcrumb navigation with `aria-label` and `aria-current` |
| [skip-links](skip-links.instructions.md) | "Skip to main content" links for keyboard users |

## Images and Media
| Skill | Description |
|-------|-------------|
| [image-labeling](image-labeling.instructions.md) | Alt text for images, decorative images, SVG accessibility |

## Buttons and Interactive Elements
| Skill | Description |
|-------|-------------|
| [buttons](buttons.instructions.md) | Button accessibility, `role="button"`, icon buttons with `aria-label` |
| [link](link.instructions.md) | Link accessibility, distinguishing links from buttons |

## Form Controls and Inputs
| Skill | Description |
|-------|-------------|
| [forms](forms.instructions.md) | Form structure, labels, `fieldset`/`legend`, required fields |
| [checkbox](checkbox.instructions.md) | Checkbox accessibility (dual-state and tri-state) |
| [radio](radio.instructions.md) | Radio button groups with `fieldset`/`legend` |
| [switch](switch.instructions.md) | Toggle switches with `role="switch"` and `aria-checked` |
| [slider](slider.instructions.md) | Single-thumb sliders with `role="slider"` |
| [slider-multithumb](slider-multithumb.instructions.md) | Range sliders with multiple thumbs |
| [spinbutton](spinbutton.instructions.md) | Number inputs with increment/decrement buttons |
| [error-handling](error-handling.instructions.md) | Form validation errors with `aria-invalid` and `aria-describedby` |

## Selection and Dropdown Patterns
| Skill | Description |
|-------|-------------|
| [combobox](combobox.instructions.md) | Autocomplete inputs with `role="combobox"` |
| [listbox](listbox.instructions.md) | Selectable option lists with `role="listbox"` |

## Menus and Navigation
| Skill | Description |
|-------|-------------|
| [menu](menu.instructions.md) | Menu and menubar patterns with keyboard navigation |
| [menu-button](menu-button.instructions.md) | Buttons that open menus with `aria-haspopup` |

## Disclosure and Expansion Patterns
| Skill | Description |
|-------|-------------|
| [accordion](accordion.instructions.md) | Collapsible sections with `aria-expanded` |
| [disclosure](disclosure.instructions.md) | Show/hide toggles with `aria-expanded` and `aria-controls` |
| [tabs](tabs.instructions.md) | Tab panels with `role="tablist"`, `role="tab"`, `role="tabpanel"` |

## Dialog and Modal Patterns
| Skill | Description |
|-------|-------------|
| [dialog-modal](dialog-modal.instructions.md) | Modal dialogs with focus trap and `aria-modal` |
| [alertdialog](alertdialog.instructions.md) | Alert dialogs for critical confirmations |
| [tooltip](tooltip.instructions.md) | Tooltips with `role="tooltip"` and proper triggering |

## Alerts and Status Messages
| Skill | Description |
|-------|-------------|
| [alert](alert.instructions.md) | Non-interrupting alerts with `role="alert"` |
| [meter](meter.instructions.md) | Progress/value meters with `role="meter"` |

## Tables and Data Display
| Skill | Description |
|-------|-------------|
| [tables](tables.instructions.md) | Data tables with `<th>`, `scope`, and `<caption>` |
| [grid](grid.instructions.md) | Interactive data grids with arrow key navigation |
| [treegrid](treegrid.instructions.md) | Hierarchical grids with expandable rows |

## Hierarchical and Feed Patterns
| Skill | Description |
|-------|-------------|
| [treeview](treeview.instructions.md) | Tree views with `role="tree"` and expandable nodes |
| [feed](feed.instructions.md) | Infinite scroll feeds with `role="feed"` |

## Layout and Presentation
| Skill | Description |
|-------|-------------|
| [carousel](carousel.instructions.md) | Carousels with pause controls and slide announcements |
| [toolbar](toolbar.instructions.md) | Grouped controls with `role="toolbar"` |
| [windowsplitter](windowsplitter.instructions.md) | Resizable panes with `role="separator"` |

## Keyboard and Focus
| Skill | Description |
|-------|-------------|
| [focus-management](focus-management.instructions.md) | Managing focus in SPAs, modals, and dynamic content |
| [live-regions](live-regions.instructions.md) | Announcing changes with `aria-live` and `role="status"` |

## Visual Design
| Skill | Description |
|-------|-------------|
| [color-contrast](color-contrast.instructions.md) | WCAG contrast ratios (4.5:1 text, 3:1 UI components) |
| [motion-animation](motion-animation.instructions.md) | Respecting `prefers-reduced-motion` and animation controls |

---

## When to Use Each Pattern

### Starting a New Page
1. [headings](headings.instructions.md) - Set up heading hierarchy
2. [landmarks](landmarks.instructions.md) - Define page regions
3. [skip-links](skip-links.instructions.md) - Add skip navigation

### Building Forms
1. [forms](forms.instructions.md) - Overall structure and labels
2. [checkbox](checkbox.instructions.md) / [radio](radio.instructions.md) / [switch](switch.instructions.md) - Choice inputs
3. [error-handling](error-handling.instructions.md) - Validation messages

### Creating Interactive Components
1. [buttons](buttons.instructions.md) - Clickable actions
2. [dialog-modal](dialog-modal.instructions.md) - Overlays and modals
3. [focus-management](focus-management.instructions.md) - Focus handling

### Displaying Dynamic Content
1. [live-regions](live-regions.instructions.md) - Announce updates
2. [alert](alert.instructions.md) - Status messages
3. [carousel](carousel.instructions.md) - Auto-playing content

### Styling and Animation
1. [color-contrast](color-contrast.instructions.md) - Check contrast ratios
2. [motion-animation](motion-animation.instructions.md) - Respect motion preferences

---

## Priority: Essential Skills for Every Project

These skills address the most common accessibility issues:

1. **[headings](headings.instructions.md)** - #1 screen reader navigation method
2. **[landmarks](landmarks.instructions.md)** - Page structure for AT users
3. **[image-labeling](image-labeling.instructions.md)** - Images need alt text
4. **[buttons](buttons.instructions.md)** - Interactive elements need proper roles
5. **[forms](forms.instructions.md)** - Labels and structure for form inputs
6. **[color-contrast](color-contrast.instructions.md)** - Text must be readable
7. **[focus-management](focus-management.instructions.md)** - Keyboard users need focus control
