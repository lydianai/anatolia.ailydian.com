'use client';

import * as React from 'react';
import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js';
import { useGameStore } from '@/lib/store/gameStore';
import { CharacterController } from '@/lib/game/CharacterController';
import SpriteManager from '@/lib/game/SpriteManager';
import { TileMap } from '@/lib/game/TileMap';

export function GameCanvas() {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const appRef = React.useRef<Application | null>(null);
  const containerRef = React.useRef<Container | null>(null);
  const playerRef = React.useRef<CharacterController | null>(null);
  const tileMapRef = React.useRef<TileMap | null>(null);

  const { camera, metrics, renderOptions, updateMetrics, updateCamera } = useGameStore();
  const [initialized, setInitialized] = React.useState(false);
  const keysPressed = React.useRef<Set<string>>(new Set());

  // Initialize PixiJS
  React.useEffect(() => {
    if (!canvasRef.current || initialized) return;

    const initPixi = async () => {
      try {
        const app = new Application();
        await app.init({
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0x2d5016, // Turkish grass green
          antialias: false, // Pixel perfect
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        });

        if (canvasRef.current) {
          canvasRef.current.appendChild(app.canvas);
        }

        appRef.current = app;

        // Create main container
        const mainContainer = new Container();
        app.stage.addChild(mainContainer);
        containerRef.current = mainContainer;

        // Initialize sprite manager
        const spriteManager = SpriteManager.getInstance();
        console.log('Loading character sprites...');

        // Create tile map (Istanbul Spawn Zone)
        const tileMap = new TileMap(64, 64, 32);
        await tileMap.init();
        mainContainer.addChild(tileMap.getContainer());
        tileMapRef.current = tileMap;

        // Create player character
        const player = new CharacterController({
          id: 'player_1',
          username: 'Oyuncu',
          characterClass: 'developer', // Default: Yazılımcı
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          health: 100,
          maxHealth: 100,
          mana: 100,
          maxMana: 100,
          level: 1,
          xp: 0
        });

        await player.init();
        mainContainer.addChild(player.getContainer());
        playerRef.current = player;

        console.log('Character loaded successfully!');

        // Start render loop
        app.ticker.add((ticker) => {
          const deltaTime = ticker.deltaMS;

          // Update player
          if (playerRef.current) {
            playerRef.current.update(deltaTime);

            // Camera follow player (smooth lerp)
            const playerPos = playerRef.current.data;
            const lerpSpeed = 0.1;
            updateCamera({
              x: camera.x + (playerPos.x - camera.x) * lerpSpeed,
              y: camera.y + (playerPos.y - camera.y) * lerpSpeed
            });
          }

          if (containerRef.current) {
            // Apply camera transform
            containerRef.current.x = -camera.x * camera.zoom + app.screen.width / 2;
            containerRef.current.y = -camera.y * camera.zoom + app.screen.height / 2;
            containerRef.current.scale.set(camera.zoom);
          }

          // Update FPS
          updateMetrics({
            fps: Math.round(app.ticker.FPS),
            drawCalls: mainContainer.children.length,
            entities: 1 // Just player for now
          });
        });

        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize PixiJS:', error);
      }
    };

    initPixi();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, [initialized]);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (appRef.current) {
        appRef.current.renderer.resize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle keyboard input
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerRef.current) return;

      keysPressed.current.add(e.key.toLowerCase());
      playerRef.current.handleKeyDown(e.key);

      // Prevent default for game keys
      if (['w', 'a', 's', 'd', ' ', 'e', 'q'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!playerRef.current) return;

      keysPressed.current.delete(e.key.toLowerCase());
      playerRef.current.handleKeyUp(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [initialized]);

  return (
    <div className="relative w-full h-full">
      <div ref={canvasRef} id="game-canvas" className="absolute inset-0" />

      {/* Debug Overlay */}
      {renderOptions.showFPS && (
        <div className="absolute top-4 left-4 space-y-2">
          <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-md text-white font-mono text-sm">
            FPS: {metrics.fps}
          </div>
          {playerRef.current && (
            <>
              <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-md text-white font-mono text-xs">
                Pos: ({Math.round(playerRef.current.data.x)}, {Math.round(playerRef.current.data.y)})
              </div>
              <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-md text-white font-mono text-xs">
                Entities: {metrics.entities}
              </div>
            </>
          )}
        </div>
      )}

      {/* Controls Help */}
      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-md text-white text-sm space-y-1">
        <div className="font-bold mb-2 text-turkish-red">Kontroller:</div>
        <div><span className="font-mono bg-white/20 px-2 py-0.5 rounded">WASD</span> Hareket</div>
        <div><span className="font-mono bg-white/20 px-2 py-0.5 rounded">Shift</span> Koş</div>
        <div><span className="font-mono bg-white/20 px-2 py-0.5 rounded">E</span> Aksiyon</div>
      </div>

      {/* Loading overlay */}
      {!initialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-turkish-red to-turkish-gold">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
            <div className="text-white text-xl font-bold">Dünya Yükleniyor...</div>
            <div className="text-white/80 text-sm mt-2">Karakterler hazırlanıyor</div>
          </div>
        </div>
      )}
    </div>
  );
}
