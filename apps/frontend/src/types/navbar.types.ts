/**
 * TURK DIJITAL METROPOL - Navbar Type Definitions
 * Type safety for gaming-style header components
 */

import { LucideIcon } from 'lucide-react';

/**
 * Navigation Link Interface
 * Represents a single navigation item in the header
 */
export interface NavLink {
  /** Route path (e.g., "/characters") */
  href: string;

  /** Display label (e.g., "Karakterler") */
  label: string;

  /** Lucide icon component */
  icon: LucideIcon;

  /** Optional badge text */
  badge?: string;

  /** Optional tooltip text */
  tooltip?: string;

  /** External link flag */
  external?: boolean;

  /** Disabled state */
  disabled?: boolean;
}

/**
 * User Interface
 * Represents the authenticated user data
 */
export interface User {
  /** Unique user ID */
  id: string;

  /** Display username */
  username: string;

  /** Current level (1-100) */
  level: number;

  /** Avatar image URL */
  avatar: string;

  /** Current XP points */
  xp: number;

  /** XP required for next level */
  xpNext: number;

  /** Optional guild/clan name */
  guildName?: string;

  /** Optional player title/rank */
  title?: string;

  /** Premium membership status */
  isPremium?: boolean;

  /** Account creation date */
  joinedAt?: Date;

  /** Last login timestamp */
  lastLogin?: Date;
}

/**
 * Notification Type
 * Different categories of notifications
 */
export type NotificationType =
  | 'quest'       // New quest available
  | 'friend'      // Friend request/activity
  | 'event'       // Game event
  | 'achievement' // Achievement unlocked
  | 'system'      // System announcement
  | 'guild'       // Guild/clan notification
  | 'message'     // Direct message
  | 'reward';     // Reward received

/**
 * Notification Interface
 * Represents a single notification item
 */
export interface Notification {
  /** Unique notification ID */
  id: number;

  /** Notification type */
  type: NotificationType;

  /** Notification message text */
  text: string;

  /** Relative time string (e.g., "2h ago") */
  time: string;

  /** Read/unread status */
  read: boolean;

  /** Optional icon emoji/character */
  icon?: string;

  /** Optional action URL */
  actionUrl?: string;

  /** Optional action label */
  actionLabel?: string;

  /** Timestamp */
  createdAt?: Date;

  /** Priority level (1-5, 5 is highest) */
  priority?: number;
}

/**
 * Chat Room Type
 * Different chat room categories
 */
export type ChatRoomType = 'Global' | 'Guild' | 'Mesaj' | 'Party' | 'Trade';

/**
 * Chat Message Interface
 * Represents a single chat message
 */
export interface ChatMessage {
  /** Unique message ID */
  id: number;

  /** Chat room type */
  room: ChatRoomType;

  /** Sender username */
  user: string;

  /** Message content */
  message: string;

  /** Relative time string */
  time: string;

  /** Optional sender avatar URL */
  avatar?: string;

  /** Unread status */
  unread?: boolean;

  /** Timestamp */
  createdAt?: Date;

  /** Message type (text/image/emoji) */
  messageType?: 'text' | 'image' | 'emoji' | 'system';

  /** Sender level */
  userLevel?: number;

  /** Reply to message ID */
  replyTo?: number;
}

/**
 * Profile Menu Item Interface
 * Represents a single item in profile dropdown
 */
export interface ProfileMenuItem {
  /** Unique item ID */
  id: string;

  /** Display label */
  label: string;

  /** Icon identifier (mapped to Lucide icon) */
  icon: string;

  /** Target route */
  href: string;

  /** Optional badge text */
  badge: string | null;

  /** Optional divider after item */
  divider?: boolean;

  /** Optional danger styling (for logout) */
  danger?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Click handler override */
  onClick?: () => void;
}

/**
 * Dropdown State Interface
 * Manages dropdown open/close state
 */
export interface DropdownState {
  /** Profile dropdown */
  profile: boolean;

  /** Chat dropdown */
  chat: boolean;

  /** Notifications dropdown */
  notifications: boolean;

  /** Search bar */
  search: boolean;

  /** Mobile menu */
  mobile: boolean;
}

/**
 * Badge Props Interface
 * Props for badge component
 */
export interface BadgeProps {
  /** Badge count */
  count: number;

  /** Maximum display number (default: 9) */
  max?: number;

