/**
 * ANADOLU REALM - Procedural Building System
 * Ottoman, Republican, Modern Architecture with Detailed Interiors
 * Kahvehane, Ev, Dükkân Layouts - Full 3D Generation
 * AI-Powered by AILYDIAN Orchestrator
 */

import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

// BUILDING ENUMS & INTERFACES

export enum ArchitectureStyle {
  OTTOMAN = 'ottoman',           // 1299-1922 (Osmanlı)
  REPUBLICAN = 'republican',     // 1923-1950 (Cumhuriyet)
  MODERN = 'modern',             // 1950+ (Modern)
  NEOCLASSICAL = 'neoclassical', // Neoklasik
  ART_NOUVEAU = 'art_nouveau'    // Art Nouveau (Pera dönemi)
}

export enum BuildingType {
  // Residential
  KONAK = 'konak',               // Ottoman mansion
  YALI = 'yali',                 // Waterfront mansion
  KONUT = 'konut',               // Apartment building
  GECEKONDU = 'gecekondu',       // Shanty house

  // Commercial
  KAHVEHANE = 'kahvehane',       // Coffee house
  CARSي = 'carsi',               // Market/Bazaar
  HAN = 'han',                   // Caravanserai
  DUKKAN = 'dukkan',             // Shop

  // Religious
  CAMI = 'cami',                 // Mosque
  TURBE = 'turbe',               // Tomb
  MEDRESE = 'medrese',           // School

  // Public
  HAMAM = 'hamam',               // Turkish bath
  SEBIL = 'sebil',               // Water fountain
  KERVANSARAY = 'kervansaray'    // Inn
}

export enum RoomFunction {
  // Residential
  SOFA = 'sofa',                 // Main hall (Ottoman)
  SELAMLIK = 'selamlik',         // Men's quarters
  HAREMLIK = 'haremlik',         // Women's quarters
  ODA = 'oda',                   // Room
  MUTFAK = 'mutfak',             // Kitchen
  HAMAM_PRIVATE = 'hamam_private', // Private bathroom

  // Commercial
  KAHVE_SALONU = 'kahve_salonu', // Coffee hall
  OYUN_ODASI = 'oyun_odasi',     // Game room (tavla, okey)
  DEPO = 'depo',                 // Storage

  // Religious
  MESCIT = 'mescit',             // Prayer hall
  AVLU = 'avlu',                 // Courtyard
  MINARE = 'minare'              // Minaret
}

export interface BuildingConfig {
  type: BuildingType;
  style: ArchitectureStyle;
  position: THREE.Vector3;
  rotation: number;

  // Dimensions
  width: number;
  depth: number;
  floors: number;
  floorHeight: number;

  // Appearance
  wallMaterial: WallMaterial;
  roofType: RoofType;
  ornamentLevel: number;        // 0-1 (detail density)

  // Features
  hasBalcony: boolean;
  hasCumba: boolean;            // Bay window (Ottoman)
  hasCourtyard: boolean;
  hasGarden: boolean;

  // Interior
  roomLayout: RoomLayout;
  furnitureDensity: number;     // 0-1
}

export enum WallMaterial {
  WOOD = 'wood',                // Ahşap
  STONE = 'stone',              // Taş
  BRICK = 'brick',              // Tuğla
  CONCRETE = 'concrete',        // Beton
  PLASTER = 'plaster'           // Sıva
}

export enum RoofType {
  FLAT = 'flat',                // Düz dam
  PITCHED = 'pitched',          // Kırma çatı
  DOME = 'dome',                // Kubbe
  HIPPED = 'hipped'             // Kırma kiremit
}

export interface RoomLayout {
  rooms: Room[];
  corridors: Corridor[];
  stairs: Staircase[];
}

export interface Room {
  id: string;
  function: RoomFunction;
  floor: number;
  bounds: THREE.Box3;

  // Openings
  doors: Door[];
  windows: Window[];

  // Interior
  wallTexture: string;
  floorTexture: string;
  ceiling: CeilingType;

  // Furniture
  furniture: FurniturePlacement[];
}

