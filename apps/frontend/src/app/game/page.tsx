'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { GameCanvas } from '@/components/game/GameCanvas';
import { HUD } from '@/components/game/HUD';
import { ChatBox } from '@/components/game/ChatBox';
import { Minimap } from '@/components/game/Minimap';
import { QuestPanel } from '@/components/game/QuestPanel';
import { NPCDialogPanel } from '@/components/game/NPCDialogPanel';
import { useAuth } from '@/lib/hooks/useAuth';
import { useSocket } from '@/lib/hooks/useSocket';
import { useGame } from '@/lib/hooks/useGame';

export default function GamePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { isConnected } = useSocket();
  const { loadCharacter, character } = useGame();

  const [isInitialized, setIsInitialized] = React.useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  // Initialize game
  React.useEffect(() => {
    if (isAuthenticated && user && !isInitialized) {
      // TODO: Get character ID from user or show character selection
      const characterId = 'mock-character-id';

      // For now, set a mock character
      // In production, call loadCharacter(characterId)
      setIsInitialized(true);

      // Mock character for development
      if (!character) {
        // This would normally be loaded from API
        console.log('Game initialized for user:', user.username);
      }
    }
  }, [isAuthenticated, user, isInitialized, character, loadCharacter]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      {/* Game Canvas */}
      <GameCanvas />

      {/* HUD Overlay */}
      <HUD />

      {/* Minimap */}
      <Minimap />

      {/* Chat */}
      <ChatBox />

      {/* Quest Panel */}
      <QuestPanel />

      {/* NPC Dialog Panel */}
      <NPCDialogPanel />

      {/* 3D Mode Toggle Button */}
      <button
        onClick={() => router.push('/game-3d')}
        className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg border border-turkish-gold hover:border-white hover:scale-105 transition-all group z-50"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎮</div>
          <div>
            <div className="text-white font-bold text-sm group-hover:text-turkish-gold transition-colors">
              3D Moda Geç
            </div>
            <div className="text-white/60 text-xs">
              Premium Deneyim
            </div>
          </div>
        </div>
      </button>

      {/* Connection Status */}
      {!isConnected && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm px-6 py-4 rounded-lg border border-turkish-red text-white text-center">
          <div className="spinner mx-auto mb-3" />
          <p>Sunucuya bağlanılıyor...</p>
        </div>
      )}
    </div>
  );
}
