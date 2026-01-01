"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Grid, Stats } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import Character3D from "./Character3D";
import { useGameStore } from "@/lib/store/gameStore";

/**
 * 3D WORLD COMPONENT FOR MAIN GAME
 * ANADOLU REALM - Istanbul Taksim Digital Environment
 
 *
 * Features:
 * - 3D characters with Turkish themes
 * - Istanbul Taksim square environment
 * - Real-time multiplayer sync
 * - Realistic lighting and shadows
 * - Turkish cultural landmarks
 */

interface Player {
  id: string;
  username: string;
  characterClass: "entrepreneur" | "developer" | "designer" | "marketer" | "merchant";
  position: [number, number, number];
  rotation: [number, number, number];
  level: number;
  velocity: { x: number; z: number };
  animation: "idle" | "walk" | "run" | "jump" | "attack" | "emote";
}

export default function Game3DWorld() {
  const { camera, renderOptions } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock players for development (will be replaced with real multiplayer data)
  const mockPlayers: Player[] = [
    {
      id: "player_1",
      username: "AhmetYılmaz",
      characterClass: "developer",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      level: 25,
      velocity: { x: 0, z: 0 },
      animation: "idle"
    },
    {
      id: "player_2",
      username: "MehmetDemir",
      characterClass: "entrepreneur",
      position: [5, 0, 0],
      rotation: [0, Math.PI / 4, 0],
      level: 18,
      velocity: { x: 0, z: 0 },
      animation: "idle"
    },
    {
      id: "player_3",
      username: "AyşeKara",
      characterClass: "designer",
      position: [-3, 0, 4],
      rotation: [0, -Math.PI / 2, 0],
      level: 32,
      velocity: { x: 0, z: 0 },
      animation: "walk"
    }
  ];

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        ref={canvasRef}
        shadows
        camera={{
          position: [15, 10, 15],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} color="#fff5e6" />
          <directionalLight
            position={[50, 50, 25]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={100}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <hemisphereLight
            args={["#87CEEB", "#8B4513", 0.6]}
            position={[0, 50, 0]}
          />

          {/* Turkish sun (warm golden light) */}
          <pointLight position={[-10, 15, -10]} intensity={0.8} color="#FFD700" />

          {/* Environment */}
          <Environment preset="sunset" />

          {/* Grid floor (Taksim Square) */}
          <Grid
            args={[100, 100]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#D4AF37"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#DC2626"
            fadeDistance={50}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
          />

          {/* Ground plane */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.01, 0]}
            receiveShadow
          >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial
              color="#8B7355"
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>

          {/* Taksim Monument (placeholder - simplified) */}
          <group position={[0, 0, -10]}>
            {/* Monument base */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <boxGeometry args={[4, 1, 4]} />
              <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.7} />
            </mesh>

            {/* Monument pillar */}
            <mesh position={[0, 3, 0]} castShadow>
              <cylinderGeometry args={[0.5, 0.5, 5, 16]} />
              <meshStandardMaterial color="#999999" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Turkish flag on top */}
            <mesh position={[0, 6, 0]} castShadow>
              <boxGeometry args={[2, 1.2, 0.05]} />
              <meshStandardMaterial color="#DC2626" emissive="#DC2626" emissiveIntensity={0.2} />
            </mesh>

            {/* Star and crescent (simplified) */}
            <mesh position={[0, 6, 0.1]} castShadow>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
            </mesh>
          </group>

          {/* Turkish Tea Shop (Çay Evi) - placeholder */}
          <group position={[10, 0, -5]}>
            {/* Building */}
            <mesh position={[0, 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[6, 4, 4]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>

            {/* Roof */}
            <mesh position={[0, 4.5, 0]} castShadow>
              <coneGeometry args={[4.5, 1.5, 4]} />
              <meshStandardMaterial color="#DC2626" roughness={0.6} />
            </mesh>

            {/* Sign */}
            <mesh position={[0, 3, 2.1]} castShadow>
              <boxGeometry args={[3, 0.8, 0.1]} />
              <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.3} />
            </mesh>
          </group>

          {/* Simit Cart (Turkish bagel cart) */}
          <group position={[-8, 0, 3]}>
            {/* Cart body */}
            <mesh position={[0, 0.8, 0]} castShadow>
              <boxGeometry args={[1.5, 0.5, 1]} />
              <meshStandardMaterial color="#DC2626" metalness={0.4} roughness={0.6} />
            </mesh>

            {/* Wheels */}
            <mesh position={[-0.5, 0.3, 0.6]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            <mesh position={[0.5, 0.3, 0.6]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
              <meshStandardMaterial color="#333333" />
            </mesh>

            {/* Glass dome */}
            <mesh position={[0, 1.5, 0]}>
              <sphereGeometry args={[0.8, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial
                color="#FFFFFF"
                transparent
                opacity={0.3}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          </group>

          {/* Characters */}
          {mockPlayers.map((player) => (
            <Character3D
              key={player.id}
              characterClass={player.characterClass}
              position={player.position}
              rotation={player.rotation}
              level={player.level}
              username={player.username}
              animation={player.animation}
              velocity={player.velocity}
            />
          ))}

          {/* Street lamps */}
          {[
            [8, 0, 8],
            [-8, 0, 8],
            [8, 0, -8],
            [-8, 0, -8]
          ].map((pos, i) => (
            <group key={`lamp_${i}`} position={pos as [number, number, number]}>
              {/* Pole */}
              <mesh castShadow>
                <cylinderGeometry args={[0.1, 0.1, 5, 8]} />
                <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
              </mesh>

              {/* Lamp */}
              <mesh position={[0, 2.8, 0]} castShadow>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={1}
                />
              </mesh>

              {/* Light source */}
              <pointLight
                position={[0, 2.8, 0]}
                intensity={2}
                distance={10}
                color="#FFD700"
                castShadow
              />
            </group>
          ))}

          {/* Camera controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2.2}
            target={[0, 0, 0]}
          />

          {/* Performance stats */}
          {renderOptions.showFPS && <Stats />}
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 space-y-2 pointer-events-none">
        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-md border border-turkish-gold">
          <div className="text-turkish-gold font-orbitron font-bold text-sm mb-1">
            🇹🇷 ANADOLU REALM
          </div>
          <div className="text-white/60 text-xs">
            powered by Lydian
          </div>
        </div>

        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-md text-white text-sm">
          <div className="font-bold text-turkish-gold mb-1">📍 İstanbul Taksim</div>
          <div className="text-xs text-white/80">
            {mockPlayers.length} oyuncu çevrimiçi
          </div>
        </div>
      </div>

      {/* Controls help */}
      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-md text-white text-sm space-y-1 pointer-events-none">
        <div className="font-bold mb-2 text-turkish-red">🎮 Kontroller:</div>
        <div><span className="font-mono bg-white/20 px-2 py-0.5 rounded">Sol Tık</span> Döndür</div>
        <div><span className="font-mono bg-white/20 px-2 py-0.5 rounded">Sağ Tık</span> Pan</div>
        <div><span className="font-mono bg-white/20 px-2 py-0.5 rounded">Scroll</span> Zoom</div>
      </div>
    </div>
  );
}
