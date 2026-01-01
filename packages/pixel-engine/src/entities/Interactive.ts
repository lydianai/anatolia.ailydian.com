import { Sprite, Texture, Graphics } from 'pixi.js';
import { Entity } from './Entity.js';
import type { EntityConfig } from '../types/index.js';

/**
 * Interactive object entity
 * For clickable items, doors, NPCs, etc.
 */
export class Interactive extends Entity {
  private interactSprite: Sprite;
  private hoverIndicator: Graphics | null = null;
  private inRange: boolean = false;

  constructor(config: EntityConfig) {
    super(config);

    // Create interactive sprite
    this.interactSprite = new Sprite();
    this.sprite.addChild(this.interactSprite);

    // Enable interaction
    this.sprite.eventMode = 'static';
    this.sprite.cursor = 'pointer';

    // Create hover indicator
    this.createHoverIndicator();
  }

  /**
   * Create hover indicator
   */
  private createHoverIndicator(): void {
    this.hoverIndicator = new Graphics();
    this.hoverIndicator.circle(0, 0, 20);
    this.hoverIndicator.fill({ color: 0xffffff, alpha: 0.2 });
    this.hoverIndicator.visible = false;
    this.sprite.addChild(this.hoverIndicator);

    // Show on hover
    this.sprite.on('pointerover', () => {
      if (this.hoverIndicator) this.hoverIndicator.visible = true;
    });

    this.sprite.on('pointerout', () => {
      if (this.hoverIndicator) this.hoverIndicator.visible = false;
    });
  }

  /**
   * Set texture
   */
  setTexture(texture: Texture): void {
    this.interactSprite.texture = texture;
  }

  /**
   * On interact callback
   */
  onInteract(callback: () => void): void {
    this.sprite.on('pointerdown', callback);
  }

  /**
   * Set in range
   */
  setInRange(inRange: boolean): void {
    this.inRange = inRange;
  }

  /**
   * Is in range
   */
  isInRange(): boolean {
    return this.inRange;
  }

  /**
   * Show interaction prompt
   */
  showPrompt(_text: string = 'E'): void {
    // Could add a text prompt showing interaction key
  }

  /**
   * Hide interaction prompt
   */
  hidePrompt(): void {
    // Hide prompt
  }
}
