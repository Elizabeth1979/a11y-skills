---
description: Instructions for providing single-pointer alternatives to dragging, per WCAG 2.2 Dragging Movements
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# Dragging Movements Accessibility

## CRITICAL RULES

**WCAG 2.2 added Success Criterion 2.5.7 Dragging Movements at Level AA. Any function that uses
a dragging movement must also be operable with a single pointer without dragging — unless
dragging is essential.**

Dragging requires pressing, holding, moving accurately, and releasing at the right moment. People
with tremor, limited dexterity, or who use a head pointer, eye tracker, or switch device often
cannot do all four. This is separate from keyboard access: a widget can be fully keyboard
operable and still fail 2.5.7, because the criterion is about *pointer* users who cannot drag.

### 1. Every Drag Interaction Needs a Click Alternative

```html
<!-- Bad - reordering is drag-only -->
<ul id="playlist">
  <li draggable="true">Track one</li>
  <li draggable="true">Track two</li>
</ul>
<!-- A pointer user who cannot drag cannot reorder at all. -->

<!-- Good - drag still works, and buttons do the same job -->
<ul id="playlist">
  <li draggable="true">
    Track one
    <button type="button" aria-label="Move Track one up">↑</button>
    <button type="button" aria-label="Move Track one down">↓</button>
  </li>
  <li draggable="true">
    Track two
    <button type="button" aria-label="Move Track two up">↑</button>
    <button type="button" aria-label="Move Track two down">↓</button>
  </li>
</ul>
```

**Why this matters:**
- Dragging is one of the least accessible pointer interactions there is
- The alternative must reach the *same* outcome, not a degraded one
- Keyboard support does not satisfy this criterion — a mouse user with tremor uses a mouse

### 2. Sliders Need a Non-Dragging Path to Any Value

```html
<!-- Good - native input, clickable track, and steppers -->
<label for="volume">Volume</label>
<input type="range" id="volume" min="0" max="100" step="1" value="50">
<button type="button" aria-label="Decrease volume">−</button>
<button type="button" aria-label="Increase volume">+</button>
```

A native `<input type="range">` already lets a pointer user click anywhere on the track to jump
to that value — no drag required — which satisfies 2.5.7 on its own. A custom
`role="slider"` built on `mousedown` + `mousemove` does not, unless you add click-to-position or
stepper buttons.

```jsx
// Good - custom slider with click-to-position, not drag-only
function Slider({ value, min, max, onChange }) {
  function handleTrackClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onChange(Math.round(min + ratio * (max - min)));
  }

  return (
    <div className="track" onClick={handleTrackClick}>
      <div
        role="slider"
        tabIndex={0}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        onKeyDown={/* arrow keys, Home, End */ undefined}
      />
    </div>
  );
}
```

### 3. Common Drag-Only Patterns and Their Alternatives

| Drag interaction | Single-pointer alternative |
|---|---|
| Reorder a list | Up/down buttons, or a "move to position" menu |
| Kanban card between columns | A "Move to…" menu on the card |
| Resize a split pane | Buttons or a preset-size menu; keyboard arrows do not suffice alone |
| Slider / range | Click on the track, plus stepper buttons |
| File upload drop zone | A visible "Choose files" `<input type="file">` |
| Map pan | Directional buttons, or click-to-centre |
| Colour picker area | Numeric fields for hue, saturation, lightness |
| Signature / drawing canvas | Essential — dragging *is* the function (see below) |

### 4. "Essential" Is Narrow

Dragging is exempt only where the drag itself is the point: freehand drawing, a signature field,
a game whose challenge is the gesture. It is not exempt because the alternative is inconvenient
to build or because the drag "feels better".

```html
<!-- Good - essential exception, correctly claimed -->
<canvas id="signature" aria-label="Draw your signature"></canvas>
<p>Prefer not to draw? <button type="button">Type your name instead</button></p>
<!-- Even where the exception applies, offering a path is better practice. -->
```

### 5. Do Not Confuse 2.5.7 with 2.1.1 or 2.5.1

Three distinct criteria are easy to conflate:

- **2.1.1 Keyboard (A)** — the function works from the keyboard
- **2.5.1 Pointer Gestures (A)** — multipoint and path-based gestures have a single-point alternative
- **2.5.7 Dragging Movements (AA)** — dragging has an alternative that does not require dragging