export interface Corridor {
  id: string;
  floor: number;
  path: THREE.Vector3[];
  width: number;
}

export interface Staircase {
  id: string;
  fromFloor: number;
  toFloor: number;
  position: THREE.Vector3;
  width: number;
  steps: number;
}

export interface Door {
  position: THREE.Vector3;
  width: number;
  height: number;
  style: DoorStyle;
  opensTo: string;             // Room ID
}

export interface Window {
  position: THREE.Vector3;
  width: number;
  height: number;
  style: WindowStyle;
  hasShutter: boolean;
}

export enum DoorStyle {
  SIMPLE = 'simple',
  CARVED = 'carved',
  DOUBLE = 'double',
  ARCHED = 'arched'
}

export enum WindowStyle {
  SIMPLE = 'simple',
  CUMBA = 'cumba',              // Ottoman bay window
  ARCHED = 'arched',
  STAINED_GLASS = 'stained_glass'
}

export enum CeilingType {
  FLAT = 'flat',
  VAULTED = 'vaulted',
  COFFERED = 'coffered',
  WOODEN_BEAMS = 'wooden_beams'
}

export interface FurniturePlacement {
  furnitureId: string;
  position: THREE.Vector3;
  rotation: number;
}

export interface Building {
  id: string;
  config: BuildingConfig;
  mesh: THREE.Group;
  interiorMesh: THREE.Group;

  // Metadata
  generatedAt: number;
  triangleCount: number;

  // Collision
  boundingBox: THREE.Box3;
  collisionMesh: THREE.Mesh;
}

// PROCEDURAL BUILDING SYSTEM

export class ProceduralBuildingSystem {
  private buildings: Map<string, Building> = new Map();
  private scene: THREE.Scene;

  // Material library
  private materials: Map<string, THREE.Material> = new Map();

  // Architectural parameters (historically accurate)
  private readonly OTTOMAN_FLOOR_HEIGHT = 3.5;
  private readonly REPUBLICAN_FLOOR_HEIGHT = 3.2;
  private readonly MODERN_FLOOR_HEIGHT = 2.8;

  private readonly GOLDEN_RATIO = 1.618;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.initializeMaterials();

