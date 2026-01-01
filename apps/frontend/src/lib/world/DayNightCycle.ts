/**
 * ANADOLU REALM - Day/Night Cycle System
 * 24-Hour Cycle, Dynamic Lighting, City Lights, Prayer Times (Ezan)
 * AI-Powered by AILYDIAN Orchestrator
 */

import * as THREE from 'three';

interface LightingPhase {
  time: number;
  sunColor: number;
  skyColor: number;
  ambientIntensity: number;
  directionalIntensity: number;
}

export class DayNightCycle {
  private scene: THREE.Scene;

  // Time management
  private timeOfDay: number = 12 * 3600; // Seconds since midnight (start at noon)
  private timeSpeed: number = 60; // 1 real minute = 1 game hour
  private isPaused: boolean = false;

  // Celestial bodies
  private sun: THREE.DirectionalLight;
  private moon: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;

  // City lights
  private streetLights: THREE.PointLight[] = [];
  private buildingLights: THREE.PointLight[] = [];
  private mosqueLights: THREE.PointLight[] = [];

  // Skybox
  private sky: THREE.Mesh | null = null;

  // Lighting phases (time of day)
  private readonly LIGHTING_PHASES: LightingPhase[] = [
    { time: 0, sunColor: 0x112244, skyColor: 0x000033, ambientIntensity: 0.1, directionalIntensity: 0 },      // Midnight
    { time: 4, sunColor: 0x223355, skyColor: 0x001144, ambientIntensity: 0.15, directionalIntensity: 0 },     // Pre-dawn
    { time: 6, sunColor: 0xFF8844, skyColor: 0xFF6633, ambientIntensity: 0.4, directionalIntensity: 0.5 },    // Sunrise
    { time: 8, sunColor: 0xFFDD99, skyColor: 0x87CEEB, ambientIntensity: 0.6, directionalIntensity: 0.8 },    // Morning
    { time: 12, sunColor: 0xFFFFFF, skyColor: 0x87CEEB, ambientIntensity: 0.8, directionalIntensity: 1.0 },   // Noon
    { time: 16, sunColor: 0xFFEEDD, skyColor: 0x87CEEB, ambientIntensity: 0.7, directionalIntensity: 0.9 },   // Afternoon
    { time: 18, sunColor: 0xFF7744, skyColor: 0xFF4422, ambientIntensity: 0.5, directionalIntensity: 0.6 },   // Sunset
    { time: 20, sunColor: 0x443366, skyColor: 0x221144, ambientIntensity: 0.2, directionalIntensity: 0.1 },   // Dusk
    { time: 22, sunColor: 0x112244, skyColor: 0x000033, ambientIntensity: 0.1, directionalIntensity: 0 }      // Night
  ];

  // Prayer times (Ezan) for Istanbul
  private readonly PRAYER_TIMES = {
    fajr: 5.5,    // Sabah (05:30)
    dhuhr: 12.5,  // Öğle (12:30)
    asr: 15.5,    // İkindi (15:30)
    maghrib: 18.5, // Akşam (18:30)
    isha: 20.0    // Yatsı (20:00)
  };

  private lastPrayerTime: number = -1;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    this.createCelestialLights();
    this.createSkybox();

