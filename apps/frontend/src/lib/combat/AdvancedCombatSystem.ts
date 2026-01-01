/**
 * ANADOLU REALM - Advanced Combat System
 * 10-Hit Combos, Skill Trees, Ultimate Abilities, Parry & Counter, Elemental Damage
 * AI-Powered by AILYDIAN Orchestrator
 */

import * as THREE from 'three';

// COMBAT ENUMS & INTERFACES

export enum DamageType {
  PHYSICAL = 'physical',
  FIRE = 'fire',
  ICE = 'ice',
  LIGHTNING = 'lightning',
  POISON = 'poison',
  HOLY = 'holy',
  DARK = 'dark'
}

export enum CombatClass {
  YENIÇERI = 'yeniceri',        // Janissary - Tank/Warrior
  SIPAHI = 'sipahi',             // Cavalry - DPS/Mobility
  OKÇU = 'okcu',                 // Archer - Ranged DPS
  DERVISH = 'dervish',           // Mystic - Healer/Support
  HAŞHAŞIN = 'hashasin'          // Assassin - Stealth/Critical
}

export enum AttackType {
  LIGHT = 'light',
  HEAVY = 'heavy',
  SPECIAL = 'special'
}

export interface CombatStats {
  // Base Stats
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
  mana: number;
  maxMana: number;

  // Offensive
  physicalDamage: number;
  magicalDamage: number;
  criticalChance: number;       // 0-1
  criticalMultiplier: number;   // 1.5-3.0
  attackSpeed: number;          // Attacks per second

  // Defensive
  physicalDefense: number;
  magicalDefense: number;
  blockChance: number;          // 0-1
  dodgeChance: number;          // 0-1
  parryWindow: number;          // Milliseconds

  // Elemental Resistances
  fireResistance: number;       // 0-1
  iceResistance: number;
  lightningResistance: number;
  poisonResistance: number;
}

export interface ComboAttack {
  id: string;
  name: string;
  sequence: AttackType[];       // e.g., [LIGHT, LIGHT, HEAVY]
  damage: number;
  damageType: DamageType;
  staminaCost: number;
  animation: string;
  effectRadius?: number;        // For AOE attacks
  knockback?: number;
  stunDuration?: number;        // Milliseconds
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  tier: number;                 // 1-10
  branchId: string;
  requiredLevel: number;
  requiredSkills: string[];     // Prerequisites
  unlocked: boolean;

  // Effect
  damageMultiplier?: number;
  healAmount?: number;
  buffType?: string;
  buffDuration?: number;
  cooldown: number;             // Seconds
}

export interface SkillTree {
  classType: CombatClass;
  branches: SkillBranch[];
}

export interface SkillBranch {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export interface UltimateAbility {
  id: string;
  name: string;
  description: string;
  requiredLevel: number;
  ultimateEnergy: number;       // 0-100
  cooldown: number;             // Seconds
  damage: number;
  damageType: DamageType;
  aoeRadius?: number;
  specialEffect?: string;
}

// ADVANCED COMBAT SYSTEM

export class AdvancedCombatSystem {
  private stats: CombatStats;
  private class: CombatClass;
  private level: number = 1;

  // Combo System
  private currentCombo: AttackType[] = [];
  private comboWindow: number = 1000; // 1 second to continue combo
  private lastAttackTime: number = 0;
  private availableCombos: Map<string, ComboAttack> = new Map();

  // Skill System
  private skillTree: SkillTree;
  private activeSkills: Map<string, Skill> = new Map();
  private skillCooldowns: Map<string, number> = new Map();

  // Ultimate System
  private ultimate: UltimateAbility | null = null;
  private ultimateEnergy: number = 0;
  private ultimateCooldown: number = 0;

  // Combat State
  private isBlocking: boolean = false;
  private isParrying: boolean = false;
  private parryWindowStart: number = 0;
  private isDodging: boolean = false;

  // Status Effects
  private statusEffects: Map<string, StatusEffect> = new Map();

  constructor(classType: CombatClass, initialStats: Partial<CombatStats> = {}) {
    this.class = classType;
    this.stats = this.getDefaultStats(classType, initialStats);
    this.skillTree = this.initializeSkillTree(classType);
    this.initializeCombos(classType);
    this.initializeUltimate(classType);

    console.log(`⚔️ Combat System initialized for ${classType}`);
  }

