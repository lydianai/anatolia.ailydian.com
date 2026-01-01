# TURK DIJITAL METROPOL - Header Quick Start

## 5 Dakikada Gaming Header Entegrasyonu

### 1. Dosya Konumlari

```
/apps/frontend/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.tsx                    ✅ ELITE Gaming Header
│   │       └── NAVBAR_COMPONENT_GUIDE.md     📖 Component Guide
│   ├── lib/
│   │   └── mock/
│   │       └── headerData.ts                 📊 Mock Data
│   └── types/
│       └── navbar.types.ts                   🔧 TypeScript Types
├── GAMING_HEADER_README.md                   📚 Full Documentation
└── QUICK_START_HEADER.md                     ⚡ This file
```

---

## 2. Hizli Kullanim

### Layout'a Ekle (app/layout.tsx)
```tsx
import { Navbar } from '@/components/layout/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main className="pt-[73px]"> {/* Header yuksekligi + XP bar */}
          {children}
        </main>
      </body>
    </html>
  );
}
```

**Not:** `pt-[73px]` = Header (72px) + XP bar (1px)

---

## 3. Mock Data'yi Real API ile Degistir

### Option A: User Context
```tsx
// context/UserContext.tsx
import { createContext, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fetch user data from API
  useEffect(() => {
    fetch('/api/user/me')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

// In Navbar.tsx:
// Replace mockUser with:
const { user } = useContext(UserContext);
```

### Option B: Props
```tsx
// Pass user data as props
<Navbar user={currentUser} />

// Update Navbar.tsx interface:
interface NavbarProps {
  user?: User;
}

export function Navbar({ user = mockUser }: NavbarProps) {
  // Use user prop instead of mockUser
}
```

---

## 4. Notifications WebSocket Entegrasyonu

```tsx
// hooks/useNotifications.ts
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('ws://your-server.com');

    socket.on('notification', (newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  return notifications;
}

// In Navbar.tsx:
const notifications = useNotifications();
```

---

## 5. Chat Integration

```tsx
// hooks/useChat.ts
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export function useChat(room: 'Global' | 'Guild' | 'Mesaj') {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io('ws://your-server.com');

    socket.emit('join_room', room);

    socket.on('message', (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socket.emit('leave_room', room);
      socket.disconnect();
    };
  }, [room]);

  return messages;
}
```

---

## 6. Search Autocomplete

```tsx
// In Navbar.tsx, add search handler:
const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);

// Debounced search
useEffect(() => {
  const timer = setTimeout(() => {
    if (searchQuery.length > 2) {
      fetch(`/api/search?q=${searchQuery}`)
        .then(res => res.json())
        .then(data => setSearchResults(data));
    }
  }, 300);

  return () => clearTimeout(timer);
}, [searchQuery]);

// In search input:
<input
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Karakter, yer, oge ara..."
/>

// Show results:
{searchResults.length > 0 && (
  <div className="autocomplete-dropdown">
    {searchResults.map(result => (
      <Link key={result.id} href={result.url}>
        {result.title}
      </Link>
    ))}
  </div>
)}
```

---

## 7. XP Bar Real-Time Update

```tsx
// In Navbar.tsx:
const [userXP, setUserXP] = useState(mockUser.xp);

// Listen for XP changes
useEffect(() => {
  const socket = io('ws://your-server.com');

  socket.on('xp_gained', (data) => {
    setUserXP(prev => prev + data.amount);
    // Show toast notification
    toast.success(`+${data.amount} XP!`);
  });

  return () => socket.disconnect();
}, []);

// Calculate percentage
const xpPercentage = getXPPercentage(userXP, mockUser.xpNext);
```

---

## 8. Responsive Testing

### Desktop (1920px)
```bash
# Chrome DevTools
Responsive Design Mode → 1920x1080
```

### Tablet (768px)
```bash
# Chrome DevTools
iPad → 768x1024
```

### Mobile (375px)
```bash
# Chrome DevTools
iPhone 12 Pro → 390x844
```

---

## 9. Performance Optimization

### Lazy Load Icons
```tsx
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/layout/Navbar'), {
  ssr: true, // Keep SSR for SEO
  loading: () => <HeaderSkeleton />
});
```

### Memoize Expensive Calculations
```tsx
const xpPercentage = useMemo(
  () => getXPPercentage(mockUser.xp, mockUser.xpNext),
  [mockUser.xp, mockUser.xpNext]
);
```

### Debounce Search
```tsx
import { debounce } from 'lodash';

const debouncedSearch = useMemo(
  () => debounce((query) => {
    // API call
  }, 300),
  []
);
```

---

## 10. Tema Ozellestirme

### Renkleri Degistir
```tsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'gold': '#D4AF37',      // Primary gold
        'turkish-red': '#E30A17', // Accent red
        // Add your brand colors
      }
    }
  }
}
```

### Fontu Degistir
```tsx
// In <style> tag at bottom of Navbar.tsx:
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');

// Then replace:
fontFamily: "'Orbitron', sans-serif"
// with:
fontFamily: "'YourFont', sans-serif"
```

---

## 11. Route Configuration

