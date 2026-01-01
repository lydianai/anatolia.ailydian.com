/**
 * 📱 RESPONSIVE UI SYSTEM - ANADOLU REALM
 *
 * Premium mobil uyumlu UI sistemi:
 * - Adaptive layouts (mobil, tablet, desktop, 4K)
 * - Touch-optimized controls
 * - Orientation detection
 * - Safe area handling (notch support)
 * - Dynamic font scaling
 * - Performance-aware rendering
 *
 * @author AILYDIAN Orchestrator v4.0
 */

import * as THREE from 'three';

/**
 * Ekran boyutu kategorileri
 */
export enum ScreenSize {
  MOBILE_SMALL = 'mobile_small',    // < 375px (iPhone SE)
  MOBILE = 'mobile',                // 375px - 768px
  TABLET = 'tablet',                // 768px - 1024px
  DESKTOP = 'desktop',              // 1024px - 1920px
  DESKTOP_LARGE = 'desktop_large',  // 1920px - 2560px
  ULTRA_WIDE = 'ultra_wide'         // > 2560px (4K+)
}

/**
 * Orientation types
 */
export enum Orientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape'
}

/**
 * UI bileşen pozisyonları
 */
export enum UIPosition {
  TOP_LEFT = 'top_left',
  TOP_CENTER = 'top_center',
  TOP_RIGHT = 'top_right',
  MIDDLE_LEFT = 'middle_left',
  MIDDLE_CENTER = 'middle_center',
  MIDDLE_RIGHT = 'middle_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_CENTER = 'bottom_center',
  BOTTOM_RIGHT = 'bottom_right'
}

/**
 * Touch gesture types
 */
export enum GestureType {
  TAP = 'tap',
  DOUBLE_TAP = 'double_tap',
  LONG_PRESS = 'long_press',
  SWIPE_UP = 'swipe_up',
  SWIPE_DOWN = 'swipe_down',
  SWIPE_LEFT = 'swipe_left',
  SWIPE_RIGHT = 'swipe_right',
  PINCH_IN = 'pinch_in',
  PINCH_OUT = 'pinch_out',
  ROTATE = 'rotate'
}

/**
 * UI element configuration
 */
export interface UIElementConfig {
  id: string;
  position: UIPosition;
  width: number | string;  // px or percentage
  height: number | string;
  visible: boolean;
  touchEnabled: boolean;
  priority: number;  // 0-10 (higher = rendered on top)
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

/**
 * Safe area insets (for notch, home indicator, etc.)
 */
export interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Touch event data
 */
export interface TouchEventData {
  type: GestureType;
  x: number;
  y: number;
  deltaX?: number;
  deltaY?: number;
  scale?: number;
  rotation?: number;
  timestamp: number;
}

/**
 * Viewport configuration
 */
export interface ViewportConfig {
  width: number;
  height: number;
  pixelRatio: number;
  size: ScreenSize;
  orientation: Orientation;
  safeArea: SafeAreaInsets;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  hasNotch: boolean;
}

/**
 * 📱 Premium Responsive UI System
 */
export class ResponsiveUISystem {
  private viewport: ViewportConfig;
  private elements: Map<string, UIElementConfig> = new Map();
  private listeners: Map<string, Function[]> = new Map();

  // Touch gesture detection
  private touchStartTime: number = 0;
  private touchStartPos: { x: number; y: number } = { x: 0, y: 0 };
  private touchCount: number = 0;
  private lastTouchTime: number = 0;

  // Pinch/rotate tracking
  private initialDistance: number = 0;
  private initialAngle: number = 0;

  // Configuration
  private readonly LONG_PRESS_DURATION = 500; // ms
  private readonly DOUBLE_TAP_DURATION = 300; // ms
  private readonly SWIPE_THRESHOLD = 50; // px

  constructor() {
    this.viewport = this.detectViewport();
    this.setupEventListeners();
    this.applyResponsiveStyles();
  }

