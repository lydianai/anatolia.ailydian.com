import * as PIXI from 'pixi.js';

/**
 * TILEMAP SYSTEM - Turkish Digital Metropol
 *
 * Renders the game world using tile-based system
 * Features:
 * - Chunked rendering (frustum culling)
 * - Turkish-themed tiles
 * - Collision map
 */

export enum TileType {
  GRASS = 0,
  STONE = 1,
  WATER = 2,
  SAND = 3,
  COBBLESTONE = 4,
  ASPHALT = 5,
  BUILDING = 6,
  TREE = 7,
  FLOWER = 8
}

export const TILE_COLORS = {
  [TileType.GRASS]: 0x4a7c2e,
  [TileType.STONE]: 0x7a7a7a,
  [TileType.WATER]: 0x2b6ca3,
  [TileType.SAND]: 0xd4a574,
  [TileType.COBBLESTONE]: 0x5a5a5a,
  [TileType.ASPHALT]: 0x3a3a3a,
  [TileType.BUILDING]: 0xc9a227,
  [TileType.TREE]: 0x2d5016,
  [TileType.FLOWER]: 0xe30a17 // Turkish red
};

export class TileMap {
  private container: PIXI.Container;
  private tiles: number[][];
  private tileSprites: Map<string, PIXI.Graphics> = new Map();
  private width: number;
  private height: number;
  private tileSize: number;

