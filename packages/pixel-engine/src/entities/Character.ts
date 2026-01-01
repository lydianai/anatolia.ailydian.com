import { Sprite, Text, Graphics, Texture } from 'pixi.js';
import { Entity } from './Entity.js';
import type { CharacterConfig, Vector2 } from '../types/index.js';
import { AnimationState, Direction } from '../types/index.js';

/**
 * Character entity with animations, movement, and stats
 * Supports 8-directional movement and equipment rendering
 */
export class Character extends Entity {
  private velocity: Vector2 = { x: 0, y: 0 };
  private speed: number;
  private direction: Direction = Direction.SOUTH;
  private currentAnimation: AnimationState = AnimationState.IDLE;
  private animationFrame: number = 0;
  private animationTime: number = 0;
  private health: number;
  private maxHealth: number;
  private nameTag: Text | null = null;
  private healthBar: Graphics | null = null;
  private characterSprite: Sprite;

  constructor(config: CharacterConfig) {
    super(config);

    this.speed = config.speed;
    this.health = config.health || 100;
    this.maxHealth = config.maxHealth || 100;

    // Create character sprite
    this.characterSprite = new Sprite();
    this.sprite.addChild(this.characterSprite);

    // Create name tag if name provided
    if (config.name) {
      this.createNameTag(config.name);
    }

    // Create health bar
    this.createHealthBar();
  }

  /**
   * Update character
   */
  override update(delta: number): void {
    super.update(delta);

    // Apply velocity
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;

    // Update animation
    this.updateAnimation(delta);

    // Update health bar
    this.updateHealthBar();

    // Determine animation state
    this.updateAnimationState();
  }

  /**
   * Set velocity
   */
  setVelocity(x: number, y: number): void {
    this.velocity.x = x;
    this.velocity.y = y;

    // Update direction based on velocity
    this.updateDirection();
  }

  /**
   * Move in direction
   */
  moveInDirection(direction: Vector2, sprint: boolean = false): void {
    const speedMultiplier = sprint ? 1.5 : 1;
    this.velocity.x = direction.x * this.speed * speedMultiplier;
    this.velocity.y = direction.y * this.speed * speedMultiplier;

    this.updateDirection();
  }

  /**
   * Stop movement
   */
  stop(): void {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  /**
   * Update direction based on velocity
   */
  private updateDirection(): void {
    if (this.velocity.x === 0 && this.velocity.y === 0) return;

    const angle = Math.atan2(this.velocity.y, this.velocity.x);
    const deg = (angle * 180 / Math.PI + 360) % 360;

    // 8-directional
    if (deg >= 337.5 || deg < 22.5) this.direction = Direction.EAST;
    else if (deg >= 22.5 && deg < 67.5) this.direction = Direction.SOUTH_EAST;
    else if (deg >= 67.5 && deg < 112.5) this.direction = Direction.SOUTH;
    else if (deg >= 112.5 && deg < 157.5) this.direction = Direction.SOUTH_WEST;
    else if (deg >= 157.5 && deg < 202.5) this.direction = Direction.WEST;
    else if (deg >= 202.5 && deg < 247.5) this.direction = Direction.NORTH_WEST;
    else if (deg >= 247.5 && deg < 292.5) this.direction = Direction.NORTH;
    else if (deg >= 292.5 && deg < 337.5) this.direction = Direction.NORTH_EAST;
  }

  /**
   * Update animation state
   */
  private updateAnimationState(): void {
    const moving = Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1;

    if (moving) {
      const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
      this.currentAnimation = speed > this.speed * 1.2 ? AnimationState.RUN : AnimationState.WALK;
    } else {
      this.currentAnimation = AnimationState.IDLE;
    }
  }

  /**
   * Update animation frame
   */
  private updateAnimation(delta: number): void {
    this.animationTime += delta;

    // Simple frame animation (4 frames, 10 FPS)
    const frameRate = 10;
    const frameDuration = 1 / frameRate;

    if (this.animationTime >= frameDuration) {
      this.animationFrame = (this.animationFrame + 1) % 4;
      this.animationTime = 0;

      // Update sprite texture based on animation and direction
      // This would normally load from spritesheet
    }
  }

  /**
   * Set texture
   */
  setTexture(texture: Texture): void {
    this.characterSprite.texture = texture;
  }

  /**
   * Take damage
   */
  takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);

    if (this.health === 0) {
      this.onDeath();
    }
  }

  /**
   * Heal
   */
  heal(amount: number): void {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  /**
   * On death
   */
  private onDeath(): void {
    this.currentAnimation = AnimationState.DEATH;
    this.setActive(false);
  }

  /**
   * Create name tag
   */
  private createNameTag(name: string): void {
    this.nameTag = new Text({
      text: name,
      style: {
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 0xffffff,
        stroke: { color: 0x000000, width: 2 }
      }
    });

    this.nameTag.anchor.set(0.5, 1);
    this.nameTag.position.set(0, -40);
    this.sprite.addChild(this.nameTag);
  }

  /**
   * Create health bar
   */
  private createHealthBar(): void {
    this.healthBar = new Graphics();
    this.healthBar.position.set(-16, -30);
    this.sprite.addChild(this.healthBar);
    this.updateHealthBar();
  }

  /**
   * Update health bar
   */
  private updateHealthBar(): void {
    if (!this.healthBar) return;

    this.healthBar.clear();

    // Background
    this.healthBar.rect(0, 0, 32, 4);
    this.healthBar.fill(0x000000);

    // Health
    const healthWidth = (this.health / this.maxHealth) * 30;
    const healthColor = this.health > this.maxHealth * 0.5 ? 0x00ff00 :
                        this.health > this.maxHealth * 0.25 ? 0xffff00 : 0xff0000;

    this.healthBar.rect(1, 1, healthWidth, 2);
    this.healthBar.fill(healthColor);
  }

  /**
   * Get current direction
   */
  getDirection(): Direction {
    return this.direction;
  }

  /**
   * Get current animation
   */
  getAnimation(): AnimationState {
    return this.currentAnimation;
  }

  /**
   * Get health
   */
  getHealth(): number {
    return this.health;
  }

  /**
   * Get velocity
   */
  getVelocity(): Vector2 {
    return { ...this.velocity };
  }

  /**
   * Is moving
   */
  isMoving(): boolean {
    return Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1;
  }
}
