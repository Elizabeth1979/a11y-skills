---
description: Instructions for implementing skip links to bypass repetitive content
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# Skip Links Accessibility

## CRITICAL RULES

**Skip links allow keyboard users to bypass repetitive content (like navigation) and jump directly to main content.**

### 1. Every Page MUST Have a Skip Link to Main Content

The skip link should be the **first focusable element** on the page.

```html
<!-- Good - Skip link as first element in body -->
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header>
    <nav>...</nav>
  </header>
  <main id="main-content">
    ...
  </main>
</body>

<!-- Bad - No skip link -->
<body>
  <header>
    <nav><!-- 20+ navigation links --></nav>
  </header>
  <main>...</main>  <!-- Keyboard users must tab through all nav links! -->
</body>
```

**Why this matters:**
- Keyboard users would otherwise need to tab through every navigation link
- Screen reader users can quickly reach the main content
- Required for WCAG 2.1 Level A compliance (2.4.1 Bypass Blocks)

### 2. Skip Links MUST Be Visible When Focused

Skip links are typically hidden until they receive keyboard focus.

```html
<!-- Good - Visible on focus -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: #000;
  color: #fff;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>

<!-- Bad - Never visible -->
<a href="#main-content" style="display: none;">Skip to main content</a>
<!-- display:none removes from tab order! -->

<!-- Bad - Hidden even when focused -->
<a href="#main-content" class="visually-hidden">Skip to main content</a>
<!-- Must become visible on focus -->
```

**Important:**
- Use CSS positioning (not `display: none` or `visibility: hidden`) to hide skip links
- The link MUST become visible when it receives focus
- Sighted keyboard users need to see the skip link to use it

### 3. Target Element MUST Be Focusable

The skip link target must receive focus when activated.

```html
<!-- Good - Main element with tabindex="-1" -->
<main id="main-content" tabindex="-1">
  <h1>Page Title</h1>
  ...
</main>

<!-- Good - Using a heading as target -->
<h1 id="main-content" tabindex="-1">Page Title</h1>

<!-- Bad - Target without tabindex -->
<main id="main-content">
  <!-- Focus may not move properly in all browsers -->
</main>
```

**Why `tabindex="-1"`:**
- Makes the element programmatically focusable
- Does NOT add the element to the tab order
- Ensures focus moves to the target when skip link is activated

### 4. Use Descriptive Link Text

The skip link text should clearly describe where it leads.

```html
<!-- Good - Descriptive text -->
<a href="#main-content">Skip to main content</a>
<a href="#navigation">Skip to navigation</a>
<a href="#search">Skip to search</a>

<!-- Bad - Vague text -->
<a href="#main-content">Skip</a>
<a href="#main-content">Click here</a>
```

## Multiple Skip Links

For complex pages, provide multiple skip links to different sections.

```html
<!-- Good - Multiple skip links for complex layouts -->
<div class="skip-links">
  <a href="#main-content">Skip to main content</a>
  <a href="#primary-nav">Skip to navigation</a>
  <a href="#search">Skip to search</a>
  <a href="#footer">Skip to footer</a>
</div>

<nav id="primary-nav">...</nav>
<form id="search" role="search">...</form>
<main id="main-content" tabindex="-1">...</main>
<footer id="footer">...</footer>
```

## Examples

### Basic Skip Link Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #000;
      color: #fff;
      padding: 8px 16px;
      text-decoration: none;
      z-index: 1000;
    }

    .skip-link:focus {
      top: 0;
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header>
    <nav aria-label="Main">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content" tabindex="-1">
    <h1>Welcome to Our Site</h1>
    <p>Main content here...</p>
  </main>

  <footer>...</footer>
</body>
</html>
```

### React/JSX Implementation

```jsx
// SkipLink component
function SkipLink({ href, children }) {
  return (
    <a href={href} className="skip-link">
      {children}
    </a>
  );
}

// App layout with skip link
function App() {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>

      <header>
        <Navigation />
      </header>

      <main id="main-content" tabIndex={-1}>
        <h1>Page Title</h1>
        {/* Main content */}
      </main>

      <footer>...</footer>
    </>
  );
}

// CSS (in stylesheet or CSS-in-JS)
const styles = `
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    padding: 8px 16px;
    background: #000;
    color: #fff;
    z-index: 1000;
    text-decoration: none;
  }

  .skip-link:focus {
    top: 0;
  }
`;
```

### Vue Implementation

```vue
<template>
  <div>
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header>
      <Navigation />
    </header>

    <main id="main-content" tabindex="-1">
      <h1>{{ pageTitle }}</h1>
      <slot />
    </main>

    <footer>...</footer>
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: #000;
  color: #fff;
  z-index: 1000;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
</style>
```

## Common Mistakes

### Skip Link Not First in Tab Order

```html
<!-- Bad - Skip link not first focusable element -->
<body>
  <header>
    <a href="/">Logo</a>  <!-- This gets focus first -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
  </header>
</body>

<!-- Good - Skip link is first -->
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header>
    <a href="/">Logo</a>
  </header>
</body>
```

### Using display:none

```html
<!-- Bad - Removes from accessibility tree AND tab order -->
<a href="#main" style="display: none;">Skip</a>

<!-- Bad - Also removes from tab order -->
<a href="#main" style="visibility: hidden;">Skip</a>

<!-- Good - Positioned off-screen but still in tab order -->
<a href="#main" class="skip-link">Skip to main content</a>
```

### Missing Target tabindex

```html
<!-- Bad - Focus may not move in some browsers -->
<a href="#main-content">Skip to main content</a>
<main id="main-content">
  <h1>Title</h1>
</main>

<!-- Good - tabindex ensures focus moves correctly -->
<a href="#main-content">Skip to main content</a>
<main id="main-content" tabindex="-1">
  <h1>Title</h1>
</main>
```

## Skip Link Patterns for SPAs

In Single Page Applications, handle focus when routes change.

```jsx
// React Router example
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function MainContent({ children }) {
  const mainRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Move focus to main content on route change
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, [location.pathname]);

  return (
    <main id="main-content" ref={mainRef} tabIndex={-1}>
      {children}
    </main>
  );
}
```

## WCAG References

- **WCAG 2.1 Success Criterion 2.4.1**: Bypass Blocks (Level A)
- **WCAG 2.1 Success Criterion 2.4.3**: Focus Order (Level A)
- **WCAG 2.1 Success Criterion 2.4.7**: Focus Visible (Level AA)

## Implementation Checklist

- [ ] **Is there a skip link as the first focusable element on each page?**
- [ ] **Does the skip link become visible when focused?**
- [ ] **Does the skip link have descriptive text (e.g., "Skip to main content")?**
- [ ] **Does the target element have `tabindex="-1"`?**
- [ ] **Does focus move to the target when the skip link is activated?**
- [ ] **Is the skip link NOT hidden with `display: none` or `visibility: hidden`?**
- [ ] **For SPAs: Is focus managed when routes change?**

## Quick Reference

```
ALWAYS:
- Include skip link as first focusable element
- Make skip link visible on focus
- Use tabindex="-1" on target element
- Use descriptive link text ("Skip to main content")
- Position off-screen with CSS (not display:none)

NEVER:
- Hide skip links with display:none or visibility:hidden
- Place skip link after navigation
- Forget tabindex="-1" on target
- Use vague text like "Skip" or "Click here"

Basic Pattern:
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <!-- Navigation and header -->
  <main id="main-content" tabindex="-1">
    <!-- Main content -->
  </main>
```
