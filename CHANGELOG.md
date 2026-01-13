# Changelog

All notable changes to the a11y-skills repository will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [2025-01-13] - Repository Improvements

### Added
- **New Skills (7 files)**:
  - `skip-links.instructions.md` - Skip links to bypass repetitive content
  - `focus-management.instructions.md` - Managing keyboard focus in SPAs and dynamic content
  - `live-regions.instructions.md` - ARIA live regions for announcing dynamic changes
  - `forms.instructions.md` - Overall form structure, labels, and accessibility patterns
  - `error-handling.instructions.md` - Accessible form validation and error messages
  - `color-contrast.instructions.md` - WCAG color contrast requirements
  - `motion-animation.instructions.md` - Accessible animations and prefers-reduced-motion

- **New Documentation**:
  - `QUICK-REFERENCE.md` - One-line summaries of all 40 skills for quick lookup
  - `CHANGELOG.md` - This file to track repository changes

- **New Skill Categories**:
  - "Keyboard and Focus" section in index files
  - "Visual Design" section in index files

### Changed
- **README.md**: Updated with complete list of all 40 skills organized by category
- **accessibility.instructions.md**: Added references to all new skills
- **Renamed**: `Image_labeling.instructions.md` → `image-labeling.instructions.md` (consistent kebab-case naming)

### Fixed
- Fixed inconsistent file naming convention (all files now use kebab-case)
- Updated all internal references to renamed file

## [2025-01-12] - Initial APG Skills

### Added
- **30 skills from WAI-ARIA Authoring Practices Guide (APG)**:
  - Document Structure: `headings`, `landmarks`, `breadcrumbs`
  - Interactive Elements: `buttons`, `link`
  - Form Controls: `checkbox`, `radio`, `switch`, `slider`, `slider-multithumb`, `spinbutton`
  - Selection: `combobox`, `listbox`
  - Menus: `menu`, `menu-button`
  - Disclosure: `accordion`, `disclosure`, `tabs`
  - Dialogs: `dialog-modal`, `alertdialog`, `tooltip`
  - Alerts: `alert`, `meter`
  - Data Display: `tables`, `grid`, `treegrid`
  - Hierarchical: `treeview`, `feed`
  - Layout: `carousel`, `toolbar`, `windowsplitter`

## [2025-01-11] - Foundation

### Added
- Initial repository structure
- `accessibility.instructions.md` - Main accessibility guidelines
- `Image_labeling.instructions.md` - Image accessibility (later renamed)
- `CLAUDE.md` - AI assistant guidance
- `README.md` - Project documentation

---

## Skill Count by Version

| Version | Total Skills | New Skills |
|---------|-------------|------------|
| 2025-01-13 | 40 | +7 |
| 2025-01-12 | 33 | +30 |
| 2025-01-11 | 3 | +3 |

## Categories

Current skill organization:
- Document Structure (4)
- Images and Media (1)
- Buttons and Interactive Elements (2)
- Form Controls and Inputs (8)
- Selection and Dropdown Patterns (2)
- Menus and Navigation (2)
- Disclosure and Expansion Patterns (3)
- Dialog and Modal Patterns (3)
- Alerts and Status Messages (2)
- Tables and Data Display (3)
- Hierarchical and Feed Patterns (2)
- Layout and Presentation (3)
- Keyboard and Focus (2)
- Visual Design (2)