  /** Badge color variant */
  variant?: 'red' | 'blue' | 'gold' | 'green';

  /** Pulse animation */
  pulse?: boolean;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * XP Bar Props Interface
 * Props for XP progress bar
 */
export interface XPBarProps {
  /** Current XP */
  current: number;

  /** Target XP for next level */
  target: number;

  /** Current level */
  level: number;

  /** Show tooltip */
  showTooltip?: boolean;

  /** Animation duration (ms) */
  duration?: number;
}

/**
 * Search Result Interface
 * Represents a search autocomplete result
 */
export interface SearchResult {
  /** Result ID */
  id: string;

  /** Result title */
  title: string;

  /** Result type (character/location/item) */
  type: 'character' | 'location' | 'item' | 'quest' | 'user';

  /** Result description */
  description?: string;

  /** Result icon/image */
  icon?: string;

  /** Target URL */
  url: string;

  /** Relevance score (for sorting) */
  score?: number;
}

/**
 * Navbar State Interface
 * Complete navbar component state
 */
export interface NavbarState {
  /** Scroll position flag */
  isScrolled: boolean;

  /** Dropdown states */
  dropdowns: DropdownState;

  /** Current user */
  user: User | null;

  /** Unread notification count */
  unreadNotifications: number;

  /** Unread chat count */
  unreadChats: number;

  /** Loading state */
  isLoading: boolean;

  /** Error state */
  error: string | null;
}

/**
 * Navbar Animation Variants
 * Framer Motion animation presets
 */
export interface NavbarAnimations {
  /** Logo pulse animation */
  logoPulse: {
    boxShadow: string[];
    transition: {
      duration: number;
      repeat: number;
    };
  };

  /** Dropdown slide animation */
  dropdownSlide: {
    initial: { opacity: number; y: number; scale: number };
    animate: { opacity: number; y: number; scale: number };
    exit: { opacity: number; y: number; scale: number };
    transition: { duration: number };
  };

  /** Badge pulse animation */
  badgePulse: {
    scale: number[];
    transition: {
      duration: number;
      repeat: number;
    };
  };

  /** Sidebar slide animation */
  sidebarSlide: {
    initial: { x: string };
    animate: { x: number };
    exit: { x: string };
    transition: {
      type: string;
      stiffness: number;
      damping: number;
    };
  };
}

/**
 * Helper Functions Type Definitions
 */
export type GetUnreadCount = (items: Notification[] | ChatMessage[]) => number;
export type GetXPPercentage = (current: number, target: number) => number;
export type FormatTime = (time: string | Date) => string;
export type FilterNotifications = (notifications: Notification[], type: NotificationType) => Notification[];

/**
 * Event Handlers Type Definitions
 */
export interface NavbarEventHandlers {
  onLogoClick: () => void;
  onSearchToggle: () => void;
  onProfileToggle: () => void;
  onChatToggle: () => void;
  onNotificationsToggle: () => void;
  onMobileMenuToggle: () => void;
  onDropdownClose: (dropdown: keyof DropdownState) => void;
  onNotificationClick: (notification: Notification) => void;
  onChatMessageClick: (message: ChatMessage) => void;
  onSearchSubmit: (query: string) => void;
}

/**
 * Navbar Theme Configuration
 */
export interface NavbarTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textMuted: string;
  };
  fonts: {
    logo: string;
    navigation: string;
    body: string;
  };
  dimensions: {
    height: number;
    logoSize: number;
    iconSize: number;
    dropdownWidth: number;
  };
  animations: {
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
    easing: string;
  };
}

/**
 * Navbar Props Interface
 * Props for main Navbar component
 */
export interface NavbarProps {
  /** Optional custom theme */
  theme?: Partial<NavbarTheme>;

  /** Optional custom navigation links */
  navLinks?: NavLink[];

  /** Optional user override */
  user?: User | null;

  /** Optional notification override */
  notifications?: Notification[];

  /** Optional chat messages override */
  chatMessages?: ChatMessage[];

  /** Optional event handlers override */
  eventHandlers?: Partial<NavbarEventHandlers>;

  /** Show/hide features */
  features?: {
    search?: boolean;
    profile?: boolean;
    chat?: boolean;
    notifications?: boolean;
    xpBar?: boolean;
  };

  /** Custom class names */
  className?: string;

  /** Custom styles */
  style?: React.CSSProperties;
}

/**
 * Export all types
 */
export type {
  LucideIcon,
};
