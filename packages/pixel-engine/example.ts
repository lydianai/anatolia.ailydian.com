/**
 * Example: Turkish Digital Metropol Game
 * Demonstrates the pixel engine with Turkish-themed content
 */

import {
  Engine,
  Scene,
  Character,
  Building,
  Interactive,
  TileMap,
  ZoneManager,
  WorldGenerator,
  AssetLoader,
  PathFinding,
  EntityType,
  type CharacterConfig,
  type BuildingConfig,
  type TileMapConfig
} from './src/index.js';

// Create canvas
const canvas = document.getElementById('game') as HTMLCanvasElement;

// Initialize engine
const engine = new Engine(canvas, {
  width: 1280,
  height: 720,
  resolution: window.devicePixelRatio,
  backgroundColor: 0x87ceeb, // Sky blue
  antialias: false,
  autoResize: true,
  targetFPS: 60
});

// Asset loader
const assetLoader = new AssetLoader();

// Game scene
class IstanbulScene extends Scene {
  private player!: Character;
  private tilemap!: TileMap;
  private zoneManager!: ZoneManager;
  private worldGenerator!: WorldGenerator;
  private npcs: Map<string, Character> = new Map();

  constructor() {
    super('istanbul');
  }

  async preload() {
    console.log('Loading Turkish-themed assets...');

    // Load assets
    await assetLoader.preloadTurkishAssets();

    console.log('Assets loaded!');
  }

  create() {
    // Create world generator
    this.worldGenerator = new WorldGenerator(42);

    // Create tilemap
    const tilemapConfig: TileMapConfig = {
      tileWidth: 32,
      tileHeight: 32,
      width: 100,
      height: 100,
      layers: [
        {
          name: 'ground',
          data: this.generateGroundLayer(),
          visible: true,
          opacity: 1,
          zIndex: 0
        },
        {
          name: 'objects',
          data: this.generateObjectLayer(),
          visible: true,
          opacity: 1,
          zIndex: 1
        }
      ]
    };

    this.tilemap = new TileMap(tilemapConfig);
    this.getLayer(0)?.addChild(this.tilemap.getContainer());

    // Create player
    this.createPlayer();

    // Create buildings
    this.createBuildings();

    // Create NPCs
    this.createNPCs();

    // Setup zones
    this.setupZones();

    // Set player as main entity (for camera following)
    this.setMainEntity(this.player);

    console.log('Istanbul scene created!');
  }

  private generateGroundLayer(): number[][] {
    const layer: number[][] = [];
    for (let y = 0; y < 100; y++) {
      const row: number[] = [];
      for (let x = 0; x < 100; x++) {
        // Use world generator for procedural terrain
        const noise = this.worldGenerator['noise'](x * 0.1, y * 0.1);
        row.push(noise < 0.5 ? 1 : 2); // Grass or cobblestone
      }
      layer.push(row);
    }
    return layer;
  }

  private generateObjectLayer(): number[][] {
    return Array(100).fill(null).map(() => Array(100).fill(0));
  }

  private createPlayer() {
    const playerConfig: CharacterConfig = {
      id: 'player',
      type: EntityType.CHARACTER,
      position: { x: 640, y: 360 },
      speed: 200,
      health: 100,
      maxHealth: 100,
      name: 'Mehmet',
      animations: {}
    };

    this.player = new Character(playerConfig);
    this.addEntity('player', this.player, 2);
  }

  private createBuildings() {
    // Sultanahmet Camii (Blue Mosque)
    const mosque: BuildingConfig = {
      id: 'sultanahmet_camii',
      type: EntityType.BUILDING,
      position: { x: 500, y: 300 },
      tileset: 'buildings',
      width: 256,
      height: 256,
      interactive: true
    };

    const mosqueEntity = new Building(mosque);
    mosqueEntity.onClick(() => {
      console.log('Sultanahmet Camii\'ne girdiniz!');
    });
    this.addEntity('mosque', mosqueEntity, 1);

    // Kapalı Çarşı (Grand Bazaar)
    const bazaar: BuildingConfig = {
      id: 'kapali_carsi',
      type: EntityType.BUILDING,
      position: { x: 800, y: 400 },
      tileset: 'buildings',
      width: 192,
      height: 128,
      interactive: true
    };

    const bazaarEntity = new Building(bazaar);
    bazaarEntity.onClick(() => {
      console.log('Kapalı Çarşı\'ya hoş geldiniz!');
    });
    this.addEntity('bazaar', bazaarEntity, 1);

    // Çay Bahçesi (Tea Garden)
    const cayBahcesi: BuildingConfig = {
      id: 'cay_bahcesi',
      type: EntityType.BUILDING,
      position: { x: 300, y: 500 },
      tileset: 'buildings',
      width: 128,
      height: 96,
      interactive: true
    };

    const cayBahcesiEntity = new Building(cayBahcesi);
    cayBahcesiEntity.onClick(() => {
      console.log('Çay içmeye buyurun!');
    });
    this.addEntity('cay_bahcesi', cayBahcesiEntity, 1);
  }

