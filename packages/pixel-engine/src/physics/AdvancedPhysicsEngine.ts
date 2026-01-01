/**
 * ANADOLU REALM - Advanced Physics Engine
 * Realistic Ragdoll, Vehicle Physics, Destructibles
 * AI-Powered by AILYDIAN Orchestrator
 */

import * as CANNON from 'cannon-es';
import * as THREE from 'three';

// ============================================================================
// ADVANCED PHYSICS ENGINE
// ============================================================================

export class AdvancedPhysicsEngine {
  private world: CANNON.World;
  private bodies: Map<string, CANNON.Body> = new Map();
  private constraints: Map<string, CANNON.Constraint> = new Map();
  private ragdolls: Map<string, HumanoidRagdoll> = new Map();
  private vehicles: Map<string, VehiclePhysics> = new Map();
  private destructibles: Map<string, DestructibleObject> = new Map();

  // Physics Configuration
  private readonly GRAVITY = -9.82; // m/s²
  private readonly TIME_STEP = 1 / 60; // 60 FPS
  private readonly MAX_SUB_STEPS = 3;

  constructor() {
    this.initializePhysicsWorld();
  }

  private initializePhysicsWorld(): void {
    // Cannon.js World
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, this.GRAVITY, 0)
    });

    // Solver ayarları (performans ve doğruluk dengesi)
    this.world.solver.iterations = 10;
    this.world.solver.tolerance = 0.001;

    // Collision detection
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.allowSleep = true;

    // Contact materials (sürtünme, elastikiyet)
    this.setupContactMaterials();

    console.log('✅ Advanced Physics Engine initialized');
  }

  private setupContactMaterials(): void {
    // Material tanımları
    const groundMaterial = new CANNON.Material('ground');
    const bodyMaterial = new CANNON.Material('body');
    const vehicleMaterial = new CANNON.Material('vehicle');

    // Ground-Body contact
    const groundBodyContact = new CANNON.ContactMaterial(
      groundMaterial,
      bodyMaterial,
      {
        friction: 0.8,
        restitution: 0.2 // Elastikiyet (zıplama)
      }
    );

    // Ground-Vehicle contact
    const groundVehicleContact = new CANNON.ContactMaterial(
      groundMaterial,
      vehicleMaterial,
      {
        friction: 1.5, // Yüksek sürtünme (grip)
        restitution: 0.1
      }
    );

    this.world.addContactMaterial(groundBodyContact);
    this.world.addContactMaterial(groundVehicleContact);
  }

  // ============================================================================
  // HUMANOID RAGDOLL SYSTEM
  // ============================================================================

  createHumanoidRagdoll(id: string, position: THREE.Vector3): HumanoidRagdoll {
    const ragdoll = new HumanoidRagdoll(this.world, position);
    this.ragdolls.set(id, ragdoll);
    return ragdoll;
  }

  activateRagdoll(id: string, impulse?: CANNON.Vec3): void {
    const ragdoll = this.ragdolls.get(id);
    if (ragdoll) {
      ragdoll.activate(impulse);
    }
  }

  deactivateRagdoll(id: string): void {
    const ragdoll = this.ragdolls.get(id);
    if (ragdoll) {
      ragdoll.deactivate();
    }
  }

  // ============================================================================
  // VEHICLE PHYSICS
  // ============================================================================

  createVehicle(
    id: string,
    type: 'DOLMUS' | 'MINIBUS' | 'KARTAL' | 'TAKSI',
    position: THREE.Vector3
  ): VehiclePhysics {
    const vehicle = new VehiclePhysics(this.world, type, position);
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  // ============================================================================
  // DESTRUCTIBLE OBJECTS
  // ============================================================================

  createDestructible(
    id: string,
    type: 'GLASS' | 'WOOD' | 'CERAMIC' | 'CONCRETE',
    mesh: THREE.Mesh
  ): DestructibleObject {
    const destructible = new DestructibleObject(this.world, type, mesh);
    this.destructibles.set(id, destructible);
    return destructible;
  }

  damageObject(id: string, damage: number, impactPoint: THREE.Vector3): void {
    const obj = this.destructibles.get(id);
    if (obj) {
      obj.takeDamage(damage, impactPoint);
    }
  }

  // ============================================================================
  // UPDATE LOOP
  // ============================================================================

  update(deltaTime: number): void {
    // Physics step
    this.world.step(this.TIME_STEP, deltaTime, this.MAX_SUB_STEPS);

    // Update ragdolls
    this.ragdolls.forEach(ragdoll => ragdoll.update());

    // Update vehicles
    this.vehicles.forEach(vehicle => vehicle.update());

    // Update destructibles
    this.destructibles.forEach(destructible => destructible.update());
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  applyImpulse(bodyId: string, impulse: CANNON.Vec3, worldPoint?: CANNON.Vec3): void {
    const body = this.bodies.get(bodyId);
    if (body) {
      if (worldPoint) {
        body.applyImpulse(impulse, worldPoint);
      } else {
        body.applyImpulse(impulse);
      }
    }
  }

  raycast(from: THREE.Vector3, to: THREE.Vector3): CANNON.RaycastResult | null {
    const result = new CANNON.RaycastResult();
    const fromVec = new CANNON.Vec3(from.x, from.y, from.z);
    const toVec = new CANNON.Vec3(to.x, to.y, to.z);

    this.world.raycastClosest(fromVec, toVec, {}, result);

    return result.hasHit ? result : null;
  }
}

// ============================================================================
// HUMANOID RAGDOLL CLASS
// ============================================================================

export class HumanoidRagdoll {
  private world: CANNON.World;
  private bones: Map<string, CANNON.Body> = new Map();
  private constraints: CANNON.Constraint[] = [];
  private isActive = false;

  // Anatomik yapı
  private readonly BONE_STRUCTURE = {
    head: { mass: 5, size: [0.15, 0.2, 0.15] },
    neck: { mass: 1, size: [0.1, 0.1, 0.1] },
    spine: { mass: 8, size: [0.2, 0.3, 0.15] },
    pelvis: { mass: 6, size: [0.25, 0.15, 0.15] },

    leftUpperArm: { mass: 2, size: [0.08, 0.25, 0.08] },
    leftLowerArm: { mass: 1.5, size: [0.08, 0.25, 0.08] },
    leftHand: { mass: 0.5, size: [0.08, 0.12, 0.04] },

    rightUpperArm: { mass: 2, size: [0.08, 0.25, 0.08] },
    rightLowerArm: { mass: 1.5, size: [0.08, 0.25, 0.08] },
    rightHand: { mass: 0.5, size: [0.08, 0.12, 0.04] },

    leftUpperLeg: { mass: 5, size: [0.12, 0.4, 0.12] },
    leftLowerLeg: { mass: 3, size: [0.1, 0.4, 0.1] },
    leftFoot: { mass: 1, size: [0.1, 0.05, 0.2] },

    rightUpperLeg: { mass: 5, size: [0.12, 0.4, 0.12] },
    rightLowerLeg: { mass: 3, size: [0.1, 0.4, 0.1] },
    rightFoot: { mass: 1, size: [0.1, 0.05, 0.2] }
  };

  constructor(world: CANNON.World, position: THREE.Vector3) {
    this.world = world;
    this.createBones(position);
    this.createConstraints();
  }

  private createBones(position: THREE.Vector3): void {
    Object.entries(this.BONE_STRUCTURE).forEach(([boneName, config]) => {
      const shape = new CANNON.Box(
        new CANNON.Vec3(config.size[0] / 2, config.size[1] / 2, config.size[2] / 2)
      );

      const body = new CANNON.Body({
        mass: config.mass,
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape
      });

      body.allowSleep = true;
      body.sleepSpeedLimit = 0.1;

      this.bones.set(boneName, body);
    });
  }

  private createConstraints(): void {
    // Head-Neck constraint (hinge)
    this.addHingeConstraint('head', 'neck', {
      axisA: new CANNON.Vec3(1, 0, 0),
      axisB: new CANNON.Vec3(1, 0, 0),
      maxForce: 100
    });

    // Neck-Spine constraint
    this.addHingeConstraint('neck', 'spine', {
      axisA: new CANNON.Vec3(1, 0, 0),
      axisB: new CANNON.Vec3(1, 0, 0),
      maxForce: 150
    });

    // Spine-Pelvis constraint
    this.addHingeConstraint('spine', 'pelvis', {
      axisA: new CANNON.Vec3(1, 0, 0),
      axisB: new CANNON.Vec3(1, 0, 0),
      maxForce: 200
    });

    // Arms (sol kol)
    this.addHingeConstraint('spine', 'leftUpperArm', {
      axisA: new CANNON.Vec3(0, 0, 1),
      axisB: new CANNON.Vec3(0, 0, 1),
      maxForce: 80
    });

    this.addHingeConstraint('leftUpperArm', 'leftLowerArm', {
      axisA: new CANNON.Vec3(0, 0, 1),
      axisB: new CANNON.Vec3(0, 0, 1),
      maxForce: 60
    });

    this.addHingeConstraint('leftLowerArm', 'leftHand', {
      axisA: new CANNON.Vec3(0, 0, 1),
      axisB: new CANNON.Vec3(0, 0, 1),
      maxForce: 40
    });

    // Arms (sağ kol) - symmetric
    this.addHingeConstraint('spine', 'rightUpperArm', {
      axisA: new CANNON.Vec3(0, 0, 1),
      axisB: new CANNON.Vec3(0, 0, 1),
      maxForce: 80
    });

    this.addHingeConstraint('rightUpperArm', 'rightLowerArm', {
      axisA: new CANNON.Vec3(0, 0, 1),
      axisB: new CANNON.Vec3(0, 0, 1),
      maxForce: 60
    });

    this.addHingeConstraint('rightLowerArm', 'rightHand', {
      axisA: new CANNON.Vec3(0, 0, 1),
      axisB: new CANNON.Vec3(0, 0, 1),
      maxForce: 40
    });

    // Legs (sol bacak)
    this.addHingeConstraint('pelvis', 'leftUpperLeg', {
      axisA: new CANNON.Vec3(1, 0, 0),
      axisB: new CANNON.Vec3(1, 0, 0),
      maxForce: 150
    });

    this.addHingeConstraint('leftUpperLeg', 'leftLowerLeg', {
      axisA: new CANNON.Vec3(1, 0, 0),
      axisB: new CANNON.Vec3(1, 0, 0),
      maxForce: 120
    });

    this.addHingeConstraint('leftLowerLeg', 'leftFoot', {
      axisA: new CANNON.Vec3(1, 0, 0),
      axisB: new CANNON.Vec3(1, 0, 0),
      maxForce: 80
    });

    // Legs (sağ bacak) - symmetric
    this.addHingeConstraint('pelvis', 'rightUpperLeg', {
      axisA: new CANNON.Vec3(1, 0, 0),
      axisB: new CANNON.Vec3(1, 0, 0),
      maxForce: 150
    });

    this.addHingeConstraint('rightUpperLeg', 'rightLowerLeg', {
      axisA: new CANNON.Vec3(1, 0, 0),
      axisB: new CANNON.Vec3(1, 0, 0),
      maxForce: 120
    });

    this.addHingeConstraint('rightLowerLeg', 'rightFoot', {
      axisA: new CANNON.Vec3(1, 0, 0),
      axisB: new CANNON.Vec3(1, 0, 0),
      maxForce: 80
    });
  }

  private addHingeConstraint(
    bodyA: string,
    bodyB: string,
    config: { axisA: CANNON.Vec3; axisB: CANNON.Vec3; maxForce: number }
  ): void {
    const boneA = this.bones.get(bodyA);
    const boneB = this.bones.get(bodyB);

    if (!boneA || !boneB) return;

    const constraint = new CANNON.HingeConstraint(boneA, boneB, {
      pivotA: new CANNON.Vec3(0, 0, 0),
      pivotB: new CANNON.Vec3(0, 0, 0),
      axisA: config.axisA,
      axisB: config.axisB,
      maxForce: config.maxForce
    });

    this.world.addConstraint(constraint);
    this.constraints.push(constraint);
  }

  activate(impulse?: CANNON.Vec3): void {
    if (this.isActive) return;

    // Tüm kemikleri world'e ekle
    this.bones.forEach(bone => {
      this.world.addBody(bone);
    });

    // İlk impulse uygula (düşme)
    if (impulse) {
      const spine = this.bones.get('spine');
      if (spine) {
        spine.applyImpulse(impulse);
      }
    }

    this.isActive = true;
    console.log('🎭 Ragdoll activated');
  }

  deactivate(): void {
    if (!this.isActive) return;

    // Tüm kemikleri world'den çıkar
    this.bones.forEach(bone => {
      this.world.removeBody(bone);
    });

    this.isActive = false;
    console.log('🎭 Ragdoll deactivated');
  }

  update(): void {
    if (!this.isActive) return;

    // Ragdoll durumunu kontrol et (çok yavaşsa uyut)
    const spine = this.bones.get('spine');
    if (spine && spine.velocity.length() < 0.1) {
      spine.sleep();
    }
  }

  getBonePosition(boneName: string): THREE.Vector3 | null {
    const bone = this.bones.get(boneName);
    if (!bone) return null;

    return new THREE.Vector3(bone.position.x, bone.position.y, bone.position.z);
  }

  getBoneRotation(boneName: string): THREE.Quaternion | null {
    const bone = this.bones.get(boneName);
    if (!bone) return null;

    return new THREE.Quaternion(
      bone.quaternion.x,
      bone.quaternion.y,
      bone.quaternion.z,
      bone.quaternion.w
    );
  }
}

// ============================================================================
// VEHICLE PHYSICS CLASS
// ============================================================================

export class VehiclePhysics {
  private world: CANNON.World;
  private vehicle: CANNON.RaycastVehicle;
  private chassisBody: CANNON.Body;
  private type: 'DOLMUS' | 'MINIBUS' | 'KARTAL' | 'TAKSI';

  // Vehicle specs
  private readonly VEHICLE_SPECS = {
    DOLMUS: {
      mass: 1200,
      maxSpeed: 60, // km/h
      acceleration: 0.25,
      suspension: { stiffness: 70, damping: 8, travel: 0.35 }
    },
    MINIBUS: {
      mass: 2500,
      maxSpeed: 80,
      acceleration: 0.18,
      suspension: { stiffness: 90, damping: 12, travel: 0.3 }
    },
    KARTAL: {
      mass: 1500,
      maxSpeed: 120,
      acceleration: 0.35,
      suspension: { stiffness: 80, damping: 10, travel: 0.3 }
    },
    TAKSI: {
      mass: 1300,
      maxSpeed: 140,
      acceleration: 0.4,
      suspension: { stiffness: 85, damping: 11, travel: 0.28 }
    }
  };

  constructor(world: CANNON.World, type: 'DOLMUS' | 'MINIBUS' | 'KARTAL' | 'TAKSI', position: THREE.Vector3) {
    this.world = world;
    this.type = type;

    this.createChassis(position);
    this.createVehicle();
    this.addWheels();
  }

  private createChassis(position: THREE.Vector3): void {
    const specs = this.VEHICLE_SPECS[this.type];

    const chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 2));
    this.chassisBody = new CANNON.Body({
      mass: specs.mass,
      position: new CANNON.Vec3(position.x, position.y, position.z),
      shape: chassisShape
    });

    this.world.addBody(this.chassisBody);
  }

  private createVehicle(): void {
    this.vehicle = new CANNON.RaycastVehicle({
      chassisBody: this.chassisBody
    });

    this.vehicle.addToWorld(this.world);
  }

  private addWheels(): void {
    const specs = this.VEHICLE_SPECS[this.type];
    const wheelPositions = [
      new CANNON.Vec3(-0.7, 0, 1),   // Front left
      new CANNON.Vec3(0.7, 0, 1),    // Front right
      new CANNON.Vec3(-0.7, 0, -1),  // Rear left
      new CANNON.Vec3(0.7, 0, -1)    // Rear right
    ];

    const wheelOptions = {
      radius: 0.3,
      directionLocal: new CANNON.Vec3(0, -1, 0),
      suspensionStiffness: specs.suspension.stiffness,
      suspensionRestLength: specs.suspension.travel,
      frictionSlip: 1.5,
      dampingRelaxation: specs.suspension.damping,
      dampingCompression: specs.suspension.damping * 0.8,
      maxSuspensionForce: 100000,
      rollInfluence: 0.1,
      axleLocal: new CANNON.Vec3(-1, 0, 0),
      chassisConnectionPointLocal: new CANNON.Vec3(0, 0, 0),
      maxSuspensionTravel: specs.suspension.travel,
      customSlidingRotationalSpeed: -30,
      useCustomSlidingRotationalSpeed: true
    };

    wheelPositions.forEach(position => {
      wheelOptions.chassisConnectionPointLocal = position;
      this.vehicle.addWheel(wheelOptions);
    });
  }

  accelerate(force: number): void {
    const specs = this.VEHICLE_SPECS[this.type];
    const maxForce = specs.mass * specs.acceleration * 100;

    this.vehicle.applyEngineForce(-force * maxForce, 2);
    this.vehicle.applyEngineForce(-force * maxForce, 3);
  }

  brake(force: number): void {
    this.vehicle.setBrake(force * 10, 0);
    this.vehicle.setBrake(force * 10, 1);
    this.vehicle.setBrake(force * 10, 2);
    this.vehicle.setBrake(force * 10, 3);
  }

  steer(angle: number): void {
    this.vehicle.setSteeringValue(angle, 0);
    this.vehicle.setSteeringValue(angle, 1);
  }

  honk(): void {
    // İstanbul trafiği 😄
    console.log('📯 DÜÜÜÜT! (Türk trafiği sesleri)');
    // Audio playback trigger
  }

  update(): void {
    // Auto-brake when stopped
    const speed = this.chassisBody.velocity.length();
    if (speed < 0.1) {
      this.brake(0.5);
    }
  }

  getPosition(): THREE.Vector3 {
    return new THREE.Vector3(
      this.chassisBody.position.x,
      this.chassisBody.position.y,
      this.chassisBody.position.z
    );
  }

  getRotation(): THREE.Quaternion {
    return new THREE.Quaternion(
      this.chassisBody.quaternion.x,
      this.chassisBody.quaternion.y,
      this.chassisBody.quaternion.z,
      this.chassisBody.quaternion.w
    );
  }
}