  /**
   * 🔍 Viewport detection with full device support
   */
  private detectViewport(): ViewportConfig {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;

    // Detect screen size
    let size: ScreenSize;
    if (width < 375) {
      size = ScreenSize.MOBILE_SMALL;
    } else if (width < 768) {
      size = ScreenSize.MOBILE;
    } else if (width < 1024) {
      size = ScreenSize.TABLET;
    } else if (width < 1920) {
      size = ScreenSize.DESKTOP;
    } else if (width < 2560) {
      size = ScreenSize.DESKTOP_LARGE;
    } else {
      size = ScreenSize.ULTRA_WIDE;
    }

    // Detect orientation
    const orientation = width > height ? Orientation.LANDSCAPE : Orientation.PORTRAIT;

    // Detect device types
    const isMobile = size === ScreenSize.MOBILE_SMALL || size === ScreenSize.MOBILE;
    const isTablet = size === ScreenSize.TABLET;
    const isDesktop = !isMobile && !isTablet;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Detect notch (iOS devices)
    const hasNotch = this.detectNotch();

    // Calculate safe area insets
    const safeArea = this.calculateSafeArea(hasNotch);

    return {
      width,
      height,
      pixelRatio,
      size,
      orientation,
      safeArea,
      isMobile,
      isTablet,
      isDesktop,
      hasTouch,
      hasNotch
    };
  }

  /**
   * 📱 Detect notch (iPhone X and newer)
   */
  private detectNotch(): boolean {
    // CSS env() support indicates notch
    const css = getComputedStyle(document.documentElement);
    const safeAreaTop = css.getPropertyValue('env(safe-area-inset-top)');

    return safeAreaTop !== '' && parseInt(safeAreaTop) > 20;
  }

  /**
   * 📏 Calculate safe area insets
   */
  private calculateSafeArea(hasNotch: boolean): SafeAreaInsets {
    if (!hasNotch) {
      return { top: 0, right: 0, bottom: 0, left: 0 };
    }

    // iOS notch safe areas
    const css = getComputedStyle(document.documentElement);

    return {
      top: parseInt(css.getPropertyValue('env(safe-area-inset-top)')) || 44,
      right: parseInt(css.getPropertyValue('env(safe-area-inset-right)')) || 0,
      bottom: parseInt(css.getPropertyValue('env(safe-area-inset-bottom)')) || 34,
      left: parseInt(css.getPropertyValue('env(safe-area-inset-left)')) || 0
    };
  }

  /**
   * 🎨 Apply responsive CSS styles
   */
  private applyResponsiveStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      /* Safe area support */
      :root {
        --safe-area-top: ${this.viewport.safeArea.top}px;
        --safe-area-right: ${this.viewport.safeArea.right}px;
        --safe-area-bottom: ${this.viewport.safeArea.bottom}px;
        --safe-area-left: ${this.viewport.safeArea.left}px;
      }

      /* Prevent text selection on mobile */
      .ui-element {
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }

      /* Touch-friendly tap targets (min 44x44px) */
      .ui-button {
        min-width: 44px;
        min-height: 44px;
        cursor: pointer;
        touch-action: manipulation;
      }

      /* Disable pull-to-refresh */
      body {
        overscroll-behavior-y: contain;
      }

      /* Mobile landscape orientation fix */
      @media screen and (orientation: landscape) and (max-height: 500px) {
        .ui-header {
          height: 40px !important;
        }
      }

      /* Tablet-specific styles */
      @media screen and (min-width: 768px) and (max-width: 1024px) {
        .ui-sidebar {
          width: 300px;
        }
      }