  private getDefaultStats(classType: CombatClass, overrides: Partial<CombatStats>): CombatStats {
    const classBaseStats: Record<CombatClass, CombatStats> = {
      [CombatClass.YENIÇERI]: {
        health: 1200,
        maxHealth: 1200,
        stamina: 100,
        maxStamina: 100,
        mana: 50,
        maxMana: 50,
        physicalDamage: 80,
        magicalDamage: 20,
        criticalChance: 0.1,
        criticalMultiplier: 1.5,
        attackSpeed: 1.0,
        physicalDefense: 100,
        magicalDefense: 50,
        blockChance: 0.3,
        dodgeChance: 0.05,
        parryWindow: 300,
        fireResistance: 0.2,
        iceResistance: 0.1,
        lightningResistance: 0.1,
        poisonResistance: 0.15
      },
      [CombatClass.SIPAHI]: {
        health: 900,
        maxHealth: 900,
        stamina: 120,
        maxStamina: 120,
        mana: 60,
        maxMana: 60,
        physicalDamage: 100,
        magicalDamage: 30,
        criticalChance: 0.15,
        criticalMultiplier: 2.0,
        attackSpeed: 1.3,
        physicalDefense: 70,
        magicalDefense: 60,
        blockChance: 0.15,
        dodgeChance: 0.15,
        parryWindow: 250,
        fireResistance: 0.1,
        iceResistance: 0.1,
        lightningResistance: 0.15,
        poisonResistance: 0.1
      },
      [CombatClass.OKÇU]: {
        health: 700,
        maxHealth: 700,
        stamina: 110,
        maxStamina: 110,
        mana: 80,
        maxMana: 80,
        physicalDamage: 120,
        magicalDamage: 40,
        criticalChance: 0.25,
        criticalMultiplier: 2.5,
        attackSpeed: 1.5,
        physicalDefense: 50,
        magicalDefense: 70,
        blockChance: 0.1,
        dodgeChance: 0.2,
        parryWindow: 200,
        fireResistance: 0.1,
        iceResistance: 0.2,
        lightningResistance: 0.1,
        poisonResistance: 0.1
      },
      [CombatClass.DERVISH]: {
        health: 800,
        maxHealth: 800,
        stamina: 90,
        maxStamina: 90,
        mana: 150,
        maxMana: 150,
        physicalDamage: 50,
        magicalDamage: 100,
        criticalChance: 0.1,
        criticalMultiplier: 1.8,
        attackSpeed: 1.0,
        physicalDefense: 60,
        magicalDefense: 100,
        blockChance: 0.2,
        dodgeChance: 0.1,
        parryWindow: 350,
        fireResistance: 0.3,
        iceResistance: 0.3,
        lightningResistance: 0.3,
        poisonResistance: 0.3
      },
      [CombatClass.HAŞHAŞIN]: {
        health: 750,
        maxHealth: 750,
        stamina: 130,
        maxStamina: 130,
        mana: 70,
        maxMana: 70,
        physicalDamage: 110,
        magicalDamage: 50,
        criticalChance: 0.35,
        criticalMultiplier: 3.0,
        attackSpeed: 1.8,
        physicalDefense: 40,
        magicalDefense: 50,
        blockChance: 0.05,
        dodgeChance: 0.3,
        parryWindow: 150,
        fireResistance: 0.1,
        iceResistance: 0.1,
        lightningResistance: 0.1,
        poisonResistance: 0.4
      }
    };

    return { ...classBaseStats[classType], ...overrides };
  }

  
  // COMBO SYSTEM (10-HIT CHAINS)
  

