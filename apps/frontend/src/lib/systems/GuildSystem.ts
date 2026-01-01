/**
 * TÜRK LONCA SİSTEMİ
 * EVE Online + World of Warcraft kalitesinde
 * Türk sosyal dinamikleri ve kültürel öğeler
 */

export enum GuildRole {
  LONCA_BASI = 'lonca_basi', // Guild Master
  KETHUDA = 'kethuda', // Second in command (Ottoman term)
  KALFA = 'kalfa', // Officer/Veteran
  CIRAK = 'cirak', // Member/Apprentice
  UCUBE = 'ucube', // Newbie/Trial
}

export enum GuildPermission {
  INVITE_MEMBERS = 'invite_members',
  KICK_MEMBERS = 'kick_members',
  PROMOTE_DEMOTE = 'promote_demote',
  EDIT_INFO = 'edit_info',
  MANAGE_TREASURY = 'manage_treasury',
  START_GUILD_QUEST = 'start_guild_quest',
  DECLARE_WAR = 'declare_war',
  MANAGE_ALLIANCES = 'manage_alliances',
  EDIT_RANKS = 'edit_ranks',
  MANAGE_BANK = 'manage_bank',
}

export enum GuildType {
  TICARET = 'ticaret', // Trading guild
  SAVASCI = 'savasci', // Combat guild
  ZANAAT = 'zanaat', // Crafting guild
  SOSYAL = 'sosyal', // Social guild
  PVP = 'pvp', // PvP focused
  PVE = 'pve', // PvE focused
  KARIŞTIR = 'kariştir', // Mixed/Casual
}

export enum GuildActivityType {
  MEMBER_JOIN = 'member_join',
  MEMBER_LEAVE = 'member_leave',
  MEMBER_KICKED = 'member_kicked',
  RANK_CHANGE = 'rank_change',
  DONATION = 'donation',
  GUILD_QUEST_COMPLETE = 'guild_quest_complete',
  WAR_DECLARED = 'war_declared',
  WAR_WON = 'war_won',
  TERRITORY_CAPTURED = 'territory_captured',
  GUILD_LEVEL_UP = 'guild_level_up',
  ACHIEVEMENT_UNLOCKED = 'achievement_unlocked',
  CAY_SAATI = 'cay_saati', // Tea time event (Turkish cultural)
  BAYRAM_KUTLAMA = 'bayram_kutlama', // Holiday celebration
}

export interface GuildMember {
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  role: GuildRole;
  joinedAt: Date;
  lastOnline: Date;
  level: number;
  contributionPoints: number; // Guild contribution
  weeklyActivity: number; // Activity score this week
  totalDonations: number; // Total gold donated
  guildQuestsCompleted: number;
  note?: string; // Personal note from officers
  isOnline: boolean;
}

export interface GuildRank {
  id: string;
  name: string;
  role: GuildRole;
  permissions: GuildPermission[];
  color: string; // Hex color for display
  icon: string;
  order: number; // Display order (1 = highest)
}

export interface GuildPerk {
  id: string;
  name: string;
  nameEN: string;
  description: string;
  icon: string;
  level: number; // Required guild level
  cost: number; // Contribution points cost
  effects: {
    type: 'xp_boost' | 'gold_boost' | 'storage' | 'teleport' | 'buff' | 'discount';
    value: number;
    duration?: number; // Minutes
  }[];
  unlocked: boolean;
}

export interface GuildTerritory {
  id: string;
  name: string; // "Taksim Meydanı", "Kapalıçarşı"
  region: string; // Istanbul, Ankara, Izmir
  controlledBy?: string; // Guild ID
  capturedAt?: Date;
  resources: {
    gold: number;
    materials: number;
  };
  defenseLevel: number;
  population: number; // NPC population
}

export interface GuildWar {
  id: string;
  attackerGuildId: string;
  defenderGuildId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'active' | 'completed';
  score: {
    attacker: number;
    defender: number;
  };
  territory?: string; // Territory being fought over
  stakes: {
    gold: number;
    territory?: string;
    reputation: number;
  };
  winner?: string; // Guild ID
}

export interface GuildAlliance {
  guildId: string;
  guildName: string;
  establishedAt: Date;
  type: 'trade' | 'defense' | 'full'; // Alliance type
  benefits: string[];
}

