import * as PIXI from 'pixi.js';

/**
 * SPRITE MANAGER - Turkish Digital Metropol
 *
 * Manages sprite sheets, animations, and texture caching
 * Supports 8-directional character animations
 */

export interface SpriteSheetConfig {
  path: string;
  frameWidth: number;
  frameHeight: number;
  animations: {
    [key: string]: {
      frames: number[];
      frameRate: number;
      loop: boolean;
    };
  };
}

export interface CharacterClass {
  id: string;
  name: string;
  nameTR: string;
  spriteSheet: string;
  description: string;
}

export const TURKISH_CHARACTER_CLASSES: CharacterClass[] = [
  {
    id: 'entrepreneur',
    name: 'Entrepreneur',
    nameTR: 'İş Adamı',
    spriteSheet: 'character_entrepreneur',
    description: 'Takım elbiseli, çantalı modern iş insanı'
  },
  {
    id: 'developer',
    name: 'Developer',
    nameTR: 'Yazılımcı',
    spriteSheet: 'character_developer',
    description: 'Kapüşonlu, laptoplı kod yazarı'
  },
  {
    id: 'designer',
    name: 'Designer',
    nameTR: 'Tasarımcı',
    spriteSheet: 'character_designer',
    description: 'Bereli, tabletli yaratıcı sanatçı'
  },
  {
    id: 'marketer',
    name: 'Marketer',
    nameTR: 'Pazarlamacı',
    spriteSheet: 'character_marketer',
    description: 'Kravatli, telefonlu satış ustası'
  },
  {
    id: 'trader',
    name: 'Trader',
    nameTR: 'Tüccar',
    spriteSheet: 'character_trader',
    description: 'Geleneksel yelek, ticaret dehası'
  }
];

export enum Direction {
  SOUTH = 0,      // Aşağı
  SOUTH_WEST = 1, // Güney-Batı
  WEST = 2,       // Sol
  NORTH_WEST = 3, // Kuzey-Batı
  NORTH = 4,      // Yukarı
  NORTH_EAST = 5, // Kuzey-Doğu
  EAST = 6,       // Sağ
  SOUTH_EAST = 7  // Güney-Doğu
}

export enum AnimationState {
  IDLE = 'idle',
  WALK = 'walk',
  RUN = 'run',
  ACTION = 'action'
}

class SpriteManager {
  private static instance: SpriteManager;
  private textureCache: Map<string, PIXI.Texture> = new Map();
  private spriteSheets: Map<string, PIXI.Spritesheet> = new Map();
  private loadingPromises: Map<string, Promise<PIXI.Spritesheet>> = new Map();

  private constructor() {}

  static getInstance(): SpriteManager {
    if (!SpriteManager.instance) {
      SpriteManager.instance = new SpriteManager();
    }
    return SpriteManager.instance;
  }