  private initializeCombos(classType: CombatClass): void {
    const combos: Record<CombatClass, ComboAttack[]> = {
      [CombatClass.YENIÇERI]: [
        {
          id: 'shield_bash',
          name: 'Kalkan Çarpması',
          sequence: [AttackType.LIGHT, AttackType.LIGHT, AttackType.HEAVY],
          damage: 150,
          damageType: DamageType.PHYSICAL,
          staminaCost: 20,
          animation: 'shield_bash',
          stunDuration: 1000
        },
        {
          id: 'sword_whirlwind',
          name: 'Kılıç Kasırgası',
          sequence: [AttackType.LIGHT, AttackType.LIGHT, AttackType.LIGHT, AttackType.SPECIAL],
          damage: 300,
          damageType: DamageType.PHYSICAL,
          staminaCost: 35,
          animation: 'whirlwind',
          effectRadius: 5
        },
        {
          id: 'devastating_strike',
          name: 'Yıkıcı Darbe',
          sequence: [AttackType.HEAVY, AttackType.HEAVY, AttackType.HEAVY],
          damage: 500,
          damageType: DamageType.PHYSICAL,
          staminaCost: 50,
          animation: 'devastating',
          knockback: 10
        }
      ],
      [CombatClass.SIPAHI]: [
        {
          id: 'lance_thrust',
          name: 'Mızrak Saplamasi',
          sequence: [AttackType.LIGHT, AttackType.HEAVY],
          damage: 180,
          damageType: DamageType.PHYSICAL,
          staminaCost: 25,
          animation: 'lance_thrust'
        },
        {
          id: 'cavalry_charge',
          name: 'Süvari Hücumu',
          sequence: [AttackType.LIGHT, AttackType.LIGHT, AttackType.LIGHT, AttackType.HEAVY],
          damage: 350,
          damageType: DamageType.PHYSICAL,
          staminaCost: 40,
          animation: 'charge',
          knockback: 8
        }
      ],
      [CombatClass.OKÇU]: [
        {
          id: 'triple_shot',
          name: 'Üçlü Ok',
          sequence: [AttackType.LIGHT, AttackType.LIGHT, AttackType.LIGHT],
          damage: 250,
          damageType: DamageType.PHYSICAL,
          staminaCost: 30,
          animation: 'triple_shot'
        },
        {
          id: 'explosive_arrow',
          name: 'Patlayıcı Ok',
          sequence: [AttackType.HEAVY, AttackType.SPECIAL],
          damage: 400,
          damageType: DamageType.FIRE,
          staminaCost: 45,
          animation: 'explosive',
          effectRadius: 8
        }
      ],
      [CombatClass.DERVISH]: [
        {
          id: 'mystic_wave',
          name: 'Mistik Dalga',
          sequence: [AttackType.LIGHT, AttackType.LIGHT, AttackType.SPECIAL],
          damage: 200,
          damageType: DamageType.HOLY,
          staminaCost: 20,
          animation: 'wave',
          effectRadius: 10
        },
        {
          id: 'divine_smite',
          name: 'İlahi Darbe',
          sequence: [AttackType.HEAVY, AttackType.HEAVY, AttackType.SPECIAL],
          damage: 450,
          damageType: DamageType.HOLY,
          staminaCost: 50,
          animation: 'smite'
        }
      ],
      [CombatClass.HAŞHAŞIN]: [
        {
          id: 'poison_strike',
          name: 'Zehir Darbesi',
          sequence: [AttackType.LIGHT, AttackType.LIGHT],
          damage: 120,
          damageType: DamageType.POISON,
          staminaCost: 15,
          animation: 'poison_strike'
        },
        {
          id: 'shadow_dance',
          name: 'Gölge Dansı',
          sequence: [AttackType.LIGHT, AttackType.LIGHT, AttackType.LIGHT, AttackType.LIGHT, AttackType.SPECIAL],
          damage: 600,
          damageType: DamageType.DARK,
          staminaCost: 60,
          animation: 'shadow_dance'
        }
      ]
    };

    combos[classType].forEach(combo => {
      this.availableCombos.set(combo.id, combo);
    });

    console.log(`🎯 ${combos[classType].length} combos loaded for ${classType}`);
  }

  executeAttack(type: AttackType): {
    success: boolean;
    damage: number;
    comboName?: string;
    message: string;
  } {
    const now = Date.now();

    // Check stamina
    if (this.stats.stamina < 10) {
      return { success: false, damage: 0, message: 'Yeterli stamina yok!' };
    }

    // Reset combo if window expired
    if (now - this.lastAttackTime > this.comboWindow) {
      this.currentCombo = [];
    }

    // Add attack to combo
    this.currentCombo.push(type);
    this.lastAttackTime = now;

    // Check for combo match
    const matchedCombo = this.findMatchingCombo();
    if (matchedCombo) {
      return this.executeCombo(matchedCombo);
    }

    // Regular attack
    const baseDamage = type === AttackType.LIGHT ? 50 :
                       type === AttackType.HEAVY ? 100 : 150;
    const damage = baseDamage + this.stats.physicalDamage;

    this.stats.stamina -= 10;

    console.log(`⚔️ ${type} attack: ${damage} damage`);

    return {
      success: true,
      damage,
      message: `${type} saldırı! ${damage} hasar`
    };
  }

