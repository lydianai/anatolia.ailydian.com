import { Server as SocketServer } from 'socket.io';
import { AuthSocket } from '../types';
import chatService from '../services/chat.service';
import logger from '../config/logger';

export const setupChatHandlers = (io: SocketServer, socket: AuthSocket) => {
  // Join chat room
  socket.on('chat:join', async (roomId: string) => {
    try {
      // Verify room exists
      await chatService.getRoom(roomId);

      socket.join(roomId);
      logger.info(`User ${socket.userId} joined room ${roomId}`);
    } catch (error) {
      logger.error('Chat join error:', error);
      socket.emit('error', { message: 'Failed to join room' });
    }
  });

  // Leave chat room
  socket.on('chat:leave', async (roomId: string) => {
    try {
      socket.leave(roomId);
      logger.info(`User ${socket.userId} left room ${roomId}`);
    } catch (error) {
      logger.error('Chat leave error:', error);
    }
  });

  // Send chat message
  socket.on('chat:send', async (data) => {
    try {
      if (!socket.userId) {
        socket.emit('error', { message: 'Not authenticated' });
        return;
      }

      // Save message to database
      const message = await chatService.sendMessage(
        socket.userId,
        socket.characterId || null,
        data
      );

      // Broadcast to room
      io.to(data.roomId).emit('chat:message', message);

      logger.debug(`Message sent to room ${data.roomId} by user ${socket.userId}`);
    } catch (error) {
      logger.error('Chat send error:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Auto-join global room
  socket.join('global');
};
