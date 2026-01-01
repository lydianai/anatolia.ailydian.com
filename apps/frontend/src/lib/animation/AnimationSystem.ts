/**
 * ANADOLU REALM - Advanced Character Animation System
 * PS5-Quality animation blending with Turkish cultural animations
 */

import * as THREE from 'three';

export enum AnimationType {
  // Movement
  IDLE = 'idle',
  WALK = 'walk',
  RUN = 'run',
  SPRINT = 'sprint',
  JUMP = 'jump',
  LAND = 'land',
  CROUCH = 'crouch',
  ROLL = 'roll',

  // Combat
  COMBAT_IDLE = 'combat_idle',
  ATTACK_1 = 'attack_1',
  ATTACK_2 = 'attack_2',
  ATTACK_3 = 'attack_3',
  HEAVY_ATTACK = 'heavy_attack',
  BLOCK = 'block',
  DODGE = 'dodge',
  HIT_REACT = 'hit_react',
  DEATH_1 = 'death_1',
  DEATH_2 = 'death_2',

  // Ranged
  DRAW_BOW = 'draw_bow',
  AIM_BOW = 'aim_bow',
  SHOOT_BOW = 'shoot_bow',

  // Magic
  CAST_SPELL = 'cast_spell',
  CHANNEL = 'channel',

  // Social
  WAVE = 'wave',
  CLAP = 'clap',
  SIT = 'sit',
  DANCE = 'dance',

  // Turkish Cultural Animations
  TURKISH_COFFEE_DRINK = 'turkish_coffee_drink',
  PRAY = 'pray',
  HALAY = 'halay',
  ZEYBEK = 'zeybek',
  TEA_SERVE = 'tea_serve',
  SIMIT_EAT = 'simit_eat',
  HOOKAH_SMOKE = 'hookah_smoke',
  CARPET_WEAVING = 'carpet_weaving',
  GREET_TURKISH = 'greet_turkish',
  FOLK_DANCE = 'folk_dance'
}

export interface AnimationClipData {
  name: AnimationType;
  duration: number;
  loop: boolean;
  blendIn: number;
  blendOut: number;
  priority: number;
  interruptible: boolean;
  rootMotion: boolean;
  speed: number;
  tags?: string[];
}

export interface BlendTreeNode {
  animation: AnimationType;
  weight: number;
  speed: number;
}

export class AnimationSystem {
  private mixer: THREE.AnimationMixer;
  private actions: Map<AnimationType, THREE.AnimationAction> = new Map();
  private clips: Map<AnimationType, AnimationClipData> = new Map();
  private currentAction: THREE.AnimationAction | null = null;
  private blendTrees: Map<string, BlendTreeNode[]> = new Map();
  private model: THREE.Object3D;

