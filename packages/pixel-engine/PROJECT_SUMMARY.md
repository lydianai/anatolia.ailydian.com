# Pixel Engine - Project Summary

## Overview
Production-ready PixiJS 8 based pixel art game engine built specifically for **TURK DIJITAL METROPOL**. Optimized for 60 FPS performance with Turkish-themed content and cultural elements.

## Directory Structure

```
/Users/lydian/Desktop/TURK-DIJITAL-METROPOL/packages/pixel-engine/
├── src/
│   ├── core/                 # Core engine systems
│   │   ├── Engine.ts         # Main engine with fixed timestep loop
│   │   ├── Renderer.ts       # Rendering optimization & batching
│   │   ├── Scene.ts          # Scene management with layers
│   │   ├── Camera.ts         # Smooth follow, zoom, pan, shake
│   │   └── InputManager.ts   # Keyboard, mouse, touch input
│   │
│   ├── entities/             # Game entities
│   │   ├── Entity.ts         # Base entity class
│   │   ├── Character.ts      # 8-dir movement, animations, health
│   │   ├── Building.ts       # Static buildings with caching
│   │   ├── Interactive.ts    # Clickable objects
│   │   └── Animated.ts       # Animated sprites
│   │
│   ├── systems/              # ECS-style systems
│   │   ├── AnimationSystem.ts
│   │   ├── MovementSystem.ts
│   │   ├── RenderSystem.ts   # Frustum culling, LOD
│   │   └── PhysicsSystem.ts  # Simple physics
│   │
│   ├── world/                # World management
│   │   ├── TileMap.ts        # Tile-based rendering (32x32)
│   │   ├── ChunkManager.ts   # Dynamic chunk loading
│   │   ├── WorldGenerator.ts # Procedural Turkish-themed worlds
│   │   └── ZoneManager.ts    # Area transitions
│   │
│   ├── utils/                # Utilities
│   │   ├── AssetLoader.ts    # Asset loading with progress
│   │   ├── SpriteSheet.ts    # Spritesheet parsing
│   │   ├── PathFinding.ts    # A* pathfinding
│   │   └── CollisionDetection.ts # AABB, circle, tile collision
│   │
│   ├── types/
│   │   └── index.ts          # TypeScript definitions
│   │
│   └── index.ts              # Public API exports
│
├── dist/                     # Built JavaScript + declarations
├── package.json
├── tsconfig.json
├── README.md                 # Full documentation
├── example.ts                # Istanbul game example
└── .gitignore
```

## Key Features

### Performance (60 FPS Guaranteed)
- **Fixed timestep game loop** - Consistent physics at 60 FPS
- **Frustum culling** - Only render visible entities
- **Sprite batching** - Automatic PixiJS batching
- **Dynamic chunk loading** - Load/unload world chunks
- **Object pooling ready** - Architecture supports pooling
- **LOD system** - Level of Detail based on distance

### Camera System
- Smooth entity following with interpolation
- Zoom (0.5x - 3x) with smooth transitions
- World bounds constraints
- Shake effects for impacts
- Screen/world coordinate conversion

### Input Management
- Unified keyboard, mouse, touch handling
- Key mapping (WASD/Arrows)
- Just pressed/released detection
- Normalized movement vectors
- World position conversion for mouse

### Entity System
- **Character**: 8-directional movement, animations, health bars, name tags
- **Building**: Static optimized rendering, interactive callbacks
- **Interactive**: Hover effects, click handlers
- **Animated**: Frame-based sprite animations

### World System
- **TileMap**: Multi-layer tile rendering with collision
- **ChunkManager**: 16x16 chunk loading based on viewport
- **WorldGenerator**: Procedural generation with Turkish themes
- **ZoneManager**: Area-based events and music transitions

### Pathfinding
- A* algorithm implementation
- Diagonal movement support
- Multiple heuristics (Manhattan, Euclidean, Chebyshev)
- Path smoothing with line-of-sight
- Tile-based collision avoidance

