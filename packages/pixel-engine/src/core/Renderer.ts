import type { Application, Container } from 'pixi.js';

/**
 * Renderer optimization system
 * Handles sprite batching, culling, and LOD
 */
export class Renderer {
  private drawCalls: number = 0;
  private lastRenderTime: number = 0;

  constructor(private app: Application) {}

  /**
   * Get the number of draw calls in last frame
   */
  getDrawCalls(): number {
    return this.drawCalls;
  }

  /**
   * Get the PixiJS renderer
   */
  getRenderer() {
    return this.app.renderer;
  }

  /**
   * Get renderer stats
   */
  getStats() {
    return {
      drawCalls: this.drawCalls,
      renderTime: this.lastRenderTime
    };
  }

  /**
   * Enable/disable specific containers for rendering
   */
  setVisible(container: Container, visible: boolean): void {
    container.visible = visible;
  }

  /**
   * Optimize container for static content (cacheAsBitmap)
   */
  optimizeStatic(container: Container): void {
    // Cache as bitmap for static content
    (container as any).cacheAsTexture = true;
  }

  /**
   * Clear static optimization
   */
  clearStaticOptimization(container: Container): void {
    (container as any).cacheAsTexture = false;
  }

  /**
   * Batch render multiple containers
   */
  batchRender(_containers: Container[]): void {
    const startTime = performance.now();

    // PixiJS handles batching automatically
    // This is a hook for custom batching logic if needed

    this.lastRenderTime = performance.now() - startTime;
  }

  /**
   * Get texture memory usage (approximate)
   */
  getTextureMemory(): number {
    // Approximate calculation based on loaded textures
    // const textures = this.app.renderer.texture;
    // This is a simplified estimate
    return 0; // Would need to iterate through texture cache
  }

  /**
   * Clear unused textures from memory
   */
  clearUnusedTextures(): void {
    // PixiJS has a texture garbage collector
    // Manual cleanup can be triggered here
  }

  /**
   * Set renderer resolution
   */
  setResolution(resolution: number): void {
    this.app.renderer.resolution = resolution;
  }

  /**
   * Take a screenshot
   */
  screenshot(): string {
    return (this.app.renderer.extract as any).canvas(this.app.stage).toDataURL();
  }
}