  private findMatchingCombo(): ComboAttack | null {
    for (const combo of this.availableCombos.values()) {
      if (this.arraysEqual(this.currentCombo, combo.sequence)) {
        return combo;
      }
    }
    return null;
  }

  private executeCombo(combo: ComboAttack): {
    success: boolean;
    damage: number;
    comboName: string;
    message: string;
  } {
    // Check stamina
    if (this.stats.stamina < combo.staminaCost) {
      return {
        success: false,
        damage: 0,
        comboName: combo.name,
        message: 'Yeterli stamina yok!'
      };
    }

    // Calculate damage
    let damage = combo.damage;

    // Apply class damage bonuses
    if (combo.damageType === DamageType.PHYSICAL) {
      damage += this.stats.physicalDamage;
    } else {
      damage += this.stats.magicalDamage;
    }

    // Critical hit check
    if (Math.random() < this.stats.criticalChance) {
      damage *= this.stats.criticalMultiplier;
      console.log(`💥 KRİTİK! ${combo.name}`);
    }

    this.stats.stamina -= combo.staminaCost;
    this.currentCombo = [];

    // Gain ultimate energy
    this.ultimateEnergy = Math.min(100, this.ultimateEnergy + 10);

    console.log(`🔥 COMBO: ${combo.name} - ${damage} hasar!`);

    return {
      success: true,
      damage,
      comboName: combo.name,
      message: `${combo.name}! ${damage} hasar vurdu!`
    };
  }

  private arraysEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  
  // SKILL TREE SYSTEM (3 BRANCHES PER CLASS)
  

