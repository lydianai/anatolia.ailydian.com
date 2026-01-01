import type { Texture } from 'pixi.js';

// Core Types
export interface Vector2 {
  x: number;
  y: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Transform {
  position: Vector2;
  scale: Vector2;
  rotation: number;
}

// Engine Configuration
export interface EngineConfig {
  width: number;
  height: number;
  resolution: number;
  backgroundColor: number;
  antialias: boolean;
  autoResize: boolean;
  targetFPS: number;
}

// Input Types
export interface KeyState {
  pressed: boolean;
  justPressed: boolean;
  justReleased: boolean;
}

export interface MouseState {
  position: Vector2;
  worldPosition: Vector2;
  buttons: Record<number, boolean>;
  wheel: number;
}

export interface TouchState {
  touches: Array<{
    id: number;
    position: Vector2;
    worldPosition: Vector2;
  }>;
}

// Entity Types
export enum EntityType {
  CHARACTER = 'character',
  BUILDING = 'building',
  INTERACTIVE = 'interactive',
  ANIMATED = 'animated',
  PARTICLE = 'particle'
}

export interface EntityConfig {
  id: string;
  type: EntityType;
  position: Vector2;
  scale?: Vector2;
  rotation?: number;
  layer?: number;
  active?: boolean;
  visible?: boolean;
}

export interface CharacterConfig extends EntityConfig {
  type: EntityType.CHARACTER;
  speed: number;
  animations: Record<string, AnimationConfig>;
  health?: number;
  maxHealth?: number;
  name?: string;
  equipment?: Record<string, string>;
}

export interface BuildingConfig extends EntityConfig {
  type: EntityType.BUILDING;
  tileset: string;
  width: number;
  height: number;
  interactive?: boolean;
}

// Animation Types
export interface AnimationConfig {
  frames: number[];
  frameRate: number;
  loop: boolean;
}

export enum AnimationState {
  IDLE = 'idle',
  WALK = 'walk',
  RUN = 'run',
  JUMP = 'jump',
  ACTION = 'action',
  DEATH = 'death'
}

export interface AnimationFrame {
  texture: Texture;
  duration: number;
}

// Movement Types
export enum Direction {
  NORTH = 'north',
  NORTH_EAST = 'north_east',
  EAST = 'east',
  SOUTH_EAST = 'south_east',
  SOUTH = 'south',
  SOUTH_WEST = 'south_west',
  WEST = 'west',
  NORTH_WEST = 'north_west'
}

export interface MovementConfig {
  speed: number;
  acceleration: number;
  friction: number;
  maxSpeed: number;
}

// World Types
export interface TileConfig {
  id: number;
  texture: string;
  collision: boolean;
  layer: number;
}

export interface TileMapConfig {
  tileWidth: number;
  tileHeight: number;
  width: number;
  height: number;
  layers: TileLayer[];
}

export interface TileLayer {
  name: string;
  data: number[][];
  visible: boolean;
  opacity: number;
  zIndex: number;
}

export interface Chunk {
  x: number;
  y: number;
  width: number;
  height: number;
  tiles: number[][];
  container: any; // Pixi Container
  loaded: boolean;
  dirty: boolean;
}

export interface Zone {
  id: string;
  name: string;
  bounds: Bounds;
  music?: string;
  ambience?: string;
  onEnter?: () => void;
  onExit?: () => void;
}

// Camera Types
export interface CameraConfig {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  smoothing: number;
  bounds?: Bounds;
}

export interface CameraTarget {
  entity?: any;
  position?: Vector2;
  zoom?: number;
}

// Physics Types
export interface CollisionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PhysicsBody {
  velocity: Vector2;
  acceleration: Vector2;
  mass: number;
  friction: number;
  restitution: number;
  static: boolean;
}

// Pathfinding Types
export interface PathNode {
  x: number;
  y: number;
  g: number;
  h: number;
  f: number;
  parent?: PathNode;
}

export interface PathfindingConfig {
  allowDiagonal: boolean;
  heuristic: 'manhattan' | 'euclidean' | 'chebyshev';
  weight: number;
}

// Asset Types
export interface AssetManifest {
  spritesheets: Record<string, string>;
  textures: Record<string, string>;
  sounds: Record<string, string>;
  fonts: Record<string, string>;
}

export interface SpriteSheetData {
  frames: Record<string, {
    frame: { x: number; y: number; w: number; h: number };
    sourceSize: { w: number; h: number };
    spriteSourceSize: { x: number; y: number; w: number; h: number };
  }>;
  meta: {
    scale: string;
    size: { w: number; h: number };
  };
}

// Particle Types
export interface ParticleConfig {
  lifetime: { min: number; max: number };
  frequency: number;
  spawnChance: number;
  maxParticles: number;
  pos: { x: number; y: number };
  acceleration: { x: number; y: number };
  scale: { start: number; end: number };
  color: { start: string; end: string };
  alpha: { start: number; end: number };
  speed: { start: number; end: number };
  rotation: { start: number; end: number };
}

// Sound Types
export interface SoundConfig {
  volume: number;
  loop: boolean;
  rate: number;
}

// Scene Types
export interface SceneConfig {
  name: string;
  preload?: () => Promise<void>;
  create?: () => void;
  update?: (delta: number) => void;
  destroy?: () => void;
}

// System Types
export interface System {
  priority: number;
  update(delta: number, entities: any[]): void;
  destroy?(): void;
}

// Events
export interface GameEvent {
  type: string;
  data?: any;
}

export type EventListener = (event: GameEvent) => void;

// Performance
export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  drawCalls: number;
  textureMemory: number;
  entityCount: number;
  visibleEntities: number;
}

// Turkish Theme Types
export interface TurkishMotif {
  type: 'laleli' | 'karanfil' | 'gul' | 'cini' | 'hat' | 'geometrik';
  colors: string[];
  pattern: string;
}

export interface CulturalElement {
  category: 'mimari' | 'sanat' | 'muzik' | 'yemek' | 'giyim';
  name: string;
  description: string;
  assetId: string;
}