// ============================================================================
// DESTRUCTIBLE OBJECT CLASS
// ============================================================================

export class DestructibleObject {
  private world: CANNON.World;
  private type: 'GLASS' | 'WOOD' | 'CERAMIC' | 'CONCRETE';
  private mesh: THREE.Mesh;
  private body: CANNON.Body;
  private health = 100;
  private isBroken = false;
  private fragments: CANNON.Body[] = [];

  private readonly MATERIAL_PROPERTIES = {
    GLASS: { health: 30, fragmentCount: 20, fragmentLifetime: 8000 },
    WOOD: { health: 60, fragmentCount: 12, fragmentLifetime: 10000 },
    CERAMIC: { health: 40, fragmentCount: 15, fragmentLifetime: 7000 },
    CONCRETE: { health: 100, fragmentCount: 8, fragmentLifetime: 12000 }
  };

  constructor(world: CANNON.World, type: 'GLASS' | 'WOOD' | 'CERAMIC' | 'CONCRETE', mesh: THREE.Mesh) {
    this.world = world;
    this.type = type;
    this.mesh = mesh;

    this.health = this.MATERIAL_PROPERTIES[type].health;
    this.createRigidBody();
  }

  private createRigidBody(): void {
    // Mesh'in bounding box'ından shape oluştur
    const bbox = new THREE.Box3().setFromObject(this.mesh);
    const size = bbox.getSize(new THREE.Vector3());

    const shape = new CANNON.Box(
      new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)
    );

