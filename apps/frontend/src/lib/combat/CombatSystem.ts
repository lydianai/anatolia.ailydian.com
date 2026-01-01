/**
 * ANADOLU REALM - Advanced Combat System
 * PS5-Quality Combat with Turkish Weapons
 * Features: Melee, Ranged, Magic, Combos, Critical Hits, Status Effects
 */

import { PhysicsEngine } from '../physics/PhysicsEngine';
import { audioEngine } from '../audio/AudioEngine';
import * as THREE from 'three';

export enum WeaponType {
  // Turkish Melee Weapons
  KILIJ = 'kilij', // Kılıç
  YATAGHAN = 'yataghan', // Yatağan
  PALA = 'pala', // Pala
  MACE = 'mace', // Topuz
  SPEAR = 'spear', // Mızrak

  // Ranged Weapons
  TURKISH_BOW = 'turkish_bow', // Türk Yayı
  CROSSBOW = 'crossbow', // Tatar Yayı
  THROWING_AXE = 'throwing_axe', // Baltalar

  // Magic
  FIRE_STAFF = 'fire_staff',
  ICE_STAFF = 'ice_staff',
  LIGHTNING_STAFF = 'lightning_staff'
}

export enum DamageType {
  PHYSICAL = 'physical',
  FIRE = 'fire',
  ICE = 'ice',
  LIGHTNING = 'lightning',
  POISON = 'poison',
  HOLY = 'holy'
}

export enum StatusEffect {
  BLEEDING = 'bleeding',
  BURNING = 'burning',
  FROZEN = 'frozen',
  STUNNED = 'stunned',
  POISONED = 'poisoned',
  WEAKENED = 'weakened',
  SLOWED = 'slowed'
}

export enum CombatState {
  IDLE = 'idle',
  ATTACKING = 'attacking',
  BLOCKING = 'blocking',
  DODGING = 'dodging',
  STUNNED = 'stunned',
  CASTING = 'casting',
  DEAD = 'dead'
}

export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  damageType: DamageType;
  baseDamage: number;
  attackSpeed: number; // Attacks per second
  range: number; // Meters
  critChance: number; // 0-1
  critMultiplier: number; // 1.5x, 2x, etc.
  stamCost: number;
  comboCount: number; // Max combo chain
  specialAbility?: string;
  level: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface CombatStats {
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
  critChance: number;
  critDamage: number;
  attackSpeed: number;
  movementSpeed: number;
  dodgeChance: number;
  blockChance: number;
}

export interface DamageInstance {
  amount: number;
  type: DamageType;
  isCritical: boolean;
  source: string;
  target: string;
  timestamp: number;
  statusEffects?: StatusEffect[];
}

export interface CombatEntity {
  id: string;
  name: string;
  type: 'player' | 'npc' | 'enemy' | 'boss';
  stats: CombatStats;
  weapon: Weapon;
  state: CombatState;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  target?: string;
  comboCounter: number;
  lastAttackTime: number;
  statusEffects: Map<StatusEffect, { duration: number; strength: number }>;
  isInvulnerable: boolean; // I-frames during dodge
  invulnerabilityTimer: number;
}

export class CombatSystem {
  private entities: Map<string, CombatEntity>;
  private damageHistory: DamageInstance[];
  private physicsEngine?: PhysicsEngine;
  private comboCooldown: number = 1500; // ms
  private dodgeIFrames: number = 500; // ms

