import type { Position, Character, Monster } from './api';
import type { Player, GameEffect } from './game';

// Socket Event Types
export enum SocketEvent {
  // Connection
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ERROR = 'error',
  RECONNECT = 'reconnect',

  // Authentication
  AUTH = 'auth',
  AUTH_SUCCESS = 'auth:success',
  AUTH_ERROR = 'auth:error',

  // Player
  PLAYER_JOIN = 'player:join',
  PLAYER_LEAVE = 'player:leave',
  PLAYER_MOVE = 'player:move',
  PLAYER_UPDATE = 'player:update',

  // Chat
  CHAT_MESSAGE = 'chat:message',
  CHAT_ROOM_JOIN = 'chat:room:join',
  CHAT_ROOM_LEAVE = 'chat:room:leave',

  // Game
  GAME_STATE = 'game:state',
  GAME_ACTION = 'game:action',
  GAME_EFFECT = 'game:effect',

  // Combat
  COMBAT_START = 'combat:start',
  COMBAT_END = 'combat:end',
  COMBAT_DAMAGE = 'combat:damage',
  COMBAT_HEAL = 'combat:heal',

  // World
  WORLD_UPDATE = 'world:update',
  WORLD_SPAWN = 'world:spawn',
  WORLD_DESPAWN = 'world:despawn',
}

// Socket Payloads
export interface AuthPayload {
  token: string;
  characterId?: string;
}

export interface AuthSuccessPayload {
  userId: string;
  characterId: string;
}

export interface PlayerJoinPayload {
  player: Player;
}

export interface PlayerLeavePayload {
  playerId: string;
}

export interface PlayerMovePayload {
  playerId: string;
  position: Position;
  timestamp: number;
}

export interface PlayerUpdatePayload {
  playerId: string;
  updates: Partial<Player>;
}

export interface ChatMessagePayload {
  id: string;
  userId: string;
  username: string;
  message: string;
  room: string;
  timestamp: number;
}

export interface GameStatePayload {
  players: Player[];
  monsters: Monster[];
  timestamp: number;
}

export interface GameActionPayload {
  playerId: string;
  action: string;
  data: Record<string, unknown>;
  timestamp: number;
}

export interface GameEffectPayload {
  effect: GameEffect;
}

export interface CombatDamagePayload {
  attackerId: string;
  targetId: string;
  damage: number;
  isCritical: boolean;
  timestamp: number;
}

export interface CombatHealPayload {
  targetId: string;
  amount: number;
  timestamp: number;
}

export interface WorldUpdatePayload {
  type: 'SPAWN' | 'DESPAWN' | 'UPDATE';
  entityId: string;
  entityType: 'PLAYER' | 'MONSTER' | 'NPC' | 'ITEM';
  data?: Record<string, unknown>;
}

// Socket State
export interface SocketState {
  connected: boolean;
  authenticated: boolean;
  ping: number;
  reconnectAttempts: number;
  lastEvent?: {
    type: string;
    timestamp: number;
  };
}

// Socket Configuration
export interface SocketConfig {
  url: string;
  path?: string;
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  timeout?: number;
  autoConnect?: boolean;
}
