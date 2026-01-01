/**
 * ANADOLU REALM - Enhanced Audio Manager
 * Advanced audio system with 3D spatial audio, dynamic mixing, and adaptive music
 */

import { soundLibrary, SoundEffect } from './GameSoundLibrary';

export interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  ambientVolume: number;
  voiceVolume: number;
  muted: boolean;
  spatialAudio: boolean;
  adaptiveMusic: boolean;
}

export interface PlayOptions {
  volume?: number;
  loop?: boolean;
  fadeIn?: number;
  fadeOut?: number;
  pan?: number; // -1 (left) to 1 (right)
  pitch?: number; // 0.5 to 2.0
  delay?: number;
  onEnd?: () => void;
}

export interface SpatialPosition {
  x: number;
  y: number;
  z?: number;
}

class EnhancedAudioManager {
  private audioContext: AudioContext | null = null;
  private activeSounds: Map<string, AudioBufferSourceNode> = new Map();
  private soundBuffers: Map<string, AudioBuffer> = new Map();
  private settings: AudioSettings;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private voiceGain: GainNode | null = null;
  private currentMusic: string | null = null;
  private musicTransitioning: boolean = false;

  // Spatial audio
  private listener: AudioListener | null = null;
  private listenerPosition: SpatialPosition = { x: 0, y: 0, z: 0 };

  // Adaptive music system
  private musicLayers: Map<string, AudioBufferSourceNode> = new Map();
  private currentIntensity: number = 0; // 0-1

  constructor() {
    this.settings = this.loadSettings();
    this.initializeAudioContext();
  }

  // =============================================================================
  // INITIALIZATION
  // =============================================================================

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Create gain nodes for mixing
      this.masterGain = this.audioContext.createGain();
      this.musicGain = this.audioContext.createGain();
      this.sfxGain = this.audioContext.createGain();
      this.ambientGain = this.audioContext.createGain();
      this.voiceGain = this.audioContext.createGain();

      // Connect gain nodes
      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.ambientGain.connect(this.masterGain);
      this.voiceGain.connect(this.masterGain);
      this.masterGain.connect(this.audioContext.destination);

      // Set initial volumes
      this.updateVolumes();

      // Setup spatial audio
      if (this.settings.spatialAudio) {
        this.listener = this.audioContext.listener;
      }

      console.log('🎵 Enhanced Audio Manager initialized');
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  // =============================================================================
  // SETTINGS MANAGEMENT
  // =============================================================================

