# TURK DIJITAL METROPOL - Elite Gaming Header

## RPG/MMO Style Premium Navbar

Oyun temalı, benzersiz, ultra-premium header tasarımı. Türk kültürü ve modern gaming estetiği birleşimi.

---

## Dosya Konumları

### Ana Dosyalar
```
/apps/frontend/src/components/layout/Navbar.tsx
/apps/frontend/src/lib/mock/headerData.ts
```

---

## Özellikler

### 1. LOGO AREA (Sol)
- **Turkish Flag Icon**: Kırmızı-gold gradient arka plan
- **Orbitron Font**: Gaming-style premium font
- **Pulse Animation**: Sürekli parlama efekti
- **Click Action**: Scroll to top (smooth)
- **Responsive**: Mobile'da logo sadece icon

### 2. NAVIGATION LINKS (Orta)
**Mevcut Linkler:**
- Karakterler (Users icon)
- Dünya (Map icon)
- Özellikler (Sparkles icon)
- Nasıl Oynanır (BookOpen icon)
- Topluluk (MessageSquare icon)
- Hakkında (Info icon)

**Özellikler:**
- Active state: Gold renk + bottom border
- Hover: Scale 1.05 + glow effect
- Gaming tab tasarımı
- Icon + Text kombinasyonu

### 3. ACTION BUTTONS (Sağ)

#### Search Button
- Expandable search bar
- ESC ile kapanır
- Autocomplete hazır
- Glassmorphism input

#### Profile Dropdown
**Header:**
- User avatar (gradient circle)
- Username + Level badge
- XP progress bar (animated)

**Menu Items:**
- Karakterlerim (Shield)
- Başarımlarım (Trophy) + "3 yeni" badge
- Envanterim (Backpack)
- Ayarlar (Settings)
- Çıkış Yap (LogOut)

**Animasyon:**
- Slide down (200ms)
- Click outside to close
- ESC key support

#### Chat Dropdown
**Features:**
- Unread badge (blue gradient)
- Last 5 messages preview
- Avatar circles (gradient)
- Room tags (Global/Guild/Mesaj)
- "Tümünü Gör" footer button

**Badge:**
- Blue gradient badge
- 9+ max display
- Pulse animation

#### Notifications Dropdown
**Features:**
- Unread count badge (red gradient)
- Icon emoji for each type
- Unread indicator (red dot)
- "Tümünü Okundu İşaretle" button
- Scrollable list

**Notification Types:**
- Quest (🎯)
- Friend (👥)
- Event (🎲)
- Achievement (🏆)
- System (⚙️)
- Guild (🛡️)

#### Primary CTA: OYUNA GIR
- Gold gradient background
- Shimmer animation (infinite)
- Gamepad2 + Zap icons
- Box shadow pulse
- Scale 1.1 on hover
- Routes to /game

### 4. XP PROGRESS BAR
**Konum:** Header altında (72px top)
**Features:**
- 1px height, full width
- Gold to red gradient
- Animated fill (1s ease-out)
- Glow effect (shadow)
- Shows: currentXP / nextLevelXP
- Tooltip ready

### 5. MOBILE SIDEBAR
**Trigger:** Hamburger button (< 1024px)

**Layout:**
- Slide from right (300ms spring)
- 320px width
- Turkish pattern background
- Black backdrop (blur)

**Sections:**
1. **Header:** Logo + Close button
2. **User Info:** Avatar, name, level, XP bar
3. **Navigation:** Full menu list
4. **Quick Access:** Chat + Notifications (with badges)
5. **CTA:** OYUNA GIR button

---

## Tasarım Özellikleri

### Renk Paleti
```css
Primary Gold: #D4AF37
Light Gold: #FFD700
Turkish Red: #E30A17
Deep Black: #1a1a1a
Glass BG: rgba(0,0,0,0.3)
```

### Typography
```css
Logo: 'Orbitron', sans-serif (800 weight)
Links: 'Inter', sans-serif (600 weight)
Logo Size: 24px
Link Size: 14px
```

### Dimensions
```css
Header Height: 72px
XP Bar Height: 1px (positioned at top: 72px)
Profile Dropdown: 256px width
Chat Dropdown: 320px width
Notifications Dropdown: 384px width
Mobile Sidebar: 320px width
```

### z-index Hierarchy
```css
Header: 50
XP Bar: 50
Dropdowns: 51 (relative to header)
Mobile Backdrop: 40
Mobile Sidebar: 50
```

### Animations

#### Logo Pulse
```javascript
boxShadow: [
  '0 0 20px rgba(212, 175, 55, 0.5)',
  '0 0 40px rgba(212, 175, 55, 0.8)',
  '0 0 20px rgba(212, 175, 55, 0.5)'
]
duration: 2s, repeat: Infinity
```

#### XP Bar Fill
```javascript
initial: scaleX(0)
animate: scaleX(xpPercentage / 100)
duration: 1s, ease: 'easeOut'
```