A drag-to-reorder list with full keyboard support still fails 2.5.7. Satisfy each separately.

## Complete Reorderable List Structure

```html
<h2 id="queue-heading">Playback queue</h2>
<ul aria-labelledby="queue-heading" class="queue">
  <li>
    <span class="drag-handle" draggable="true" aria-hidden="true">⠿</span>
    <span id="item-1-label">Track one</span>
    <button type="button" aria-describedby="item-1-label" aria-label="Move up" data-dir="up">↑</button>
    <button type="button" aria-describedby="item-1-label" aria-label="Move down" data-dir="down">↓</button>
  </li>
</ul>

<div role="status" aria-live="polite" class="visually-hidden" id="queue-status"></div>
```

```js
// Announce the result: a pointer user who clicked "Move up" needs confirmation it worked.
function announce(message) {
  document.getElementById('queue-status').textContent = message;
}
// announce('Track one moved to position 1 of 5');
```

Both paths — drag and buttons — must produce the same state change and the same announcement.

## Examples

### Vue

```vue
<template>
  <li>
    {{ item.title }}
    <button type="button" :aria-label="`Move ${item.title} up`"
            :disabled="index === 0" @click="$emit('move', index, -1)">↑</button>
    <button type="button" :aria-label="`Move ${item.title} down`"
            :disabled="index === last" @click="$emit('move', index, 1)">↓</button>
  </li>
</template>
```

Disable rather than hide the buttons at the ends of the list, so the control count stays stable
and focus is not lost when an item reaches the top.

### Split pane

```html
<div role="separator" tabindex="0" aria-label="Resize sidebar"
     aria-valuenow="30" aria-valuemin="15" aria-valuemax="60"></div>
<button type="button" aria-label="Narrow sidebar">−</button>
<button type="button" aria-label="Widen sidebar">+</button>
```

See [windowsplitter.instructions.md](windowsplitter.instructions.md) for the full separator
pattern; the buttons above are what 2.5.7 adds to it.

## Testing

No automated tool can confirm an alternative exists — this needs a human. What you can check
mechanically is that the alternative controls are present and reachable:

```js
// Assert the non-drag path exists for every reorderable item
const items = page.getByRole('listitem');
for (const item of await items.all()) {
  await expect(item.getByRole('button', { name: /move .* up/i })).toBeVisible();
  await expect(item.getByRole('button', { name: /move .* down/i })).toBeVisible();
}
```

Then verify by hand: complete every drag-driven task using single clicks only, without holding
the button down at any point.

## WCAG References

- **WCAG 2.2 Success Criterion 2.5.7**: Dragging Movements (Level AA) — new in WCAG 2.2
- **WCAG 2.1 Success Criterion 2.5.1**: Pointer Gestures (Level A)
- **WCAG 2.1 Success Criterion 2.1.1**: Keyboard (Level A)
- **WCAG 2.2 Success Criterion 2.5.8**: Target Size (Minimum) (Level AA)

## Implementation Checklist

When any function involves dragging:
- [ ] **Can the same outcome be reached with single clicks, no holding?** (CRITICAL — 2.5.7, Level AA)
- [ ] **Does the alternative reach every state the drag can, not a subset?** (CRITICAL)
- [ ] **Are the alternative controls visible, or revealed without a drag?**
- [ ] **Does the alternative announce its result to a screen reader?**
- [ ] **Is keyboard support present as well?** (separate criterion — 2.1.1)
- [ ] **If claiming "essential", is dragging genuinely the function itself?**
- [ ] **Are the alternative controls themselves at least 24x24?** (2.5.8)

## Quick Reference

| Criterion | Level | Asks for |
|---|---|---|
| 2.1.1 Keyboard | A | Keyboard operation |
| 2.5.1 Pointer Gestures | A | Single-point alternative to path/multipoint gestures |
| 2.5.7 Dragging Movements | AA | No-drag alternative for any dragging function |

| Widget | Minimum alternative |
|---|---|
| Sortable list | Up/down buttons |
| Slider | Click track + steppers |
| Split pane | Widen/narrow buttons |
| Drop zone | File input button |
| Kanban board | "Move to column" menu |
