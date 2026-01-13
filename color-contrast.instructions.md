---
description: Instructions for WCAG color contrast requirements and accessible color usage
applyTo: '**/*.{html,css,scss,jsx,tsx,vue,svelte}'
---

# Color Contrast Accessibility

## CRITICAL RULES

**Color contrast ensures text and UI elements are perceivable by users with low vision or color blindness.**

### 1. Text Must Meet Minimum Contrast Ratios

WCAG 2.1 requires specific contrast ratios between text and background.

```css
/* WCAG AA Requirements (minimum) */

/* Normal text (< 18pt or < 14pt bold): 4.5:1 ratio */
.normal-text {
  color: #595959;     /* 7:1 ratio on white - PASS */
  background: #ffffff;
}

/* Large text (>= 18pt or >= 14pt bold): 3:1 ratio */
.large-text {
  font-size: 18pt;    /* or 24px */
  color: #767676;     /* 4.5:1 ratio on white - PASS for large text */
  background: #ffffff;
}

/* WCAG AAA Requirements (enhanced) */
/* Normal text: 7:1 ratio */
/* Large text: 4.5:1 ratio */
```

**Text Size Reference:**
- Normal text: Less than 18pt (24px) or less than 14pt (18.5px) bold
- Large text: At least 18pt (24px) or at least 14pt (18.5px) bold

### 2. UI Components Must Have 3:1 Contrast

Interactive components and their states need sufficient contrast.

```css
/* Good - Button with sufficient contrast */
.button {
  background: #0066cc;  /* 4.5:1 against white page */
  color: #ffffff;       /* 4.5:1 against button background */
  border: none;
}

.button:focus {
  outline: 3px solid #0066cc;  /* 3:1 against white page */
  outline-offset: 2px;
}

/* Good - Input field with visible border */
.input {
  border: 2px solid #767676;  /* 3:1 against white background */
  background: #ffffff;
}

/* Bad - Low contrast border */
.input-bad {
  border: 1px solid #cccccc;  /* 1.6:1 - FAILS 3:1 requirement */
}

/* Good - Toggle switch states distinguishable */
.switch-off {
  background: #767676;  /* 3:1 against white */
}

.switch-on {
  background: #0066cc;  /* Distinct from off state */
}
```

**UI Components requiring 3:1 contrast:**
- Form input borders
- Button boundaries (if no background fill)
- Focus indicators
- Custom controls (switches, sliders, etc.)
- Icons that convey meaning
- Chart/graph elements

### 3. Never Use Color Alone to Convey Information

Information must be perceivable without relying on color perception.

```html
<!-- Good - Color + icon + text -->
<span class="status-error">
  <svg aria-hidden="true"><!-- error icon --></svg>
  Error: Invalid email address
</span>

<span class="status-success">
  <svg aria-hidden="true"><!-- checkmark icon --></svg>
  Success: Form submitted
</span>

<!-- Good - Color + pattern/underline for links -->
<style>
  a { color: #0066cc; text-decoration: underline; }
</style>
<p>Read the <a href="/terms">terms of service</a> for more information.</p>

<!-- Good - Color + labels in charts -->
<div class="chart-legend">
  <span class="legend-item">
    <span class="swatch sales"></span>
    <span class="label">Sales (Blue, solid line)</span>
  </span>
  <span class="legend-item">
    <span class="swatch expenses"></span>
    <span class="label">Expenses (Red, dashed line)</span>
  </span>
</div>

<!-- Bad - Color only -->
<style>
  .required-field { border-color: red; }  /* Only color indicates required */
</style>
<input class="required-field">

<!-- Bad - Links distinguished only by color -->
<style>
  a { color: blue; text-decoration: none; }  /* No underline! */
</style>
```

**Always pair color with:**
- Text labels
- Icons or symbols
- Patterns or textures
- Underlines (for links)
- Position/grouping

### 4. Focus Indicators Must Be Visible

