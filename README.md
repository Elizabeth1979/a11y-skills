# A11y Skills - Accessibility Coding Agent Instructions

This repository contains a collection of instruction files designed for AI coding agents (like GitHub Copilot, Claude, etc.) to help generate well-formed, accessible code that follows web accessibility best practices.

## Purpose

The goal of this repository is to provide modular, reusable instruction files that coding agents can use to ensure generated code meets accessibility standards (WCAG 2.1/2.2). Each instruction file focuses on a specific aspect of accessibility, making it easy to apply the right guidelines for different scenarios.

## Structure

The repository follows a modular approach where:

- **Main skill files** provide overarching guidance for a category (e.g., `accessibility.instructions.md`)
- **Sub-skill files** provide detailed, specific instructions for particular aspects (e.g., `image-labeling.instructions.md`)
- All files are written in Markdown format following Claude's instruction file standards

## Available Skills (33 Total)

### Core Accessibility
- **[accessibility.instructions.md](accessibility.instructions.md)** - Main accessibility skill file with WCAG principles and links to all specialized skills

### Document Structure
- **[headings.instructions.md](headings.instructions.md)** - Proper heading hierarchy and semantic structure
- **[landmarks.instructions.md](landmarks.instructions.md)** - Page landmarks and regions (banner, navigation, main, complementary, contentinfo)
- **[breadcrumbs.instructions.md](breadcrumbs.instructions.md)** - Breadcrumb navigation patterns
- **[skip-links.instructions.md](skip-links.instructions.md)** - Skip links to bypass repetitive content

### Images and Media
- **[image-labeling.instructions.md](image-labeling.instructions.md)** - Proper alt text, SVG images, and image descriptions

### Buttons and Interactive Elements
- **[buttons.instructions.md](buttons.instructions.md)** - Button accessibility, icon buttons, keyboard support
- **[link.instructions.md](link.instructions.md)** - Link accessibility and navigation elements

### Form Controls and Inputs
- **[forms.instructions.md](forms.instructions.md)** - Overall form structure, labels, and accessibility patterns
- **[checkbox.instructions.md](checkbox.instructions.md)** - Checkbox accessibility (dual-state and tri-state)
- **[radio.instructions.md](radio.instructions.md)** - Radio button groups (mutually exclusive selection)
- **[switch.instructions.md](switch.instructions.md)** - Switch/toggle controls (on/off states)
- **[slider.instructions.md](slider.instructions.md)** - Single-thumb slider controls
- **[slider-multithumb.instructions.md](slider-multithumb.instructions.md)** - Multi-thumb range sliders
- **[spinbutton.instructions.md](spinbutton.instructions.md)** - Number input with increment/decrement
- **[error-handling.instructions.md](error-handling.instructions.md)** - Accessible form validation and error messages

### Selection and Dropdown Patterns
- **[combobox.instructions.md](combobox.instructions.md)** - Combobox/autocomplete patterns
- **[listbox.instructions.md](listbox.instructions.md)** - Selectable option lists

### Menus and Navigation
- **[menu.instructions.md](menu.instructions.md)** - Menu and menubar patterns
- **[menu-button.instructions.md](menu-button.instructions.md)** - Button that opens a menu

### Disclosure and Expansion Patterns
- **[accordion.instructions.md](accordion.instructions.md)** - Vertically stacked collapsible sections
- **[disclosure.instructions.md](disclosure.instructions.md)** - Show/hide toggles (expand/collapse)
- **[tabs.instructions.md](tabs.instructions.md)** - Layered tabbed content panels

### Dialog and Modal Patterns
- **[dialog-modal.instructions.md](dialog-modal.instructions.md)** - Modal dialog accessibility
- **[alertdialog.instructions.md](alertdialog.instructions.md)** - Alert dialog for critical messages
- **[tooltip.instructions.md](tooltip.instructions.md)** - Tooltip and popup information

### Alerts and Status Messages
- **[alert.instructions.md](alert.instructions.md)** - Non-interrupting alert messages
- **[meter.instructions.md](meter.instructions.md)** - Meter/gauge displays

### Tables and Data Display
- **[tables.instructions.md](tables.instructions.md)** - Proper table structure and semantics
- **[grid.instructions.md](grid.instructions.md)** - Interactive data grids with keyboard navigation
- **[treegrid.instructions.md](treegrid.instructions.md)** - Hierarchical grids with expandable rows

### Hierarchical and Feed Patterns
- **[treeview.instructions.md](treeview.instructions.md)** - Tree view for hierarchical data
- **[feed.instructions.md](feed.instructions.md)** - Auto-loading scrollable content feeds

### Layout and Presentation
- **[carousel.instructions.md](carousel.instructions.md)** - Carousel/slideshow patterns
- **[toolbar.instructions.md](toolbar.instructions.md)** - Toolbar grouping of controls
- **[windowsplitter.instructions.md](windowsplitter.instructions.md)** - Resizable pane splitters

### Keyboard and Focus
- **[focus-management.instructions.md](focus-management.instructions.md)** - Managing keyboard focus in dynamic content and SPAs
- **[live-regions.instructions.md](live-regions.instructions.md)** - ARIA live regions for announcing dynamic content changes

### Visual Design
- **[color-contrast.instructions.md](color-contrast.instructions.md)** - WCAG color contrast requirements and accessible color usage
- **[motion-animation.instructions.md](motion-animation.instructions.md)** - Accessible animations and respecting motion preferences

## How to Use

### With Claude or GitHub Copilot

1. Add instruction files to your project's `.github/copilot-instructions.md` or similar configuration
2. Reference specific skill files in your project documentation
3. Include files as attachments in your coding agent prompts

### File Naming Convention

All instruction files follow the pattern: `{skill_name}.instructions.md`

This helps coding agents identify them as instruction/guidance files rather than regular documentation.

## Contributing

When adding new accessibility skills:

1. Create a new `.instructions.md` file for the specific skill
2. Follow the standard format (see existing files for examples)
3. Include:
   - Clear description and rules
   - Code examples (good and bad)
   - WCAG references where applicable
   - Edge cases and exceptions
4. Update this README with links to new skills

## Standards Referenced

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## License

[Add your license here]

## Feedback

Found an issue or want to suggest a new accessibility skill? Please open an issue or submit a pull request.