    this.body = new CANNON.Body({
      mass: 0, // Static (hareket etmez)
      position: new CANNON.Vec3(
        this.mesh.position.x,
        this.mesh.position.y,
        this.mesh.position.z
      ),
      shape
    });

    this.world.addBody(this.body);
  }

  takeDamage(damage: number, impactPoint: THREE.Vector3): void {
    if (this.isBroken) return;

    this.health -= damage;

    if (this.health <= 0) {
      this.break(impactPoint);
    }
  }

  private break(impactPoint: THREE.Vector3): void {
    this.isBroken = true;

    // Orijinal body'yi kaldır
    this.world.removeBody(this.body);

    // Parçaları oluştur
    this.createFragments(impactPoint);

    // Ses efekti
    console.log(`💥 ${this.type} kırıldı!`);
    // Audio playback: break_${this.type}.mp3

    // Parça temizleme (lifetime sonrası)
    const lifetime = this.MATERIAL_PROPERTIES[this.type].fragmentLifetime;
    setTimeout(() => this.cleanupFragments(), lifetime);
  }

  private createFragments(impactPoint: THREE.Vector3): void {
    const count = this.MATERIAL_PROPERTIES[this.type].fragmentCount;

    for (let i = 0; i < count; i++) {
      const size = 0.1 + Math.random() * 0.15;
      const shape = new CANNON.Box(new CANNON.Vec3(size, size, size));

      const fragment = new CANNON.Body({
        mass: 0.5 + Math.random() * 1.5,
        position: new CANNON.Vec3(
          this.body.position.x + (Math.random() - 0.5) * 0.5,
          this.body.position.y + (Math.random() - 0.5) * 0.5,
          this.body.position.z + (Math.random() - 0.5) * 0.5
        ),
        shape
      });

      // Patlama kuvveti
      const explosionForce = new CANNON.Vec3(
        (Math.random() - 0.5) * 20,
        Math.random() * 15 + 5,
        (Math.random() - 0.5) * 20
      );

      fragment.applyImpulse(explosionForce);

      this.world.addBody(fragment);
      this.fragments.push(fragment);
    }
  }

  private cleanupFragments(): void {
    this.fragments.forEach(fragment => {
      this.world.removeBody(fragment);
    });

    this.fragments = [];
    console.log(`🧹 ${this.type} parçaları temizlendi`);
  }

  update(): void {
    // Gravity check, cleanup if fallen too far
    this.fragments.forEach(fragment => {
      if (fragment.position.y < -50) {
        this.world.removeBody(fragment);
      }
    });
  }
}

export default AdvancedPhysicsEngine;
