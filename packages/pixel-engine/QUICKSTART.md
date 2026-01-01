# Pixel Engine - Quick Start Guide

## Installation

```bash
cd packages/pixel-engine
npm install
npm run build
```

## 5-Minute Setup

### 1. Create HTML Page

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Turk Dijital Metropol</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #1a1a2e;
    }
    #game {
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="game"></canvas>
  <script type="module" src="./game.js"></script>
</body>
</html>
```

### 2. Create Game Script

```typescript
// game.ts
import {
  Engine,
  Scene,
  Character,
  EntityType,
  TileMap
} from '@turk-dijital-metropol/pixel-engine';

// Get canvas
const canvas = document.getElementById('game') as HTMLCanvasElement;

// Create engine
const engine = new Engine(canvas, {
  width: 1280,
  height: 720,
  resolution: window.devicePixelRatio,
  backgroundColor: 0x87ceeb,
  antialias: false,
  autoResize: true,
  targetFPS: 60
});

// Create simple scene
class MyScene extends Scene {
  private player!: Character;

  create() {
    // Create player
    this.player = new Character({
      id: 'player',
      type: EntityType.CHARACTER,
      position: { x: 640, y: 360 },
      speed: 200,
      name: 'Oyuncu'
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
      this.player.moveInDirection(movement);
    } else {
      this.player.stop();
    }
  }
}

// Initialize
async function start() {
  await engine.init();

  const scene = new MyScene('main');
  await engine.loadScene(scene);

  engine.start();

  console.log('Oyun başladı! WASD ile hareket et.');
}

start();
```

### 3. Run

```bash
# Development server (using Vite, etc.)
npm run dev

# Or compile and serve
tsc game.ts && python3 -m http.server
```

## Common Patterns

### Add NPC with AI

```typescript
const npc = new Character({
  id: 'npc1',
  type: EntityType.CHARACTER,
  position: { x: 400, y: 300 },
  speed: 100,
  name: 'Simitçi'
});

this.addEntity('npc1', npc, 2);

// Simple wandering AI
setInterval(() => {
  const direction = {
    x: Math.random() - 0.5,
    y: Math.random() - 0.5
  };
  npc.moveInDirection(direction);
  setTimeout(() => npc.stop(), 2000);
}, 5000);
```

### Add Building

```typescript
const mosque = new Building({
  id: 'mosque',
  type: EntityType.BUILDING,
  position: { x: 800, y: 400 },
  tileset: 'buildings',
  width: 200,
  height: 200,
  interactive: true
});

mosque.onClick(() => {
  console.log('Camiye girdiniz!');
});

this.addEntity('mosque', mosque, 1);
```

### Camera Controls

```typescript
const camera = engine.getCamera();

// Follow player
camera.follow(player);

// Zoom controls
camera.setZoom(2);  // 2x zoom

// Mouse wheel zoom
const wheel = input.getMouseWheel();
if (wheel !== 0) {
  camera.setZoom(camera.getZoom() - wheel * 0.001);
}

// Shake on damage
player.takeDamage(10);
camera.shake(15, 300);
```

### Create Tilemap

```typescript
const tilemap = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  width: 50,
  height: 50,
  layers: [
    {
      name: 'ground',
      data: generateGroundLayer(50, 50),
      visible: true,
      opacity: 1,
      zIndex: 0
    }
  ]
});

// Register tiles
tilemap.registerTile(1, grassTexture);
tilemap.registerTile(2, stoneTexture);

// Add to scene
this.getLayer(0)?.addChild(tilemap.getContainer());

// Generate simple layer
function generateGroundLayer(w: number, h: number): number[][] {
  return Array(h).fill(null).map(() =>
    Array(w).fill(null).map(() => Math.random() > 0.5 ? 1 : 2)
  );
}
```

### Handle Interactions

```typescript
update(delta: number) {
  super.update(delta);

  const input = engine.getInput();

  // Interact with E key
  if (input.isKeyJustPressed('interact')) {
    const playerPos = this.player.getPosition();
    const range = 50;

    // Find nearby entities
    this.getAllEntities().forEach(entity => {
      if (entity === this.player) return;

      const pos = entity.getPosition();
      const distance = Math.sqrt(
        Math.pow(pos.x - playerPos.x, 2) +
        Math.pow(pos.y - playerPos.y, 2)
      );

      if (distance < range) {
        console.log(`Interacting with: ${entity.getId()}`);
      }
    });
  }
}
```

### Pathfinding

```typescript
import { PathFinding } from '@turk-dijital-metropol/pixel-engine';

const pathfinding = new PathFinding({
  allowDiagonal: true,
  heuristic: 'manhattan'
});

const path = pathfinding.findPath(
  npc.getPosition(),
  player.getPosition(),
  collisionMap,
  mapWidth,
  mapHeight
);

if (path) {
  // Move NPC along path
  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep >= path.length) {
      clearInterval(interval);
      return;
    }

    const target = path[currentStep];
    // Move towards target
    currentStep++;
  }, 100);
}
```

### Performance Monitoring

```typescript
setInterval(() => {
  const metrics = engine.getMetrics();

  document.getElementById('fps').textContent = `${metrics.fps} FPS`;
  document.getElementById('entities').textContent =
    `${metrics.visibleEntities}/${metrics.entityCount}`;
}, 1000);
```

## Turkish Theme Example

```typescript
import { ZoneManager } from '@turk-dijital-metropol/pixel-engine';

const zoneManager = new ZoneManager();

// Create Istanbul zones
zoneManager.registerZone({
  id: 'sultanahmet',
  name: 'Sultanahmet',
  bounds: { x: 0, y: 0, width: 500, height: 500 },
  music: 'ottoman_ambient',
  onEnter: () => {
    console.log('Sultanahmet\'e hoş geldiniz!');
  }
});

zoneManager.registerZone({
  id: 'bogazici',
  name: 'Boğaziçi',
  bounds: { x: 0, y: 500, width: 1000, height: 300 },
  music: 'sea_waves',
  onEnter: () => {
    console.log('Boğaz manzarası...');
  }
});

// Update in game loop
update(delta: number) {
  super.update(delta);
  zoneManager.update(this.player.x, this.player.y);
}
```

## Tips

1. **Use layers**: Ground (0), Objects (1), Characters (2), Overlay (3)
2. **Cache static buildings**: Automatically done for Building entities
3. **Batch entities**: Keep similar entities in same layer
4. **Limit updates**: Only update active entities
5. **Use chunk loading**: For worlds > 100x100 tiles

## Common Issues

### Low FPS
- Check entity count: `metrics.entityCount`
- Enable frustum culling (automatic in RenderSystem)
- Use chunk loading for large maps
- Cache static content

### Input not working
- Ensure canvas has focus
- Check browser console for errors
- Use `isKeyPressed()` not direct key events

### Camera not following
- Call `camera.follow(entity)` after creating entity
- Ensure entity has `x` and `y` properties
- Set as main entity: `scene.setMainEntity(player)`

## Next Steps

1. Add sprite textures from files
2. Implement sound effects
3. Create custom animations
4. Build multi-level scenes
5. Add particle effects

See `README.md` for full API documentation.
See `example.ts` for complete game example.
