# Quick Start Guide - Türk Dijital Metropol Frontend

## Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm
- Backend API running on port 3001 (optional for initial setup)

## Installation

### 1. Navigate to Frontend Directory

```bash
cd /Users/sardag/Desktop/TURK-DIJITAL-METROPOL/apps/frontend
```

### 2. Install Dependencies

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

Or with pnpm:
```bash
pnpm install
```

### 3. Setup Environment Variables

The `.env.local` file is already created with default values:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
NODE_ENV=development
```

If you need to change the API endpoints, edit `.env.local`.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## First-Time Setup

### Without Backend (Frontend Only Development)

The frontend will work in standalone mode, showing:
- ✅ Landing page
- ✅ Login/Register forms (UI only)
- ✅ Game canvas with placeholder graphics
- ⚠️ API calls will fail (expected without backend)

### With Backend

1. Make sure backend is running on port 3001
2. Start frontend: `npm run dev`
3. Navigate to http://localhost:3000
4. Full functionality available

## Quick Navigation

### Pages

- **Landing**: http://localhost:3000
- **Login**: http://localhost:3000/auth/login
- **Register**: http://localhost:3000/auth/register
- **Game**: http://localhost:3000/game (requires auth)

## Testing the Frontend

### 1. Test Landing Page

```bash
# Open browser to:
http://localhost:3000
```

Should see:
- Hero section with Turkish theme
- Feature cards
- CTA buttons
- Stats counter

### 2. Test Login Form

```bash
# Navigate to:
http://localhost:3000/auth/login
```

UI Features:
- Email/password inputs
- Validation
- Error messages
- Loading state

### 3. Test Game Canvas

```bash
# Navigate to:
http://localhost:3000/game
```

You'll see:
- PixiJS canvas with grid
- Placeholder player (red circle with Turkish flag)
- FPS counter
- Ping display
- Minimap
- Chat box (collapsible)
- HUD (when character data available)

## Available Scripts

```bash
# Development
npm run dev          # Start dev server (port 3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Component Showcase

### UI Components

All UI components are in `/src/components/ui/`:

```typescript
// Button
import { Button } from '@/components/ui/button';
<Button variant="default">Click Me</Button>

// Input
import { Input } from '@/components/ui/input';
<Input label="Email" type="email" />

// Card
import { Card, CardHeader, CardContent } from '@/components/ui/card';
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Modal
import { Modal } from '@/components/ui/modal';
<Modal isOpen={true} onClose={() => {}}>Content</Modal>
```

### Game Components

```typescript
// GameCanvas - Main game view
import { GameCanvas } from '@/components/game/GameCanvas';

// HUD - Character stats overlay
import { HUD } from '@/components/game/HUD';

// ChatBox - Multi-room chat
import { ChatBox } from '@/components/game/ChatBox';

// Minimap - Position tracker
import { Minimap } from '@/components/game/Minimap';
```

### Hooks

```typescript
// Authentication
import { useAuth } from '@/lib/hooks/useAuth';
const { login, logout, user } = useAuth();

// Socket.io
import { useSocket } from '@/lib/hooks/useSocket';
const { sendChatMessage, movePlayer } = useSocket();

// Game State
import { useGame } from '@/lib/hooks/useGame';
const { character, loadCharacter } = useGame();
```

### Stores

```typescript
// Auth Store
import { useAuthStore } from '@/lib/store/authStore';
const user = useAuthStore(state => state.user);

// Game Store
import { useGameStore } from '@/lib/store/gameStore';
const character = useGameStore(state => state.currentCharacter);

// Chat Store
import { useChatStore } from '@/lib/store/chatStore';
const messages = useChatStore(state => state.messages);

// UI Store
import { useUIStore } from '@/lib/store/uiStore';
const { addNotification } = useUIStore();
```

## Development Tips

### 1. Hot Reload

Next.js supports Fast Refresh. Any changes to components will auto-reload.

### 2. TypeScript IntelliSense

Use VSCode for best TypeScript experience:
- Auto-completion
- Type checking
- Import suggestions

### 3. Browser DevTools

Useful extensions:
- React Developer Tools
- Redux DevTools (for Zustand)

### 4. Console Logging

Check browser console for:
- Socket connection status
- API errors
- Game events

### 5. Network Tab

Monitor:
- API requests
- WebSocket messages
- Asset loading

## Common Issues & Solutions

### Issue: Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use different port
PORT=3001 npm run dev
```

### Issue: Module Not Found

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript Errors

```bash
# Check types
npm run type-check

# Restart VSCode TypeScript server
# CMD+Shift+P -> "TypeScript: Restart TS Server"
```

### Issue: Styles Not Loading

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Socket Not Connecting

Check:
1. Backend is running
2. NEXT_PUBLIC_WS_URL is correct
3. CORS is enabled on backend
4. Check browser console for errors

## Production Build

### Build

```bash
npm run build
```

Output:
- `.next/` directory with optimized build
- Static assets
- Server code

### Start Production

```bash
npm start
```

Runs on port 3000 by default.

### Environment Variables for Production

Create `.env.production`:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_WS_URL=wss://api.yourdomain.com
NODE_ENV=production
```

## Performance

### Build Size (Expected)

```
First Load JS:
  - Main bundle: ~150kB
  - PixiJS: ~400kB
  - Socket.io: ~30kB
  - Total: ~600kB

Routes:
  - / (Landing): ~200kB
  - /auth/login: ~180kB
  - /game: ~650kB (includes PixiJS)
```

### Lighthouse Scores (Target)

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Deployment Options

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t turk-metropol-frontend .
docker run -p 3000:3000 turk-metropol-frontend
```

### Static Export (if no SSR needed)

Add to `next.config.js`:

```javascript
output: 'export'
```

Then:

```bash
npm run build
# Static files in /out directory
```

## Next Steps

1. ✅ Frontend is running
2. Connect to backend API
3. Test authentication flow
4. Test real-time features
5. Add game assets (sprites, sounds)
6. Customize theme colors
7. Add more game features

## Support

For issues or questions:
1. Check console logs
2. Review network requests
3. Check browser compatibility
4. Verify environment variables

## Useful Commands

```bash
# Check Next.js version
npm list next

# Analyze bundle size
npm run build && npx @next/bundle-analyzer

# Generate TypeScript types
npm run type-check

# Format code (if prettier installed)
npx prettier --write .

# Clean everything
rm -rf node_modules .next package-lock.json
npm install
```

## Success Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed successfully
- [ ] Dev server running on port 3000
- [ ] Landing page loads correctly
- [ ] Login page accessible
- [ ] Game canvas renders
- [ ] No console errors
- [ ] TypeScript has no errors
- [ ] Hot reload working

## Happy Coding!

You're all set to develop the frontend. Start by exploring the components and adding your custom features.

**Frontend Location**: `/Users/sardag/Desktop/TURK-DIJITAL-METROPOL/apps/frontend`

**Main Files**:
- `src/app/page.tsx` - Landing page
- `src/app/game/page.tsx` - Game page
- `src/components/game/GameCanvas.tsx` - PixiJS canvas
- `src/lib/store/` - Zustand stores
- `src/lib/hooks/` - Custom hooks
