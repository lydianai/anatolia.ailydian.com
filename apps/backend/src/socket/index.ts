import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  AuthSocket,
} from '../types';
import { verifyAccessToken } from '../utils/jwt';
import logger from '../config/logger';
import { setupCharacterHandlers } from './character.handler';
import { setupChatHandlers } from './chat.handler';
import { setupWorldHandlers } from './world.handler';

export const setupSocket = (httpServer: HttpServer): SocketServer => {
  const io = new SocketServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Authentication middleware
  io.use((socket: AuthSocket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.query.token;

      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const payload = verifyAccessToken(token as string);
      socket.userId = payload.id;
      socket.data = {
        userId: payload.id,
        username: payload.username,
      };

      next();
    } catch (error) {
      logger.error('Socket authentication error:', error);
      next(new Error('Invalid authentication token'));
    }
  });

  // Connection handler
  io.on('connection', (socket: AuthSocket) => {
    logger.info(`Client connected: ${socket.id} (User: ${socket.userId})`);

    // Setup event handlers
    setupCharacterHandlers(io, socket);
    setupChatHandlers(io, socket);
    setupWorldHandlers(io, socket);

    // Ping handler
    socket.on('ping', () => {
      socket.emit('pong');
    });

    // Disconnect handler
    socket.on('disconnect', (reason) => {
      logger.info(`Client disconnected: ${socket.id} (Reason: ${reason})`);
    });

    // Error handler
    socket.on('error', (error) => {
      logger.error('Socket error:', error);
    });
  });

  logger.info('Socket.io server initialized');

  return io;
};

export default setupSocket;
