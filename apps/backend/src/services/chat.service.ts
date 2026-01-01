import prisma from '../config/database';
import { NotFoundError } from '../types';
import logger from '../config/logger';

export class ChatService {
  async sendMessage(userId: string, characterId: string | null, data: any) {
    const message = await prisma.chatMessage.create({
      data: {
        userId,
        characterId,
        roomId: data.roomId,
        content: data.content,
        type: data.type || 'TEXT',
        metadata: data.metadata || {},
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
          },
        },
        character: {
          select: {
            id: true,
            name: true,
            class: true,
          },
        },
      },
    });

    logger.info(`Message sent in room ${data.roomId} by ${userId}`);

    return message;
  }

  async getMessages(roomId: string, page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      prisma.chatMessage.findMany({
        where: {
          roomId,
          isDeleted: false,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatar: true,
            },
          },
          character: {
            select: {
              id: true,
              name: true,
              class: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.chatMessage.count({
        where: {
          roomId,
          isDeleted: false,
        },
      }),
    ]);

    return {
      messages: messages.reverse(),
      total,
      page,
      limit,
    };
  }

  async deleteMessage(messageId: string, userId: string) {
    const message = await prisma.chatMessage.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      throw new NotFoundError('Message not found');
    }

    if (message.userId !== userId) {
      throw new Error('Not authorized to delete this message');
    }

    await prisma.chatMessage.update({
      where: { id: messageId },
      data: { isDeleted: true },
    });

    logger.info(`Message deleted: ${messageId}`);

    return { message: 'Message deleted successfully' };
  }

  async createRoom(data: any) {
    const room = await prisma.chatRoom.create({
      data: {
        name: data.name,
        type: data.type || 'PUBLIC',
        description: data.description,
        maxMembers: data.maxMembers || 100,
      },
    });

    logger.info(`Chat room created: ${room.name}`);

    return room;
  }

  async getRooms() {
    const rooms = await prisma.chatRoom.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    return rooms;
  }

  async getRoom(roomId: string) {
    const room = await prisma.chatRoom.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundError('Room not found');
    }

    return room;
  }
}

export default new ChatService();
