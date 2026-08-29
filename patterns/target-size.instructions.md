---
description: Instructions for meeting WCAG 2.2 target size requirements for pointer and touch targets
applyTo: '**/*.{html,css,scss,jsx,tsx,vue,svelte}'
---

# Target Size Accessibility

## CRITICAL RULES

**WCAG 2.2 added Success Criterion 2.5.8 Target Size (Minimum) at Level AA. Interactive targets
must be at least 24 by 24 CSS pixels unless one of five specific exceptions applies.**

This is a pointer-input criterion. It affects people with tremor, limited dexterity, or reduced
fine motor control, and anyone using a touchscreen on a moving bus. It is not only a mobile
concern — a 16-pixel close button is as hard to hit with a trackpad as with a thumb.

### 1. Interactive Targets MUST Be At Least 24x24 CSS Pixels

The target is the area that responds to the pointer, not the visible icon.

```html
<!-- Good - padding grows the target beyond the 16px icon -->
<button class="icon-button" aria-label="Close dialog">
  <svg width="16" height="16" aria-hidden="true"><!-- ... --></svg>
</button>

<style>
.icon-button {
  /* 16px icon + 4px padding each side = 24x24 target */
  padding: 4px;
  min-width: 24px;
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>

<!-- Bad - the target is only as big as the icon -->
<button class="icon-button-tight" aria-label="Close dialog">
  <svg width="16" height="16" aria-hidden="true"><!-- ... --></svg>
</button>

<style>
.icon-button-tight {
  padding: 0;
  border: none;
  background: none;
  /* 16x16 target - fails 2.5.8 with no applicable exception */
}
</style>
```

**Why this matters:**
- People with motor impairments miss small targets and activate the wrong control
- A mis-tap on a destructive action (delete, unsubscribe, confirm) is not recoverable by retrying
- Padding is usually enough; the visible design need not change

### 2. Know the Five Exceptions Before Claiming One

2.5.8 does not apply when:

| Exception | Meaning |
|---|---|
| **Spacing** | The target is under 24x24, but a 24px-diameter circle centred on it overlaps no other target's circle |
| **Equivalent** | Another control on the same page does the same thing and does meet 24x24 |
| **Inline** | The target is inside a sentence, or constrained by the line height of non-target text |
| **User agent control** | Size is determined by the browser and not modified by the author |
| **Essential** | A specific presentation is legally required or essential to the information (e.g. a map pin at a real coordinate) |

```html
<!-- Good - Spacing exception applied deliberately -->
<div class="rating">
  <!-- 20x20 stars, but 12px gaps keep the 24px circles from overlapping -->
  <button aria-label="Rate 1 star" class="star"></button>
  <button aria-label="Rate 2 stars" class="star"></button>
</div>

<style>
.star { width: 20px; height: 20px; }
.rating { display: flex; gap: 12px; }
</style>

<!-- Good - Inline exception: a link inside running prose -->
<p>Read our <a href="/privacy">privacy policy</a> before continuing.</p>

<!-- Bad - claiming "inline" for a link that is not in a sentence -->
<nav>
  <a href="/a" style="font-size:10px">A</a><a href="/b" style="font-size:10px">B</a>
</nav>
<!-- These are standalone navigation targets, densely packed. No exception applies. -->
```

**Do not assume an exception.** Name which one applies and why. "It's inline" is not true of a
link that sits alone in a toolbar.

### 3. Dense Control Clusters Are the Common Failure

Toolbars, table row actions, carousel dots, tag chips with remove buttons, and calendar day cells
are where this criterion is failed in practice.

```html
<!-- Bad - table row actions crammed together -->
<td>
  <button aria-label="Edit"><svg width="14" height="14"></svg></button>
  <button aria-label="Delete"><svg width="14" height="14"></svg></button>
</td>

<!-- Good - each action is a 24px target -->
<td>
  <div class="row-actions">
    <button aria-label="Edit invoice 1084"><svg width="14" height="14" aria-hidden="true"></svg></button>
    <button aria-label="Delete invoice 1084"><svg width="14" height="14" aria-hidden="true"></svg></button>
  </div>
</td>

<style>
.row-actions { display: flex; gap: 4px; }
.row-actions button {
  min-width: 24px;
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
```

