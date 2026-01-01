import prisma from '../config/database';
import { NotFoundError } from '../types';
import logger from '../config/logger';
import redis from '../config/redis';

export class WorldService {
  async getWorldState(zone: string) {
    // Try cache first
    const cached = await redis.get(`world:${zone}`);
    if (cached) {
      return JSON.parse(cached);
    }

    // Get from database
    const worldState = await prisma.worldState.findUnique({
      where: { zone },
    });

    if (!worldState) {
      throw new NotFoundError('World zone not found');
    }

    // Cache for 5 seconds
    await redis.setex(`world:${zone}`, 5, JSON.stringify(worldState));

    return worldState;
  }

  async updateWorldState(zone: string, state: any) {
    const worldState = await prisma.worldState.upsert({
      where: { zone },
      update: {
        state,
        lastUpdated: new Date(),
      },
      create: {
        zone,
        state,
        isActive: true,
      },
    });

    // Update cache
    await redis.setex(`world:${zone}`, 5, JSON.stringify(worldState));

    logger.debug(`World state updated: ${zone}`);

    return worldState;
  }

  async getActiveZones() {
    const zones = await prisma.worldState.findMany({
      where: { isActive: true },
      select: {
        zone: true,
        playerCount: true,
        lastUpdated: true,
      },
    });

    return zones;
  }

  async incrementPlayerCount(zone: string) {
    const worldState = await prisma.worldState.upsert({
      where: { zone },
      update: {
        playerCount: {
          increment: 1,
        },
      },
      create: {
        zone,
        state: {},
        playerCount: 1,
        isActive: true,
      },
    });

    // Invalidate cache
    await redis.del(`world:${zone}`);

    return worldState;
  }

  async decrementPlayerCount(zone: string) {
    const worldState = await prisma.worldState.update({
      where: { zone },
      data: {
        playerCount: {
          decrement: 1,
        },
      },
    });

    // Invalidate cache
    await redis.del(`world:${zone}`);

    return worldState;
  }

  async getPlayersInZone(zone: string) {
    const characters = await prisma.character.findMany({
      where: {
        currentZone: zone,
        isOnline: true,
      },
      select: {
        id: true,
        name: true,
        class: true,
        level: true,
        positionX: true,
        positionY: true,
        positionZ: true,
        rotation: true,
        appearance: true,
      },
    });

    return characters;
  }
}

export default new WorldService();