### Sayfalar Olustur
```
/app/
├── characters/page.tsx      # Karakterler
├── world/page.tsx           # Dunya
├── features/page.tsx        # Ozellikler
├── how-to-play/page.tsx     # Nasil Oynanir
├── community/page.tsx       # Topluluk
├── about/page.tsx           # Hakkinda
├── game/page.tsx            # Ana oyun (OYUNA GIR button)
├── chat/page.tsx            # Sohbet
├── notifications/page.tsx   # Bildirimler
└── profile/
    ├── characters/page.tsx  # Karakterlerim
    ├── achievements/page.tsx # Basarimlarim
    ├── inventory/page.tsx   # Envanterim
    └── settings/page.tsx    # Ayarlar
```

---

## 12. Authentication Integration

### Protected Routes
```tsx
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth_token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/game/:path*', '/profile/:path*']
};
```

### Login/Logout
```tsx
// Profile dropdown logout button:
<Link href="/api/auth/logout">
  <motion.div onClick={handleLogout}>
    <LogOut className="w-4 h-4" />
    <span>Cikis Yap</span>
  </motion.div>
</Link>

const handleLogout = async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  router.push('/auth/login');
};
```

---

## 13. Analytics Tracking

```tsx
// In Navbar.tsx:
import { trackEvent } from '@/lib/analytics';

// Track logo click
onClick={() => {
  scrollToTop();
  trackEvent('header', 'logo_click');
}}

// Track navigation
<Link href={link.href} onClick={() => {
  trackEvent('header', 'nav_click', link.label);
}}>

// Track CTA
onClick={() => {
  trackEvent('header', 'cta_click', 'oyuna_gir');
}}
```

---

## 14. Error Handling

```tsx
// Error boundary for Navbar
export function NavbarErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallback={<NavbarFallback />}
      onError={(error) => {
        console.error('Navbar error:', error);
        // Send to error tracking service
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

function NavbarFallback() {
  return (
    <div className="h-[72px] bg-black flex items-center justify-center">
      <span className="text-white">Header yuklenemedi</span>
    </div>
  );
}
```

---

## 15. Testing

### Unit Tests (Jest + React Testing Library)
```tsx
// __tests__/Navbar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@/components/layout/Navbar';

test('logo click scrolls to top', () => {
  render(<Navbar />);
  const logo = screen.getByLabelText('Ana sayfaya git');
  fireEvent.click(logo);
  expect(window.scrollY).toBe(0);
});

test('search bar opens on search button click', () => {
  render(<Navbar />);
  const searchButton = screen.getByLabelText('Arama');
  fireEvent.click(searchButton);
  expect(screen.getByPlaceholderText('Karakter, yer, oge ara...')).toBeInTheDocument();
});
```

---

## 16. Deployment Checklist

- [ ] Environment variables set (API URLs, WebSocket URLs)
- [ ] Fonts loaded (Orbitron from Google Fonts)
- [ ] Icons loaded (Lucide React)
- [ ] Mock data replaced with real API
- [ ] Authentication integrated
- [ ] WebSocket connections configured
- [ ] Analytics tracking enabled
- [ ] Error boundaries added
- [ ] Performance optimized
- [ ] Responsive tested on all devices
- [ ] Accessibility tested (WCAG AAA)
- [ ] SEO meta tags added
- [ ] Build succeeds without errors
- [ ] Lighthouse score > 90

---

## 17. Troubleshooting

### "Cannot find module '@/lib/mock/headerData'"
```bash
# Check tsconfig.json paths:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### "Framer Motion animations not working"
```bash
npm install framer-motion@latest
# or
yarn add framer-motion@latest
```

### "Lucide icons not showing"
```bash
npm install lucide-react@latest
# or
yarn add lucide-react@latest
```

### "Orbitron font not loading"
```tsx
// Check if Google Fonts import is in <style> tag:
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;800;900&display=swap');
```

---

## 18. Support

### Documentation
- Main README: `/GAMING_HEADER_README.md`
- Component Guide: `/src/components/layout/NAVBAR_COMPONENT_GUIDE.md`
- Type Definitions: `/src/types/navbar.types.ts`

### Contact
- Email: dev@turkdijitalmetropol.com
- Discord: [Community Server]
- GitHub Issues: [Repository Issues]

---

## 19. Changelog

### v1.0.0 (2025-12-31)
- ✅ Initial release
- ✅ Gaming-style header
- ✅ XP progress bar
- ✅ Profile dropdown
- ✅ Chat dropdown
- ✅ Notifications dropdown
- ✅ Mobile sidebar
- ✅ Search bar
- ✅ Turkish theme
- ✅ Full TypeScript support
- ✅ Accessibility (WCAG AAA)
- ✅ Responsive design
- ✅ Framer Motion animations

---

## 20. Next Steps

1. **Replace mock data** with real API calls
2. **Integrate WebSocket** for real-time updates
3. **Add authentication** flow
4. **Configure routes** for all pages
5. **Test on all devices** and browsers
6. **Deploy to production**
7. **Monitor performance** with analytics
8. **Gather user feedback**
9. **Iterate and improve**

---

**BASARILI BIR HEADER ICIN HAZIRSINIZ!**

Herhangi bir sorunuz varsa dokumentasyona bakin veya destek ekibimizle iletisime gecin.

---

**Version:** 1.0.0
**Created:** 2025-12-31
**Author:** Elite UI/UX Team
