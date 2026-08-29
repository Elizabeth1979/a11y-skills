---
description: Instructions for managing keyboard focus in dynamic content and SPAs
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# Focus Management Accessibility

## CRITICAL RULES

**Focus management ensures keyboard users always know where they are and can navigate efficiently when content changes dynamically.**

### 1. Move Focus When Content Changes Significantly

When new content appears or the page context changes, move focus appropriately.

```html
<!-- Good - Focus moves to new content -->
<button onclick="showResults()">Search</button>

<div id="results" tabindex="-1">
  <!-- Results loaded here, focus moved to this container -->
</div>

<script>
function showResults() {
  loadResults().then(() => {
    document.getElementById('results').focus();
  });
}
</script>

<!-- Bad - Focus stays on button after content loads -->
<button onclick="loadResults()">Search</button>
<div id="results">
  <!-- User doesn't know results appeared -->
</div>
```

**When to move focus:**
- After loading new page content (SPA navigation)
- When opening modals or dialogs
- After form submission with inline results
- When revealing significant new content
- After deleting items (move to next item or container)

### 2. Return Focus After Closing Overlays

When closing modals, dialogs, or popups, return focus to the element that triggered them.

```html
<!-- Good - Focus returns to trigger -->
<button id="open-modal" onclick="openModal()">Open Settings</button>

<div role="dialog" aria-modal="true" id="modal">
  <h2>Settings</h2>
  <button onclick="closeModal()">Close</button>
</div>

<script>
let triggerElement;

function openModal() {
  triggerElement = document.activeElement;
  document.getElementById('modal').style.display = 'block';
  document.getElementById('modal').querySelector('h2').focus();
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  triggerElement.focus(); // Return focus to trigger
}
</script>

<!-- Bad - Focus lost after closing -->
<script>
function closeModal() {
  document.getElementById('modal').style.display = 'none';
  // Focus goes to body - user is lost!
}
</script>
```

**Important:**
- Store reference to trigger element when opening
- Return focus when closing (Escape key, close button, backdrop click)
- If trigger no longer exists, move focus to a logical alternative

### 3. Trap Focus in Modal Dialogs

Focus must stay within modal dialogs until they are closed.

```html
<!-- Good - Focus trapped in modal -->
<div role="dialog" aria-modal="true" id="modal">
  <h2 id="modal-title">Confirm Action</h2>
  <p>Are you sure you want to proceed?</p>
  <button id="cancel-btn">Cancel</button>
  <button id="confirm-btn">Confirm</button>
</div>

<script>
const modal = document.getElementById('modal');
const focusableElements = modal.querySelectorAll(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);
const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});
</script>
```

### 4. Use tabindex Correctly

Understand when to use different tabindex values.

```html
<!-- tabindex="0" - Add to natural tab order -->
<div role="button" tabindex="0" onclick="handleClick()">
  Custom Button
</div>

<!-- tabindex="-1" - Programmatically focusable, not in tab order -->
<main id="main-content" tabindex="-1">
  <!-- Can receive focus via JavaScript, but not via Tab -->
</main>

<!-- AVOID: tabindex > 0 - Disrupts natural tab order -->
<!-- Bad -->
<button tabindex="3">Third</button>
<button tabindex="1">First</button>
<button tabindex="2">Second</button>
```

**Rules:**
- `tabindex="0"`: Add non-interactive elements to tab order (custom controls)
- `tabindex="-1"`: Make elements programmatically focusable (focus targets)
- `tabindex > 0`: **Avoid** - Creates confusing tab order

### 5. Maintain Logical Focus Order

Focus order should follow visual/logical reading order.

```html
<!-- Good - Focus follows visual order -->
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <h1>Welcome</h1>
  <button>Action 1</button>
  <button>Action 2</button>
</main>

<!-- Bad - CSS reorders visually but not focus order -->
<style>
  .container { display: flex; flex-direction: row-reverse; }
</style>
<div class="container">
  <button>Appears Second, Focused First</button>
  <button>Appears First, Focused Second</button>
</div>
```

## Focus Management Patterns

### SPA Route Changes

```jsx
// React - Focus management on route change
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function PageContainer({ children, title }) {
  const mainRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Move focus to main content
    if (mainRef.current) {
      mainRef.current.focus();
    }

    // Announce page change to screen readers
    announcePageChange(title);
  }, [location.pathname, title]);

  return (
    <main ref={mainRef} tabIndex={-1} aria-labelledby="page-title">
      <h1 id="page-title">{title}</h1>
      {children}
    </main>
  );
}
```

### After Deleting Items

