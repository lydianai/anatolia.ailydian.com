# @turk-dijital-metropol/pixel-engine

High-performance PixiJS-based pixel art game engine for Turkish Digital Metropol. Built for 60 FPS gameplay with advanced features like chunk loading, pathfinding, and Turkish-themed content.

## Features

- **60 FPS Guaranteed** - Fixed timestep game loop with performance monitoring
- **Dynamic Loading** - Chunk-based world loading for large maps
- **Sprite Batching** - Optimized rendering with frustum culling
- **Camera System** - Smooth follow, zoom, pan, and shake effects
- **Input Handling** - WASD movement, mouse, and touch support
- **Animation System** - 8-directional sprite animations
- **Collision Detection** - AABB, circle, tile-based, and swept collision
- **Pathfinding** - A* algorithm for NPC navigation
- **Turkish Themes** - Built-in support for Turkish motifs and cultural elements
- **Sound System** - Ambient music and sound effects
- **Zone Management** - Different areas with unique properties

## Installation

```bash
npm install @turk-dijital-metropol/pixel-engine
```

## Quick Start

```typescript
import { Engine, Scene, Character, EntityType, Direction } from '@turk-dijital-metropol/pixel-engine';

// Create canvas
const canvas = document.getElementById('game') as HTMLCanvasElement;

// Initialize engine
const engine = new Engine(canvas, {
  width: 1280,
  height: 720,
  resolution: window.devicePixelRatio,
  backgroundColor: 0x1a1a2e,
  antialias: false,
  autoResize: true,
  targetFPS: 60
});

await engine.init();

// Create scene
class GameScene extends Scene {
  private player!: Character;

  async preload() {
    // Load assets
  }

  create() {
    // Create player
    this.player = new Character({
      id: 'player',
      type: EntityType.CHARACTER,
      position: { x: 640, y: 360 },
      speed: 200,
      health: 100,
      maxHealth: 100,
      name: 'Mehmet',
      animations: {}
    });

    this.addEntity('player', this.player, 2);
    this.setMainEntity(this.player);
  }

  update(delta: number) {
    super.update(delta);

    // Handle input
    const input = engine.getInput();
    const movement = input.getMovementVector();

    if (movement.x !== 0 || movement.y !== 0) {
      const sprint = input.isKeyPressed('sprint');
      this.player.moveInDirection(movement, sprint);
    } else {
      this.player.stop();
    }
  }
}

// Load scene
const scene = new GameScene('main');
await engine.loadScene(scene);

// Start engine
engine.start();
```

## Core Systems

### Engine

Main engine class managing rendering, scenes, and game loop.

```typescript
const engine = new Engine(canvas, config);
await engine.init();
engine.start();
```

### Camera

Camera with smooth following, zoom, and bounds.

```typescript
const camera = engine.getCamera();
camera.follow(player);
camera.setZoom(2);
camera.setBounds({ x: 0, y: 0, width: 2000, height: 2000 });
camera.shake(10, 500); // Intensity, duration
```

### Input

Unified input management for keyboard, mouse, and touch.

```typescript
const input = engine.getInput();

// Keyboard
if (input.isKeyPressed('up')) { /* ... */ }
if (input.isKeyJustPressed('interact')) { /* ... */ }

// Mouse
const mousePos = input.getMouseWorldPosition();
if (input.isMouseButtonPressed(0)) { /* ... */ }

// Movement
const movement = input.getMovementVector(); // Normalized WASD vector
```

## Entities

### Character

Player/NPC with animations, health, and movement.

```typescript
const character = new Character({
  id: 'npc1',
  type: EntityType.CHARACTER,
  position: { x: 100, y: 100 },
  speed: 150,
  health: 100,
  name: 'Ayşe'
});

character.moveInDirection({ x: 1, y: 0 }, false);
character.takeDamage(10);
character.heal(5);
```

### Building

Static building with optional interactivity.

```typescript
const building = new Building({
  id: 'mosque1',
  type: EntityType.BUILDING,
  position: { x: 500, y: 500 },
  tileset: 'buildings',
  width: 128,
  height: 128,
  interactive: true
});

building.onClick(() => {
  console.log('Mosque clicked!');
});
```

### Interactive

Clickable objects with hover effects.

```typescript
const door = new Interactive({
  id: 'door1',
  type: EntityType.INTERACTIVE,
  position: { x: 200, y: 200 }
});

door.onInteract(() => {
  console.log('Door opened!');
});
```

## World

### TileMap

