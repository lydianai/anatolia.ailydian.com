import prisma from '../config/database';
import { NotFoundError, ValidationError } from '../types';
import logger from '../config/logger';

export class EconomyService {
  async createTransaction(data: any) {
    // Validate transaction
    if (data.type === 'TRANSFER' && (!data.fromCharacterId || !data.toCharacterId)) {
      throw new ValidationError('Transfer requires both sender and recipient');
    }

    // Check sender balance for transfers
    if (data.fromCharacterId) {
      const sender = await prisma.character.findUnique({
        where: { id: data.fromCharacterId },
      });

      if (!sender) {
        throw new NotFoundError('Sender character not found');
      }

      if (sender.balance < data.amount) {
        throw new ValidationError('Insufficient balance');
      }

      // Deduct from sender
      await prisma.character.update({
        where: { id: data.fromCharacterId },
        data: {
          balance: {
            decrement: data.amount,
          },
        },
      });
    }

    // Add to recipient
    if (data.toCharacterId) {
      const recipient = await prisma.character.findUnique({
        where: { id: data.toCharacterId },
      });

      if (!recipient) {
        throw new NotFoundError('Recipient character not found');
      }

      await prisma.character.update({
        where: { id: data.toCharacterId },
        data: {
          balance: {
            increment: data.amount,
          },
        },
      });
    }

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        type: data.type,
        amount: data.amount,
        fromUserId: data.fromUserId,
        toUserId: data.toUserId,
        fromCharacterId: data.fromCharacterId,
        toCharacterId: data.toCharacterId,
        description: data.description,
        metadata: data.metadata || {},
        status: 'COMPLETED',
      },
    });

    logger.info(`Transaction created: ${transaction.type} - ${transaction.amount}`);

    return transaction;
  }

  async getBalance(characterId: string) {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      select: {
        id: true,
        name: true,
        balance: true,
      },
    });

    if (!character) {
      throw new NotFoundError('Character not found');
    }

    return character;
  }

  async getTransactions(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: {
          OR: [{ fromUserId: userId }, { toUserId: userId }],
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.transaction.count({
        where: {
          OR: [{ fromUserId: userId }, { toUserId: userId }],
        },
      }),
    ]);

    return {
      transactions,
      total,
      page,
      limit,
    };
  }

  async getCharacterTransactions(characterId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: {
          OR: [{ fromCharacterId: characterId }, { toCharacterId: characterId }],
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.transaction.count({
        where: {
          OR: [{ fromCharacterId: characterId }, { toCharacterId: characterId }],
        },
      }),
    ]);

    return {
      transactions,
      total,
      page,
      limit,
    };
  }
}

export default new EconomyService();
