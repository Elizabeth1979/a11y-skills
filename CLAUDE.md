# CLAUDE.md - AI Assistant Guide

This document provides comprehensive guidance for AI assistants (like Claude) working on the a11y-skills repository.

## Repository Overview

**Repository**: a11y-skills
**Purpose**: Accessibility skills and resources
**Focus**: Web accessibility (a11y) best practices, tools, and educational content

## Repository Structure

This repository follows a standard accessibility-focused project structure:

```
a11y-skills/
├── CLAUDE.md           # This file - AI assistant guide
├── README.md           # User-facing documentation
├── package.json        # Project dependencies (if Node.js project)
├── src/                # Source code
├── tests/              # Test files
├── docs/               # Additional documentation
├── examples/           # Example implementations
└── .github/            # GitHub workflows and templates
```

## Development Philosophy

### Accessibility First
- **WCAG Compliance**: All code should meet WCAG 2.1 Level AA standards (minimum)
- **Semantic HTML**: Use proper HTML5 semantic elements
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Screen Reader Support**: Ensure ARIA labels and roles are properly implemented
- **Color Contrast**: Maintain minimum 4.5:1 contrast ratio for text
- **Focus Management**: Visible focus indicators and logical focus order

### Code Quality Standards
- **Simplicity**: Avoid over-engineering; keep solutions focused
- **Readability**: Write self-documenting code; add comments only for complex logic
- **Testing**: Include accessibility tests (automated and manual testing guidance)
- **Progressive Enhancement**: Build with baseline HTML/CSS, enhance with JavaScript

## Key Conventions

### File Naming
- Use kebab-case for files: `form-validation.js`, `aria-best-practices.md`
- Test files: `*.test.js` or `*.spec.js`
- Documentation: descriptive names like `keyboard-navigation-guide.md`

### Code Style
- **JavaScript**: Use modern ES6+ syntax
- **CSS**: Prefer semantic class names (BEM or similar)
- **HTML**: Always include `lang` attribute, proper heading hierarchy
- **Comments**: Explain "why" not "what" for complex accessibility patterns

### Accessibility Code Patterns

#### Good Examples
```html
<!-- Proper button with accessible name -->
<button aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Semantic form with labels -->
<form>
  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" required>
</form>
```

#### Anti-Patterns to Avoid
```html
<!-- BAD: div as button without proper ARIA -->
<div onclick="handleClick()">Click me</div>

<!-- BAD: Missing label association -->
<label>Email</label>
<input type="email">

<!-- BAD: Redundant ARIA on native elements -->
<button role="button">Submit</button>
```

## Development Workflow

### Before Making Changes
1. **Read existing code** - Never propose changes to unread files
2. **Understand context** - Review related files and documentation
3. **Check standards** - Verify WCAG compliance requirements
4. **Plan approach** - Use TodoWrite for complex tasks

### Making Changes
1. **Test accessibility** - Manual keyboard testing and screen reader testing
2. **Validate HTML** - Ensure semantic correctness
3. **Check contrast** - Verify color contrast ratios
4. **Document patterns** - Explain accessibility decisions in comments where needed

### Commit Standards
- Use clear, descriptive commit messages
- Format: `type: description`
  - `feat:` New feature or content
  - `fix:` Bug fix or accessibility issue fix
  - `docs:` Documentation changes
  - `test:` Adding or updating tests
  - `refactor:` Code refactoring
  - `a11y:` Accessibility improvements

Examples:
```
feat: add keyboard navigation guide
fix: improve screen reader support for modal dialogs
a11y: increase color contrast in code examples
docs: update ARIA best practices
```

### Git Branch Strategy
- **Development branches**: Use `claude/` prefix for AI assistant work
- **Feature branches**: Descriptive names like `feature/aria-patterns`
- **Main branch**: Protected, represents production-ready code

### Pull Request Guidelines
1. **Title**: Clear, concise description of changes
2. **Description**: Include:
   - Summary of changes
   - Accessibility considerations
   - Testing performed (keyboard, screen reader)
   - WCAG criteria addressed
3. **Testing checklist**:
   - [ ] Keyboard navigation works
   - [ ] Screen reader announces correctly
   - [ ] Color contrast meets standards
   - [ ] Zoom to 200% works without issues
   - [ ] Focus indicators visible

## Accessibility Testing Tools

