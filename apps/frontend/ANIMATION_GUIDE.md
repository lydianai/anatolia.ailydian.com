# TURKISH DIGITAL METROPOL - ELITE ANIMATION SYSTEM

## Premium Animation Library - Ultra Hareketli ve Smooth

60 FPS garantili, GPU-accelerated, production-ready animasyon sistemi.

---

## 1. ANIMATION LIBRARY

### Framer Motion Variants (50+)

```typescript
import {
  fadeInUp,
  scaleIn,
  slideInLeft,
  crescentReveal,
  staggerContainer,
  EASING,
  SPRING,
} from "@/lib/animations";
```

**Available Variants:**

- **Fade**: fadeIn, fadeOut, fadeInUp, fadeInDown, fadeInLeft, fadeInRight
- **Scale**: scaleIn, scaleOut, scalePop, scaleHover
- **Slide**: slideInLeft, slideInRight, slideInUp, slideInDown
- **Rotate**: rotateIn, rotateScale, spin, spinSlow
- **Turkish**: crescentReveal, ottomanPattern, turkishFlag
- **Modal**: modalBackdrop, modalContent, modalSlide
- **Button**: buttonHover, buttonPulse, buttonGlow
- **Card**: cardHover, card3D, cardFlip
- **Page**: pageTransition, pageFade
- **Loading**: skeletonPulse, spinnerRotate

**Usage Example:**

```tsx
<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content
</motion.div>
```

---

## 2. GESTURE ANIMATIONS

### Drag, Swipe, Pan Interactions

```typescript
import {
  tinderSwipe,
  carouselSwipe,
  create3DTilt,
  createMagneticEffect
} from "@/lib/animations";
```

**Tinder-Like Swipe:**

```tsx
<motion.div {...tinderSwipe({
  onSwipeLeft: () => console.log("Swiped left"),
  onSwipeRight: () => console.log("Swiped right"),
})}>
  Card
</motion.div>
```

**3D Tilt Effect:**

```tsx
<motion.div {...create3DTilt({ max: 15, perspective: 1000 })}>
  Hover me for 3D effect
</motion.div>
```

**Magnetic Button:**

```tsx
<motion.button {...createMagneticEffect(0.5)}>
  Follows cursor
</motion.button>
```

---

## 3. SCROLL ANIMATIONS

### Intersection Observer Hooks

```typescript
import {
  useScrollReveal,
  useCounter,
  useParallax,
  scrollToSection
} from "@/lib/animations";
```

**Reveal on Scroll:**

```tsx
const { ref, isInView } = useScrollReveal({ threshold: 0.5 });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
>
  Appears when scrolled into view
</motion.div>
```

**Counter Animation:**

```tsx
const { ref, count } = useCounter({ end: 10000, duration: 2 });

<div ref={ref}>
  {Math.round(count).toLocaleString()}
</div>
```

**Parallax Effect:**

```tsx
const { ref, offset } = useParallax({ speed: 0.5 });

<div ref={ref} style={{ transform: `translateY(${offset}px)` }}>
  Parallax content
</div>
```

---

## 4. ANIMATED COMPONENTS

### AnimatedButton

```tsx
import { AnimatedButton, TurkishButton } from "@/components/ui/animations";

// Standard button
<AnimatedButton variant="primary" size="lg">
  Click me
</AnimatedButton>

// Turkish-themed with glow
<TurkishButton withRipple>
  Başla
</TurkishButton>

// Loading state
<AnimatedButton loading>
  Yükleniyor...
</AnimatedButton>

// Success state
<AnimatedButton success>
  Başarılı!
</AnimatedButton>
```

**Props:**

- `variant`: primary | secondary | ghost | turkish
- `size`: sm | md | lg
- `loading`: boolean
- `success`: boolean
- `error`: boolean
- `withRipple`: boolean
- `withGlow`: boolean

---

### AnimatedCard

```tsx
import { AnimatedCard, Card3D, CharacterCard } from "@/components/ui/animations";

// 3D tilt card
<Card3D intensity={0.8}>
  <h3>Hover for 3D effect</h3>
</Card3D>

// Glow card
<AnimatedCard variant="glow" glowColor="#dc2626">
  Content
</AnimatedCard>

// Game character card
<CharacterCard
  name="Yeniçeri Savaşçı"
  level={45}
  rarity="legendary"
  image="/character.jpg"
  stats={[
    { label: "Güç", value: 95 },
    { label: "Savunma", value: 85 },
  ]}
/>
```

**Variants:**

- `default`: Simple hover lift
- `3d`: 3D tilt effect on mouse move
- `glow`: Border glow on hover
- `lift`: Lift with shadow

---

### ParticleBackground

```tsx
import { ParticleBackground, TurkishStarField } from "@/components/ui/animations";

// Turkish stars + crescents (2000 particles)
<TurkishStarField />

// Custom particles
<ParticleBackground
  particleCount={1000}
  speed={0.5}
  colors={["#dc2626", "#ef4444"]}
  interactive
/>
```

**GPU-accelerated canvas with:**

- Star, crescent, and dot shapes
- Mouse interaction (particles avoid cursor)
- Connection lines between nearby particles
- Twinkle effect

---

### CustomCursor

```tsx
import { CustomCursor } from "@/components/ui/animations";

// Add to layout
<CustomCursor />
```

**Features:**

- Turkish star default cursor
- Crescent moon on hover
- I-beam on text
- Click ripple effect
- Trailing dots
- Auto-hides on mobile

---

### Loading Animations

