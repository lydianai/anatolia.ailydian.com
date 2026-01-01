'use client';

import * as React from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useUIStore, type Notification } from '@/lib/store/uiStore';

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colorMap = {
  success: 'bg-green-500/10 border-green-500 text-green-500',
  error: 'bg-red-500/10 border-red-500 text-red-500',
  warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-500',
  info: 'bg-blue-500/10 border-blue-500 text-blue-500',
};

function NotificationItem({ notification }: { notification: Notification }) {
  const removeNotification = useUIStore((state) => state.removeNotification);
  const Icon = iconMap[notification.type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm animate-slide-up',
        colorMap[notification.type]
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1 space-y-1">
        <p className="font-semibold text-sm">{notification.title}</p>
        <p className="text-sm opacity-90">{notification.message}</p>
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className="flex-shrink-0 rounded-md p-1 hover:bg-white/10 transition-colors"
        aria-label="Bildirimi kapat"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function NotificationContainer() {
  const notifications = useUIStore((state) => state.notifications);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
