import { Request } from 'express';
import { Socket } from 'socket.io';

// Extend Express Request with user info
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

// Socket.io with authentication
export interface AuthSocket extends Socket {
  userId?: string;
  characterId?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  displayName?: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  username: string;
  role: string;
}

// Character
export interface CharacterPosition {
  x: number;
  y: number;
  z: number;
  rotation: number;
  zone: string;
}

export interface CharacterMovement {
  characterId: string;
  position: CharacterPosition;
  velocity?: {
    x: number;
    y: number;
    z: number;
  };
  timestamp: number;
}

export interface CharacterStats {
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  strength: number;
  agility: number;
  intelligence: number;
  charisma: number;
}

// World
export interface WorldUpdate {
  zone: string;
  state: any;
  timestamp: number;
}

export interface PlayerPresence {
  characterId: string;
  characterName: string;
  position: CharacterPosition;
  isOnline: boolean;
  lastSeen: string;
}

// Chat
export interface ChatMessageData {
  roomId: string;
  content: string;
  type?: 'TEXT' | 'EMOTE' | 'SYSTEM' | 'WHISPER';
  metadata?: Record<string, any>;
}

// Economy
export interface TransactionData {
  type: string;
  amount: number;
  fromCharacterId?: string;
  toCharacterId?: string;
  description?: string;
  metadata?: Record<string, any>;
}

// Socket Events (Client -> Server)
export interface ClientToServerEvents {
  'character:move': (data: CharacterMovement) => void;
  'character:action': (data: { action: string; target?: string }) => void;
  'chat:send': (data: ChatMessageData) => void;
  'chat:join': (roomId: string) => void;
  'chat:leave': (roomId: string) => void;
  'world:subscribe': (zone: string) => void;
  'world:unsubscribe': (zone: string) => void;
  'ping': () => void;
}

// Socket Events (Server -> Client)
export interface ServerToClientEvents {
  'character:moved': (data: CharacterMovement) => void;
  'character:update': (data: any) => void;
  'chat:message': (data: any) => void;
  'world:update': (data: WorldUpdate) => void;
  'player:joined': (data: PlayerPresence) => void;
  'player:left': (data: { characterId: string }) => void;
  'error': (error: { message: string; code?: string }) => void;
  'pong': () => void;
}

// Socket Events (Inter-server)
export interface InterServerEvents {
  ping: () => void;
}

// Socket Data
export interface SocketData {
  userId: string;
  characterId?: string;
  username: string;
}

// Queue Job Data
export interface QueueJobData {
  type: string;
  payload: any;
  userId?: string;
  characterId?: string;
}

// Error types
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
    this.name = 'ConflictError';
  }
}