    console.log('🏗️ Procedural Building System initialized');
  }

  
  // MATERIAL INITIALIZATION
  

  private initializeMaterials(): void {
    // Wood materials
    this.materials.set('wood_dark', new THREE.MeshStandardMaterial({
      color: 0x3E2723,
      roughness: 0.8,
      metalness: 0.0
    }));

    this.materials.set('wood_light', new THREE.MeshStandardMaterial({
      color: 0x8D6E63,
      roughness: 0.7,
      metalness: 0.0
    }));

    // Stone materials
    this.materials.set('stone_limestone', new THREE.MeshStandardMaterial({
      color: 0xE0E0E0,
      roughness: 0.9,
      metalness: 0.0
    }));

    this.materials.set('stone_marble', new THREE.MeshStandardMaterial({
      color: 0xF5F5F5,
      roughness: 0.3,
      metalness: 0.1
    }));

    // Brick
    this.materials.set('brick_red', new THREE.MeshStandardMaterial({
      color: 0xA0522D,
      roughness: 0.85,
      metalness: 0.0
    }));

    // Concrete
    this.materials.set('concrete', new THREE.MeshStandardMaterial({
      color: 0xBDBDBD,
      roughness: 0.9,
      metalness: 0.0
    }));

    // Plaster
    this.materials.set('plaster_white', new THREE.MeshStandardMaterial({
      color: 0xFFFAF0,
      roughness: 0.8,
      metalness: 0.0
    }));

    // Roof
    this.materials.set('roof_tile_red', new THREE.MeshStandardMaterial({
      color: 0xB22222,
      roughness: 0.7,
      metalness: 0.0
    }));

    this.materials.set('roof_tile_terracotta', new THREE.MeshStandardMaterial({
      color: 0xCD853F,
      roughness: 0.75,
      metalness: 0.0
    }));

    console.log(`🎨 ${this.materials.size} materials initialized`);
  }

  
  // BUILDING GENERATION
  

  generateBuilding(config: BuildingConfig): Building {
    const buildingId = `building_${Date.now()}_${Math.random()}`;

    // Create main mesh group
    const mesh = new THREE.Group();
    const interiorMesh = new THREE.Group();

    // Generate based on type
    switch (config.type) {
      case BuildingType.KONAK:
        this.generateOttomanMansion(config, mesh, interiorMesh);
        break;
      case BuildingType.KAHVEHANE:
        this.generateKahvehane(config, mesh, interiorMesh);
        break;
      case BuildingType.CAMI:
        this.generateMosque(config, mesh, interiorMesh);
        break;
      case BuildingType.KONUT:
        this.generateApartment(config, mesh, interiorMesh);
        break;
      case BuildingType.HAN:
        this.generateHan(config, mesh, interiorMesh);
        break;
      case BuildingType.DUKKAN:
        this.generateShop(config, mesh, interiorMesh);
        break;
      default:
        this.generateGenericBuilding(config, mesh, interiorMesh);
    }

    // Position
    mesh.position.copy(config.position);
    mesh.rotation.y = config.rotation;

    interiorMesh.position.copy(config.position);
    interiorMesh.rotation.y = config.rotation;

    // Add to scene
    this.scene.add(mesh);

    // Calculate bounding box
    const boundingBox = new THREE.Box3().setFromObject(mesh);

    // Create collision mesh
    const collisionGeometry = new THREE.BoxGeometry(
      config.width,
      config.floors * config.floorHeight,
      config.depth
    );
    const collisionMesh = new THREE.Mesh(
      collisionGeometry,
      new THREE.MeshBasicMaterial({ visible: false })
    );
    collisionMesh.position.copy(config.position);

    // Count triangles
    let triangleCount = 0;
    mesh.traverse(child => {
      if (child instanceof THREE.Mesh) {
        triangleCount += child.geometry.index
          ? child.geometry.index.count / 3
          : child.geometry.attributes.position.count / 3;
      }
    });

    const building: Building = {
      id: buildingId,
      config,
      mesh,
      interiorMesh,
      generatedAt: Date.now(),
      triangleCount,
      boundingBox,
      collisionMesh
    };

    this.buildings.set(buildingId, building);

    console.log(`🏗️ Building generated: ${config.type} (${triangleCount.toLocaleString()} triangles)`);

    return building;
  }

  
  // OTTOMAN MANSION (KONAK)
  

  private generateOttomanMansion(
    config: BuildingConfig,
    mesh: THREE.Group,
    interiorMesh: THREE.Group
  ): void {
    const floors = config.floors || 3;
    const floorHeight = this.OTTOMAN_FLOOR_HEIGHT;

    // Ground floor - Stone base
    const baseGeometry = new THREE.BoxGeometry(config.width, 0.5, config.depth);
    const baseMesh = new THREE.Mesh(baseGeometry, this.materials.get('stone_limestone'));
    baseMesh.position.y = 0.25;
    mesh.add(baseMesh);

    // Main structure
    for (let floor = 0; floor < floors; floor++) {
      const y = 0.5 + floor * floorHeight;

      // Walls
      this.createWalls(
        mesh,
        config.width,
        config.depth,
        floorHeight,
        y,
        floor === 0 ? 'stone_limestone' : 'wood_dark'
      );

      // Cumba (bay windows) on upper floors
      if (floor > 0 && config.hasCumba) {
        this.createCumba(mesh, config.width, config.depth, y, floorHeight);
      }

      // Windows - Ottoman style
      this.createOttomanWindows(mesh, config.width, config.depth, y, floorHeight, floor);

      // Interior rooms
      this.generateOttomanInterior(interiorMesh, config, floor, y, floorHeight);
    }

    // Roof - Hipped with overhanging eaves
    this.createOttomanRoof(mesh, config.width, config.depth, floors * floorHeight);

    // Ornaments
    if (config.ornamentLevel > 0.5) {
      this.addOttomanOrnaments(mesh, config);
    }
  }

  private createCumba(
    mesh: THREE.Group,
    width: number,
    depth: number,
    y: number,
    height: number
  ): void {
    const cumbaWidth = width * 0.4;
    const cumbaDepth = 0.8;
    const cumbaGeometry = new THREE.BoxGeometry(cumbaWidth, height, cumbaDepth);

    // Front cumba
    const cumba = new THREE.Mesh(cumbaGeometry, this.materials.get('wood_light'));
    cumba.position.set(0, y + height / 2, depth / 2 + cumbaDepth / 2);
    mesh.add(cumba);

    // Windows on cumba
    for (let i = 0; i < 3; i++) {
      const windowGeometry = new THREE.PlaneGeometry(0.6, 1.2);
      const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.7
      });
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(
        (i - 1) * (cumbaWidth / 3),
        y + height / 2,
        depth / 2 + cumbaDepth + 0.01
      );
      mesh.add(window);
    }
  }

  private createOttomanWindows(
    mesh: THREE.Group,
    width: number,
    depth: number,
    y: number,
    height: number,
    floor: number
  ): void {
    const windowWidth = 0.8;
    const windowHeight = 1.6;
    const windowsPerSide = floor === 0 ? 2 : 3;

    const windowGeometry = new THREE.PlaneGeometry(windowWidth, windowHeight);
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.7
    });

    // Front & back
    for (let side = 0; side < 2; side++) {
      const z = side === 0 ? depth / 2 : -depth / 2;
      const rotation = side === 0 ? 0 : Math.PI;

      for (let i = 0; i < windowsPerSide; i++) {
        const window = new THREE.Mesh(windowGeometry, windowMaterial);
        const spacing = width / (windowsPerSide + 1);
        window.position.set(
          -width / 2 + spacing * (i + 1),
          y + height / 2,
          z + (side === 0 ? 0.01 : -0.01)
        );
        window.rotation.y = rotation;
        mesh.add(window);
      }
    }
  }

  private createOttomanRoof(
    mesh: THREE.Group,
    width: number,
    depth: number,
    buildingHeight: number
  ): void {
    const roofHeight = 2.5;
    const overhang = 0.8;

    // Hipped roof (4 slopes)
    const roofGeometry = new THREE.ConeGeometry(
      Math.max(width, depth) / 2 + overhang,
      roofHeight,
      4
    );
    const roofMaterial = this.materials.get('roof_tile_terracotta');
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = buildingHeight + roofHeight / 2;
    roof.rotation.y = Math.PI / 4;
    mesh.add(roof);
  }

  private addOttomanOrnaments(mesh: THREE.Group, config: BuildingConfig): void {
    // Add decorative elements (simplified)
    // In production, these would be detailed carved patterns
  }

  private generateOttomanInterior(
    mesh: THREE.Group,
    config: BuildingConfig,
    floor: number,
    y: number,
    height: number
  ): void {
    // Generate rooms based on Ottoman layout
    if (floor === 0) {
      // Ground floor: Selamlık (men's quarters)
      this.createRoom(mesh, -config.width / 4, y, 0, config.width / 2, height, config.depth / 2);
    } else if (floor === 1) {
      // First floor: Haremlik (women's quarters)
      this.createRoom(mesh, config.width / 4, y, 0, config.width / 2, height, config.depth / 2);
    } else {
      // Upper floors: Private rooms
      this.createRoom(mesh, 0, y, 0, config.width * 0.8, height, config.depth * 0.8);
    }
  }

  
  // KAHVEHANE (COFFEE HOUSE)
  

  private generateKahvehane(
    config: BuildingConfig,
    mesh: THREE.Group,
    interiorMesh: THREE.Group
  ): void {
    const width = config.width || 12;
    const depth = config.depth || 10;
    const height = config.floorHeight || 3.5;

    // Main structure
    this.createWalls(mesh, width, depth, height, 0, 'brick_red');

    // Large windows for street visibility
    this.createLargeWindows(mesh, width, depth, height);

    // Entrance with awning
    this.createEntranceAwning(mesh, width, depth);

    // Interior layout
    this.generateKahvehaneInterior(interiorMesh, width, depth, height);

    // Roof - Flat with small parapet
    this.createFlatRoof(mesh, width, depth, height);
  }

  private generateKahvehaneInterior(
    mesh: THREE.Group,
    width: number,
    depth: number,
    height: number
  ): void {
    // Main seating area (80% of space)
    const mainArea = this.createRoom(
      mesh,
      0, 0, 0,
      width * 0.8, height, depth * 0.8
    );

    // Tavla tables (4-6 tables)
    for (let i = 0; i < 6; i++) {
      const x = (i % 3 - 1) * (width / 4);
      const z = Math.floor(i / 3) * (depth / 3) - depth / 4;
      this.placeTavlaTable(mesh, x, 0, z);
    }

    // Tea counter
    this.createTeaCounter(mesh, -width / 2 + 1, 0, 0);

    // Nargile corner
    this.createNargileCorner(mesh, width / 2 - 1.5, 0, depth / 2 - 1.5);
  }

  private placeTavlaTable(mesh: THREE.Group, x: number, y: number, z: number): void {
    // Table
    const tableGeometry = new THREE.BoxGeometry(1, 0.05, 1);
    const tableMaterial = this.materials.get('wood_dark');
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(x, y + 0.7, z);
    mesh.add(table);

    // 4 chairs
    const chairPositions = [
      [x + 0.6, y, z],
      [x - 0.6, y, z],
      [x, y, z + 0.6],
      [x, y, z - 0.6]
    ];

    chairPositions.forEach(pos => {
      const chair = this.createSimpleChair();
      chair.position.set(pos[0], pos[1], pos[2]);
      mesh.add(chair);
    });
  }

  private createTeaCounter(mesh: THREE.Group, x: number, y: number, z: number): void {
    const counterGeometry = new THREE.BoxGeometry(0.8, 1, 3);
    const counterMaterial = this.materials.get('wood_light');
    const counter = new THREE.Mesh(counterGeometry, counterMaterial);
    counter.position.set(x, y + 0.5, z);
    mesh.add(counter);

    // Semaver (tea urn)
    const semaverGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.5);
    const semaverMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 0.8 });
    const semaver = new THREE.Mesh(semaverGeometry, semaverMaterial);
    semaver.position.set(x, y + 1.25, z);
    mesh.add(semaver);
  }

  private createNargileCorner(mesh: THREE.Group, x: number, y: number, z: number): void {
    // Low seating
    const cushionGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2);
    const cushionMaterial = new THREE.MeshStandardMaterial({ color: 0xDC143C });

    for (let i = 0; i < 4; i++) {
      const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
      const angle = (i / 4) * Math.PI * 2;
      cushion.position.set(
        x + Math.cos(angle) * 0.8,
        y + 0.1,
        z + Math.sin(angle) * 0.8
      );
      mesh.add(cushion);
    }
  }

  
  // MOSQUE (CAMİ)
  

  private generateMosque(
    config: BuildingConfig,
    mesh: THREE.Group,
    interiorMesh: THREE.Group
  ): void {
    const width = config.width || 20;
    const depth = config.depth || 20;
    const wallHeight = 10;

    // Main prayer hall - Square base
    this.createWalls(mesh, width, depth, wallHeight, 0, 'stone_limestone');

    // Central dome
    this.createDome(mesh, width, depth, wallHeight);

    // Minarets (1-4 depending on importance)
    const minaretCount = config.ornamentLevel > 0.7 ? 4 : config.ornamentLevel > 0.5 ? 2 : 1;
    this.createMinarets(mesh, width, depth, minaretCount);

    // Courtyard
    if (config.hasCourtyard) {
      this.createMosqueCourtyard(mesh, width, depth);
    }

    // Interior
    this.generateMosqueInterior(interiorMesh, width, depth, wallHeight);
  }

  private createDome(
    mesh: THREE.Group,
    width: number,
    depth: number,
    baseHeight: number
  ): void {
    const domeRadius = Math.min(width, depth) / 2;
    const domeGeometry = new THREE.SphereGeometry(domeRadius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMaterial = this.materials.get('stone_marble');
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = baseHeight;
    mesh.add(dome);
  }

  private createMinarets(
    mesh: THREE.Group,
    width: number,
    depth: number,
    count: number
  ): void {
    const positions: [number, number][] = [];

    if (count === 1) {
      positions.push([width / 2 + 2, -depth / 2 - 2]);
    } else if (count === 2) {
      positions.push(
        [width / 2 + 2, -depth / 2 - 2],
        [-width / 2 - 2, -depth / 2 - 2]
      );
    } else if (count === 4) {
      positions.push(
        [width / 2 + 2, depth / 2 + 2],
        [-width / 2 - 2, depth / 2 + 2],
        [width / 2 + 2, -depth / 2 - 2],
        [-width / 2 - 2, -depth / 2 - 2]
      );
    }

    positions.forEach(([x, z]) => {
      this.createMinaret(mesh, x, z);
    });
  }

  private createMinaret(mesh: THREE.Group, x: number, z: number): void {
    const height = 25;
    const baseRadius = 1;
    const topRadius = 0.8;

    // Main shaft
    const shaftGeometry = new THREE.CylinderGeometry(topRadius, baseRadius, height, 16);
    const shaftMaterial = this.materials.get('stone_marble');
    const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
    shaft.position.set(x, height / 2, z);
    mesh.add(shaft);

    // Balcony (şerefe)
    const balconyGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 16);
    const balcony = new THREE.Mesh(balconyGeometry, shaftMaterial);
    balcony.position.set(x, height * 0.7, z);
    mesh.add(balcony);

    // Spire (alem)
    const spireGeometry = new THREE.ConeGeometry(0.3, 3, 8);
    const spire = new THREE.Mesh(spireGeometry, shaftMaterial);
    spire.position.set(x, height + 1.5, z);
    mesh.add(spire);
  }

  private createMosqueCourtyard(mesh: THREE.Group, width: number, depth: number): void {
    const courtyardSize = Math.max(width, depth) * 1.5;

    // Courtyard walls (low)
    const wallHeight = 2;
    this.createWalls(mesh, courtyardSize, courtyardSize, wallHeight, -1, 'stone_limestone');

    // Şadırvan (ablution fountain) in center
    this.createSadirvan(mesh, 0, 0);
  }

  private createSadirvan(mesh: THREE.Group, x: number, z: number): void {
    const baseGeometry = new THREE.CylinderGeometry(2, 2.5, 0.5, 8);
    const baseMaterial = this.materials.get('stone_marble');
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, 0.25, z);
    mesh.add(base);

    // Dome cover
    const domeGeometry = new THREE.SphereGeometry(1.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const dome = new THREE.Mesh(domeGeometry, baseMaterial);
    dome.position.set(x, 2, z);
    mesh.add(dome);
  }

  private generateMosqueInterior(
    mesh: THREE.Group,
    width: number,
    depth: number,
    height: number
  ): void {
    // Prayer hall
    this.createRoom(mesh, 0, 0, 0, width * 0.9, height, depth * 0.9);

    // Mihrab (prayer niche)
    this.createMihrab(mesh, 0, 0, depth / 2 - 0.5);

    // Minber (pulpit)
    this.createMinber(mesh, width / 4, 0, depth / 2 - 2);
  }

  private createMihrab(mesh: THREE.Group, x: number, y: number, z: number): void {
    const archGeometry = new THREE.BoxGeometry(2, 3, 0.5);
    const archMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.2
    });
    const mihrab = new THREE.Mesh(archGeometry, archMaterial);
    mihrab.position.set(x, y + 1.5, z);
    mesh.add(mihrab);
  }

  private createMinber(mesh: THREE.Group, x: number, y: number, z: number): void {
    // Simplified minber (stairs + platform)
    const platformGeometry = new THREE.BoxGeometry(1.5, 2, 1);
    const platformMaterial = this.materials.get('wood_dark');
    const minber = new THREE.Mesh(platformGeometry, platformMaterial);
    minber.position.set(x, y + 1, z);
    mesh.add(minber);
  }

  
  // HELPER METHODS
  

  private createWalls(
    mesh: THREE.Group,
    width: number,
    depth: number,
    height: number,
    y: number,
    materialKey: string
  ): void {
    const thickness = 0.3;
    const material = this.materials.get(materialKey);

    // Front wall
    const frontGeometry = new THREE.BoxGeometry(width, height, thickness);
    const front = new THREE.Mesh(frontGeometry, material);
    front.position.set(0, y + height / 2, depth / 2);
    mesh.add(front);

    // Back wall
    const back = new THREE.Mesh(frontGeometry, material);
    back.position.set(0, y + height / 2, -depth / 2);
    mesh.add(back);

    // Side walls
    const sideGeometry = new THREE.BoxGeometry(thickness, height, depth);
    const left = new THREE.Mesh(sideGeometry, material);
    left.position.set(-width / 2, y + height / 2, 0);
    mesh.add(left);

    const right = new THREE.Mesh(sideGeometry, material);
    right.position.set(width / 2, y + height / 2, 0);
    mesh.add(right);
  }

  private createRoom(
    mesh: THREE.Group,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number
  ): THREE.Group {
    const room = new THREE.Group();

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(width, depth);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B7355 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(x, y, z);
    room.add(floor);

    // Ceiling
    const ceiling = new THREE.Mesh(floorGeometry, floorMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(x, y + height, z);
    room.add(ceiling);

    mesh.add(room);
    return room;
  }

  private createLargeWindows(
    mesh: THREE.Group,
    width: number,
    depth: number,
    height: number
  ): void {
    const windowGeometry = new THREE.PlaneGeometry(width * 0.7, height * 0.6);
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.6
    });

    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.set(0, height / 2, depth / 2 + 0.01);
    mesh.add(window);
  }

  private createEntranceAwning(mesh: THREE.Group, width: number, depth: number): void {
    const awningGeometry = new THREE.BoxGeometry(width * 0.4, 0.1, 1.5);
    const awningMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
    const awning = new THREE.Mesh(awningGeometry, awningMaterial);
    awning.position.set(0, 2.5, depth / 2 + 0.75);
    mesh.add(awning);
  }

  private createFlatRoof(mesh: THREE.Group, width: number, depth: number, height: number): void {
    const roofGeometry = new THREE.BoxGeometry(width + 0.5, 0.3, depth + 0.5);
    const roofMaterial = this.materials.get('concrete');
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = height + 0.15;
    mesh.add(roof);
  }

  private createSimpleChair(): THREE.Group {
    const chair = new THREE.Group();

    // Seat
    const seatGeometry = new THREE.BoxGeometry(0.4, 0.05, 0.4);
    const seatMaterial = this.materials.get('wood_light');
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.y = 0.4;
    chair.add(seat);

    // Legs (simplified)
    const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4);
    for (let i = 0; i < 4; i++) {
      const leg = new THREE.Mesh(legGeometry, seatMaterial);
      const angle = (i / 4) * Math.PI * 2;
      leg.position.set(Math.cos(angle) * 0.15, 0.2, Math.sin(angle) * 0.15);
      chair.add(leg);
    }

    return chair;
  }

  // Generic building for other types
  private generateGenericBuilding(
    config: BuildingConfig,
    mesh: THREE.Group,
    interiorMesh: THREE.Group
  ): void {
    const height = config.floors * config.floorHeight;
    this.createWalls(mesh, config.width, config.depth, height, 0, 'brick_red');
    this.createFlatRoof(mesh, config.width, config.depth, height);
  }

  private generateApartment = this.generateGenericBuilding;
  private generateHan = this.generateGenericBuilding;
  private generateShop = this.generateKahvehane;

  
  // GETTERS
  

  getBuilding(buildingId: string): Building | undefined {
    return this.buildings.get(buildingId);
  }

  getAllBuildings(): Building[] {
    return Array.from(this.buildings.values());
  }

  removeBuilding(buildingId: string): void {
    const building = this.buildings.get(buildingId);
    if (building) {
      this.scene.remove(building.mesh);
      this.buildings.delete(buildingId);
    }
  }
}

export default ProceduralBuildingSystem;
