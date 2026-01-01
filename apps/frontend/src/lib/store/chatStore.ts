import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  displayName?: string;
  message: string;
  room: string;
  timestamp: number;
  isSystem?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'GLOBAL' | 'LOCAL' | 'PARTY' | 'GUILD' | 'WHISPER';
  unreadCount: number;
}

interface ChatState {
  rooms: ChatRoom[];
  activeRoomId: string;
  messages: Map<string, ChatMessage[]>;
  isOpen: boolean;
  maxMessagesPerRoom: number;
}

interface ChatActions {
  addRoom: (room: ChatRoom) => void;
  removeRoom: (roomId: string) => void;
  setActiveRoom: (roomId: string) => void;
  addMessage: (message: ChatMessage) => void;
  clearMessages: (roomId: string) => void;
  markAsRead: (roomId: string) => void;
  toggleChat: () => void;
  setOpen: (isOpen: boolean) => void;
}

type ChatStore = ChatState & ChatActions;

const DEFAULT_ROOMS: ChatRoom[] = [
  { id: 'global', name: 'Global', type: 'GLOBAL', unreadCount: 0 },
  { id: 'local', name: 'Local', type: 'LOCAL', unreadCount: 0 },
];

const initialState: ChatState = {
  rooms: DEFAULT_ROOMS,
  activeRoomId: 'global',
  messages: new Map(DEFAULT_ROOMS.map((room) => [room.id, []])),
  isOpen: true,
  maxMessagesPerRoom: 100,
};

export const useChatStore = create<ChatStore>()(
  immer((set) => ({
    ...initialState,

    addRoom: (room) =>
      set((state) => {
        const exists = state.rooms.find((r) => r.id === room.id);
        if (!exists) {
          state.rooms.push(room);
          state.messages.set(room.id, []);
        }
      }),

    removeRoom: (roomId) =>
      set((state) => {
        state.rooms = state.rooms.filter((r) => r.id !== roomId);
        state.messages.delete(roomId);
        if (state.activeRoomId === roomId && state.rooms.length > 0) {
          state.activeRoomId = state.rooms[0].id;
        }
      }),

    setActiveRoom: (roomId) =>
      set((state) => {
        state.activeRoomId = roomId;
        // Mark as read
        const room = state.rooms.find((r) => r.id === roomId);
        if (room) {
          room.unreadCount = 0;
        }
      }),

    addMessage: (message) =>
      set((state) => {
        const roomMessages = state.messages.get(message.room) || [];
        roomMessages.push(message);

        // Keep only last N messages
        if (roomMessages.length > state.maxMessagesPerRoom) {
          roomMessages.shift();
        }

        state.messages.set(message.room, roomMessages);

        // Increment unread count if not active room
        if (state.activeRoomId !== message.room) {
          const room = state.rooms.find((r) => r.id === message.room);
          if (room) {
            room.unreadCount++;
          }
        }
      }),

    clearMessages: (roomId) =>
      set((state) => {
        state.messages.set(roomId, []);
      }),

    markAsRead: (roomId) =>
      set((state) => {
        const room = state.rooms.find((r) => r.id === roomId);
        if (room) {
          room.unreadCount = 0;
        }
      }),

    toggleChat: () =>
      set((state) => {
        state.isOpen = !state.isOpen;
      }),

    setOpen: (isOpen) =>
      set((state) => {
        state.isOpen = isOpen;
      }),
  }))
);

// Selectors
export const selectRooms = (state: ChatStore) => state.rooms;
export const selectActiveRoom = (state: ChatStore) =>
  state.rooms.find((r) => r.id === state.activeRoomId);
export const selectActiveMessages = (state: ChatStore) =>
  state.messages.get(state.activeRoomId) || [];
export const selectIsOpen = (state: ChatStore) => state.isOpen;
export const selectUnreadCount = (state: ChatStore) =>
  state.rooms.reduce((total, room) => total + room.unreadCount, 0);
