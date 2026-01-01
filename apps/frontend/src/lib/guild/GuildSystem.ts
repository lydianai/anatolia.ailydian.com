/**
 * ANADOLU REALM - Guild/Lonca System
 * Guild Creation, GvG Wars, Territory Control, Guild Skills, Guild Storage
 * AI-Powered by AILYDIAN Orchestrator
 */

import * as THREE from 'three';

// GUILD ENUMS & INTERFACES

export enum GuildRank {
  LEADER = 'leader',           // Lonca Başı
  OFFICER = 'officer',         // Subay
  VETERAN = 'veteran',         // Kıdemli
  MEMBER = 'member',           // Üye
  RECRUIT = 'recruit'          // Çırak
}

export enum TerritoryType {
  DISTRICT = 'district',       // Mahalle
  MARKET = 'market',           // Pazar
  FORTRESS = 'fortress',       // Kale
  MINE = 'mine',               // Maden
  FARM = 'farm',               // Çiftlik
  PORT = 'port'                // Liman
}

export enum GuildWarStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  FINISHED = 'finished',
  CANCELLED = 'cancelled'
}

export interface GuildMember {
  playerId: string;
  playerName: string;
  rank: GuildRank;
  contributionPoints: number;
  joinedAt: number;
  lastActive: number;
  level: number;
  class: string;
}

export interface Territory {
  id: string;
  name: string;
  type: TerritoryType;
  ownerId: string | null;      // Guild ID
  ownerName: string | null;
  position: THREE.Vector3;
  radius: number;

  // Resources
  dailyGoldIncome: number;
  dailyResourceIncome: { [key: string]: number };

  // Defense
  defenseLevel: number;        // 1-10
  walls: number;               // 0-100
  guards: number;              // Number of NPC guards

  // Status
  underAttack: boolean;
  attackerId: string | null;
  lastCaptured: number;
}

export interface GuildWar {
  id: string;
  attackerGuildId: string;
  defenderGuildId: string;
  territoryId: string;

  status: GuildWarStatus;
  startTime: number;
  endTime: number;
  duration: number;            // Milliseconds (typically 30-60 min)

  // Scores
  attackerScore: number;
  defenderScore: number;

  // Participants
  attackerMembers: string[];   // Player IDs
  defenderMembers: string[];

  // Results
  winner: string | null;
  rewards: GuildWarReward;
}

export interface GuildWarReward {
  gold: number;
  resources: { [key: string]: number };
  fame: number;
  territoryControl?: boolean;
}

export interface GuildSkill {
  id: string;
  name: string;
  description: string;
  level: number;               // 1-10
  maxLevel: number;

  // Cost
  goldCost: number;
  contributionCost: number;

  // Effects
  effect: GuildSkillEffect;
}

export interface GuildSkillEffect {
  type: 'combat' | 'economic' | 'social';

  // Combat buffs
  damageBonus?: number;        // +5% per level
  defenseBonus?: number;
  criticalBonus?: number;

  // Economic buffs
  goldIncomeBonus?: number;
  tradingBonus?: number;
  craftingBonus?: number;

  // Social buffs
  maxMembers?: number;
  dailyQuestSlots?: number;
}

export interface GuildStorage {
  gold: number;
  items: Map<string, StorageItem>;
  maxSlots: number;

  // Logs
  depositLog: StorageTransaction[];
  withdrawLog: StorageTransaction[];
}

export interface StorageItem {
  itemId: string;
  itemName: string;
  quantity: number;
  quality: string;
  depositedBy: string;
  depositedAt: number;
}

export interface StorageTransaction {
  playerId: string;
  playerName: string;
  itemId: string;
  itemName: string;
  quantity: number;
  type: 'deposit' | 'withdraw';
  timestamp: number;
}

export interface Guild {
  id: string;
  name: string;
  tag: string;                 // 2-4 letter tag [TAG]
  motto: string;
  emblem: string;              // URL or asset ID

  // Members
  members: Map<string, GuildMember>;
  maxMembers: number;

  // Metadata
  createdAt: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;

  // Resources
  treasury: number;            // Gold
  contributionPoints: number;

  // Territories
  territories: string[];       // Territory IDs

  // Skills
  skills: Map<string, GuildSkill>;

  // Storage
  storage: GuildStorage;

  // Statistics
  totalWars: number;
  warsWon: number;
  warsLost: number;
  fame: number;                // Ranking points

  // Settings
  recruitmentOpen: boolean;
  minLevelRequirement: number;
  requiresApproval: boolean;
  taxRate: number;             // 0-0.5 (% of member earnings)
}

