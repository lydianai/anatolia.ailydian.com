import { Server as SocketServer } from 'socket.io';
import { AuthSocket } from '../types';
import worldService from '../services/world.service';
import logger from '../config/logger';

export const setupWorldHandlers = (io: SocketServer, socket: AuthSocket) => {
  // Subscribe to world zone updates
  socket.on('world:subscribe', async (zone: string) => {
    try {
      // Join zone room
      socket.join(`world:${zone}`);

      // Get current world state
      const worldState = await worldService.getWorldState(zone);

      // Send current state to client
      socket.emit('world:update', {
        zone,
        state: worldState.state,
        timestamp: Date.now(),
      });

      logger.info(`User ${socket.userId} subscribed to world zone ${zone}`);
    } catch (error) {
      logger.error('World subscribe error:', error);
      socket.emit('error', { message: 'Failed to subscribe to zone' });
    }
  });

  // Unsubscribe from world zone updates
  socket.on('world:unsubscribe', async (zone: string) => {
    try {
      socket.leave(`world:${zone}`);
      logger.info(`User ${socket.userId} unsubscribed from world zone ${zone}`);
    } catch (error) {
      logger.error('World unsubscribe error:', error);
    }
  });
};

// Helper function to broadcast world updates
export const broadcastWorldUpdate = (io: SocketServer, zone: string, state: any) => {
  io.to(`world:${zone}`).emit('world:update', {
    zone,
    state,
    timestamp: Date.now(),
  });
};
