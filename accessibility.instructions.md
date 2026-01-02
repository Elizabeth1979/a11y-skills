---
description: Main accessibility instruction file for generating WCAG-compliant code
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# Accessibility Coding Guidelines

 .
 

## Core Principles

Follow these fundamental accessibility principles:

1. **Perceivable** - Information must be presentable to users in ways they can perceive
2. **Operable** - User interface components must be operable by all users
3. **Understandable** - Information and UI operation must be understandable
4. **Robust** - Content must be robust enough to work with assistive technologies

## Specific Accessibility Skills

This main file references specialized instruction files for specific accessibility concerns:

### Image Accessibility
- [Image_labeling.instructions.md](Image_labeling.instructions.md) - Proper alt text and image labeling

### Additional Areas (To Be Implemented)

Future sub-skills to be added:
- Form accessibility (labels, error handling, validation)
- Keyboard navigation
- Focus management
- Color contrast
- Semantic HTML
- ARIA attributes and landmarks
- Screen reader considerations

## General Rules

1. **Use semantic HTML** - Use appropriate HTML elements (`<button>`, `<nav>`, `<main>`, etc.) rather than generic divs
2. **Keyboard accessibility** - Ensure all interactive elements are keyboard accessible
3. **Focus indicators** - Never remove focus outlines without providing alternatives
4. **Color contrast** - Text must meet WCAG contrast ratios (4.5:1 for normal text, 3:1 for large text)
5. **Error identification** - Clearly identify and describe errors to users
6. **Labels and instructions** - Provide clear labels for all form inputs

## Testing Recommendations

When generating code, consider these testing approaches:
- Test with keyboard only (no mouse)
- Verify with screen reader (NVDA, JAWS, VoiceOver)
- Check color contrast ratios
- Validate HTML semantics
- Run automated accessibility audits (axe, Lighthouse)

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
