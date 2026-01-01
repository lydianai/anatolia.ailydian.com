/**
 * ANADOLU REALM - Performance Optimization System
 * 60 FPS Guarantee, Occlusion Culling, Texture Streaming, Draw Call Optimization
 * AI-Powered by AILYDIAN Orchestrator
 */

import * as THREE from 'three';

// PERFORMANCE ENUMS & INTERFACES

export enum PerformanceProfile {
  ULTRA = 'ultra',       // High-end PC
  HIGH = 'high',         // Mid-range PC
  MEDIUM = 'medium',     // Low-end PC / High-end mobile
  LOW = 'low',           // Mobile
  POTATO = 'potato'      // Very low-end
}

export interface PerformanceMetrics {
  fps: number;
  frameTime: number;      // ms
  drawCalls: number;
  triangles: number;
  textures: number;
  geometries: number;
  programs: number;
  memoryUsage: number;    // MB
  gpuMemoryUsage: number; // MB (estimated)
}

export interface OptimizationConfig {
  profile: PerformanceProfile;

  // Graphics
  maxDrawDistance: number;
  shadowQuality: 'off' | 'low' | 'medium' | 'high';
  textureQuality: 'low' | 'medium' | 'high';
  antialiasing: boolean;
  postProcessing: boolean;
  particleCount: number;

  // LOD
  lodBias: number;        // 0-1 (higher = more aggressive LOD)

  // Culling
  frustumCulling: boolean;
  occlusionCulling: boolean;

  // Streaming
  textureStreaming: boolean;
  meshStreaming: boolean;
}

export interface LODLevel {
  distance: number;
  mesh: THREE.Mesh;
}

export interface StreamedAsset {
  id: string;
  url: string;
  type: 'texture' | 'mesh' | 'audio';
  priority: number;
  loaded: boolean;
  size: number;           // bytes
}

// PERFORMANCE OPTIMIZATION SYSTEM

export class PerformanceOptimization {
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;

  // Current config
  private config: OptimizationConfig;
  private currentProfile: PerformanceProfile;

  // Metrics
  private metrics: PerformanceMetrics = {
    fps: 60,
    frameTime: 16.67,
    drawCalls: 0,
    triangles: 0,
    textures: 0,
    geometries: 0,
    programs: 0,
    memoryUsage: 0,
    gpuMemoryUsage: 0
  };

  // FPS monitoring
  private frameCount: number = 0;
  private lastFPSUpdate: number = 0;
  private frameTimes: number[] = [];
  private readonly FPS_SAMPLE_SIZE = 60;

  // Object pooling
  private objectPools: Map<string, THREE.Object3D[]> = new Map();

  // Geometry merging
  private mergedGeometries: Map<string, THREE.BufferGeometry> = new Map();
  private instancedMeshes: Map<string, THREE.InstancedMesh> = new Map();

  // Texture atlas
  private textureAtlases: Map<string, THREE.Texture> = new Map();

  // Occlusion culling
  private occluders: THREE.Mesh[] = [];
  private occlusionQueries: Map<string, boolean> = new Map();

  // Streaming
  private streamQueue: StreamedAsset[] = [];
  private readonly MAX_CONCURRENT_LOADS = 3;
  private activeLoads: number = 0;

