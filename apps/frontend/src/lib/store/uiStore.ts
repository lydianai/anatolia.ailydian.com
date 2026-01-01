import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
}

export interface Modal {
  id: string;
  component: string;
  props?: Record<string, unknown>;
  onClose?: () => void;
}

interface UIState {
  theme: 'light' | 'dark';
  notifications: Notification[];
  modals: Modal[];
  isLoading: boolean;
  loadingText?: string;
  sidebarOpen: boolean;
  isMobile: boolean;
}

interface UIActions {
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  openModal: (modal: Omit<Modal, 'id'>) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  setLoading: (isLoading: boolean, text?: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
}

type UIStore = UIState & UIActions;

const initialState: UIState = {
  theme: 'dark',
  notifications: [],
  modals: [],
  isLoading: false,
  loadingText: undefined,
  sidebarOpen: true,
  isMobile: false,
};

let notificationCounter = 0;
let modalCounter = 0;

export const useUIStore = create<UIStore>()(
  immer((set) => ({
    ...initialState,

    setTheme: (theme) =>
      set((state) => {
        state.theme = theme;
        if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle('dark', theme === 'dark');
          localStorage.setItem('theme', theme);
        }
      }),

    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        state.theme = newTheme;
        if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
          localStorage.setItem('theme', newTheme);
        }
      }),

    addNotification: (notification) =>
      set((state) => {
        const id = `notification-${++notificationCounter}`;
        const newNotification: Notification = {
          ...notification,
          id,
          timestamp: Date.now(),
          duration: notification.duration || 5000,
        };
        state.notifications.push(newNotification);

        // Auto-remove after duration
        if (newNotification.duration) {
          setTimeout(() => {
            set((state) => {
              state.notifications = state.notifications.filter((n) => n.id !== id);
            });
          }, newNotification.duration);
        }
      }),

    removeNotification: (id) =>
      set((state) => {
        state.notifications = state.notifications.filter((n) => n.id !== id);
      }),

    clearNotifications: () =>
      set((state) => {
        state.notifications = [];
      }),

    openModal: (modal) =>
      set((state) => {
        const id = `modal-${++modalCounter}`;
        state.modals.push({ ...modal, id });
      }),

    closeModal: (id) =>
      set((state) => {
        const modal = state.modals.find((m) => m.id === id);
        if (modal?.onClose) {
          modal.onClose();
        }
        state.modals = state.modals.filter((m) => m.id !== id);
      }),

    closeAllModals: () =>
      set((state) => {
        state.modals.forEach((modal) => {
          if (modal.onClose) {
            modal.onClose();
          }
        });
        state.modals = [];
      }),

    setLoading: (isLoading, text) =>
      set((state) => {
        state.isLoading = isLoading;
        state.loadingText = text;
      }),

    toggleSidebar: () =>
      set((state) => {
        state.sidebarOpen = !state.sidebarOpen;
      }),

    setSidebarOpen: (open) =>
      set((state) => {
        state.sidebarOpen = open;
      }),

    setIsMobile: (isMobile) =>
      set((state) => {
        state.isMobile = isMobile;
      }),
  }))
);

// Selectors
export const selectTheme = (state: UIStore) => state.theme;
export const selectNotifications = (state: UIStore) => state.notifications;
export const selectModals = (state: UIStore) => state.modals;
export const selectIsLoading = (state: UIStore) => state.isLoading;
export const selectSidebarOpen = (state: UIStore) => state.sidebarOpen;