// GUILD SYSTEM

export class GuildSystem {
  private guilds: Map<string, Guild> = new Map();
  private territories: Map<string, Territory> = new Map();
  private activeWars: Map<string, GuildWar> = new Map();

  // Global settings
  private readonly GUILD_CREATION_COST = 10000;
  private readonly MIN_MEMBERS_FOR_WAR = 5;
  private readonly WAR_DURATION = 30 * 60 * 1000; // 30 minutes
  private readonly MAX_CONCURRENT_WARS = 3;

  constructor() {
    this.initializeTerritories();
    this.initializeGuildSkills();

    console.log('🏰 Guild System initialized');
  }

  
  // GUILD CREATION & MANAGEMENT
  

  createGuild(
    leaderId: string,
    leaderName: string,
    leaderLevel: number,
    leaderClass: string,
    name: string,
    tag: string,
    motto: string
  ): { success: boolean; guild?: Guild; message: string } {
    // Validate tag
    if (tag.length < 2 || tag.length > 4) {
      return { success: false, message: 'Tag 2-4 karakter olmalı!' };
    }

    // Check if tag is taken
    const tagTaken = Array.from(this.guilds.values()).some(
      g => g.tag.toLowerCase() === tag.toLowerCase()
    );

    if (tagTaken) {
      return { success: false, message: 'Bu tag zaten alınmış!' };
    }

    // Check if name is taken
    const nameTaken = Array.from(this.guilds.values()).some(
      g => g.name.toLowerCase() === name.toLowerCase()
    );

    if (nameTaken) {
      return { success: false, message: 'Bu lonca adı zaten alınmış!' };
    }

    // Create guild
    const guildId = `guild_${Date.now()}`;

    const leader: GuildMember = {
      playerId: leaderId,
      playerName: leaderName,
      rank: GuildRank.LEADER,
      contributionPoints: 0,
      joinedAt: Date.now(),
      lastActive: Date.now(),
      level: leaderLevel,
      class: leaderClass
    };

    const guild: Guild = {
      id: guildId,
      name,
      tag,
      motto,
      emblem: 'default_emblem',
      members: new Map([[leaderId, leader]]),
      maxMembers: 20,
      createdAt: Date.now(),
      level: 1,
      experience: 0,
      experienceToNextLevel: 1000,
      treasury: 0,
      contributionPoints: 0,
      territories: [],
      skills: new Map(),
      storage: {
        gold: 0,
        items: new Map(),
        maxSlots: 50,
        depositLog: [],
        withdrawLog: []
      },
      totalWars: 0,
      warsWon: 0,
      warsLost: 0,
      fame: 0,
      recruitmentOpen: true,
      minLevelRequirement: 1,
      requiresApproval: false,
      taxRate: 0.05
    };

    this.guilds.set(guildId, guild);

    console.log(`🏰 Lonca kuruldu: [${tag}] ${name}`);

    return {
      success: true,
      guild,
      message: `[${tag}] ${name} loncası kuruldu!`
    };
  }

  invitePlayer(
    guildId: string,
    inviterId: string,
    playerId: string,
    playerName: string,
    playerLevel: number,
    playerClass: string
  ): { success: boolean; message: string } {
    const guild = this.guilds.get(guildId);

    if (!guild) {
      return { success: false, message: 'Lonca bulunamadı!' };
    }

    // Check inviter rank
    const inviter = guild.members.get(inviterId);
    if (!inviter || (inviter.rank !== GuildRank.LEADER && inviter.rank !== GuildRank.OFFICER)) {
      return { success: false, message: 'Davet etme yetkiniz yok!' };
    }

    // Check if guild is full
    if (guild.members.size >= guild.maxMembers) {
      return { success: false, message: 'Lonca dolu!' };
    }

    // Check level requirement
    if (playerLevel < guild.minLevelRequirement) {
      return {
        success: false,
        message: `Minimum seviye ${guild.minLevelRequirement} gerekli!`
      };
    }

    // Check if player is already in a guild
    const alreadyInGuild = Array.from(this.guilds.values()).some(g =>
      g.members.has(playerId)
    );

    if (alreadyInGuild) {
      return { success: false, message: 'Oyuncu zaten bir loncada!' };
    }

    // Add member
    const newMember: GuildMember = {
      playerId,
      playerName,
      rank: GuildRank.RECRUIT,
      contributionPoints: 0,
      joinedAt: Date.now(),
      lastActive: Date.now(),
      level: playerLevel,
      class: playerClass
    };

    guild.members.set(playerId, newMember);

    console.log(`👥 ${playerName} [${guild.tag}] loncasına katıldı`);

    return {
      success: true,
      message: `${playerName} loncaya katıldı!`
    };
  }

