/**
 * ANADOLU REALM - Advanced Particle System
 * PS5-Quality particle effects for weather, magic, and Turkish cultural effects
 */

import * as THREE from 'three';

export enum ParticleType {
  RAIN = 'rain',
  SNOW = 'snow',
  LEAVES = 'leaves',
  FIRE = 'fire',
  SMOKE = 'smoke',
  MAGIC_SPARKLES = 'magic_sparkles',
  DUST = 'dust',
  BLOOD = 'blood',
  // Turkish cultural particles
  TEA_STEAM = 'tea_steam',
  INCENSE_SMOKE = 'incense_smoke',
  TURKISH_STARS = 'turkish_stars',
  GOLD_COINS = 'gold_coins'
}

export interface ParticleConfig {
  count: number;
  size: number;
  sizeVariation: number;
  color: THREE.Color;
  colorVariation?: THREE.Color;
  velocity: THREE.Vector3;
  velocityVariation: THREE.Vector3;
  lifetime: number;
  lifetimeVariation: number;
  gravity: number;
  opacity: number;
  opacityFade: boolean;
  texture?: THREE.Texture;
  blending: THREE.Blending;
}

export class ParticleSystem {
  private particles: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private particleCount: number;
  private velocities: Float32Array;
  private lifetimes: Float32Array;
  private ages: Float32Array;
  private config: ParticleConfig;
  private active: boolean = true;

