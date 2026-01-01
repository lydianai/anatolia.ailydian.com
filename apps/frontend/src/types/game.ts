import type { Character, Position, Monster, NPC } from './api';

// Game State Types
export interface GameState {
  isLoading: boolean;
  isConnected: boolean;
  currentCharacter: Character | null;
  nearbyPlayers: Player[];
  nearbyMonsters: Monster[];
  nearbyNPCs: NPC[];
  worldId: string | null;
}

export interface Player {
  id: string;
  characterId: string;
  username: string;
  displayName: string;
  position: Position;
  level: number;
  health: number;
  maxHealth: number;
  class: string;
  isMoving: boolean;
  animation?: string;
}

// Game Actions
export interface MoveAction {
  type: 'MOVE';
  position: Position;
  timestamp: number;
}

export interface AttackAction {
  type: 'ATTACK';
  targetId: string;
  skillId?: string;
  timestamp: number;
}

export interface InteractAction {
  type: 'INTERACT';
  targetId: string;
  targetType: 'NPC' | 'ITEM' | 'OBJECT';
  timestamp: number;
}

export type GameAction = MoveAction | AttackAction | InteractAction;

// Camera
export interface Camera {
  x: number;
  y: number;
  zoom: number;
  target?: string; // character ID to follow
}

// UI State
export interface GameUIState {
  showInventory: boolean;
  showCharacterSheet: boolean;
  showMap: boolean;
  showChat: boolean;
  showSettings: boolean;
  selectedTarget: string | null;
}

// Performance Metrics
export interface PerformanceMetrics {
  fps: number;
  ping: number;
  packetLoss: number;
  lastUpdate: number;
  drawCalls?: number;
  entities?: number;
}

// Input State
export interface InputState {
  mouseX: number;
  mouseY: number;
  keys: Set<string>;
  isMouseDown: boolean;
  lastInput: number;
}

// Render Options
export interface RenderOptions {
  quality: 'low' | 'medium' | 'high';
  showFPS: boolean;
  showPing: boolean;
  showPlayerNames: boolean;
  showHealthBars: boolean;
  particleEffects: boolean;
  shadowQuality: 'none' | 'low' | 'medium' | 'high';
}

// Animation
export interface Animation {
  id: string;
  name: string;
  frames: number;
  duration: number;
  loop: boolean;
}

// Effect
export interface GameEffect {
  id: string;
  type: 'DAMAGE' | 'HEAL' | 'BUFF' | 'DEBUFF' | 'PARTICLE';
  position: Position;
  value?: number;
  duration: number;
  timestamp: number;
}

// Quest
export interface Quest {
  id: string;
  title: string;
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward[];
  status: QuestStatus;
  progress: number;
}

export interface QuestObjective {
  id: string;
  description: string;
  type: 'KILL' | 'COLLECT' | 'INTERACT' | 'REACH';
  target: string;
  current: number;
  required: number;
  completed: boolean;
}

export interface QuestReward {
  type: 'EXPERIENCE' | 'GOLD' | 'ITEM';
  amount: number;
  itemId?: string;
}

export enum QuestStatus {
  AVAILABLE = 'AVAILABLE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
