/**
 * ANADOLU REALM - Advanced Graphics Engine
 * PS5-Quality PBR Rendering with Post-Processing
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';

export interface GraphicsSettings {
  enablePBR: boolean;
  enablePostProcessing: boolean;
  enableShadows: boolean;
  shadowMapSize: number;
  enableBloom: boolean;
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  enableSSAO: boolean;
  ssaoRadius: number;
  ssaoIntensity: number;
  antialiasing: boolean;
  pixelRatio: number;
  maxPixelRatio: number;
}

export interface LightConfig {
  type: 'directional' | 'point' | 'spot' | 'area' | 'hemisphere';
  color: number;
  intensity: number;
  position?: THREE.Vector3;
  target?: THREE.Vector3;
  castShadow?: boolean;
  shadowMapSize?: number;
  distance?: number;
  angle?: number;
  penumbra?: number;
}

export interface PBRMaterialConfig {
  baseColor: THREE.Color;
  metalness: number;
  roughness: number;
  normalMap?: THREE.Texture;
  roughnessMap?: THREE.Texture;
  metalnessMap?: THREE.Texture;
  aoMap?: THREE.Texture;
  emissive?: THREE.Color;
  emissiveIntensity?: number;
  envMapIntensity?: number;
}

export class GraphicsEngine {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private composer: EffectComposer | null = null;
  private settings: GraphicsSettings;
  private envMap: THREE.CubeTexture | null = null;
  private pmremGenerator: THREE.PMREMGenerator;
  private lights: Map<string, THREE.Light> = new Map();

  // Istanbul/Turkish environment settings
  private readonly ISTANBUL_SKY_COLORS = {
    morning: { sky: 0xffd4a3, horizon: 0xff9e5a, ground: 0x8b7355 },
    noon: { sky: 0x87ceeb, horizon: 0xb0d4ff, ground: 0xa88e6f },
    evening: { sky: 0xff6b35, horizon: 0xffa07a, ground: 0x6b5b4f },
    night: { sky: 0x0d1b2a, horizon: 0x1b263b, ground: 0x1a1a1a }
  };

  constructor(
    canvas: HTMLCanvasElement,
    settings: Partial<GraphicsSettings> = {}
  ) {
    this.settings = {
      enablePBR: true,
      enablePostProcessing: true,
      enableShadows: true,
      shadowMapSize: 2048,
      enableBloom: true,
      bloomStrength: 1.5,
      bloomRadius: 0.4,
      bloomThreshold: 0.85,
      enableSSAO: true,
      ssaoRadius: 0.5,
      ssaoIntensity: 0.5,
      antialiasing: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      maxPixelRatio: 2,
      ...settings
    };

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: this.settings.antialiasing,
      alpha: true,
      powerPreference: 'high-performance'
    });

    this.renderer.setPixelRatio(this.settings.pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Enable shadows
    if (this.settings.enableShadows) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 10);

    // PMREM Generator for environment maps
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();

    // Initialize post-processing
    if (this.settings.enablePostProcessing) {
      this.initPostProcessing();
    }

    // Setup Istanbul-themed environment
    this.setupIstanbulEnvironment('noon');

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  // Initialize post-processing pipeline
  private initPostProcessing(): void {
    this.composer = new EffectComposer(this.renderer);

    // Render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // Bloom pass
    if (this.settings.enableBloom) {
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        this.settings.bloomStrength,
        this.settings.bloomRadius,
        this.settings.bloomThreshold
      );
      this.composer.addPass(bloomPass);
    }

    // SSAO pass
    if (this.settings.enableSSAO) {
      const ssaoPass = new SSAOPass(
        this.scene,
        this.camera,
        window.innerWidth,
        window.innerHeight
      );
      ssaoPass.kernelRadius = this.settings.ssaoRadius;
      ssaoPass.minDistance = 0.005;
      ssaoPass.maxDistance = 0.1;
      this.composer.addPass(ssaoPass);
    }
  }

  // Setup Istanbul-themed environment lighting
  private setupIstanbulEnvironment(timeOfDay: 'morning' | 'noon' | 'evening' | 'night'): void {
    const colors = this.ISTANBUL_SKY_COLORS[timeOfDay];

    // Hemisphere light (sky/ground)
    const hemiLight = new THREE.HemisphereLight(
      colors.sky,
      colors.ground,
      timeOfDay === 'night' ? 0.3 : 0.6
    );
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);
    this.lights.set('hemisphere', hemiLight);

    // Directional light (sun/moon)
    const dirLight = new THREE.DirectionalLight(
      timeOfDay === 'night' ? 0x8888ff : 0xffffff,
      timeOfDay === 'night' ? 0.2 : 1.0
    );

    // Sun position based on time of day
    const sunPositions = {
      morning: { x: -50, y: 30, z: 0 },
      noon: { x: 0, y: 50, z: 0 },
      evening: { x: 50, y: 30, z: 0 },
      night: { x: 0, y: 40, z: 50 }
    };

    const pos = sunPositions[timeOfDay];
    dirLight.position.set(pos.x, pos.y, pos.z);
    dirLight.castShadow = this.settings.enableShadows;

    if (this.settings.enableShadows) {
      dirLight.shadow.mapSize.width = this.settings.shadowMapSize;
      dirLight.shadow.mapSize.height = this.settings.shadowMapSize;
      dirLight.shadow.camera.near = 0.5;
      dirLight.shadow.camera.far = 500;
      dirLight.shadow.camera.left = -50;
      dirLight.shadow.camera.right = 50;
      dirLight.shadow.camera.top = 50;
      dirLight.shadow.camera.bottom = -50;
      dirLight.shadow.bias = -0.0001;
    }

    this.scene.add(dirLight);
    this.lights.set('directional', dirLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      timeOfDay === 'night' ? 0.1 : 0.3
    );
    this.scene.add(ambientLight);
    this.lights.set('ambient', ambientLight);

    // Update fog based on time
    const fogDensity = {
      morning: 0.001,
      noon: 0.0005,
      evening: 0.0015,
      night: 0.003
    };
    this.scene.fog = new THREE.FogExp2(colors.horizon, fogDensity[timeOfDay]);
  }

  // Create PBR material
  public createPBRMaterial(config: PBRMaterialConfig): THREE.MeshStandardMaterial {
    const material = new THREE.MeshStandardMaterial({
      color: config.baseColor,
      metalness: config.metalness,
      roughness: config.roughness,
      normalMap: config.normalMap,
      roughnessMap: config.roughnessMap,
      metalnessMap: config.metalnessMap,
      aoMap: config.aoMap,
      emissive: config.emissive || new THREE.Color(0x000000),
      emissiveIntensity: config.emissiveIntensity || 0,
      envMap: this.envMap,
      envMapIntensity: config.envMapIntensity || 1.0
    });

    return material;
  }

  // Add light to scene
  public addLight(id: string, config: LightConfig): THREE.Light {
    let light: THREE.Light;

    switch (config.type) {
      case 'directional':
        light = new THREE.DirectionalLight(config.color, config.intensity);
        if (config.position) light.position.copy(config.position);
        if (config.castShadow) {
          light.castShadow = true;
          (light as THREE.DirectionalLight).shadow.mapSize.width = config.shadowMapSize || 1024;
          (light as THREE.DirectionalLight).shadow.mapSize.height = config.shadowMapSize || 1024;
        }
        break;

      case 'point':
        light = new THREE.PointLight(config.color, config.intensity, config.distance || 100);
        if (config.position) light.position.copy(config.position);
        if (config.castShadow) light.castShadow = true;
        break;

      case 'spot':
        light = new THREE.SpotLight(
          config.color,
          config.intensity,
          config.distance || 100,
          config.angle || Math.PI / 4,
          config.penumbra || 0
        );
        if (config.position) light.position.copy(config.position);
        if (config.castShadow) light.castShadow = true;
        break;

      case 'hemisphere':
        light = new THREE.HemisphereLight(config.color, 0x000000, config.intensity);
        if (config.position) light.position.copy(config.position);
        break;

      default:
        light = new THREE.AmbientLight(config.color, config.intensity);
    }

    this.scene.add(light);
    this.lights.set(id, light);
    return light;
  }

  // Remove light
  public removeLight(id: string): void {
    const light = this.lights.get(id);
    if (light) {
      this.scene.remove(light);
      this.lights.delete(id);
    }
  }

  // Add mesh to scene
  public addMesh(mesh: THREE.Mesh): void {
    if (this.settings.enableShadows) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
    this.scene.add(mesh);
  }

  // Remove mesh from scene
  public removeMesh(mesh: THREE.Mesh): void {
    this.scene.remove(mesh);
  }

  // Update time of day
  public setTimeOfDay(timeOfDay: 'morning' | 'noon' | 'evening' | 'night'): void {
    // Remove old lights
    this.lights.forEach((light, id) => {
      if (['hemisphere', 'directional', 'ambient'].includes(id)) {
        this.scene.remove(light);
      }
    });
    this.lights.clear();

    // Setup new environment
    this.setupIstanbulEnvironment(timeOfDay);
  }

  // Render frame
  public render(): void {
    if (this.composer && this.settings.enablePostProcessing) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  // Handle window resize
  private handleResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);

    if (this.composer) {
      this.composer.setSize(width, height);
    }
  }

  // Update graphics settings
  public updateSettings(newSettings: Partial<GraphicsSettings>): void {
    this.settings = { ...this.settings, ...newSettings };

    // Reinitialize if needed
    if (newSettings.enablePostProcessing !== undefined) {
      if (newSettings.enablePostProcessing && !this.composer) {
        this.initPostProcessing();
      } else if (!newSettings.enablePostProcessing && this.composer) {
        this.composer = null;
      }
    }

    if (newSettings.enableShadows !== undefined) {
      this.renderer.shadowMap.enabled = newSettings.enableShadows;
    }
  }

  // Getters
  public getScene(): THREE.Scene {
    return this.scene;
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  public getSettings(): GraphicsSettings {
    return { ...this.settings };
  }

  // Cleanup
  public dispose(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.renderer.dispose();
    this.pmremGenerator.dispose();
    if (this.composer) {
      this.composer.dispose();
    }
  }
}