### 4. Prefer 44x44 Where You Can

2.5.5 Target Size (Enhanced) asks for 44x44 CSS pixels at Level AAA. Platform guidance from
Apple and Google lands in the same range. 24x24 is the conformance floor, not the design target —
if the layout allows 44, use 44, especially for primary and destructive actions.

## Complete Target Size Structure

```html
<div class="toolbar" role="toolbar" aria-label="Text formatting">
  <button type="button" aria-pressed="false" aria-label="Bold">
    <svg width="16" height="16" aria-hidden="true" focusable="false"><!-- ... --></svg>
  </button>
  <button type="button" aria-pressed="false" aria-label="Italic">
    <svg width="16" height="16" aria-hidden="true" focusable="false"><!-- ... --></svg>
  </button>
</div>

<style>
.toolbar {
  display: flex;
  gap: 4px;
}

.toolbar button {
  /* Target floor, independent of icon size */
  min-inline-size: 24px;
  min-block-size: 24px;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Coarse pointers get the enhanced size where space allows */
@media (pointer: coarse) {
  .toolbar button {
    min-inline-size: 44px;
    min-block-size: 44px;
  }
}
</style>
```

## Examples

### React

```jsx
// A reusable icon button that cannot fail 2.5.8
function IconButton({ label, icon: Icon, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="icon-button"
      {...props}
    >
      <Icon aria-hidden="true" focusable="false" />
    </button>
  );
}
```

```css
.icon-button {
  min-inline-size: 24px;
  min-block-size: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}
```

Putting the floor in the shared component rather than at each call site is what keeps the
criterion met as the codebase grows.

### Expanding a target without changing the visual

When the design will not tolerate a bigger control, grow the hit area with a pseudo-element:

```css
.small-control {
  position: relative;
}

.small-control::before {
  content: "";
  position: absolute;
  /* Expand the hit area to 24x24 around a 16x16 control */
  inset: -4px;
}
```

Use this deliberately: the expanded areas of adjacent controls must not overlap, or one will
swallow taps meant for the other.

## Testing

Automated tooling can measure this. axe-core reports `target-size` for controls under the
threshold, and it is one of the few 2.2 criteria a machine can judge reliably — the geometry is
objective, though whether an exception applies is not.

```js
const results = await new AxeBuilder({ page })
  .withTags(['wcag22aa'])
  .analyze();
expect(results.violations).toEqual([]);
```

## WCAG References

- **WCAG 2.2 Success Criterion 2.5.8**: Target Size (Minimum) (Level AA) — new in WCAG 2.2
- **WCAG 2.1 Success Criterion 2.5.5**: Target Size (Enhanced) (Level AAA)
- **WCAG 2.1 Success Criterion 2.5.1**: Pointer Gestures (Level A)

## Implementation Checklist

When adding any interactive control:
- [ ] **Is the target at least 24x24 CSS pixels?** (CRITICAL — 2.5.8, Level AA)
- [ ] **If under 24x24, which of the five exceptions applies, and why?** (CRITICAL)
- [ ] **Is the size enforced on the control, not just the icon inside it?**
- [ ] **Do adjacent small targets have enough spacing that their 24px circles do not overlap?**
- [ ] **Are destructive actions given extra room beyond the minimum?**
- [ ] **Is the floor set in a shared component rather than per call site?**
- [ ] **Does the layout still work at 44x44 for coarse pointers?**

## Quick Reference

| Context | Minimum | Level |
|---|---|---|
| Any pointer target | 24 x 24 CSS px | AA (2.5.8) |
| Enhanced | 44 x 44 CSS px | AAA (2.5.5) |
| Inline link in prose | Exempt | — |
| Browser-sized control | Exempt | — |

| Exception | Applies when |
|---|---|
| Spacing | 24px circles centred on each target do not overlap |
| Equivalent | Another conforming control does the same job |
| Inline | Target sits within a sentence or block of text |
| User agent control | Author has not modified the size |
| Essential | The exact presentation is legally required or essential |