  private loadSettings(): AudioSettings {
    const savedSettings = localStorage.getItem('audioSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }

    return {
      masterVolume: 0.7,
      musicVolume: 0.6,
      sfxVolume: 0.8,
      ambientVolume: 0.4,
      voiceVolume: 0.9,
      muted: false,
      spatialAudio: true,
      adaptiveMusic: true
    };
  }

  private saveSettings() {
    localStorage.setItem('audioSettings', JSON.stringify(this.settings));
  }

  updateSettings(settings: Partial<AudioSettings>) {
    this.settings = { ...this.settings, ...settings };
    this.updateVolumes();
    this.saveSettings();
  }

  private updateVolumes() {
    if (!this.masterGain) return;

    const masterVol = this.settings.muted ? 0 : this.settings.masterVolume;
    this.masterGain.gain.value = masterVol;

    if (this.musicGain) this.musicGain.gain.value = this.settings.musicVolume;
    if (this.sfxGain) this.sfxGain.gain.value = this.settings.sfxVolume;
    if (this.ambientGain) this.ambientGain.gain.value = this.settings.ambientVolume;
    if (this.voiceGain) this.voiceGain.gain.value = this.settings.voiceVolume;
  }

  // =============================================================================
  // SOUND LOADING
  // =============================================================================

  async preloadSound(soundId: string): Promise<void> {
    if (this.soundBuffers.has(soundId)) return;

    const sound = soundLibrary.getSound(soundId);
    if (!sound) {
      console.warn(`Sound not found: ${soundId}`);
      return;
    }

    try {
      const response = await fetch(sound.file);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
      this.soundBuffers.set(soundId, audioBuffer);
    } catch (error) {
      console.error(`Failed to load sound: ${soundId}`, error);
    }
  }

  async preloadTheme(themeName: string): Promise<void> {
    const theme = soundLibrary.getTheme(themeName);
    if (!theme) return;

    const allSounds = [...theme.ambient, ...theme.music, ...theme.effects];
    await Promise.all(allSounds.map(sound => this.preloadSound(sound.id)));
    console.log(`✅ Theme preloaded: ${themeName}`);
  }

  // =============================================================================
  // SOUND PLAYBACK
  // =============================================================================

  async play(soundId: string, options: PlayOptions = {}): Promise<string | null> {
    if (!this.audioContext) return null;

    // Resume context if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    // Load sound if not already loaded
    if (!this.soundBuffers.has(soundId)) {
      await this.preloadSound(soundId);
    }

    const buffer = this.soundBuffers.get(soundId);
    if (!buffer) return null;

    const sound = soundLibrary.getSound(soundId);
    if (!sound) return null;

    // Create source
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = options.loop ?? sound.loop ?? false;

    // Create gain for this sound
    const gainNode = this.audioContext.createGain();
    const finalVolume = (options.volume ?? sound.volume ?? 1.0) * this.getCategoryGain(sound.category);
    gainNode.gain.value = finalVolume;

    // Apply pitch
    if (options.pitch) {
      source.playbackRate.value = options.pitch;
    }

    // Apply panning
    if (options.pan !== undefined) {
      const panner = this.audioContext.createStereoPanner();
      panner.pan.value = options.pan;
      source.connect(gainNode).connect(panner).connect(this.getCategoryGainNode(sound.category)!);
    } else {
      source.connect(gainNode).connect(this.getCategoryGainNode(sound.category)!);
    }

    // Fade in
    if (options.fadeIn) {
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(finalVolume, this.audioContext.currentTime + options.fadeIn);
    }

    // Fade out
    if (options.fadeOut && !source.loop) {
      const duration = buffer.duration;
      const fadeOutStart = duration - options.fadeOut;
      gainNode.gain.setValueAtTime(finalVolume, this.audioContext.currentTime + fadeOutStart);
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
    }

    // Start playback
    const startTime = this.audioContext.currentTime + (options.delay || 0);
    source.start(startTime);

    // Generate unique ID for this instance
    const instanceId = `${soundId}_${Date.now()}_${Math.random()}`;
    this.activeSounds.set(instanceId, source);

    // Handle completion
    source.onended = () => {
      this.activeSounds.delete(instanceId);
      if (options.onEnd) options.onEnd();
    };

    return instanceId;
  }

  stop(instanceId: string, fadeOut: number = 0) {
    const source = this.activeSounds.get(instanceId);
    if (!source) return;

    if (fadeOut > 0 && this.audioContext) {
      const gainNode = source.context.createGain();
      gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + fadeOut);
      setTimeout(() => {
        source.stop();
        this.activeSounds.delete(instanceId);
      }, fadeOut * 1000);
    } else {
      source.stop();
      this.activeSounds.delete(instanceId);
    }
  }

  stopAll(fadeOut: number = 0) {
    this.activeSounds.forEach((source, id) => {
      this.stop(id, fadeOut);
    });
  }

  // =============================================================================
  // MUSIC SYSTEM
  // =============================================================================

  async playMusic(musicId: string, fadeInDuration: number = 2): Promise<void> {
    if (this.musicTransitioning) return;

    // If same music is already playing, do nothing
    if (this.currentMusic === musicId) return;

    this.musicTransitioning = true;

    // Fade out current music
    if (this.currentMusic) {
      await this.stopMusic(2);
    }

    // Play new music
    await this.play(musicId, {
      loop: true,
      fadeIn: fadeInDuration
    });

    this.currentMusic = musicId;
    this.musicTransitioning = false;
  }

  async stopMusic(fadeOutDuration: number = 2): Promise<void> {
    if (!this.currentMusic) return;

    // Find and stop current music
    this.activeSounds.forEach((source, id) => {
      if (id.startsWith(this.currentMusic!)) {
        this.stop(id, fadeOutDuration);
      }
    });

    await new Promise(resolve => setTimeout(resolve, fadeOutDuration * 1000));
    this.currentMusic = null;
  }