export interface GuildActivity {
  id: string;
  type: GuildActivityType;
  actor: {
    userId: string;
    username: string;
  };
  target?: {
    userId?: string;
    username?: string;
    guildId?: string;
    guildName?: string;
  };
  timestamp: Date;
  details: string;
  icon: string;
}

export interface GuildEvent {
  id: string;
  title: string;
  description: string;
  type: 'raid' | 'dungeon' | 'pvp' | 'social' | 'cay_saati' | 'iftar';
  startTime: Date;
  duration: number; // Minutes
  organizer: string; // User ID
  participants: string[]; // User IDs
  maxParticipants: number;
  minLevel: number;
  rewards?: {
    xp: number;
    gold: number;
    items?: any[];
  };
  location: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

export interface Guild {
  id: string;
  name: string;
  tag: string; // 3-5 character tag [TURK]
  motto: string; // Guild motto/slogan
  description: string;
  type: GuildType;
  region: string; // Main region (Istanbul, Ankara, etc.)

  // Leadership
  leaderId: string;
  foundedAt: Date;
  foundedBy: string;

  // Members
  members: Map<string, GuildMember>;
  maxMembers: number;
  ranks: GuildRank[];

  // Progression
  level: number;
  experience: number;
  experienceToNext: number;
  reputation: number;

  // Resources
  treasury: {
    gold: number;
    materials: Record<string, number>;
  };

  // Perks & Benefits
  perks: GuildPerk[];
  activeBuffs: Array<{
    perkId: string;
    expiresAt: Date;
  }>;

  // Territory & Warfare
  territories: string[]; // Territory IDs
  activeWars: GuildWar[];
  warHistory: GuildWar[];

  // Alliances
  alliances: GuildAlliance[];
  enemies: string[]; // Guild IDs

  // Social
  activities: GuildActivity[];
  events: GuildEvent[];
  announcements: Array<{
    id: string;
    title: string;
    content: string;
    author: string;
    timestamp: Date;
    pinned: boolean;
  }>;

  // Guild Hall
  hall: {
    level: number;
    decorations: string[];
    facilities: Array<{
      type: 'bank' | 'vendor' | 'cay_evi' | 'training' | 'forge';
      level: number;
    }>;
  };

  // Turkish Cultural Elements
  cayEviActive: boolean; // Çay evi (Tea house) - social gathering
  lastCaySaati?: Date; // Last tea time event
  bayramBonus: number; // Bonus during Turkish holidays

  // Settings
  recruitmentOpen: boolean;
  minLevelRequirement: number;
  requiresApplication: boolean;
  isPublic: boolean;
  language: string; // Primary language (TR, EN, etc.)

  // Statistics
  stats: {
    totalQuestsCompleted: number;
    totalRaidsCompleted: number;
    totalPvPWins: number;
    totalPvPLosses: number;
    totalWarWins: number;
    totalWarLosses: number;
    territoriesConquered: number;
    totalDonations: number;
  };
}

/**
 * TÜRK LONCA PERK'LERİ
 */
export const TURKISH_GUILD_PERKS: GuildPerk[] = [
  {
    id: 'cay-bonusu',
    name: 'Çay Bonusu',
    nameEN: 'Tea Bonus',
    description: 'Her lonca üyesi günde 1 kere ücretsiz çay içer ve +10% XP bonus alır (2 saat)',
    icon: '☕',
    level: 1,
    cost: 100,
    effects: [
      { type: 'xp_boost', value: 10, duration: 120 }
    ],
    unlocked: false
  },
  {
    id: 'simidcilik',
    name: 'Simitçilik Ustalığı',
    nameEN: 'Master Simit Seller',
    description: 'Lonca simit satışlarından %20 ekstra gelir',
    icon: '🥨',
    level: 2,
    cost: 250,
    effects: [
      { type: 'gold_boost', value: 20 }
    ],
    unlocked: false
  },
  {
    id: 'lonca-deposu',
    name: 'Lonca Deposu',
    nameEN: 'Guild Vault',
    description: '+100 depo slotu (lonca deposu)',
    icon: '🏦',
    level: 3,
    cost: 500,
    effects: [
      { type: 'storage', value: 100 }
    ],
    unlocked: false
  },
  {
    id: 'hizli-ulasim',
    name: 'Hızlı Ulaşım',
    nameEN: 'Fast Travel',
    description: 'Lonca üyeleri lonca merkezine ışınlanabilir (cooldown: 30dk)',
    icon: '⚡',
    level: 4,
    cost: 750,
    effects: [
      { type: 'teleport', value: 1 }
    ],
    unlocked: false
  },
  {
    id: 'pazarlik-ustasi',
    name: 'Pazarlık Ustası',
    nameEN: 'Master Negotiator',
    description: 'Tüm NPC alışverişlerinde %15 indirim',
    icon: '💰',
    level: 5,
    cost: 1000,
    effects: [
      { type: 'discount', value: 15 }
    ],
    unlocked: false
  },
  {
    id: 'cay-evi',
    name: 'Lonca Çay Evi',
    nameEN: 'Guild Tea House',
    description: 'Lonca merkezinde çay evi açılır, üyeler burada toplanabilir',
    icon: '🏠',
    level: 6,
    cost: 1500,
    effects: [
      { type: 'buff', value: 5, duration: 180 }
    ],
    unlocked: false
  },
  {
    id: 'ottoman-bayragi',
    name: 'Osmanlı Bayrağı',
    nameEN: 'Ottoman Banner',
    description: 'Lonca bayrağı altında savaşan üyeler +25% damage, +15% defense',
    icon: '🚩',
    level: 10,
    cost: 5000,
    effects: [
      { type: 'buff', value: 25 },
      { type: 'buff', value: 15 }
    ],
    unlocked: false
  }
];

/**
 * TÜRK LONCA SİSTEMİ MANAGER
 */
export class GuildSystem {
  private guilds: Map<string, Guild> = new Map();
  private userGuilds: Map<string, string> = new Map(); // userId -> guildId
  private territories: Map<string, GuildTerritory> = new Map();

