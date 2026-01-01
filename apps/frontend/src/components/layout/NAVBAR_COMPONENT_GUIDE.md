# Navbar Component Guide

## Gaming-Style Premium Header

Elite UI/UX Developer tarafindan olusturulmus, RPG/MMO temalı premium navbar.

---

## Component Structure

```
<Navbar>
  ├── XP Progress Bar (fixed top-[72px])
  ├── Main Header (fixed top-0)
  │   ├── Logo Area
  │   │   ├── Turkish Flag Icon (animated)
  │   │   └── Brand Text (Orbitron font)
  │   │
  │   ├── Navigation Links (desktop only)
  │   │   ├── Karakterler
  │   │   ├── Dunya
  │   │   ├── Ozellikler
  │   │   ├── Nasil Oynanir
  │   │   ├── Topluluk
  │   │   └── Hakkinda
  │   │
  │   └── Action Area
  │       ├── Search Button
  │       ├── Profile Dropdown
  │       ├── Chat Dropdown
  │       ├── Notifications Dropdown
  │       ├── OYUNA GIR Button
  │       └── Hamburger (mobile only)
  │
  ├── Search Bar (expandable)
  │
  └── Mobile Sidebar
      ├── Header (logo + user info)
      ├── Navigation
      ├── Quick Access
      └── CTA Button
```

---

## Props Interface

```typescript
// Currently no props - self-contained component
export function Navbar() {
  // Internal state only
}
```

---

## Internal State

```typescript
// Scroll state
const [isScrolled, setIsScrolled] = useState(false);

// UI states
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [searchOpen, setSearchOpen] = useState(false);

// Dropdown states
const [profileOpen, setProfileOpen] = useState(false);
const [chatOpen, setChatOpen] = useState(false);
const [notificationsOpen, setNotificationsOpen] = useState(false);
```

---

## Key Features

### 1. Scroll-Based Styling
```typescript
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Applied to nav:
className={`transition-all duration-300 ${
  isScrolled
    ? 'bg-black/80 backdrop-blur-xl border-b-2 border-[#D4AF37]/20'
    : 'bg-black/30 backdrop-blur-lg border-b-2 border-[#D4AF37]/10'
}`}
```

### 2. Click Outside Detection
```typescript
const profileRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setProfileOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

### 3. Keyboard Navigation
```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setProfileOpen(false);
      setChatOpen(false);
      setNotificationsOpen(false);
      setIsMobileMenuOpen(false);
      setSearchOpen(false);
    }
  };
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 4. Route Change Cleanup
```typescript
const pathname = usePathname();

useEffect(() => {
  setIsMobileMenuOpen(false);
  setProfileOpen(false);
  setChatOpen(false);
  setNotificationsOpen(false);
}, [pathname]);
```

---

## Sub-Components

### Logo Button
```jsx
<button
  onClick={scrollToTop}
  className="flex items-center gap-3 group"
  aria-label="Ana sayfaya git"
>
  <motion.div
    className="w-14 h-14 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-xl"
    whileHover={{ scale: 1.1, rotate: 5 }}
    animate={{ boxShadow: [/* pulse animation */] }}
  >
    <Star className="w-8 h-8 text-white" fill="currentColor" />
  </motion.div>
  <div className="hidden md:block">
    <motion.div className="text-sm font-black text-[#D4AF37]">
      TURK DIJITAL
    </motion.div>
    <motion.div className="text-2xl font-black text-white">
      METROPOL
    </motion.div>
  </div>
</button>
```

### Navigation Link
```jsx
<Link href={link.href}>
  <motion.div
    whileHover={{ scale: 1.05, textShadow: '0 0 10px rgba(212, 175, 55, 1)' }}
    className={`px-4 py-2.5 rounded-lg flex items-center gap-2 ${
      isActive ? 'text-[#D4AF37] bg-[#D4AF37]/10' : 'text-gray-300'
    }`}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm font-semibold">{link.label}</span>
    {isActive && (
      <motion.div
        layoutId="navbar-active"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
      />
    )}
  </motion.div>
</Link>
```

