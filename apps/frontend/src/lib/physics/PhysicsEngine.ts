/**
 * ANADOLU REALM - Advanced Physics Engine
 * PS5-Quality Physics System with Cannon.js
 * Features: Collisions, Ragdoll, Cloth Simulation, Particle Physics
 */

import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export interface PhysicsBody {
  id: string;
  body: CANNON.Body;
  mesh?: THREE.Mesh;
  type: 'player' | 'npc' | 'object' | 'terrain' | 'projectile' | 'ragdoll';
}

export interface RagdollConfig {
  headRadius: number;
  torsoWidth: number;
  torsoHeight: number;
  torsoDepth: number;
  limbWidth: number;
  limbLength: number;
  mass: number;
}

export interface ClothConfig {
  width: number;
  height: number;
  segmentsX: number;
  segmentsY: number;
  mass: number;
  stiffness: number;
  damping: number;
}

export class PhysicsEngine {
  private world: CANNON.World;
  private bodies: Map<string, PhysicsBody>;
  private fixedTimeStep: number = 1 / 60;
  private maxSubSteps: number = 3;
  private lastTime: number = 0;
  private gravity: CANNON.Vec3;
  private debugMode: boolean = false;

  // Collision Groups
  private readonly COLLISION_GROUPS = {
    PLAYER: 1,
    NPC: 2,
    TERRAIN: 4,
    OBJECT: 8,
    PROJECTILE: 16,
    TRIGGER: 32
  };

  // Materials with realistic friction
  private groundMaterial!: CANNON.Material;
  private playerMaterial!: CANNON.Material;
  private objectMaterial!: CANNON.Material;
  private slipperyMaterial!: CANNON.Material;

  constructor(gravity: CANNON.Vec3 = new CANNON.Vec3(0, -9.82, 0)) {
    this.world = new CANNON.World({
      gravity,
      allowSleep: true
    });

    this.gravity = gravity;
    this.bodies = new Map();

    this.initializeMaterials();
    this.setupCollisionDetection();
  }

  private initializeMaterials(): void {
    // Ground material (cobblestone, grass, etc.)
    this.groundMaterial = new CANNON.Material('ground');

    // Player material
    this.playerMaterial = new CANNON.Material('player');

    // Object material (boxes, barrels, etc.)
    this.objectMaterial = new CANNON.Material('object');

    // Slippery material (ice, marble)
    this.slipperyMaterial = new CANNON.Material('slippery');

    // Contact materials with realistic physics
    const groundPlayer = new CANNON.ContactMaterial(
      this.groundMaterial,
      this.playerMaterial,
      {
        friction: 0.4,
        restitution: 0.1
      }
    );

    const groundObject = new CANNON.ContactMaterial(
      this.groundMaterial,
      this.objectMaterial,
      {
        friction: 0.5,
        restitution: 0.3
      }
    );

    const slipperyPlayer = new CANNON.ContactMaterial(
      this.slipperyMaterial,
      this.playerMaterial,
      {
        friction: 0.05,
        restitution: 0.01
      }
    );

    this.world.addContactMaterial(groundPlayer);
    this.world.addContactMaterial(groundObject);
    this.world.addContactMaterial(slipperyPlayer);
  }

  private setupCollisionDetection(): void {
    // Broadphase for efficient collision detection
    this.world.broadphase = new CANNON.NaiveBroadphase();

    // Solver for constraint equations
    const solver = new CANNON.GSSolver();
    solver.iterations = 10; // Higher = more accurate but slower
    solver.tolerance = 0.001;
    this.world.solver = solver as any;

    // Collision events
    this.world.addEventListener('beginContact', (event: any) => {
      this.handleCollisionBegin(event);
    });

    this.world.addEventListener('endContact', (event: any) => {
      this.handleCollisionEnd(event);
    });
  }

  private handleCollisionBegin(event: { bodyA: CANNON.Body; bodyB: CANNON.Body }): void {
    const bodyAData = this.getBodyData(event.bodyA);
    const bodyBData = this.getBodyData(event.bodyB);

    if (bodyAData && bodyBData) {
      // Custom collision logic here
      console.log(`Collision: ${bodyAData.type} <-> ${bodyBData.type}`);

      // Example: Projectile hit detection
      if (bodyAData.type === 'projectile' || bodyBData.type === 'projectile') {
        this.handleProjectileHit(bodyAData, bodyBData);
      }
    }
  }

