---
description: Instructions for using ARIA live regions to announce dynamic content changes
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# ARIA Live Regions Accessibility

## CRITICAL RULES

**Live regions announce dynamic content changes to screen reader users without requiring focus to move.**

### 1. Use the Correct Live Region Type

Choose the appropriate live region based on urgency and context.

```html
<!-- role="status" / aria-live="polite" - Non-urgent updates -->
<div role="status" aria-live="polite">
  3 items in cart
</div>

<!-- role="alert" / aria-live="assertive" - Important, time-sensitive -->
<div role="alert" aria-live="assertive">
  Session expires in 2 minutes
</div>

<!-- role="log" - Sequential information (chat, activity feed) -->
<div role="log" aria-live="polite">
  <p>User1 joined the chat</p>
  <p>User2: Hello everyone</p>
</div>

<!-- role="timer" - Time-related updates -->
<div role="timer" aria-live="off">
  05:32 remaining
</div>
```

**Live Region Types:**

| Role/Attribute | Behavior | Use Case |
|---------------|----------|----------|
| `role="status"` | Polite, waits | Status messages, search results count |
| `role="alert"` | Assertive, interrupts | Errors, warnings, urgent info |
| `role="log"` | Polite, preserves history | Chat, activity logs |
| `role="marquee"` | Off by default | Scrolling text (rarely used) |
| `role="timer"` | Off by default | Countdown timers |

### 2. Live Region MUST Exist in DOM Before Content Changes

The live region container must be present when the page loads, not added dynamically with content.

```html
<!-- Good - Container exists, content added later -->
<div id="status" role="status" aria-live="polite"></div>

<script>
// Content change is announced
document.getElementById('status').textContent = 'File uploaded successfully';
</script>

<!-- Bad - Container AND content added together -->
<script>
// This will NOT be announced!
const status = document.createElement('div');
status.setAttribute('role', 'status');
status.textContent = 'File uploaded';
document.body.appendChild(status);
</script>
```

**Why this matters:**
- Screen readers only monitor live regions that exist when the page loads
- Adding both container and content simultaneously won't trigger announcement

### 3. Use aria-atomic for Complete Announcements

`aria-atomic="true"` announces the entire region, not just changed parts.

```html
<!-- Good - Entire content announced when any part changes -->
<div role="status" aria-live="polite" aria-atomic="true">
  <span>Cart total:</span>
  <span id="total">$45.00</span>
</div>
<!-- Announces: "Cart total: $45.00" -->

<!-- Without aria-atomic - Only changed text announced -->
<div role="status" aria-live="polite">
  <span>Cart total:</span>
  <span id="total">$45.00</span>
</div>
<!-- Announces: "$45.00" (missing context) -->
```

**Use `aria-atomic="true"` when:**
- The change only makes sense with surrounding context
- Updating numbers or values with labels
- Status messages with multiple parts

### 4. Control Verbosity with aria-relevant

Specify which changes trigger announcements.

```html
<!-- Default: announces additions and text changes -->
<div role="log" aria-live="polite" aria-relevant="additions text">
  <!-- New messages announced, deletions silent -->
</div>

<!-- Announce everything including removals -->
<div role="status" aria-live="polite" aria-relevant="all">
  <!-- Additions, removals, and text changes announced -->
</div>

<!-- Only announce new elements -->
<div role="feed" aria-live="polite" aria-relevant="additions">
  <!-- Only new items announced -->
</div>
```

**aria-relevant values:**
- `additions` - New nodes added (default)
- `removals` - Nodes removed
- `text` - Text content changes (default)
- `all` - All changes
- Combine with space: `additions removals`

### 5. Don't Overuse Assertive Announcements

`aria-live="assertive"` interrupts the user - use sparingly.