    console.log('☀️ Day/Night Cycle initialized');
  }

  private createCelestialLights(): void {
    // Sun (Directional Light)
    this.sun = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    this.sun.position.set(0, 50, 0);
    this.sun.castShadow = true;

    // Shadow settings for realism
    this.sun.shadow.mapSize.width = 2048;
    this.sun.shadow.mapSize.height = 2048;
    this.sun.shadow.camera.near = 0.5;
    this.sun.shadow.camera.far = 500;
    this.sun.shadow.camera.left = -100;
    this.sun.shadow.camera.right = 100;
    this.sun.shadow.camera.top = 100;
    this.sun.shadow.camera.bottom = -100;

    this.scene.add(this.sun);

    // Moon (Directional Light)
    this.moon = new THREE.DirectionalLight(0x6688AA, 0.2);
    this.moon.position.set(0, 50, 0);
    this.scene.add(this.moon);

    // Ambient Light
    this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(this.ambientLight);
  }

  private createSkybox(): void {
    const geometry = new THREE.SphereGeometry(500, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x0077ff) },
        bottomColor: { value: new THREE.Color(0xffffff) },
        offset: { value: 33 },
        exponent: { value: 0.6 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;

        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide
    });

    this.sky = new THREE.Mesh(geometry, material);
    this.scene.add(this.sky);
  }

  
  // CITY LIGHTS MANAGEMENT
  

  addStreetLight(position: THREE.Vector3): THREE.PointLight {
    const light = new THREE.PointLight(0xFFAA55, 0, 20); // Warm street light
    light.position.copy(position);
    this.scene.add(light);
    this.streetLights.push(light);
    return light;
  }

  addBuildingLight(position: THREE.Vector3): THREE.PointLight {
    const light = new THREE.PointLight(0xFFFFAA, 0, 15);
    light.position.copy(position);
    this.scene.add(light);
    this.buildingLights.push(light);
    return light;
  }

  addMosqueLight(position: THREE.Vector3): THREE.PointLight {
    const light = new THREE.PointLight(0x00FF00, 0, 30); // Green minaret light
    light.position.copy(position);
    this.scene.add(light);
    this.mosqueLights.push(light);
    return light;
  }

  
  // TIME MANAGEMENT
  

  setTimeOfDay(hour: number, minute: number = 0): void {
    this.timeOfDay = (hour * 3600) + (minute * 60);
  }

  setTimeSpeed(speed: number): void {
    this.timeSpeed = speed;
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  
  // UPDATE LOOP
  

  update(deltaTime: number): void {
    if (this.isPaused) return;

    // Advance time
    this.timeOfDay += deltaTime * this.timeSpeed;
    if (this.timeOfDay >= 24 * 3600) {
      this.timeOfDay -= 24 * 3600; // Wrap to next day
    }

    const hour = this.timeOfDay / 3600;

    // Update sun/moon position
    this.updateCelestialBodies(hour);

    // Update lighting
    this.updateLighting(hour);

    // Update sky colors
    this.updateSky(hour);

    // Update city lights
    this.updateCityLights(hour);

    // Check for prayer times
    this.checkPrayerTimes(hour);
  }

  private updateCelestialBodies(hour: number): void {
    // Sun arc (6:00 = sunrise, 18:00 = sunset)
    const sunAngle = ((hour - 6) / 12) * Math.PI; // -90° to +90°
    const sunHeight = Math.sin(sunAngle);
    const sunDistance = 300;

    this.sun.position.set(
      Math.cos(sunAngle) * sunDistance,
      sunHeight * sunDistance,
      0
    );

    // Moon (opposite of sun)
    const moonAngle = sunAngle + Math.PI;
    this.moon.position.set(
      Math.cos(moonAngle) * sunDistance,
      Math.sin(moonAngle) * sunDistance,
      0
    );

    // Sun lookAt origin
    this.sun.target.position.set(0, 0, 0);
    this.moon.target.position.set(0, 0, 0);
  }

  private updateLighting(hour: number): void {
    const phase = this.getCurrentLightingPhase(hour);

    // Sun color and intensity
    this.sun.color.setHex(phase.sunColor);
    this.sun.intensity = phase.directionalIntensity;

    // Ambient light
    this.ambientLight.intensity = phase.ambientIntensity;
    this.ambientLight.color.setHex(phase.skyColor);
  }

  private getCurrentLightingPhase(hour: number): LightingPhase {
    // Find two nearest phases and interpolate
    for (let i = 0; i < this.LIGHTING_PHASES.length - 1; i++) {
      const current = this.LIGHTING_PHASES[i];
      const next = this.LIGHTING_PHASES[i + 1];

      if (hour >= current.time && hour < next.time) {
        const t = (hour - current.time) / (next.time - current.time);

        return {
          time: hour,
          sunColor: this.lerpColor(current.sunColor, next.sunColor, t),
          skyColor: this.lerpColor(current.skyColor, next.skyColor, t),
          ambientIntensity: THREE.MathUtils.lerp(current.ambientIntensity, next.ambientIntensity, t),
          directionalIntensity: THREE.MathUtils.lerp(current.directionalIntensity, next.directionalIntensity, t)
        };
      }
    }

    // If after last phase, interpolate to first (night to midnight)
    const last = this.LIGHTING_PHASES[this.LIGHTING_PHASES.length - 1];
    const first = this.LIGHTING_PHASES[0];
    const t = (hour - last.time) / ((24 - last.time) + first.time);

    return {
      time: hour,
      sunColor: this.lerpColor(last.sunColor, first.sunColor, t),
      skyColor: this.lerpColor(last.skyColor, first.skyColor, t),
      ambientIntensity: THREE.MathUtils.lerp(last.ambientIntensity, first.ambientIntensity, t),
      directionalIntensity: THREE.MathUtils.lerp(last.directionalIntensity, first.directionalIntensity, t)
    };
  }

  private lerpColor(color1: number, color2: number, t: number): number {
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    return c1.lerp(c2, t).getHex();
  }

  private updateSky(hour: number): void {
    if (!this.sky) return;

    const phase = this.getCurrentLightingPhase(hour);
    const material = this.sky.material as THREE.ShaderMaterial;

    material.uniforms.topColor.value.setHex(phase.skyColor);

    // Bottom color (horizon)
    const horizonColor = hour >= 6 && hour <= 18
      ? 0xFFFFFF  // Daytime: white
      : 0x000033; // Nighttime: dark blue

    material.uniforms.bottomColor.value.setHex(horizonColor);
  }

  private updateCityLights(hour: number): void {
    const lightsOn = hour >= 18 || hour < 6;

    // Street lights
    this.streetLights.forEach(light => {
      light.intensity = lightsOn ? 1.5 : 0;
    });

    // Building lights (random flicker for realism)
    this.buildingLights.forEach(light => {
      if (lightsOn) {
        light.intensity = 0.5 + Math.random() * 0.5;
      } else {
        light.intensity = 0;
      }
    });

    // Mosque lights (green at night)
    this.mosqueLights.forEach(light => {
      light.intensity = lightsOn ? 2.0 : 0;
    });
  }

  private checkPrayerTimes(hour: number): void {
    const currentHour = Math.floor(hour * 10) / 10; // Round to 0.1 precision

    for (const [name, time] of Object.entries(this.PRAYER_TIMES)) {
      if (Math.abs(currentHour - time) < 0.05 && this.lastPrayerTime !== time) {
        this.lastPrayerTime = time;
        this.callToPrayer(name as keyof typeof this.PRAYER_TIMES);
      }
    }
  }

  private callToPrayer(prayerName: keyof typeof this.PRAYER_TIMES): void {
    const names = {
      fajr: 'Sabah',
      dhuhr: 'Öğle',
      asr: 'İkindi',
      maghrib: 'Akşam',
      isha: 'Yatsı'
    };

    console.log(`🕌 ${names[prayerName]} Ezanı okunuyor...`);

    // Trigger ezan audio
    // TODO: Play ezan audio file

    // Visual effect: mosque lights pulse
    this.mosqueLights.forEach((light, index) => {
      this.pulseMosqueLight(light, index * 200); // Staggered pulse
    });
  }

  private pulseMosqueLight(light: THREE.PointLight, delay: number): void {
    setTimeout(() => {
      const originalIntensity = light.intensity;
      let pulseCount = 0;
      const pulseInterval = setInterval(() => {
        light.intensity = originalIntensity + Math.sin(pulseCount * 0.5) * 0.5;
        pulseCount++;

        if (pulseCount > 20) { // Pulse for ~2 seconds
          clearInterval(pulseInterval);
          light.intensity = originalIntensity;
        }
      }, 100);
    }, delay);
  }

  
  // PUBLIC GETTERS
  

  getTimeOfDay(): number {
    return this.timeOfDay / 3600; // Return as hours (0-24)
  }

  getFormattedTime(): string {
    const totalSeconds = Math.floor(this.timeOfDay);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  isNight(): boolean {
    const hour = this.getTimeOfDay();
    return hour >= 20 || hour < 6;
  }

  isDaytime(): boolean {
    return !this.isNight();
  }
}

export default DayNightCycle;