```jsx
// Focus management after deletion
function ItemList({ items, onDelete }) {
  const listRef = useRef(null);
  const itemRefs = useRef({});

  const handleDelete = (id, index) => {
    onDelete(id);

    // Move focus to next item, or previous, or container
    const nextItem = items[index + 1];
    const prevItem = items[index - 1];

    if (nextItem && itemRefs.current[nextItem.id]) {
      itemRefs.current[nextItem.id].focus();
    } else if (prevItem && itemRefs.current[prevItem.id]) {
      itemRefs.current[prevItem.id].focus();
    } else {
      listRef.current?.focus();
    }
  };

  return (
    <ul ref={listRef} tabIndex={-1} aria-label="Items">
      {items.map((item, index) => (
        <li key={item.id}>
          <span>{item.name}</span>
          <button
            ref={(el) => (itemRefs.current[item.id] = el)}
            onClick={() => handleDelete(item.id, index)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

### Loading States

```jsx
// Focus after async content loads
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchResults(query).then((data) => {
        setResults(data);
        setLoading(false);

        // Move focus to results after loading
        setTimeout(() => {
          resultsRef.current?.focus();
        }, 100);
      });
    }
  }, [query]);

  return (
    <div
      ref={resultsRef}
      tabIndex={-1}
      aria-label="Search results"
      aria-busy={loading}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Focus Trap Implementation

### React Focus Trap Hook

```jsx
import { useEffect, useRef } from 'react';

function useFocusTrap(isActive) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableSelector = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const focusableElements = container.querySelectorAll(focusableSelector);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstElement?.focus();

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return containerRef;
}

// Usage
function Modal({ isOpen, onClose, children }) {
  const modalRef = useFocusTrap(isOpen);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" ref={modalRef}>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### Vue Focus Trap Directive

```vue
<template>
  <div v-if="isOpen" v-focus-trap role="dialog" aria-modal="true">
    <h2>Modal Title</h2>
    <button @click="close">Close</button>
  </div>
</template>

<script>
export default {
  directives: {
    focusTrap: {
      mounted(el) {
        const focusable = el.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        first?.focus();

        el._focusTrapHandler = (e) => {
          if (e.key !== 'Tab') return;
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        };

        el.addEventListener('keydown', el._focusTrapHandler);
      },
      unmounted(el) {
        el.removeEventListener('keydown', el._focusTrapHandler);
      },
    },
  },
};
</script>
```

## Common Mistakes

### Not Returning Focus After Modal Close

```jsx
// Bad - Focus lost
function Modal({ onClose }) {
  return (
    <div role="dialog">
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// Good - Focus returns to trigger
function Modal({ onClose, triggerRef }) {
  const handleClose = () => {
    onClose();
    triggerRef.current?.focus();
  };

  return (
    <div role="dialog">
      <button onClick={handleClose}>Close</button>
    </div>
  );
}
```

### Focus Moving to Invisible Elements

```jsx
// Bad - Focusing hidden content
element.style.display = 'none';
element.focus(); // Won't work!

// Good - Focus visible content
element.style.display = 'block';
element.focus();
```

## WCAG References

- **WCAG 2.1 Success Criterion 2.1.1**: Keyboard (Level A)
- **WCAG 2.1 Success Criterion 2.1.2**: No Keyboard Trap (Level A)
- **WCAG 2.1 Success Criterion 2.4.3**: Focus Order (Level A)
- **WCAG 2.1 Success Criterion 2.4.7**: Focus Visible (Level AA)
- **WCAG 2.1 Success Criterion 3.2.1**: On Focus (Level A)

## Implementation Checklist

- [ ] **Does focus move to new content when it appears dynamically?**
- [ ] **Does focus return to the trigger element when modals/popups close?**
- [ ] **Is focus trapped within modal dialogs?**
- [ ] **Are only `tabindex="0"` and `tabindex="-1"` used (not positive values)?**
- [ ] **Does focus order match visual/logical reading order?**
- [ ] **Is focus visible at all times (never hidden)?**
- [ ] **For SPAs: Does focus move appropriately on route changes?**
- [ ] **After deleting items: Does focus move to a logical element?**

## Quick Reference

```
FOCUS MANAGEMENT RULES:

Move focus when:
- Opening modals/dialogs (to first focusable or title)
- Loading new page content (SPA navigation)
- After significant content changes
- After form submission with results

Return focus when:
- Closing modals/dialogs (to trigger element)
- Dismissing popups/tooltips
- Completing inline editing

Use tabindex:
- tabindex="0"  - Add to tab order (custom controls)
- tabindex="-1" - Programmatic focus only (focus targets)
- tabindex > 0  - NEVER USE (breaks tab order)

Focus trap in modals:
- Tab from last element -> first element
- Shift+Tab from first element -> last element
- Escape key should close and return focus

NEVER:
- Leave focus on hidden elements
- Use positive tabindex values
- Forget to return focus after closing overlays
- Let focus order contradict visual order
```
