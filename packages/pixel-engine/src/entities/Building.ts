import { Sprite, Texture } from 'pixi.js';
import { Entity } from './Entity.js';
import type { BuildingConfig } from '../types/index.js';

/**
 * Static building entity
 * Optimized for caching and collision
 */
export class Building extends Entity {
  private width: number;
  private height: number;
  private interactive: boolean;
  private buildingSprite: Sprite;

  constructor(config: BuildingConfig) {
    super(config);

    this.width = config.width;
    this.height = config.height;
    this.interactive = config.interactive || false;

    // Create building sprite
    this.buildingSprite = new Sprite();
    this.sprite.addChild(this.buildingSprite);

    // Set interactive
    if (this.interactive) {
      this.sprite.eventMode = 'static';
      this.sprite.cursor = 'pointer';
    }

    // Buildings are typically static, so cache as bitmap for performance
    (this.sprite as any).cacheAsTexture = true;
  }

  /**
   * Set building texture
   */
  setTexture(texture: Texture): void {
    this.buildingSprite.texture = texture;
  }

  /**
   * Get building dimensions
   */
  getDimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  /**
   * On click handler
   */
  onClick(callback: () => void): void {
    if (!this.interactive) return;

    this.sprite.on('pointerdown', callback);
  }

  /**
   * On hover handler
   */
  onHover(callback: () => void): void {
    if (!this.interactive) return;

    this.sprite.on('pointerover', callback);
  }

  /**
   * Remove interactivity
   */
  removeInteractivity(): void {
    this.interactive = false;
    this.sprite.eventMode = 'auto';
    this.sprite.removeAllListeners();
  }
}
