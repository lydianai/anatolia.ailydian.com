/**
 * ANADOLU REALM - 3D Spatial Audio System
 * Directional Sound, Environmental Audio, Dynamic Music, Voice Chat
 * AI-Powered by AILYDIAN Orchestrator
 */

import * as THREE from 'three';

// AUDIO ENUMS & INTERFACES

export enum AudioCategory {
  MUSIC = 'music',
  AMBIENT = 'ambient',
  SFX = 'sfx',
  VOICE = 'voice',
  UI = 'ui'
}

export enum MusicTrack {
  MENU_THEME = 'menu_theme',
  EXPLORATION = 'exploration',
  COMBAT = 'combat',
  PEACEFUL = 'peaceful',
  SUSPENSE = 'suspense',
  VICTORY = 'victory',
  DEFEAT = 'defeat',
  TAVERN = 'tavern',
  MOSQUE = 'mosque',
  MARKET = 'market'
}

export enum AmbientSound {
  // City
  CITY_DAY = 'city_day',
  CITY_NIGHT = 'city_night',
  MARKET_BUSY = 'market_busy',

  // Nature
  WIND = 'wind',
  RAIN = 'rain',
  THUNDER = 'thunder',
  BIRDS = 'birds',
  OCEAN = 'ocean',

  // Interior
  FIRE_CRACKLING = 'fire_crackling',
  CROWD_CHATTER = 'crowd_chatter',
  MOSQUE_PRAYER = 'mosque_prayer',

  // Turkish specific
  EZAN = 'ezan',
  SIMIT_SELLER = 'simit_seller',
  CAY_HOUSE = 'cay_house'
}

export enum SoundEffect {
  // Combat
  SWORD_SWING = 'sword_swing',
  SWORD_HIT = 'sword_hit',
  ARROW_SHOOT = 'arrow_shoot',
  SHIELD_BLOCK = 'shield_block',
  FOOTSTEP = 'footstep',

  // Environment
  DOOR_OPEN = 'door_open',
  DOOR_CLOSE = 'door_close',
  CHEST_OPEN = 'chest_open',
  WATER_SPLASH = 'water_splash',

  // UI
  BUTTON_CLICK = 'button_click',
  QUEST_COMPLETE = 'quest_complete',
  LEVEL_UP = 'level_up',
  COIN_DROP = 'coin_drop',

  // Turkish specific
  TAVLA_DICE = 'tavla_dice',
  CAY_POUR = 'cay_pour',
  NARGILE_BUBBLE = 'nargile_bubble',
  HORN_DOLMUS = 'horn_dolmus'
}

export interface AudioSource {
  id: string;
  category: AudioCategory;
  position: THREE.Vector3;

  // Audio element
  audio: HTMLAudioElement | null;
  positionalAudio: THREE.PositionalAudio | null;

  // Properties
  volume: number;              // 0-1
  pitch: number;               // 0.5-2.0
  loop: boolean;
  playing: boolean;

  // Spatial
  maxDistance: number;
  refDistance: number;
  rolloffFactor: number;

  // Effects
  reverb: boolean;
  echo: boolean;
  lowpass: boolean;
}

export interface MusicLayer {
  track: MusicTrack;
  audio: HTMLAudioElement;
  baseVolume: number;
  currentVolume: number;
  fadeSpeed: number;
}

export interface VoiceChatChannel {
  id: string;
  name: string;
  type: 'proximity' | 'party' | 'guild' | 'global';
  maxDistance?: number;        // For proximity
  participants: Map<string, VoiceParticipant>;
}

export interface VoiceParticipant {
  playerId: string;
  playerName: string;
  position: THREE.Vector3;
  isSpeaking: boolean;
  volume: number;
  muted: boolean;
}

// 3D SPATIAL AUDIO SYSTEM

export class SpatialAudioSystem {
  private listener: THREE.AudioListener;
  private audioSources: Map<string, AudioSource> = new Map();

  // Music system
  private musicLayers: Map<MusicTrack, MusicLayer> = new Map();
  private currentTrack: MusicTrack | null = null;

  // Ambient sounds
  private ambientSounds: Map<AmbientSound, AudioSource> = new Map();

