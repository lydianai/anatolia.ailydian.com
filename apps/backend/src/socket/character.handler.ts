import { Server as SocketServer } from 'socket.io';
import { AuthSocket } from '../types';
import characterService from '../services/character.service';
import worldService from '../services/world.service';
import logger from '../config/logger';

export const setupCharacterHandlers = (io: SocketServer, socket: AuthSocket) => {
  // Character movement
  socket.on('character:move', async (data) => {
    try {
      if (!socket.characterId) {
        socket.emit('error', { message: 'No character selected' });
        return;
      }

      // Update character position
      await characterService.updatePosition(data.characterId, data.position);

      // Broadcast to players in the same zone
      socket.to(data.position.zone).emit('character:moved', data);

      logger.debug(`Character ${data.characterId} moved in zone ${data.position.zone}`);
    } catch (error) {
      logger.error('Character move error:', error);
      socket.emit('error', { message: 'Failed to update position' });
    }
  });

  // Character action
  socket.on('character:action', async (data) => {
    try {
      if (!socket.characterId) {
        socket.emit('error', { message: 'No character selected' });
        return;
      }

      // Broadcast action to nearby players
      const character = await characterService.getCharacter(socket.characterId);
      if (character && 'currentZone' in character) {
        socket.to(character.currentZone).emit('character:update', {
          characterId: socket.characterId,
          action: data.action,
          target: data.target,
        });
      }

      logger.debug(`Character ${socket.characterId} performed action: ${data.action}`);
    } catch (error) {
      logger.error('Character action error:', error);
      socket.emit('error', { message: 'Failed to perform action' });
    }
  });

  // Character login (enter world)
  const handleCharacterLogin = async (characterId: string) => {
    try {
      socket.characterId = characterId;

      // Set character online
      const character = await characterService.setOnlineStatus(characterId, true);

      // Join zone room
      if ('currentZone' in character) {
        socket.join(character.currentZone);

        // Increment zone player count
        await worldService.incrementPlayerCount(character.currentZone);

        // Notify other players
        socket.to(character.currentZone).emit('player:joined', {
          characterId: character.id,
          characterName: character.name,
          position: {
            x: character.positionX,
            y: character.positionY,
            z: character.positionZ,
            rotation: character.rotation,
            zone: character.currentZone,
          },
          isOnline: true,
          lastSeen: character.lastSeenAt.toISOString(),
        });
      }

      logger.info(`Character ${character.name} entered the world`);
    } catch (error) {
      logger.error('Character login error:', error);
      socket.emit('error', { message: 'Failed to enter world' });
    }
  };

  // Character logout (leave world)
  const handleCharacterLogout = async () => {
    try {
      if (!socket.characterId) return;

      const character = await characterService.getCharacter(socket.characterId);

      if (character && 'currentZone' in character) {
        // Set character offline
        await characterService.setOnlineStatus(socket.characterId, false);

        // Leave zone room
        socket.leave(character.currentZone);

        // Decrement zone player count
        await worldService.decrementPlayerCount(character.currentZone);

        // Notify other players
        socket.to(character.currentZone).emit('player:left', {
          characterId: socket.characterId,
        });

        logger.info(`Character ${character.name} left the world`);
      }

      socket.characterId = undefined;
    } catch (error) {
      logger.error('Character logout error:', error);
    }
  };

  // Store handlers for cleanup
  (socket as any).handleCharacterLogin = handleCharacterLogin;
  (socket as any).handleCharacterLogout = handleCharacterLogout;

  // Handle disconnect
  socket.on('disconnect', handleCharacterLogout);
};