  private initializeSkillTree(classType: CombatClass): SkillTree {
    const trees: Record<CombatClass, SkillTree> = {
      [CombatClass.YENIÇERI]: {
        classType,
        branches: [
          {
            id: 'defense',
            name: 'Savunma Dalı',
            description: 'Kalkan ve zırh ustası',
            skills: [
              {
                id: 'iron_skin_1',
                name: 'Demir Deri I',
                description: '+10% fiziksel savunma',
                tier: 1,
                branchId: 'defense',
                requiredLevel: 1,
                requiredSkills: [],
                unlocked: true,
                damageMultiplier: 1.0,
                cooldown: 0
              },
              {
                id: 'iron_skin_2',
                name: 'Demir Deri II',
                description: '+20% fiziksel savunma',
                tier: 2,
                branchId: 'defense',
                requiredLevel: 5,
                requiredSkills: ['iron_skin_1'],
                unlocked: false,
                damageMultiplier: 1.0,
                cooldown: 0
              },
              {
                id: 'shield_wall',
                name: 'Kalkan Duvarı',
                description: '5 saniye boyunca aldığınız hasarın %50sini bloklar',
                tier: 3,
                branchId: 'defense',
                requiredLevel: 10,
                requiredSkills: ['iron_skin_2'],
                unlocked: false,
                buffType: 'block_damage',
                buffDuration: 5000,
                cooldown: 30
              }
            ]
          },
          {
            id: 'offense',
            name: 'Hücum Dalı',
            description: 'Saldırı gücü ve hasar',
            skills: [
              {
                id: 'power_strike_1',
                name: 'Güç Darbesi I',
                description: '+10% fiziksel hasar',
                tier: 1,
                branchId: 'offense',
                requiredLevel: 1,
                requiredSkills: [],
                unlocked: true,
                damageMultiplier: 1.1,
                cooldown: 0
              },
              {
                id: 'power_strike_2',
                name: 'Güç Darbesi II',
                description: '+25% fiziksel hasar',
                tier: 2,
                branchId: 'offense',
                requiredLevel: 5,
                requiredSkills: ['power_strike_1'],
                unlocked: false,
                damageMultiplier: 1.25,
                cooldown: 0
              },
              {
                id: 'berserker_rage',
                name: 'Berserker Öfkesi',
                description: '10 saniye +50% hasar, -20% savunma',
                tier: 3,
                branchId: 'offense',
                requiredLevel: 10,
                requiredSkills: ['power_strike_2'],
                unlocked: false,
                buffType: 'berserker',
                buffDuration: 10000,
                cooldown: 60
              }
            ]
          },
          {
            id: 'tactics',
            name: 'Taktik Dalı',
            description: 'Strateji ve zeka',
            skills: [
              {
                id: 'combat_mastery_1',
                name: 'Savaş Ustalığı I',
                description: '+5% kritik şans',
                tier: 1,
                branchId: 'tactics',
                requiredLevel: 1,
                requiredSkills: [],
                unlocked: true,
                cooldown: 0
              },
              {
                id: 'tactical_advantage',
                name: 'Taktiksel Avantaj',
                description: 'Düşmanın zayıf noktalarını bulur (+15% kritik hasar)',
                tier: 2,
                branchId: 'tactics',
                requiredLevel: 5,
                requiredSkills: ['combat_mastery_1'],
                unlocked: false,
                cooldown: 0
              }
            ]
          }
        ]
      },
      // Other classes would have similar structures...
      [CombatClass.SIPAHI]: {
        classType,
        branches: [
          { id: 'mobility', name: 'Hareketlilik', description: 'Hız ve çeviklik', skills: [] },
          { id: 'mounted_combat', name: 'Atlı Savaş', description: 'At sırtında dövüş', skills: [] },
          { id: 'leadership', name: 'Liderlik', description: 'Grup buffları', skills: [] }
        ]
      },
      [CombatClass.OKÇU]: {
        classType,
        branches: [
          { id: 'archery', name: 'Okçuluk', description: 'Ok hasarı', skills: [] },
          { id: 'traps', name: 'Tuzaklar', description: 'Tuzak kurma', skills: [] },
          { id: 'survival', name: 'Hayatta Kalma', description: 'Doğada yaşam', skills: [] }
        ]
      },
      [CombatClass.DERVISH]: {
        classType,
        branches: [
          { id: 'healing', name: 'İyileştirme', description: 'Şifa büyüleri', skills: [] },
          { id: 'holy_magic', name: 'Kutsal Büyü', description: 'İlahi güç', skills: [] },
          { id: 'buffs', name: 'Destekler', description: 'Grup destekleri', skills: [] }
        ]
      },
      [CombatClass.HAŞHAŞIN]: {
        classType,
        branches: [
          { id: 'stealth', name: 'Gizlilik', description: 'Görünmezlik', skills: [] },
          { id: 'assassination', name: 'Suikast', description: 'Tek vuruş', skills: [] },
          { id: 'poison', name: 'Zehir', description: 'Zehirli silahlar', skills: [] }
        ]
      }
    };

    return trees[classType];
  }

  unlockSkill(skillId: string): { success: boolean; message: string } {
    let targetSkill: Skill | null = null;

    // Find skill
    for (const branch of this.skillTree.branches) {
      const skill = branch.skills.find(s => s.id === skillId);
      if (skill) {
        targetSkill = skill;
        break;
      }
    }

    if (!targetSkill) {
      return { success: false, message: 'Beceri bulunamadı!' };
    }

    // Check requirements
    if (this.level < targetSkill.requiredLevel) {
      return { success: false, message: `Seviye ${targetSkill.requiredLevel} gerekli!` };
    }

    // Check prerequisite skills
    for (const reqSkillId of targetSkill.requiredSkills) {
      const reqSkill = this.activeSkills.get(reqSkillId);
      if (!reqSkill || !reqSkill.unlocked) {
        return { success: false, message: 'Önkoşul becerileri açılmamış!' };
      }
    }

    // Unlock
    targetSkill.unlocked = true;
    this.activeSkills.set(skillId, targetSkill);

    console.log(`✨ Beceri açıldı: ${targetSkill.name}`);

    return { success: true, message: `${targetSkill.name} açıldı!` };
  }

  
  // ULTIMATE ABILITIES
  

