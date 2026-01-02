---
description: Instructions for proper image accessibility and alt text implementation
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# Image Labeling and Accessibility

Always provide appropriate text alternatives for images to ensure content is accessible to users who cannot see images (screen reader users, users with images disabled, etc.).

## Core Rules

### 1. Always Include Alt Text for Content Images

Every `<img>` element MUST have an `alt` attribute. The content should be:
- **Human-readable and descriptive**
- **Convey the purpose or content** of the image
- **Concise** (typically under 125 characters)
- **Contextually appropriate** to the surrounding content

### 2. Decorative Images

Images that serve only a decorative purpose (not conveying information) should have an **empty alt attribute**:
- Use `alt=""` (not omitting the attribute entirely)
- This tells screen readers to skip the image

### 3. SVG Images

For SVG images, use **`aria-label`** instead of `alt`:
- The `alt` attribute is not valid on SVG elements
- Use `aria-label` for the accessible name
- Consider adding `role="img"` to the SVG element
- For complex SVGs, use `<title>` and `<desc>` elements inside the SVG

### 4. Background Images (CSS)

Background images added via CSS cannot have alt text:
- If the background image is decorative, no action needed
- If the background image conveys information, add an `aria-label` or visually hidden text to the container
- Alternatively, use an `<img>` tag instead when the image is content, not decoration

## Examples

### ✅ Good: Content Image with Descriptive Alt Text

```html
<!-- HTML -->
<img src="mountain-sunset.jpg" alt="Sunset over snow-capped mountains with orange and pink sky">
```

```jsx
<!-- React/JSX -->
<img src={profilePic} alt="Sarah Johnson, Senior Developer" />
```

### ✅ Good: Decorative Image with Empty Alt

```html
<!-- Decorative border image -->
<img src="decorative-flourish.png" alt="">
```

```jsx
<!-- React decorative icon next to text -->
<div>
  <img src="star-icon.svg" alt="" />
  <span>Featured Item</span>
</div>
```

### ✅ Good: SVG with aria-label

```html
<!-- Inline SVG -->
<svg aria-label="Download icon" role="img" width="24" height="24">
  <path d="M12 2L12 14M12 14L8 10M12 14L16 10M4 18L20 18"/>
</svg>
```

```jsx
<!-- React SVG component -->
<svg aria-label="User profile menu" role="img" viewBox="0 0 24 24">
  <circle cx="12" cy="8" r="4"/>
  <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
</svg>
```

### ✅ Good: SVG with title and desc

```html
<!-- Complex SVG with detailed description -->
<svg role="img" viewBox="0 0 200 200">
  <title>Company Sales Chart</title>
  <desc>Bar chart showing monthly sales from January to December, with highest sales in July at $50,000</desc>
  <!-- chart elements -->
</svg>
```

### ✅ Good: Background Image with Accessible Alternative

```html
<!-- CSS background image with aria-label on container -->
<div 
  class="hero-banner" 
  style="background-image: url('team-photo.jpg')" 
  role="img"
  aria-label="Our development team collaborating in the office">
  <h1>Meet Our Team</h1>
</div>
```

### ❌ Bad: Missing Alt Attribute

```html
<!-- NEVER do this -->
<img src="important-chart.png">
```

### ❌ Bad: Non-Descriptive Alt Text

```html
<!-- Too vague -->
<img src="chart.png" alt="chart">
<img src="photo.jpg" alt="image">
<img src="diagram.png" alt="picture">
```

### ❌ Bad: Alt Text on SVG

```html
<!-- alt doesn't work on SVG -->
<svg alt="Download icon">
  <!-- svg content -->
</svg>
```

### ❌ Bad: Decorative Image with Descriptive Alt

```html
<!-- Decorative flourish doesn't need description -->
<img src="decorative-line.png" alt="decorative horizontal line with curves">
<!-- Should be: -->
<img src="decorative-line.png" alt="">
```

## Special Cases

### Images in Links or Buttons

When an image is the only content in a link or button, the alt text should describe the **action**, not just the image:

```html
<!-- ✅ Good -->
<a href="/home">
  <img src="logo.png" alt="Go to homepage">
</a>

<button>
  <img src="close-icon.svg" alt="Close dialog">
</button>

<!-- ❌ Bad -->
<a href="/home">
  <img src="logo.png" alt="Company logo">
</a>
```

### Images with Adjacent Text

If text adjacent to the image conveys the same information, consider if the image is decorative:

```html
<!-- The text already says "Download", so icon is decorative -->
<a href="/download">
  <img src="download-icon.svg" alt="">
  Download Report
</a>
```

### Complex Images (Charts, Diagrams, Infographics)

For complex images, provide:
1. Short alt text summarizing the purpose
2. Long description either in the page content or linked separately

```html
<img 
  src="sales-chart.png" 
  alt="Annual sales data 2023-2024"
  aria-describedby="chart-description">
<div id="chart-description">
  Detailed description: Sales increased from $2M in Q1 2023 to $5M in Q4 2024...
</div>
```

## WCAG References

- **WCAG 2.1 Success Criterion 1.1.1**: Non-text Content (Level A)
- **WCAG 2.1 Success Criterion 1.4.5**: Images of Text (Level AA)

## Implementation Checklist

When generating code with images:
- [ ] Does every `<img>` have an `alt` attribute?
- [ ] Is the alt text descriptive and meaningful?
- [ ] Are decorative images using `alt=""`?
- [ ] Are SVGs using `aria-label` or `<title>`/`<desc>`?
- [ ] Do image links describe the action, not just the image?
- [ ] Are background images either decorative or have accessible alternatives?
- [ ] Is the alt text concise (under 125 characters when possible)?