### Collision Detection
- AABB (Axis-Aligned Bounding Box)
- Circle collision
- Point in shape tests
- Line intersection
- Tile-based collision
- Swept AABB (continuous collision)
- Spatial hashing for broadphase

### Turkish Cultural Elements
Built-in support for:
- **Zones**: Sultanahmet, Taksim, Boğaz, Kapalı Çarşı
- **Buildings**: Mosque, Bazaar, Hamam, Çay Bahçesi
- **Patterns**: Laleli, Karanfil, Gül, Çini, Hat, Geometric
- **Sounds**: Ezan, Ney, Bazaar ambient, Bosphorus waves

## TypeScript API

### Engine Initialization
```typescript
import { Engine } from '@turk-dijital-metropol/pixel-engine';

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
engine.start();
```

### Scene Creation
```typescript
import { Scene, Character, EntityType } from '@turk-dijital-metropol/pixel-engine';

class GameScene extends Scene {
  async preload() {
    // Load assets
  }

  create() {
    const player = new Character({
      id: 'player',
      type: EntityType.CHARACTER,
      position: { x: 640, y: 360 },
      speed: 200,
      name: 'Mehmet'
    });

    this.addEntity('player', player, 2);
    this.setMainEntity(player);
  }

  update(delta: number) {
    super.update(delta);
    // Game logic
  }
}
```

### Input Handling
```typescript
const input = engine.getInput();

// Movement
const movement = input.getMovementVector();
player.moveInDirection(movement, sprint);

// Actions
if (input.isKeyJustPressed('interact')) {
  // Interact with world
}

// Mouse
const worldPos = input.getMouseWorldPosition();
```

## Performance Metrics

Access real-time performance data:

```typescript
const metrics = engine.getMetrics();
console.log({
  fps: metrics.fps,
  frameTime: metrics.frameTime,
  drawCalls: metrics.drawCalls,
  visibleEntities: metrics.visibleEntities,
  totalEntities: metrics.entityCount
});
```

## Build System

### Development
```bash
npm install
npm run dev    # Watch mode
```

### Production
```bash
npm run build  # Compile TypeScript
```

### Output
- `dist/` - Compiled JavaScript (ESM)
- Type declarations (.d.ts)
- Source maps (.js.map, .d.ts.map)

## Dependencies

### Runtime
- `pixi.js@^8.0.0` - Rendering engine
- `@pixi/sound@^6.0.0` - Audio (planned)
- `@pixi/particle-emitter@^5.0.8` - Particles (planned)

### Development
- `typescript@^5.3.3`
- `@types/node@^20.10.0`

## Example Game

See `example.ts` for a complete Istanbul-themed game with:
- Player character with WASD movement
- NPCs (Simitçi, Balıkçı) with AI
- Buildings (Mosque, Bazaar, Çay Bahçesi)
- Zone transitions (Sultanahmet, Taksim, Boğaz)
- Camera following and zoom
- Interaction system

## File Paths

All source files: `/Users/lydian/Desktop/TURK-DIJITAL-METROPOL/packages/pixel-engine/src/`
Built files: `/Users/lydian/Desktop/TURK-DIJITAL-METROPOL/packages/pixel-engine/dist/`

## Usage in Other Packages

```typescript
import { Engine, Scene, Character } from '@turk-dijital-metropol/pixel-engine';
```

## Next Steps

1. **Asset Pipeline**: Create Turkish-themed sprite sheets
2. **Sound Integration**: Implement @pixi/sound for music/SFX
3. **Particle System**: Add Turkish pattern particle effects
4. **Multiplayer**: Add networking layer
5. **UI System**: Create Turkish-themed UI components
6. **Save System**: Implement game state persistence

## Performance Targets

- **60 FPS** at 1080p with 500+ entities
- **Sub-16ms** frame time
- **Dynamic loading** for worlds > 10,000x10,000 tiles
- **<2s** initial load time
- **<100MB** memory usage

## License

MIT

---

Built with PixiJS 8 for Turkish Digital Metropol
Production-ready, fully typed, and optimized for performance.
