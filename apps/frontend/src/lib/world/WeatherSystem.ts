/**
 * ANADOLU REALM - Dynamic Weather System
 * Rain, Snow, Fog, Wind, Istanbul Climate Simulation
 * AI-Powered by AILYDIAN Orchestrator
 */

import * as THREE from 'three';

export enum WeatherCondition {
  CLEAR = 'clear',
  CLOUDY = 'cloudy',
  RAINY = 'rainy',
  STORMY = 'stormy',
  FOGGY = 'foggy',
  SNOWY = 'snowy'
}

export enum Season {
  SPRING = 'spring',
  SUMMER = 'summer',
  AUTUMN = 'autumn',
  WINTER = 'winter'
}

interface SeasonalConfig {
  tempRange: [number, number]; // Min-Max Celsius
  rainProbability: number;
  snowProbability: number;
  windSpeed: [number, number]; // Min-Max km/h
}

export class WeatherSystem {
  private scene: THREE.Scene;

  // Current state
  private currentWeather: WeatherCondition = WeatherCondition.CLEAR;
  private nextWeather: WeatherCondition = WeatherCondition.CLEAR;
  private temperature: number = 20;
  private humidity: number = 60;
  private windSpeed: number = 5;
  private windDirection: THREE.Vector3 = new THREE.Vector3(1, 0, 0);
  private currentSeason: Season = Season.SPRING;

  // Particle systems
  private rainParticles: THREE.Points | null = null;
  private snowParticles: THREE.Points | null = null;
  private fogMesh: THREE.Mesh | null = null;

  // Transition
  private isTransitioning = false;
  private transitionProgress = 0;
  private transitionDuration = 30000; // 30 seconds

  // Seasonal configs (İstanbul climate)
  private readonly SEASONAL_CONFIG: Record<Season, SeasonalConfig> = {
    [Season.SPRING]: {
      tempRange: [10, 20],
      rainProbability: 0.3,
      snowProbability: 0.0,
      windSpeed: [5, 15]
    },
    [Season.SUMMER]: {
      tempRange: [25, 35],
      rainProbability: 0.1,
      snowProbability: 0.0,
      windSpeed: [3, 10]
    },
    [Season.AUTUMN]: {
      tempRange: [15, 25],
      rainProbability: 0.4,
      snowProbability: 0.0,
      windSpeed: [8, 20]
    },
    [Season.WINTER]: {
      tempRange: [0, 10],
      rainProbability: 0.2,
      snowProbability: 0.3,
      windSpeed: [10, 25]
    }
  };

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.initializeWeatherSystems();
    this.startWeatherCycle();