  promoteMemb(
    guildId: string,
    promoterId: string,
    targetId: string
  ): { success: boolean; message: string } {
    const guild = this.guilds.get(guildId);

    if (!guild) {
      return { success: false, message: 'Lonca bulunamadı!' };
    }

    const promoter = guild.members.get(promoterId);
    const target = guild.members.get(targetId);

    if (!promoter || !target) {
      return { success: false, message: 'Üye bulunamadı!' };
    }

    // Only leader can promote
    if (promoter.rank !== GuildRank.LEADER) {
      return { success: false, message: 'Sadece lonca başı terfi ettirebilir!' };
    }

    // Determine next rank
    const rankHierarchy: GuildRank[] = [
      GuildRank.RECRUIT,
      GuildRank.MEMBER,
      GuildRank.VETERAN,
      GuildRank.OFFICER
    ];

    const currentIndex = rankHierarchy.indexOf(target.rank);
    if (currentIndex === -1 || currentIndex === rankHierarchy.length - 1) {
      return { success: false, message: 'Terfi edilemez!' };
    }

    const newRank = rankHierarchy[currentIndex + 1];
    target.rank = newRank;

    console.log(`⬆️ ${target.playerName} → ${newRank}`);

    return {
      success: true,
      message: `${target.playerName} ${newRank} oldu!`
    };
  }

  kickMember(
    guildId: string,
    kickerId: string,
    targetId: string
  ): { success: boolean; message: string } {
    const guild = this.guilds.get(guildId);

    if (!guild) {
      return { success: false, message: 'Lonca bulunamadı!' };
    }

    const kicker = guild.members.get(kickerId);
    const target = guild.members.get(targetId);

    if (!kicker || !target) {
      return { success: false, message: 'Üye bulunamadı!' };
    }

    // Cannot kick leader
    if (target.rank === GuildRank.LEADER) {
      return { success: false, message: 'Lonca başı atılamaz!' };
    }

    // Check permissions
    if (kicker.rank !== GuildRank.LEADER && kicker.rank !== GuildRank.OFFICER) {
      return { success: false, message: 'Atma yetkiniz yok!' };
    }

    guild.members.delete(targetId);

    console.log(`❌ ${target.playerName} loncadan atıldı`);

    return {
      success: true,
      message: `${target.playerName} loncadan atıldı!`
    };
  }

  
  // TERRITORY CONTROL
  

  private initializeTerritories(): void {
    const territories: Territory[] = [
      {
        id: 'territory_fatih',
        name: 'Fatih Mahallesi',
        type: TerritoryType.DISTRICT,
        ownerId: null,
        ownerName: null,
        position: new THREE.Vector3(0, 0, 0),
        radius: 50,
        dailyGoldIncome: 500,
        dailyResourceIncome: { wood: 100, stone: 50 },
        defenseLevel: 3,
        walls: 60,
        guards: 10,
        underAttack: false,
        attackerId: null,
        lastCaptured: 0
      },
      {
        id: 'territory_eminonu_market',
        name: 'Eminönü Pazarı',
        type: TerritoryType.MARKET,
        ownerId: null,
        ownerName: null,
        position: new THREE.Vector3(100, 0, 50),
        radius: 40,
        dailyGoldIncome: 1000,
        dailyResourceIncome: { gold: 200 },
        defenseLevel: 2,
        walls: 40,
        guards: 5,
        underAttack: false,
        attackerId: null,
        lastCaptured: 0
      },
      {
        id: 'territory_fortress',
        name: 'Rumeli Hisarı',
        type: TerritoryType.FORTRESS,
        ownerId: null,
        ownerName: null,
        position: new THREE.Vector3(-100, 0, 100),
        radius: 80,
        dailyGoldIncome: 2000,
        dailyResourceIncome: { iron: 150, stone: 200 },
        defenseLevel: 8,
        walls: 90,
        guards: 30,
        underAttack: false,
        attackerId: null,
        lastCaptured: 0
      },
      {
        id: 'territory_mine',
        name: 'Çırpıcı Madeni',
        type: TerritoryType.MINE,
        ownerId: null,
        ownerName: null,
        position: new THREE.Vector3(150, 0, -50),
        radius: 60,
        dailyGoldIncome: 300,
        dailyResourceIncome: { iron: 300, copper: 150 },
        defenseLevel: 4,
        walls: 50,
        guards: 15,
        underAttack: false,
        attackerId: null,
        lastCaptured: 0
      }
    ];

    territories.forEach(t => this.territories.set(t.id, t));

    console.log(`🗺️ ${territories.length} territories initialized`);
  }

