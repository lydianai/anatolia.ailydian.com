import { Assets, Spritesheet, Texture } from 'pixi.js';
import type { AssetManifest } from '../types/index.js';

/**
 * Asset loading system
 * Manages all game assets with progress tracking
 */
export class AssetLoader {
  private loaded: Map<string, any> = new Map();
  private loadProgress: number = 0;
  private onProgress?: (progress: number) => void;

  /**
   * Load assets from manifest
   */
  async loadManifest(manifest: AssetManifest, onProgress?: (progress: number) => void): Promise<void> {
    this.onProgress = onProgress;
    this.loadProgress = 0;

    const totalAssets =
      Object.keys(manifest.spritesheets).length +
      Object.keys(manifest.textures).length +
      Object.keys(manifest.sounds).length +
      Object.keys(manifest.fonts).length;

    let loadedCount = 0;

    // Load spritesheets
    for (const [key, path] of Object.entries(manifest.spritesheets)) {
      const sheet = await Assets.load(path);
      this.loaded.set(key, sheet);
      loadedCount++;
      this.updateProgress(loadedCount / totalAssets);
    }

    // Load textures
    for (const [key, path] of Object.entries(manifest.textures)) {
      const texture = await Assets.load(path);
      this.loaded.set(key, texture);
      loadedCount++;
      this.updateProgress(loadedCount / totalAssets);
    }

    // Load sounds (using @pixi/sound)
    for (const [_key, _path] of Object.entries(manifest.sounds)) {
      // Would use sound.add() from @pixi/sound
      loadedCount++;
      this.updateProgress(loadedCount / totalAssets);
    }

    // Load fonts
    for (const [key, path] of Object.entries(manifest.fonts)) {
      await this.loadFont(key, path);
      loadedCount++;
      this.updateProgress(loadedCount / totalAssets);
    }

    this.loadProgress = 1;
    if (this.onProgress) this.onProgress(1);
  }

  /**
   * Load single texture
   */
  async loadTexture(key: string, path: string): Promise<Texture> {
    if (this.loaded.has(key)) {
      return this.loaded.get(key);
    }

    const texture = await Assets.load(path);
    this.loaded.set(key, texture);
    return texture;
  }

  /**
   * Load spritesheet
   */
  async loadSpritesheet(key: string, path: string): Promise<Spritesheet> {
    if (this.loaded.has(key)) {
      return this.loaded.get(key);
    }

    const sheet = await Assets.load(path);
    this.loaded.set(key, sheet);
    return sheet;
  }

  /**
   * Load font
   */
  private async loadFont(key: string, path: string): Promise<void> {
    const font = new FontFace(key, `url(${path})`);
    await font.load();
    (document.fonts as any).add(font);
  }

  /**
   * Get loaded asset
   */
  get<T = any>(key: string): T | undefined {
    return this.loaded.get(key);
  }

  /**
   * Get texture
   */
  getTexture(key: string): Texture | undefined {
    return this.loaded.get(key);
  }

  /**
   * Get spritesheet
   */
  getSpritesheet(key: string): Spritesheet | undefined {
    return this.loaded.get(key);
  }

  /**
   * Check if asset is loaded
   */
  has(key: string): boolean {
    return this.loaded.has(key);
  }

  /**
   * Update loading progress
   */
  private updateProgress(progress: number): void {
    this.loadProgress = progress;
    if (this.onProgress) {
      this.onProgress(progress);
    }
  }

  /**
   * Get loading progress
   */
  getProgress(): number {
    return this.loadProgress;
  }

  /**
   * Unload asset
   */
  unload(key: string): void {
    const asset: any = this.loaded.get(key);
    if (asset && asset.destroy) {
      asset.destroy();
    }
    this.loaded.delete(key);
  }

  /**
   * Unload all assets
   */
  unloadAll(): void {
    this.loaded.forEach((_asset, key) => {
      this.unload(key);
    });
    this.loaded.clear();
  }

  /**
   * Preload Turkish-themed assets
   */
  async preloadTurkishAssets(): Promise<void> {
    const manifest: AssetManifest = {
      spritesheets: {
        'characters': '/assets/spritesheets/characters.json',
        'buildings': '/assets/spritesheets/buildings.json',
        'tiles': '/assets/spritesheets/tiles.json',
        'turkish_patterns': '/assets/spritesheets/turkish_patterns.json'
      },
      textures: {
        'mosque': '/assets/textures/mosque.png',
        'bazaar': '/assets/textures/bazaar.png',
        'turkish_carpet': '/assets/textures/turkish_carpet.png',
        'cini_pattern': '/assets/textures/cini_pattern.png'
      },
      sounds: {
        'ezan': '/assets/sounds/ezan.mp3',
        'ney': '/assets/sounds/ney.mp3',
        'bazaar_ambient': '/assets/sounds/bazaar_ambient.mp3',
        'bosphorus_waves': '/assets/sounds/bosphorus_waves.mp3'
      },
      fonts: {
        'ottoman': '/assets/fonts/ottoman.ttf'
      }
    };

    await this.loadManifest(manifest);
  }
}