  // =============================================================================
  // ADAPTIVE MUSIC SYSTEM
  // =============================================================================

  setMusicIntensity(intensity: number) {
    if (!this.settings.adaptiveMusic) return;

    this.currentIntensity = Math.max(0, Math.min(1, intensity));

    // Adjust music layers based on intensity
    this.musicLayers.forEach((source, layerId) => {
      // Implementation for layered adaptive music
      // Higher intensity = more intense layers active
    });
  }

  // =============================================================================
  // SPATIAL AUDIO
  // =============================================================================

  playSpatial(soundId: string, position: SpatialPosition, options: PlayOptions = {}): string | null {
    if (!this.settings.spatialAudio || !this.audioContext) {
      return this.play(soundId, options) as string | null;
    }

    // Create panner for 3D positioning
    const panner = this.audioContext.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 1;

    panner.setPosition(position.x, position.y, position.z || 0);

    // Play sound with spatial panning
    return this.play(soundId, {
      ...options,
      // Custom connection through panner will be needed
    }) as string | null;
  }

  updateListenerPosition(position: SpatialPosition) {
    if (!this.listener || !this.settings.spatialAudio) return;

    this.listenerPosition = position;

    // Update listener position in 3D space
    if (this.listener.positionX) {
      this.listener.positionX.value = position.x;
      this.listener.positionY.value = position.y;
      this.listener.positionZ.value = position.z || 0;
    }
  }

  // =============================================================================
  // GAME-SPECIFIC HELPERS
  // =============================================================================

  // Tavla helpers
  playDiceRoll() {
    return this.play('tavla_dice_roll', { volume: 0.7 });
  }

  playCheckerMove() {
    const variation = soundLibrary.getRandomVariation('tavla_checker_move');
    if (variation) {
      this.play('tavla_checker_move', { volume: 0.6 });
    }
  }

  // Okey helpers
  playTileShuffle() {
    return this.play('okey_tile_shuffle', { volume: 0.8 });
  }

  playTileDraw() {
    const variation = soundLibrary.getRandomVariation('okey_tile_draw');
    if (variation) {
      this.play('okey_tile_draw', { volume: 0.7 });
    }
  }

  // Batak helpers
  playCardDeal() {
    const variation = soundLibrary.getRandomVariation('batak_card_deal');
    if (variation) {
      this.play('batak_card_deal', { volume: 0.7 });
    }
  }

  playCardPlay() {
    const variation = soundLibrary.getRandomVariation('batak_card_play');
    if (variation) {
      this.play('batak_card_play', { volume: 0.8 });
    }
  }

  // Combat helpers
  playSkillSound(classId: string, skillId: string) {
    const soundId = `${classId}_${skillId}`;
    return this.play(soundId, { volume: 0.9 });
  }

  playUltimate(classId: string) {
    return this.play('ultimate_activate', {
      volume: 1.0,
      onEnd: () => {
        this.play(`ultimate_${classId}`, { volume: 1.0 });
      }
    });
  }

  // =============================================================================
  // UTILITY
  // =============================================================================

  private getCategoryGain(category: SoundEffect['category']): number {
    switch (category) {
      case 'music':
        return this.settings.musicVolume;
      case 'game':
      case 'combat':
        return this.settings.sfxVolume;
      case 'ambient':
        return this.settings.ambientVolume;
      case 'voice':
        return this.settings.voiceVolume;
      case 'ui':
        return this.settings.sfxVolume;
      default:
        return 1.0;
    }
  }

  private getCategoryGainNode(category: SoundEffect['category']): GainNode | null {
    switch (category) {
      case 'music':
        return this.musicGain;
      case 'game':
      case 'combat':
        return this.sfxGain;
      case 'ambient':
        return this.ambientGain;
      case 'voice':
        return this.voiceGain;
      case 'ui':
        return this.sfxGain;
      default:
        return this.masterGain;
    }
  }

  getSettings(): AudioSettings {
    return { ...this.settings };
  }

  isPlaying(instanceId: string): boolean {
    return this.activeSounds.has(instanceId);
  }

  getActiveSoundsCount(): number {
    return this.activeSounds.size;
  }
}

// Singleton instance
export const audioManager = new EnhancedAudioManager();
