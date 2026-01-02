# A11y Skills - Accessibility Coding Agent Instructions

This repository contains a collection of instruction files designed for AI coding agents (like GitHub Copilot, Claude, etc.) to help generate well-formed, accessible code that follows web accessibility best practices.

## Purpose

The goal of this repository is to provide modular, reusable instruction files that coding agents can use to ensure generated code meets accessibility standards (WCAG 2.1/2.2). Each instruction file focuses on a specific aspect of accessibility, making it easy to apply the right guidelines for different scenarios.

## Structure

The repository follows a modular approach where:

- **Main skill files** provide overarching guidance for a category (e.g., `accessibility.instructions.md`)
- **Sub-skill files** provide detailed, specific instructions for particular aspects (e.g., `Image_labeling.instructions.md`)
- All files are written in Markdown format following Claude's instruction file standards

## Available Skills

### Accessibility

- **[accessibility.instructions.md](accessibility.instructions.md)** - Main accessibility skill file
  - **[Image_labeling.instructions.md](Image_labeling.instructions.md)** - Image accessibility and alt text guidelines

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
