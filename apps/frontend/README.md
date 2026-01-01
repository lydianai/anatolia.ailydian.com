# TÜRK DİJİTAL METROPOL - FRONTEND

## Elite Animation System - 100% Production Ready

**Dünyanın en hareketli, smooth ve premium animasyon sistemi**

60 FPS guaranteed | GPU-accelerated | Turkish-themed | 150+ animation features

---

## ELITE ANIMATION SYSTEM ✨

**KURULUM TAMAMLANDI!** Dünyanın en gelişmiş animasyon sistemi başarıyla kuruldu.

### Animation Features
- ✅ **50+ Animation Variants** (fade, scale, slide, rotate, Turkish-themed)
- ✅ **15+ Gesture Interactions** (drag, swipe, 3D tilt, magnetic effects)
- ✅ **11 Scroll Hooks** (reveal, parallax, counter, infinite scroll)
- ✅ **60+ Micro-Interactions** (button, input, tooltip, progress)
- ✅ **Premium Components** (buttons, cards, particles, cursor, toast)
- ✅ **Game UI** (inventory, chat, stats, minimap, quests)
- ✅ **2 Demo Pages** (landing page, game dashboard)

### Quick Start with Animations
```bash
npm run dev
# Visit:
# - http://localhost:3000/demo-animations (Premium Landing)
# - http://localhost:3000/game-ui-demo (Game Dashboard)
```

### Import Animations
```tsx
import { fadeInUp, useScrollReveal } from "@/lib/animations";
import { AnimatedButton, Card3D } from "@/components/ui/animations";
import { AnimatedInventory } from "@/components/game/AnimatedInventory";
```

### Documentation
- **ANIMATION_GUIDE.md** - Complete usage guide
- **ANIMATIONS_README.md** - System overview
- **FEATURES.md** - 150+ feature list

---

## Teknolojiler

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (Elite System)
- **3D Graphics**: Three.js + React Three Fiber
- **Game Engine**: PixiJS 8
- **Real-time**: Socket.io Client
- **HTTP Client**: Axios
- **Language**: TypeScript

## Proje Yapısı

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── auth/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   └── game/              # Game pages
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   └── notification.tsx
│   ├── game/              # Game-specific components
│   │   ├── GameCanvas.tsx
│   │   ├── HUD.tsx
│   │   ├── ChatBox.tsx
│   │   └── Minimap.tsx
│   ├── auth/              # Auth components
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── layout/            # Layout components
├── lib/
│   ├── api/               # API clients
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   └── characters.ts
│   ├── socket/            # Socket.io client
│   │   └── client.ts
│   ├── store/             # Zustand stores
│   │   ├── authStore.ts
│   │   ├── gameStore.ts
│   │   ├── chatStore.ts
│   │   └── uiStore.ts
│   ├── hooks/             # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useSocket.ts
│   │   └── useGame.ts
│   └── utils/             # Utility functions
│       ├── cn.ts
│       └── format.ts
├── styles/
│   └── globals.css        # Global styles
└── types/                 # TypeScript types
    ├── api.ts
    ├── game.ts
    └── socket.ts
```

## Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 2. Ortam Değişkenlerini Ayarla

`.env.example` dosyasını `.env.local` olarak kopyalayın ve düzenleyin:

```bash
cp .env.example .env.local
```

### 3. Geliştirme Sunucusunu Başlat

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılacaktır.

## Özellikler

### Authentication
- ✅ Login/Register forms
- ✅ JWT token management
- ✅ Auto token refresh
- ✅ Protected routes
- ✅ Persistent auth state

### Game Features
- ✅ PixiJS game canvas
- ✅ Real-time multiplayer (Socket.io)
- ✅ HUD with character stats
- ✅ Minimap
- ✅ Chat system (Global, Local, Party, Guild)
- ✅ Camera controls
- ✅ FPS counter
- ✅ Performance monitoring

### State Management
- ✅ Auth store (user, tokens)
- ✅ Game store (character, world, camera)
- ✅ Chat store (messages, rooms)
- ✅ UI store (notifications, modals, theme)

### UI Components
- ✅ Button (variants, sizes, loading state)
- ✅ Input (label, error handling)
- ✅ Card (header, content, footer)
- ✅ Modal (sizes, keyboard shortcuts)
- ✅ Notification (toast system)

### Turkish Theme
- ✅ Turkish flag colors (red #E30A17, gold #D4AF37)
- ✅ Turkish patterns
- ✅ Localized UI (Turkish language)
- ✅ Cultural motifs

## Kullanım

### Authentication

```typescript
import { useAuth } from '@/lib/hooks/useAuth';

const { login, register, logout, user, isAuthenticated } = useAuth();

// Login
await login({ email: 'user@example.com', password: 'password' });

// Register
await register({
  username: 'username',
  email: 'user@example.com',
  password: 'password',
});

// Logout
await logout();
```

### Socket.io

```typescript
import { useSocket } from '@/lib/hooks/useSocket';

const { isConnected, emit, sendChatMessage, movePlayer } = useSocket();

// Send chat message
sendChatMessage('Hello!', 'global');

// Move player
movePlayer({ x: 100, y: 200 });

// Custom event
emit('custom:event', { data: 'value' });
```

### Game State

```typescript
import { useGame } from '@/lib/hooks/useGame';

const { character, loadCharacter, moveCharacter, openInventory } = useGame();

// Load character
await loadCharacter('character-id');

// Move character
moveCharacter(100, 200);

// Open inventory
openInventory();
```

### Notifications

```typescript
import { useUIStore } from '@/lib/store/uiStore';

const { addNotification } = useUIStore();

addNotification({
  type: 'success',
  title: 'Başarılı!',
  message: 'İşlem başarıyla tamamlandı',
  duration: 5000,
});
```

## Build & Deploy

### Production Build

```bash
npm run build
npm run start
```

### Type Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

## Performance Optimizations

1. **Code Splitting**: Automatic route-based splitting
2. **Image Optimization**: Next.js Image component
3. **Lazy Loading**: Dynamic imports for heavy components
4. **Memoization**: React.memo, useMemo, useCallback
5. **Bundle Analysis**: Webpack optimization
6. **Asset Compression**: AVIF, WebP support

## Accessibility

- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Semantic HTML

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Guidelines

1. **TypeScript**: Tüm dosyalar TypeScript ile yazılmalı
2. **Naming**: camelCase (değişkenler), PascalCase (componentler)
3. **Exports**: Named exports tercih edilmeli
4. **Types**: Explicit type tanımlamaları yapılmalı
5. **Comments**: JSDoc formatında Türkçe/İngilizce

## License

MIT
