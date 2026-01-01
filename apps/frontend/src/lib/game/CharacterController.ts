import * as PIXI from 'pixi.js';
import SpriteManager, { AnimationState, Direction } from './SpriteManager';

/**
 * CHARACTER CONTROLLER - Turkish Digital Metropol
 *
 * Handles character movement, animations, and input
 * Features:
 * - WASD movement with smooth interpolation
 * - 8-directional sprites
 * - Collision detection
 * - Socket.io sync ready
 */

export interface CharacterData {
  id: string;
  username: string;
  characterClass: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  level: number;
  xp: number;
}

export interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  shift: boolean; // Run modifier
  action1: boolean; // E key
  action2: boolean; // Q key
  action3: boolean; // Space key
}

export class CharacterController {
  private sprite: PIXI.AnimatedSprite | null = null;
  private container: PIXI.Container;
  private nameText: PIXI.Text;
  private healthBar: PIXI.Graphics;

  public data: CharacterData;
  public inputState: InputState;

  private currentState: AnimationState = AnimationState.IDLE;
  private currentDirection: Direction = Direction.SOUTH;
  private spriteManager: SpriteManager;
  private spriteSheet: PIXI.Spritesheet | null = null;

  // Movement constants
  private readonly WALK_SPEED = 200; // pixels/second
  private readonly RUN_SPEED = 350; // pixels/second
  private readonly ACCELERATION = 1200;
  private readonly DECELERATION = 800;

  // Interpolation
  private targetX: number = 0;
  private targetY: number = 0;
  private interpolationSpeed: number = 0.15;

  // Collision
  private collisionRadius: number = 16;
  private collisionEnabled: boolean = true;

  constructor(data: CharacterData) {
    this.data = data;
    this.targetX = data.x;
    this.targetY = data.y;

    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      shift: false,
      action1: false,
      action2: false,
      action3: false
    };

    this.spriteManager = SpriteManager.getInstance();
    this.container = new PIXI.Container();

    // Name label
    this.nameText = new PIXI.Text(data.username, {
      fontSize: 12,
      fill: 0xffffff,
      fontWeight: 'bold',
      stroke: { color: 0x000000, width: 3 }
    });
    this.nameText.anchor.set(0.5, 0);
    this.nameText.position.set(0, -40);
    this.container.addChild(this.nameText);

