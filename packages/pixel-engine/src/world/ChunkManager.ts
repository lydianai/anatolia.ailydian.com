import { Container } from 'pixi.js';
import type { Chunk, Bounds } from '../types/index.js';

/**
 * Chunk-based world loading
 * Dynamically loads/unloads chunks for large worlds
 */
export class ChunkManager {
  private chunks: Map<string, Chunk> = new Map();
  private chunkSize: number;
  private loadedChunks: Set<string> = new Set();
  private container: Container;

  constructor(chunkSize: number = 16) {
    this.chunkSize = chunkSize;
    this.container = new Container();
  }

  /**
   * Get chunk key from coordinates
   */
  private getChunkKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  /**
   * Get chunk coordinates from world position
   */
  private worldToChunk(x: number, y: number): { cx: number; cy: number } {
    return {
      cx: Math.floor(x / this.chunkSize),
      cy: Math.floor(y / this.chunkSize)
    };
  }

  /**
   * Create a new chunk
   */
  private createChunk(cx: number, cy: number): Chunk {
    const container = new Container();

    return {
      x: cx,
      y: cy,
      width: this.chunkSize,
      height: this.chunkSize,
      tiles: [],
      container,
      loaded: false,
      dirty: false
    };
  }

  /**
   * Load chunk
   */
  async loadChunk(cx: number, cy: number): Promise<Chunk> {
    const key = this.getChunkKey(cx, cy);

    if (this.chunks.has(key)) {
      return this.chunks.get(key)!;
    }

    const chunk = this.createChunk(cx, cy);

    // Generate or load chunk data
    await this.generateChunkData(chunk);

    chunk.loaded = true;
    this.chunks.set(key, chunk);
    this.loadedChunks.add(key);
    this.container.addChild(chunk.container);

    return chunk;
  }

  /**
   * Unload chunk
   */
  unloadChunk(cx: number, cy: number): void {
    const key = this.getChunkKey(cx, cy);
    const chunk = this.chunks.get(key);

    if (!chunk) return;

    this.container.removeChild(chunk.container);
    chunk.container.destroy({ children: true });
    this.chunks.delete(key);
    this.loadedChunks.delete(key);
  }

  /**
   * Generate chunk data
   */
  private async generateChunkData(chunk: Chunk): Promise<void> {
    // Generate or load tile data for chunk
    chunk.tiles = Array(this.chunkSize)
      .fill(null)
      .map(() => Array(this.chunkSize).fill(0));

    // Would normally load from server or generate procedurally
  }

  /**
   * Update loaded chunks based on visible bounds
   */
  updateLoadedChunks(visibleBounds: Bounds): void {
    const { cx: minCX, cy: minCY } = this.worldToChunk(visibleBounds.x, visibleBounds.y);
    const { cx: maxCX, cy: maxCY } = this.worldToChunk(
      visibleBounds.x + visibleBounds.width,
      visibleBounds.y + visibleBounds.height
    );

    // Add buffer around visible area
    const buffer = 1;
    const neededChunks = new Set<string>();

    // Load chunks in visible area + buffer
    for (let cy = minCY - buffer; cy <= maxCY + buffer; cy++) {
      for (let cx = minCX - buffer; cx <= maxCX + buffer; cx++) {
        const key = this.getChunkKey(cx, cy);
        neededChunks.add(key);

        if (!this.loadedChunks.has(key)) {
          this.loadChunk(cx, cy);
        }
      }
    }

    // Unload chunks outside visible area
    for (const key of this.loadedChunks) {
      if (!neededChunks.has(key)) {
        const [cx, cy] = key.split(',').map(Number);
        this.unloadChunk(cx, cy);
      }
    }
  }

  /**
   * Get chunk at position
   */
  getChunkAt(x: number, y: number): Chunk | null {
    const { cx, cy } = this.worldToChunk(x, y);
    const key = this.getChunkKey(cx, cy);
    return this.chunks.get(key) || null;
  }

  /**
   * Get all loaded chunks
   */
  getLoadedChunks(): Chunk[] {
    return Array.from(this.chunks.values());
  }

  /**
   * Get container
   */
  getContainer(): Container {
    return this.container;
  }

  /**
   * Mark chunk as dirty (needs re-render)
   */
  markDirty(cx: number, cy: number): void {
    const key = this.getChunkKey(cx, cy);
    const chunk = this.chunks.get(key);
    if (chunk) {
      chunk.dirty = true;
    }
  }

  /**
   * Update dirty chunks
   */
  updateDirtyChunks(): void {
    for (const chunk of this.chunks.values()) {
      if (chunk.dirty) {
        // Re-render chunk
        chunk.dirty = false;
      }
    }
  }

  /**
   * Destroy chunk manager
   */
  destroy(): void {
    for (const chunk of this.chunks.values()) {
      chunk.container.destroy({ children: true });
    }

    this.chunks.clear();
    this.loadedChunks.clear();
    this.container.destroy({ children: true });
  }
}