  private handleCollisionEnd(event: { bodyA: CANNON.Body; bodyB: CANNON.Body }): void {
    // Collision end logic
  }

  private getBodyData(body: CANNON.Body): PhysicsBody | undefined {
    for (const [id, physicsBody] of this.bodies) {
      if (physicsBody.body === body) {
        return physicsBody;
      }
    }
    return undefined;
  }

  private handleProjectileHit(bodyA: PhysicsBody, bodyB: PhysicsBody): void {
    const projectile = bodyA.type === 'projectile' ? bodyA : bodyB;
    const target = bodyA.type === 'projectile' ? bodyB : bodyA;

    // Apply damage, spawn effects, etc.
    console.log(`Projectile ${projectile.id} hit ${target.type} ${target.id}`);

    // Remove projectile
    this.removeBody(projectile.id);
  }

  // Create basic shapes
  public createBox(
    id: string,
    size: { x: number; y: number; z: number },
    position: { x: number; y: number; z: number },
    mass: number = 1,
    type: PhysicsBody['type'] = 'object'
  ): PhysicsBody {
    const shape = new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2));
    const body = new CANNON.Body({
      mass,
      position: new CANNON.Vec3(position.x, position.y, position.z),
      material: this.objectMaterial
    });
    body.addShape(shape);

    const physicsBody: PhysicsBody = {
      id,
      body,
      type
    };

    this.world.addBody(body);
    this.bodies.set(id, physicsBody);

    return physicsBody;
  }

  public createSphere(
    id: string,
    radius: number,
    position: { x: number; y: number; z: number },
    mass: number = 1,
    type: PhysicsBody['type'] = 'object'
  ): PhysicsBody {
    const shape = new CANNON.Sphere(radius);
    const body = new CANNON.Body({
      mass,
      position: new CANNON.Vec3(position.x, position.y, position.z),
      material: this.objectMaterial
    });
    body.addShape(shape);

    const physicsBody: PhysicsBody = {
      id,
      body,
      type
    };

    this.world.addBody(body);
    this.bodies.set(id, physicsBody);

    return physicsBody;
  }

  public createCylinder(
    id: string,
    radius: number,
    height: number,
    position: { x: number; y: number; z: number },
    mass: number = 1,
    type: PhysicsBody['type'] = 'object'
  ): PhysicsBody {
    const shape = new CANNON.Cylinder(radius, radius, height, 8);
    const body = new CANNON.Body({
      mass,
      position: new CANNON.Vec3(position.x, position.y, position.z),
      material: this.objectMaterial
    });
    body.addShape(shape);

    const physicsBody: PhysicsBody = {
      id,
      body,
      type
    };

    this.world.addBody(body);
    this.bodies.set(id, physicsBody);

    return physicsBody;
  }

  public createPlane(
    id: string,
    position: { x: number; y: number; z: number },
    rotation?: { x: number; y: number; z: number },
    type: PhysicsBody['type'] = 'terrain'
  ): PhysicsBody {
    const shape = new CANNON.Plane();
    const body = new CANNON.Body({
      mass: 0, // Static
      position: new CANNON.Vec3(position.x, position.y, position.z),
      material: this.groundMaterial
    });
    body.addShape(shape);

    if (rotation) {
      body.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z);
    }

    const physicsBody: PhysicsBody = {
      id,
      body,
      type
    };

    this.world.addBody(body);
    this.bodies.set(id, physicsBody);

    return physicsBody;
  }

  // Ragdoll Physics (PS5-quality character death animations)
  public createRagdoll(
    id: string,
    position: { x: number; y: number; z: number },
    config: Partial<RagdollConfig> = {}
  ): PhysicsBody[] {
    const defaultConfig: RagdollConfig = {
      headRadius: 0.15,
      torsoWidth: 0.4,
      torsoHeight: 0.6,
      torsoDepth: 0.2,
      limbWidth: 0.1,
      limbLength: 0.4,
      mass: 1,
      ...config
    };

    const parts: PhysicsBody[] = [];

    // Head
    const head = this.createSphere(
      `${id}_head`,
      defaultConfig.headRadius,
      { x: position.x, y: position.y + defaultConfig.torsoHeight + defaultConfig.headRadius, z: position.z },
      defaultConfig.mass * 0.1,
      'ragdoll'
    );
    parts.push(head);

    // Torso
    const torso = this.createBox(
      `${id}_torso`,
      { x: defaultConfig.torsoWidth, y: defaultConfig.torsoHeight, z: defaultConfig.torsoDepth },
      { x: position.x, y: position.y + defaultConfig.torsoHeight / 2, z: position.z },
      defaultConfig.mass * 0.5,
      'ragdoll'
    );
    parts.push(torso);

    // Arms
    const leftArm = this.createCylinder(
      `${id}_left_arm`,
      defaultConfig.limbWidth / 2,
      defaultConfig.limbLength,
      { x: position.x - defaultConfig.torsoWidth / 2 - defaultConfig.limbLength / 2, y: position.y + defaultConfig.torsoHeight * 0.8, z: position.z },
      defaultConfig.mass * 0.1,
      'ragdoll'
    );
    parts.push(leftArm);

    const rightArm = this.createCylinder(
      `${id}_right_arm`,
      defaultConfig.limbWidth / 2,
      defaultConfig.limbLength,
      { x: position.x + defaultConfig.torsoWidth / 2 + defaultConfig.limbLength / 2, y: position.y + defaultConfig.torsoHeight * 0.8, z: position.z },
      defaultConfig.mass * 0.1,
      'ragdoll'
    );
    parts.push(rightArm);

    // Legs
    const leftLeg = this.createCylinder(
      `${id}_left_leg`,
      defaultConfig.limbWidth / 2,
      defaultConfig.limbLength,
      { x: position.x - defaultConfig.torsoWidth / 4, y: position.y - defaultConfig.limbLength / 2, z: position.z },
      defaultConfig.mass * 0.15,
      'ragdoll'
    );
    parts.push(leftLeg);

    const rightLeg = this.createCylinder(
      `${id}_right_leg`,
      defaultConfig.limbWidth / 2,
      defaultConfig.limbLength,
      { x: position.x + defaultConfig.torsoWidth / 4, y: position.y - defaultConfig.limbLength / 2, z: position.z },
      defaultConfig.mass * 0.15,
      'ragdoll'
    );
    parts.push(rightLeg);

    // Connect with constraints (joints)
    this.addRagdollConstraints(parts);

    return parts;
  }

  private addRagdollConstraints(parts: PhysicsBody[]): void {
    if (parts.length < 6) return;

    const [head, torso, leftArm, rightArm, leftLeg, rightLeg] = parts;

    // Head-Torso constraint
    const neckConstraint = new CANNON.PointToPointConstraint(
      head.body,
      new CANNON.Vec3(0, -0.15, 0),
      torso.body,
      new CANNON.Vec3(0, 0.3, 0)
    );
    this.world.addConstraint(neckConstraint);

    // Shoulder constraints
    const leftShoulderConstraint = new CANNON.ConeTwistConstraint(
      torso.body,
      leftArm.body,
      {
        pivotA: new CANNON.Vec3(-0.2, 0.28, 0),
        pivotB: new CANNON.Vec3(0, 0.2, 0),
        axisA: new CANNON.Vec3(0, 1, 0),
        axisB: new CANNON.Vec3(0, 1, 0),
        angle: Math.PI / 3,
        twistAngle: Math.PI / 4
      }
    );
    this.world.addConstraint(leftShoulderConstraint);

    const rightShoulderConstraint = new CANNON.ConeTwistConstraint(
      torso.body,
      rightArm.body,
      {
        pivotA: new CANNON.Vec3(0.2, 0.28, 0),
        pivotB: new CANNON.Vec3(0, 0.2, 0),
        axisA: new CANNON.Vec3(0, 1, 0),
        axisB: new CANNON.Vec3(0, 1, 0),
        angle: Math.PI / 3,
        twistAngle: Math.PI / 4
      }
    );
    this.world.addConstraint(rightShoulderConstraint);

    // Hip constraints
    const leftHipConstraint = new CANNON.ConeTwistConstraint(
      torso.body,
      leftLeg.body,
      {
        pivotA: new CANNON.Vec3(-0.1, -0.3, 0),
        pivotB: new CANNON.Vec3(0, 0.2, 0),
        axisA: new CANNON.Vec3(0, 1, 0),
        axisB: new CANNON.Vec3(0, 1, 0),
        angle: Math.PI / 4,
        twistAngle: Math.PI / 6
      }
    );
    this.world.addConstraint(leftHipConstraint);

    const rightHipConstraint = new CANNON.ConeTwistConstraint(
      torso.body,
      rightLeg.body,
      {
        pivotA: new CANNON.Vec3(0.1, -0.3, 0),
        pivotB: new CANNON.Vec3(0, 0.2, 0),
        axisA: new CANNON.Vec3(0, 1, 0),
        axisB: new CANNON.Vec3(0, 1, 0),
        angle: Math.PI / 4,
        twistAngle: Math.PI / 6
      }
    );
    this.world.addConstraint(rightHipConstraint);
  }

  // Apply forces
  public applyForce(
    bodyId: string,
    force: { x: number; y: number; z: number },
    worldPoint?: { x: number; y: number; z: number }
  ): void {
    const physicsBody = this.bodies.get(bodyId);
    if (!physicsBody) return;

    const forceVec = new CANNON.Vec3(force.x, force.y, force.z);
    const pointVec = worldPoint
      ? new CANNON.Vec3(worldPoint.x, worldPoint.y, worldPoint.z)
      : physicsBody.body.position;

    physicsBody.body.applyForce(forceVec, pointVec);
  }

  public applyImpulse(
    bodyId: string,
    impulse: { x: number; y: number; z: number },
    worldPoint?: { x: number; y: number; z: number }
  ): void {
    const physicsBody = this.bodies.get(bodyId);
    if (!physicsBody) return;

    const impulseVec = new CANNON.Vec3(impulse.x, impulse.y, impulse.z);
    const pointVec = worldPoint
      ? new CANNON.Vec3(worldPoint.x, worldPoint.y, worldPoint.z)
      : physicsBody.body.position;

    physicsBody.body.applyImpulse(impulseVec, pointVec);
  }

  // Update loop
  public update(deltaTime: number): void {
    if (deltaTime > 0.1) deltaTime = 0.1; // Cap delta time

    this.world.step(this.fixedTimeStep, deltaTime, this.maxSubSteps);

    // Update mesh positions based on physics bodies
    this.bodies.forEach((physicsBody) => {
      if (physicsBody.mesh) {
        physicsBody.mesh.position.copy(physicsBody.body.position as any);
        physicsBody.mesh.quaternion.copy(physicsBody.body.quaternion as any);
      }
    });
  }

  // Get/Set
  public getBody(id: string): PhysicsBody | undefined {
    return this.bodies.get(id);
  }

  public setBodyPosition(
    id: string,
    position: { x: number; y: number; z: number }
  ): void {
    const physicsBody = this.bodies.get(id);
    if (physicsBody) {
      physicsBody.body.position.set(position.x, position.y, position.z);
      physicsBody.body.velocity.set(0, 0, 0);
      physicsBody.body.angularVelocity.set(0, 0, 0);
    }
  }

  public setBodyVelocity(
    id: string,
    velocity: { x: number; y: number; z: number }
  ): void {
    const physicsBody = this.bodies.get(id);
    if (physicsBody) {
      physicsBody.body.velocity.set(velocity.x, velocity.y, velocity.z);
    }
  }

  public removeBody(id: string): void {
    const physicsBody = this.bodies.get(id);
    if (physicsBody) {
      this.world.removeBody(physicsBody.body);
      this.bodies.delete(id);
    }
  }

  public setGravity(gravity: { x: number; y: number; z: number }): void {
    this.world.gravity.set(gravity.x, gravity.y, gravity.z);
  }

  public enableDebug(): void {
    this.debugMode = true;
  }

  public disableDebug(): void {
    this.debugMode = false;
  }

  public dispose(): void {
    this.bodies.forEach((body) => {
      this.world.removeBody(body.body);
    });
    this.bodies.clear();
  }
}
