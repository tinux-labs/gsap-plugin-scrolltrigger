# ScrollTrigger + Lenis Integration

This guide shows how to integrate GSAP's ScrollTrigger with Lenis to create 
smooth scroll-based animations.

## Installation

Install GSAP and ScrollTrigger via npm:

```bash
bun add gsap lenis
```

## Basic Setup with Lenis

Lenis provides smooth scrolling behavior, and we can sync it with GSAP's 
ScrollTrigger to ensure scroll-based animations behave correctly.

### Example

```js
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis with smooth easing
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false
});

// Sync Lenis scroll with ScrollTrigger updates
lenis.on("scroll", ScrollTrigger.update);

// Use GSAP's ticker to animate Lenis
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert seconds to milliseconds
});

// Disable GSAP's lag smoothing to avoid animation delay
gsap.ticker.lagSmoothing(0);
```

## ScrollTrigger Example

Here's a basic ScrollTrigger animation tied to scroll position:

```js
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
    end: "top 30%",
    scrub: true,
    markers: true
  },
  x: 300,
  rotation: 360,
  duration: 2
});
```

- `scrub: true` links animation progress to scroll.
- `markers: true` adds visual markers for debugging.

## Tips

- Make sure your `body` and `html` are not blocking scroll (e.g., no fixed height).
- Always call `ScrollTrigger.refresh()` if layout changes dynamically.