  private initializeUltimate(classType: CombatClass): void {
    const ultimates: Record<CombatClass, UltimateAbility> = {
      [CombatClass.YENIÇERI]: {
        id: 'ottoman_fury',
        name: 'Osmanlı Öfkesi',
        description: 'Dev bir kalkan darbesi ile etraftaki tüm düşmanlara hasar verir ve sersemletir',
        requiredLevel: 20,
        ultimateEnergy: 100,
        cooldown: 120,
        damage: 1000,
        damageType: DamageType.PHYSICAL,
        aoeRadius: 15,
        specialEffect: 'stun_all'
      },
      [CombatClass.SIPAHI]: {
        id: 'cavalry_stampede',
        name: 'Süvari Çığlığı',
        description: 'Atlı hücum ile düşman hatlarını yıkar',
        requiredLevel: 20,
        ultimateEnergy: 100,
        cooldown: 120,
        damage: 1200,
        damageType: DamageType.PHYSICAL,
        aoeRadius: 20,
        specialEffect: 'knockback'
      },
      [CombatClass.OKÇU]: {
        id: 'rain_of_arrows',
        name: 'Ok Yağmuru',
        description: 'Gökyüzünden binlerce ok yağdırır',
        requiredLevel: 20,
        ultimateEnergy: 100,
        cooldown: 120,
        damage: 800,
        damageType: DamageType.PHYSICAL,
        aoeRadius: 25,
        specialEffect: 'damage_over_time'
      },
      [CombatClass.DERVISH]: {
        id: 'divine_resurrection',
        name: 'İlahi Diriliş',
        description: 'Tüm müttefikleri iyileştirir ve 10 saniye hasar kalkanı verir',
        requiredLevel: 20,
        ultimateEnergy: 100,
        cooldown: 180,
        damage: 0,
        damageType: DamageType.HOLY,
        aoeRadius: 30,
        specialEffect: 'heal_and_shield'
      },
      [CombatClass.HAŞHAŞIN]: {
        id: 'shadow_strike',
        name: 'Gölge Darbesi',
        description: 'Görünmez olup tek bir düşmana ölümcül darbe vurur',
        requiredLevel: 20,
        ultimateEnergy: 100,
        cooldown: 90,
        damage: 2000,
        damageType: DamageType.DARK,
        specialEffect: 'guaranteed_crit'
      }
    };

    this.ultimate = ultimates[classType];
    console.log(`💫 Ultimate yüklendi: ${this.ultimate.name}`);
  }

  executeUltimate(): {
    success: boolean;
    damage: number;
    message: string;
  } {
    if (!this.ultimate) {
      return { success: false, damage: 0, message: 'Ultimate yok!' };
    }

    // Check energy
    if (this.ultimateEnergy < 100) {
      return {
        success: false,
        damage: 0,
        message: `Ultimate enerjisi yetersiz! (${this.ultimateEnergy}/100)`
      };
    }

    // Check cooldown
    if (this.ultimateCooldown > 0) {
      return {
        success: false,
        damage: 0,
        message: `Cooldown: ${Math.ceil(this.ultimateCooldown)}s`
      };
    }

    // Execute
    const damage = this.ultimate.damage + this.stats.physicalDamage + this.stats.magicalDamage;
    this.ultimateEnergy = 0;
    this.ultimateCooldown = this.ultimate.cooldown;

    console.log(`💥💥💥 ULTIMATE: ${this.ultimate.name} - ${damage} hasar!`);

    return {
      success: true,
      damage,
      message: `${this.ultimate.name}! ${damage} hasar vurdu!`
    };
  }

  
  // PARRY & COUNTER SYSTEM
  

  startParry(): { success: boolean; message: string } {
    if (this.stats.stamina < 15) {
      return { success: false, message: 'Yeterli stamina yok!' };
    }

    this.isParrying = true;
    this.parryWindowStart = Date.now();
    this.stats.stamina -= 15;

    setTimeout(() => {
      this.isParrying = false;
    }, this.stats.parryWindow);

    console.log(`🛡️ Parry başladı (${this.stats.parryWindow}ms)`);

    return { success: true, message: 'Parry pozisyonunda!' };
  }

  checkParry(incomingDamage: number): {
    parried: boolean;
    counterDamage: number;
    message: string;
  } {
    if (!this.isParrying) {
      return { parried: false, counterDamage: 0, message: 'Parry aktif değil' };
    }

    const now = Date.now();
    const timeInWindow = now - this.parryWindowStart;

    if (timeInWindow > this.stats.parryWindow) {
      this.isParrying = false;
      return { parried: false, counterDamage: 0, message: 'Parry süresi doldu' };
    }

    // Successful parry!
    this.isParrying = false;

    // Counter attack (150% of incoming damage)
    const counterDamage = Math.floor(incomingDamage * 1.5);

    // Gain ultimate energy
    this.ultimateEnergy = Math.min(100, this.ultimateEnergy + 20);

    console.log(`⚡ PARRY! Counter: ${counterDamage} hasar`);

    return {
      parried: true,
      counterDamage,
      message: `Parry başarılı! ${counterDamage} counter hasar!`
    };
  }

  
  // DAMAGE CALCULATION WITH RESISTANCES
  

