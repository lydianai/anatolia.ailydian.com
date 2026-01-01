import type { KeyState, MouseState, TouchState, Vector2 } from '../types/index.js';

/**
 * Unified input management for keyboard, mouse, and touch
 */
export class InputManager {
  private keys: Map<string, KeyState> = new Map();
  private mouse: MouseState;
  private touch: TouchState;
  private canvas: HTMLCanvasElement;

  // Key mappings
  private keyMap: Map<string, string> = new Map([
    ['KeyW', 'up'],
    ['KeyS', 'down'],
    ['KeyA', 'left'],
    ['KeyD', 'right'],
    ['ArrowUp', 'up'],
    ['ArrowDown', 'down'],
    ['ArrowLeft', 'left'],
    ['ArrowRight', 'right'],
    ['Space', 'jump'],
    ['ShiftLeft', 'sprint'],
    ['ShiftRight', 'sprint'],
    ['KeyE', 'interact'],
    ['Escape', 'menu']
  ]);

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.mouse = {
      position: { x: 0, y: 0 },
      worldPosition: { x: 0, y: 0 },
      buttons: {},
      wheel: 0
    };

    this.touch = {
      touches: []
    };

    this.setupListeners();
  }

  /**
   * Setup event listeners
   */
  private setupListeners(): void {
    // Keyboard
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));

    // Mouse
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('wheel', this.onMouseWheel.bind(this));
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    // Touch
    this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
    this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
    this.canvas.addEventListener('touchcancel', this.onTouchEnd.bind(this));
  }

  /**
   * Keyboard handlers
   */
  private onKeyDown(e: KeyboardEvent): void {
    const key = this.keyMap.get(e.code) || e.code;
    const state = this.keys.get(key);

    if (!state || !state.pressed) {
      this.keys.set(key, {
        pressed: true,
        justPressed: true,
        justReleased: false
      });
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    const key = this.keyMap.get(e.code) || e.code;
    this.keys.set(key, {
      pressed: false,
      justPressed: false,
      justReleased: true
    });
  }

  /**
   * Mouse handlers
   */
  private onMouseMove(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.position.x = e.clientX - rect.left;
    this.mouse.position.y = e.clientY - rect.top;
  }

  private onMouseDown(e: MouseEvent): void {
    this.mouse.buttons[e.button] = true;
  }

  private onMouseUp(e: MouseEvent): void {
    this.mouse.buttons[e.button] = false;
  }

  private onMouseWheel(e: WheelEvent): void {
    e.preventDefault();
    this.mouse.wheel = e.deltaY;
  }

  /**
   * Touch handlers
   */
  private onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    this.updateTouches(e.touches);
  }

  private onTouchMove(e: TouchEvent): void {
    e.preventDefault();
    this.updateTouches(e.touches);
  }

  private onTouchEnd(e: TouchEvent): void {
    e.preventDefault();
    this.updateTouches(e.touches);
  }

  private updateTouches(touches: TouchList): void {
    const rect = this.canvas.getBoundingClientRect();
    this.touch.touches = Array.from(touches).map(touch => ({
      id: touch.identifier,
      position: {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      },
      worldPosition: { x: 0, y: 0 } // Will be updated by camera
    }));
  }

  /**
   * Update input state
   */
  update(): void {
    // Input state is updated by event listeners
  }

  /**
   * Post-update: clear just pressed/released states
   */
  postUpdate(): void {
    this.keys.forEach((state, key) => {
      if (state.justPressed) {
        this.keys.set(key, {
          ...state,
          justPressed: false
        });
      }
      if (state.justReleased) {
        this.keys.delete(key);
      }
    });

    // Reset mouse wheel
    this.mouse.wheel = 0;
  }

  /**
   * Check if key is currently pressed
   */
  isKeyPressed(key: string): boolean {
    return this.keys.get(key)?.pressed || false;
  }

  /**
   * Check if key was just pressed this frame
   */
  isKeyJustPressed(key: string): boolean {
    return this.keys.get(key)?.justPressed || false;
  }

  /**
   * Check if key was just released this frame
   */
  isKeyJustReleased(key: string): boolean {
    return this.keys.get(key)?.justReleased || false;
  }

  /**
   * Get mouse position
   */
  getMousePosition(): Vector2 {
    return { ...this.mouse.position };
  }

  /**
   * Get mouse world position
   */
  getMouseWorldPosition(): Vector2 {
    return { ...this.mouse.worldPosition };
  }

  /**
   * Update mouse world position (called by camera)
   */
  setMouseWorldPosition(position: Vector2): void {
    this.mouse.worldPosition = position;
  }

  /**
   * Check if mouse button is pressed
   */
  isMouseButtonPressed(button: number): boolean {
    return this.mouse.buttons[button] || false;
  }

  /**
   * Get mouse wheel delta
   */
  getMouseWheel(): number {
    return this.mouse.wheel;
  }

  /**
   * Get touch state
   */
  getTouches(): TouchState['touches'] {
    return [...this.touch.touches];
  }

  /**
   * Get movement vector from WASD/Arrow keys
   */
  getMovementVector(): Vector2 {
    const vec: Vector2 = { x: 0, y: 0 };

    if (this.isKeyPressed('left')) vec.x -= 1;
    if (this.isKeyPressed('right')) vec.x += 1;
    if (this.isKeyPressed('up')) vec.y -= 1;
    if (this.isKeyPressed('down')) vec.y += 1;

    // Normalize diagonal movement
    if (vec.x !== 0 && vec.y !== 0) {
      const length = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
      vec.x /= length;
      vec.y /= length;
    }

    return vec;
  }

  /**
   * Destroy input manager
   */
  destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown.bind(this));
    window.removeEventListener('keyup', this.onKeyUp.bind(this));
    this.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.removeEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.removeEventListener('wheel', this.onMouseWheel.bind(this));
    this.canvas.removeEventListener('touchstart', this.onTouchStart.bind(this));
    this.canvas.removeEventListener('touchmove', this.onTouchMove.bind(this));
    this.canvas.removeEventListener('touchend', this.onTouchEnd.bind(this));
    this.canvas.removeEventListener('touchcancel', this.onTouchEnd.bind(this));

    this.keys.clear();
  }
}