    // Health bar
    this.healthBar = new PIXI.Graphics();
    this.container.addChild(this.healthBar);
    this.updateHealthBar();
  }

  /**
   * Initialize character sprite
   */
  async init(): Promise<void> {
    this.spriteSheet = await this.spriteManager.loadCharacterSpriteSheet(
      this.data.characterClass
    );

    if (!this.spriteSheet) {
      console.error('Failed to load sprite sheet for:', this.data.characterClass);
      return;
    }

    // Create animated sprite with idle animation
    const animName = this.spriteManager.getAnimationName(
      AnimationState.IDLE,
      Direction.SOUTH
    );

    const textures = this.spriteSheet.animations[animName];
    if (!textures) {
      console.error('Animation not found:', animName);
      return;
    }

    this.sprite = new PIXI.AnimatedSprite(textures);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.animationSpeed = 0.15;
    this.sprite.play();

    this.container.addChildAt(this.sprite, 0);
    this.container.position.set(this.data.x, this.data.y);
  }

  /**
   * Update called every frame
   */
  update(deltaTime: number): void {
    if (!this.sprite || !this.spriteSheet) return;

    const dt = deltaTime / 1000; // Convert to seconds

    // Process input and update velocity
    this.updateVelocity(dt);

    // Update position with velocity
    this.data.x += this.data.vx * dt;
    this.data.y += this.data.vy * dt;

    // Smooth interpolation for rendering
    this.container.position.x += (this.data.x - this.container.position.x) * this.interpolationSpeed;
    this.container.position.y += (this.data.y - this.container.position.y) * this.interpolationSpeed;

    // Update animation state
    this.updateAnimationState();

    // Update direction
    if (this.data.vx !== 0 || this.data.vy !== 0) {
      const newDirection = this.spriteManager.calculateDirection(
        this.data.vx,
        this.data.vy
      );
      if (newDirection !== this.currentDirection) {
        this.currentDirection = newDirection;
        this.changeAnimation();
      }
    }
  }

  /**
   * Update velocity based on input
   */
  private updateVelocity(dt: number): void {
    let inputX = 0;
    let inputY = 0;

    if (this.inputState.up) inputY -= 1;
    if (this.inputState.down) inputY += 1;
    if (this.inputState.left) inputX -= 1;
    if (this.inputState.right) inputX += 1;

    // Normalize diagonal movement
    if (inputX !== 0 && inputY !== 0) {
      inputX *= 0.7071; // 1/√2
      inputY *= 0.7071;
    }

    // Determine target speed
    const maxSpeed = this.inputState.shift ? this.RUN_SPEED : this.WALK_SPEED;
    const targetVx = inputX * maxSpeed;
    const targetVy = inputY * maxSpeed;

    // Accelerate or decelerate
    if (inputX !== 0 || inputY !== 0) {
      // Accelerate
      this.data.vx += (targetVx - this.data.vx) * Math.min(1, this.ACCELERATION * dt);
      this.data.vy += (targetVy - this.data.vy) * Math.min(1, this.ACCELERATION * dt);
    } else {
      // Decelerate
      const decel = this.DECELERATION * dt;
      if (Math.abs(this.data.vx) < decel) {
        this.data.vx = 0;
      } else {
        this.data.vx -= Math.sign(this.data.vx) * decel;
      }

      if (Math.abs(this.data.vy) < decel) {
        this.data.vy = 0;
      } else {
        this.data.vy -= Math.sign(this.data.vy) * decel;
      }
    }
  }

  /**
   * Update animation state based on velocity
   */
  private updateAnimationState(): void {
    const speed = Math.sqrt(this.data.vx ** 2 + this.data.vy ** 2);

    let newState: AnimationState;

    if (this.inputState.action1 || this.inputState.action2 || this.inputState.action3) {
      newState = AnimationState.ACTION;
    } else if (speed < 10) {
      newState = AnimationState.IDLE;
    } else if (speed > this.WALK_SPEED * 1.2) {
      newState = AnimationState.RUN;
    } else {
      newState = AnimationState.WALK;
    }

    if (newState !== this.currentState) {
      this.currentState = newState;
      this.changeAnimation();
    }
  }

  /**
   * Change sprite animation
   */
  private changeAnimation(): void {
    if (!this.sprite || !this.spriteSheet) return;

    const animName = this.spriteManager.getAnimationName(
      this.currentState,
      this.currentDirection
    );

    const textures = this.spriteSheet.animations[animName];
    if (!textures) return;

    this.sprite.textures = textures;

    // Adjust animation speed based on state
    switch (this.currentState) {
      case AnimationState.IDLE:
        this.sprite.animationSpeed = 0.08;
        break;
      case AnimationState.WALK:
        this.sprite.animationSpeed = 0.15;
        break;
      case AnimationState.RUN:
        this.sprite.animationSpeed = 0.25;
        break;
      case AnimationState.ACTION:
        this.sprite.animationSpeed = 0.2;
        this.sprite.loop = false;
        this.sprite.onComplete = () => {
          this.sprite!.loop = true;
          this.currentState = AnimationState.IDLE;
          this.changeAnimation();
        };
        break;
    }

    this.sprite.play();
  }

  /**
   * Handle keyboard input
   */
  handleKeyDown(key: string): void {
    switch (key.toLowerCase()) {
      case 'w': this.inputState.up = true; break;
      case 's': this.inputState.down = true; break;
      case 'a': this.inputState.left = true; break;
      case 'd': this.inputState.right = true; break;
      case 'shift': this.inputState.shift = true; break;
      case 'e': this.inputState.action1 = true; break;
      case 'q': this.inputState.action2 = true; break;
      case ' ': this.inputState.action3 = true; break;
    }
  }

  handleKeyUp(key: string): void {
    switch (key.toLowerCase()) {
      case 'w': this.inputState.up = false; break;
      case 's': this.inputState.down = false; break;
      case 'a': this.inputState.left = false; break;
      case 'd': this.inputState.right = false; break;
      case 'shift': this.inputState.shift = false; break;
      case 'e': this.inputState.action1 = false; break;
      case 'q': this.inputState.action2 = false; break;
      case ' ': this.inputState.action3 = false; break;
    }
  }

  /**
   * Update health bar
   */
  private updateHealthBar(): void {
    this.healthBar.clear();

    const barWidth = 40;
    const barHeight = 4;
    const x = -barWidth / 2;
    const y = -32;

    // Background
    this.healthBar.beginFill(0x000000, 0.5);
    this.healthBar.drawRect(x, y, barWidth, barHeight);
    this.healthBar.endFill();

    // Health
    const healthPercent = this.data.health / this.data.maxHealth;
    const healthColor = healthPercent > 0.5 ? 0x00ff00 : healthPercent > 0.25 ? 0xffff00 : 0xff0000;

    this.healthBar.beginFill(healthColor);
    this.healthBar.drawRect(x, y, barWidth * healthPercent, barHeight);
    this.healthBar.endFill();
  }

  /**
   * Update character data (from network)
   */
  updateData(data: Partial<CharacterData>): void {
    Object.assign(this.data, data);

    if (data.health !== undefined) {
      this.updateHealthBar();
    }

    if (data.username !== undefined) {
      this.nameText.text = data.username;
    }
  }

  /**
   * Set position (for teleport, spawn, etc)
   */
  setPosition(x: number, y: number): void {
    this.data.x = x;
    this.data.y = y;
    this.container.position.set(x, y);
  }

  /**
   * Check collision with another character
   */
  checkCollision(other: CharacterController): boolean {
    if (!this.collisionEnabled) return false;

    const dx = this.data.x - other.data.x;
    const dy = this.data.y - other.data.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < (this.collisionRadius + other.collisionRadius);
  }

  /**
   * Get container for rendering
   */
  getContainer(): PIXI.Container {
    return this.container;
  }

  /**
   * Destroy character
   */
  destroy(): void {
    if (this.sprite) {
      this.sprite.destroy();
    }
    this.container.destroy();
  }

  /**
   * Get serializable data for network
   */
  getNetworkData() {
    return {
      id: this.data.id,
      x: this.data.x,
      y: this.data.y,
      vx: this.data.vx,
      vy: this.data.vy,
      state: this.currentState,
      direction: this.currentDirection
    };
  }
}
