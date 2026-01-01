import { Application, Ticker } from 'pixi.js';
import type { EngineConfig, PerformanceMetrics } from '../types/index.js';
import { Renderer } from './Renderer.js';
import { Scene } from './Scene.js';
import { Camera } from './Camera.js';
import { InputManager } from './InputManager.js';

/**
 * Main game engine class
 * Manages rendering, scenes, input, and game loop
 * Target: 60 FPS guaranteed performance
 */
export class Engine {
  private app: Application;
  private renderer: Renderer;
  private currentScene: Scene | null = null;
  private camera: Camera;
  private inputManager: InputManager;
  private ticker: Ticker;
  private lastTime: number = 0;
  private deltaAccumulator: number = 0;
  private readonly fixedTimeStep: number = 1000 / 60; // 60 FPS
  private running: boolean = false;
  private metrics: PerformanceMetrics;

  constructor(
    private canvas: HTMLCanvasElement,
    private config: EngineConfig
  ) {
    this.metrics = {
      fps: 0,
      frameTime: 0,
      drawCalls: 0,
      textureMemory: 0,
      entityCount: 0,
      visibleEntities: 0
    };

    this.app = new Application();
    this.renderer = new Renderer(this.app);
    this.camera = new Camera(config.width, config.height);
    this.inputManager = new InputManager(canvas);
    this.ticker = Ticker.shared;
  }

  /**
   * Initialize the engine
   */
  async init(): Promise<void> {
    await this.app.init({
      canvas: this.canvas,
      width: this.config.width,
      height: this.config.height,
      resolution: this.config.resolution,
      backgroundColor: this.config.backgroundColor,
      antialias: this.config.antialias,
      autoDensity: true,
      resizeTo: this.config.autoResize ? window : undefined
    });

    // Setup camera
    this.app.stage.addChild(this.camera.getContainer());

    // Setup ticker
    this.ticker.maxFPS = this.config.targetFPS;
    this.ticker.add(this.update.bind(this));

    console.log('[Engine] Initialized successfully');
  }

  /**
   * Start the game loop
   */
  start(): void {
    if (this.running) return;

    this.running = true;
    this.lastTime = performance.now();
    this.ticker.start();

    console.log('[Engine] Started');
  }

  /**
   * Pause the game loop
   */
  pause(): void {
    if (!this.running) return;

    this.running = false;
    this.ticker.stop();

    console.log('[Engine] Paused');
  }

  /**
   * Main update loop - fixed timestep
   */
  private update(): void {
    if (!this.running) return;

    const currentTime = performance.now();
    const frameTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Update metrics
    this.metrics.frameTime = frameTime;
    this.metrics.fps = Math.round(1000 / frameTime);

    // Accumulate delta time
    this.deltaAccumulator += frameTime;

    // Fixed timestep updates
    let updates = 0;
    while (this.deltaAccumulator >= this.fixedTimeStep && updates < 5) {
      const delta = this.fixedTimeStep / 1000; // Convert to seconds

      // Update input
      this.inputManager.update();

      // Update current scene
      if (this.currentScene) {
        this.currentScene.update(delta);
      }

      // Update camera
      this.camera.update(delta);

      this.deltaAccumulator -= this.fixedTimeStep;
      updates++;
    }

    // Prevent spiral of death
    if (this.deltaAccumulator >= this.fixedTimeStep * 5) {
      this.deltaAccumulator = 0;
    }

    // Render
    this.render();

    // Post-update input (clear just pressed/released states)
    this.inputManager.postUpdate();
  }

  /**
   * Render the current frame
   */
  private render(): void {
    if (!this.currentScene) return;

    // Frustum culling and rendering
    const visibleBounds = this.camera.getVisibleBounds();
    this.metrics.visibleEntities = this.currentScene.cullEntities(visibleBounds);

    // Actual render happens automatically via PixiJS
    this.metrics.drawCalls = this.renderer.getDrawCalls();
  }

  /**
   * Load and switch to a new scene
   */
  async loadScene(scene: Scene): Promise<void> {
    console.log(`[Engine] Loading scene: ${scene.getName()}`);

    // Destroy current scene
    if (this.currentScene) {
      this.currentScene.destroy();
      this.camera.getContainer().removeChild(this.currentScene.getContainer());
    }

    // Set new scene
    this.currentScene = scene;

    // Preload scene assets
    await scene.preload();

    // Add scene to camera container
    this.camera.getContainer().addChild(scene.getContainer());

    // Create scene
    scene.create();

    // Set camera target to scene's main entity if exists
    const mainEntity = scene.getMainEntity();
    if (mainEntity) {
      this.camera.follow(mainEntity);
    }

    console.log(`[Engine] Scene loaded: ${scene.getName()}`);
  }

  /**
   * Get current scene
   */
  getScene(): Scene | null {
    return this.currentScene;
  }

  /**
   * Get camera
   */
  getCamera(): Camera {
    return this.camera;
  }

  /**
   * Get input manager
   */
  getInput(): InputManager {
    return this.inputManager;
  }

  /**
   * Get performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Resize the engine
   */
  resize(width: number, height: number): void {
    this.app.renderer.resize(width, height);
    this.camera.resize(width, height);
  }

  /**
   * Destroy the engine
   */
  destroy(): void {
    console.log('[Engine] Destroying...');

    this.ticker.stop();
    this.ticker.remove(this.update.bind(this));

    if (this.currentScene) {
      this.currentScene.destroy();
    }

    this.inputManager.destroy();
    this.app.destroy(true);

    this.running = false;

    console.log('[Engine] Destroyed');
  }
}