  // Animation database with Turkish cultural animations
  private readonly ANIMATION_DATABASE: Record<AnimationType, Partial<AnimationClipData>> = {
    // Movement
    [AnimationType.IDLE]: {
      duration: 2,
      loop: true,
      blendIn: 0.2,
      blendOut: 0.2,
      priority: 1,
      interruptible: true,
      speed: 1.0
    },
    [AnimationType.WALK]: {
      duration: 1,
      loop: true,
      blendIn: 0.2,
      blendOut: 0.2,
      priority: 2,
      interruptible: true,
      rootMotion: true,
      speed: 1.0
    },
    [AnimationType.RUN]: {
      duration: 0.8,
      loop: true,
      blendIn: 0.15,
      blendOut: 0.15,
      priority: 3,
      interruptible: true,
      rootMotion: true,
      speed: 1.0
    },
    [AnimationType.SPRINT]: {
      duration: 0.6,
      loop: true,
      blendIn: 0.1,
      blendOut: 0.1,
      priority: 4,
      interruptible: true,
      rootMotion: true,
      speed: 1.5
    },
    [AnimationType.JUMP]: {
      duration: 1,
      loop: false,
      blendIn: 0.1,
      blendOut: 0.1,
      priority: 5,
      interruptible: false,
      speed: 1.2
    },
    [AnimationType.LAND]: {
      duration: 0.3,
      loop: false,
      blendIn: 0.05,
      blendOut: 0.1,
      priority: 5,
      interruptible: false,
      speed: 1.0
    },

    // Combat
    [AnimationType.COMBAT_IDLE]: {
      duration: 2,
      loop: true,
      blendIn: 0.2,
      blendOut: 0.2,
      priority: 2,
      interruptible: true,
      speed: 1.0
    },
    [AnimationType.ATTACK_1]: {
      duration: 0.5,
      loop: false,
      blendIn: 0.05,
      blendOut: 0.1,
      priority: 6,
      interruptible: true,
      speed: 1.2,
      tags: ['combo']
    },
    [AnimationType.ATTACK_2]: {
      duration: 0.6,
      loop: false,
      blendIn: 0.05,
      blendOut: 0.1,
      priority: 6,
      interruptible: true,
      speed: 1.3,
      tags: ['combo']
    },
    [AnimationType.ATTACK_3]: {
      duration: 0.8,
      loop: false,
      blendIn: 0.05,
      blendOut: 0.15,
      priority: 7,
      interruptible: false,
      speed: 1.5,
      tags: ['combo', 'finisher']
    },
    [AnimationType.HEAVY_ATTACK]: {
      duration: 1.2,
      loop: false,
      blendIn: 0.1,
      blendOut: 0.2,
      priority: 7,
      interruptible: false,
      speed: 1.0
    },
    [AnimationType.BLOCK]: {
      duration: 1,
      loop: true,
      blendIn: 0.1,
      blendOut: 0.1,
      priority: 5,
      interruptible: true,
      speed: 1.0
    },
    [AnimationType.DODGE]: {
      duration: 0.6,
      loop: false,
      blendIn: 0.05,
      blendOut: 0.1,
      priority: 8,
      interruptible: false,
      speed: 1.5
    },
    [AnimationType.HIT_REACT]: {
      duration: 0.4,
      loop: false,
      blendIn: 0.05,
      blendOut: 0.1,
      priority: 9,
      interruptible: false,
      speed: 1.0
    },
    [AnimationType.DEATH_1]: {
      duration: 2,
      loop: false,
      blendIn: 0.1,
      blendOut: 0,
      priority: 10,
      interruptible: false,
      speed: 1.0
    },

    // Ranged
    [AnimationType.DRAW_BOW]: {
      duration: 0.5,
      loop: false,
      blendIn: 0.1,
      blendOut: 0,
      priority: 6,
      interruptible: true,
      speed: 1.0
    },
    [AnimationType.AIM_BOW]: {
      duration: 1,
      loop: true,
      blendIn: 0.1,
      blendOut: 0.1,
      priority: 5,
      interruptible: true,
      speed: 1.0
    },
    [AnimationType.SHOOT_BOW]: {
      duration: 0.4,
      loop: false,
      blendIn: 0.05,
      blendOut: 0.1,
      priority: 6,
      interruptible: false,
      speed: 1.3
    },

    // Magic
    [AnimationType.CAST_SPELL]: {
      duration: 1.5,
      loop: false,
      blendIn: 0.2,
      blendOut: 0.2,
      priority: 6,
      interruptible: true,
      speed: 1.0
    },

    // Social
    [AnimationType.WAVE]: {
      duration: 1.5,
      loop: false,
      blendIn: 0.2,
      blendOut: 0.2,
      priority: 3,
      interruptible: true,
      speed: 1.0
    },
    [AnimationType.SIT]: {
      duration: 1,
      loop: true,
      blendIn: 0.5,
      blendOut: 0.5,
      priority: 2,
      interruptible: true,
      speed: 1.0
    },
    [AnimationType.DANCE]: {
      duration: 4,
      loop: true,
      blendIn: 0.3,
      blendOut: 0.3,
      priority: 2,
      interruptible: true,
      speed: 1.0
    },

    // Turkish Cultural
    [AnimationType.TURKISH_COFFEE_DRINK]: {
      duration: 3,
      loop: false,
      blendIn: 0.3,
      blendOut: 0.3,
      priority: 3,
      interruptible: true,
      speed: 1.0,
      tags: ['turkish', 'cultural']
    },
    [AnimationType.PRAY]: {
      duration: 10,
      loop: true,
      blendIn: 0.5,
      blendOut: 0.5,
      priority: 4,
      interruptible: true,
      speed: 1.0,
      tags: ['turkish', 'cultural', 'spiritual']
    },
    [AnimationType.HALAY]: {
      duration: 5,
      loop: true,
      blendIn: 0.4,
      blendOut: 0.4,
      priority: 2,
      interruptible: true,
      rootMotion: true,
      speed: 1.2,
      tags: ['turkish', 'dance', 'cultural']
    },
    [AnimationType.ZEYBEK]: {
      duration: 6,
      loop: true,
      blendIn: 0.5,
      blendOut: 0.5,
      priority: 2,
      interruptible: true,
      speed: 0.8,
      tags: ['turkish', 'dance', 'cultural', 'warrior']
    },
    [AnimationType.TEA_SERVE]: {
      duration: 2.5,
      loop: false,
      blendIn: 0.3,
      blendOut: 0.3,
      priority: 3,
      interruptible: true,
      speed: 1.0,
      tags: ['turkish', 'cultural', 'social']
    },
    [AnimationType.SIMIT_EAT]: {
      duration: 4,
      loop: false,
      blendIn: 0.3,
      blendOut: 0.3,
      priority: 2,
      interruptible: true,
      speed: 1.0,
      tags: ['turkish', 'cultural', 'eating']
    },
    [AnimationType.HOOKAH_SMOKE]: {
      duration: 8,
      loop: true,
      blendIn: 0.5,
      blendOut: 0.5,
      priority: 2,
      interruptible: true,
      speed: 0.7,
      tags: ['turkish', 'cultural', 'social']
    },
    [AnimationType.CARPET_WEAVING]: {
      duration: 10,
      loop: true,
      blendIn: 0.5,
      blendOut: 0.5,
      priority: 2,
      interruptible: true,
      speed: 1.0,
      tags: ['turkish', 'cultural', 'craft']
    },
    [AnimationType.GREET_TURKISH]: {
      duration: 2,
      loop: false,
      blendIn: 0.2,
      blendOut: 0.2,
      priority: 3,
      interruptible: true,
      speed: 1.0,
      tags: ['turkish', 'cultural', 'social']
    },
    [AnimationType.FOLK_DANCE]: {
      duration: 8,
      loop: true,
      blendIn: 0.4,
      blendOut: 0.4,
      priority: 2,
      interruptible: true,
      rootMotion: true,
      speed: 1.1,
      tags: ['turkish', 'dance', 'cultural']
    }
  };