Focus states need sufficient contrast to be perceivable.

```css
/* Good - High contrast focus indicator */
.interactive:focus {
  outline: 3px solid #005fcc;  /* 3:1+ against background */
  outline-offset: 2px;
}

/* Good - Focus indicator on dark background */
.dark-theme .interactive:focus {
  outline: 3px solid #ffffff;  /* Contrasts with dark background */
  outline-offset: 2px;
}

/* Good - Double ring for any background */
.interactive:focus {
  outline: 3px solid #000000;
  outline-offset: 2px;
  box-shadow: 0 0 0 6px #ffffff;  /* White ring + black ring works on any bg */
}

/* Bad - Removed focus outline */
.button:focus {
  outline: none;  /* NEVER remove without replacement! */
}

/* Bad - Low contrast focus */
.input:focus {
  outline: 1px solid #cccccc;  /* Too light! */
}
```

### 5. Ensure Sufficient Contrast in All States

Interactive elements must maintain contrast in all states.

```css
/* All states need sufficient contrast */

/* Default state */
.button {
  background: #0066cc;
  color: #ffffff;  /* 4.5:1 */
}

/* Hover state */
.button:hover {
  background: #004499;
  color: #ffffff;  /* Still 4.5:1+ */
}

/* Active/pressed state */
.button:active {
  background: #003366;
  color: #ffffff;  /* Still 4.5:1+ */
}

/* Disabled state - 3:1 minimum, not 4.5:1 */
.button:disabled {
  background: #cccccc;
  color: #666666;  /* 3:1 - acceptable for disabled */
  cursor: not-allowed;
}

/* Focus state */
.button:focus {
  outline: 3px solid #ffcc00;
  outline-offset: 2px;
}
```

## Common Contrast Issues

### Gray Text on White

```css
/* Common mistake: Light gray text */
.subtle-text {
  color: #999999;  /* 2.8:1 - FAILS AA */
}

/* Better: Darker gray */
.subtle-text {
  color: #767676;  /* 4.5:1 - PASSES AA for normal text */
}

/* Or for large text only */
.large-subtle-text {
  color: #959595;  /* 3:1 - PASSES AA for large text only */
  font-size: 24px;
}
```

### Placeholder Text

```css
/* Placeholders often fail contrast */
::placeholder {
  color: #aaaaaa;  /* 2.3:1 - FAILS */
}

/* Better: Darker placeholder */
::placeholder {
  color: #767676;  /* 4.5:1 - PASSES */
}

/* Remember: placeholders are NOT labels! */
```

### Links in Body Text

```css
/* Links must be distinguishable from surrounding text */

/* Method 1: Color + underline (recommended) */
a {
  color: #0066cc;
  text-decoration: underline;
}

/* Method 2: Color + 3:1 contrast with surrounding text */
p {
  color: #333333;
}
p a {
  color: #0066cc;  /* 3:1 against #333333 body text */
  /* Plus: show underline on hover/focus */
}
p a:hover,
p a:focus {
  text-decoration: underline;
}
```

## Framework Examples

### React with CSS-in-JS

```jsx
// Define accessible color palette
const colors = {
  // Text colors (on white background)
  textPrimary: '#1a1a1a',    // 16:1 ratio
  textSecondary: '#595959',  // 7:1 ratio
  textMuted: '#767676',      // 4.5:1 ratio (minimum for normal text)

  // Interactive colors
  primary: '#0066cc',        // 4.5:1 on white
  primaryHover: '#004499',
  primaryText: '#ffffff',    // 4.5:1 on primary

  // Status colors (with icons, not color alone)
  error: '#d32f2f',
  errorBg: '#ffebee',
  success: '#388e3c',
  successBg: '#e8f5e9',

  // UI elements
  border: '#767676',         // 3:1 for UI components
  focusRing: '#005fcc',
};

// Accessible button component
function Button({ children, variant = 'primary', ...props }) {
  const styles = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.primaryText,
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
    },
  };

  return (
    <button
      style={{
        ...styles[variant],
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
      {...props}
    >
      {children}
    </button>
  );
}
```