  private createNPCs() {
    // Simit satıcısı (Bagel seller)
    const simitci: CharacterConfig = {
      id: 'simitci',
      type: EntityType.CHARACTER,
      position: { x: 400, y: 300 },
      speed: 50,
      health: 100,
      maxHealth: 100,
      name: 'Simitçi Ahmet',
      animations: {}
    };

    const simitciEntity = new Character(simitci);
    this.addEntity('simitci', simitciEntity, 2);
    this.npcs.set('simitci', simitciEntity);

    // Balıkçı (Fisherman)
    const balikci: CharacterConfig = {
      id: 'balikci',
      type: EntityType.CHARACTER,
      position: { x: 200, y: 600 },
      speed: 40,
      health: 100,
      maxHealth: 100,
      name: 'Balıkçı Mustafa',
      animations: {}
    };

    const balikciEntity = new Character(balikci);
    this.addEntity('balikci', balikciEntity, 2);
    this.npcs.set('balikci', balikciEntity);
  }

  private setupZones() {
    this.zoneManager = new ZoneManager();
    this.zoneManager.createTurkishZones();
  }

  override update(delta: number) {
    super.update(delta);

    // Handle player input
    this.handlePlayerInput(delta);

    // Update zones
    this.zoneManager.update(this.player.x, this.player.y);

    // Update NPC AI
    this.updateNPCs(delta);

    // Update camera world position for input
    const camera = engine.getCamera();
    const input = engine.getInput();
    const mousePos = input.getMousePosition();
    const worldPos = camera.screenToWorld(mousePos.x, mousePos.y);
    input.setMouseWorldPosition(worldPos);
  }

  private handlePlayerInput(delta: number) {
    const input = engine.getInput();
    const movement = input.getMovementVector();

    if (movement.x !== 0 || movement.y !== 0) {
      const sprint = input.isKeyPressed('sprint');
      this.player.moveInDirection(movement, sprint);
    } else {
      this.player.stop();
    }

    // Interaction
    if (input.isKeyJustPressed('interact')) {
      this.checkInteractions();
    }

    // Camera zoom with mouse wheel
    const wheel = input.getMouseWheel();
    if (wheel !== 0) {
      const camera = engine.getCamera();
      camera.setZoom(camera.getZoom() - wheel * 0.001);
    }
  }

  private checkInteractions() {
    const playerPos = this.player.getPosition();
    const interactionRange = 50;

    // Check NPCs
    this.npcs.forEach((npc, id) => {
      const npcPos = npc.getPosition();
      const distance = Math.sqrt(
        Math.pow(playerPos.x - npcPos.x, 2) +
        Math.pow(playerPos.y - npcPos.y, 2)
      );

      if (distance < interactionRange) {
        console.log(`${npc['config'].name} ile konuşuyorsunuz!`);
        this.startDialogue(id);
      }
    });
  }

  private startDialogue(npcId: string) {
    switch (npcId) {
      case 'simitci':
        console.log('Simitçi: "Taze simit! Gel al!"');
        break;
      case 'balikci':
        console.log('Balıkçı: "Bugün balık bol, hemen gel!"');
        break;
    }
  }

  private updateNPCs(delta: number) {
    // Simple NPC movement patterns
    this.npcs.forEach((npc, id) => {
      // Random wandering
      if (Math.random() < 0.01) {
        const direction = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        };
        npc.moveInDirection(direction, false);

        // Stop after some time
        setTimeout(() => npc.stop(), 2000);
      }
    });
  }
}

// Initialize and start game
async function startGame() {
  console.log('Türk Dijital Metropol başlatılıyor...');

  // Initialize engine
  await engine.init();

  // Create and load scene
  const scene = new IstanbulScene();
  await engine.loadScene(scene);

  // Configure camera
  const camera = engine.getCamera();
  camera.configure({
    zoom: 1.5,
    minZoom: 0.5,
    maxZoom: 3,
    smoothing: 0.1
  });

  // Set camera bounds to world size
  camera.setBounds({
    x: 0,
    y: 0,
    width: 100 * 32,
    height: 100 * 32
  });

  // Start engine
  engine.start();

  console.log('Oyun başladı! WASD ile hareket et, E ile etkileşim kur.');

  // Performance monitoring
  setInterval(() => {
    const metrics = engine.getMetrics();
    console.log(`FPS: ${metrics.fps} | Entities: ${metrics.visibleEntities}/${metrics.entityCount}`);
  }, 5000);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startGame);
} else {
  startGame();
}

// Export for external use
export { engine, assetLoader };