  // Predefined particle configurations
  private static readonly PARTICLE_PRESETS: Record<ParticleType, Partial<ParticleConfig>> = {
    [ParticleType.RAIN]: {
      count: 1000,
      size: 0.1,
      sizeVariation: 0.05,
      color: new THREE.Color(0x88ccff),
      velocity: new THREE.Vector3(0, -10, 0),
      velocityVariation: new THREE.Vector3(0.5, 1, 0.5),
      lifetime: 3,
      gravity: -9.8,
      opacity: 0.6,
      blending: THREE.NormalBlending
    },
    [ParticleType.SNOW]: {
      count: 500,
      size: 0.3,
      sizeVariation: 0.15,
      color: new THREE.Color(0xffffff),
      velocity: new THREE.Vector3(0, -1, 0),
      velocityVariation: new THREE.Vector3(0.3, 0.3, 0.3),
      lifetime: 10,
      gravity: -0.5,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    },
    [ParticleType.LEAVES]: {
      count: 300,
      size: 0.4,
      sizeVariation: 0.2,
      color: new THREE.Color(0x88aa33),
      colorVariation: new THREE.Color(0xaa6633),
      velocity: new THREE.Vector3(1, -2, 1),
      velocityVariation: new THREE.Vector3(0.5, 0.5, 0.5),
      lifetime: 8,
      gravity: -2,
      opacity: 0.8,
      blending: THREE.NormalBlending
    },
    [ParticleType.FIRE]: {
      count: 200,
      size: 0.5,
      sizeVariation: 0.3,
      color: new THREE.Color(0xff6600),
      colorVariation: new THREE.Color(0xffaa00),
      velocity: new THREE.Vector3(0, 3, 0),
      velocityVariation: new THREE.Vector3(0.2, 0.5, 0.2),
      lifetime: 1.5,
      gravity: 0.5,
      opacity: 0.7,
      opacityFade: true,
      blending: THREE.AdditiveBlending
    },
    [ParticleType.SMOKE]: {
      count: 150,
      size: 1.0,
      sizeVariation: 0.5,
      color: new THREE.Color(0x666666),
      velocity: new THREE.Vector3(0, 2, 0),
      velocityVariation: new THREE.Vector3(0.3, 0.3, 0.3),
      lifetime: 5,
      gravity: 0.1,
      opacity: 0.3,
      opacityFade: true,
      blending: THREE.NormalBlending
    },
    [ParticleType.MAGIC_SPARKLES]: {
      count: 100,
      size: 0.2,
      sizeVariation: 0.1,
      color: new THREE.Color(0x88ffff),
      velocity: new THREE.Vector3(0, 1, 0),
      velocityVariation: new THREE.Vector3(1, 1, 1),
      lifetime: 2,
      gravity: 0,
      opacity: 1.0,
      opacityFade: true,
      blending: THREE.AdditiveBlending
    },
    [ParticleType.DUST]: {
      count: 50,
      size: 0.1,
      sizeVariation: 0.05,
      color: new THREE.Color(0xccaa88),
      velocity: new THREE.Vector3(0, 0.5, 0),
      velocityVariation: new THREE.Vector3(0.5, 0.2, 0.5),
      lifetime: 3,
      gravity: -0.1,
      opacity: 0.4,
      blending: THREE.NormalBlending
    },
    [ParticleType.BLOOD]: {
      count: 30,
      size: 0.15,
      sizeVariation: 0.08,
      color: new THREE.Color(0x8b0000),
      velocity: new THREE.Vector3(0, -2, 0),
      velocityVariation: new THREE.Vector3(1, 1, 1),
      lifetime: 2,
      gravity: -9.8,
      opacity: 0.9,
      blending: THREE.NormalBlending
    },
    // Turkish cultural particles
    [ParticleType.TEA_STEAM]: {
      count: 80,
      size: 0.3,
      sizeVariation: 0.15,
      color: new THREE.Color(0xffffff),
      velocity: new THREE.Vector3(0, 1, 0),
      velocityVariation: new THREE.Vector3(0.1, 0.2, 0.1),
      lifetime: 3,
      gravity: 0.2,
      opacity: 0.2,
      opacityFade: true,
      blending: THREE.NormalBlending
    },
    [ParticleType.INCENSE_SMOKE]: {
      count: 100,
      size: 0.8,
      sizeVariation: 0.4,
      color: new THREE.Color(0xaaaaaa),
      velocity: new THREE.Vector3(0, 1.5, 0),
      velocityVariation: new THREE.Vector3(0.2, 0.3, 0.2),
      lifetime: 4,
      gravity: 0.1,
      opacity: 0.25,
      opacityFade: true,
      blending: THREE.NormalBlending
    },
    [ParticleType.TURKISH_STARS]: {
      count: 50,
      size: 0.3,
      sizeVariation: 0.15,
      color: new THREE.Color(0xff0000), // Turkish red
      colorVariation: new THREE.Color(0xffd700), // Gold
      velocity: new THREE.Vector3(0, 2, 0),
      velocityVariation: new THREE.Vector3(0.5, 0.5, 0.5),
      lifetime: 3,
      gravity: -1,
      opacity: 1.0,
      opacityFade: true,
      blending: THREE.AdditiveBlending
    },
    [ParticleType.GOLD_COINS]: {
      count: 20,
      size: 0.4,
      sizeVariation: 0.1,
      color: new THREE.Color(0xffd700),
      velocity: new THREE.Vector3(0, 5, 0),
      velocityVariation: new THREE.Vector3(2, 1, 2),
      lifetime: 2,
      gravity: -9.8,
      opacity: 1.0,
      blending: THREE.AdditiveBlending
    }
  };

  constructor(
    type: ParticleType,
    position: THREE.Vector3,
    customConfig?: Partial<ParticleConfig>
  ) {
    const preset = ParticleSystem.PARTICLE_PRESETS[type];
    this.config = {
      count: 100,
      size: 1,
      sizeVariation: 0.5,
      color: new THREE.Color(0xffffff),
      velocity: new THREE.Vector3(0, 1, 0),
      velocityVariation: new THREE.Vector3(0, 0, 0),
      lifetime: 5,
      lifetimeVariation: 1,
      gravity: 0,
      opacity: 1,
      opacityFade: false,
      blending: THREE.NormalBlending,
      ...preset,
      ...customConfig
    };

    this.particleCount = this.config.count;

    // Initialize geometry
    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);
    const sizes = new Float32Array(this.particleCount);
    this.velocities = new Float32Array(this.particleCount * 3);
    this.lifetimes = new Float32Array(this.particleCount);
    this.ages = new Float32Array(this.particleCount);

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;

      // Position
      positions[i3] = position.x + (Math.random() - 0.5) * 2;
      positions[i3 + 1] = position.y + (Math.random() - 0.5) * 2;
      positions[i3 + 2] = position.z + (Math.random() - 0.5) * 2;