  declarWarr(
    attackerGuildId: string,
    defenderGuildId: string,
    territoryId: string
  ): { success: boolean; war?: GuildWar; message: string } {
    const attackerGuild = this.guilds.get(attackerGuildId);
    const defenderGuild = this.guilds.get(defenderGuildId);
    const territory = this.territories.get(territoryId);

    if (!attackerGuild || !defenderGuild || !territory) {
      return { success: false, message: 'Lonca veya bölge bulunamadı!' };
    }

    // Check if territory is owned by defender
    if (territory.ownerId !== defenderGuildId) {
      return { success: false, message: 'Bu bölge savunan loncaya ait değil!' };
    }

    // Check minimum members
    if (attackerGuild.members.size < this.MIN_MEMBERS_FOR_WAR) {
      return {
        success: false,
        message: `En az ${this.MIN_MEMBERS_FOR_WAR} üye gerekli!`
      };
    }

    // Check concurrent wars
    const attackerActiveWars = Array.from(this.activeWars.values()).filter(
      w => w.attackerGuildId === attackerGuildId && w.status === GuildWarStatus.ACTIVE
    );

    if (attackerActiveWars.length >= this.MAX_CONCURRENT_WARS) {
      return {
        success: false,
        message: `Maksimum ${this.MAX_CONCURRENT_WARS} eş zamanlı savaş!`
      };
    }

    // Create war
    const warId = `war_${Date.now()}`;
    const now = Date.now();

    const war: GuildWar = {
      id: warId,
      attackerGuildId,
      defenderGuildId,
      territoryId,
      status: GuildWarStatus.PENDING,
      startTime: now + (5 * 60 * 1000), // Starts in 5 minutes
      endTime: now + (5 * 60 * 1000) + this.WAR_DURATION,
      duration: this.WAR_DURATION,
      attackerScore: 0,
      defenderScore: 0,
      attackerMembers: [],
      defenderMembers: [],
      winner: null,
      rewards: {
        gold: 5000,
        resources: { fame: 100 },
        fame: 100,
        territoryControl: true
      }
    };

    this.activeWars.set(warId, war);
    territory.underAttack = true;
    territory.attackerId = attackerGuildId;

    attackerGuild.totalWars++;
    defenderGuild.totalWars++;

    console.log(`⚔️ Savaş ilan edildi: [${attackerGuild.tag}] vs [${defenderGuild.tag}]`);
    console.log(`🗺️ Bölge: ${territory.name}`);

    return {
      success: true,
      war,
      message: `${territory.name} için savaş başladı!`
    };
  }

  joinWar(warId: string, playerId: string, side: 'attacker' | 'defender'): {
    success: boolean;
    message: string;
  } {
    const war = this.activeWars.get(warId);

    if (!war) {
      return { success: false, message: 'Savaş bulunamadı!' };
    }

    if (war.status !== GuildWarStatus.PENDING && war.status !== GuildWarStatus.ACTIVE) {
      return { success: false, message: 'Savaş katılıma kapalı!' };
    }

    const targetArray = side === 'attacker' ? war.attackerMembers : war.defenderMembers;

    if (targetArray.includes(playerId)) {
      return { success: false, message: 'Zaten savaştasınız!' };
    }

    targetArray.push(playerId);

    console.log(`⚔️ ${playerId} savaşa katıldı (${side})`);

    return {
      success: true,
      message: 'Savaşa katıldınız!'
    };
  }

  updateWarScore(warId: string, side: 'attacker' | 'defender', points: number): void {
    const war = this.activeWars.get(warId);

    if (!war || war.status !== GuildWarStatus.ACTIVE) return;

    if (side === 'attacker') {
      war.attackerScore += points;
    } else {
      war.defenderScore += points;
    }

    console.log(`📊 War Score: ${war.attackerScore} - ${war.defenderScore}`);
  }

