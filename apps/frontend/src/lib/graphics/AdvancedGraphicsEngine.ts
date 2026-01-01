/**
 * ANADOLU REALM - Advanced Graphics Engine
 * PBR Rendering, Global Illumination, Post-Processing Effects
 * AI-Powered by AILYDIAN Orchestrator
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

export class AdvancedGraphicsEngine {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private composer: EffectComposer;

  // Post-processing passes
  private bloomPass: UnrealBloomPass;
  private ssaoPass: SSAOPass;
  private fxaaPass: ShaderPass;

  // PBR Environment
  private envMap: THREE.CubeTexture | null = null;
  private pmremGenerator: THREE.PMREMGenerator;

  // Quality settings
  private qualityLevel: 'low' | 'medium' | 'high' | 'ultra' = 'high';

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.setupRenderer();
    this.pmremGenerator = new THREE.PMREMGenerator(renderer);

    this.composer = new EffectComposer(renderer);
    this.setupPostProcessing();

    console.log('🎨 Advanced Graphics Engine initialized');
  }

  private setupRenderer(): void {
    // Enable advanced features
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.physicallyCorrectLights = true;

    // Enable extensions
    const gl = this.renderer.getContext();
    if (gl.getExtension('EXT_color_buffer_float')) {
      console.log('✅ Float textures supported');
    }
  }

  private setupPostProcessing(): void {
    // 1. Base render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // 2. SSAO (Screen Space Ambient Occlusion)
    this.ssaoPass = new SSAOPass(
      this.scene,
      this.camera,
      window.innerWidth,
      window.innerHeight
    );
    this.ssaoPass.kernelRadius = 16;
    this.ssaoPass.minDistance = 0.005;
    this.ssaoPass.maxDistance = 0.1;
    this.composer.addPass(this.ssaoPass);

    // 3. Bloom
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,   // strength
      0.4,   // radius
      0.85   // threshold
    );
    this.composer.addPass(this.bloomPass);

    // 4. FXAA (Anti-aliasing)
    this.fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = this.renderer.getPixelRatio();
    this.fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio);
    this.fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio);
    this.composer.addPass(this.fxaaPass);

    console.log('✅ Post-processing pipeline ready');
  }

  
  // PBR MATERIAL CREATION
  

  createPBRMaterial(config: {
    color?: number;
    metalness?: number;
    roughness?: number;
    normalMap?: THREE.Texture;
    roughnessMap?: THREE.Texture;
    metalnessMap?: THREE.Texture;
    aoMap?: THREE.Texture;
    emissive?: number;
    emissiveIntensity?: number;
  }): THREE.MeshStandardMaterial {
    const material = new THREE.MeshStandardMaterial({
      color: config.color || 0xffffff,
      metalness: config.metalness || 0.0,
      roughness: config.roughness || 0.5,
      normalMap: config.normalMap,
      roughnessMap: config.roughnessMap,
      metalnessMap: config.metalnessMap,
      aoMap: config.aoMap,
      emissive: config.emissive ? new THREE.Color(config.emissive) : undefined,
      emissiveIntensity: config.emissiveIntensity || 0,
      envMapIntensity: 1.0
    });

    if (this.envMap) {
      material.envMap = this.envMap;
    }

    return material;
  }

  
  // ENVIRONMENT MAP (IBL - Image Based Lighting)
  

  async loadEnvironmentMap(path: string): Promise<void> {
    const loader = new THREE.CubeTextureLoader();

    const urls = [
      `${path}/px.png`, `${path}/nx.png`,
      `${path}/py.png`, `${path}/ny.png`,
      `${path}/pz.png`, `${path}/nz.png`
    ];

    this.envMap = await loader.loadAsync(urls);
    this.envMap.encoding = THREE.sRGBEncoding;

    // Generate PMREM for PBR
    const pmremTexture = this.pmremGenerator.fromCubemap(this.envMap);
    this.scene.environment = pmremTexture.texture;

    console.log('✅ Environment map loaded');
  }

  createProceduralSky(): void {
    // Procedural sky gradient
    const skyGeo = new THREE.SphereGeometry(500, 32, 32);
    const skyMat = new THREE.ShaderMaterial({
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

    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(sky);
  }

  
  // QUALITY SETTINGS
  

  setQualityLevel(level: 'low' | 'medium' | 'high' | 'ultra'): void {
    this.qualityLevel = level;

    const settings = {
      low: {
        shadowMapSize: 512,
        bloomStrength: 0.5,
        ssaoSamples: 8,
        pixelRatio: 1
      },
      medium: {
        shadowMapSize: 1024,
        bloomStrength: 1.0,
        ssaoSamples: 16,
        pixelRatio: 1
      },
      high: {
        shadowMapSize: 2048,
        bloomStrength: 1.5,
        ssaoSamples: 32,
        pixelRatio: window.devicePixelRatio
      },
      ultra: {
        shadowMapSize: 4096,
        bloomStrength: 2.0,
        ssaoSamples: 64,
        pixelRatio: window.devicePixelRatio
      }
    };

    const config = settings[level];

    // Update shadow quality
    this.renderer.shadowMap.enabled = level !== 'low';
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Light && obj.shadow) {
        obj.shadow.mapSize.width = config.shadowMapSize;
        obj.shadow.mapSize.height = config.shadowMapSize;
        obj.shadow.needsUpdate = true;
      }
    });

    // Update bloom
    this.bloomPass.strength = config.bloomStrength;

    // Update SSAO
    this.ssaoPass.kernelSize = config.ssaoSamples;

    // Update pixel ratio
    this.renderer.setPixelRatio(config.pixelRatio);

    console.log(`🎨 Graphics quality set to: ${level}`);
  }

  
  // LIGHTING PRESETS
  

  setupIstanbulLighting(): void {
    // Sun light (main directional)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(50, 100, 50);
    sunLight.castShadow = true;
    sunLight.shadow.camera.left = -100;
    sunLight.shadow.camera.right = 100;
    sunLight.shadow.camera.top = 100;
    sunLight.shadow.camera.bottom = -100;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 500;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    this.scene.add(sunLight);

    // Ambient light (soft fill)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);

    // Hemisphere light (sky + ground)
    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x8B7355, 0.3);
    this.scene.add(hemiLight);

    console.log('☀️ Istanbul lighting setup complete');
  }

  
  // VOLUMETRIC FOG
  

  addVolumetricFog(config: {
    color?: number;
    density?: number;
    height?: number;
  }): void {
    const fogColor = config.color || 0xcccccc;
    const fogDensity = config.density || 0.001;

    this.scene.fog = new THREE.FogExp2(fogColor, fogDensity);

    // Volumetric fog shader (advanced)
    const volumetricFogShader = {
      uniforms: {
        fogColor: { value: new THREE.Color(fogColor) },
        fogDensity: { value: fogDensity },
        fogHeight: { value: config.height || 50 }
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
        uniform vec3 fogColor;
        uniform float fogDensity;
        uniform float fogHeight;
        varying vec3 vWorldPosition;

        void main() {
          float fogFactor = exp(-fogDensity * abs(vWorldPosition.y - fogHeight));
          gl_FragColor = vec4(fogColor, 1.0 - fogFactor);
        }
      `
    };

    // Add fog plane
    const fogGeometry = new THREE.PlaneGeometry(1000, 1000);
    const fogMaterial = new THREE.ShaderMaterial(volumetricFogShader);
    fogMaterial.transparent = true;
    fogMaterial.depthWrite = false;

    const fogMesh = new THREE.Mesh(fogGeometry, fogMaterial);
    fogMesh.rotation.x = -Math.PI / 2;
    fogMesh.position.y = config.height || 50;
    this.scene.add(fogMesh);
  }

  
  // RENDER
  

  render(): void {
    this.composer.render();
  }

  // Handle window resize
  onWindowResize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);

    // Update FXAA resolution
    const pixelRatio = this.renderer.getPixelRatio();
    this.fxaaPass.material.uniforms['resolution'].value.x = 1 / (width * pixelRatio);
    this.fxaaPass.material.uniforms['resolution'].value.y = 1 / (height * pixelRatio);

    console.log(`📐 Resize: ${width}x${height}`);
  }

  
  // MATERIAL PRESETS (Turkish Architecture)
  

  getMaterialPreset(type: 'stone' | 'wood' | 'metal' | 'ceramic' | 'fabric'): THREE.MeshStandardMaterial {
    const presets = {
      stone: {
        color: 0xcccccc,
        metalness: 0.0,
        roughness: 0.9
      },
      wood: {
        color: 0x8B4513,
        metalness: 0.0,
        roughness: 0.7
      },
      metal: {
        color: 0x888888,
        metalness: 1.0,
        roughness: 0.3
      },
      ceramic: {
        color: 0xffffff,
        metalness: 0.0,
        roughness: 0.2
      },
      fabric: {
        color: 0xff0000,
        metalness: 0.0,
        roughness: 0.8
      }
    };

    return this.createPBRMaterial(presets[type]);
  }

  
  // DEBUG & STATS
  

  getStats(): {
    triangles: number;
    drawCalls: number;
    textures: number;
    geometries: number;
  } {
    return {
      triangles: this.renderer.info.render.triangles,
      drawCalls: this.renderer.info.render.calls,
      textures: this.renderer.info.memory.textures,
      geometries: this.renderer.info.memory.geometries
    };
  }

  logPerformance(): void {
    const stats = this.getStats();
    console.log('📊 Graphics Performance:');
    console.log(`  Triangles: ${stats.triangles.toLocaleString()}`);
    console.log(`  Draw Calls: ${stats.drawCalls}`);
    console.log(`  Textures: ${stats.textures}`);
    console.log(`  Geometries: ${stats.geometries}`);
  }
}

export default AdvancedGraphicsEngine;