  // Master volumes
  private masterVolume: number = 1.0;
  private musicVolume: number = 0.7;
  private sfxVolume: number = 0.8;
  private ambientVolume: number = 0.6;
  private voiceVolume: number = 1.0;

  // Voice chat
  private voiceChannels: Map<string, VoiceChatChannel> = new Map();

  // Audio context
  private audioContext: AudioContext;
  private gainNode: GainNode;
  private reverbNode: ConvolverNode | null = null;

  // Environment
  private currentEnvironment: string = 'outdoor';
  private weatherIntensity: number = 0;

  constructor(camera: THREE.Camera) {
    // Create audio listener
    this.listener = new THREE.AudioListener();
    camera.add(this.listener);

    // Create audio context
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);

    this.initializeAudioSystem();
    this.initializeMusicTracks();
    this.initializeAmbientSounds();

    console.log('🔊 3D Spatial Audio System initialized');
  }

  private initializeAudioSystem(): void {
    // Create reverb impulse response
    this.createReverbImpulse();

    console.log('✅ Audio context ready');
  }

  private createReverbImpulse(): void {
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 2; // 2 seconds
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }

    this.reverbNode = this.audioContext.createConvolver();
    this.reverbNode.buffer = impulse;
  }

  
  // MUSIC SYSTEM (Dynamic Layered Music)
  

  private initializeMusicTracks(): void {
    const tracks: Array<{ track: MusicTrack; path: string; volume: number }> = [
      { track: MusicTrack.MENU_THEME, path: '/audio/music/menu_theme.mp3', volume: 0.8 },
      { track: MusicTrack.EXPLORATION, path: '/audio/music/exploration.mp3', volume: 0.6 },
      { track: MusicTrack.COMBAT, path: '/audio/music/combat.mp3', volume: 0.9 },
      { track: MusicTrack.PEACEFUL, path: '/audio/music/peaceful.mp3', volume: 0.5 },
      { track: MusicTrack.SUSPENSE, path: '/audio/music/suspense.mp3', volume: 0.7 },
      { track: MusicTrack.VICTORY, path: '/audio/music/victory.mp3', volume: 0.9 },
      { track: MusicTrack.DEFEAT, path: '/audio/music/defeat.mp3', volume: 0.8 },
      { track: MusicTrack.TAVERN, path: '/audio/music/tavern.mp3', volume: 0.6 },
      { track: MusicTrack.MOSQUE, path: '/audio/music/mosque.mp3', volume: 0.5 },
      { track: MusicTrack.MARKET, path: '/audio/music/market.mp3', volume: 0.7 }
    ];

    tracks.forEach(({ track, path, volume }) => {
      const audio = new Audio(path);
      audio.loop = true;
      audio.volume = 0;

      this.musicLayers.set(track, {
        track,
        audio,
        baseVolume: volume,
        currentVolume: 0,
        fadeSpeed: 0.02
      });
    });

    console.log(`🎵 ${tracks.length} music tracks loaded`);
  }

  playMusic(track: MusicTrack, fadeTime: number = 2000): void {
    // Fade out current track
    if (this.currentTrack) {
      this.fadeOutTrack(this.currentTrack, fadeTime);
    }

    // Fade in new track
    this.fadeInTrack(track, fadeTime);
    this.currentTrack = track;

    console.log(`🎵 Playing music: ${track}`);
  }

  private fadeInTrack(track: MusicTrack, duration: number): void {
    const layer = this.musicLayers.get(track);
    if (!layer) return;

    layer.audio.currentTime = 0;
    layer.audio.volume = 0;
    layer.audio.play();

    const targetVolume = layer.baseVolume * this.musicVolume * this.masterVolume;
    const step = targetVolume / (duration / 50);

    const fadeInterval = setInterval(() => {
      if (layer.currentVolume < targetVolume) {
        layer.currentVolume += step;
        layer.audio.volume = Math.min(layer.currentVolume, targetVolume);
      } else {
        clearInterval(fadeInterval);
      }
    }, 50);
  }

  private fadeOutTrack(track: MusicTrack, duration: number): void {
    const layer = this.musicLayers.get(track);
    if (!layer) return;

    const step = layer.currentVolume / (duration / 50);

    const fadeInterval = setInterval(() => {
      if (layer.currentVolume > 0) {
        layer.currentVolume -= step;
        layer.audio.volume = Math.max(layer.currentVolume, 0);
      } else {
        layer.audio.pause();
        clearInterval(fadeInterval);
      }
    }, 50);
  }

  stopMusic(fadeTime: number = 1000): void {
    if (this.currentTrack) {
      this.fadeOutTrack(this.currentTrack, fadeTime);
      this.currentTrack = null;
    }
  }

  
  // AMBIENT SOUNDS (Environmental Audio)
  

  private initializeAmbientSounds(): void {
    const ambientSounds: Array<{ sound: AmbientSound; path: string; volume: number }> = [
      // City
      { sound: AmbientSound.CITY_DAY, path: '/audio/ambient/city_day.mp3', volume: 0.4 },
      { sound: AmbientSound.CITY_NIGHT, path: '/audio/ambient/city_night.mp3', volume: 0.3 },
      { sound: AmbientSound.MARKET_BUSY, path: '/audio/ambient/market_busy.mp3', volume: 0.5 },

      // Nature
      { sound: AmbientSound.WIND, path: '/audio/ambient/wind.mp3', volume: 0.3 },
      { sound: AmbientSound.RAIN, path: '/audio/ambient/rain.mp3', volume: 0.6 },
      { sound: AmbientSound.THUNDER, path: '/audio/ambient/thunder.mp3', volume: 0.8 },
      { sound: AmbientSound.BIRDS, path: '/audio/ambient/birds.mp3', volume: 0.4 },
      { sound: AmbientSound.OCEAN, path: '/audio/ambient/ocean.mp3', volume: 0.5 },

      // Interior
      { sound: AmbientSound.FIRE_CRACKLING, path: '/audio/ambient/fire.mp3', volume: 0.4 },
      { sound: AmbientSound.CROWD_CHATTER, path: '/audio/ambient/crowd.mp3', volume: 0.5 },
      { sound: AmbientSound.MOSQUE_PRAYER, path: '/audio/ambient/mosque_prayer.mp3', volume: 0.6 },

      // Turkish specific
      { sound: AmbientSound.EZAN, path: '/audio/ambient/ezan.mp3', volume: 0.7 },
      { sound: AmbientSound.SIMIT_SELLER, path: '/audio/ambient/simit_seller.mp3', volume: 0.5 },
      { sound: AmbientSound.CAY_HOUSE, path: '/audio/ambient/cay_house.mp3', volume: 0.4 }
    ];

    ambientSounds.forEach(({ sound, path, volume }) => {
      const audioSource = this.createAudioSource(
        sound,
        AudioCategory.AMBIENT,
        path,
        new THREE.Vector3(0, 0, 0),
        {
          volume,
          loop: true,
          maxDistance: 100,
          refDistance: 10
        }
      );

      this.ambientSounds.set(sound, audioSource);
    });

    console.log(`🌍 ${ambientSounds.length} ambient sounds loaded`);
  }

  playAmbient(sound: AmbientSound, position?: THREE.Vector3): void {
    const source = this.ambientSounds.get(sound);
    if (!source) return;

    if (position) {
      source.position.copy(position);
    }

    this.playAudioSource(source.id);

    console.log(`🌍 Ambient: ${sound}`);
  }

  stopAmbient(sound: AmbientSound): void {
    const source = this.ambientSounds.get(sound);
    if (!source) return;

    this.stopAudioSource(source.id);
  }

  
  // 3D POSITIONAL AUDIO (Spatial Sound Effects)
  

  createAudioSource(
    id: string,
    category: AudioCategory,
    audioPath: string,
    position: THREE.Vector3,
    options: {
      volume?: number;
      loop?: boolean;
      maxDistance?: number;
      refDistance?: number;
      rolloffFactor?: number;
    } = {}
  ): AudioSource {
    const audio = new Audio(audioPath);
    const positionalAudio = new THREE.PositionalAudio(this.listener);

    positionalAudio.setMediaElementSource(audio);
    positionalAudio.setRefDistance(options.refDistance || 20);
    positionalAudio.setMaxDistance(options.maxDistance || 100);
    positionalAudio.setRolloffFactor(options.rolloffFactor || 1);
    positionalAudio.setDistanceModel('exponential');

    const source: AudioSource = {
      id,
      category,
      position: position.clone(),
      audio,
      positionalAudio,
      volume: options.volume || 1.0,
      pitch: 1.0,
      loop: options.loop || false,
      playing: false,
      maxDistance: options.maxDistance || 100,
      refDistance: options.refDistance || 20,
      rolloffFactor: options.rolloffFactor || 1,
      reverb: false,
      echo: false,
      lowpass: false
    };

    this.audioSources.set(id, source);

    return source;
  }

  playSoundEffect(
    effect: SoundEffect,
    position: THREE.Vector3,
    volume: number = 1.0
  ): void {
    const id = `sfx_${effect}_${Date.now()}`;
    const path = `/audio/sfx/${effect}.mp3`;

    const source = this.createAudioSource(
      id,
      AudioCategory.SFX,
      path,
      position,
      {
        volume: volume * this.sfxVolume,
        loop: false,
        maxDistance: 50,
        refDistance: 10
      }
    );

    this.playAudioSource(id);

    // Auto-remove when finished
    if (source.audio) {
      source.audio.onended = () => {
        this.removeAudioSource(id);
      };
    }
  }

  playAudioSource(sourceId: string): void {
    const source = this.audioSources.get(sourceId);
    if (!source || !source.audio) return;

    source.audio.loop = source.loop;
    source.audio.volume = this.getEffectiveVolume(source);
    source.audio.playbackRate = source.pitch;

    source.audio.play().catch(err => {
      console.warn(`Failed to play audio: ${err}`);
    });

    source.playing = true;
  }

  stopAudioSource(sourceId: string): void {
    const source = this.audioSources.get(sourceId);
    if (!source || !source.audio) return;

    source.audio.pause();
    source.audio.currentTime = 0;
    source.playing = false;
  }

  removeAudioSource(sourceId: string): void {
    const source = this.audioSources.get(sourceId);
    if (!source) return;

    if (source.audio) {
      source.audio.pause();
      source.audio.src = '';
    }

    this.audioSources.delete(sourceId);
  }

  private getEffectiveVolume(source: AudioSource): number {
    let volume = source.volume * this.masterVolume;

    switch (source.category) {
      case AudioCategory.MUSIC:
        volume *= this.musicVolume;
        break;
      case AudioCategory.AMBIENT:
        volume *= this.ambientVolume;
        break;
      case AudioCategory.SFX:
        volume *= this.sfxVolume;
        break;
      case AudioCategory.VOICE:
        volume *= this.voiceVolume;
        break;
    }

    return Math.max(0, Math.min(1, volume));
  }

  
  // VOICE CHAT SYSTEM
  

  createVoiceChannel(
    channelId: string,
    name: string,
    type: 'proximity' | 'party' | 'guild' | 'global',
    maxDistance?: number
  ): VoiceChatChannel {
    const channel: VoiceChatChannel = {
      id: channelId,
      name,
      type,
      maxDistance: maxDistance || 50,
      participants: new Map()
    };

    this.voiceChannels.set(channelId, channel);

    console.log(`🎤 Voice channel created: ${name} (${type})`);

    return channel;
  }

  joinVoiceChannel(
    channelId: string,
    playerId: string,
    playerName: string,
    position: THREE.Vector3
  ): { success: boolean; message: string } {
    const channel = this.voiceChannels.get(channelId);

    if (!channel) {
      return { success: false, message: 'Channel not found!' };
    }

    const participant: VoiceParticipant = {
      playerId,
      playerName,
      position: position.clone(),
      isSpeaking: false,
      volume: 1.0,
      muted: false
    };

    channel.participants.set(playerId, participant);

    console.log(`🎤 ${playerName} joined voice channel: ${channel.name}`);

    return {
      success: true,
      message: `Joined ${channel.name}`
    };
  }

  updateVoicePosition(channelId: string, playerId: string, position: THREE.Vector3): void {
    const channel = this.voiceChannels.get(channelId);
    if (!channel) return;

    const participant = channel.participants.get(playerId);
    if (!participant) return;

    participant.position.copy(position);
  }

  
  // ENVIRONMENTAL EFFECTS
  

  setEnvironment(environment: 'outdoor' | 'indoor' | 'cave' | 'underwater'): void {
    this.currentEnvironment = environment;

    // Apply environmental audio effects
    this.audioSources.forEach(source => {
      if (source.category === AudioCategory.SFX || source.category === AudioCategory.AMBIENT) {
        switch (environment) {
          case 'cave':
            source.reverb = true;
            source.echo = true;
            break;
          case 'underwater':
            source.lowpass = true;
            break;
          case 'indoor':
            source.reverb = true;
            break;
          default:
            source.reverb = false;
            source.echo = false;
            source.lowpass = false;
        }
      }
    });

    console.log(`🌍 Environment changed: ${environment}`);
  }

  setWeatherIntensity(intensity: number): void {
    this.weatherIntensity = Math.max(0, Math.min(1, intensity));

    // Adjust rain/wind sounds based on intensity
    const rainSource = this.ambientSounds.get(AmbientSound.RAIN);
    const windSource = this.ambientSounds.get(AmbientSound.WIND);

    if (rainSource && rainSource.audio) {
      rainSource.audio.volume = this.weatherIntensity * this.ambientVolume;
    }

    if (windSource && windSource.audio) {
      windSource.audio.volume = (this.weatherIntensity * 0.5) * this.ambientVolume;
    }
  }

  
  // VOLUME CONTROLS
  

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.gainNode.gain.value = this.masterVolume;
    this.updateAllVolumes();
  }

  setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  setSFXVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  setAmbientVolume(volume: number): void {
    this.ambientVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  setVoiceVolume(volume: number): void {
    this.voiceVolume = Math.max(0, Math.min(1, volume));
  }

  private updateAllVolumes(): void {
    this.audioSources.forEach(source => {
      if (source.audio && source.playing) {
        source.audio.volume = this.getEffectiveVolume(source);
      }
    });

    this.musicLayers.forEach(layer => {
      if (layer.audio) {
        const targetVolume = layer.baseVolume * this.musicVolume * this.masterVolume;
        layer.audio.volume = Math.min(layer.currentVolume, targetVolume);
      }
    });
  }

  
  // UPDATE LOOP
  

  update(listenerPosition: THREE.Vector3): void {
    // Update positional audio positions
    this.audioSources.forEach(source => {
      if (source.positionalAudio) {
        source.positionalAudio.position.copy(source.position);
      }
    });

    // Update voice chat spatial audio
    this.voiceChannels.forEach(channel => {
      if (channel.type === 'proximity') {
        channel.participants.forEach(participant => {
          const distance = listenerPosition.distanceTo(participant.position);

          // Mute if too far
          if (distance > (channel.maxDistance || 50)) {
            participant.volume = 0;
          } else {
            // Distance attenuation
            const attenuation = 1 - (distance / (channel.maxDistance || 50));
            participant.volume = attenuation * this.voiceVolume;
          }
        });
      }
    });
  }

  
  // SPECIAL EFFECTS
  

  playEzan(mosquePosition: THREE.Vector3): void {
    const ezanSource = this.ambientSounds.get(AmbientSound.EZAN);

    if (ezanSource) {
      ezanSource.position.copy(mosquePosition);
      this.playAudioSource(ezanSource.id);

      console.log('🕌 Ezan okunuyor...');
    }
  }

  playFootstep(position: THREE.Vector3, surface: 'stone' | 'wood' | 'grass' | 'water'): void {
    const effect = SoundEffect.FOOTSTEP;
    this.playSoundEffect(effect, position, 0.3);
  }

  
  // CLEANUP
  

  dispose(): void {
    // Stop all audio
    this.audioSources.forEach(source => {
      this.stopAudioSource(source.id);
    });

    this.musicLayers.forEach(layer => {
      layer.audio.pause();
      layer.audio.src = '';
    });

    // Close audio context
    this.audioContext.close();

    console.log('🔊 Audio system disposed');
  }
}

export default SpatialAudioSystem;
