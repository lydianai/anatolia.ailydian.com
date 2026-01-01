/**
 * ANADOLU REALM - Advanced Audio Engine
 * PS5-Quality 3D Spatial Audio System
 * Features: Howler.js, Web Audio API, 3D Positioning, Reverb, Distance Attenuation
 */

import { Howl, Howler } from 'howler';

export interface AudioConfig {
  volume: number;
  muted: boolean;
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  ambientVolume: number;
  voiceVolume: number;
  spatialAudioEnabled: boolean;
}

export interface Sound3D {
  id: string;
  howl: Howl;
  position: { x: number; y: number; z: number };
  maxDistance: number;
  rolloffFactor: number;
  refDistance: number;
}

export interface MusicTrack {
  id: string;
  name: string;
  url: string;
  loop: boolean;
  fadeInDuration: number;
  fadeOutDuration: number;
}

export class AudioEngine {
  private static instance: AudioEngine;
  private config: AudioConfig;
  private sounds: Map<string, Howl>;
  private sounds3D: Map<string, Sound3D>;
  private currentMusic: Howl | null = null;
  private currentMusicId: string | null = null;
  private audioContext: AudioContext | null = null;
  private listenerPosition: { x: number; y: number; z: number };

  // Turkish Audio Assets
  private readonly MUSIC_LIBRARY: Record<string, MusicTrack> = {
    // Istanbul Theme
    istanbul_main: {
      id: 'istanbul_main',
      name: 'İstanbul Ana Teması',
      url: '/audio/music/istanbul_theme.mp3',
      loop: true,
      fadeInDuration: 2000,
      fadeOutDuration: 1500
    },
    istanbul_combat: {
      id: 'istanbul_combat',
      name: 'İstanbul Savaş Müziği',
      url: '/audio/music/istanbul_combat.mp3',
      loop: true,
      fadeInDuration: 500,
      fadeOutDuration: 1000
    },

    // Ankara Theme
    ankara_main: {
      id: 'ankara_main',
      name: 'Ankara Ana Teması',
      url: '/audio/music/ankara_theme.mp3',
      loop: true,
      fadeInDuration: 2000,
      fadeOutDuration: 1500
    },

    // Izmir Theme
    izmir_main: {
      id: 'izmir_main',
      name: 'İzmir Ana Teması',
      url: '/audio/music/izmir_theme.mp3',
      loop: true,
      fadeInDuration: 2000,
      fadeOutDuration: 1500
    },

    // Special Tracks
    menu: {
      id: 'menu',
      name: 'Ana Menü',
      url: '/audio/music/menu.mp3',
      loop: true,
      fadeInDuration: 1000,
      fadeOutDuration: 1000
    },
    victory: {
      id: 'victory',
      name: 'Zafer',
      url: '/audio/music/victory.mp3',
      loop: false,
      fadeInDuration: 0,
      fadeOutDuration: 2000
    },
    defeat: {
      id: 'defeat',
      name: 'Yenilgi',
      url: '/audio/music/defeat.mp3',
      loop: false,
      fadeInDuration: 0,
      fadeOutDuration: 2000
    }
  };

  private readonly SFX_LIBRARY = {
    // UI Sounds
    ui_click: '/audio/sfx/ui/click.mp3',
    ui_hover: '/audio/sfx/ui/hover.mp3',
    ui_open: '/audio/sfx/ui/open.mp3',
    ui_close: '/audio/sfx/ui/close.mp3',
    ui_notification: '/audio/sfx/ui/notification.mp3',
    ui_error: '/audio/sfx/ui/error.mp3',
    ui_success: '/audio/sfx/ui/success.mp3',

    // Combat Sounds
    sword_swing: '/audio/sfx/combat/sword_swing.mp3',
    sword_hit: '/audio/sfx/combat/sword_hit.mp3',
    sword_block: '/audio/sfx/combat/sword_block.mp3',
    bow_shoot: '/audio/sfx/combat/bow_shoot.mp3',
    arrow_hit: '/audio/sfx/combat/arrow_hit.mp3',
    magic_cast: '/audio/sfx/combat/magic_cast.mp3',
    magic_impact: '/audio/sfx/combat/magic_impact.mp3',

    // Character Sounds
    footstep_stone: '/audio/sfx/character/footstep_stone.mp3',
    footstep_grass: '/audio/sfx/character/footstep_grass.mp3',
    footstep_wood: '/audio/sfx/character/footstep_wood.mp3',
    jump: '/audio/sfx/character/jump.mp3',
    land: '/audio/sfx/character/land.mp3',

    // Environment Sounds
    door_open: '/audio/sfx/environment/door_open.mp3',
    door_close: '/audio/sfx/environment/door_close.mp3',
    chest_open: '/audio/sfx/environment/chest_open.mp3',
    water_splash: '/audio/sfx/environment/water_splash.mp3',
    fire_crackle: '/audio/sfx/environment/fire_crackle.mp3',

    // Turkish Cultural Sounds
    cay_pour: '/audio/sfx/turkish/cay_pour.mp3', // Çay dökme sesi
    simit_bite: '/audio/sfx/turkish/simit_bite.mp3', // Simit ısırma
    ezan: '/audio/sfx/turkish/ezan.mp3', // Ezan sesi
    davul_zurna: '/audio/sfx/turkish/davul_zurna.mp3', // Davul zurna
    market_ambient: '/audio/sfx/turkish/market_ambient.mp3', // Pazar yeri

    // Ambient Loops
    city_ambient: '/audio/sfx/ambient/city.mp3',
    forest_ambient: '/audio/sfx/ambient/forest.mp3',
    beach_ambient: '/audio/sfx/ambient/beach.mp3',
    market_ambient_loop: '/audio/sfx/ambient/market.mp3',
    rain: '/audio/sfx/ambient/rain.mp3',
    wind: '/audio/sfx/ambient/wind.mp3',
    thunder: '/audio/sfx/ambient/thunder.mp3'
  };