  constructor(model: THREE.Object3D) {
    this.model = model;
    this.mixer = new THREE.AnimationMixer(model);

    // Load animation clips from database
    Object.entries(this.ANIMATION_DATABASE).forEach(([type, data]) => {
      const clipData: AnimationClipData = {
        name: type as AnimationType,
        duration: 1,
        loop: false,
        blendIn: 0.2,
        blendOut: 0.2,
        priority: 1,
        interruptible: true,
        rootMotion: false,
        speed: 1.0,
        ...data
      };
      this.clips.set(type as AnimationType, clipData);
    });

    // Setup blend trees
    this.setupBlendTrees();
  }

  // Setup blend trees for smooth transitions
  private setupBlendTrees(): void {
    // Locomotion blend tree (idle → walk → run → sprint)
    this.blendTrees.set('locomotion', [
      { animation: AnimationType.IDLE, weight: 1.0, speed: 1.0 },
      { animation: AnimationType.WALK, weight: 0, speed: 1.0 },
      { animation: AnimationType.RUN, weight: 0, speed: 1.0 },
      { animation: AnimationType.SPRINT, weight: 0, speed: 1.0 }
    ]);

    // Combat combo blend tree
    this.blendTrees.set('combat_combo', [
      { animation: AnimationType.ATTACK_1, weight: 1.0, speed: 1.0 },
      { animation: AnimationType.ATTACK_2, weight: 0, speed: 1.0 },
      { animation: AnimationType.ATTACK_3, weight: 0, speed: 1.0 }
    ]);
  }

  // Create animation action from clip
  private createAction(type: AnimationType, clip: THREE.AnimationClip): THREE.AnimationAction {
    const action = this.mixer.clipAction(clip);
    const clipData = this.clips.get(type)!;

    action.loop = clipData.loop ? THREE.LoopRepeat : THREE.LoopOnce;
    action.clampWhenFinished = !clipData.loop;
    action.timeScale = clipData.speed;

    return action;
  }

