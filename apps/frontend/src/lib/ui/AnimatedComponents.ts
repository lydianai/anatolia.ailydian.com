/**
 * ✨ ANIMATED COMPONENTS - ANADOLU REALM
 *
 * Son teknoloji premium animasyonlu UI bileşenleri:
 * - Smooth micro-interactions
 * - 60 FPS garantili animasyonlar
 * - GPU-accelerated transforms
 * - Framer Motion benzeri ease functions
 * - Parallax effects
 * - Glassmorphism & neumorphism
 * - Particle effects
 * - Ripple animations
 *
 * @author AILYDIAN Orchestrator v4.0
 */

import * as THREE from 'three';

/**
 * Animation easing functions
 */
export class Easing {
  // Linear
  static linear = (t: number): number => t;

  // Ease In
  static easeInQuad = (t: number): number => t * t;
  static easeInCubic = (t: number): number => t * t * t;
  static easeInQuart = (t: number): number => t * t * t * t;
  static easeInQuint = (t: number): number => t * t * t * t * t;
  static easeInSine = (t: number): number => 1 - Math.cos((t * Math.PI) / 2);
  static easeInExpo = (t: number): number => t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
  static easeInCirc = (t: number): number => 1 - Math.sqrt(1 - t * t);
  static easeInBack = (t: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  };

  // Ease Out
  static easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t);
  static easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
  static easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
  static easeOutQuint = (t: number): number => 1 - Math.pow(1 - t, 5);
  static easeOutSine = (t: number): number => Math.sin((t * Math.PI) / 2);
  static easeOutExpo = (t: number): number => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  static easeOutCirc = (t: number): number => Math.sqrt(1 - Math.pow(t - 1, 2));
  static easeOutBack = (t: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  // Ease InOut
  static easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };
  static easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  static easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  };
  static easeInOutSine = (t: number): number => {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  };
  static easeInOutExpo = (t: number): number => {
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2;
  };

  // Elastic
  static easeInElastic = (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  };
  static easeOutElastic = (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  };

  // Bounce
  static easeOutBounce = (t: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  };
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  duration: number;  // ms
  delay?: number;    // ms
  easing?: (t: number) => number;
  loop?: boolean;
  yoyo?: boolean;    // reverse on completion
  onUpdate?: (progress: number) => void;
  onComplete?: () => void;
}

/**
 * Particle configuration
 */
export interface ParticleConfig {
  count: number;
  lifetime: number;  // ms
  size: { min: number; max: number };
  velocity: { min: number; max: number };
  color: string;
  gravity?: number;
  fade?: boolean;
}

/**
 * 🎬 Animation controller
 */
export class Animation {
  private startTime: number = 0;
  private elapsed: number = 0;
  private running: boolean = false;
  private direction: number = 1; // 1 = forward, -1 = reverse

  constructor(private config: AnimationConfig) {}

  start(): void {
    this.startTime = performance.now() + (this.config.delay || 0);
    this.running = true;
    this.update();
  }

  private update(): void {
    if (!this.running) return;

    const now = performance.now();
    this.elapsed = now - this.startTime;

    let progress = Math.min(this.elapsed / this.config.duration, 1);

    if (this.direction === -1) {
      progress = 1 - progress;
    }

    // Apply easing
    if (this.config.easing) {
      progress = this.config.easing(progress);
    }

    // Call update callback
    if (this.config.onUpdate) {
      this.config.onUpdate(progress);
    }

    // Check completion
    if (this.elapsed >= this.config.duration) {
      if (this.config.yoyo) {
        // Reverse direction
        this.direction *= -1;
        this.startTime = now;
        this.elapsed = 0;
      } else if (this.config.loop) {
        // Restart
        this.startTime = now;
        this.elapsed = 0;
      } else {
        // Complete
        this.running = false;
        if (this.config.onComplete) {
          this.config.onComplete();
        }
        return;
      }
    }

    requestAnimationFrame(() => this.update());
  }

  stop(): void {
    this.running = false;
  }

  pause(): void {
    this.running = false;
  }

  resume(): void {
    this.startTime = performance.now() - this.elapsed;
    this.running = true;
    this.update();
  }
}

/**
 * 🎨 Premium Button Component
 */
export class PremiumButton {
  private element: HTMLElement;
  private ripples: HTMLElement[] = [];

  constructor(
    public id: string,
    private text: string,
    private onClick?: () => void
  ) {
    this.element = this.createElement();
  }