  // Auto-adjustment
  private autoAdjust: boolean = true;
  private targetFPS: number = 60;
  private adjustmentCooldown: number = 0;

  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer
  ) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    // Detect hardware and set initial profile
    this.currentProfile = this.detectHardwareProfile();
    this.config = this.getConfigForProfile(this.currentProfile);

    this.applyConfiguration();

    console.log('⚡ Performance Optimization System initialized');
    console.log(`📊 Profile: ${this.currentProfile}`);
  }

  
  // HARDWARE DETECTION
  

  private detectHardwareProfile(): PerformanceProfile {
    const gl = this.renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

    let score = 100; // Start at 100

    // GPU Detection
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      console.log(`🎮 GPU: ${renderer}`);

      // High-end GPUs
      if (renderer.includes('RTX') || renderer.includes('RX 6')) {
        score += 50;
      }
      // Mid-range GPUs
      else if (renderer.includes('GTX 16') || renderer.includes('RX 5')) {
        score += 20;
      }
      // Integrated GPUs
      else if (renderer.includes('Intel') || renderer.includes('Iris')) {
        score -= 30;
      }
    }

    // Memory
    const memory = (performance as any).memory;
    if (memory) {
      const totalMemoryMB = memory.jsHeapSizeLimit / (1024 * 1024);
      if (totalMemoryMB > 4000) score += 20;
      else if (totalMemoryMB < 2000) score -= 20;
    }

    // CPU cores
    const cores = navigator.hardwareConcurrency || 4;
    if (cores >= 8) score += 10;
    else if (cores <= 2) score -= 20;

    // Mobile detection
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) score -= 40;

    // Determine profile
    if (score >= 150) return PerformanceProfile.ULTRA;
    if (score >= 100) return PerformanceProfile.HIGH;
    if (score >= 50) return PerformanceProfile.MEDIUM;
    if (score >= 0) return PerformanceProfile.LOW;
    return PerformanceProfile.POTATO;
  }

  private getConfigForProfile(profile: PerformanceProfile): OptimizationConfig {
    const configs: Record<PerformanceProfile, OptimizationConfig> = {
      [PerformanceProfile.ULTRA]: {
        profile,
        maxDrawDistance: 500,
        shadowQuality: 'high',
        textureQuality: 'high',
        antialiasing: true,
        postProcessing: true,
        particleCount: 10000,
        lodBias: 0.0,
        frustumCulling: true,
        occlusionCulling: true,
        textureStreaming: true,
        meshStreaming: true
      },
      [PerformanceProfile.HIGH]: {
        profile,
        maxDrawDistance: 300,
        shadowQuality: 'medium',
        textureQuality: 'high',
        antialiasing: true,
        postProcessing: true,
        particleCount: 5000,
        lodBias: 0.2,
        frustumCulling: true,
        occlusionCulling: true,
        textureStreaming: true,
        meshStreaming: true
      },
      [PerformanceProfile.MEDIUM]: {
        profile,
        maxDrawDistance: 200,
        shadowQuality: 'low',
        textureQuality: 'medium',
        antialiasing: false,
        postProcessing: false,
        particleCount: 2000,
        lodBias: 0.4,
        frustumCulling: true,
        occlusionCulling: true,
        textureStreaming: true,
        meshStreaming: true
      },
      [PerformanceProfile.LOW]: {
        profile,
        maxDrawDistance: 100,
        shadowQuality: 'off',
        textureQuality: 'low',
        antialiasing: false,
        postProcessing: false,
        particleCount: 500,
        lodBias: 0.6,
        frustumCulling: true,
        occlusionCulling: false,
        textureStreaming: true,
        meshStreaming: true
      },
      [PerformanceProfile.POTATO]: {
        profile,
        maxDrawDistance: 50,
        shadowQuality: 'off',
        textureQuality: 'low',
        antialiasing: false,
        postProcessing: false,
        particleCount: 100,
        lodBias: 0.8,
        frustumCulling: true,
        occlusionCulling: false,
        textureStreaming: true,
        meshStreaming: false
      }
    };

    return configs[profile];
  }

  private applyConfiguration(): void {
    // Apply shadow quality
    this.renderer.shadowMap.enabled = this.config.shadowQuality !== 'off';

    if (this.config.shadowQuality === 'high') {
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } else if (this.config.shadowQuality === 'medium') {
      this.renderer.shadowMap.type = THREE.PCFShadowMap;
    } else {
      this.renderer.shadowMap.type = THREE.BasicShadowMap;
    }

    // Pixel ratio
    const pixelRatio = this.config.profile === PerformanceProfile.ULTRA ||
                       this.config.profile === PerformanceProfile.HIGH
                       ? window.devicePixelRatio
                       : 1;
    this.renderer.setPixelRatio(pixelRatio);

    console.log(`⚙️ Configuration applied: ${this.config.profile}`);
  }

  
  // FPS MONITORING & AUTO-ADJUSTMENT
  

  updateFPS(deltaTime: number): void {
    this.frameCount++;
    this.frameTimes.push(deltaTime * 1000); // Convert to ms

    // Keep only last N samples
    if (this.frameTimes.length > this.FPS_SAMPLE_SIZE) {
      this.frameTimes.shift();
    }

    const now = performance.now();
    if (now - this.lastFPSUpdate >= 1000) {
      // Calculate average FPS
      const avgFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
      this.metrics.fps = 1000 / avgFrameTime;
      this.metrics.frameTime = avgFrameTime;

      this.frameCount = 0;
      this.lastFPSUpdate = now;

      // Auto-adjust quality if enabled
      if (this.autoAdjust && this.adjustmentCooldown <= 0) {
        this.autoAdjustQuality();
      }
    }

    if (this.adjustmentCooldown > 0) {
      this.adjustmentCooldown -= deltaTime;
    }
  }

  private autoAdjustQuality(): void {
    const fps = this.metrics.fps;

    // If FPS is too low, decrease quality
    if (fps < this.targetFPS - 10) {
      if (this.currentProfile === PerformanceProfile.ULTRA) {
        this.setProfile(PerformanceProfile.HIGH);
      } else if (this.currentProfile === PerformanceProfile.HIGH) {
        this.setProfile(PerformanceProfile.MEDIUM);
      } else if (this.currentProfile === PerformanceProfile.MEDIUM) {
        this.setProfile(PerformanceProfile.LOW);
      }
      console.log(`📉 Quality reduced to ${this.currentProfile} (FPS: ${fps.toFixed(1)})`);
    }
    // If FPS is consistently high, increase quality
    else if (fps > this.targetFPS + 10) {
      if (this.currentProfile === PerformanceProfile.LOW) {
        this.setProfile(PerformanceProfile.MEDIUM);
      } else if (this.currentProfile === PerformanceProfile.MEDIUM) {
        this.setProfile(PerformanceProfile.HIGH);
      } else if (this.currentProfile === PerformanceProfile.HIGH) {
        this.setProfile(PerformanceProfile.ULTRA);
      }
      console.log(`📈 Quality increased to ${this.currentProfile} (FPS: ${fps.toFixed(1)})`);
    }

    // Cooldown to prevent rapid changes
    this.adjustmentCooldown = 5; // 5 seconds
  }

  setProfile(profile: PerformanceProfile): void {
    this.currentProfile = profile;
    this.config = this.getConfigForProfile(profile);
    this.applyConfiguration();
  }

  
  // DRAW CALL OPTIMIZATION (Geometry Merging)
  

  mergeGeometries(objects: THREE.Mesh[], materialId: string): THREE.Mesh {
    const geometries: THREE.BufferGeometry[] = [];

    objects.forEach(obj => {
      const clonedGeometry = obj.geometry.clone();
      clonedGeometry.applyMatrix4(obj.matrixWorld);
      geometries.push(clonedGeometry);
    });

    const mergedGeometry = THREE.BufferGeometryUtils.mergeGeometries(geometries);
    const material = objects[0].material;

    const mergedMesh = new THREE.Mesh(mergedGeometry, material);
    this.mergedGeometries.set(materialId, mergedGeometry);

    console.log(`🔗 Merged ${objects.length} objects into 1 draw call`);

    return mergedMesh;
  }

  
  // INSTANCED RENDERING
  

  createInstancedMesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    count: number,
    positions: THREE.Vector3[]
  ): THREE.InstancedMesh {
    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);

    const matrix = new THREE.Matrix4();

    positions.forEach((position, i) => {
      matrix.setPosition(position);
      instancedMesh.setMatrixAt(i, matrix);
    });

    instancedMesh.instanceMatrix.needsUpdate = true;

    console.log(`📦 Created instanced mesh with ${count} instances`);

    return instancedMesh;
  }

  
  // FRUSTUM CULLING (Enhanced)
  

  performFrustumCulling(): void {
    if (!this.config.frustumCulling) return;

    const frustum = new THREE.Frustum();
    const projScreenMatrix = new THREE.Matrix4();

    projScreenMatrix.multiplyMatrices(
      (this.camera as THREE.PerspectiveCamera).projectionMatrix,
      (this.camera as THREE.PerspectiveCamera).matrixWorldInverse
    );

    frustum.setFromProjectionMatrix(projScreenMatrix);

    let culledCount = 0;

    this.scene.traverse(object => {
      if (object instanceof THREE.Mesh) {
        // Check if object is in frustum
        if (!frustum.intersectsObject(object)) {
          object.visible = false;
          culledCount++;
        } else {
          object.visible = true;
        }
      }
    });

    // console.log(`👁️ Frustum culling: ${culledCount} objects culled`);
  }

  
  // OCCLUSION CULLING
  

  performOcclusionCulling(cameraPosition: THREE.Vector3): void {
    if (!this.config.occlusionCulling) return;

    const raycaster = new THREE.Raycaster();

    this.scene.traverse(object => {
      if (object instanceof THREE.Mesh && object.visible) {
        // Ray from camera to object
        const direction = new THREE.Vector3()
          .subVectors(object.position, cameraPosition)
          .normalize();

        raycaster.set(cameraPosition, direction);

        const intersects = raycaster.intersectObjects(this.occluders, true);

        // If something is between camera and object, occlude it
        if (intersects.length > 0) {
          const firstHit = intersects[0];
          const distanceToObject = cameraPosition.distanceTo(object.position);

          if (firstHit.distance < distanceToObject - 1) {
            object.visible = false;
          }
        }
      }
    });
  }

  addOccluder(mesh: THREE.Mesh): void {
    this.occluders.push(mesh);
  }

  
  // TEXTURE STREAMING
  

  streamTexture(url: string, priority: number = 0): Promise<THREE.Texture> {
    return new Promise((resolve) => {
      const asset: StreamedAsset = {
        id: url,
        url,
        type: 'texture',
        priority,
        loaded: false,
        size: 0
      };

      this.streamQueue.push(asset);
      this.streamQueue.sort((a, b) => b.priority - a.priority);

      this.processStreamQueue();

      // Return placeholder texture immediately
      const loader = new THREE.TextureLoader();
      loader.load(url, (texture) => {
        asset.loaded = true;
        resolve(texture);
      });
    });
  }

  private processStreamQueue(): void {
    if (this.activeLoads >= this.MAX_CONCURRENT_LOADS) return;

    const asset = this.streamQueue.shift();
    if (!asset) return;

    this.activeLoads++;

    // Load asset
    if (asset.type === 'texture') {
      const loader = new THREE.TextureLoader();
      loader.load(
        asset.url,
        () => {
          asset.loaded = true;
          this.activeLoads--;
          this.processStreamQueue();
        },
        undefined,
        () => {
          this.activeLoads--;
          this.processStreamQueue();
        }
      );
    }
  }

  
  // OBJECT POOLING
  

  createPool(name: string, factory: () => THREE.Object3D, size: number): void {
    const pool: THREE.Object3D[] = [];

    for (let i = 0; i < size; i++) {
      const obj = factory();
      obj.visible = false;
      pool.push(obj);
    }

    this.objectPools.set(name, pool);

    console.log(`🏊 Object pool created: ${name} (${size} objects)`);
  }

  getFromPool(poolName: string): THREE.Object3D | null {
    const pool = this.objectPools.get(poolName);
    if (!pool) return null;

    const obj = pool.find(o => !o.visible);
    if (obj) {
      obj.visible = true;
      return obj;
    }

    return null;
  }

  returnToPool(poolName: string, obj: THREE.Object3D): void {
    obj.visible = false;
    obj.position.set(0, 0, 0);
    obj.rotation.set(0, 0, 0);
  }

  
  // METRICS COLLECTION
  

  updateMetrics(): void {
    const info = this.renderer.info;

    this.metrics.drawCalls = info.render.calls;
    this.metrics.triangles = info.render.triangles;
    this.metrics.textures = info.memory.textures;
    this.metrics.geometries = info.memory.geometries;
    this.metrics.programs = info.programs?.length || 0;

    // Memory usage
    const memory = (performance as any).memory;
    if (memory) {
      this.metrics.memoryUsage = memory.usedJSHeapSize / (1024 * 1024);

      // Estimate GPU memory
      const textureMemory = this.metrics.textures * 2; // Rough estimate: 2MB per texture
      const geometryMemory = this.metrics.geometries * 0.5; // Rough estimate
      this.metrics.gpuMemoryUsage = textureMemory + geometryMemory;
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  logMetrics(): void {
    console.log('📊 Performance Metrics:');
    console.log(`  FPS: ${this.metrics.fps.toFixed(1)}`);
    console.log(`  Frame Time: ${this.metrics.frameTime.toFixed(2)}ms`);
    console.log(`  Draw Calls: ${this.metrics.drawCalls}`);
    console.log(`  Triangles: ${this.metrics.triangles.toLocaleString()}`);
    console.log(`  Textures: ${this.metrics.textures}`);
    console.log(`  Geometries: ${this.metrics.geometries}`);
    console.log(`  Programs: ${this.metrics.programs}`);
    console.log(`  CPU Memory: ${this.metrics.memoryUsage.toFixed(2)} MB`);
    console.log(`  GPU Memory (est): ${this.metrics.gpuMemoryUsage.toFixed(2)} MB`);
  }

  
  // TEXTURE COMPRESSION
  

  compressTextures(): void {
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const material = object.material as THREE.MeshStandardMaterial;

        if (material.map) {
          this.optimizeTexture(material.map);
        }
        if (material.normalMap) {
          this.optimizeTexture(material.normalMap);
        }
        if (material.roughnessMap) {
          this.optimizeTexture(material.roughnessMap);
        }
      }
    });
  }

  private optimizeTexture(texture: THREE.Texture): void {
    // Set appropriate filtering
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // Generate mipmaps
    texture.generateMipmaps = true;

    // Set anisotropy based on quality
    const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
    if (this.config.textureQuality === 'high') {
      texture.anisotropy = maxAnisotropy;
    } else if (this.config.textureQuality === 'medium') {
      texture.anisotropy = Math.min(4, maxAnisotropy);
    } else {
      texture.anisotropy = 1;
    }
  }

  
  // UPDATE LOOP
  

  update(deltaTime: number, cameraPosition: THREE.Vector3): void {
    // Update FPS
    this.updateFPS(deltaTime);

    // Perform culling
    this.performFrustumCulling();

    if (this.config.occlusionCulling) {
      this.performOcclusionCulling(cameraPosition);
    }

    // Update metrics
    this.updateMetrics();

    // Process stream queue
    this.processStreamQueue();
  }

  
  // UTILITIES
  

  enableAutoAdjust(enabled: boolean): void {
    this.autoAdjust = enabled;
  }

  setTargetFPS(fps: number): void {
    this.targetFPS = fps;
  }

  getCurrentProfile(): PerformanceProfile {
    return this.currentProfile;
  }

  getConfig(): OptimizationConfig {
    return { ...this.config };
  }

  
  // CLEANUP
  

  dispose(): void {
    this.objectPools.clear();
    this.mergedGeometries.forEach(geo => geo.dispose());
    this.mergedGeometries.clear();
    this.instancedMeshes.clear();
    this.textureAtlases.clear();

    console.log('⚡ Performance system disposed');
  }
}

export default PerformanceOptimization;