    console.log('🌤️ Weather System initialized');
  }

  private initializeWeatherSystems(): void {
    this.createRainSystem();
    this.createSnowSystem();
    this.createFogSystem();
  }

  
  // RAIN SYSTEM
  

  private createRainSystem(): void {
    const rainCount = 10000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(rainCount * 3);
    const velocities = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 200; // x
      positions[i3 + 1] = Math.random() * 100;     // y
      positions[i3 + 2] = (Math.random() - 0.5) * 200; // z

      velocities[i3] = this.windDirection.x * 2;
      velocities[i3 + 1] = -10 - Math.random() * 5; // Falling speed
      velocities[i3 + 2] = this.windDirection.z * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    this.rainParticles = new THREE.Points(geometry, material);
    this.rainParticles.visible = false;
    this.scene.add(this.rainParticles);
  }

  private updateRain(deltaTime: number): void {
    if (!this.rainParticles || !this.rainParticles.visible) return;

    const positions = this.rainParticles.geometry.attributes.position.array as Float32Array;
    const velocities = this.rainParticles.geometry.attributes.velocity.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i] * deltaTime;
      positions[i + 1] += velocities[i + 1] * deltaTime;
      positions[i + 2] += velocities[i + 2] * deltaTime;

      // Reset if below ground
      if (positions[i + 1] < 0) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = 50 + Math.random() * 50;
        positions[i + 2] = (Math.random() - 0.5) * 200;
      }
    }

    this.rainParticles.geometry.attributes.position.needsUpdate = true;
  }

  
  // SNOW SYSTEM
  

  private createSnowSystem(): void {
    const snowCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(snowCount * 3);
    const velocities = new Float32Array(snowCount * 3);
    const sizes = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = Math.random() * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;

      velocities[i3] = (Math.random() - 0.5) * 0.5; // Gentle drift
      velocities[i3 + 1] = -0.5 - Math.random() * 0.5; // Slow fall
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.5;

      sizes[i] = 1 + Math.random() * 2; // Varied snowflake sizes
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      transparent: true,
      opacity: 0.8,
      map: this.createSnowflakeTexture()
    });

    this.snowParticles = new THREE.Points(geometry, material);
    this.snowParticles.visible = false;
    this.scene.add(this.snowParticles);
  }

  private createSnowflakeTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(16, 16, 8, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }

  private updateSnow(deltaTime: number): void {
    if (!this.snowParticles || !this.snowParticles.visible) return;

    const positions = this.snowParticles.geometry.attributes.position.array as Float32Array;
    const velocities = this.snowParticles.geometry.attributes.velocity.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      // Add turbulence
      const turbulence = Math.sin(Date.now() * 0.001 + i) * 0.1;

      positions[i] += (velocities[i] + turbulence) * deltaTime;
      positions[i + 1] += velocities[i + 1] * deltaTime;
      positions[i + 2] += (velocities[i + 2] + turbulence) * deltaTime;

      if (positions[i + 1] < 0) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = 50 + Math.random() * 50;
        positions[i + 2] = (Math.random() - 0.5) * 200;
      }
    }

    this.snowParticles.geometry.attributes.position.needsUpdate = true;
    this.snowParticles.rotation.y += 0.0001; // Gentle rotation
  }

  
  // FOG SYSTEM
  

  private createFogSystem(): void {
    this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
  }

  private updateFog(intensity: number): void {
    if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.density = intensity * 0.01;
      this.scene.fog.color.setHex(
        intensity > 0.5 ? 0x999999 : 0xcccccc
      );
    }
  }

  
  // WEATHER CYCLE
  

  private startWeatherCycle(): void {
    // Change weather every 10-20 minutes
    setInterval(() => {
      this.changeWeather();
    }, (10 + Math.random() * 10) * 60 * 1000);
  }

  private async changeWeather(): Promise<void> {
    if (this.isTransitioning) return;

    const config = this.SEASONAL_CONFIG[this.currentSeason];
    const conditions = this.getPossibleWeatherConditions(config);

    this.nextWeather = conditions[Math.floor(Math.random() * conditions.length)];

    console.log(`🌦️ Weather changing: ${this.currentWeather} → ${this.nextWeather}`);

    await this.transitionWeather(this.currentWeather, this.nextWeather);
  }

  private getPossibleWeatherConditions(config: SeasonalConfig): WeatherCondition[] {
    const conditions: WeatherCondition[] = [WeatherCondition.CLEAR, WeatherCondition.CLOUDY];

    if (Math.random() < config.rainProbability) {
      conditions.push(WeatherCondition.RAINY);
      if (Math.random() < 0.3) conditions.push(WeatherCondition.STORMY);
    }

    if (Math.random() < config.snowProbability && config.tempRange[1] < 5) {
      conditions.push(WeatherCondition.SNOWY);
    }

    if (Math.random() < 0.2) {
      conditions.push(WeatherCondition.FOGGY);
    }

    return conditions;
  }

  private async transitionWeather(from: WeatherCondition, to: WeatherCondition): Promise<void> {
    this.isTransitioning = true;
    this.transitionProgress = 0;

    const startTime = Date.now();

    return new Promise((resolve) => {
      const transition = () => {
        const elapsed = Date.now() - startTime;
        this.transitionProgress = Math.min(1, elapsed / this.transitionDuration);

        // Fade out old weather
        this.setWeatherVisibility(from, 1 - this.transitionProgress);

        // Fade in new weather
        this.setWeatherVisibility(to, this.transitionProgress);

        if (this.transitionProgress >= 1) {
          this.currentWeather = to;
          this.isTransitioning = false;
          console.log(`✅ Weather transition complete: ${to}`);
          resolve();
        } else {
          requestAnimationFrame(transition);
        }
      };

      transition();
    });
  }

  private setWeatherVisibility(weather: WeatherCondition, opacity: number): void {
    switch (weather) {
      case WeatherCondition.RAINY:
      case WeatherCondition.STORMY:
        if (this.rainParticles) {
          this.rainParticles.visible = opacity > 0;
          (this.rainParticles.material as THREE.PointsMaterial).opacity = opacity * 0.6;
        }
        break;

      case WeatherCondition.SNOWY:
        if (this.snowParticles) {
          this.snowParticles.visible = opacity > 0;
          (this.snowParticles.material as THREE.PointsMaterial).opacity = opacity * 0.8;
        }
        break;

      case WeatherCondition.FOGGY:
        this.updateFog(opacity);
        break;

      case WeatherCondition.CLEAR:
      case WeatherCondition.CLOUDY:
        this.updateFog(0);
        break;
    }
  }

  
  // PUBLIC METHODS
  

  setSeason(season: Season): void {
    this.currentSeason = season;
    const config = this.SEASONAL_CONFIG[season];

    this.temperature = config.tempRange[0] + Math.random() * (config.tempRange[1] - config.tempRange[0]);
    this.windSpeed = config.windSpeed[0] + Math.random() * (config.windSpeed[1] - config.windSpeed[0]);

    console.log(`🌸 Season changed to: ${season}, Temp: ${this.temperature.toFixed(1)}°C`);
  }

  setWindDirection(direction: THREE.Vector3): void {
    this.windDirection.copy(direction).normalize();
  }

  forceWeather(weather: WeatherCondition): void {
    this.nextWeather = weather;
    this.transitionWeather(this.currentWeather, weather);
  }

  update(deltaTime: number): void {
    // Update active weather effects
    switch (this.currentWeather) {
      case WeatherCondition.RAINY:
      case WeatherCondition.STORMY:
        this.updateRain(deltaTime);
        break;

      case WeatherCondition.SNOWY:
        this.updateSnow(deltaTime);
        break;
    }
  }

  // Getters
  getCurrentWeather(): WeatherCondition { return this.currentWeather; }
  getTemperature(): number { return this.temperature; }
  getWindSpeed(): number { return this.windSpeed; }
  getHumidity(): number { return this.humidity; }
  getSeason(): Season { return this.currentSeason; }
}

export default WeatherSystem;
