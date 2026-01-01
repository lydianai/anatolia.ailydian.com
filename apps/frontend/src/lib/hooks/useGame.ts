import { useCallback, useEffect } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { charactersApi } from '@/lib/api/characters';
import { useUIStore } from '@/lib/store/uiStore';

export function useGame() {
  const {
    currentCharacter,
    isConnected,
    isLoading,
    nearbyPlayers,
    nearbyMonsters,
    camera,
    ui,
    metrics,
    setCharacter,
    setLoading,
    updateCharacterPosition,
    toggleUI,
    setCamera,
    updateMetrics,
  } = useGameStore();

  const { addNotification } = useUIStore();

  const loadCharacter = useCallback(async (characterId: string) => {
    try {
      setLoading(true);

      const character = await charactersApi.getCharacter(characterId);
      setCharacter(character);

      return character;
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: 'Karakter Yüklenemedi',
        message: err.message || 'Karakter bilgileri alınamadı',
      });

      throw err;
    } finally {
      setLoading(false);
    }
  }, [setCharacter, setLoading, addNotification]);

  const moveCharacter = useCallback((x: number, y: number) => {
    if (!currentCharacter) return;

    updateCharacterPosition({ x, y });
  }, [currentCharacter, updateCharacterPosition]);

  const openInventory = useCallback(() => {
    toggleUI('showInventory');
  }, [toggleUI]);

  const openCharacterSheet = useCallback(() => {
    toggleUI('showCharacterSheet');
  }, [toggleUI]);

  const openMap = useCallback(() => {
    toggleUI('showMap');
  }, [toggleUI]);

  const centerCameraOnCharacter = useCallback(() => {
    if (currentCharacter) {
      setCamera({
        x: currentCharacter.position.x,
        y: currentCharacter.position.y,
      });
    }
  }, [currentCharacter, setCamera]);

  const zoom = useCallback((delta: number) => {
    setCamera({ zoom: camera.zoom + delta });
  }, [camera.zoom, setCamera]);

  // Performance monitoring
  useEffect(() => {
    let frameCount = 0;
    let lastTime = Date.now();
    let animationFrameId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = Date.now();
      const elapsed = currentTime - lastTime;

      if (elapsed >= 1000) {
        const fps = Math.round((frameCount * 1000) / elapsed);
        updateMetrics({ fps, lastUpdate: currentTime });

        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [updateMetrics]);

  return {
    character: currentCharacter,
    isConnected,
    isLoading,
    nearbyPlayers: Array.from(nearbyPlayers.values()),
    nearbyMonsters: Array.from(nearbyMonsters.values()),
    camera,
    ui,
    metrics,
    loadCharacter,
    moveCharacter,
    openInventory,
    openCharacterSheet,
    openMap,
    centerCameraOnCharacter,
    zoom,
  };
}