  endWar(warId: string): { success: boolean; winner: string; message: string } {
    const war = this.activeWars.get(warId);

    if (!war) {
      return { success: false, winner: '', message: 'Savaş bulunamadı!' };
    }

    const attackerGuild = this.guilds.get(war.attackerGuildId);
    const defenderGuild = this.guilds.get(war.defenderGuildId);
    const territory = this.territories.get(war.territoryId);

    if (!attackerGuild || !defenderGuild || !territory) {
      return { success: false, winner: '', message: 'Lonca veya bölge bulunamadı!' };
    }

    // Determine winner
    const winner = war.attackerScore > war.defenderScore
      ? war.attackerGuildId
      : war.defenderGuildId;

    const winnerGuild = winner === war.attackerGuildId ? attackerGuild : defenderGuild;
    const loserGuild = winner === war.attackerGuildId ? defenderGuild : attackerGuild;

    war.winner = winner;
    war.status = GuildWarStatus.FINISHED;

    // Update guild stats
    winnerGuild.warsWon++;
    winnerGuild.fame += war.rewards.fame;
    winnerGuild.treasury += war.rewards.gold;

    loserGuild.warsLost++;

    // Transfer territory if attacker won
    if (winner === war.attackerGuildId) {
      if (defenderGuild.territories.includes(war.territoryId)) {
        defenderGuild.territories = defenderGuild.territories.filter(
          id => id !== war.territoryId
        );
      }

      attackerGuild.territories.push(war.territoryId);
      territory.ownerId = attackerGuildId;
      territory.ownerName = attackerGuild.name;

      console.log(`🏴 ${territory.name} → [${attackerGuild.tag}] ${attackerGuild.name}`);
    }

    territory.underAttack = false;
    territory.attackerId = null;
    territory.lastCaptured = Date.now();

    this.activeWars.delete(warId);

    console.log(`🏆 Savaş bitti! Kazanan: [${winnerGuild.tag}] ${winnerGuild.name}`);

    return {
      success: true,
      winner: winnerGuild.name,
      message: `${winnerGuild.name} savaşı kazandı!`
    };
  }

  
  // GUILD SKILLS
  

  private initializeGuildSkills(): void {
    // Skills are initialized per guild when created
  }

  unlockGuildSkill(guildId: string, skillId: string): {
    success: boolean;
    message: string;
  } {
    const guild = this.guilds.get(guildId);

    if (!guild) {
      return { success: false, message: 'Lonca bulunamadı!' };
    }

    // Get available skills
    const availableSkills = this.getAvailableGuildSkills();
    const skill = availableSkills.find(s => s.id === skillId);

    if (!skill) {
      return { success: false, message: 'Beceri bulunamadı!' };
    }

    // Check if already unlocked
    if (guild.skills.has(skillId)) {
      return { success: false, message: 'Beceri zaten açılmış!' };
    }

    // Check cost
    if (guild.treasury < skill.goldCost) {
      return { success: false, message: 'Yeterli altın yok!' };
    }

    if (guild.contributionPoints < skill.contributionCost) {
      return { success: false, message: 'Yeterli katkı puanı yok!' };
    }

    // Unlock skill
    guild.treasury -= skill.goldCost;
    guild.contributionPoints -= skill.contributionCost;
    guild.skills.set(skillId, { ...skill, level: 1 });

    // Apply effects
    this.applyGuildSkillEffects(guild, skill);

    console.log(`✨ Beceri açıldı: ${skill.name}`);

    return {
      success: true,
      message: `${skill.name} açıldı!`
    };
  }

  private getAvailableGuildSkills(): GuildSkill[] {
    return [
      {
        id: 'skill_combat_mastery',
        name: 'Savaş Ustalığı',
        description: 'Tüm üyelere +5% hasar bonusu',
        level: 0,
        maxLevel: 10,
        goldCost: 5000,
        contributionCost: 1000,
        effect: {
          type: 'combat',
          damageBonus: 0.05
        }
      },
      {
        id: 'skill_iron_defense',
        name: 'Demir Savunma',
        description: 'Tüm üyelere +5% savunma bonusu',
        level: 0,
        maxLevel: 10,
        goldCost: 5000,
        contributionCost: 1000,
        effect: {
          type: 'combat',
          defenseBonus: 0.05
        }
      },
      {
        id: 'skill_wealthy_trade',
        name: 'Zengin Ticaret',
        description: '+10% altın geliri',
        level: 0,
        maxLevel: 10,
        goldCost: 10000,
        contributionCost: 2000,
        effect: {
          type: 'economic',
          goldIncomeBonus: 0.1
        }
      },
      {
        id: 'skill_expanded_ranks',
        name: 'Genişletilmiş Kadro',
        description: '+5 maksimum üye',
        level: 0,
        maxLevel: 5,
        goldCost: 15000,
        contributionCost: 3000,
        effect: {
          type: 'social',
          maxMembers: 5
        }
      }
    ];
  }