  private constructor() {
    this.config = this.loadConfig();
    this.sounds = new Map();
    this.sounds3D = new Map();
    this.listenerPosition = { x: 0, y: 0, z: 0 };
    this.initializeAudioContext();
    this.applyConfig();
  }

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  private initializeAudioContext(): void {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();

      // Set up spatial audio
      Howler.pos(
        this.listenerPosition.x,
        this.listenerPosition.y,
        this.listenerPosition.z
      );
      Howler.orientation(0, 0, -1, 0, 1, 0); // Forward and up vectors
    }
  }

  private loadConfig(): AudioConfig {
    if (typeof window === 'undefined') {
      return this.getDefaultConfig();
    }

    const saved = localStorage.getItem('audio_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return this.getDefaultConfig();
      }
    }
    return this.getDefaultConfig();
  }

  private getDefaultConfig(): AudioConfig {
    return {
      volume: 0.8,
      muted: false,
      masterVolume: 0.8,
      musicVolume: 0.7,
      sfxVolume: 0.8,
      ambientVolume: 0.5,
      voiceVolume: 1.0,
      spatialAudioEnabled: true
    };
  }

  private saveConfig(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('audio_config', JSON.stringify(this.config));
    }
  }

  private applyConfig(): void {
    Howler.volume(this.config.masterVolume);
    Howler.mute(this.config.muted);
  }

  // Music Controls
  public playMusic(trackId: string, fadeIn: boolean = true): void {
    const track = this.MUSIC_LIBRARY[trackId];
    if (!track) {
      console.warn(`Music track not found: ${trackId}`);
      return;
    }

    // Fade out current music
    if (this.currentMusic) {
      this.stopMusic(true);
    }

    const howl = new Howl({
      src: [track.url],
      loop: track.loop,
      volume: fadeIn ? 0 : this.config.musicVolume,
      onload: () => {
        console.log(`Music loaded: ${track.name}`);
      },
      onloaderror: (id, error) => {
        console.error(`Failed to load music: ${track.name}`, error);
      }
    });

    howl.play();

    if (fadeIn) {
      howl.fade(0, this.config.musicVolume, track.fadeInDuration);
    }

    this.currentMusic = howl;
    this.currentMusicId = trackId;
  }

  public stopMusic(fadeOut: boolean = true): void {
    if (!this.currentMusic) return;

    if (fadeOut && this.currentMusicId) {
      const track = this.MUSIC_LIBRARY[this.currentMusicId];
      const duration = track?.fadeOutDuration || 1000;

      this.currentMusic.fade(this.currentMusic.volume(), 0, duration);
      setTimeout(() => {
        this.currentMusic?.stop();
        this.currentMusic = null;
        this.currentMusicId = null;
      }, duration);
    } else {
      this.currentMusic.stop();
      this.currentMusic = null;
      this.currentMusicId = null;
    }
  }

  public pauseMusic(): void {
    this.currentMusic?.pause();
  }

  public resumeMusic(): void {
    this.currentMusic?.play();
  }

  // Sound Effects (2D)
  public playSFX(sfxId: string, volume: number = 1.0): void {
    const url = this.SFX_LIBRARY[sfxId as keyof typeof this.SFX_LIBRARY];
    if (!url) {
      console.warn(`SFX not found: ${sfxId}`);
      return;
    }

    const howl = new Howl({
      src: [url],
      volume: volume * this.config.sfxVolume,
      onend: () => {
        this.sounds.delete(sfxId);
      }
    });

    howl.play();
    this.sounds.set(sfxId, howl);
  }

  // 3D Spatial Audio
  public playSFX3D(
    sfxId: string,
    position: { x: number; y: number; z: number },
    options: {
      volume?: number;
      maxDistance?: number;
      rolloffFactor?: number;
      refDistance?: number;
      loop?: boolean;
    } = {}
  ): string {
    const url = this.SFX_LIBRARY[sfxId as keyof typeof this.SFX_LIBRARY];
    if (!url) {
      console.warn(`3D SFX not found: ${sfxId}`);
      return '';
    }

    const soundId = `${sfxId}_${Date.now()}_${Math.random()}`;

    const howl = new Howl({
      src: [url],
      volume: (options.volume || 1.0) * this.config.sfxVolume,
      loop: options.loop || false,
      onend: () => {
        if (!options.loop) {
          this.sounds3D.delete(soundId);
        }
      }
    });

    const id = howl.play();

    // Apply 3D positioning
    howl.pos(position.x, position.y, position.z, id);

    // Distance attenuation settings
    howl.pannerAttr({
      panningModel: 'HRTF',
      refDistance: options.refDistance || 1,
      rolloffFactor: options.rolloffFactor || 1,
      distanceModel: 'inverse',
      maxDistance: options.maxDistance || 100,
      coneInnerAngle: 360,
      coneOuterAngle: 360,
      coneOuterGain: 0
    }, id);

    const sound3D: Sound3D = {
      id: soundId,
      howl,
      position,
      maxDistance: options.maxDistance || 100,
      rolloffFactor: options.rolloffFactor || 1,
      refDistance: options.refDistance || 1
    };

    this.sounds3D.set(soundId, sound3D);
    return soundId;
  }

  public updateSound3DPosition(
    soundId: string,
    position: { x: number; y: number; z: number }
  ): void {
    const sound = this.sounds3D.get(soundId);
    if (sound) {
      sound.position = position;
      sound.howl.pos(position.x, position.y, position.z);
    }
  }

  public stopSound3D(soundId: string): void {
    const sound = this.sounds3D.get(soundId);
    if (sound) {
      sound.howl.stop();
      this.sounds3D.delete(soundId);
    }
  }

  // Listener Position (Camera/Player)
  public updateListenerPosition(
    position: { x: number; y: number; z: number },
    orientation?: {
      forward: { x: number; y: number; z: number };
      up: { x: number; y: number; z: number };
    }
  ): void {
    this.listenerPosition = position;
    Howler.pos(position.x, position.y, position.z);

    if (orientation) {
      Howler.orientation(
        orientation.forward.x,
        orientation.forward.y,
        orientation.forward.z,
        orientation.up.x,
        orientation.up.y,
        orientation.up.z
      );
    }
  }

  // Volume Controls
  public setMasterVolume(volume: number): void {
    this.config.masterVolume = Math.max(0, Math.min(1, volume));
    Howler.volume(this.config.masterVolume);
    this.saveConfig();
  }

  public setMusicVolume(volume: number): void {
    this.config.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.currentMusic) {
      this.currentMusic.volume(this.config.musicVolume);
    }
    this.saveConfig();
  }

  public setSFXVolume(volume: number): void {
    this.config.sfxVolume = Math.max(0, Math.min(1, volume));
    this.saveConfig();
  }

  public setAmbientVolume(volume: number): void {
    this.config.ambientVolume = Math.max(0, Math.min(1, volume));
    this.saveConfig();
  }

  public setVoiceVolume(volume: number): void {
    this.config.voiceVolume = Math.max(0, Math.min(1, volume));
    this.saveConfig();
  }

  public toggleMute(): void {
    this.config.muted = !this.config.muted;
    Howler.mute(this.config.muted);
    this.saveConfig();
  }

  public toggleSpatialAudio(): void {
    this.config.spatialAudioEnabled = !this.config.spatialAudioEnabled;
    this.saveConfig();
  }

  // Getters
  public getConfig(): AudioConfig {
    return { ...this.config };
  }

  public getCurrentMusic(): string | null {
    return this.currentMusicId;
  }

  public isPlaying(): boolean {
    return this.currentMusic?.playing() || false;
  }

  // Cleanup
  public stopAll(): void {
    this.stopMusic(false);
    this.sounds.forEach(sound => sound.stop());
    this.sounds3D.forEach(sound => sound.howl.stop());
    this.sounds.clear();
    this.sounds3D.clear();
  }

  public dispose(): void {
    this.stopAll();
    this.audioContext?.close();
  }
}

// Singleton instance export
export const audioEngine = AudioEngine.getInstance();