```tsx
import {
  CrescentSpinner,
  StarSpinner,
  DotsSpinner,
  PageLoader,
  ProgressBar,
  Skeleton,
} from "@/components/ui/animations";

// Turkish crescent spinner
<CrescentSpinner size={60} color="#dc2626" />

// Star spinner
<StarSpinner size={50} />

// Dots
<DotsSpinner />

// Full page loader
<PageLoader />

// Progress bar
<ProgressBar progress={75} animated />

// Skeleton loader
<Skeleton width="100%" height="2rem" variant="rectangular" />
```

---

### Toast Notifications

```tsx
import { ToastProvider, useToast } from "@/components/ui/animations";

// Wrap app with provider
<ToastProvider>
  <App />
</ToastProvider>

// Use in components
const { success, error, warning, info } = useToast();

success("Başarıyla kaydedildi!");
error("Bir hata oluştu!");
warning("Dikkat! Kontrol edin.");
info("Bilgilendirme");
```

**Features:**

- Auto-dismiss with progress bar
- Stacked notifications
- Animated entry/exit
- Icon animations
- Turkish-themed colors

---

## 5. MICRO-INTERACTIONS

### Button Interactions

```tsx
import { microInteractions } from "@/lib/animations";

<motion.button {...microInteractions.button.ripple}>
  Click for ripple
</motion.button>

<motion.button {...microInteractions.button.glow}>
  Glow on hover
</motion.button>

<motion.button {...microInteractions.button.magnetic}>
  Magnetic effect
</motion.button>
```

### Input Interactions

```tsx
<motion.input {...microInteractions.input.borderGlow} />
<motion.label {...microInteractions.input.labelFloat} />
```

### Icon Animations

```tsx
<motion.svg {...microInteractions.icon.bounce}>
  {/* Icon */}
</motion.svg>

<motion.svg {...microInteractions.icon.heartBeat}>
  {/* Heart icon */}
</motion.svg>
```

---

## 6. PERFORMANCE OPTIMIZATION

### GPU Acceleration

All animations use GPU-accelerated properties:

- `transform` (translateX, translateY, scale, rotate)
- `opacity`
- `filter` (blur)

**Avoid animating:**

- width, height
- top, left, right, bottom
- margin, padding
- background-color (use opacity instead)

### Will-Change

Automatically applied to animated elements. Manual usage:

```css
.animated-element {
  will-change: transform, opacity;
}
```

### Reduce Motion Support

```tsx
import { prefersReducedMotion, getAnimationDuration } from "@/lib/animations";

const duration = getAnimationDuration(500); // Returns 0 if reduced motion
```

### Lazy Loading

```tsx
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/ui/animations/ParticleBackground"),
  { ssr: false }
);
```

---

## 7. PREMIUM LANDING PAGE

Visit `/demo-animations` to see all animations in action:

**Sections:**

1. **Hero**: Particle background, typewriter, gradient text
2. **Stats**: Counter animations
3. **Features**: 3D cards with hover effects
4. **Characters**: Character cards with stagger animation
5. **Loading**: All loading states showcase

---

## 8. QUICK START

### Basic Animation

```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function MyComponent() {
  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      Animated content
    </motion.div>
  );
}
```

### Scroll-Triggered

```tsx
"use client";

import { motion } from "framer-motion";
import { useScrollReveal, fadeInUp } from "@/lib/animations";

export default function MyComponent() {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      Appears on scroll
    </motion.div>
  );
}
```

### Stagger Children

```tsx
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map((item, i) => (
    <motion.div key={i} variants={fadeInUp}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 9. TURKISH-THEMED ANIMATIONS

### Crescent Reveal

```tsx
<motion.div variants={crescentReveal} initial="hidden" animate="visible">
  <svg>{/* Crescent moon */}</svg>
</motion.div>
```

### Ottoman Pattern

```tsx
<motion.div variants={ottomanPattern} initial="hidden" animate="visible">
  Pattern reveal with circular mask
</motion.div>
```

### Turkish Flag Colors

```tsx
const TURKISH_COLORS = {
  red: "#dc2626",
  gold: "#fbbf24",
  white: "#ffffff",
};
```

---

## 10. PRODUCTION CHECKLIST

- [x] 60 FPS guaranteed
- [x] GPU-accelerated transforms
- [x] Reduce motion support
- [x] TypeScript typed
- [x] Mobile-friendly (touch gestures)
- [x] SSR compatible (use "use client")
- [x] Lazy loading support
- [x] Configurable durations
- [x] Turkish-themed presets
- [x] Accessibility (ARIA, keyboard nav)

---

## FILE STRUCTURE

```
src/
├── lib/
│   └── animations/
│       ├── variants.ts              # 50+ Framer Motion variants
│       ├── gestures.ts              # Drag, swipe, pan
│       ├── scroll-animations.ts     # Scroll hooks
│       ├── micro-interactions.ts    # Button, input, UI
│       └── index.ts                 # Central export
└── components/
    └── ui/
        └── animations/
            ├── AnimatedButton.tsx   # Premium buttons
            ├── AnimatedCard.tsx     # 3D cards
            ├── CustomCursor.tsx     # Turkish star cursor
            ├── ParticleBackground.tsx # 2000 particles
            ├── LoadingAnimations.tsx  # Spinners, progress
            ├── Toast.tsx            # Notifications
            └── index.ts             # Component export
```

---

## DEPENDENCIES

```bash
npm install framer-motion
```

**That's it!** All animations are built with Framer Motion + vanilla CSS.

---

## EXAMPLES

See live demo at: `/demo-animations`

**Built with love for Türkiye** 🇹🇷

Elite animation system by Turkish Digital Metropol team.
