import { Container } from 'pixi.js';
import type { Bounds } from '../types/index.js';

/**
 * Base scene class
 * Manages entities, layers, and scene lifecycle
 */
export class Scene {
  private container: Container;
  private entities: Map<string, any> = new Map();
  private layers: Map<number, Container> = new Map();
  private mainEntity: any | null = null;

  constructor(private name: string) {
    this.container = new Container();
    this.container.sortableChildren = true;

    // Create default layers
    this.createLayer(0);  // Ground
    this.createLayer(1);  // Objects
    this.createLayer(2);  // Characters
    this.createLayer(3);  // Top/Overlay
  }

  /**
   * Preload scene assets
   */
  async preload(): Promise<void> {
    // Override in subclasses
  }

  /**
   * Create scene
   */
  create(): void {
    // Override in subclasses
  }

  /**
   * Update scene
   */
  update(delta: number): void {
    // Update all entities
    this.entities.forEach(entity => {
      if (entity.update) {
        entity.update(delta);
      }
    });
  }

  /**
   * Destroy scene
   */
  destroy(): void {
    // Destroy all entities
    this.entities.forEach(entity => {
      if (entity.destroy) {
        entity.destroy();
      }
    });

    this.entities.clear();
    this.layers.clear();
    this.container.destroy({ children: true });
  }

  /**
   * Get scene name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Get scene container
   */
  getContainer(): Container {
    return this.container;
  }

  /**
   * Create a new layer
   */
  createLayer(zIndex: number): Container {
    if (this.layers.has(zIndex)) {
      return this.layers.get(zIndex)!;
    }

    const layer = new Container();
    layer.zIndex = zIndex;
    layer.sortableChildren = true;

    this.layers.set(zIndex, layer);
    this.container.addChild(layer);

    return layer;
  }

  /**
   * Get layer by z-index
   */
  getLayer(zIndex: number): Container | undefined {
    return this.layers.get(zIndex);
  }

  /**
   * Add entity to scene
   */
  addEntity(id: string, entity: any, layer: number = 1): void {
    this.entities.set(id, entity);

    const layerContainer = this.getLayer(layer);
    if (layerContainer && entity.getSprite) {
      layerContainer.addChild(entity.getSprite());
    }
  }

  /**
   * Remove entity from scene
   */
  removeEntity(id: string): void {
    const entity = this.entities.get(id);
    if (entity) {
      if (entity.destroy) {
        entity.destroy();
      }
      this.entities.delete(id);
    }
  }

  /**
   * Get entity by ID
   */
  getEntity(id: string): any | undefined {
    return this.entities.get(id);
  }

  /**
   * Get all entities
   */
  getAllEntities(): any[] {
    return Array.from(this.entities.values());
  }

  /**
   * Set main entity (for camera following)
   */
  setMainEntity(entity: any): void {
    this.mainEntity = entity;
  }

  /**
   * Get main entity
   */
  getMainEntity(): any | null {
    return this.mainEntity;
  }

  /**
   * Cull entities outside visible bounds (frustum culling)
   */
  cullEntities(visibleBounds: Bounds): number {
    let visibleCount = 0;

    this.entities.forEach(entity => {
      if (!entity.getBounds) return;

      const bounds = entity.getBounds();
      const isVisible = this.boundsIntersect(bounds, visibleBounds);

      if (entity.setVisible) {
        entity.setVisible(isVisible);
      } else if (entity.getSprite) {
        entity.getSprite().visible = isVisible;
      }

      if (isVisible) visibleCount++;
    });

    return visibleCount;
  }

  /**
   * Check if two bounds intersect
   */
  private boundsIntersect(a: Bounds, b: Bounds): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /**
   * Find entities by type
   */
  findEntitiesByType(type: string): any[] {
    return Array.from(this.entities.values()).filter(
      entity => entity.type === type
    );
  }

  /**
   * Find entities in area
   */
  findEntitiesInArea(bounds: Bounds): any[] {
    return Array.from(this.entities.values()).filter(entity => {
      if (!entity.getBounds) return false;
      return this.boundsIntersect(entity.getBounds(), bounds);
    });
  }
}
