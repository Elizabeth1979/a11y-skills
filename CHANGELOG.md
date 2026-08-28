# Changelog

All notable changes to the a11y-skills repository will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [1.0.0] - 2026-08-28 - Open source release

First release intended for public use. The library was previously 40 files in the repository
root with no license, no contribution path, and no way for an agent to find the right one.

### Added
- `LICENSE` (MIT) — the repository was not legally open source before this
- `patterns/INDEX.md` — routing table mapping a UI element, a page-level concern, or an axe
  finding to exactly one pattern file
- `skills/accessibility/SKILL.md` and `.claude-plugin/` — installable Claude Code plugin
- `.github/copilot-instructions.md` — GitHub Copilot router
- `.cursor/rules/accessibility.mdc` — Cursor router
- `AGENTS.md` — cross-agent entry point following the agents.md convention
- `docs/verification.md` — automated checks an agent can actually run, and an explicit statement
  of where automation stops
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue templates, pull request template
- `scripts/validate.mjs` and a CI workflow — validates frontmatter, required sections, kebab-case
  naming, every relative link, catalog coverage, and stated counts
- `ROADMAP.md` — phased plan, including an evaluation harness to measure whether the patterns
  change agent output
- `.gitignore`, `.editorconfig`, `package.json`

### Changed
- **Restructured**: the 40 pattern files moved from the repository root to `patterns/`;
  `QUICK-REFERENCE.md` moved to `docs/quick-reference.md`
- **`README.md`** rewritten around installation and usage rather than a file listing, with
  per-ecosystem install instructions and an explanation of why routing matters
- **`CLAUDE.md`** rewritten — it previously described a `src/`, `tests/`, `package.json` structure
  that has never existed in this repository
- **`patterns/accessibility.instructions.md`**: the global "DO NOT modify CSS" instruction is now
  scoped to a named remediation mode, with colour contrast and reduced motion called out as the
  two failures that cannot be fixed in markup. Previously it contradicted two of the library's
  own patterns.
- Testing guidance now points at runnable checks instead of "verify with a screen reader", which
  a coding agent cannot do

### Fixed
- `README.md` claimed 33 skills while listing and shipping 40; counts are now validated in CI


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
