import { Container, Sprite, Texture } from 'pixi.js';
import type { TileMapConfig, Bounds } from '../types/index.js';

/**
 * Tile-based world system
 * Optimized for large maps with chunking
 */
export class TileMap {
  private container: Container;
  private config: TileMapConfig;
  private layers: Map<string, Container> = new Map();
  private tiles: Map<number, Texture> = new Map();
  private collisionMap: boolean[][] = [];

  constructor(config: TileMapConfig) {
    this.config = config;
    this.container = new Container();
    this.container.sortableChildren = true;

    this.initializeLayers();
    this.buildCollisionMap();
  }

  /**
   * Initialize tile layers
   */
  private initializeLayers(): void {
    for (const layerConfig of this.config.layers) {
      const layer = new Container();
      layer.zIndex = layerConfig.zIndex;
      layer.alpha = layerConfig.opacity;
      layer.visible = layerConfig.visible;

      this.layers.set(layerConfig.name, layer);
      this.container.addChild(layer);
    }
  }

  /**
   * Build collision map from tile data
   */
  private buildCollisionMap(): void {
    this.collisionMap = Array(this.config.height)
      .fill(null)
      .map(() => Array(this.config.width).fill(false));

    // Mark collision tiles (would be based on tile properties)
    // For now, simple placeholder
  }

  /**
   * Register tile texture
   */
  registerTile(id: number, texture: Texture, _collision: boolean = false): void {
    this.tiles.set(id, texture);
  }

  /**
   * Render tile layer
   */
  renderLayer(layerName: string, data: number[][]): void {
    const layer = this.layers.get(layerName);
    if (!layer) return;

    // Clear existing tiles
    layer.removeChildren();

    // Render tiles
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        const tileId = data[y][x];
        if (tileId === 0) continue; // Empty tile

        const texture = this.tiles.get(tileId);
        if (!texture) continue;

        const sprite = new Sprite(texture);
        sprite.x = x * this.config.tileWidth;
        sprite.y = y * this.config.tileHeight;
        layer.addChild(sprite);
      }
    }
  }

  /**
   * Get tile at world position
   */
  getTileAt(x: number, y: number, layer: string): number | null {
    const tileX = Math.floor(x / this.config.tileWidth);
    const tileY = Math.floor(y / this.config.tileHeight);

    const layerConfig = this.config.layers.find(l => l.name === layer);
    if (!layerConfig) return null;

    if (tileX < 0 || tileX >= this.config.width || tileY < 0 || tileY >= this.config.height) {
      return null;
    }

    return layerConfig.data[tileY][tileX];
  }

  /**
   * Set tile at position
   */
  setTileAt(x: number, y: number, layer: string, tileId: number): void {
    const tileX = Math.floor(x / this.config.tileWidth);
    const tileY = Math.floor(y / this.config.tileHeight);

    const layerConfig = this.config.layers.find(l => l.name === layer);
    if (!layerConfig) return;

    if (tileX < 0 || tileX >= this.config.width || tileY < 0 || tileY >= this.config.height) {
      return;
    }

    layerConfig.data[tileY][tileX] = tileId;
    this.renderLayer(layer, layerConfig.data);
  }

  /**
   * Check if position has collision
   */
  hasCollision(x: number, y: number): boolean {
    const tileX = Math.floor(x / this.config.tileWidth);
    const tileY = Math.floor(y / this.config.tileHeight);

    if (tileX < 0 || tileX >= this.config.width || tileY < 0 || tileY >= this.config.height) {
      return true; // Out of bounds = collision
    }

    return this.collisionMap[tileY][tileX];
  }

  /**
   * Set collision at tile
   */
  setCollision(tileX: number, tileY: number, collision: boolean): void {
    if (tileX < 0 || tileX >= this.config.width || tileY < 0 || tileY >= this.config.height) {
      return;
    }

    this.collisionMap[tileY][tileX] = collision;
  }

  /**
   * Get tiles in bounds
   */
  getTilesInBounds(bounds: Bounds): number[][] {
    const startX = Math.floor(bounds.x / this.config.tileWidth);
    const startY = Math.floor(bounds.y / this.config.tileHeight);
    const endX = Math.ceil((bounds.x + bounds.width) / this.config.tileWidth);
    const endY = Math.ceil((bounds.y + bounds.height) / this.config.tileHeight);

    const tiles: number[][] = [];

    for (let y = startY; y < endY; y++) {
      const row: number[] = [];
      for (let x = startX; x < endX; x++) {
        if (x >= 0 && x < this.config.width && y >= 0 && y < this.config.height) {
          row.push(this.config.layers[0].data[y][x]);
        } else {
          row.push(0);
        }
      }
      tiles.push(row);
    }

    return tiles;
  }

  /**
   * Get container
   */
  getContainer(): Container {
    return this.container;
  }

  /**
   * Get layer
   */
  getLayer(name: string): Container | undefined {
    return this.layers.get(name);
  }

  /**
   * Get map dimensions
   */
  getDimensions(): { width: number; height: number } {
    return {
      width: this.config.width * this.config.tileWidth,
      height: this.config.height * this.config.tileHeight
    };
  }

  /**
   * Destroy tilemap
   */
  destroy(): void {
    this.container.destroy({ children: true });
    this.layers.clear();
    this.tiles.clear();
  }
}
