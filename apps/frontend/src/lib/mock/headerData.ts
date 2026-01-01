/**
 * TURK DIJITAL METROPOL - Header Mock Data
 * Gaming-style header data for RPG/MMO experience
 */

export interface User {
  username: string;
  level: number;
  avatar: string;
  xp: number;
  xpNext: number;
  guildName?: string;
  title?: string;
}

export interface Notification {
  id: number;
  type: 'quest' | 'friend' | 'event' | 'achievement' | 'system' | 'guild';
  text: string;
  time: string;
  read: boolean;
  icon?: string;
}

export interface ChatMessage {
  id: number;
  room: 'Global' | 'Guild' | 'Mesaj';
  user: string;
  message: string;
  time: string;
  avatar?: string;
  unread?: boolean;
}

// Mock User Data
export const mockUser: User = {
  username: "DemoKullanici",
  level: 25,
  avatar: "/avatars/default.png",
  xp: 8450,
  xpNext: 10000,
  guildName: "Turkuaz Savascilar",
  title: "Istanbul Kahramani"
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'quest',
    text: 'Yeni gorev: Istanbul\'u Kesfet',
    time: '2d once',
    read: false,
    icon: '🎯'
  },
  {
    id: 2,
    type: 'friend',
    text: 'MehmetKaya arkadaslik istegi gonderdi',
    time: '1s once',
    read: false,
    icon: '👥'
  },
  {
    id: 3,
    type: 'event',
    text: 'Tavla Turnuvasi basladi!',
    time: '5d once',
    read: false,
    icon: '🎲'
  },
  {
    id: 4,
    type: 'achievement',
    text: 'Basarim kazandiniz: Ilk Adim',
    time: '1h once',
    read: true,
    icon: '🏆'
  },
  {
    id: 5,
    type: 'system',
    text: 'Sistem bakimi: 31 Aralik 22:00',
    time: '2h once',
    read: true,
    icon: '⚙️'
  },
  {
    id: 6,
    type: 'guild',
    text: 'Loncandan yeni mesaj: Toplanti bu aksam!',
    time: '3h once',
    read: false,
    icon: '🛡️'
  },
  {
    id: 7,
    type: 'event',
    text: 'Ramazan Etkinligi basliyor!',
    time: '1g once',
    read: true,
    icon: '🌙'
  },
];

// Mock Chat Messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: 1,
    room: 'Global',
    user: 'FatmaSahin',
    message: 'Merhaba herkese!',
    time: '1dk once',
    avatar: '/avatars/user1.png',
    unread: true
  },
  {
    id: 2,
    room: 'Guild',
    user: 'AyseDemir',
    message: 'Bu aksam raid var mi?',
    time: '5dk once',
    avatar: '/avatars/user2.png',
    unread: true
  },
  {
    id: 3,
    room: 'Mesaj',
    user: 'ZeynepKaya',
    message: 'Tavla oynayalim mi?',
    time: '10dk once',
    avatar: '/avatars/user3.png',
    unread: false
  },
  {
    id: 4,
    room: 'Global',
    user: 'MustafaOzturk',
    message: 'Yeni baslayanlar icin ipuclari?',
    time: '15dk once',
    avatar: '/avatars/user4.png',
    unread: false
  },
  {
    id: 5,
    room: 'Guild',
    user: 'ElifYildirim',
    message: 'Harika macti, tebrikler!',
    time: '20dk once',
    avatar: '/avatars/user5.png',
    unread: false
  },
];

// Profile Menu Items
export const profileMenuItems = [
  {
    id: 'characters',
    label: 'Karakterlerim',
    icon: 'shield',
    href: '/profile/characters',
    badge: null
  },
  {
    id: 'achievements',
    label: 'Basarimlarim',
    icon: 'trophy',
    href: '/profile/achievements',
    badge: '3 yeni'
  },
  {
    id: 'inventory',
    label: 'Envanterim',
    icon: 'backpack',
    href: '/profile/inventory',
    badge: null
  },
  {
    id: 'settings',
    label: 'Ayarlar',
    icon: 'settings',
    href: '/profile/settings',
    badge: null
  },
  {
    id: 'logout',
    label: 'Cikis Yap',
    icon: 'logout',
    href: '/auth/logout',
    badge: null
  }
];

// Helper functions
export const getUnreadNotificationsCount = (notifications: Notification[]): number => {
  return notifications.filter(n => !n.read).length;
};

export const getUnreadChatCount = (messages: ChatMessage[]): number => {
  return messages.filter(m => m.unread).length;
};

export const getXPPercentage = (currentXP: number, nextLevelXP: number): number => {
  return Math.floor((currentXP / nextLevelXP) * 100);
};

export const formatTime = (time: string): string => {
  return time;
};