### Automated Testing
- **axe-core**: Industry-standard accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Google's accessibility auditing
- **Pa11y**: Automated accessibility testing

### Manual Testing
- **Keyboard only**: Navigate without mouse
- **Screen readers**:
  - NVDA (Windows - free)
  - JAWS (Windows - commercial)
  - VoiceOver (macOS/iOS - built-in)
  - TalkBack (Android - built-in)
- **Browser DevTools**: Accessibility tree inspection
- **Zoom testing**: Test at 200% zoom level

## Common Accessibility Patterns

### Skip Links
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content">...</main>
```

### Live Regions
```html
<div role="status" aria-live="polite" aria-atomic="true">
  Loading content...
</div>
```

### Modal Dialogs
- Trap focus within modal
- Return focus to trigger element on close
- Close on Escape key
- Use `role="dialog"` or `role="alertdialog"`
- Include `aria-labelledby` and `aria-describedby`

### Form Validation
- Associate errors with form fields using `aria-describedby`
- Use `aria-invalid="true"` for invalid fields
- Announce errors to screen readers
- Provide clear error messages

## Security Considerations

### Input Validation
- Sanitize all user input
- Validate on both client and server
- Prevent XSS, SQL injection, command injection
- Use Content Security Policy (CSP)

### ARIA Security
- Avoid using ARIA to hide security-critical information
- Don't rely on `aria-hidden` for security
- Use proper authentication and authorization

## Documentation Standards

### Code Documentation
- Document complex accessibility patterns
- Explain ARIA usage when non-obvious
- Include references to WCAG success criteria
- Link to authoritative resources (MDN, W3C, ARIA Authoring Practices)

### User Documentation
- Provide clear examples
- Include both code and explanation
- Show visual examples where helpful
- Explain the "why" behind accessibility choices

## Resources

### Official Standards
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [HTML Living Standard](https://html.spec.whatwg.org/)

### Tools & Libraries
- [axe-core](https://github.com/dequelabs/axe-core)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [react-aria](https://react-spectrum.adobe.com/react-aria/)

### Learning Resources
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [Deque University](https://dequeuniversity.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## AI Assistant Best Practices

### When Working on This Repository

1. **Always prioritize accessibility** - This is an a11y-focused repository
2. **Test changes** - Verify keyboard and screen reader compatibility
3. **Use semantic HTML** - Prefer native elements over custom solutions
4. **Avoid assumptions** - Read code before modifying
5. **Keep it simple** - Don't over-engineer solutions
6. **Document decisions** - Explain accessibility rationale
7. **Follow standards** - Reference WCAG and ARIA specifications
8. **Validate output** - Check HTML validity and accessibility

### Common Tasks

#### Adding New Content
1. Ensure proper heading hierarchy (h1 → h2 → h3)
2. Include alt text for images
3. Use semantic markup
4. Test with keyboard
5. Verify screen reader experience

#### Fixing Accessibility Issues
1. Identify the WCAG success criterion
2. Research best practices
3. Implement fix following ARIA patterns
4. Test with assistive technology
5. Document the solution

#### Code Review
1. Check for semantic HTML
2. Verify ARIA usage is appropriate
3. Ensure keyboard accessibility
4. Check color contrast
5. Review focus management
6. Validate against WCAG criteria

## Troubleshooting

### Common Issues

**Issue**: Element not keyboard accessible
**Solution**: Ensure interactive elements are focusable (use `<button>`, `<a>`, or `tabindex="0"`)

**Issue**: Screen reader not announcing changes
**Solution**: Use ARIA live regions (`aria-live`, `role="status"`, `role="alert"`)

**Issue**: Form errors not accessible
**Solution**: Use `aria-describedby` to associate errors, set `aria-invalid="true"`

**Issue**: Modal doesn't trap focus
**Solution**: Implement focus trap, return focus on close, handle Escape key

## Changelog

### 2025-12-31
- Initial CLAUDE.md creation
- Established repository structure and conventions
- Defined accessibility standards and best practices
- Added development workflow guidelines

## Questions or Clarifications

When uncertain about:
- **Accessibility patterns**: Consult ARIA Authoring Practices Guide
- **WCAG compliance**: Check WCAG Quick Reference
- **Implementation details**: Ask the user for clarification
- **Project-specific conventions**: Review existing code patterns

---

**Remember**: Accessibility is not optional. Every change should maintain or improve the accessibility of this codebase.