```html
<!-- Good - Assertive for critical errors -->
<div role="alert" aria-live="assertive">
  Error: Payment failed. Please try again.
</div>

<!-- Good - Polite for status updates -->
<div role="status" aria-live="polite">
  File upload complete
</div>

<!-- Bad - Assertive for non-critical info -->
<div aria-live="assertive">
  <!-- Don't use assertive for: -->
  3 new notifications  <!-- Use polite -->
  Search results loaded  <!-- Use polite -->
  Item added to cart  <!-- Use polite -->
</div>
```

**Use `aria-live="assertive"` only for:**
- Critical errors requiring immediate action
- Session timeout warnings
- Security alerts
- Form validation preventing submission

## Common Patterns

### Status Messages

```html
<!-- Search results count -->
<div role="status" aria-live="polite" aria-atomic="true">
  <span id="result-count">24</span> results found
</div>

<!-- Save status -->
<div role="status" aria-live="polite">
  Changes saved
</div>

<!-- Loading indicator -->
<div role="status" aria-live="polite" aria-busy="true">
  Loading...
</div>
```

### Error Messages

```html
<!-- Form error - assertive -->
<div role="alert" aria-live="assertive">
  Please correct the errors below before submitting.
</div>

<!-- Individual field error - can be polite -->
<div role="status" aria-live="polite">
  Email address is invalid
</div>
```

### Progress Updates

```html
<!-- File upload progress -->
<div role="status" aria-live="polite" aria-atomic="true">
  Uploading: <span id="progress">45</span>% complete
</div>

<!-- Multi-step process -->
<div role="status" aria-live="polite" aria-atomic="true">
  Step <span id="current">2</span> of <span id="total">4</span>: Payment Details
</div>
```

### Chat/Message Applications

```html
<!-- Chat log -->
<div role="log" aria-live="polite" aria-relevant="additions">
  <article>
    <span class="author">Alice:</span>
    <span class="message">Hello everyone!</span>
  </article>
  <!-- New messages added here -->
</div>

<!-- Typing indicator -->
<div role="status" aria-live="polite">
  Alice is typing...
</div>
```

## Framework Examples

### React

```jsx
// Live region component
function LiveAnnouncer({ message, politeness = 'polite' }) {
  return (
    <div
      role={politeness === 'assertive' ? 'alert' : 'status'}
      aria-live={politeness}
      aria-atomic="true"
      className="visually-hidden"
    >
      {message}
    </div>
  );
}

// Usage with state
function SearchResults({ results }) {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    setAnnouncement(`${results.length} results found`);
  }, [results]);

  return (
    <>
      <LiveAnnouncer message={announcement} />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}

// Reusable announcer hook
function useAnnouncer() {
  const [message, setMessage] = useState('');

  const announce = useCallback((text, politeness = 'polite') => {
    // Clear then set to ensure re-announcement of same message
    setMessage('');
    setTimeout(() => setMessage(text), 100);
  }, []);

  const Announcer = useCallback(() => (
    <div role="status" aria-live="polite" className="sr-only">
      {message}
    </div>
  ), [message]);

  return { announce, Announcer };
}
```

### Vue

```vue
<template>
  <div>
    <!-- Live region container - always in DOM -->
    <div
      :role="isError ? 'alert' : 'status'"
      :aria-live="isError ? 'assertive' : 'polite'"
      aria-atomic="true"
      class="visually-hidden"
    >
      {{ announcement }}
    </div>

    <!-- Your content -->
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcement: '',
      isError: false,
      items: [],
      loading: false
    };
  },
  methods: {
    async fetchItems() {
      this.loading = true;
      try {
        this.items = await api.getItems();
        this.announce(`${this.items.length} items loaded`);
      } catch (error) {
        this.announceError('Failed to load items');
      }
      this.loading = false;
    },
    announce(message) {
      this.isError = false;
      this.announcement = '';
      this.$nextTick(() => {
        this.announcement = message;
      });
    },
    announceError(message) {
      this.isError = true;
      this.announcement = message;
    }
  }
};
</script>
```