  /**
   * Load sprite sheet for a character class
   */
  async loadCharacterSpriteSheet(
    characterClass: string
  ): Promise<PIXI.Spritesheet | null> {
    const cacheKey = `character_${characterClass}`;

    // Return cached if available
    if (this.spriteSheets.has(cacheKey)) {
      return this.spriteSheets.get(cacheKey)!;
    }

    // Return existing loading promise
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    // Create sprite sheet config
    const config = this.createCharacterSpriteSheetConfig(characterClass);

    // Start loading
    const loadPromise = this.loadSpriteSheet(config, cacheKey);
    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      const spriteSheet = await loadPromise;
      this.spriteSheets.set(cacheKey, spriteSheet);
      this.loadingPromises.delete(cacheKey);
      return spriteSheet;
    } catch (error) {
      console.error(`Failed to load sprite sheet: ${cacheKey}`, error);
      this.loadingPromises.delete(cacheKey);
      return null;
    }
  }

  /**
   * Create sprite sheet configuration for character
   */
  private createCharacterSpriteSheetConfig(
    characterClass: string
  ): SpriteSheetConfig {
    const frameWidth = 32;
    const frameHeight = 32;
    const framesPerRow = 16;

    // 8 directions x 4 states x 12 frames = 384 frames total
    const animations: { [key: string]: any } = {};

    // Generate animation configs
    Object.values(AnimationState).forEach((state, stateIndex) => {
      for (let dir = 0; dir < 8; dir++) {
        const animName = `${state}_${dir}`;
        const startFrame = stateIndex * 96 + dir * 12; // 96 frames per state

        animations[animName] = {
          frames: Array.from({ length: 12 }, (_, i) => startFrame + i),
          frameRate: state === AnimationState.RUN ? 20 : state === AnimationState.WALK ? 12 : 8,
          loop: state !== AnimationState.ACTION
        };
      }
    });

    return {
      path: `/assets/sprites/${characterClass}.png`,
      frameWidth,
      frameHeight,
      animations
    };
  }

  /**
   * Load sprite sheet from config
   */
  private async loadSpriteSheet(
    config: SpriteSheetConfig,
    cacheKey: string
  ): Promise<PIXI.Spritesheet> {
    // Load base texture
    const texture = await PIXI.Assets.load(config.path);

    // Create sprite sheet data
    const frames: { [key: string]: any } = {};
    const meta = {
      scale: '1',
      image: config.path
    };

    // Calculate total frames
    const cols = Math.floor(texture.width / config.frameWidth);
    const rows = Math.floor(texture.height / config.frameHeight);
    const totalFrames = cols * rows;

    // Generate frame data
    for (let i = 0; i < totalFrames; i++) {
      const x = (i % cols) * config.frameWidth;
      const y = Math.floor(i / cols) * config.frameHeight;

      frames[`frame_${i}`] = {
        frame: { x, y, w: config.frameWidth, h: config.frameHeight },
        sourceSize: { w: config.frameWidth, h: config.frameHeight },
        spriteSourceSize: { x: 0, y: 0, w: config.frameWidth, h: config.frameHeight }
      };
    }

    // Create animations
    const animations: { [key: string]: string[] } = {};
    Object.entries(config.animations).forEach(([name, animConfig]) => {
      animations[name] = animConfig.frames.map(f => `frame_${f}`);
    });

    // Create spritesheet
    const spriteSheetData = {
      frames,
      animations,
      meta
    };

    const spriteSheet = new PIXI.Spritesheet(texture, spriteSheetData);
    await spriteSheet.parse();

    return spriteSheet;
  }

  /**
   * Get animation name for state and direction
   */
  getAnimationName(state: AnimationState, direction: Direction): string {
    return `${state}_${direction}`;
  }

  /**
   * Calculate direction from velocity
   */
  calculateDirection(vx: number, vy: number): Direction {
    if (vx === 0 && vy === 0) return Direction.SOUTH; // Default facing

    const angle = Math.atan2(vy, vx);
    const degrees = (angle * 180 / Math.PI + 360) % 360;

    // 8-direction mapping (45 degree segments)
    if (degrees >= 337.5 || degrees < 22.5) return Direction.EAST;
    if (degrees >= 22.5 && degrees < 67.5) return Direction.SOUTH_EAST;
    if (degrees >= 67.5 && degrees < 112.5) return Direction.SOUTH;
    if (degrees >= 112.5 && degrees < 157.5) return Direction.SOUTH_WEST;
    if (degrees >= 157.5 && degrees < 202.5) return Direction.WEST;
    if (degrees >= 202.5 && degrees < 247.5) return Direction.NORTH_WEST;
    if (degrees >= 247.5 && degrees < 292.5) return Direction.NORTH;
    return Direction.NORTH_EAST;
  }

  /**
   * Preload all character classes
   */
  async preloadAllCharacters(): Promise<void> {
    const promises = TURKISH_CHARACTER_CLASSES.map(char =>
      this.loadCharacterSpriteSheet(char.id)
    );
    await Promise.all(promises);
    console.log('All character sprites loaded!');
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.textureCache.clear();
    this.spriteSheets.clear();
    this.loadingPromises.clear();
  }

  /**
   * Get cache stats
   */
  getCacheStats() {
    return {
      textures: this.textureCache.size,
      spriteSheets: this.spriteSheets.size,
      loading: this.loadingPromises.size
    };
  }
}

export default SpriteManager;
