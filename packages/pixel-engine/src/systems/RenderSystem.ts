import type { System, Bounds } from '../types/index.js';

/**
 * Render system with culling and LOD
 * Optimizes rendering performance
 */
export class RenderSystem implements System {
  priority = 100;
  private visibleBounds: Bounds | null = null;

  /**
   * Update render system
   */
  update(_delta: number, entities: any[]): void {
    if (!this.visibleBounds) return;

    // Frustum culling
    for (const entity of entities) {
      const visible = this.isInView(entity);
      entity.setVisible(visible);
    }
  }

  /**
   * Set visible bounds (from camera)
   */
  setVisibleBounds(bounds: Bounds): void {
    this.visibleBounds = bounds;
  }

  /**
   * Check if entity is in view
   */
  private isInView(entity: any): boolean {
    if (!this.visibleBounds) return true;

    const bounds = entity.getBounds();

    return (
      bounds.x < this.visibleBounds.x + this.visibleBounds.width &&
      bounds.x + bounds.width > this.visibleBounds.x &&
      bounds.y < this.visibleBounds.y + this.visibleBounds.height &&
      bounds.y + bounds.height > this.visibleBounds.y
    );
  }

  /**
   * Get LOD level based on distance from camera center
   */
  getLODLevel(entity: any, cameraCenter: { x: number; y: number }): number {
    const pos = entity.getPosition();
    const distance = Math.sqrt(
      Math.pow(pos.x - cameraCenter.x, 2) +
      Math.pow(pos.y - cameraCenter.y, 2)
    );

    if (distance < 300) return 0; // High detail
    if (distance < 600) return 1; // Medium detail
    return 2; // Low detail
  }

  destroy(): void {
    this.visibleBounds = null;
  }
}
