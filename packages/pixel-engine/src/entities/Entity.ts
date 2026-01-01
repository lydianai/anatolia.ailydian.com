import { Container } from 'pixi.js';
import type { Vector2, Bounds, EntityConfig } from '../types/index.js';

/**
 * Base entity class
 * All game objects inherit from this
 */
export abstract class Entity {
  protected sprite: Container;
  protected position: Vector2;
  protected scale: Vector2;
  protected rotation: number;
  protected active: boolean;
  protected visible: boolean;

  constructor(protected config: EntityConfig) {
    this.position = { ...config.position };
    this.scale = config.scale || { x: 1, y: 1 };
    this.rotation = config.rotation || 0;
    this.active = config.active ?? true;
    this.visible = config.visible ?? true;

    this.sprite = new Container();
    this.sprite.position.set(this.position.x, this.position.y);
    this.sprite.scale.set(this.scale.x, this.scale.y);
    this.sprite.rotation = this.rotation;
    this.sprite.visible = this.visible;
  }

  /**
   * Update entity
   */
  update(_delta: number): void {
    if (!this.active) return;

    // Update sprite transform
    this.sprite.position.set(this.position.x, this.position.y);
    this.sprite.scale.set(this.scale.x, this.scale.y);
    this.sprite.rotation = this.rotation;
  }

  /**
   * Destroy entity
   */
  destroy(): void {
    this.sprite.destroy({ children: true });
  }

  /**
   * Get sprite
   */
  getSprite(): Container {
    return this.sprite;
  }

  /**
   * Get position
   */
  getPosition(): Vector2 {
    return { ...this.position };
  }

  /**
   * Set position
   */
  setPosition(x: number, y: number): void {
    this.position.x = x;
    this.position.y = y;
  }

  /**
   * Move by offset
   */
  move(dx: number, dy: number): void {
    this.position.x += dx;
    this.position.y += dy;
  }

  /**
   * Get bounds
   */
  getBounds(): Bounds {
    const bounds = this.sprite.getBounds();
    return {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height
    };
  }

  /**
   * Set visible
   */
  setVisible(visible: boolean): void {
    this.visible = visible;
    this.sprite.visible = visible;
  }

  /**
   * Is visible
   */
  isVisible(): boolean {
    return this.visible;
  }

  /**
   * Set active
   */
  setActive(active: boolean): void {
    this.active = active;
  }

  /**
   * Is active
   */
  isActive(): boolean {
    return this.active;
  }

  /**
   * Get ID
   */
  getId(): string {
    return this.config.id;
  }

  /**
   * Get type
   */
  getType(): string {
    return this.config.type;
  }

  /**
   * Get world position (for camera following)
   */
  get x(): number {
    return this.position.x;
  }

  get y(): number {
    return this.position.y;
  }
}