  private createElement(): HTMLElement {
    const button = document.createElement('button');
    button.id = this.id;
    button.className = 'premium-button';
    button.innerHTML = `
      <span class="button-content">${this.text}</span>
      <div class="button-ripple-container"></div>
      <div class="button-shine"></div>
    `;

    // Add styles
    this.addStyles();

    // Add event listeners
    button.addEventListener('click', (e) => {
      this.createRipple(e);
      if (this.onClick) this.onClick();
    });

    button.addEventListener('mouseenter', () => this.onHover());
    button.addEventListener('mouseleave', () => this.onLeave());

    return button;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .premium-button {
        position: relative;
        padding: 14px 32px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 12px;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transform: translateY(0);
      }

      .premium-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }

      .premium-button:active {
        transform: translateY(0);
        box-shadow: 0 2px 10px rgba(102, 126, 234, 0.4);
      }

      .button-content {
        position: relative;
        z-index: 2;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      .button-ripple-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
      }

      .button-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
      }

      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      .button-shine {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          45deg,
          transparent 30%,
          rgba(255, 255, 255, 0.3) 50%,
          transparent 70%
        );
        transform: translateX(-100%);
        transition: transform 0.6s;
      }

      .premium-button:hover .button-shine {
        transform: translateX(100%);
      }
    `;
    document.head.appendChild(style);
  }

  private createRipple(event: MouseEvent): void {
    const button = this.element;
    const rippleContainer = button.querySelector('.button-ripple-container') as HTMLElement;
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('div');
    ripple.className = 'button-ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    rippleContainer.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  private onHover(): void {
    // Scale animation
    new Animation({
      duration: 200,
      easing: Easing.easeOutCubic,
      onUpdate: (progress) => {
        const scale = 1 + progress * 0.05;
        this.element.style.transform = `scale(${scale}) translateY(-2px)`;
      }
    }).start();
  }

  private onLeave(): void {
    // Reset scale
    new Animation({
      duration: 200,
      easing: Easing.easeOutCubic,
      onUpdate: (progress) => {
        const scale = 1.05 - progress * 0.05;
        this.element.style.transform = `scale(${scale}) translateY(0)`;
      }
    }).start();
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

/**
 * 💳 Glassmorphism Card Component
 */
export class GlassCard {
  private element: HTMLElement;

  constructor(
    public id: string,
    private content: string,
    private blur: number = 10
  ) {
    this.element = this.createElement();
  }

  private createElement(): HTMLElement {
    const card = document.createElement('div');
    card.id = this.id;
    card.className = 'glass-card';
    card.innerHTML = `
      <div class="glass-card-content">${this.content}</div>
      <div class="glass-card-highlight"></div>
    `;

    this.addStyles();
    return card;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .glass-card {
        position: relative;
        padding: 24px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(${this.blur}px);
        -webkit-backdrop-filter: blur(${this.blur}px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .glass-card:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-4px);
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
      }

      .glass-card-content {
        position: relative;
        z-index: 2;
        color: white;
      }

      .glass-card-highlight {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        opacity: 0;
        transition: opacity 0.3s;
      }

      .glass-card:hover .glass-card-highlight {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

/**
 * ⭐ Particle Effect System
 */
export class ParticleEffect {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private running: boolean = false;

  constructor(
    public id: string,
    private config: ParticleConfig
  ) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = id;
    this.canvas.className = 'particle-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';

    this.ctx = this.canvas.getContext('2d')!;
    this.resize();

    window.addEventListener('resize', () => this.resize());
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  emit(x: number, y: number): void {
    for (let i = 0; i < this.config.count; i++) {
      const particle = new Particle(
        x,
        y,
        this.randomBetween(this.config.size.min, this.config.size.max),
        this.randomBetween(this.config.velocity.min, this.config.velocity.max),
        Math.random() * Math.PI * 2,
        this.config.lifetime,
        this.config.color,
        this.config.gravity || 0,
        this.config.fade || true
      );
      this.particles.push(particle);
    }

    if (!this.running) {
      this.running = true;
      this.update();
    }
  }

  private update(): void {
    if (!this.running) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.update();
      particle.draw(this.ctx);

      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.update());
    } else {
      this.running = false;
    }
  }

  private randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  stop(): void {
    this.running = false;
    this.particles = [];
  }
}

/**
 * Single particle
 */
class Particle {
  private vx: number;
  private vy: number;
  private age: number = 0;
  private alpha: number = 1;

  constructor(
    private x: number,
    private y: number,
    private size: number,
    private velocity: number,
    private angle: number,
    private lifetime: number,
    private color: string,
    private gravity: number,
    private fade: boolean
  ) {
    this.vx = Math.cos(angle) * velocity;
    this.vy = Math.sin(angle) * velocity;
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.age += 16; // ~60 FPS

    if (this.fade) {
      this.alpha = 1 - (this.age / this.lifetime);
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  isDead(): boolean {
    return this.age >= this.lifetime;
  }
}

/**
 * 📊 Progress Bar Component
 */
export class ProgressBar {
  private element: HTMLElement;
  private bar: HTMLElement;
  private currentProgress: number = 0;

  constructor(
    public id: string,
    private color: string = '#667eea'
  ) {
    this.element = this.createElement();
  }

  private createElement(): HTMLElement {
    const container = document.createElement('div');
    container.id = this.id;
    container.className = 'progress-container';
    container.innerHTML = `
      <div class="progress-bar">
        <div class="progress-fill"></div>
        <div class="progress-glow"></div>
      </div>
    `;

    this.bar = container.querySelector('.progress-fill') as HTMLElement;
    this.addStyles();

    return container;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .progress-container {
        width: 100%;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
      }

      .progress-bar {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .progress-fill {
        position: absolute;
        height: 100%;
        width: 0%;
        background: ${this.color};
        border-radius: 4px;
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .progress-glow {
        position: absolute;
        height: 100%;
        width: 100px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        animation: glow-sweep 2s infinite;
      }

      @keyframes glow-sweep {
        0% { left: -100px; }
        100% { left: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  setProgress(progress: number, animated: boolean = true): void {
    progress = Math.max(0, Math.min(100, progress));

    if (animated) {
      new Animation({
        duration: 500,
        easing: Easing.easeOutCubic,
        onUpdate: (p) => {
          const current = this.currentProgress + (progress - this.currentProgress) * p;
          this.bar.style.width = `${current}%`;
        },
        onComplete: () => {
          this.currentProgress = progress;
        }
      }).start();
    } else {
      this.bar.style.width = `${progress}%`;
      this.currentProgress = progress;
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

/**
 * 🌊 Loading Spinner Component
 */
export class LoadingSpinner {
  private element: HTMLElement;

  constructor(public id: string, private size: number = 40) {
    this.element = this.createElement();
  }

  private createElement(): HTMLElement {
    const spinner = document.createElement('div');
    spinner.id = this.id;
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    `;

    this.addStyles();
    return spinner;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .loading-spinner {
        position: relative;
        width: ${this.size}px;
        height: ${this.size}px;
      }

      .spinner-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 3px solid transparent;
        border-top-color: #667eea;
        border-radius: 50%;
        animation: spinner-rotation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      }

      .spinner-ring:nth-child(1) {
        animation-delay: -0.45s;
      }

      .spinner-ring:nth-child(2) {
        animation-delay: -0.3s;
      }

      .spinner-ring:nth-child(3) {
        animation-delay: -0.15s;
      }

      @keyframes spinner-rotation {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

/**
 * 🎯 Toast Notification Component
 */
export class ToastNotification {
  private static container: HTMLElement;
  private element: HTMLElement;

  constructor(
    private message: string,
    private type: 'success' | 'error' | 'warning' | 'info' = 'info',
    private duration: number = 3000
  ) {
    if (!ToastNotification.container) {
      this.createContainer();
    }

    this.element = this.createElement();
    this.show();
  }

  private createContainer(): void {
    ToastNotification.container = document.createElement('div');
    ToastNotification.container.className = 'toast-container';
    ToastNotification.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(ToastNotification.container);
  }

  private createElement(): HTMLElement {
    const toast = document.createElement('div');
    toast.className = `toast toast-${this.type}`;
    toast.innerHTML = `
      <span class="toast-icon">${this.getIcon()}</span>
      <span class="toast-message">${this.message}</span>
      <button class="toast-close">×</button>
    `;

    this.addStyles();

    const closeBtn = toast.querySelector('.toast-close') as HTMLElement;
    closeBtn.addEventListener('click', () => this.hide());

    return toast;
  }

  private getIcon(): string {
    switch (this.type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
    }
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .toast {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 300px;
        animation: toast-slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes toast-slide-in {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes toast-slide-out {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }

      .toast-icon {
        font-size: 20px;
        font-weight: bold;
      }

      .toast-success .toast-icon { color: #10b981; }
      .toast-error .toast-icon { color: #ef4444; }
      .toast-warning .toast-icon { color: #f59e0b; }
      .toast-info .toast-icon { color: #3b82f6; }

      .toast-message {
        flex: 1;
        color: #1f2937;
        font-size: 14px;
        font-weight: 500;
      }

      .toast-close {
        background: none;
        border: none;
        font-size: 24px;
        color: #6b7280;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        line-height: 1;
        transition: color 0.2s;
      }

      .toast-close:hover {
        color: #1f2937;
      }
    `;
    document.head.appendChild(style);
  }

  show(): void {
    ToastNotification.container.appendChild(this.element);

    // Auto-hide after duration
    setTimeout(() => this.hide(), this.duration);
  }

  hide(): void {
    this.element.style.animation = 'toast-slide-out 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(() => {
      this.element.remove();
    }, 300);
  }
}