  constructor() {
    this.loadGuilds();
    this.initializeTerritories();
    this.startCaySaatiScheduler();
  }

  /**
   * Lonca oluştur
   */
  createGuild(
    name: string,
    tag: string,
    motto: string,
    type: GuildType,
    founderId: string,
    founderData: { username: string; displayName: string; avatar: string; level: number }
  ): Guild | null {
    // Validations
    if (name.length < 3 || name.length > 30) return null;
    if (tag.length < 2 || tag.length > 5) return null;
    if (this.userGuilds.has(founderId)) return null; // Already in guild

    // Check if name/tag exists
    const nameExists = Array.from(this.guilds.values()).some(
      g => g.name.toLowerCase() === name.toLowerCase() || g.tag.toLowerCase() === tag.toLowerCase()
    );
    if (nameExists) return null;

    const guildId = `guild-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const guild: Guild = {
      id: guildId,
      name,
      tag,
      motto,
      description: '',
      type,
      region: 'Istanbul',
      leaderId: founderId,
      foundedAt: new Date(),
      foundedBy: founderId,
      members: new Map(),
      maxMembers: 50,
      ranks: this.getDefaultRanks(),
      level: 1,
      experience: 0,
      experienceToNext: 1000,
      reputation: 0,
      treasury: {
        gold: 0,
        materials: {}
      },
      perks: [...TURKISH_GUILD_PERKS],
      activeBuffs: [],
      territories: [],
      activeWars: [],
      warHistory: [],
      alliances: [],
      enemies: [],
      activities: [],
      events: [],
      announcements: [],
      hall: {
        level: 1,
        decorations: [],
        facilities: [
          { type: 'bank', level: 1 }
        ]
      },
      cayEviActive: false,
      bayramBonus: 0,
      recruitmentOpen: true,
      minLevelRequirement: 1,
      requiresApplication: false,
      isPublic: true,
      language: 'TR',
      stats: {
        totalQuestsCompleted: 0,
        totalRaidsCompleted: 0,
        totalPvPWins: 0,
        totalPvPLosses: 0,
        totalWarWins: 0,
        totalWarLosses: 0,
        territoriesConquered: 0,
        totalDonations: 0
      }
    };

    // Add founder as guild master
    const founderMember: GuildMember = {
      userId: founderId,
      username: founderData.username,
      displayName: founderData.displayName,
      avatar: founderData.avatar,
      role: GuildRole.LONCA_BASI,
      joinedAt: new Date(),
      lastOnline: new Date(),
      level: founderData.level,
      contributionPoints: 0,
      weeklyActivity: 0,
      totalDonations: 0,
      guildQuestsCompleted: 0,
      isOnline: true
    };

    guild.members.set(founderId, founderMember);
    this.guilds.set(guildId, guild);
    this.userGuilds.set(founderId, guildId);

    this.addActivity(guild, {
      type: GuildActivityType.MEMBER_JOIN,
      actor: { userId: founderId, username: founderData.username },
      details: `${founderData.displayName} loncayı kurdu!`,
      icon: '🎉'
    });

    this.saveGuilds();
    return guild;
  }

  /**
   * Loncaya katıl
   */
  joinGuild(guildId: string, userId: string, userData: {
    username: string;
    displayName: string;
    avatar: string;
    level: number;
  }): boolean {
    const guild = this.guilds.get(guildId);
    if (!guild) return false;

    // Already in a guild?
    if (this.userGuilds.has(userId)) return false;

    // Guild full?
    if (guild.members.size >= guild.maxMembers) return false;

    // Level requirement?
    if (userData.level < guild.minLevelRequirement) return false;

    // Requires application? (for now, auto-accept)
    if (guild.requiresApplication) {
      // TODO: Implement application system
    }

    const newMember: GuildMember = {
      userId,
      username: userData.username,
      displayName: userData.displayName,
      avatar: userData.avatar,
      role: GuildRole.UCUBE, // Start as newbie
      joinedAt: new Date(),
      lastOnline: new Date(),
      level: userData.level,
      contributionPoints: 0,
      weeklyActivity: 0,
      totalDonations: 0,
      guildQuestsCompleted: 0,
      isOnline: true
    };

    guild.members.set(userId, newMember);
    this.userGuilds.set(userId, guildId);

    this.addActivity(guild, {
      type: GuildActivityType.MEMBER_JOIN,
      actor: { userId, username: userData.username },
      details: `${userData.displayName} loncaya katıldı! Hoş geldin! 🎉`,
      icon: '👋'
    });

    this.saveGuilds();
    return true;
  }

  /**
   * Loncadan ayrıl
   */
  leaveGuild(guildId: string, userId: string): boolean {
    const guild = this.guilds.get(guildId);
    if (!guild) return false;

    const member = guild.members.get(userId);
    if (!member) return false;

    // Guild master can't leave (must transfer or disband)
    if (member.role === GuildRole.LONCA_BASI) return false;

    guild.members.delete(userId);
    this.userGuilds.delete(userId);

    this.addActivity(guild, {
      type: GuildActivityType.MEMBER_LEAVE,
      actor: { userId, username: member.username },
      details: `${member.displayName} loncadan ayrıldı`,
      icon: '👋'
    });

    this.saveGuilds();
    return true;
  }

  /**
   * Bağış yap
   */
  donate(guildId: string, userId: string, amount: number): boolean {
    const guild = this.guilds.get(guildId);
    if (!guild) return false;

    const member = guild.members.get(userId);
    if (!member) return false;

    guild.treasury.gold += amount;
    member.totalDonations += amount;
    member.contributionPoints += Math.floor(amount / 10); // 10 gold = 1 contribution point
    guild.stats.totalDonations += amount;

    this.addActivity(guild, {
      type: GuildActivityType.DONATION,
      actor: { userId, username: member.username },
      details: `${member.displayName} ${amount.toLocaleString('tr-TR')} TL bağışladı! 💰`,
      icon: '💰'
    });

    // Check for guild level up
    this.addGuildExperience(guild, Math.floor(amount / 100));

    this.saveGuilds();
    return true;
  }

  /**
   * Çay saati etkinliği başlat
   */
  startCaySaati(guildId: string, organizerId: string): boolean {
    const guild = this.guilds.get(guildId);
    if (!guild) return false;

    const organizer = guild.members.get(organizerId);
    if (!organizer) return false;

    // Check if çay evi perk is unlocked
    const cayEviPerk = guild.perks.find(p => p.id === 'cay-evi');
    if (!cayEviPerk?.unlocked) return false;

    // Cooldown check (minimum 4 hours between çay saati)
    if (guild.lastCaySaati) {
      const hoursSince = (Date.now() - guild.lastCaySaati.getTime()) / (1000 * 60 * 60);
      if (hoursSince < 4) return false;
    }

    const event: GuildEvent = {
      id: `event-${Date.now()}`,
      title: '☕ Lonca Çay Saati',
      description: 'Lonca çay evinde toplanıp sohbet ediyoruz! Gel sen de katıl, çay bizden! 🫖',
      type: 'cay_saati',
      startTime: new Date(),
      duration: 60, // 1 hour
      organizer: organizerId,
      participants: [organizerId],
      maxParticipants: 50,
      minLevel: 1,
      rewards: {
        xp: 500,
        gold: 0
      },
      location: 'Lonca Çay Evi',
      status: 'active'
    };

    guild.events.push(event);
    guild.cayEviActive = true;
    guild.lastCaySaati = new Date();

    this.addActivity(guild, {
      type: GuildActivityType.CAY_SAATI,
      actor: { userId: organizerId, username: organizer.username },
      details: `${organizer.displayName} çay saati başlattı! ☕ Herkese çay! 🫖`,
      icon: '☕'
    });

    // Auto-complete after duration
    setTimeout(() => {
      this.completeCaySaati(guildId, event.id);
    }, event.duration * 60 * 1000);

    this.saveGuilds();
    return true;
  }

  /**
   * Çay saatini tamamla
   */
  private completeCaySaati(guildId: string, eventId: string): void {
    const guild = this.guilds.get(guildId);
    if (!guild) return;

    const eventIndex = guild.events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return;

    const event = guild.events[eventIndex];
    event.status = 'completed';
    guild.cayEviActive = false;

    // Give rewards to all participants
    event.participants.forEach(userId => {
      const member = guild.members.get(userId);
      if (member) {
        member.contributionPoints += 10;
        member.weeklyActivity += 5;
      }
    });

    this.saveGuilds();
  }

  /**
   * Lonca seviyesi ekle
   */
  private addGuildExperience(guild: Guild, xp: number): void {
    guild.experience += xp;

    while (guild.experience >= guild.experienceToNext) {
      guild.experience -= guild.experienceToNext;
      guild.level++;
      guild.experienceToNext = Math.floor(guild.experienceToNext * 1.5);
      guild.maxMembers += 10; // +10 members per level

      this.addActivity(guild, {
        type: GuildActivityType.GUILD_LEVEL_UP,
        actor: { userId: 'system', username: 'Sistem' },
        details: `Lonca seviye ${guild.level}'e yükseldi! 🎉 Tebrikler!`,
        icon: '⭐'
      });
    }
  }

  /**
   * Default lonca rütbeleri
   */
  private getDefaultRanks(): GuildRank[] {
    return [
      {
        id: 'lonca-basi',
        name: 'Lonca Başı',
        role: GuildRole.LONCA_BASI,
        permissions: Object.values(GuildPermission),
        color: '#FFD700',
        icon: '👑',
        order: 1
      },
      {
        id: 'kethuda',
        name: 'Kethüda',
        role: GuildRole.KETHUDA,
        permissions: [
          GuildPermission.INVITE_MEMBERS,
          GuildPermission.KICK_MEMBERS,
          GuildPermission.START_GUILD_QUEST,
          GuildPermission.MANAGE_BANK
        ],
        color: '#C0C0C0',
        icon: '⚜️',
        order: 2
      },
      {
        id: 'kalfa',
        name: 'Kalfa',
        role: GuildRole.KALFA,
        permissions: [
          GuildPermission.INVITE_MEMBERS,
          GuildPermission.START_GUILD_QUEST
        ],
        color: '#CD7F32',
        icon: '🛡️',
        order: 3
      },
      {
        id: 'cirak',
        name: 'Çırak',
        role: GuildRole.CIRAK,
        permissions: [],
        color: '#4169E1',
        icon: '⚔️',
        order: 4
      },
      {
        id: 'ucube',
        name: 'Üçübe (Acemi)',
        role: GuildRole.UCUBE,
        permissions: [],
        color: '#808080',
        icon: '🔰',
        order: 5
      }
    ];
  }

  /**
   * Aktivite ekle
   */
  private addActivity(guild: Guild, activity: Omit<GuildActivity, 'id' | 'timestamp'>): void {
    const fullActivity: GuildActivity = {
      id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ...activity
    };

    guild.activities.unshift(fullActivity);

    // Keep last 100 activities
    if (guild.activities.length > 100) {
      guild.activities = guild.activities.slice(0, 100);
    }
  }

  /**
   * Bölgeleri başlat (İstanbul'un bölgeleri)
   */
  private initializeTerritories(): void {
    const territories: GuildTerritory[] = [
      {
        id: 'taksim',
        name: 'Taksim Meydanı',
        region: 'Istanbul',
        resources: { gold: 5000, materials: 1000 },
        defenseLevel: 5,
        population: 10000
      },
      {
        id: 'kapalicarsi',
        name: 'Kapalıçarşı',
        region: 'Istanbul',
        resources: { gold: 10000, materials: 2000 },
        defenseLevel: 8,
        population: 5000
      },
      {
        id: 'besiktas',
        name: 'Beşiktaş',
        region: 'Istanbul',
        resources: { gold: 3000, materials: 500 },
        defenseLevel: 4,
        population: 8000
      }
    ];

    territories.forEach(t => this.territories.set(t.id, t));
  }

  /**
   * Çay saati scheduler (her 4 saatte bir otomatik çağrı)
   */
  private startCaySaatiScheduler(): void {
    // Check every hour if guilds can start çay saati
    setInterval(() => {
      this.guilds.forEach(guild => {
        // Auto-suggest çay saati if it's been 4+ hours
        if (guild.lastCaySaati) {
          const hoursSince = (Date.now() - guild.lastCaySaati.getTime()) / (1000 * 60 * 60);
          if (hoursSince >= 4 && !guild.cayEviActive) {
            // Send notification to guild leader
            console.log(`☕ [${guild.name}] Çay saati zamanı geldi!`);
          }
        }
      });
    }, 60 * 60 * 1000); // Every hour
  }

  /**
   * Lonca bilgilerini getir
   */
  getGuild(guildId: string): Guild | undefined {
    return this.guilds.get(guildId);
  }

  /**
   * Kullanıcının loncasını getir
   */
  getUserGuild(userId: string): Guild | undefined {
    const guildId = this.userGuilds.get(userId);
    return guildId ? this.guilds.get(guildId) : undefined;
  }

  /**
   * Tüm loncaları listele
   */
  listGuilds(filters?: {
    type?: GuildType;
    region?: string;
    minLevel?: number;
    recruitmentOpen?: boolean;
  }): Guild[] {
    let guilds = Array.from(this.guilds.values());

    if (filters) {
      if (filters.type) guilds = guilds.filter(g => g.type === filters.type);
      if (filters.region) guilds = guilds.filter(g => g.region === filters.region);
      if (filters.minLevel) guilds = guilds.filter(g => g.level >= filters.minLevel);
      if (filters.recruitmentOpen !== undefined) {
        guilds = guilds.filter(g => g.recruitmentOpen === filters.recruitmentOpen);
      }
    }

    return guilds.sort((a, b) => b.level - a.level);
  }

  /**
   * Lonca istatistikleri
   */
  getGuildStats(guildId: string): any {
    const guild = this.guilds.get(guildId);
    if (!guild) return null;

    const members = Array.from(guild.members.values());
    const onlineCount = members.filter(m => m.isOnline).length;
    const avgLevel = members.reduce((sum, m) => sum + m.level, 0) / members.length;
    const totalContribution = members.reduce((sum, m) => sum + m.contributionPoints, 0);

    return {
      memberCount: members.length,
      maxMembers: guild.maxMembers,
      onlineCount,
      level: guild.level,
      avgLevel: Math.floor(avgLevel),
      totalContribution,
      treasuryGold: guild.treasury.gold,
      territoriesControlled: guild.territories.length,
      ...guild.stats
    };
  }

  /**
   * Save/Load
   */
  private saveGuilds(): void {
    const data = {
      guilds: Array.from(this.guilds.entries()).map(([id, guild]) => [
        id,
        {
          ...guild,
          members: Array.from(guild.members.entries())
        }
      ]),
      userGuilds: Array.from(this.userGuilds.entries())
    };
    localStorage.setItem('guild_system', JSON.stringify(data));
  }

  private loadGuilds(): void {
    const saved = localStorage.getItem('guild_system');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.guilds = new Map(
          data.guilds.map(([id, guild]: [string, any]) => [
            id,
            {
              ...guild,
              members: new Map(guild.members)
            }
          ])
        );
        this.userGuilds = new Map(data.userGuilds);
      } catch (e) {
        console.error('Failed to load guilds:', e);
      }
    }
  }
}

// Export singleton
export const guildSystem = new GuildSystem();
