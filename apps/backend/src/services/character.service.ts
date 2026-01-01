import prisma from '../config/database';
import { NotFoundError, ConflictError, ValidationError } from '../types';
import logger from '../config/logger';

export class CharacterService {
  async createCharacter(userId: string, data: any) {
    // Check character limit
    const characterCount = await prisma.character.count({
      where: { userId },
    });

    const maxCharacters = parseInt(process.env.MAX_CHARACTERS_PER_USER || '5', 10);
    if (characterCount >= maxCharacters) {
      throw new ValidationError(`Maximum ${maxCharacters} characters per account`);
    }

    // Check name availability
    const existingCharacter = await prisma.character.findUnique({
      where: { name: data.name },
    });

    if (existingCharacter) {
      throw new ConflictError('Character name already taken');
    }

    // Create character
    const character = await prisma.character.create({
      data: {
        userId,
        name: data.name,
        class: data.class,
        appearance: data.appearance || {},
        balance: parseInt(process.env.STARTING_BALANCE || '10000', 10),
      },
    });

    logger.info(`Character created: ${character.name} (${character.class})`);

    return character;
  }

  async getCharacters(userId: string) {
    const characters = await prisma.character.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return characters;
  }

  async getCharacter(characterId: string, userId?: string) {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
        inventory: true,
      },
    });

    if (!character) {
      throw new NotFoundError('Character not found');
    }

    // Check ownership if userId provided
    if (userId && character.userId !== userId) {
      // Return limited data for other users' characters
      return {
        id: character.id,
        name: character.name,
        class: character.class,
        level: character.level,
        isOnline: character.isOnline,
        appearance: character.appearance,
      };
    }

    return character;
  }

  async updateCharacter(characterId: string, userId: string, data: any) {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      throw new NotFoundError('Character not found');
    }

    if (character.userId !== userId) {
      throw new ValidationError('Not authorized to update this character');
    }

    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        appearance: data.appearance,
      },
    });

    logger.info(`Character updated: ${updatedCharacter.name}`);

    return updatedCharacter;
  }

  async deleteCharacter(characterId: string, userId: string) {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      throw new NotFoundError('Character not found');
    }

    if (character.userId !== userId) {
      throw new ValidationError('Not authorized to delete this character');
    }

    await prisma.character.delete({
      where: { id: characterId },
    });

    logger.info(`Character deleted: ${character.name}`);

    return { message: 'Character deleted successfully' };
  }

  async updatePosition(characterId: string, position: any) {
    const character = await prisma.character.update({
      where: { id: characterId },
      data: {
        positionX: position.x,
        positionY: position.y,
        positionZ: position.z,
        rotation: position.rotation,
        currentZone: position.zone,
        lastSeenAt: new Date(),
      },
    });

    return character;
  }

  async setOnlineStatus(characterId: string, isOnline: boolean) {
    const character = await prisma.character.update({
      where: { id: characterId },
      data: {
        isOnline,
        lastSeenAt: new Date(),
      },
    });

    logger.info(`Character ${character.name} is now ${isOnline ? 'online' : 'offline'}`);

    return character;
  }

  async getNearbyCharacters(characterId: string, radius: number = 100) {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      throw new NotFoundError('Character not found');
    }

    // Find characters in the same zone (simplified proximity check)
    const nearbyCharacters = await prisma.character.findMany({
      where: {
        id: { not: characterId },
        currentZone: character.currentZone,
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

    return nearbyCharacters;
  }
}

export default new CharacterService();