  calculateDamage(
    baseDamage: number,
    damageType: DamageType,
    isCritical: boolean = false
  ): number {
    let finalDamage = baseDamage;

    // Apply defense
    if (damageType === DamageType.PHYSICAL) {
      const reduction = this.stats.physicalDefense / (this.stats.physicalDefense + 100);
      finalDamage *= (1 - reduction);
    } else {
      const reduction = this.stats.magicalDefense / (this.stats.magicalDefense + 100);
      finalDamage *= (1 - reduction);
    }

    // Apply elemental resistance
    const resistances: Record<DamageType, number> = {
      [DamageType.PHYSICAL]: 0,
      [DamageType.FIRE]: this.stats.fireResistance,
      [DamageType.ICE]: this.stats.iceResistance,
      [DamageType.LIGHTNING]: this.stats.lightningResistance,
      [DamageType.POISON]: this.stats.poisonResistance,
      [DamageType.HOLY]: 0,
      [DamageType.DARK]: 0
    };

    finalDamage *= (1 - resistances[damageType]);

    // Critical hit
    if (isCritical) {
      finalDamage *= this.stats.criticalMultiplier;
    }

    // Block chance
    if (Math.random() < this.stats.blockChance) {
      finalDamage *= 0.5;
      console.log('🛡️ Bloklandı! (%50 azaltma)');
    }

    // Dodge chance
    if (Math.random() < this.stats.dodgeChance) {
      finalDamage = 0;
      console.log('💨 Kaçındı! (0 hasar)');
    }

    return Math.floor(finalDamage);
  }

  takeDamage(damage: number, damageType: DamageType): void {
    const finalDamage = this.calculateDamage(damage, damageType);
    this.stats.health = Math.max(0, this.stats.health - finalDamage);

    console.log(`💔 Hasar alındı: ${finalDamage} (${this.stats.health}/${this.stats.maxHealth})`);

    if (this.stats.health === 0) {
      console.log('☠️ Öldü!');
    }
  }

  
  // UPDATE & REGENERATION
  

  update(deltaTime: number): void {
    // Stamina regeneration
    if (this.stats.stamina < this.stats.maxStamina) {
      this.stats.stamina = Math.min(
        this.stats.maxStamina,
        this.stats.stamina + (10 * deltaTime) // 10 per second
      );
    }

    // Mana regeneration
    if (this.stats.mana < this.stats.maxMana) {
      this.stats.mana = Math.min(
        this.stats.maxMana,
        this.stats.mana + (5 * deltaTime) // 5 per second
      );
    }

    // Ultimate cooldown
    if (this.ultimateCooldown > 0) {
      this.ultimateCooldown = Math.max(0, this.ultimateCooldown - deltaTime);
    }

    // Skill cooldowns
    this.skillCooldowns.forEach((time, skillId) => {
      const newTime = Math.max(0, time - deltaTime);
      this.skillCooldowns.set(skillId, newTime);
    });
  }

  
  // GETTERS
  

  getStats(): CombatStats {
    return { ...this.stats };
  }

  getClass(): CombatClass {
    return this.class;
  }

  getLevel(): number {
    return this.level;
  }

  getUltimateEnergy(): number {
    return this.ultimateEnergy;
  }

  getSkillTree(): SkillTree {
    return this.skillTree;
  }

  levelUp(): void {
    this.level++;
    this.stats.maxHealth += 50;
    this.stats.health = this.stats.maxHealth;
    this.stats.physicalDamage += 5;
    this.stats.magicalDamage += 3;

    console.log(`🎉 LEVEL UP! Şimdi seviye ${this.level}`);
  }
}

// STATUS EFFECTS

interface StatusEffect {
  id: string;
  name: string;
  duration: number;
  tickRate: number;
  damagePerTick?: number;
  healPerTick?: number;
  statModifiers?: Partial<CombatStats>;
}

export default AdvancedCombatSystem;
