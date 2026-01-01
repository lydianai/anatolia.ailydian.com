import { useEffect, useCallback, useRef } from 'react';
import socketClient from '@/lib/socket/client';
import { useAuthStore } from '@/lib/store/authStore';
import { useGameStore } from '@/lib/store/gameStore';
import { useChatStore } from '@/lib/store/chatStore';
import { SocketEvent } from '@/types/socket';
import type {
  PlayerJoinPayload,
  PlayerLeavePayload,
  PlayerMovePayload,
  ChatMessagePayload,
  GameStatePayload,
  CombatDamagePayload,
} from '@/types/socket';

export function useSocket() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setConnected = useGameStore((state) => state.setConnected);
  const addPlayer = useGameStore((state) => state.addPlayer);
  const removePlayer = useGameStore((state) => state.removePlayer);
  const updatePlayer = useGameStore((state) => state.updatePlayer);
  const addMessage = useChatStore((state) => state.addMessage);
  const hasInitialized = useRef(false);

  // Connect when authenticated
  useEffect(() => {
    if (isAuthenticated && !hasInitialized.current) {
      socketClient.connect();
      hasInitialized.current = true;
    }

    return () => {
      if (!isAuthenticated && hasInitialized.current) {
        socketClient.disconnect();
        hasInitialized.current = false;
      }
    };
  }, [isAuthenticated]);

  // Setup event handlers
  useEffect(() => {
    if (!isAuthenticated) return;

    // Connection events
    const handleConnect = () => {
      console.log('Connected to game server');
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log('Disconnected from game server');
      setConnected(false);
    };

    // Player events
    const handlePlayerJoin = (payload: PlayerJoinPayload) => {
      addPlayer(payload.player);
      addMessage({
        id: `system-${Date.now()}`,
        userId: 'system',
        username: 'System',
        message: `${payload.player.displayName} joined the game`,
        room: 'local',
        timestamp: Date.now(),
        isSystem: true,
      });
    };

    const handlePlayerLeave = (payload: PlayerLeavePayload) => {
      removePlayer(payload.playerId);
    };

    const handlePlayerMove = (payload: PlayerMovePayload) => {
      updatePlayer(payload.playerId, {
        position: payload.position,
        isMoving: true,
      });
    };

    // Chat events
    const handleChatMessage = (payload: ChatMessagePayload) => {
      addMessage({
        id: payload.id,
        userId: payload.userId,
        username: payload.username,
        message: payload.message,
        room: payload.room,
        timestamp: payload.timestamp,
      });
    };

    // Game state events
    const handleGameState = (payload: GameStatePayload) => {
      payload.players.forEach((player) => addPlayer(player));
    };

    // Combat events
    const handleCombatDamage = (payload: CombatDamagePayload) => {
      console.log('Combat damage:', payload);
    };

    // Register event listeners
    socketClient.on(SocketEvent.CONNECT, handleConnect);
    socketClient.on(SocketEvent.DISCONNECT, handleDisconnect);
    socketClient.on(SocketEvent.PLAYER_JOIN, handlePlayerJoin);
    socketClient.on(SocketEvent.PLAYER_LEAVE, handlePlayerLeave);
    socketClient.on(SocketEvent.PLAYER_MOVE, handlePlayerMove);
    socketClient.on(SocketEvent.CHAT_MESSAGE, handleChatMessage);
    socketClient.on(SocketEvent.GAME_STATE, handleGameState);
    socketClient.on(SocketEvent.COMBAT_DAMAGE, handleCombatDamage);

    // Cleanup
    return () => {
      socketClient.off(SocketEvent.CONNECT, handleConnect);
      socketClient.off(SocketEvent.DISCONNECT, handleDisconnect);
      socketClient.off(SocketEvent.PLAYER_JOIN, handlePlayerJoin);
      socketClient.off(SocketEvent.PLAYER_LEAVE, handlePlayerLeave);
      socketClient.off(SocketEvent.PLAYER_MOVE, handlePlayerMove);
      socketClient.off(SocketEvent.CHAT_MESSAGE, handleChatMessage);
      socketClient.off(SocketEvent.GAME_STATE, handleGameState);
      socketClient.off(SocketEvent.COMBAT_DAMAGE, handleCombatDamage);
    };
  }, [isAuthenticated, setConnected, addPlayer, removePlayer, updatePlayer, addMessage]);

  const emit = useCallback((event: string, data?: any) => {
    socketClient.emit(event, data);
  }, []);

  const sendChatMessage = useCallback((message: string, room: string = 'global') => {
    emit(SocketEvent.CHAT_MESSAGE, { message, room });
  }, [emit]);

  const movePlayer = useCallback((position: { x: number; y: number }) => {
    emit(SocketEvent.PLAYER_MOVE, { position, timestamp: Date.now() });
  }, [emit]);

  return {
    isConnected: socketClient.isConnected(),
    emit,
    sendChatMessage,
    movePlayer,
  };
}