      /* High DPI screens */
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        .ui-icon {
          image-rendering: -webkit-optimize-contrast;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * 👆 Setup touch and mouse event listeners
   */
  private setupEventListeners(): void {
    // Resize handler
    window.addEventListener('resize', () => {
      this.viewport = this.detectViewport();
      this.emit('viewport-change', this.viewport);
    });

    // Orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.viewport = this.detectViewport();
        this.emit('orientation-change', this.viewport.orientation);
      }, 100);
    });

    // Touch events
    if (this.viewport.hasTouch) {
      document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
      document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
      document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    }

    // Mouse events (for desktop)
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  /**
   * 👆 Touch start handler
   */
  private handleTouchStart(event: TouchEvent): void {
    const now = Date.now();
    this.touchCount = event.touches.length;

    if (this.touchCount === 1) {
      const touch = event.touches[0];
      this.touchStartPos = { x: touch.clientX, y: touch.clientY };
      this.touchStartTime = now;

      // Detect double tap
      if (now - this.lastTouchTime < this.DOUBLE_TAP_DURATION) {
        this.emit('gesture', {
          type: GestureType.DOUBLE_TAP,
          x: touch.clientX,
          y: touch.clientY,
          timestamp: now
        });
      }

      this.lastTouchTime = now;

      // Start long press timer
      setTimeout(() => {
        if (this.touchStartTime === now) {
          this.emit('gesture', {
            type: GestureType.LONG_PRESS,
            x: touch.clientX,
            y: touch.clientY,
            timestamp: now
          });
        }
      }, this.LONG_PRESS_DURATION);

    } else if (this.touchCount === 2) {
      // Pinch/rotate start
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];

      this.initialDistance = this.getTouchDistance(touch1, touch2);
      this.initialAngle = this.getTouchAngle(touch1, touch2);
    }
  }

  /**
   * 👆 Touch move handler
   */
  private handleTouchMove(event: TouchEvent): void {
    if (this.touchCount === 2) {
      event.preventDefault(); // Prevent default pinch zoom

      const touch1 = event.touches[0];
      const touch2 = event.touches[1];

      // Detect pinch
      const currentDistance = this.getTouchDistance(touch1, touch2);
      const scale = currentDistance / this.initialDistance;

      if (scale > 1.1) {
        this.emit('gesture', {
          type: GestureType.PINCH_OUT,
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2,
          scale,
          timestamp: Date.now()
        });
      } else if (scale < 0.9) {
        this.emit('gesture', {
          type: GestureType.PINCH_IN,
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2,
          scale,
          timestamp: Date.now()
        });
      }

      // Detect rotation
      const currentAngle = this.getTouchAngle(touch1, touch2);
      const rotation = currentAngle - this.initialAngle;

      if (Math.abs(rotation) > 10) {
        this.emit('gesture', {
          type: GestureType.ROTATE,
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2,
          rotation,
          timestamp: Date.now()
        });
      }
    }
  }

  /**
   * 👆 Touch end handler
   */
  private handleTouchEnd(event: TouchEvent): void {
    if (this.touchCount === 1 && event.changedTouches.length === 1) {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - this.touchStartPos.x;
      const deltaY = touch.clientY - this.touchStartPos.y;
      const duration = Date.now() - this.touchStartTime;

      // Detect swipe
      if (Math.abs(deltaX) > this.SWIPE_THRESHOLD || Math.abs(deltaY) > this.SWIPE_THRESHOLD) {
        let gestureType: GestureType;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          gestureType = deltaX > 0 ? GestureType.SWIPE_RIGHT : GestureType.SWIPE_LEFT;
        } else {
          gestureType = deltaY > 0 ? GestureType.SWIPE_DOWN : GestureType.SWIPE_UP;
        }

        this.emit('gesture', {
          type: gestureType,
          x: touch.clientX,
          y: touch.clientY,
          deltaX,
          deltaY,
          timestamp: Date.now()
        });
      } else if (duration < this.LONG_PRESS_DURATION) {
        // Simple tap
        this.emit('gesture', {
          type: GestureType.TAP,
          x: touch.clientX,
          y: touch.clientY,
          timestamp: Date.now()
        });
      }
    }

    this.touchCount = 0;
    this.touchStartTime = 0;
  }

  /**
   * 📏 Calculate distance between two touches
   */
  private getTouchDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * 📐 Calculate angle between two touches
   */
  private getTouchAngle(touch1: Touch, touch2: Touch): number {
    return Math.atan2(
      touch2.clientY - touch1.clientY,
      touch2.clientX - touch1.clientX
    ) * (180 / Math.PI);
  }

  /**
   * 🖱️ Mouse handlers (desktop fallback)
   */
  private handleMouseDown(event: MouseEvent): void {
    if (!this.viewport.hasTouch) {
      this.touchStartPos = { x: event.clientX, y: event.clientY };
      this.touchStartTime = Date.now();
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    // Desktop mouse move logic
  }

  private handleMouseUp(event: MouseEvent): void {
    if (!this.viewport.hasTouch) {
      const deltaX = event.clientX - this.touchStartPos.x;
      const deltaY = event.clientY - this.touchStartPos.y;

      if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) {
        this.emit('gesture', {
          type: GestureType.TAP,
          x: event.clientX,
          y: event.clientY,
          timestamp: Date.now()
        });
      }
    }
  }

  /**
   * ➕ Register UI element
   */
  public registerElement(config: UIElementConfig): void {
    // Filter by device type
    if (config.mobileOnly && !this.viewport.isMobile) return;
    if (config.desktopOnly && this.viewport.isMobile) return;

    this.elements.set(config.id, config);
    this.updateElementLayout(config);
  }

  /**
   * ➖ Unregister UI element
   */
  public unregisterElement(id: string): void {
    this.elements.delete(id);
  }

  /**
   * 📐 Update element layout based on viewport
   */
  private updateElementLayout(config: UIElementConfig): void {
    const element = document.getElementById(config.id);
    if (!element) return;

    // Calculate position with safe area
    const position = this.calculatePosition(config.position);

    element.style.position = 'absolute';
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;

    // Set dimensions
    if (typeof config.width === 'number') {
      element.style.width = `${config.width}px`;
    } else {
      element.style.width = config.width;
    }

    if (typeof config.height === 'number') {
      element.style.height = `${config.height}px`;
    } else {
      element.style.height = config.height;
    }

    // Set z-index
    element.style.zIndex = config.priority.toString();

    // Visibility
    element.style.display = config.visible ? 'block' : 'none';

    // Touch events
    if (config.touchEnabled) {
      element.classList.add('ui-element', 'ui-button');
    }
  }

  /**
   * 📍 Calculate element position
   */
  private calculatePosition(position: UIPosition): { x: number; y: number } {
    const { width, height, safeArea } = this.viewport;

    let x = 0, y = 0;

    switch (position) {
      case UIPosition.TOP_LEFT:
        x = safeArea.left + 20;
        y = safeArea.top + 20;
        break;
      case UIPosition.TOP_CENTER:
        x = width / 2;
        y = safeArea.top + 20;
        break;
      case UIPosition.TOP_RIGHT:
        x = width - safeArea.right - 20;
        y = safeArea.top + 20;
        break;
      case UIPosition.MIDDLE_LEFT:
        x = safeArea.left + 20;
        y = height / 2;
        break;
      case UIPosition.MIDDLE_CENTER:
        x = width / 2;
        y = height / 2;
        break;
      case UIPosition.MIDDLE_RIGHT:
        x = width - safeArea.right - 20;
        y = height / 2;
        break;
      case UIPosition.BOTTOM_LEFT:
        x = safeArea.left + 20;
        y = height - safeArea.bottom - 20;
        break;
      case UIPosition.BOTTOM_CENTER:
        x = width / 2;
        y = height - safeArea.bottom - 20;
        break;
      case UIPosition.BOTTOM_RIGHT:
        x = width - safeArea.right - 20;
        y = height - safeArea.bottom - 20;
        break;
    }

    return { x, y };
  }

  /**
   * 📱 Get scaled font size
   */
  public getScaledFontSize(baseSize: number): number {
    const { size } = this.viewport;

    switch (size) {
      case ScreenSize.MOBILE_SMALL:
        return baseSize * 0.85;
      case ScreenSize.MOBILE:
        return baseSize * 0.95;
      case ScreenSize.TABLET:
        return baseSize * 1.1;
      case ScreenSize.DESKTOP_LARGE:
        return baseSize * 1.2;
      case ScreenSize.ULTRA_WIDE:
        return baseSize * 1.3;
      default:
        return baseSize;
    }
  }

  /**
   * 📊 Get viewport info
   */
  public getViewport(): ViewportConfig {
    return { ...this.viewport };
  }

  /**
   * 📱 Check if mobile
   */
  public isMobile(): boolean {
    return this.viewport.isMobile;
  }

  /**
   * 📱 Check if tablet
   */
  public isTablet(): boolean {
    return this.viewport.isTablet;
  }

  /**
   * 🖥️ Check if desktop
   */
  public isDesktop(): boolean {
    return this.viewport.isDesktop;
  }

  /**
   * 🔄 Get orientation
   */
  public getOrientation(): Orientation {
    return this.viewport.orientation;
  }

  /**
   * 📡 Event system
   */
  public on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  public off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  /**
   * 🧹 Cleanup
   */
  public dispose(): void {
    this.elements.clear();
    this.listeners.clear();
  }
}
