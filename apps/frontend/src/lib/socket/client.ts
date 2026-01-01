import { io, Socket } from 'socket.io-client';
import type { SocketConfig, SocketEvent } from '@/types/socket';
import { useAuthStore } from '@/lib/store/authStore';

class SocketClient {
  private socket: Socket | null = null;
  private config: SocketConfig;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private listeners = new Map<string, Set<Function>>();

  constructor(config?: Partial<SocketConfig>) {
    this.config = {
      url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
      path: '/socket.io',
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      autoConnect: false,
      ...config,
    };
  }

  connect(): void {
    if (this.socket?.connected) {
      console.warn('Socket already connected');
      return;
    }

    const tokens = useAuthStore.getState().tokens;

    this.socket = io(this.config.url, {
      path: this.config.path,
      reconnection: this.config.reconnection,
      reconnectionAttempts: this.config.reconnectionAttempts,
      reconnectionDelay: this.config.reconnectionDelay,
      timeout: this.config.timeout,
      auth: {
        token: tokens?.accessToken,
      },
      transports: ['websocket', 'polling'],
    });

    this.setupEventHandlers();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  emit(event: string, data?: any): void {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit(event, data);
  }

  on(event: string, callback: Function): void {
    if (!this.socket) {
      console.error('Socket not initialized');
      return;
    }

    // Store listener for cleanup
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);

    // Add event listener
    this.socket.on(event, (...args: any[]) => callback(...args));
  }

  off(event: string, callback?: Function): void {
    if (!this.socket) return;

    if (callback) {
      this.socket.off(event, callback as any);
      this.listeners.get(event)?.delete(callback);
    } else {
      this.socket.off(event);
      this.listeners.delete(event);
    }
  }

  once(event: string, callback: Function): void {
    if (!this.socket) {
      console.error('Socket not initialized');
      return;
    }

    this.socket.once(event, (...args: any[]) => callback(...args));
  }

  private setupEventHandlers(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on(SocketEvent.CONNECT, () => {
      console.log('Socket connected');
      this.reconnectAttempts = 0;
      this.authenticate();
    });

    this.socket.on(SocketEvent.DISCONNECT, (reason: string) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on(SocketEvent.ERROR, (error: Error) => {
      console.error('Socket error:', error);
    });

    this.socket.on(SocketEvent.RECONNECT, (attemptNumber: number) => {
      console.log('Socket reconnected after', attemptNumber, 'attempts');
      this.reconnectAttempts = 0;
    });

    this.socket.io.on('reconnect_attempt', (attemptNumber: number) => {
      this.reconnectAttempts = attemptNumber;
      console.log('Reconnection attempt:', attemptNumber);

      if (attemptNumber >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
        this.disconnect();
      }
    });

    this.socket.io.on('reconnect_error', (error: Error) => {
      console.error('Reconnection error:', error);
    });

    this.socket.io.on('reconnect_failed', () => {
      console.error('Reconnection failed');
      this.disconnect();
    });
  }

  private authenticate(): void {
    const tokens = useAuthStore.getState().tokens;

    if (tokens?.accessToken) {
      this.emit(SocketEvent.AUTH, { token: tokens.accessToken });
    }
  }

  getPing(): number {
    // Calculate round-trip time
    const startTime = Date.now();

    this.emit('ping');

    this.once('pong', () => {
      const ping = Date.now() - startTime;
      return ping;
    });

    return 0;
  }
}

// Create singleton instance
const socketClient = new SocketClient();

export default socketClient;