  // Play animation
  public play(
    type: AnimationType,
    fadeTime?: number,
    weight: number = 1.0
  ): void {
    const clipData = this.clips.get(type);
    if (!clipData) {
      console.warn(`Animation not found: ${type}`);
      return;
    }

    // Check if can interrupt current animation
    if (this.currentAction && !this.canInterrupt()) {
      console.warn(`Cannot interrupt current animation`);
      return;
    }

    let action = this.actions.get(type);

    // Create action if doesn't exist
    if (!action) {
      // In real implementation, load from GLB/FBX files
      // For now, create placeholder clip
      const clip = this.createPlaceholderClip(type);
      action = this.createAction(type, clip);
      this.actions.set(type, action);
    }

    const blendTime = fadeTime ?? clipData.blendIn;

    // Fade out current action
    if (this.currentAction && this.currentAction !== action) {
      this.currentAction.fadeOut(blendTime);
    }

    // Fade in new action
    action.reset();
    action.setEffectiveWeight(weight);
    action.fadeIn(blendTime);
    action.play();

    this.currentAction = action;
  }

  // Stop animation
  public stop(type: AnimationType, fadeTime?: number): void {
    const action = this.actions.get(type);
    if (!action) return;

    const clipData = this.clips.get(type);
    const blendTime = fadeTime ?? clipData?.blendOut ?? 0.2;

    action.fadeOut(blendTime);
    if (this.currentAction === action) {
      this.currentAction = null;
    }
  }

  // Cross-fade between animations
  public crossFade(
    from: AnimationType,
    to: AnimationType,
    duration: number = 0.3
  ): void {
    const fromAction = this.actions.get(from);
    const toClipData = this.clips.get(to);

    if (!toClipData) return;

    // Create placeholder for demo
    let toAction = this.actions.get(to);
    if (!toAction) {
      const clip = this.createPlaceholderClip(to);
      toAction = this.createAction(to, clip);
      this.actions.set(to, toAction);
    }

    if (fromAction) {
      fromAction.fadeOut(duration);
    }

    toAction.reset();
    toAction.fadeIn(duration);
    toAction.play();

    this.currentAction = toAction;
  }

  // Update blend tree based on parameter (e.g., movement speed)
  public updateBlendTree(treeName: string, parameter: number): void {
    const tree = this.blendTrees.get(treeName);
    if (!tree) return;

    // Example: Locomotion blend based on speed (0-3)
    // 0 = idle, 1 = walk, 2 = run, 3 = sprint
    if (treeName === 'locomotion') {
      tree.forEach((node, index) => {
        if (parameter >= index && parameter < index + 1) {
          node.weight = 1 - (parameter - index);
        } else if (parameter >= index - 1 && parameter < index) {
          node.weight = parameter - (index - 1);
        } else {
          node.weight = 0;
        }

        const action = this.actions.get(node.animation);
        if (action) {
          action.setEffectiveWeight(node.weight);
          if (node.weight > 0 && !action.isRunning()) {
            action.play();
          } else if (node.weight === 0 && action.isRunning()) {
            action.stop();
          }
        }
      });
    }
  }

  // Check if current animation can be interrupted
  private canInterrupt(): boolean {
    if (!this.currentAction) return true;

    // Find clip data for current action
    for (const [type, action] of this.actions) {
      if (action === this.currentAction) {
        const clipData = this.clips.get(type);
        return clipData?.interruptible ?? true;
      }
    }

    return true;
  }

  // Update animation mixer
  public update(deltaTime: number): void {
    this.mixer.update(deltaTime);
  }

  // Create placeholder animation clip (for development)
  private createPlaceholderClip(type: AnimationType): THREE.AnimationClip {
    const clipData = this.clips.get(type)!;

    // Create simple keyframe track
    const times = [0, clipData.duration];
    const values = [0, 0, 0, 0, 0, 0];

    const track = new THREE.VectorKeyframeTrack(
      '.position',
      times,
      values
    );

    return new THREE.AnimationClip(type, clipData.duration, [track]);
  }

  // Get current animation
  public getCurrentAnimation(): AnimationType | null {
    if (!this.currentAction) return null;

    for (const [type, action] of this.actions) {
      if (action === this.currentAction) {
        return type;
      }
    }

    return null;
  }

  // Get all Turkish cultural animations
  public getTurkishAnimations(): AnimationType[] {
    return Array.from(this.clips.entries())
      .filter(([_, data]) => data.tags?.includes('turkish'))
      .map(([type, _]) => type);
  }

  // Dispose
  public dispose(): void {
    this.mixer.stopAllAction();
    this.actions.clear();
    this.clips.clear();
  }
}
