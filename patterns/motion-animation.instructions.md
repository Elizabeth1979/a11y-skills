---
description: Instructions for accessible animations and respecting motion preferences
applyTo: '**/*.{html,css,scss,jsx,tsx,vue,svelte}'
---

# Motion and Animation Accessibility

## CRITICAL RULES

**Animations and motion can cause discomfort, nausea, or seizures for some users. Provide controls and respect user preferences.**

### 1. Respect prefers-reduced-motion

Always provide reduced or no animation when users request it.

```css
/* Good - Respect reduced motion preference */
.animated-element {
  transition: transform 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
  }
}

/* Good - Alternative: Subtle fade instead of movement */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: opacity 0.1s ease;
    /* Remove transforms, use simple opacity */
  }
}

/* Good - CSS custom property approach */
:root {
  --animation-duration: 0.3s;
  --transition-duration: 0.2s;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --animation-duration: 0.01ms;
    --transition-duration: 0.01ms;
  }
}

.element {
  transition: transform var(--transition-duration) ease;
  animation: slide-in var(--animation-duration) ease;
}
```

### 2. Auto-Playing Content Must Be Controllable

Any content that moves, blinks, or scrolls automatically must have controls to pause, stop, or hide.

```html
<!-- Good - Video with controls -->
<video controls>
  <source src="video.mp4" type="video/mp4">
</video>

<!-- Good - Carousel with pause button -->
<div class="carousel" role="region" aria-label="Featured products">
  <button aria-label="Pause slideshow" aria-pressed="false">
    Pause
  </button>
  <div class="slides">...</div>
</div>

<!-- Good - Animated banner with pause -->
<div class="banner" role="region" aria-label="Promotional banner">
  <button
    aria-label="Pause animation"
    onclick="toggleAnimation()"
  >
    Pause
  </button>
  <div class="animated-content">...</div>
</div>

<!-- Bad - Auto-playing video without controls -->
<video autoplay loop>
  <source src="background.mp4">
</video>

<!-- Bad - Carousel without pause option -->
<div class="carousel auto-scroll">
  <div class="slides">...</div>  <!-- No way to stop! -->
</div>
```

**Content requiring pause controls:**
- Carousels/slideshows
- Auto-scrolling content
- Animated advertisements
- Video backgrounds
- News tickers
- Any content that updates automatically

### 3. Avoid Content That Flashes

Content that flashes more than 3 times per second can trigger seizures.

```css
/* Bad - Rapid flashing */
@keyframes flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.alert {
  animation: flash 0.2s infinite;  /* 5 flashes/second - DANGEROUS */
}

/* Good - Gentle pulse instead */
@keyframes gentle-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.alert {
  animation: gentle-pulse 2s ease-in-out infinite;  /* Slow, subtle */
}

/* Better - No animation, use color/icon instead */
.alert {
  background-color: #ffebee;
  border-left: 4px solid #d32f2f;
}
```

**Never create content that:**
- Flashes more than 3 times per second
- Has large areas of flashing content
- Uses high-contrast flashing (red/white, black/white)

### 4. Limit Animation Duration and Frequency

Keep animations short and purposeful.

```css
/* Good - Short, purposeful animations */
.button:hover {
  transform: scale(1.05);
  transition: transform 0.15s ease;  /* Quick, subtle */
}

.modal-enter {
  animation: fade-in 0.2s ease;  /* Fast entrance */
}

/* Bad - Long, continuous animations */
.decorative-element {
  animation: spin 60s linear infinite;  /* Never stops! */
}

/* Good - Animation that stops */
.notification {
  animation: slide-in 0.3s ease forwards;  /* Plays once, stops */
}
```

### 5. Provide Animation Controls in UI

Let users control animation beyond system preferences.

```html
<!-- Good - Site-wide animation toggle -->
<button
  aria-pressed="false"
  onclick="toggleAnimations()"
>
  Reduce animations
</button>

<style>
  /* JavaScript adds this class based on user preference */
  .reduce-motion * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
</style>

<!-- Good - Individual element control -->
<div class="animated-chart">
  <button onclick="pauseChart()">Pause animation</button>
  <canvas id="chart"></canvas>
</div>
```

## Implementation Patterns

### CSS Animation with Reduced Motion

```css
/* Define animations normally */
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Apply animations */
.modal {
  animation: slide-in 0.3s ease;
}

/* Reduce motion: use fade instead of slide */
@media (prefers-reduced-motion: reduce) {
  .modal {
    animation: fade-in 0.1s ease;
  }

  /* Or disable completely */
  .decorative-animation {
    animation: none;
  }
}
```

### React with Motion Preferences

```jsx
// Hook to detect reduced motion preference
function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (event) => setReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}

// Component using the hook
function AnimatedCard({ children }) {
  const reducedMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 20,  // No movement if reduced motion
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.1 : 0.3,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// Carousel with pause control
function Carousel({ slides }) {
  const [isPaused, setIsPaused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || reducedMotion) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, reducedMotion, slides.length]);

  return (
    <div role="region" aria-label="Image carousel" aria-roledescription="carousel">
      <button
        aria-pressed={isPaused}
        onClick={() => setIsPaused(!isPaused)}
      >
        {isPaused ? 'Play' : 'Pause'} slideshow
      </button>

      <div aria-live={isPaused ? 'polite' : 'off'}>
        {slides[currentSlide]}
      </div>
    </div>
  );
}
```

