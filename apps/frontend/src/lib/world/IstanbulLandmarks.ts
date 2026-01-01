/**
 * ANADOLU REALM - Istanbul Landmarks Generator
 * Procedural 3D models of Istanbul's iconic buildings
 */

import * as THREE from 'three';

export enum LandmarkType {
  HAGIA_SOPHIA = 'hagia_sophia',
  BLUE_MOSQUE = 'blue_mosque',
  GALATA_TOWER = 'galata_tower',
  BOSPHORUS_BRIDGE = 'bosphorus_bridge',
  MAIDEN_TOWER = 'maiden_tower',
  TOPKAPI_PALACE = 'topkapi_palace',
  GRAND_BAZAAR = 'grand_bazaar',
  ORTAKOY_MOSQUE = 'ortakoy_mosque'
}

export interface LandmarkConfig {
  position: THREE.Vector3;
  scale: number;
  rotation: number;
}

export class IstanbulLandmarksGenerator {
  private scene: THREE.Scene;
  private landmarks: Map<string, THREE.Group> = new Map();

  // Istanbul colors
  private readonly COLORS = {
    stone: 0xd4c4a8,
    marble: 0xf5f5dc,
    gold: 0xffd700,
    turquoise: 0x40e0d0,
    red: 0xc41e3a,
    gray: 0x808080,
    darkStone: 0x8b7355
  };

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  // Create Hagia Sophia (Ayasofya)
  createHagiaSophia(config: LandmarkConfig): THREE.Group {
    const group = new THREE.Group();

    // Main dome
    const domeGeometry = new THREE.SphereGeometry(20, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.marble,
      metalness: 0.1,
      roughness: 0.7
    });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = 40;
    group.add(dome);

    // Main building body
    const bodyGeometry = new THREE.BoxGeometry(60, 40, 60);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.stone,
      metalness: 0.1,
      roughness: 0.8
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 20;
    group.add(body);

    // Four minarets
    const minaretPositions = [
      { x: 35, z: 35 },
      { x: 35, z: -35 },
      { x: -35, z: 35 },
      { x: -35, z: -35 }
    ];

    minaretPositions.forEach(pos => {
      const minaret = this.createMinaret(50);
      minaret.position.set(pos.x, 0, pos.z);
      group.add(minaret);
    });