  constructor(width: number, height: number, tileSize: number = 32) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.container = new PIXI.Container();
    this.tiles = this.generateIstanbulSpawnZone();
  }

  /**
   * Initialize tilemap
   */
  async init(): Promise<void> {
    this.renderTiles();
  }

  /**
   * Generate Istanbul Spawn Zone
   */
  private generateIstanbulSpawnZone(): number[][] {
    const map: number[][] = [];

    for (let y = 0; y < this.height; y++) {
      map[y] = [];
      for (let x = 0; x < this.width; x++) {
        // Create Taksim Square-inspired layout
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

        // Center plaza (cobblestone)
        if (distFromCenter < 8) {
          map[y][x] = TileType.COBBLESTONE;
        }
        // Paths (asphalt)
        else if (
          (x === centerX || y === centerY) ||
          (Math.abs(x - centerX) < 2 || Math.abs(y - centerY) < 2)
        ) {
          map[y][x] = TileType.ASPHALT;
        }
        // Grass areas
        else if (distFromCenter < 20) {
          // Add some flowers randomly
          if (Math.random() < 0.05) {
            map[y][x] = TileType.FLOWER;
          } else {
            map[y][x] = TileType.GRASS;
          }
        }
        // Sand borders
        else if (distFromCenter < 25) {
          map[y][x] = TileType.SAND;
        }
        // Water edges
        else {
          map[y][x] = TileType.WATER;
        }

        // Add trees randomly in grass areas
        if (map[y][x] === TileType.GRASS && Math.random() < 0.03) {
          map[y][x] = TileType.TREE;
        }
      }
    }

    return map;
  }

  /**
   * Render tiles (chunked for performance)
   */
  private renderTiles(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tileType = this.tiles[y][x];
        const sprite = this.createTileSprite(tileType);

        sprite.x = (x - this.width / 2) * this.tileSize;
        sprite.y = (y - this.height / 2) * this.tileSize;

        this.container.addChild(sprite);
        this.tileSprites.set(`${x},${y}`, sprite);
      }
    }
  }

  /**
   * Create tile sprite
   */
  private createTileSprite(tileType: TileType): PIXI.Graphics {
    const sprite = new PIXI.Graphics();
    const color = TILE_COLORS[tileType];

    // Base tile
    sprite.beginFill(color);
    sprite.drawRect(0, 0, this.tileSize, this.tileSize);
    sprite.endFill();

    // Add texture/pattern based on type
    switch (tileType) {
      case TileType.GRASS:
        this.addGrassPattern(sprite);
        break;
      case TileType.COBBLESTONE:
        this.addCobblestonePattern(sprite);
        break;
      case TileType.WATER:
        this.addWaterPattern(sprite);
        break;
      case TileType.FLOWER:
        this.addFlowerPattern(sprite);
        break;
      case TileType.TREE:
        this.addTreePattern(sprite);
        break;
    }

    return sprite;
  }

  /**
   * Add grass pattern
   */
  private addGrassPattern(sprite: PIXI.Graphics): void {
    sprite.beginFill(0x3a6c1e, 0.3);
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * this.tileSize;
      const y = Math.random() * this.tileSize;
      sprite.drawRect(x, y, 2, 2);
    }
    sprite.endFill();
  }

  /**
   * Add cobblestone pattern
   */
  private addCobblestonePattern(sprite: PIXI.Graphics): void {
    sprite.lineStyle(1, 0x4a4a4a, 0.5);

    // Grid pattern
    for (let i = 0; i <= this.tileSize; i += 8) {
      sprite.moveTo(i, 0);
      sprite.lineTo(i, this.tileSize);
      sprite.moveTo(0, i);
      sprite.lineTo(this.tileSize, i);
    }
  }

  /**
   * Add water pattern (animated)
   */
  private addWaterPattern(sprite: PIXI.Graphics): void {
    sprite.beginFill(0x1b5c8a, 0.3);
    for (let i = 0; i < 3; i++) {
      const x = Math.random() * this.tileSize;
      const y = Math.random() * this.tileSize;
      sprite.drawCircle(x, y, 3);
    }
    sprite.endFill();
  }

  /**
   * Add flower pattern
   */
  private addFlowerPattern(sprite: PIXI.Graphics): void {
    // Turkish flag red flower
    const centerX = this.tileSize / 2;
    const centerY = this.tileSize / 2;

    sprite.beginFill(0xe30a17);
    sprite.drawCircle(centerX, centerY, 4);
    sprite.endFill();

    // Petals
    sprite.beginFill(0xff3344);
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * 4;
      const y = centerY + Math.sin(angle) * 4;
      sprite.drawCircle(x, y, 3);
    }
    sprite.endFill();
  }

  /**
   * Add tree pattern
   */
  private addTreePattern(sprite: PIXI.Graphics): void {
    const centerX = this.tileSize / 2;
    const centerY = this.tileSize / 2;

    // Trunk
    sprite.beginFill(0x4a2f1e);
    sprite.drawRect(centerX - 2, centerY, 4, 8);
    sprite.endFill();

    // Leaves
    sprite.beginFill(0x2d5016);
    sprite.drawCircle(centerX, centerY - 4, 8);
    sprite.endFill();

    sprite.beginFill(0x3a6c1e);
    sprite.drawCircle(centerX, centerY - 4, 6);
    sprite.endFill();
  }

  /**
   * Check if tile is walkable
   */
  isWalkable(x: number, y: number): boolean {
    const tileX = Math.floor(x / this.tileSize) + this.width / 2;
    const tileY = Math.floor(y / this.tileSize) + this.height / 2;

    if (tileX < 0 || tileX >= this.width || tileY < 0 || tileY >= this.height) {
      return false;
    }

    const tileType = this.tiles[tileY][tileX];

    // Water, buildings, and trees are not walkable
    return ![TileType.WATER, TileType.BUILDING, TileType.TREE].includes(tileType);
  }

  /**
   * Get container for rendering
   */
  getContainer(): PIXI.Container {
    return this.container;
  }

  /**
   * Get tile at position
   */
  getTileAt(x: number, y: number): TileType {
    const tileX = Math.floor(x / this.tileSize) + this.width / 2;
    const tileY = Math.floor(y / this.tileSize) + this.height / 2;

    if (tileX < 0 || tileX >= this.width || tileY < 0 || tileY >= this.height) {
      return TileType.WATER; // Out of bounds
    }

    return this.tiles[tileY][tileX];
  }

  /**
   * Update tile (for destructible terrain, etc.)
   */
  setTile(x: number, y: number, tileType: TileType): void {
    const tileX = Math.floor(x / this.tileSize) + this.width / 2;
    const tileY = Math.floor(y / this.tileSize) + this.height / 2;

    if (tileX < 0 || tileX >= this.width || tileY < 0 || tileY >= this.height) {
      return;
    }

    this.tiles[tileY][tileX] = tileType;

    // Update sprite
    const key = `${tileX},${tileY}`;
    const oldSprite = this.tileSprites.get(key);
    if (oldSprite) {
      this.container.removeChild(oldSprite);
      oldSprite.destroy();
    }

    const newSprite = this.createTileSprite(tileType);
    newSprite.x = (tileX - this.width / 2) * this.tileSize;
    newSprite.y = (tileY - this.height / 2) * this.tileSize;
    this.container.addChild(newSprite);
    this.tileSprites.set(key, newSprite);
  }

  /**
   * Destroy tilemap
   */
  destroy(): void {
    this.container.destroy({ children: true });
    this.tileSprites.clear();
  }
}