  private applyGuildSkillEffects(guild: Guild, skill: GuildSkill): void {
    if (skill.effect.maxMembers) {
      guild.maxMembers += skill.effect.maxMembers;
    }
  }

  
  // GUILD STORAGE
  

  depositToStorage(
    guildId: string,
    playerId: string,
    playerName: string,
    itemId: string,
    itemName: string,
    quantity: number,
    quality: string = 'common'
  ): { success: boolean; message: string } {
    const guild = this.guilds.get(guildId);

    if (!guild) {
      return { success: false, message: 'Lonca bulunamadı!' };
    }

    // Check if member
    if (!guild.members.has(playerId)) {
      return { success: false, message: 'Lonca üyesi değilsiniz!' };
    }

    // Check storage limit
    if (guild.storage.items.size >= guild.storage.maxSlots) {
      return { success: false, message: 'Depo dolu!' };
    }

    // Add item
    const existingItem = guild.storage.items.get(itemId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      guild.storage.items.set(itemId, {
        itemId,
        itemName,
        quantity,
        quality,
        depositedBy: playerId,
        depositedAt: Date.now()
      });
    }

    // Log transaction
    guild.storage.depositLog.push({
      playerId,
      playerName,
      itemId,
      itemName,
      quantity,
      type: 'deposit',
      timestamp: Date.now()
    });

    // Add contribution points
    const member = guild.members.get(playerId);
    if (member) {
      member.contributionPoints += quantity * 10;
    }

    console.log(`📦 ${playerName} depoya ${quantity}x ${itemName} ekledi`);

    return {
      success: true,
      message: `${quantity}x ${itemName} depoya eklendi!`
    };
  }

  withdrawFromStorage(
    guildId: string,
    playerId: string,
    playerName: string,
    itemId: string,
    quantity: number
  ): { success: boolean; message: string } {
    const guild = this.guilds.get(guildId);

    if (!guild) {
      return { success: false, message: 'Lonca bulunamadı!' };
    }

    const member = guild.members.get(playerId);

    if (!member) {
      return { success: false, message: 'Lonca üyesi değilsiniz!' };
    }

    // Check rank (only officers and above can withdraw)
    if (member.rank === GuildRank.RECRUIT || member.rank === GuildRank.MEMBER) {
      return { success: false, message: 'Çekme yetkiniz yok!' };
    }

    // Check if item exists
    const item = guild.storage.items.get(itemId);

    if (!item) {
      return { success: false, message: 'Eşya bulunamadı!' };
    }

    if (item.quantity < quantity) {
      return { success: false, message: 'Yetersiz miktar!' };
    }

    // Withdraw
    item.quantity -= quantity;

    if (item.quantity === 0) {
      guild.storage.items.delete(itemId);
    }

    // Log transaction
    guild.storage.withdrawLog.push({
      playerId,
      playerName,
      itemId,
      itemName: item.itemName,
      quantity,
      type: 'withdraw',
      timestamp: Date.now()
    });

    console.log(`📤 ${playerName} depodan ${quantity}x ${item.itemName} çekti`);

    return {
      success: true,
      message: `${quantity}x ${item.itemName} çekildi!`
    };
  }

  
  // GETTERS
  

  getGuild(guildId: string): Guild | undefined {
    return this.guilds.get(guildId);
  }

  getAllGuilds(): Guild[] {
    return Array.from(this.guilds.values());
  }

  getTopGuildsByFame(limit: number = 10): Guild[] {
    return Array.from(this.guilds.values())
      .sort((a, b) => b.fame - a.fame)
      .slice(0, limit);
  }

  getTerritory(territoryId: string): Territory | undefined {
    return this.territories.get(territoryId);
  }

  getAllTerritories(): Territory[] {
    return Array.from(this.territories.values());
  }

  getGuildTerritories(guildId: string): Territory[] {
    return Array.from(this.territories.values()).filter(
      t => t.ownerId === guildId
    );
  }

  getActiveWars(): GuildWar[] {
    return Array.from(this.activeWars.values()).filter(
      w => w.status === GuildWarStatus.ACTIVE
    );
  }

  getGuildWars(guildId: string): GuildWar[] {
    return Array.from(this.activeWars.values()).filter(
      w => w.attackerGuildId === guildId || w.defenderGuildId === guildId
    );
  }
}

export default GuildSystem;
