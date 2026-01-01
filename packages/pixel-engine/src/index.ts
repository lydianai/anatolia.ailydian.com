/**
 * TURK DIJITAL METROPOL - Pixel Art Game Engine
 * High-performance PixiJS-based engine for Turkish-themed games
 *
 * @module @turk-dijital-metropol/pixel-engine
 */

// Core
export { Engine } from './core/Engine.js';
export { Renderer } from './core/Renderer.js';
export { Scene } from './core/Scene.js';
export { Camera } from './core/Camera.js';
export { InputManager } from './core/InputManager.js';

// Entities
export { Entity } from './entities/Entity.js';
export { Character } from './entities/Character.js';
export { Building } from './entities/Building.js';
export { Interactive } from './entities/Interactive.js';
export { Animated } from './entities/Animated.js';

// Systems
export { AnimationSystem } from './systems/AnimationSystem.js';
export { MovementSystem } from './systems/MovementSystem.js';
export { RenderSystem } from './systems/RenderSystem.js';
export { PhysicsSystem } from './systems/PhysicsSystem.js';

// World
export { TileMap } from './world/TileMap.js';
export { ChunkManager } from './world/ChunkManager.js';
export { WorldGenerator } from './world/WorldGenerator.js';
export { ZoneManager } from './world/ZoneManager.js';

// Utils
export { AssetLoader } from './utils/AssetLoader.js';
export { SpriteSheetParser } from './utils/SpriteSheet.js';
export { PathFinding } from './utils/PathFinding.js';
export { CollisionDetection } from './utils/CollisionDetection.js';

// Types
export type {
  Vector2,
  Bounds,
  Transform,
  EngineConfig,
  EntityConfig,
  CharacterConfig,
  BuildingConfig,
  AnimationConfig,
  TileMapConfig,
  TileLayer,
  Chunk,
  Zone,
  CameraConfig,
  PathNode,
  PathfindingConfig,
  AssetManifest,
  SpriteSheetData,
  PerformanceMetrics,
  TurkishMotif,
  CulturalElement,
  KeyState,
  MouseState,
  TouchState,
  System,
  GameEvent,
  EventListener
} from './types/index.js';

export {
  EntityType,
  AnimationState,
  Direction
} from './types/index.js';
