import { AnimatedSprite, Texture } from 'pixi.js';
import { Entity } from './Entity.js';
import type { EntityConfig } from '../types/index.js';

/**
 * Animated sprite entity
 * For decorative animations like flags, water, fire, etc.
 */
export class Animated extends Entity {
  private animatedSprite: AnimatedSprite;

  constructor(config: EntityConfig, textures: Texture[], frameRate: number = 10) {
    super(config);

    // Create animated sprite
    this.animatedSprite = new AnimatedSprite(textures);
    this.animatedSprite.animationSpeed = frameRate / 60; // Convert to PixiJS speed
    this.animatedSprite.play();
    this.sprite.addChild(this.animatedSprite);
  }

  /**
   * Update animation
   */
  override update(delta: number): void {
    super.update(delta);
    // AnimatedSprite updates automatically
  }

  /**
   * Play animation
   */
  play(): void {
    this.animatedSprite.play();
  }

  /**
   * Stop animation
   */
  stop(): void {
    this.animatedSprite.stop();
  }

  /**
   * Set animation speed
   */
  setSpeed(speed: number): void {
    this.animatedSprite.animationSpeed = speed / 60;
  }

  /**
   * Go to frame
   */
  gotoFrame(frame: number): void {
    this.animatedSprite.gotoAndStop(frame);
  }

  /**
   * Set loop
   */
  setLoop(loop: boolean): void {
    this.animatedSprite.loop = loop;
  }
}