### Vue with Motion Preferences

```vue
<template>
  <div>
    <!-- Animation toggle -->
    <button @click="toggleAnimations" :aria-pressed="animationsDisabled">
      {{ animationsDisabled ? 'Enable' : 'Disable' }} animations
    </button>

    <!-- Animated content -->
    <transition :name="transitionName">
      <div v-if="show" class="modal">
        Modal content
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      animationsDisabled: false,
      prefersReducedMotion: false,
    };
  },
  computed: {
    transitionName() {
      if (this.animationsDisabled || this.prefersReducedMotion) {
        return 'fade-instant';
      }
      return 'slide-fade';
    },
  },
  mounted() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion = mediaQuery.matches;

    mediaQuery.addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
    });
  },
  methods: {
    toggleAnimations() {
      this.animationsDisabled = !this.animationsDisabled;
    },
  },
};
</script>

<style>
/* Normal transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* Reduced motion transition */
.fade-instant-enter-active,
.fade-instant-leave-active {
  transition: opacity 0.1s ease;
}

.fade-instant-enter-from,
.fade-instant-leave-to {
  opacity: 0;
}
</style>
```

### Vanilla JavaScript

```javascript
// Check for reduced motion preference
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Listen for changes
function onMotionPreferenceChange(callback) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

// Animation helper that respects preference
function animate(element, keyframes, options) {
  if (prefersReducedMotion()) {
    // Apply end state immediately
    const endState = keyframes[keyframes.length - 1];
    Object.assign(element.style, endState);
    return;
  }

  return element.animate(keyframes, options);
}

// Usage
animate(
  document.querySelector('.modal'),
  [
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0)' },
  ],
  { duration: 300, easing: 'ease-out' }
);
```

## Common Mistakes

### Ignoring prefers-reduced-motion

```css
/* Bad - No reduced motion support */
.element {
  animation: bounce 1s infinite;
}

/* Good - Respects preference */
.element {
  animation: bounce 1s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .element {
    animation: none;
  }
}
```

### Auto-play Without Controls

```html
<!-- Bad -->
<div class="carousel auto-advance">
  <!-- No pause button -->
</div>

<!-- Good -->
<div class="carousel" role="region" aria-label="Product carousel">
  <button aria-label="Pause carousel">Pause</button>
  <!-- Carousel content -->
</div>
```

### Background Video Without Pause

```html
<!-- Bad -->
<video autoplay loop muted class="hero-video">
  <source src="hero.mp4">
</video>

<!-- Good -->
<div class="hero">
  <video autoplay loop muted id="hero-video">
    <source src="hero.mp4">
  </video>
  <button
    aria-label="Pause background video"
    onclick="document.getElementById('hero-video').paused
      ? document.getElementById('hero-video').play()
      : document.getElementById('hero-video').pause()"
  >
    Pause video
  </button>
</div>

<!-- Better - Respect reduced motion -->
<script>
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.getElementById('hero-video').pause();
  }
</script>
```

## WCAG References

- **WCAG 2.1 Success Criterion 2.2.2**: Pause, Stop, Hide (Level A)
- **WCAG 2.1 Success Criterion 2.3.1**: Three Flashes or Below Threshold (Level A)
- **WCAG 2.1 Success Criterion 2.3.3**: Animation from Interactions (Level AAA)

## Implementation Checklist

- [ ] **Does the site respect `prefers-reduced-motion`?**
- [ ] **Can all auto-playing content be paused/stopped?**
- [ ] **Is there no content that flashes more than 3 times per second?**
- [ ] **Are essential animations still functional with reduced motion?**
- [ ] **Do carousels/slideshows have pause controls?**
- [ ] **Are background videos pausable?**
- [ ] **Is there a site-wide animation toggle (optional but recommended)?**

## Quick Reference

```
ANIMATION ACCESSIBILITY RULES:

prefers-reduced-motion:
  @media (prefers-reduced-motion: reduce) {
    * { animation: none; transition: none; }
  }

Auto-playing content MUST have:
  - Pause/stop button
  - Keyboard accessible controls
  - Clear visual indication of playing/paused state

NEVER:
  - Flash content > 3 times per second
  - Auto-play without pause controls
  - Ignore prefers-reduced-motion
  - Use infinite animations without purpose

SAFE ANIMATION PRACTICES:
  - Keep transitions under 0.3s
  - Use opacity/fade instead of movement when possible
  - Make decorative animations skippable
  - Pause carousels on hover/focus
  - Auto-pause for reduced motion users

REQUIRED CONTROLS FOR:
  - Video (autoplay)
  - Carousels/slideshows
  - Animated backgrounds
  - News tickers
  - Any auto-updating content
```
