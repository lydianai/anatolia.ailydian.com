import { Container } from 'pixi.js';
import type { Vector2, Bounds, CameraConfig } from '../types/index.js';

/**
 * Camera system with smooth following, zoom, and bounds
 */
export class Camera {
  private container: Container;
  private target: any | null = null;
  private targetZoom: number;
  private currentZoom: number;
  private config: CameraConfig;
  private screenWidth: number;
  private screenHeight: number;

  constructor(screenWidth: number, screenHeight: number) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.config = {
      zoom: 1,
      minZoom: 0.5,
      maxZoom: 3,
      smoothing: 0.1
    };

    this.currentZoom = this.config.zoom;
    this.targetZoom = this.config.zoom;

    this.container = new Container();
    this.container.sortableChildren = true;
  }

  /**
   * Get the camera container
   */
  getContainer(): Container {
    return this.container;
  }

  /**
   * Update camera position and zoom
   */
  update(_delta: number): void {
    if (this.target) {
      // Smooth follow target
      const targetX = this.screenWidth / 2 - this.target.x * this.currentZoom;
      const targetY = this.screenHeight / 2 - this.target.y * this.currentZoom;

      this.container.x += (targetX - this.container.x) * this.config.smoothing;
      this.container.y += (targetY - this.container.y) * this.config.smoothing;
    }

    // Smooth zoom
    if (Math.abs(this.currentZoom - this.targetZoom) > 0.001) {
      this.currentZoom += (this.targetZoom - this.currentZoom) * this.config.smoothing;
      this.container.scale.set(this.currentZoom);
    }

    // Apply bounds if set
    if (this.config.bounds) {
      this.applyBounds();
    }
  }

  /**
   * Set camera to follow an entity
   */
  follow(target: any): void {
    this.target = target;
  }

  /**
   * Stop following
   */
  unfollow(): void {
    this.target = null;
  }

  /**
   * Set camera position instantly
   */
  setPosition(x: number, y: number): void {
    this.container.x = this.screenWidth / 2 - x * this.currentZoom;
    this.container.y = this.screenHeight / 2 - y * this.currentZoom;
  }

  /**
   * Move camera by offset
   */
  move(dx: number, dy: number): void {
    this.container.x += dx;
    this.container.y += dy;
  }

  /**
   * Set zoom level
   */
  setZoom(zoom: number): void {
    this.targetZoom = Math.max(
      this.config.minZoom,
      Math.min(this.config.maxZoom, zoom)
    );
  }

  /**
   * Get current zoom
   */
  getZoom(): number {
    return this.currentZoom;
  }

  /**
   * Zoom in
   */
  zoomIn(amount: number = 0.1): void {
    this.setZoom(this.targetZoom + amount);
  }

  /**
   * Zoom out
   */
  zoomOut(amount: number = 0.1): void {
    this.setZoom(this.targetZoom - amount);
  }

  /**
   * Set camera bounds
   */
  setBounds(bounds: Bounds): void {
    this.config.bounds = bounds;
  }

  /**
   * Clear camera bounds
   */
  clearBounds(): void {
    this.config.bounds = undefined;
  }

  /**
   * Apply bounds constraints
   */
  private applyBounds(): void {
    if (!this.config.bounds) return;

    const bounds = this.config.bounds;
    const scale = this.currentZoom;

    // Calculate current viewport in world space
    const viewportWidth = this.screenWidth / scale;
    const viewportHeight = this.screenHeight / scale;

    const worldX = -this.container.x / scale;
    const worldY = -this.container.y / scale;

    // Constrain to bounds
    let clampedX = worldX;
    let clampedY = worldY;

    if (viewportWidth < bounds.width) {
      clampedX = Math.max(bounds.x, Math.min(worldX, bounds.x + bounds.width - viewportWidth));
    } else {
      clampedX = bounds.x + bounds.width / 2 - viewportWidth / 2;
    }

    if (viewportHeight < bounds.height) {
      clampedY = Math.max(bounds.y, Math.min(worldY, bounds.y + bounds.height - viewportHeight));
    } else {
      clampedY = bounds.y + bounds.height / 2 - viewportHeight / 2;
    }

    this.container.x = -clampedX * scale;
    this.container.y = -clampedY * scale;
  }

  /**
   * Get visible bounds in world coordinates
   */
  getVisibleBounds(): Bounds {
    const scale = this.currentZoom;
    const worldX = -this.container.x / scale;
    const worldY = -this.container.y / scale;
    const viewportWidth = this.screenWidth / scale;
    const viewportHeight = this.screenHeight / scale;

    return {
      x: worldX,
      y: worldY,
      width: viewportWidth,
      height: viewportHeight
    };
  }

  /**
   * Convert screen coordinates to world coordinates
   */
  screenToWorld(screenX: number, screenY: number): Vector2 {
    const scale = this.currentZoom;
    return {
      x: (screenX - this.container.x) / scale,
      y: (screenY - this.container.y) / scale
    };
  }

  /**
   * Convert world coordinates to screen coordinates
   */
  worldToScreen(worldX: number, worldY: number): Vector2 {
    const scale = this.currentZoom;
    return {
      x: worldX * scale + this.container.x,
      y: worldY * scale + this.container.y
    };
  }

  /**
   * Shake camera effect
   */
  shake(intensity: number, duration: number): void {
    const startX = this.container.x;
    const startY = this.container.y;
    const startTime = Date.now();

    const shakeInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        clearInterval(shakeInterval);
        this.container.x = startX;
        this.container.y = startY;
        return;
      }

      const currentIntensity = intensity * (1 - progress);
      this.container.x = startX + (Math.random() - 0.5) * currentIntensity;
      this.container.y = startY + (Math.random() - 0.5) * currentIntensity;
    }, 16); // ~60fps
  }

  /**
   * Resize camera
   */
  resize(width: number, height: number): void {
    this.screenWidth = width;
    this.screenHeight = height;
  }

  /**
   * Configure camera settings
   */
  configure(config: Partial<CameraConfig>): void {
    this.config = { ...this.config, ...config };
  }
}