    // Golden crescent on top
    const crescentGeometry = new THREE.TorusGeometry(2, 0.5, 8, 16, Math.PI);
    const crescentMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.gold,
      metalness: 0.9,
      roughness: 0.1,
      emissive: this.COLORS.gold,
      emissiveIntensity: 0.2
    });
    const crescent = new THREE.Mesh(crescentGeometry, crescentMaterial);
    crescent.position.y = 62;
    crescent.rotation.z = Math.PI / 4;
    group.add(crescent);

    // Apply config
    group.position.copy(config.position);
    group.scale.setScalar(config.scale);
    group.rotation.y = config.rotation;

    this.landmarks.set('hagia_sophia', group);
    this.scene.add(group);
    return group;
  }

  // Create Blue Mosque (Sultanahmet Camii)
  createBlueMosque(config: LandmarkConfig): THREE.Group {
    const group = new THREE.Group();

    // Main dome (larger than Hagia Sophia)
    const domeGeometry = new THREE.SphereGeometry(25, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.turquoise,
      metalness: 0.2,
      roughness: 0.6
    });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = 45;
    group.add(dome);

    // Main building
    const bodyGeometry = new THREE.BoxGeometry(70, 45, 70);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.stone,
      metalness: 0.1,
      roughness: 0.8
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 22.5;
    group.add(body);

    // Six minarets (Blue Mosque is famous for having 6)
    const minaretPositions = [
      { x: 40, z: 40 },
      { x: 40, z: -40 },
      { x: -40, z: 40 },
      { x: -40, z: -40 },
      { x: 0, z: 45 },
      { x: 0, z: -45 }
    ];

    minaretPositions.forEach(pos => {
      const minaret = this.createMinaret(55);
      minaret.position.set(pos.x, 0, pos.z);
      group.add(minaret);
    });

    // Courtyard
    const courtyardGeometry = new THREE.PlaneGeometry(100, 100);
    const courtyardMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.marble,
      side: THREE.DoubleSide
    });
    const courtyard = new THREE.Mesh(courtyardGeometry, courtyardMaterial);
    courtyard.rotation.x = -Math.PI / 2;
    courtyard.position.y = 0.1;
    group.add(courtyard);

    group.position.copy(config.position);
    group.scale.setScalar(config.scale);
    group.rotation.y = config.rotation;

    this.landmarks.set('blue_mosque', group);
    this.scene.add(group);
    return group;
  }

  // Create Galata Tower
  createGalataTower(config: LandmarkConfig): THREE.Group {
    const group = new THREE.Group();

    // Main tower (cylindrical)
    const towerGeometry = new THREE.CylinderGeometry(8, 10, 60, 16);
    const towerMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.darkStone,
      metalness: 0.1,
      roughness: 0.9
    });
    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.y = 30;
    group.add(tower);

    // Conical roof
    const roofGeometry = new THREE.ConeGeometry(9, 15, 16);
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.red,
      metalness: 0.3,
      roughness: 0.7
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 67.5;
    group.add(roof);

    // Observation deck
    const deckGeometry = new THREE.CylinderGeometry(9, 9, 3, 16);
    const deckMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.stone,
      metalness: 0.1,
      roughness: 0.8
    });
    const deck = new THREE.Mesh(deckGeometry, deckMaterial);
    deck.position.y = 61.5;
    group.add(deck);

    // Windows (evenly spaced)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const windowGeometry = new THREE.BoxGeometry(1.5, 3, 0.5);
      const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x000033,
        emissive: 0xffff88,
        emissiveIntensity: 0.3
      });
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(
        Math.cos(angle) * 8.5,
        45,
        Math.sin(angle) * 8.5
      );
      window.rotation.y = -angle;
      group.add(window);
    }

    group.position.copy(config.position);
    group.scale.setScalar(config.scale);
    group.rotation.y = config.rotation;

    this.landmarks.set('galata_tower', group);
    this.scene.add(group);
    return group;
  }

  // Create Bosphorus Bridge
  createBosphorusBridge(config: LandmarkConfig): THREE.Group {
    const group = new THREE.Group();

    // Main bridge deck
    const deckGeometry = new THREE.BoxGeometry(500, 2, 30);
    const deckMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.gray,
      metalness: 0.5,
      roughness: 0.5
    });
    const deck = new THREE.Mesh(deckGeometry, deckMaterial);
    deck.position.y = 50;
    group.add(deck);

    // Two main towers
    const towerPositions = [-200, 200];
    towerPositions.forEach(x => {
      const towerGeometry = new THREE.BoxGeometry(10, 120, 20);
      const towerMaterial = new THREE.MeshStandardMaterial({
        color: this.COLORS.red,
        metalness: 0.3,
        roughness: 0.7
      });
      const tower = new THREE.Mesh(towerGeometry, towerMaterial);
      tower.position.set(x, 60, 0);
      group.add(tower);

      // Cables
      for (let i = -10; i <= 10; i++) {
        const cableGeometry = new THREE.CylinderGeometry(0.2, 0.2, 70, 8);
        const cableMaterial = new THREE.MeshStandardMaterial({
          color: 0x333333,
          metalness: 0.8,
          roughness: 0.2
        });
        const cable = new THREE.Mesh(cableGeometry, cableMaterial);
        cable.position.set(x + i * 3, 85, 0);
        cable.rotation.z = (i / 10) * 0.5;
        group.add(cable);
      }
    });

    // Lights along bridge
    for (let i = -240; i <= 240; i += 20) {
      const lightGeometry = new THREE.SphereGeometry(0.5, 8, 8);
      const lightMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffff88,
        emissiveIntensity: 1
      });
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      light.position.set(i, 52, 12);
      group.add(light);
    }

    group.position.copy(config.position);
    group.scale.setScalar(config.scale);
    group.rotation.y = config.rotation;

    this.landmarks.set('bosphorus_bridge', group);
    this.scene.add(group);
    return group;
  }

  // Create Maiden's Tower (Kız Kulesi)
  createMaidenTower(config: LandmarkConfig): THREE.Group {
    const group = new THREE.Group();

    // Tower base (on small island)
    const baseGeometry = new THREE.CylinderGeometry(12, 15, 3, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.stone,
      metalness: 0.1,
      roughness: 0.9
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 1.5;
    group.add(base);

    // Main tower
    const towerGeometry = new THREE.CylinderGeometry(8, 10, 25, 16);
    const towerMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.darkStone,
      metalness: 0.1,
      roughness: 0.8
    });
    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.y = 15.5;
    group.add(tower);

    // Roof
    const roofGeometry = new THREE.ConeGeometry(9, 8, 16);
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.red,
      metalness: 0.3,
      roughness: 0.7
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 32;
    group.add(roof);

    // Balcony
    const balconyGeometry = new THREE.TorusGeometry(9, 0.5, 8, 16);
    const balconyMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.stone,
      metalness: 0.2,
      roughness: 0.7
    });
    const balcony = new THREE.Mesh(balconyGeometry, balconyMaterial);
    balcony.rotation.x = Math.PI / 2;
    balcony.position.y = 26;
    group.add(balcony);

    // Water around tower
    const waterGeometry = new THREE.CircleGeometry(20, 32);
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e90ff,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.7
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.05;
    group.add(water);

    group.position.copy(config.position);
    group.scale.setScalar(config.scale);
    group.rotation.y = config.rotation;

    this.landmarks.set('maiden_tower', group);
    this.scene.add(group);
    return group;
  }

  // Helper: Create minaret
  private createMinaret(height: number): THREE.Group {
    const group = new THREE.Group();

    // Base
    const baseGeometry = new THREE.CylinderGeometry(3, 4, height * 0.8, 12);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.stone,
      metalness: 0.1,
      roughness: 0.8
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = height * 0.4;
    group.add(base);

    // Balcony
    const balconyGeometry = new THREE.CylinderGeometry(4, 4, 1.5, 12);
    const balconyMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.marble,
      metalness: 0.2,
      roughness: 0.6
    });
    const balcony = new THREE.Mesh(balconyGeometry, balconyMaterial);
    balcony.position.y = height * 0.8 + 0.75;
    group.add(balcony);

    // Top cone
    const coneGeometry = new THREE.ConeGeometry(3, height * 0.15, 12);
    const coneMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.gold,
      metalness: 0.8,
      roughness: 0.2,
      emissive: this.COLORS.gold,
      emissiveIntensity: 0.1
    });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.y = height * 0.875;
    group.add(cone);

    // Crescent
    const crescentGeometry = new THREE.TorusGeometry(0.8, 0.2, 8, 16, Math.PI);
    const crescentMaterial = new THREE.MeshStandardMaterial({
      color: this.COLORS.gold,
      metalness: 0.9,
      roughness: 0.1,
      emissive: this.COLORS.gold,
      emissiveIntensity: 0.3
    });
    const crescent = new THREE.Mesh(crescentGeometry, crescentMaterial);
    crescent.position.y = height * 0.95;
    crescent.rotation.z = Math.PI / 4;
    group.add(crescent);

    return group;
  }

  // Remove landmark
  removeLandmark(id: string): void {
    const landmark = this.landmarks.get(id);
    if (landmark) {
      this.scene.remove(landmark);
      this.landmarks.delete(id);
    }
  }

  // Get all landmarks
  getAllLandmarks(): Map<string, THREE.Group> {
    return this.landmarks;
  }
}