  // Turkish Weapons Database
  private readonly TURKISH_WEAPONS: Record<string, Weapon> = {
    // Kılıç (Curved Sword)
    kilij_basic: {
      id: 'kilij_basic',
      name: 'Osmanlı Kılıcı',
      type: WeaponType.KILIJ,
      damageType: DamageType.PHYSICAL,
      baseDamage: 45,
      attackSpeed: 1.2,
      range: 2.0,
      critChance: 0.15,
      critMultiplier: 1.8,
      stamCost: 15,
      comboCount: 3,
      level: 1,
      rarity: 'common'
    },
    kilij_legendary: {
      id: 'kilij_legendary',
      name: 'Fatih Sultan Mehmet\'in Kılıcı',
      type: WeaponType.KILIJ,
      damageType: DamageType.PHYSICAL,
      baseDamage: 120,
      attackSpeed: 1.5,
      range: 2.5,
      critChance: 0.30,
      critMultiplier: 2.5,
      stamCost: 20,
      comboCount: 5,
      specialAbility: 'istanbul_conquest', // Özel yetenek
      level: 50,
      rarity: 'legendary'
    },

    // Yatağan (Scimitar)
    yataghan_basic: {
      id: 'yataghan_basic',
      name: 'Yeniçeri Yatağanı',
      type: WeaponType.YATAGHAN,
      damageType: DamageType.PHYSICAL,
      baseDamage: 55,
      attackSpeed: 1.4,
      range: 1.8,
      critChance: 0.20,
      critMultiplier: 2.0,
      stamCost: 18,
      comboCount: 4,
      level: 10,
      rarity: 'uncommon'
    },

    // Türk Yayı
    turkish_bow_basic: {
      id: 'turkish_bow_basic',
      name: 'Türk Yayı',
      type: WeaponType.TURKISH_BOW,
      damageType: DamageType.PHYSICAL,
      baseDamage: 60,
      attackSpeed: 0.8,
      range: 30.0,
      critChance: 0.25,
      critMultiplier: 2.2,
      stamCost: 12,
      comboCount: 1,
      level: 5,
      rarity: 'common'
    },
    turkish_bow_legendary: {
      id: 'turkish_bow_legendary',
      name: 'Mete Han\'ın Yayı',
      type: WeaponType.TURKISH_BOW,
      damageType: DamageType.PHYSICAL,
      baseDamage: 150,
      attackSpeed: 1.2,
      range: 50.0,
      critChance: 0.40,
      critMultiplier: 3.0,
      stamCost: 15,
      comboCount: 3,
      specialAbility: 'turkish_arrow_rain', // Ok yağmuru
      level: 45,
      rarity: 'legendary'
    },

    // Mızrak (Spear)
    spear_basic: {
      id: 'spear_basic',
      name: 'Sipahi Mızrağı',
      type: WeaponType.SPEAR,
      damageType: DamageType.PHYSICAL,
      baseDamage: 50,
      attackSpeed: 1.0,
      range: 3.5,
      critChance: 0.12,
      critMultiplier: 1.6,
      stamCost: 14,
      comboCount: 2,
      level: 8,
      rarity: 'common'
    }
  };

  constructor(physicsEngine?: PhysicsEngine) {
    this.entities = new Map();
    this.damageHistory = [];
    this.physicsEngine = physicsEngine;
  }

  // Create combat entity
  public createEntity(
    id: string,
    name: string,
    type: CombatEntity['type'],
    weaponId: string = 'kilij_basic'
  ): CombatEntity {
    const weapon = this.TURKISH_WEAPONS[weaponId];
    if (!weapon) {
      throw new Error(`Weapon not found: ${weaponId}`);
    }

    const entity: CombatEntity = {
      id,
      name,
      type,
      stats: this.getDefaultStats(type),
      weapon,
      state: CombatState.IDLE,
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, 0, 0),
      comboCounter: 0,
      lastAttackTime: 0,
      statusEffects: new Map(),
      isInvulnerable: false,
      invulnerabilityTimer: 0
    };