### Badge Component (Reusable Pattern)
```jsx
{unreadCount > 0 && (
  <motion.span
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#E30A17] to-red-700 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-black"
  >
    {unreadCount > 9 ? '9+' : unreadCount}
  </motion.span>
)}
```

### Dropdown Menu (Reusable Pattern)
```jsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-full mt-2 w-64 bg-black/95 backdrop-blur-xl rounded-xl border border-[#D4AF37]/20"
    >
      {/* Dropdown content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## Animation Recipes

### 1. Logo Pulse
```typescript
animate={{
  boxShadow: [
    '0 0 20px rgba(212, 175, 55, 0.5)',
    '0 0 40px rgba(212, 175, 55, 0.8)',
    '0 0 20px rgba(212, 175, 55, 0.5)'
  ]
}}
transition={{ duration: 2, repeat: Infinity }}
```

### 2. Button Hover
```typescript
whileHover={{
  scale: 1.1,
  boxShadow: '0 0 30px rgba(212, 175, 55, 0.8)'
}}
whileTap={{ scale: 0.95 }}
```

### 3. Sidebar Slide
```typescript
initial={{ x: '100%' }}
animate={{ x: 0 }}
exit={{ x: '100%' }}
transition={{ type: 'spring', stiffness: 300, damping: 30 }}
```

### 4. XP Bar Fill
```typescript
initial={{ scaleX: 0 }}
animate={{ scaleX: xpPercentage / 100 }}
transition={{ duration: 1, ease: 'easeOut' }}
```

### 5. Active Tab Indicator
```typescript
<motion.div
  layoutId="navbar-active"
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
/>
```

---

## Styling Patterns

### Glassmorphism
```css
bg-black/80 backdrop-blur-xl border border-white/10
```

### Gold Gradient
```css
bg-gradient-to-br from-[#E30A17] to-[#D4AF37]
```

### Text Glow
```css
style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }}
```

### Box Glow
```css
style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)' }}
```

### Turkish Pattern (SVG)
```css
backgroundImage: 'url("data:image/svg+xml,...star-pattern...")'
```

---

## Mock Data Integration

### Import
```typescript
import {
  mockUser,
  mockNotifications,
  mockChatMessages,
  profileMenuItems,
  getUnreadNotificationsCount,
  getUnreadChatCount,
  getXPPercentage
} from '@/lib/mock/headerData';
```

### Usage
```typescript
const unreadNotifications = getUnreadNotificationsCount(mockNotifications);
const unreadChats = getUnreadChatCount(mockChatMessages);
const xpPercentage = getXPPercentage(mockUser.xp, mockUser.xpNext);
```

---

## Accessibility Features

### ARIA Labels
```jsx
aria-label="Ana sayfaya git"
aria-label="Profil menusu"
aria-expanded={profileOpen}
```

### Focus Management
```jsx
autoFocus // on search input when opened
```

### Keyboard Support
- ESC: Close all dropdowns
- Tab: Navigate through interactive elements
- Enter: Activate buttons/links

### Screen Reader Support
- Semantic HTML (<nav>, <button>, <Link>)
- Descriptive aria-labels
- Proper heading hierarchy

---

## Performance Tips

### 1. Use refs instead of state when possible
```typescript
const profileRef = useRef<HTMLDivElement>(null);
// No re-render on ref change
```

### 2. Cleanup event listeners
```typescript
useEffect(() => {
  const handler = () => {};
  document.addEventListener('scroll', handler);
  return () => document.removeEventListener('scroll', handler);
}, []);
```

### 3. Memoize calculations
```typescript
const xpPercentage = useMemo(
  () => getXPPercentage(mockUser.xp, mockUser.xpNext),
  [mockUser.xp, mockUser.xpNext]
);
```

### 4. Use CSS transforms (GPU accelerated)
```typescript
whileHover={{ scale: 1.1 }} // Better than width/height
```

---

## Customization Guide

### Change Colors
```typescript
// Find and replace:
[#D4AF37] → Your primary color
[#E30A17] → Your accent color
```

### Add New Navigation Link
```typescript
const navLinks = [
  // ... existing links
  { href: '/new-page', label: 'Yeni Sayfa', icon: NewIcon },
];
```

### Add New Profile Menu Item
```typescript
// In headerData.ts:
export const profileMenuItems = [
  // ... existing items
  {
    id: 'new-item',
    label: 'Yeni Ozellik',
    icon: 'newIcon',
    href: '/new-feature',
    badge: null
  }
];

// In Navbar.tsx iconMap:
const iconMap = {
  // ... existing icons
  newIcon: NewIconComponent
};
```

### Change Animations
```typescript
// Logo pulse speed:
transition={{ duration: 2, repeat: Infinity }} // Change duration

// Dropdown speed:
transition={{ duration: 0.2 }} // Change duration

// Sidebar spring:
transition={{ type: 'spring', stiffness: 300, damping: 30 }}
// Adjust stiffness (higher = faster)
// Adjust damping (higher = less bounce)
```

---

## Testing Checklist

### Desktop
- [ ] Logo click scrolls to top
- [ ] All navigation links work
- [ ] Search bar opens/closes
- [ ] Profile dropdown works
- [ ] Chat dropdown works
- [ ] Notifications dropdown works
- [ ] OYUNA GIR button routes to /game
- [ ] ESC closes all dropdowns
- [ ] Click outside closes dropdowns
- [ ] Scroll changes header background

### Mobile
- [ ] Hamburger opens sidebar
- [ ] Sidebar slides from right
- [ ] All navigation links work
- [ ] User info displays correctly
- [ ] XP bar shows
- [ ] Quick access buttons work
- [ ] OYUNA GIR button works
- [ ] Close button works
- [ ] ESC closes sidebar
- [ ] Click backdrop closes sidebar

### Accessibility
- [ ] All buttons have aria-labels
- [ ] Keyboard navigation works
- [ ] Focus visible on all elements
- [ ] Screen reader announces changes
- [ ] Color contrast passes AAA

### Performance
- [ ] No console errors
- [ ] Smooth animations (60fps)
- [ ] No memory leaks
- [ ] Event listeners cleaned up
- [ ] No unnecessary re-renders

---

## Common Issues & Solutions

### Issue: Dropdown stays open
**Solution:** Check if click outside handler is properly set up
```typescript
if (ref.current && !ref.current.contains(event.target as Node))
```

### Issue: Animations stuttering
**Solution:** Use CSS transforms instead of layout properties
```typescript
// Bad:
whileHover={{ width: 120 }}

// Good:
whileHover={{ scale: 1.1 }}
```

### Issue: Mobile sidebar not closing
**Solution:** Ensure backdrop has onClick handler
```typescript
<motion.div
  onClick={() => setIsMobileMenuOpen(false)}
  className="fixed inset-0 bg-black/90 z-40"
/>
```

### Issue: XP bar not animating
**Solution:** Check percentage calculation
```typescript
const xpPercentage = Math.floor((mockUser.xp / mockUser.xpNext) * 100);
```

---

## Future Enhancements

### v1.1
- [ ] Real-time notifications
- [ ] Live chat integration
- [ ] Voice chat indicator
- [ ] Friend online status

### v1.2
- [ ] Dark/Light mode toggle
- [ ] Language switcher
- [ ] Theme customizer
- [ ] Accessibility settings

### v2.0
- [ ] AI-powered search
- [ ] Video call integration
- [ ] Screen share support
- [ ] Advanced analytics

---

## Code Quality

### ESLint Rules
```json
{
  "react-hooks/exhaustive-deps": "warn",
  "jsx-a11y/aria-props": "error",
  "jsx-a11y/click-events-have-key-events": "warn"
}
```

### TypeScript Strict Mode
```typescript
// Enable in tsconfig.json:
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true
```

---

## Credits

**Designer:** Elite UI/UX Team
**Developer:** Frontend Specialist
**Icons:** Lucide React
**Fonts:** Google Fonts (Orbitron)
**Animation:** Framer Motion

---

**Version:** 1.0.0
**Last Updated:** 2025-12-31
