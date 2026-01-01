/**
 * Procedural world generation
 * Generates Turkish-themed world content
 */
export class WorldGenerator {
  private seed: number;

  constructor(seed: number = Date.now()) {
    this.seed = seed;
  }

  /**
   * Simple seeded random number generator
   */
  private random(x: number, y: number): number {
    const n = Math.sin(x * 12.9898 + y * 78.233 + this.seed) * 43758.5453;
    return n - Math.floor(n);
  }

  /**
   * Generate tile data for chunk
   */
  generateChunk(chunkX: number, chunkY: number, size: number): number[][] {
    const tiles: number[][] = [];

    for (let y = 0; y < size; y++) {
      const row: number[] = [];
      for (let x = 0; x < size; x++) {
        const worldX = chunkX * size + x;
        const worldY = chunkY * size + y;

        const tileId = this.generateTile(worldX, worldY);
        row.push(tileId);
      }
      tiles.push(row);
    }

    return tiles;
  }

  /**
   * Generate single tile
   */
  private generateTile(x: number, y: number): number {
    const noise = this.noise(x * 0.1, y * 0.1);

    // Turkish-themed biomes
    if (noise < 0.3) return 1;  // Cobblestone (old Istanbul streets)
    if (noise < 0.5) return 2;  // Grass (park areas)
    if (noise < 0.7) return 3;  // Tiles (traditional Turkish tiles)
    return 4; // Water (Bosphorus)
  }

  /**
   * Simple Perlin-like noise
   */
  private noise(x: number, y: number): number {
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const y0 = Math.floor(y);
    const y1 = y0 + 1;

    const sx = x - x0;
    const sy = y - y0;

    const n0 = this.random(x0, y0);
    const n1 = this.random(x1, y0);
    const ix0 = this.interpolate(n0, n1, sx);

    const n2 = this.random(x0, y1);
    const n3 = this.random(x1, y1);
    const ix1 = this.interpolate(n2, n3, sx);

    return this.interpolate(ix0, ix1, sy);
  }

  /**
   * Linear interpolation
   */
  private interpolate(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  /**
   * Generate Turkish-themed structure
   */
  generateStructure(type: 'mosque' | 'bazaar' | 'hamam' | 'cay_bahcesi'): {
    tiles: number[][];
    width: number;
    height: number;
  } {
    // Simplified structure generation
    switch (type) {
      case 'mosque':
        return this.generateMosque();
      case 'bazaar':
        return this.generateBazaar();
      case 'hamam':
        return this.generateHamam();
      case 'cay_bahcesi':
        return this.generateCayBahcesi();
      default:
        return { tiles: [[]], width: 0, height: 0 };
    }
  }

  private generateMosque() {
    // Simple 5x5 mosque structure
    return {
      width: 5,
      height: 5,
      tiles: [
        [0, 10, 10, 10, 0],
        [10, 11, 11, 11, 10],
        [10, 11, 12, 11, 10],
        [10, 11, 11, 11, 10],
        [0, 10, 10, 10, 0]
      ]
    };
  }

  private generateBazaar() {
    return {
      width: 4,
      height: 3,
      tiles: [
        [20, 21, 21, 20],
        [21, 22, 22, 21],
        [20, 21, 21, 20]
      ]
    };
  }

  private generateHamam() {
    return {
      width: 3,
      height: 3,
      tiles: [
        [30, 31, 30],
        [31, 32, 31],
        [30, 31, 30]
      ]
    };
  }

  private generateCayBahcesi() {
    return {
      width: 4,
      height: 4,
      tiles: [
        [40, 41, 41, 40],
        [41, 42, 42, 41],
        [41, 42, 42, 41],
        [40, 41, 41, 40]
      ]
    };
  }

  /**
   * Set seed for deterministic generation
   */
  setSeed(seed: number): void {
    this.seed = seed;
  }
}