      // Color
      const baseColor = this.config.color;
      const variation = this.config.colorVariation;
      if (variation) {
        colors[i3] = baseColor.r + (Math.random() - 0.5) * variation.r;
        colors[i3 + 1] = baseColor.g + (Math.random() - 0.5) * variation.g;
        colors[i3 + 2] = baseColor.b + (Math.random() - 0.5) * variation.b;
      } else {
        colors[i3] = baseColor.r;
        colors[i3 + 1] = baseColor.g;
        colors[i3 + 2] = baseColor.b;
      }

      // Size
      sizes[i] = this.config.size + (Math.random() - 0.5) * this.config.sizeVariation;

      // Velocity
      this.velocities[i3] = this.config.velocity.x + (Math.random() - 0.5) * this.config.velocityVariation.x;
      this.velocities[i3 + 1] = this.config.velocity.y + (Math.random() - 0.5) * this.config.velocityVariation.y;
      this.velocities[i3 + 2] = this.config.velocity.z + (Math.random() - 0.5) * this.config.velocityVariation.z;

      // Lifetime
      this.lifetimes[i] = this.config.lifetime + (Math.random() - 0.5) * this.config.lifetimeVariation;
      this.ages[i] = Math.random() * this.lifetimes[i]; // Stagger initial ages
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Material
    this.material = new THREE.PointsMaterial({
      size: this.config.size,
      vertexColors: true,
      transparent: true,
      opacity: this.config.opacity,
      blending: this.config.blending,
      depthWrite: false,
      sizeAttenuation: true,
      map: this.config.texture
    });

    // Create particles
    this.particles = new THREE.Points(this.geometry, this.material);
    this.particles.position.copy(position);
  }

  // Update particles
  public update(deltaTime: number): void {
    if (!this.active) return;

    const positions = this.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;

      // Age particle
      this.ages[i] += deltaTime;

      // Reset if lifetime exceeded
      if (this.ages[i] >= this.lifetimes[i]) {
        this.ages[i] = 0;
        // Reset to spawn position
        positions[i3] = this.particles.position.x + (Math.random() - 0.5) * 2;
        positions[i3 + 1] = this.particles.position.y + (Math.random() - 0.5) * 2;
        positions[i3 + 2] = this.particles.position.z + (Math.random() - 0.5) * 2;
      } else {
        // Update position
        positions[i3] += this.velocities[i3] * deltaTime;
        positions[i3 + 1] += (this.velocities[i3 + 1] + this.config.gravity * this.ages[i]) * deltaTime;
        positions[i3 + 2] += this.velocities[i3 + 2] * deltaTime;
      }

      // Opacity fade
      if (this.config.opacityFade) {
        const lifeRatio = this.ages[i] / this.lifetimes[i];
        this.material.opacity = this.config.opacity * (1 - lifeRatio);
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
  }

  // Get THREE.Points object
  public getParticles(): THREE.Points {
    return this.particles;
  }

  // Set active state
  public setActive(active: boolean): void {
    this.active = active;
    this.particles.visible = active;
  }

  // Dispose
  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
    if (this.config.texture) {
      this.config.texture.dispose();
    }
  }
}

// Particle Manager for handling multiple particle systems
export class ParticleManager {
  private systems: Map<string, ParticleSystem> = new Map();
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  public addSystem(
    id: string,
    type: ParticleType,
    position: THREE.Vector3,
    customConfig?: Partial<ParticleConfig>
  ): ParticleSystem {
    const system = new ParticleSystem(type, position, customConfig);
    this.scene.add(system.getParticles());
    this.systems.set(id, system);
    return system;
  }

  public removeSystem(id: string): void {
    const system = this.systems.get(id);
    if (system) {
      this.scene.remove(system.getParticles());
      system.dispose();
      this.systems.delete(id);
    }
  }

  public update(deltaTime: number): void {
    this.systems.forEach(system => system.update(deltaTime));
  }

  public dispose(): void {
    this.systems.forEach(system => {
      this.scene.remove(system.getParticles());
      system.dispose();
    });
    this.systems.clear();
  }
}