### CSS Custom Properties

```css
:root {
  /* Accessible color palette */
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #595959;
  --color-text-muted: #767676;  /* Minimum 4.5:1 on white */

  --color-primary: #0066cc;
  --color-primary-hover: #004499;
  --color-primary-text: #ffffff;

  --color-border: #767676;  /* 3:1 on white for UI components */
  --color-focus: #005fcc;

  --color-error: #d32f2f;
  --color-success: #388e3c;
}

/* Dark mode - recalculate contrasts */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a1a1a;
    --color-text-primary: #ffffff;
    --color-text-secondary: #b3b3b3;
    --color-text-muted: #999999;  /* 3:1 on dark bg, use for large text */

    --color-primary: #66b3ff;  /* Lighter for dark backgrounds */
    --color-primary-hover: #99ccff;

    --color-border: #808080;  /* 3:1 on dark background */
    --color-focus: #66b3ff;
  }
}

/* Usage */
body {
  color: var(--color-text-primary);
  background-color: var(--color-background, #ffffff);
}

.muted {
  color: var(--color-text-muted);
}

input {
  border: 2px solid var(--color-border);
}

a:focus,
button:focus {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}
```

## Testing Tools

### Browser DevTools
- Chrome: DevTools > Elements > Styles > Contrast ratio indicator
- Firefox: DevTools > Accessibility > Check for issues

### Online Tools
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Colour Contrast Analyser (CCA): Desktop application
- Stark (Figma/Sketch plugin)

### Automated Testing
```javascript
// Using axe-core
import axe from 'axe-core';

axe.run(document, {
  rules: ['color-contrast']
}).then(results => {
  console.log('Contrast violations:', results.violations);
});
```

## WCAG References

- **WCAG 2.1 Success Criterion 1.4.3**: Contrast (Minimum) - Level AA
- **WCAG 2.1 Success Criterion 1.4.6**: Contrast (Enhanced) - Level AAA
- **WCAG 2.1 Success Criterion 1.4.11**: Non-text Contrast - Level AA
- **WCAG 2.1 Success Criterion 1.4.1**: Use of Color - Level A

## Implementation Checklist

- [ ] **Does normal text have at least 4.5:1 contrast?**
- [ ] **Does large text (18pt+) have at least 3:1 contrast?**
- [ ] **Do UI components (borders, icons) have 3:1 contrast?**
- [ ] **Are focus indicators visible with 3:1+ contrast?**
- [ ] **Is color paired with another indicator (text, icon, pattern)?**
- [ ] **Do all interactive states maintain sufficient contrast?**
- [ ] **Are links distinguishable from body text?**
- [ ] **Does placeholder text meet contrast requirements?**

## Quick Reference

```
CONTRAST RATIO REQUIREMENTS:

WCAG AA (Minimum):
  Normal text (<18pt): 4.5:1
  Large text (>=18pt or >=14pt bold): 3:1
  UI components & graphics: 3:1
  Focus indicators: 3:1

WCAG AAA (Enhanced):
  Normal text: 7:1
  Large text: 4.5:1

SAFE COLORS ON WHITE (#ffffff):
  #595959 - 7:1 (passes AAA for normal text)
  #767676 - 4.5:1 (minimum for AA normal text)
  #949494 - 3:1 (large text only)

RULES:
  - Never use color ALONE to convey information
  - Links need underline OR 3:1 contrast vs surrounding text
  - Focus indicators must be visible on all backgrounds
  - Test all states: default, hover, active, focus, disabled
  - Disabled elements: 3:1 minimum (not 4.5:1)

NEVER:
  - Remove focus outlines without replacement
  - Use light gray (#999, #aaa, #ccc) for normal text
  - Rely on color alone for errors, links, or status
  - Forget to test dark mode/high contrast mode
```