### Vanilla JavaScript

```html
<!-- HTML - Live region always present -->
<div id="announcer" role="status" aria-live="polite" class="visually-hidden"></div>

<script>
// Announcer utility
const announcer = {
  element: document.getElementById('announcer'),

  announce(message, politeness = 'polite') {
    this.element.setAttribute('aria-live', politeness);
    this.element.setAttribute('role', politeness === 'assertive' ? 'alert' : 'status');

    // Clear and set to trigger announcement
    this.element.textContent = '';
    setTimeout(() => {
      this.element.textContent = message;
    }, 100);
  },

  clear() {
    this.element.textContent = '';
  }
};

// Usage
announcer.announce('File uploaded successfully');
announcer.announce('Error: Invalid email', 'assertive');
</script>

<style>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

## Common Mistakes

### Adding Container and Content Together

```jsx
// Bad - Container added with content
function Notification({ message }) {
  if (!message) return null;

  return (
    <div role="status" aria-live="polite">
      {message}
    </div>
  );
}

// Good - Container always exists
function Notification({ message }) {
  return (
    <div role="status" aria-live="polite">
      {message || ''}
    </div>
  );
}
```

### Overusing Assertive

```html
<!-- Bad - Too many assertive regions -->
<div role="alert">Welcome back!</div>  <!-- Not urgent -->
<div role="alert">3 items in cart</div>  <!-- Not urgent -->
<div role="alert">New message received</div>  <!-- Not urgent -->

<!-- Good - Reserve assertive for critical info -->
<div role="status">Welcome back!</div>
<div role="status">3 items in cart</div>
<div role="status">New message received</div>
<div role="alert">Error: Session expired</div>  <!-- Critical -->
```

### Missing aria-atomic for Contextual Updates

```html
<!-- Bad - Only announces the number -->
<div role="status" aria-live="polite">
  Total: $<span id="price">99.99</span>
</div>
<!-- Screen reader says: "99.99" -->

<!-- Good - Announces full context -->
<div role="status" aria-live="polite" aria-atomic="true">
  Total: $<span id="price">99.99</span>
</div>
<!-- Screen reader says: "Total: $99.99" -->
```

## WCAG References

- **WCAG 2.1 Success Criterion 4.1.3**: Status Messages (Level AA)
- **WCAG 2.1 Success Criterion 3.3.1**: Error Identification (Level A)
- **WCAG 2.1 Success Criterion 3.3.3**: Error Suggestion (Level AA)

## Implementation Checklist

- [ ] **Is the live region container present in the DOM on page load?**
- [ ] **Are status updates using `role="status"` or `aria-live="polite"`?**
- [ ] **Are critical errors using `role="alert"` or `aria-live="assertive"`?**
- [ ] **Is `aria-atomic="true"` used when context is needed?**
- [ ] **Are assertive announcements reserved for truly critical messages?**
- [ ] **Is `aria-busy="true"` used during loading states?**
- [ ] **Are live regions visually hidden if not meant to be seen?**

## Quick Reference

```
LIVE REGION TYPES:

role="status" / aria-live="polite"
  - Waits for user to finish current task
  - Use for: status updates, search counts, save confirmations

role="alert" / aria-live="assertive"
  - Interrupts immediately
  - Use for: errors, warnings, session timeouts

role="log"
  - Polite, preserves history
  - Use for: chat messages, activity feeds

ATTRIBUTES:

aria-atomic="true"
  - Announces entire region content
  - Use when context is needed

aria-relevant="additions text" (default)
  - additions: new nodes
  - removals: removed nodes
  - text: text changes
  - all: everything

aria-busy="true"
  - Indicates region is updating
  - Use during loading states

RULES:
- Live region container MUST exist before content changes
- Use polite for most updates
- Reserve assertive for critical errors only
- Use aria-atomic when numbers/values need context
- Clear and re-set content to re-announce same message
```
