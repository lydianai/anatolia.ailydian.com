import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Character, Position, Monster, NPC } from '@/types/api';
import type { Player, Camera, GameUIState, PerformanceMetrics, RenderOptions, Quest } from '@/types/game';

interface GameState {
  // Connection
  isConnected: boolean;
  isLoading: boolean;

  // Character
  currentCharacter: Character | null;

  // World
  worldId: string | null;
  nearbyPlayers: Map<string, Player>;
  nearbyMonsters: Map<string, Monster>;
  nearbyNPCs: Map<string, NPC>;

  // Camera
  camera: Camera;

  // UI
  ui: GameUIState;

  // Performance
  metrics: PerformanceMetrics;

  // Settings
  renderOptions: RenderOptions;

  // Quests
  activeQuests: Quest[];
}

interface GameActions {
  // Connection
  setConnected: (connected: boolean) => void;
  setLoading: (loading: boolean) => void;

  // Character
  setCharacter: (character: Character | null) => void;
  updateCharacterPosition: (position: Position) => void;
  updateCharacterHealth: (health: number) => void;

  // World
  setWorldId: (worldId: string) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  updatePlayer: (playerId: string, updates: Partial<Player>) => void;
  addMonster: (monster: Monster) => void;
  removeMonster: (monsterId: string) => void;
  updateMonster: (monsterId: string, updates: Partial<Monster>) => void;
  addNPC: (npc: NPC) => void;
  removeNPC: (npcId: string) => void;

  // Camera
  setCamera: (camera: Partial<Camera>) => void;
  updateCamera: (camera: Partial<Camera>) => void;
  moveCameraTo: (x: number, y: number) => void;
  zoomCamera: (zoom: number) => void;

  // UI
  toggleUI: (key: keyof GameUIState) => void;
  setUIState: (key: keyof GameUIState, value: boolean | string | null) => void;

  // Performance
  updateMetrics: (metrics: Partial<PerformanceMetrics>) => void;

  // Settings
  updateRenderOptions: (options: Partial<RenderOptions>) => void;

  // Quests
  addQuest: (quest: Quest) => void;
  updateQuest: (questId: string, updates: Partial<Quest>) => void;
  removeQuest: (questId: string) => void;

  // Reset
  reset: () => void;
}

type GameStore = GameState & GameActions;

const initialState: GameState = {
  isConnected: false,
  isLoading: false,
  currentCharacter: null,
  worldId: null,
  nearbyPlayers: new Map(),
  nearbyMonsters: new Map(),
  nearbyNPCs: new Map(),
  camera: {
    x: 0,
    y: 0,
    zoom: 1,
  },
  ui: {
    showInventory: false,
    showCharacterSheet: false,
    showMap: false,
    showChat: true,
    showSettings: false,
    selectedTarget: null,
  },
  metrics: {
    fps: 60,
    ping: 0,
    packetLoss: 0,
    lastUpdate: Date.now(),
  },
  renderOptions: {
    quality: 'high',
    showFPS: true,
    showPing: true,
    showPlayerNames: true,
    showHealthBars: true,
    particleEffects: true,
    shadowQuality: 'medium',
  },
  activeQuests: [],
};

export const useGameStore = create<GameStore>()(
  immer((set) => ({
    ...initialState,

    // Connection
    setConnected: (connected) =>
      set((state) => {
        state.isConnected = connected;
      }),

    setLoading: (loading) =>
      set((state) => {
        state.isLoading = loading;
      }),

    // Character
    setCharacter: (character) =>
      set((state) => {
        state.currentCharacter = character;
        if (character) {
          state.camera.target = character.id;
        }
      }),

    updateCharacterPosition: (position) =>
      set((state) => {
        if (state.currentCharacter) {
          state.currentCharacter.position = position;
        }
      }),

    updateCharacterHealth: (health) =>
      set((state) => {
        if (state.currentCharacter) {
          state.currentCharacter.health = health;
        }
      }),

    // World
    setWorldId: (worldId) =>
      set((state) => {
        state.worldId = worldId;
      }),

    addPlayer: (player) =>
      set((state) => {
        state.nearbyPlayers.set(player.id, player);
      }),

    removePlayer: (playerId) =>
      set((state) => {
        state.nearbyPlayers.delete(playerId);
      }),

    updatePlayer: (playerId, updates) =>
      set((state) => {
        const player = state.nearbyPlayers.get(playerId);
        if (player) {
          state.nearbyPlayers.set(playerId, { ...player, ...updates });
        }
      }),

    addMonster: (monster) =>
      set((state) => {
        state.nearbyMonsters.set(monster.id, monster);
      }),

    removeMonster: (monsterId) =>
      set((state) => {
        state.nearbyMonsters.delete(monsterId);
      }),

    updateMonster: (monsterId, updates) =>
      set((state) => {
        const monster = state.nearbyMonsters.get(monsterId);
        if (monster) {
          state.nearbyMonsters.set(monsterId, { ...monster, ...updates });
        }
      }),

    addNPC: (npc) =>
      set((state) => {
        state.nearbyNPCs.set(npc.id, npc);
      }),

    removeNPC: (npcId) =>
      set((state) => {
        state.nearbyNPCs.delete(npcId);
      }),

    // Camera
    setCamera: (camera) =>
      set((state) => {
        state.camera = { ...state.camera, ...camera };
      }),

    updateCamera: (camera) =>
      set((state) => {
        state.camera = { ...state.camera, ...camera };
      }),

    moveCameraTo: (x, y) =>
      set((state) => {
        state.camera.x = x;
        state.camera.y = y;
      }),

    zoomCamera: (zoom) =>
      set((state) => {
        state.camera.zoom = Math.max(0.5, Math.min(2, zoom));
      }),

    // UI
    toggleUI: (key) =>
      set((state) => {
        const value = state.ui[key];
        if (typeof value === 'boolean') {
          (state.ui as any)[key] = !value;
        }
      }),

    setUIState: (key, value) =>
      set((state) => {
        (state.ui as any)[key] = value;
      }),

    // Performance
    updateMetrics: (metrics) =>
      set((state) => {
        state.metrics = { ...state.metrics, ...metrics };
      }),

    // Settings
    updateRenderOptions: (options) =>
      set((state) => {
        state.renderOptions = { ...state.renderOptions, ...options };
      }),

    // Quests
    addQuest: (quest) =>
      set((state) => {
        state.activeQuests.push(quest);
      }),

    updateQuest: (questId, updates) =>
      set((state) => {
        const index = state.activeQuests.findIndex((q) => q.id === questId);
        if (index !== -1) {
          state.activeQuests[index] = { ...state.activeQuests[index], ...updates };
        }
      }),

    removeQuest: (questId) =>
      set((state) => {
        state.activeQuests = state.activeQuests.filter((q) => q.id !== questId);
      }),

    // Reset
    reset: () =>
      set(() => ({
        ...initialState,
        nearbyPlayers: new Map(),
        nearbyMonsters: new Map(),
        nearbyNPCs: new Map(),
      })),
  }))
);

// Selectors
export const selectCharacter = (state: GameStore) => state.currentCharacter;
export const selectIsConnected = (state: GameStore) => state.isConnected;
export const selectNearbyPlayers = (state: GameStore) => Array.from(state.nearbyPlayers.values());
export const selectCamera = (state: GameStore) => state.camera;
export const selectUI = (state: GameStore) => state.ui;
export const selectMetrics = (state: GameStore) => state.metrics;
