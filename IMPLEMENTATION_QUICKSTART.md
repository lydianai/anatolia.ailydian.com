# ANADOLU REALM - IMPLEMENTATION QUICK START GUIDE

**Companion to:** GAME_DEVELOPMENT_MASTER_PLAN.md  
**Purpose:** Practical code examples and implementation guides

---

## TABLE OF CONTENTS

1. [Turkish Daily Quest System](#1-turkish-daily-quest-system)
2. [Guild System Implementation](#2-guild-system-implementation)
3. [Turkish Economy & Trading](#3-turkish-economy--trading)
4. [Real-Time Multiplayer (Socket.io)](#4-real-time-multiplayer-socketio)
5. [PvP Ranking System](#5-pvp-ranking-system)
6. [Achievement System](#6-achievement-system)
7. [Turkish Profession Mini-Games](#7-turkish-profession-mini-games)
8. [Battle Pass Implementation](#8-battle-pass-implementation)

---

## 1. TURKISH DAILY QUEST SYSTEM

### Backend Implementation

```typescript
// apps/backend/src/services/questService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  type: 'DAILY' | 'WEEKLY' | 'SEASONAL';
  objectives: QuestObjective[];
  rewards: QuestReward[];
  resetTime: Date;
  streakBonus: number;
}

interface QuestObjective {
  description: string;
  type: 'KILL' | 'COLLECT' | 'INTERACT' | 'EARN';
  target: string;
  required: number;
}

interface QuestReward {
  type: 'GOLD' | 'EXPERIENCE' | 'ITEM';
  amount: number;
  itemId?: string;
}

class DailyQuestService {
  // Generate daily quests at 06:00 Istanbul time
  async generateDailyQuests(): Promise<DailyQuest[]> {
    const turkishQuests = [
      {
        title: 'Simit Sat, Para Kazan',
        description: 'Sell 50 simit to earn money',
        objectives: [
          {
            description: 'Sell 50 simit',
            type: 'EARN' as const,
            target: 'simit_sales',
            required: 50,
          },
        ],
        rewards: [
          { type: 'GOLD' as const, amount: 5000 },
          { type: 'EXPERIENCE' as const, amount: 1000 },
        ],
      },
      {
        title: 'Çay İçme Zamanı',
        description: 'Drink tea with 10 different players',
        objectives: [
          {
            description: 'Drink tea with players',
            type: 'INTERACT' as const,
            target: 'tea_drinking',
            required: 10,
          },
        ],
        rewards: [
          { type: 'GOLD' as const, amount: 3000 },
          { type: 'ITEM' as const, amount: 1, itemId: 'premium_tea' },
        ],
      },
      {
        title: 'Tavla Ustası',
        description: 'Win 5 tavla games',
        objectives: [
          {
            description: 'Win tavla games',
            type: 'COLLECT' as const,
            target: 'tavla_wins',
            required: 5,
          },
        ],
        rewards: [
          { type: 'GOLD' as const, amount: 7000 },
          { type: 'EXPERIENCE' as const, amount: 2000 },
        ],
      },
    ];

    return turkishQuests.map((quest, index) => ({
      id: `daily_${Date.now()}_${index}`,
      ...quest,
      type: 'DAILY' as const,
      resetTime: this.getNextResetTime(),
      streakBonus: 0,
    }));
  }

  // Get next reset time (06:00 Istanbul time)
  private getNextResetTime(): Date {
    const now = new Date();
    const istanbul = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    const tomorrow = new Date(istanbul);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(6, 0, 0, 0);
    return tomorrow;
  }

  // Get player's active quests
  async getPlayerQuests(playerId: string) {
    const quests = await prisma.playerQuest.findMany({
      where: {
        playerId,
        expiresAt: { gte: new Date() },
      },
      include: {
        quest: true,
      },
    });

    return quests;
  }

  // Update quest progress
  async updateQuestProgress(
    playerId: string,
    questId: string,
    objectiveType: string,
    progress: number
  ) {
    const playerQuest = await prisma.playerQuest.findFirst({
      where: { playerId, questId },
    });

    if (!playerQuest) return null;

    // Update progress
    const updated = await prisma.playerQuest.update({
      where: { id: playerQuest.id },
      data: {
        progress: { increment: progress },
        updatedAt: new Date(),
      },
    });

    // Check if quest completed
    if (updated.progress >= updated.required) {
      await this.completeQuest(playerId, questId);
    }

    return updated;
  }

  // Complete quest and give rewards
  async completeQuest(playerId: string, questId: string) {
    const playerQuest = await prisma.playerQuest.findFirst({
      where: { playerId, questId },
      include: { quest: true },
    });

    if (!playerQuest) return null;

    // Mark as completed
    await prisma.playerQuest.update({
      where: { id: playerQuest.id },
      data: {
        completed: true,
        completedAt: new Date(),
      },
    });

    // Give rewards
    const character = await prisma.character.findFirst({
      where: { userId: playerId },
    });

    if (character) {
      // Calculate streak bonus
      const streak = await this.getQuestStreak(playerId);
      const bonusMultiplier = 1 + (streak * 0.1); // +10% per day streak

      // Award gold
      await prisma.character.update({
        where: { id: character.id },
        data: {
          balance: {
            increment: Math.floor(5000 * bonusMultiplier),
          },
        },
      });

      // Award XP
      // ... (similar implementation)
    }

    return playerQuest;
  }

  // Calculate quest streak
  async getQuestStreak(playerId: string): Promise<number> {
    // Check if player completed quests consecutive days
    const completedQuests = await prisma.playerQuest.findMany({
      where: {
        playerId,
        completed: true,
      },
      orderBy: {
        completedAt: 'desc',
      },
      take: 30, // Last 30 days
    });

    let streak = 0;
    let currentDate = new Date();

    for (const quest of completedQuests) {
      const questDate = new Date(quest.completedAt);
      const dayDiff = Math.floor(
        (currentDate.getTime() - questDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDiff === streak) {
        streak++;
      } else {
        break;
      }

      currentDate = questDate;
    }

    return streak;
  }
}

export default new DailyQuestService();
```

### Frontend Implementation

```typescript
// apps/frontend/src/components/game/DailyQuests.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  progress: number;
  required: number;
  rewards: {
    gold: number;
    experience: number;
  };
  completed: boolean;
}

export default function DailyQuestsPanel() {
  const [quests, setQuests] = useState<DailyQuest[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchDailyQuests();
  }, []);

  const fetchDailyQuests = async () => {
    // Fetch from API
    const response = await fetch('/api/quests/daily');
    const data = await response.json();
    setQuests(data.quests);
    setStreak(data.streak);
  };

  return (
    <div className="daily-quests-panel">
      {/* Streak Display */}
      <div className="streak-banner">
        <h3>🔥 {streak} Gün Ardışık!</h3>
        <p>+{streak * 10}% Bonus Ödüller</p>
      </div>

      {/* Quest List */}
      <div className="quest-list">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            className="quest-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="quest-header">
              <h4>{quest.title}</h4>
              {quest.completed && <span className="completed">✓</span>}
            </div>

            <p className="quest-description">{quest.description}</p>

            {/* Progress Bar */}
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${(quest.progress / quest.required) * 100}%`,
                }}
              />
              <span className="progress-text">
                {quest.progress} / {quest.required}
              </span>
            </div>

            {/* Rewards */}
            <div className="rewards">
              <span className="gold">💰 {quest.rewards.gold} ₺</span>
              <span className="xp">⭐ {quest.rewards.experience} XP</span>
            </div>

            {/* Claim Button */}
            {quest.completed && (
              <button
                className="claim-button"
                onClick={() => claimReward(quest.id)}
              >
                Ödülü Al
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

---

## 2. GUILD SYSTEM IMPLEMENTATION

### Database Schema (Prisma)

```prisma
// apps/backend/prisma/schema.prisma

model Guild {
  id            String      @id @default(uuid())
  name          String      @unique
  tag           String      @unique // [GUILD]
  type          GuildType
  level         Int         @default(1)
  experience    Int         @default(0)
  maxMembers    Int         @default(50)
  
  // Guild Hall
  guildHallId   String?
  
  // Treasury
  gold          Int         @default(0)
  
  // Settings
  isRecruiting  Boolean     @default(true)
  isPublic      Boolean     @default(true)
  
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  // Relations
  members       GuildMember[]
  perks         GuildPerk[]
  activities    GuildActivity[]
  
  @@index([name])
  @@index([type])
  @@map("guilds")
}

enum GuildType {
  MERCHANT
  WARRIOR
  ARTISAN
  SOCIAL
}

model GuildMember {
  id            String          @id @default(uuid())
  guildId       String
  characterId   String
  rank          GuildRank       @default(MEMBER)
  
  // Contributions
  goldContributed   Int         @default(0)
  xpContributed     Int         @default(0)
  
  // Permissions
  canInvite     Boolean         @default(false)
  canKick       Boolean         @default(false)
  canWithdraw   Boolean         @default(false)
  
  joinedAt      DateTime        @default(now())
  
  // Relations
  guild         Guild           @relation(fields: [guildId], references: [id], onDelete: Cascade)
  character     Character       @relation(fields: [characterId], references: [id], onDelete: Cascade)
  
  @@unique([guildId, characterId])
  @@index([characterId])
  @@map("guild_members")
}

enum GuildRank {
  LEADER
  OFFICER
  VETERAN
  MEMBER
  RECRUIT
}

model GuildPerk {
  id            String      @id @default(uuid())
  guildId       String
  name          String
  description   String
  level         Int
  bonus         Json        // { xp: 10, gold: 5 }
  active        Boolean     @default(true)
  
  guild         Guild       @relation(fields: [guildId], references: [id], onDelete: Cascade)
  
  @@index([guildId])
  @@map("guild_perks")
}
```

### Backend Implementation

```typescript
// apps/backend/src/services/guildService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class GuildService {
  // Create guild
  async createGuild(
    leaderId: string,
    name: string,
    tag: string,
    type: string
  ) {
    // Check if player already in guild
    const existingMembership = await prisma.guildMember.findFirst({
      where: { characterId: leaderId },
    });

    if (existingMembership) {
      throw new Error('Already in a guild');
    }

    // Check guild name/tag availability
    const existing = await prisma.guild.findFirst({
      where: {
        OR: [{ name }, { tag }],
      },
    });

    if (existing) {
      throw new Error('Guild name or tag already taken');
    }

    // Deduct creation cost (100,000 Turkish Lira)
    const character = await prisma.character.findUnique({
      where: { id: leaderId },
    });

    if (!character || character.balance < 100000) {
      throw new Error('Insufficient funds (100,000 ₺ required)');
    }

    // Create guild
    const guild = await prisma.guild.create({
      data: {
        name,
        tag,
        type: type as any,
        members: {
          create: {
            characterId: leaderId,
            rank: 'LEADER',
            canInvite: true,
            canKick: true,
            canWithdraw: true,
          },
        },
      },
      include: {
        members: {
          include: {
            character: true,
          },
        },
      },
    });

    // Deduct cost
    await prisma.character.update({
      where: { id: leaderId },
      data: {
        balance: { decrement: 100000 },
      },
    });

    return guild;
  }

  // Invite player to guild
  async invitePlayer(guildId: string, inviterId: string, inviteeId: string) {
    // Check inviter permissions
    const inviter = await prisma.guildMember.findFirst({
      where: {
        guildId,
        characterId: inviterId,
      },
    });

    if (!inviter || !inviter.canInvite) {
      throw new Error('No permission to invite');
    }

    // Check if invitee already in guild
    const existingMembership = await prisma.guildMember.findFirst({
      where: { characterId: inviteeId },
    });

    if (existingMembership) {
      throw new Error('Player already in a guild');
    }

    // Create pending invitation (implement invitation system)
    // For now, directly add (simplified)
    const member = await prisma.guildMember.create({
      data: {
        guildId,
        characterId: inviteeId,
        rank: 'RECRUIT',
      },
    });

    return member;
  }

  // Contribute to guild
  async contributeGold(guildId: string, characterId: string, amount: number) {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character || character.balance < amount) {
      throw new Error('Insufficient funds');
    }

    // Transfer gold to guild
    await prisma.$transaction([
      prisma.character.update({
        where: { id: characterId },
        data: { balance: { decrement: amount } },
      }),
      prisma.guild.update({
        where: { id: guildId },
        data: { gold: { increment: amount } },
      }),
      prisma.guildMember.update({
        where: {
          guildId_characterId: {
            guildId,
            characterId,
          },
        },
        data: {
          goldContributed: { increment: amount },
        },
      }),
    ]);

    return { success: true };
  }

  // Get guild details
  async getGuild(guildId: string) {
    const guild = await prisma.guild.findUnique({
      where: { id: guildId },
      include: {
        members: {
          include: {
            character: {
              select: {
                id: true,
                name: true,
                level: true,
                class: true,
              },
            },
          },
          orderBy: {
            goldContributed: 'desc',
          },
        },
        perks: true,
      },
    });

    return guild;
  }

  // Guild leaderboard (richest guilds)
  async getGuildLeaderboard(limit: number = 100) {
    const guilds = await prisma.guild.findMany({
      take: limit,
      orderBy: {
        gold: 'desc',
      },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });

    return guilds;
  }
}

export default new GuildService();
```

---

## 3. TURKISH ECONOMY & TRADING

### Auction House Implementation

```typescript
// apps/backend/src/services/auctionHouseService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Listing {
  id: string;
  sellerId: string;
  itemId: string;
  quantity: number;
  startPrice: number;
  buyoutPrice?: number;
  currentBid?: number;
  highestBidderId?: string;
  expiresAt: Date;
  status: 'ACTIVE' | 'SOLD' | 'EXPIRED';
}

class AuctionHouseService {
  // Create listing
  async createListing(
    sellerId: string,
    itemId: string,
    quantity: number,
    startPrice: number,
    buyoutPrice: number | null,
    duration: number // hours
  ) {
    // Verify seller has item
    const inventory = await prisma.inventoryItem.findFirst({
      where: {
        characterId: sellerId,
        itemId,
        quantity: { gte: quantity },
      },
    });

    if (!inventory) {
      throw new Error('Item not found in inventory');
    }

    // Calculate fees (5% listing fee)
    const listingFee = Math.floor(startPrice * 0.05);

    const character = await prisma.character.findUnique({
      where: { id: sellerId },
    });

    if (!character || character.balance < listingFee) {
      throw new Error('Insufficient funds for listing fee');
    }

    // Create listing
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + duration);

    const listing = await prisma.auctionListing.create({
      data: {
        sellerId,
        itemId,
        quantity,
        startPrice,
        buyoutPrice,
        currentBid: startPrice,
        expiresAt,
        status: 'ACTIVE',
      },
    });

    // Remove item from inventory (hold in escrow)
    await prisma.inventoryItem.update({
      where: { id: inventory.id },
      data: {
        quantity: { decrement: quantity },
      },
    });

    // Deduct listing fee
    await prisma.character.update({
      where: { id: sellerId },
      data: {
        balance: { decrement: listingFee },
      },
    });

    return listing;
  }

  // Place bid
  async placeBid(listingId: string, bidderId: string, bidAmount: number) {
    const listing = await prisma.auctionListing.findUnique({
      where: { id: listingId },
    });

    if (!listing || listing.status !== 'ACTIVE') {
      throw new Error('Listing not available');
    }

    if (new Date() > listing.expiresAt) {
      throw new Error('Auction expired');
    }

    if (bidAmount <= (listing.currentBid || listing.startPrice)) {
      throw new Error('Bid must be higher than current bid');
    }

    // Check bidder has funds
    const character = await prisma.character.findUnique({
      where: { id: bidderId },
    });

    if (!character || character.balance < bidAmount) {
      throw new Error('Insufficient funds');
    }

    // Refund previous bidder if any
    if (listing.highestBidderId && listing.currentBid) {
      await prisma.character.update({
        where: { id: listing.highestBidderId },
        data: {
          balance: { increment: listing.currentBid },
        },
      });
    }

    // Place bid
    const updated = await prisma.auctionListing.update({
      where: { id: listingId },
      data: {
        currentBid: bidAmount,
        highestBidderId: bidderId,
      },
    });

    // Escrow funds
    await prisma.character.update({
      where: { id: bidderId },
      data: {
        balance: { decrement: bidAmount },
      },
    });

    return updated;
  }

  // Buyout (instant purchase)
  async buyout(listingId: string, buyerId: string) {
    const listing = await prisma.auctionListing.findUnique({
      where: { id: listingId },
    });

    if (!listing || listing.status !== 'ACTIVE' || !listing.buyoutPrice) {
      throw new Error('Buyout not available');
    }

    const buyer = await prisma.character.findUnique({
      where: { id: buyerId },
    });

    if (!buyer || buyer.balance < listing.buyoutPrice) {
      throw new Error('Insufficient funds');
    }

    // Calculate auction house cut (5%)
    const ahCut = Math.floor(listing.buyoutPrice * 0.05);
    const sellerReceives = listing.buyoutPrice - ahCut;

    await prisma.$transaction([
      // Transfer gold to seller
      prisma.character.update({
        where: { id: listing.sellerId },
        data: {
          balance: { increment: sellerReceives },
        },
      }),

      // Deduct gold from buyer
      prisma.character.update({
        where: { id: buyerId },
        data: {
          balance: { decrement: listing.buyoutPrice },
        },
      }),

      // Give item to buyer
      prisma.inventoryItem.create({
        data: {
          characterId: buyerId,
          itemId: listing.itemId,
          quantity: listing.quantity,
        },
      }),

      // Mark listing as sold
      prisma.auctionListing.update({
        where: { id: listingId },
        data: {
          status: 'SOLD',
          highestBidderId: buyerId,
          currentBid: listing.buyoutPrice,
        },
      }),
    ]);

    return { success: true };
  }

  // Search listings
  async searchListings(filters: {
    itemType?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'PRICE_LOW' | 'PRICE_HIGH' | 'TIME_ENDING';
    page?: number;
    limit?: number;
  }) {
    const {
      itemType,
      minPrice,
      maxPrice,
      sortBy = 'TIME_ENDING',
      page = 1,
      limit = 50,
    } = filters;

    const where: any = {
      status: 'ACTIVE',
      expiresAt: { gte: new Date() },
    };

    if (minPrice) where.currentBid = { gte: minPrice };
    if (maxPrice) where.currentBid = { lte: maxPrice };

    let orderBy: any = {};
    if (sortBy === 'PRICE_LOW') orderBy.currentBid = 'asc';
    if (sortBy === 'PRICE_HIGH') orderBy.currentBid = 'desc';
    if (sortBy === 'TIME_ENDING') orderBy.expiresAt = 'asc';

    const listings = await prisma.auctionListing.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        seller: {
          select: {
            name: true,
          },
        },
      },
    });

    const total = await prisma.auctionListing.count({ where });

    return {
      listings,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export default new AuctionHouseService();
```

---

## 4. REAL-TIME MULTIPLAYER (SOCKET.IO)

### Server Implementation

```typescript
// apps/backend/src/socket/gameHandlers.ts

import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PlayerPosition {
  x: number;
  y: number;
  z: number;
  rotation: number;
}

// Zone-based player tracking (Area of Interest)
const zones: Map<string, Set<string>> = new Map();

export function setupGameHandlers(io: Server, socket: Socket) {
  let currentCharacterId: string | null = null;
  let currentZone: string = 'spawn';

  // Player joins zone
  socket.on('zone:join', async (data: { characterId: string; zone: string }) => {
    currentCharacterId = data.characterId;
    currentZone = data.zone;

    // Add to zone tracking
    if (!zones.has(currentZone)) {
      zones.set(currentZone, new Set());
    }
    zones.get(currentZone)!.add(socket.id);

    // Join Socket.io room
    socket.join(`zone:${currentZone}`);

    // Get nearby players
    const nearbyPlayers = await getNearbyPlayers(currentZone, currentCharacterId);

    // Send to client
    socket.emit('zone:players', nearbyPlayers);

    // Notify others
    socket.to(`zone:${currentZone}`).emit('player:joined', {
      characterId: currentCharacterId,
      // ... character data
    });
  });

  // Player movement
  socket.on('player:move', async (position: PlayerPosition) => {
    if (!currentCharacterId) return;

    // Validate movement (anti-cheat)
    const isValid = await validateMovement(currentCharacterId, position);
    if (!isValid) {
      socket.emit('movement:rejected', { reason: 'Invalid movement' });
      return;
    }

    // Update position in database (throttled)
    await updatePlayerPosition(currentCharacterId, position);

    // Broadcast to nearby players (Area of Interest)
    socket.to(`zone:${currentZone}`).emit('player:position', {
      characterId: currentCharacterId,
      position,
      timestamp: Date.now(),
    });
  });

  // Player attacks
  socket.on('player:attack', async (data: { targetId: string; skillId: string }) => {
    if (!currentCharacterId) return;

    // Validate attack
    const result = await processAttack(currentCharacterId, data.targetId, data.skillId);

    if (result.success) {
      // Broadcast damage
      io.to(`zone:${currentZone}`).emit('combat:damage', {
        attackerId: currentCharacterId,
        targetId: data.targetId,
        damage: result.damage,
        skillId: data.skillId,
      });
    }
  });

  // Player disconnects
  socket.on('disconnect', async () => {
    if (!currentCharacterId) return;

    // Remove from zone
    zones.get(currentZone)?.delete(socket.id);

    // Set player offline
    await prisma.character.update({
      where: { id: currentCharacterId },
      data: {
        isOnline: false,
        lastSeenAt: new Date(),
      },
    });

    // Notify others
    socket.to(`zone:${currentZone}`).emit('player:left', {
      characterId: currentCharacterId,
    });
  });
}

// Helper functions
async function getNearbyPlayers(zone: string, excludeId: string) {
  const players = await prisma.character.findMany({
    where: {
      currentZone: zone,
      isOnline: true,
      id: { not: excludeId },
    },
    select: {
      id: true,
      name: true,
      level: true,
      class: true,
      positionX: true,
      positionY: true,
      positionZ: true,
      health: true,
      maxHealth: true,
    },
  });

  return players;
}

async function validateMovement(characterId: string, newPosition: PlayerPosition): Promise<boolean> {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
  });

  if (!character) return false;

  // Check max speed (simple check)
  const distance = Math.sqrt(
    Math.pow(newPosition.x - character.positionX, 2) +
    Math.pow(newPosition.y - character.positionY, 2)
  );

  const MAX_SPEED = 10; // units per update
  if (distance > MAX_SPEED) {
    console.warn(`Player ${characterId} moved too fast: ${distance}`);
    return false;
  }

  return true;
}

async function updatePlayerPosition(characterId: string, position: PlayerPosition) {
  await prisma.character.update({
    where: { id: characterId },
    data: {
      positionX: position.x,
      positionY: position.y,
      positionZ: position.z,
      rotation: position.rotation,
    },
  });
}

async function processAttack(attackerId: string, targetId: string, skillId: string) {
  // Get attacker stats
  const attacker = await prisma.character.findUnique({
    where: { id: attackerId },
  });

  // Get target stats
  const target = await prisma.character.findUnique({
    where: { id: targetId },
  });

  if (!attacker || !target) {
    return { success: false };
  }

  // Calculate damage (simplified)
  const baseDamage = attacker.strength * 2;
  const damage = Math.max(1, baseDamage - target.agility);

  // Apply damage
  await prisma.character.update({
    where: { id: targetId },
    data: {
      health: Math.max(0, target.health - damage),
    },
  });

  return {
    success: true,
    damage,
  };
}
```

### Client Implementation

```typescript
// apps/frontend/src/lib/socket/gameClient.ts

import { io, Socket } from 'socket.io-client';

class GameSocketClient {
  private socket: Socket | null = null;
  private characterId: string | null = null;
  private zone: string = 'spawn';

  connect(characterId: string) {
    this.characterId = characterId;

    this.socket = io(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001', {
      auth: {
        token: localStorage.getItem('accessToken'),
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupListeners();
  }

  private setupListeners() {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('Connected to game server');
      this.joinZone(this.zone);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from game server');
    });

    // Game events
    this.socket.on('zone:players', (players) => {
      // Update game state with nearby players
      gameStore.setNearbyPlayers(players);
    });

    this.socket.on('player:joined', (player) => {
      gameStore.addPlayer(player);
    });

    this.socket.on('player:left', (data) => {
      gameStore.removePlayer(data.characterId);
    });

    this.socket.on('player:position', (data) => {
      gameStore.updatePlayerPosition(data.characterId, data.position);
    });

    this.socket.on('combat:damage', (data) => {
      gameStore.handleDamage(data);
    });
  }

  joinZone(zone: string) {
    this.zone = zone;
    this.socket?.emit('zone:join', {
      characterId: this.characterId,
      zone,
    });
  }

  movePlayer(position: { x: number; y: number; z: number; rotation: number }) {
    this.socket?.emit('player:move', position);
  }

  attack(targetId: string, skillId: string) {
    this.socket?.emit('player:attack', {
      targetId,
      skillId,
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

export default new GameSocketClient();
```

---

## 5-8: Additional Systems

Due to length constraints, I've provided the core implementations for:
1. Daily Quest System ✅
2. Guild System ✅  
3. Economy & Trading ✅
4. Real-Time Multiplayer ✅

The remaining systems (PvP Ranking, Achievements, Profession Mini-Games, Battle Pass) follow similar patterns and can be implemented using the same architecture.

---

## NEXT STEPS

1. **Review the GAME_DEVELOPMENT_MASTER_PLAN.md** for complete system designs
2. **Use this guide** for practical implementation examples
3. **Start with MVP Phase 1** - Basic gameplay loop
4. **Iterate based on player feedback**

---

**Ready to build Turkey's first world-class MMO!** 🇹🇷

*For questions: Review the main plan document or consult the development team.*

