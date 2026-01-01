import { formatDistanceToNow, format } from 'date-fns';
import { tr } from 'date-fns/locale';

/**
 * Format a number with thousands separator
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('tr-TR').format(num);
}

/**
 * Format experience points
 */
export function formatXP(xp: number): string {
  if (xp >= 1_000_000) {
    return `${(xp / 1_000_000).toFixed(1)}M`;
  }
  if (xp >= 1_000) {
    return `${(xp / 1_000).toFixed(1)}K`;
  }
  return xp.toString();
}

/**
 * Format date relative to now
 */
export function formatRelativeTime(date: string | number | Date): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: tr,
  });
}

/**
 * Format date to string
 */
export function formatDate(date: string | number | Date, formatStr: string = 'PPP'): string {
  return format(new Date(date), formatStr, { locale: tr });
}

/**
 * Format health/mana as percentage
 */
export function formatPercentage(current: number, max: number): number {
  return Math.round((current / max) * 100);
}

/**
 * Get health bar color based on percentage
 */
export function getHealthColor(percentage: number): string {
  if (percentage > 75) return 'bg-green-500';
  if (percentage > 50) return 'bg-yellow-500';
  if (percentage > 25) return 'bg-orange-500';
  return 'bg-red-500';
}

/**
 * Get rarity color
 */
export function getRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    COMMON: 'text-gray-400',
    UNCOMMON: 'text-green-400',
    RARE: 'text-blue-400',
    EPIC: 'text-purple-400',
    LEGENDARY: 'text-orange-400',
  };
  return colors[rarity] || colors.COMMON;
}

/**
 * Truncate text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