    this.entities.set(id, entity);
    return entity;
  }

  private getDefaultStats(type: CombatEntity['type']): CombatStats {
    const baseStats: Record<CombatEntity['type'], CombatStats> = {
      player: {
        health: 1000,
        maxHealth: 1000,
        stamina: 100,
        maxStamina: 100,
        mana: 200,
        maxMana: 200,
        attack: 50,
        defense: 30,
        critChance: 0.15,
        critDamage: 1.5,
        attackSpeed: 1.0,
        movementSpeed: 5.0,
        dodgeChance: 0.20,
        blockChance: 0.30
      },
      npc: {
        health: 500,
        maxHealth: 500,
        stamina: 80,
        maxStamina: 80,
        mana: 100,
        maxMana: 100,
        attack: 30,
        defense: 20,
        critChance: 0.10,
        critDamage: 1.3,
        attackSpeed: 0.8,
        movementSpeed: 4.0,
        dodgeChance: 0.15,
        blockChance: 0.25
      },
      enemy: {
        health: 800,
        maxHealth: 800,
        stamina: 60,
        maxStamina: 60,
        mana: 50,
        maxMana: 50,
        attack: 40,
        defense: 25,
        critChance: 0.12,
        critDamage: 1.4,
        attackSpeed: 0.9,
        movementSpeed: 4.5,
        dodgeChance: 0.18,
        blockChance: 0.20
      },
      boss: {
        health: 5000,
        maxHealth: 5000,
        stamina: 200,
        maxStamina: 200,
        mana: 500,
        maxMana: 500,
        attack: 100,
        defense: 60,
        critChance: 0.20,
        critDamage: 2.0,
        attackSpeed: 1.2,
        movementSpeed: 3.0,
        dodgeChance: 0.10,
        blockChance: 0.40
      }
    };

    return { ...baseStats[type] };
  }

  // Attack mechanics
  public attack(attackerId: string, targetId: string): DamageInstance | null {
    const attacker = this.entities.get(attackerId);
    const target = this.entities.get(targetId);

    if (!attacker || !target) return null;
    if (attacker.state !== CombatState.IDLE && attacker.state !== CombatState.ATTACKING) return null;
    if (target.state === CombatState.DEAD) return null;

    // Check stamina
    if (attacker.stats.stamina < attacker.weapon.stamCost) {
      console.warn('Not enough stamina!');
      return null;
    }

    // Check range
    const distance = attacker.position.distanceTo(target.position);
    if (distance > attacker.weapon.range) {
      console.warn('Target out of range!');
      return null;
    }

    // Combo system
    const currentTime = Date.now();
    if (currentTime - attacker.lastAttackTime < this.comboCooldown) {
      attacker.comboCounter = Math.min(
        attacker.comboCounter + 1,
        attacker.weapon.comboCount
      );
    } else {
      attacker.comboCounter = 1;
    }
    attacker.lastAttackTime = currentTime;

    // Calculate damage
    const damage = this.calculateDamage(attacker, target);

    // Apply damage
    this.applyDamage(target, damage);

    // Consume stamina
    attacker.stats.stamina -= attacker.weapon.stamCost;

    // Set states
    attacker.state = CombatState.ATTACKING;
    setTimeout(() => {
      if (attacker.state === CombatState.ATTACKING) {
        attacker.state = CombatState.IDLE;
      }
    }, 1000 / attacker.weapon.attackSpeed);

    // Play sound effects
    this.playCombatSounds(attacker.weapon.type, damage.isCritical);

    // Store damage history
    this.damageHistory.push(damage);
    if (this.damageHistory.length > 100) {
      this.damageHistory.shift();
    }

    return damage;
  }

  private calculateDamage(attacker: CombatEntity, target: CombatEntity): DamageInstance {
    // Base damage
    let baseDamage = attacker.weapon.baseDamage + attacker.stats.attack;

    // Combo multiplier
    const comboMultiplier = 1 + (attacker.comboCounter - 1) * 0.1; // +10% per combo
    baseDamage *= comboMultiplier;

    // Critical hit
    const isCritical = Math.random() < (attacker.stats.critChance + attacker.weapon.critChance);
    if (isCritical) {
      baseDamage *= attacker.weapon.critMultiplier;
    }

    // Target defense
    const damageReduction = target.stats.defense / (target.stats.defense + 100);
    let finalDamage = baseDamage * (1 - damageReduction);

    // Target blocking
    if (target.state === CombatState.BLOCKING) {
      if (Math.random() < target.stats.blockChance) {
        finalDamage *= 0.3; // 70% damage reduction on block
        audioEngine.playSFX('sword_block');
      }
    }

    // Target invulnerability (dodge i-frames)
    if (target.isInvulnerable) {
      finalDamage = 0;
    }

    // Random variance (±10%)
    finalDamage *= 0.9 + Math.random() * 0.2;

    const damage: DamageInstance = {
      amount: Math.round(finalDamage),
      type: attacker.weapon.damageType,
      isCritical,
      source: attacker.id,
      target: target.id,
      timestamp: Date.now(),
      statusEffects: this.getStatusEffects(attacker.weapon)
    };

    return damage;
  }

  private applyDamage(target: CombatEntity, damage: DamageInstance): void {
    target.stats.health = Math.max(0, target.stats.health - damage.amount);

    // Apply status effects
    if (damage.statusEffects) {
      damage.statusEffects.forEach(effect => {
        this.applyStatusEffect(target, effect, 5000, damage.amount * 0.1);
      });
    }

    // Check death
    if (target.stats.health <= 0) {
      target.state = CombatState.DEAD;
      this.onEntityDeath(target);
    }

    // Hit reaction
    if (damage.amount > 0 && target.state !== CombatState.DEAD) {
      // Apply knockback via physics
      if (this.physicsEngine) {
        const direction = new THREE.Vector3()
          .subVectors(target.position, this.entities.get(damage.source)!.position)
          .normalize();

        this.physicsEngine.applyImpulse(target.id, {
          x: direction.x * damage.amount * 0.1,
          y: 0.5,
          z: direction.z * damage.amount * 0.1
        });
      }
    }
  }

  private getStatusEffects(weapon: Weapon): StatusEffect[] | undefined {
    const effects: StatusEffect[] = [];

    switch (weapon.damageType) {
      case DamageType.FIRE:
        effects.push(StatusEffect.BURNING);
        break;
      case DamageType.ICE:
        effects.push(StatusEffect.FROZEN);
        break;
      case DamageType.POISON:
        effects.push(StatusEffect.POISONED);
        break;
      case DamageType.PHYSICAL:
        if (weapon.type === WeaponType.KILIJ || weapon.type === WeaponType.YATAGHAN) {
          if (Math.random() < 0.2) {
            effects.push(StatusEffect.BLEEDING);
          }
        }
        break;
    }

    return effects.length > 0 ? effects : undefined;
  }

  private applyStatusEffect(
    entity: CombatEntity,
    effect: StatusEffect,
    duration: number,
    strength: number
  ): void {
    entity.statusEffects.set(effect, { duration, strength });

    // Apply immediate effects
    switch (effect) {
      case StatusEffect.FROZEN:
        entity.stats.movementSpeed *= 0.5;
        entity.stats.attackSpeed *= 0.7;
        break;
      case StatusEffect.SLOWED:
        entity.stats.movementSpeed *= 0.7;
        break;
      case StatusEffect.WEAKENED:
        entity.stats.attack *= 0.8;
        break;
    }
  }

  // Dodge mechanics
  public dodge(entityId: string): boolean {
    const entity = this.entities.get(entityId);
    if (!entity) return false;

    if (entity.stats.stamina < 20) return false;
    if (entity.state !== CombatState.IDLE) return false;

    entity.state = CombatState.DODGING;
    entity.stats.stamina -= 20;
    entity.isInvulnerable = true;
    entity.invulnerabilityTimer = this.dodgeIFrames;

    // Play dodge animation and sound
    audioEngine.playSFX('ui_success'); // Placeholder

    setTimeout(() => {
      entity.state = CombatState.IDLE;
      entity.isInvulnerable = false;
    }, this.dodgeIFrames);

    return true;
  }

  // Block mechanics
  public block(entityId: string, isBlocking: boolean): void {
    const entity = this.entities.get(entityId);
    if (!entity) return;

    if (isBlocking && entity.state === CombatState.IDLE) {
      entity.state = CombatState.BLOCKING;
    } else if (!isBlocking && entity.state === CombatState.BLOCKING) {
      entity.state = CombatState.IDLE;
    }
  }

  // Update loop
  public update(deltaTime: number): void {
    this.entities.forEach(entity => {
      // Regenerate stamina
      if (entity.state !== CombatState.DODGING && entity.state !== CombatState.ATTACKING) {
        entity.stats.stamina = Math.min(
          entity.stats.maxStamina,
          entity.stats.stamina + 10 * deltaTime
        );
      }

      // Regenerate mana
      entity.stats.mana = Math.min(
        entity.stats.maxMana,
        entity.stats.mana + 5 * deltaTime
      );

      // Update status effects
      entity.statusEffects.forEach((effect, type) => {
        effect.duration -= deltaTime * 1000;

        // Apply DoT (Damage over Time)
        if (type === StatusEffect.BURNING || type === StatusEffect.POISONED || type === StatusEffect.BLEEDING) {
          entity.stats.health -= effect.strength * deltaTime;
        }

        // Remove expired effects
        if (effect.duration <= 0) {
          entity.statusEffects.delete(type);
          this.removeStatusEffect(entity, type);
        }
      });

      // Check death
      if (entity.stats.health <= 0 && entity.state !== CombatState.DEAD) {
        entity.state = CombatState.DEAD;
        this.onEntityDeath(entity);
      }
    });
  }

  private removeStatusEffect(entity: CombatEntity, effect: StatusEffect): void {
    // Restore stats
    switch (effect) {
      case StatusEffect.FROZEN:
        entity.stats.movementSpeed /= 0.5;
        entity.stats.attackSpeed /= 0.7;
        break;
      case StatusEffect.SLOWED:
        entity.stats.movementSpeed /= 0.7;
        break;
      case StatusEffect.WEAKENED:
        entity.stats.attack /= 0.8;
        break;
    }
  }

  private onEntityDeath(entity: CombatEntity): void {
    console.log(`${entity.name} died!`);

    // Play death sound
    audioEngine.playSFX('ui_error'); // Placeholder

    // Trigger ragdoll physics
    if (this.physicsEngine) {
      this.physicsEngine.createRagdoll(entity.id, {
        x: entity.position.x,
        y: entity.position.y,
        z: entity.position.z
      });
    }

    // Drop loot, give XP, etc.
  }

  private playCombatSounds(weaponType: WeaponType, isCritical: boolean): void {
    switch (weaponType) {
      case WeaponType.KILIJ:
      case WeaponType.YATAGHAN:
      case WeaponType.PALA:
        audioEngine.playSFX(isCritical ? 'sword_hit' : 'sword_swing');
        break;
      case WeaponType.TURKISH_BOW:
      case WeaponType.CROSSBOW:
        audioEngine.playSFX('bow_shoot');
        break;
      case WeaponType.SPEAR:
        audioEngine.playSFX('sword_swing'); // Use similar sound
        break;
    }
  }

  // Getters
  public getEntity(id: string): CombatEntity | undefined {
    return this.entities.get(id);
  }

  public getDamageHistory(): DamageInstance[] {
    return [...this.damageHistory];
  }

  public getWeapon(weaponId: string): Weapon | undefined {
    return this.TURKISH_WEAPONS[weaponId];
  }

  public getAllWeapons(): Weapon[] {
    return Object.values(this.TURKISH_WEAPONS);
  }

  // Cleanup
  public removeEntity(id: string): void {
    this.entities.delete(id);
  }

  public dispose(): void {
    this.entities.clear();
    this.damageHistory = [];
  }
}