Tile-based world with layers and collision.

```typescript
const tilemap = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  width: 100,
  height: 100,
  layers: [
    {
      name: 'ground',
      data: tileData,
      visible: true,
      opacity: 1,
      zIndex: 0
    }
  ]
});

tilemap.registerTile(1, grassTexture, false);
tilemap.registerTile(2, wallTexture, true); // collision

const hasCollision = tilemap.hasCollision(64, 64);
```

### ChunkManager

Dynamic chunk loading for large worlds.

```typescript
const chunkManager = new ChunkManager(16); // 16x16 tiles per chunk

// Update based on camera
const visibleBounds = camera.getVisibleBounds();
chunkManager.updateLoadedChunks(visibleBounds);
```

### WorldGenerator

Procedural Turkish-themed world generation.

```typescript
const generator = new WorldGenerator(12345);

// Generate chunk
const tiles = generator.generateChunk(0, 0, 16);

// Generate structures
const mosque = generator.generateStructure('mosque');
const bazaar = generator.generateStructure('bazaar');
const hamam = generator.generateStructure('hamam');
const cayBahcesi = generator.generateStructure('cay_bahcesi');
```

### ZoneManager

Manage different world zones.

```typescript
const zoneManager = new ZoneManager();

zoneManager.registerZone({
  id: 'sultanahmet',
  name: 'Sultanahmet Meydanı',
  bounds: { x: 0, y: 0, width: 500, height: 500 },
  music: 'ottoman_ambient',
  onEnter: () => console.log('Entered Sultanahmet!'),
  onExit: () => console.log('Left Sultanahmet!')
});

// Update based on player position
zoneManager.update(player.x, player.y);
```

## Utilities

### PathFinding

A* pathfinding for NPC movement.

```typescript
const pathfinding = new PathFinding({
  allowDiagonal: true,
  heuristic: 'manhattan',
  weight: 1
});

const path = pathfinding.findPath(
  { x: 0, y: 0 },
  { x: 10, y: 10 },
  collisionMap,
  gridWidth,
  gridHeight
);

const smoothPath = pathfinding.smoothPath(path, collisionMap, gridWidth, gridHeight);
```

### CollisionDetection

Various collision detection methods.

```typescript
import { CollisionDetection } from '@turk-dijital-metropol/pixel-engine';

// AABB
const collides = CollisionDetection.aabb(boundsA, boundsB);

// Circle
const circleCollides = CollisionDetection.circle(
  { x: 100, y: 100, radius: 20 },
  { x: 120, y: 100, radius: 20 }
);

// Tile-based
const tileCollision = CollisionDetection.tileCollision(
  { x: 100, y: 100 },
  { x: 32, y: 32 },
  32,
  collisionMap
);

// Spatial hashing for broadphase
const hash = CollisionDetection.spatialHash(entities, 64);
```

### AssetLoader

Load and manage game assets.

```typescript
const loader = new AssetLoader();

await loader.loadManifest({
  spritesheets: {
    'characters': '/assets/characters.json'
  },
  textures: {
    'grass': '/assets/grass.png'
  },
  sounds: {
    'ezan': '/assets/ezan.mp3'
  },
  fonts: {
    'ottoman': '/assets/ottoman.ttf'
  }
}, (progress) => {
  console.log(`Loading: ${progress * 100}%`);
});

const texture = loader.getTexture('grass');
```

## Turkish Themes

The engine includes built-in support for Turkish cultural elements:

- **Zones**: Sultanahmet, Taksim, Boğaz, Kapalı Çarşı
- **Structures**: Mosque, Bazaar, Hamam, Çay Bahçesi
- **Motifs**: Laleli, Karanfil, Gül, Çini, Hat, Geometrik patterns
- **Sounds**: Ezan, Ney, Bazaar ambient, Bosphorus waves

## Performance

The engine is optimized for 60 FPS:

- Fixed timestep game loop
- Frustum culling
- Sprite batching
- Object pooling
- Dynamic chunk loading
- LOD (Level of Detail) support

```typescript
// Get performance metrics
const metrics = engine.getMetrics();
console.log(`FPS: ${metrics.fps}`);
console.log(`Draw Calls: ${metrics.drawCalls}`);
console.log(`Visible Entities: ${metrics.visibleEntities}/${metrics.entityCount}`);
```

## API Reference

Full TypeScript definitions included. All classes and methods are fully typed and documented.

## License

MIT

## Credits

Built for Turkish Digital Metropol with PixiJS 8.
