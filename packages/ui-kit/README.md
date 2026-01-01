# TÜRK DİJİTAL METROPOL - Elite UI Kit

> Premium React Component Library with Turkish Cultural Design System

## Features

- **30+ Premium Components** - Production-ready, fully typed components
- **Turkish Cultural Design** - Ottoman gold, Turkish red, Bosphorus blue color palette
- **Advanced Animations** - Framer Motion powered smooth animations
- **Glassmorphism** - Modern glass effects with backdrop blur
- **3D Hover Effects** - Interactive 3D tilt and parallax effects
- **Dark Mode Support** - Seamless dark/light theme switching
- **Accessibility** - WCAG 2.1 AAA compliant
- **TypeScript** - Full type safety with strict mode
- **Tree Shakeable** - Import only what you need
- **Zero Runtime CSS** - Optimized with Tailwind CSS

## Installation

```bash
npm install @turk-dijital-metropol/ui-kit
# or
yarn add @turk-dijital-metropol/ui-kit
# or
pnpm add @turk-dijital-metropol/ui-kit
```

## Quick Start

```tsx
import { Button, Card, Input } from '@turk-dijital-metropol/ui-kit';
import { theme } from '@turk-dijital-metropol/ui-kit/theme';

function App() {
  return (
    <Card variant="glass" hover3d>
      <h2>Hoş Geldiniz</h2>
      <Input label="İsim" variant="default" />
      <Button variant="ottoman" size="lg">
        Giriş Yap
      </Button>
    </Card>
  );
}
```

## Components

### Button
12 variants with ripple effects and loading states

```tsx
<Button variant="ottoman" size="lg" loading ripple>
  Osmanlı Butonu
</Button>

<Button variant="turkish" leftIcon={<Star />}>
  Türk Bayrağı
</Button>

<Button variant="glass">
  Glassmorphism
</Button>
```

**Variants:** ottoman, turkish, bosphorus, tulip, cini, glass, outline, ghost, mesh, sunset, dark, light

### Card
Glassmorphic cards with 3D hover and Turkish patterns

```tsx
<Card variant="glass" hover3d pattern="cini" glow>
  <CardHeader>
    <CardTitle>Premium Kart</CardTitle>
    <CardDescription>Çini deseni ile</CardDescription>
  </CardHeader>
  <CardContent>
    İçerik buraya
  </CardContent>
</Card>
```

**Variants:** glass, solid, ottoman, cini, gradient, outline, elevated

**Patterns:** cini, geometric, tulip, none

### Input
Floating labels with validation and animations

```tsx
<Input
  label="E-posta"
  type="email"
  variant="default"
  floatingLabel
  error="Geçersiz e-posta"
/>

<Textarea
  label="Mesaj"
  variant="bosphorus"
  rows={5}
/>
```

### Modal
Stack system with backdrop blur

```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Başlık"
  variant="glass"
  size="lg"
>
  Modal içeriği
</Modal>
```

### Toast
Auto-dismiss notifications

```tsx
import { useToast } from '@turk-dijital-metropol/ui-kit/hooks';

const { toast } = useToast();

toast({
  type: 'success',
  title: 'Başarılı!',
  message: 'İşlem tamamlandı',
  duration: 5000,
});
```

### Avatar
Status indicators with pulse animations

```tsx
<Avatar
  src="/avatar.jpg"
  fallback="AB"
  status="online"
  variant="ottoman"
  ring
  pulse
/>

<AvatarGroup max={5}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
</AvatarGroup>
```

## Theme System

### Colors

```tsx
import { colors } from '@turk-dijital-metropol/ui-kit/theme';

// Ottoman Gold
colors.ottoman[500] // #D4AF37

// Turkish Red
colors.turkish[500] // #E30A17

// Bosphorus Blue
colors.bosphorus[500] // #0097D7

// Tulip Pink
colors.tulip[500] // #FF6B9D

// Cini Turquoise
colors.cini[500] // #40E0D0
```

### Typography

```tsx
import { typography, turkishText } from '@turk-dijital-metropol/ui-kit/theme';

// Turkish text utilities
turkishText.toUpperCase('istanbul') // İSTANBUL
turkishText.toLowerCase('İSTANBUL') // istanbul
turkishText.toTitleCase('türk dijital metropol') // Türk Dijital Metropol
```

### Gradients

```tsx
import { gradients } from '@turk-dijital-metropol/ui-kit/theme';

// Turkish Sunset
gradients.sunset

// Bosphorus Waters
gradients.bosphorus

// Ottoman Gold Shine
gradients.ottoman
```

## Animations

### Framer Motion Variants

```tsx
import {
  fadeInUp,
  scaleIn,
  springBounce,
  float,
  shimmer
} from '@turk-dijital-metropol/ui-kit/animations';

<motion.div variants={fadeInUp}>
  Animasyonlu içerik
</motion.div>
```

### Available Animations
- fadeInUp, fadeInDown, fadeInLeft, fadeInRight
- scaleIn, scaleOut
- rotateIn
- slideInUp, slideInDown
- staggerChildren
- springBounce (Turkish playfulness)
- elasticScale (Ottoman elegance)
- waveMotion (Bosphorus waves)
- shimmer (Gold shine)
- float, pulse
- starSpin (Ay-yıldız)

## Turkish Patterns

### SVG Patterns

```tsx
import { PatternBackground } from '@turk-dijital-metropol/ui-kit/patterns';

<PatternBackground pattern="cini" color="#40E0D0" opacity={0.1}>
  <div>İçerik</div>
</PatternBackground>
```

**Available Patterns:**
- `cini` - Iznik tile patterns
- `geometric` - Islamic geometry
- `tulip` - Ottoman tulip (lale)
- `star` - Star & crescent (ay-yıldız)
- `waves` - Bosphorus waves
- `calligraphy` - Turkish calligraphy
- `nazar` - Nazar boncuğu (evil eye)

## Utilities

### Class Name Helper

```tsx
import { cn } from '@turk-dijital-metropol/ui-kit';

cn('px-4 py-2', 'bg-blue-500', { 'text-white': true })
// => 'px-4 py-2 bg-blue-500 text-white'
```

## Design Principles

1. **Turkish Cultural Heritage** - Every design element reflects Turkish culture
2. **Premium Quality** - Apple-level polish and attention to detail
3. **Performance First** - Optimized for 60 FPS animations
4. **Accessibility** - WCAG 2.1 AAA compliance
5. **Developer Experience** - TypeScript, great docs, easy to use

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please read our contributing guidelines.

## License

MIT License - see LICENSE file for details

## Credits

Created with love for Turkey 🇹🇷

- Design System: Inspired by Apple, Spotify, Discord
- Cultural Elements: Ottoman Empire, Turkish Flag, Bosphorus
- Technology: React 19, Framer Motion, Tailwind CSS, TypeScript