#### Shimmer (CTA Button)
```css
@keyframes shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

#### Dropdown Slide
```javascript
initial: { opacity: 0, y: -10, scale: 0.95 }
animate: { opacity: 1, y: 0, scale: 1 }
duration: 200ms
```

#### Badge Pulse
```javascript
animate: { scale: [1, 1.2, 1] }
duration: 2s, repeat: Infinity
```

---

## Mock Data

### User
```typescript
{
  username: "AhmetYilmaz",
  level: 25,
  avatar: "/avatars/default.png",
  xp: 8450,
  xpNext: 10000,
  guildName: "Turkuaz Savascilar",
  title: "Istanbul Kahramani"
}
```

### Notifications (7 items)
- 4 unread, 3 read
- Types: quest, friend, event, achievement, system, guild

### Chat Messages (5 items)
- 2 unread (Global, Guild)
- Rooms: Global, Guild, Mesaj

---

## Klavye Kısayolları

| Tuş | Aksiyon |
|-----|---------|
| ESC | Tüm dropdown'ları kapat |
| ESC | Search bar'ı kapat |
| ESC | Mobile sidebar'ı kapat |
| Tab | Keyboard navigation (accessible) |
| Enter | Activate focused element |

---

## Responsive Breakpoints

### Desktop (>= 1024px)
- Full navigation visible
- All action buttons visible
- Dropdowns enabled

### Tablet (768px - 1023px)
- Navigation hidden
- Hamburger visible
- Icons only (no text) for actions
- Profile shows only icon

### Mobile (< 768px)
- Logo compact (icon only)
- All actions as icons
- Mobile sidebar for navigation

---

## Erişilebilirlik (A11y)

### ARIA Labels
```jsx
aria-label="Ana sayfaya git" (Logo)
aria-label="Arama" (Search button)
aria-label="Profil menusu" (Profile)
aria-label="Sohbet" (Chat)
aria-label="Bildirimler" (Notifications)
aria-label="Menu" (Hamburger)
```

### Keyboard Support
- All interactive elements focusable
- Visual focus indicators
- Escape key support
- Click outside to close

### Color Contrast
- AAA standard compliance
- Gold (#D4AF37) on black: 8.5:1
- White on black: 21:1

---

## Performans Optimizasyonları

### Framer Motion
- `will-change: transform` on animated elements
- Hardware-accelerated animations
- Layout animations for smooth transitions

### React
- useRef for dropdown refs (avoid re-renders)
- Memoized calculations (XP percentage)
- Event listener cleanup in useEffect

### CSS
- backdrop-blur-lg (GPU accelerated)
- Sticky positioning (better than fixed)
- Minimal re-paints

---

## Kullanım Örnekleri

### Logo Click
```jsx
onClick={scrollToTop}
// Smoothly scrolls to top of page
```

### Search Toggle
```jsx
onClick={() => setSearchOpen(!searchOpen)}
// Opens/closes expandable search bar
```

### Profile Menu
```jsx
onClick={() => {
  setProfileOpen(!profileOpen);
  setChatOpen(false);
  setNotificationsOpen(false);
}}
// Mutually exclusive dropdowns
```

---

## Gelecek Özellikler (v2)

### Planlanan
- [ ] Real-time notification websocket
- [ ] Chat integration with Socket.IO
- [ ] Voice chat indicator
- [ ] Friend online status
- [ ] Guild member count
- [ ] Daily quest tracker in profile
- [ ] Achievement popups
- [ ] Level-up animation
- [ ] Season pass progress bar
- [ ] Premium membership badge

### İyileştirmeler
- [ ] Search autocomplete with API
- [ ] Recent searches cache
- [ ] Notification categories filter
- [ ] Chat room switcher
- [ ] Emoji picker for chat
- [ ] GIF support in messages
- [ ] Voice message preview
- [ ] Video call button
- [ ] Screen share icon

---

## Kullanılan Teknolojiler

- **React 18**: Hooks, refs, effects
- **Next.js 14**: App router, Link, usePathname
- **TypeScript**: Full type safety
- **Framer Motion**: Animations, transitions
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library (30+ icons)
- **Google Fonts**: Orbitron (gaming font)

---

## Sorun Giderme

### Dropdown açılmıyor
- Check refs are properly assigned
- Verify click handlers
- Console.log state changes

### Animasyonlar yavaş
- Check device performance
- Reduce motion in OS settings
- Disable backdrop-blur if needed

### Badge sayıları görünmüyor
- Verify mock data import
- Check helper functions
- Console.log counts

### Mobile sidebar takılıyor
- Check spring stiffness (300)
- Verify z-index hierarchy
- Test on different devices

---

## Geliştirici Notları

### State Management
```typescript
// Dropdown states (mutually exclusive)
const [profileOpen, setProfileOpen] = useState(false);
const [chatOpen, setChatOpen] = useState(false);
const [notificationsOpen, setNotificationsOpen] = useState(false);
```

### Click Outside Pattern
```typescript
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

### Framer Motion Patterns
```typescript
// Hover scale
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}

// Infinite pulse
animate={{ scale: [1, 1.2, 1] }}
transition={{ duration: 2, repeat: Infinity }}

// Slide in
initial={{ x: '100%' }}
animate={{ x: 0 }}
transition={{ type: 'spring', stiffness: 300 }}
```

---

## Lisans

MIT License - TURK DIJITAL METROPOL

---

## İletişim

Sorularınız için: dev@turkdijitalmetropol.com

---

**Versyon:** 1.0.0
**Son Güncelleme:** 2025-12-31
**Geliştirici:** Elite UI/UX Team
