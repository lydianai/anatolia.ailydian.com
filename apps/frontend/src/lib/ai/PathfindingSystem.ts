/**
 * ANADOLU REALM - Advanced Pathfinding & NavMesh System
 * A* algorithm with dynamic obstacle avoidance for Istanbul streets
 */

import * as THREE from 'three';

export interface NavNode {
  id: string;
  position: THREE.Vector3;
  neighbors: string[];
  cost: number;
  walkable: boolean;
  type: 'ground' | 'stairs' | 'bridge' | 'indoor' | 'water';
}

export interface NavMesh {
  nodes: Map<string, NavNode>;
  grid: NavNode[][][]; // 3D grid for fast lookup
  gridSize: number;
  bounds: {
    min: THREE.Vector3;
    max: THREE.Vector3;
  };
}

export interface PathRequest {
  start: THREE.Vector3;
  end: THREE.Vector3;
  agentRadius: number;
  canSwim?: boolean;
  canClimb?: boolean;
}

export interface PathResult {
  success: boolean;
  path: THREE.Vector3[];
  length: number;
  cost: number;
}

class PriorityQueue<T> {
  private items: Array<{ item: T; priority: number }> = [];

  enqueue(item: T, priority: number): void {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.item;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export class PathfindingSystem {
  private navMesh: NavMesh;
  private obstacleCache: Map<string, THREE.Box3> = new Map();

  // Istanbul-specific navigation zones
  private readonly ISTANBUL_ZONES = {
    sultanahmet: { center: new THREE.Vector3(0, 0, 0), radius: 50 },
    galata: { center: new THREE.Vector3(100, 0, 100), radius: 40 },
    bosphorus: { center: new THREE.Vector3(50, 0, 200), radius: 80 },
    grandBazaar: { center: new THREE.Vector3(-50, 0, 50), radius: 30 }
  };

  constructor(worldSize: number = 500, gridSize: number = 2) {
    this.navMesh = this.generateNavMesh(worldSize, gridSize);
  }

  // Generate navigation mesh
  private generateNavMesh(worldSize: number, gridSize: number): NavMesh {
    const halfSize = worldSize / 2;
    const gridCount = Math.floor(worldSize / gridSize);

    const navMesh: NavMesh = {
      nodes: new Map(),
      grid: [],
      gridSize,
      bounds: {
        min: new THREE.Vector3(-halfSize, -10, -halfSize),
        max: new THREE.Vector3(halfSize, 100, halfSize)
      }
    };

    // Create 3D grid
    for (let x = 0; x < gridCount; x++) {
      navMesh.grid[x] = [];
      for (let y = 0; y < 10; y++) {
        // Height levels
        navMesh.grid[x][y] = [];
        for (let z = 0; z < gridCount; z++) {
          const worldX = -halfSize + x * gridSize;
          const worldY = y * 5; // 5 units per level
          const worldZ = -halfSize + z * gridSize;

          const position = new THREE.Vector3(worldX, worldY, worldZ);
          const nodeId = `${x}_${y}_${z}`;

          // Determine walkability based on Istanbul terrain
          const walkable = this.isPositionWalkable(position);
          const type = this.getTerrainType(position);

          const node: NavNode = {
            id: nodeId,
            position,
            neighbors: [],
            cost: type === 'stairs' ? 1.5 : type === 'water' ? 2.0 : 1.0,
            walkable,
            type
          };

          navMesh.nodes.set(nodeId, node);
          navMesh.grid[x][y][z] = node;

          // Connect to neighbors (8-way + vertical)
          this.connectNeighbors(node, x, y, z, navMesh);
        }
      }
    }

    return navMesh;
  }

  // Determine if position is walkable (Istanbul-specific)
  private isPositionWalkable(position: THREE.Vector3): boolean {
    // Bosphorus water area
    if (
      position.x > 40 &&
      position.x < 60 &&
      position.z > 180 &&
      position.z < 220 &&
      position.y < 1
    ) {
      return false; // Water
    }

    // Check Istanbul zones for special walkability
    for (const [name, zone] of Object.entries(this.ISTANBUL_ZONES)) {
      const distance = position.distanceTo(zone.center);
      if (distance < zone.radius) {
        // Inside zone, always walkable (streets, squares)
        return true;
      }
    }

    return position.y >= 0 && position.y < 50;
  }

  // Get terrain type
  private getTerrainType(position: THREE.Vector3): NavNode['type'] {
    // Bosphorus
    if (
      position.x > 40 &&
      position.x < 60 &&
      position.z > 180 &&
      position.z < 220
    ) {
      return 'water';
    }

    // Galata Tower area (elevated)
    const galataDistance = position.distanceTo(
      this.ISTANBUL_ZONES.galata.center
    );
    if (galataDistance < 20 && position.y > 10) {
      return 'stairs';
    }

    // Bosphorus Bridge
    if (
      position.x > 45 &&
      position.x < 55 &&
      position.z > 190 &&
      position.z < 210 &&
      position.y > 15 &&
      position.y < 25
    ) {
      return 'bridge';
    }

    // Grand Bazaar (indoor)
    const bazaarDistance = position.distanceTo(
      this.ISTANBUL_ZONES.grandBazaar.center
    );
    if (bazaarDistance < this.ISTANBUL_ZONES.grandBazaar.radius) {
      return 'indoor';
    }

    return 'ground';
  }

  // Connect node to neighbors
  private connectNeighbors(
    node: NavNode,
    x: number,
    y: number,
    z: number,
    navMesh: NavMesh
  ): void {
    const directions = [
      // Horizontal (8-way)
      { dx: 1, dy: 0, dz: 0 },
      { dx: -1, dy: 0, dz: 0 },
      { dx: 0, dy: 0, dz: 1 },
      { dx: 0, dy: 0, dz: -1 },
      { dx: 1, dy: 0, dz: 1 },
      { dx: 1, dy: 0, dz: -1 },
      { dx: -1, dy: 0, dz: 1 },
      { dx: -1, dy: 0, dz: -1 },
      // Vertical
      { dx: 0, dy: 1, dz: 0 },
      { dx: 0, dy: -1, dz: 0 }
    ];

    for (const dir of directions) {
      const nx = x + dir.dx;
      const ny = y + dir.dy;
      const nz = z + dir.dz;

      if (
        navMesh.grid[nx] &&
        navMesh.grid[nx][ny] &&
        navMesh.grid[nx][ny][nz]
      ) {
        const neighbor = navMesh.grid[nx][ny][nz];
        if (neighbor.walkable) {
          node.neighbors.push(neighbor.id);
        }
      }
    }
  }

  // A* Pathfinding
  public findPath(request: PathRequest): PathResult {
    const startNode = this.getClosestNode(request.start);
    const endNode = this.getClosestNode(request.end);

    if (!startNode || !endNode) {
      return {
        success: false,
        path: [],
        length: 0,
        cost: 0
      };
    }

    if (!startNode.walkable || !endNode.walkable) {
      return {
        success: false,
        path: [],
        length: 0,
        cost: 0
      };
    }

    const openSet = new PriorityQueue<string>();
    const cameFrom = new Map<string, string>();
    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();

    gScore.set(startNode.id, 0);
    fScore.set(
      startNode.id,
      this.heuristic(startNode.position, endNode.position)
    );
    openSet.enqueue(startNode.id, fScore.get(startNode.id)!);

    while (!openSet.isEmpty()) {
      const currentId = openSet.dequeue()!;
      const current = this.navMesh.nodes.get(currentId)!;

      // Goal reached
      if (currentId === endNode.id) {
        return this.reconstructPath(cameFrom, currentId);
      }

      // Explore neighbors
      for (const neighborId of current.neighbors) {
        const neighbor = this.navMesh.nodes.get(neighborId)!;

        // Skip if not walkable or agent can't traverse
        if (!neighbor.walkable) continue;
        if (neighbor.type === 'water' && !request.canSwim) continue;
        if (neighbor.type === 'stairs' && !request.canClimb) continue;

        const tentativeGScore =
          gScore.get(currentId)! +
          this.distance(current.position, neighbor.position) * neighbor.cost;

        if (!gScore.has(neighborId) || tentativeGScore < gScore.get(neighborId)!) {
          cameFrom.set(neighborId, currentId);
          gScore.set(neighborId, tentativeGScore);
          const f =
            tentativeGScore + this.heuristic(neighbor.position, endNode.position);
          fScore.set(neighborId, f);
          openSet.enqueue(neighborId, f);
        }
      }
    }

    // No path found
    return {
      success: false,
      path: [],
      length: 0,
      cost: 0
    };
  }

  // Reconstruct path from A*
  private reconstructPath(
    cameFrom: Map<string, string>,
    current: string
  ): PathResult {
    const path: THREE.Vector3[] = [];
    let totalCost = 0;
    let node = this.navMesh.nodes.get(current)!;
    path.push(node.position.clone());

    while (cameFrom.has(current)) {
      current = cameFrom.get(current)!;
      const prevNode = node;
      node = this.navMesh.nodes.get(current)!;
      path.unshift(node.position.clone());
      totalCost += this.distance(prevNode.position, node.position) * node.cost;
    }

    // Smooth path
    const smoothed = this.smoothPath(path);

    return {
      success: true,
      path: smoothed,
      length: smoothed.length,
      cost: totalCost
    };
  }

  // Smooth path using string pulling
  private smoothPath(path: THREE.Vector3[]): THREE.Vector3[] {
    if (path.length <= 2) return path;

    const smoothed: THREE.Vector3[] = [path[0]];
    let current = 0;

    while (current < path.length - 1) {
      let farthest = current + 1;

      // Find farthest visible point
      for (let i = current + 2; i < path.length; i++) {
        if (this.hasLineOfSight(path[current], path[i])) {
          farthest = i;
        } else {
          break;
        }
      }

      smoothed.push(path[farthest]);
      current = farthest;
    }

    return smoothed;
  }

  // Check line of sight between two points
  private hasLineOfSight(a: THREE.Vector3, b: THREE.Vector3): boolean {
    const direction = b.clone().sub(a);
    const distance = direction.length();
    direction.normalize();

    const steps = Math.ceil(distance / this.navMesh.gridSize);

    for (let i = 1; i < steps; i++) {
      const point = a.clone().add(direction.multiplyScalar(i * this.navMesh.gridSize));
      const node = this.getClosestNode(point);
      if (!node || !node.walkable) {
        return false;
      }
    }

    return true;
  }

  // Get closest walkable node to position
  private getClosestNode(position: THREE.Vector3): NavNode | null {
    const { gridSize, grid, bounds } = this.navMesh;

    // Clamp position to bounds
    const clamped = position.clone().clamp(bounds.min, bounds.max);

    const x = Math.floor((clamped.x - bounds.min.x) / gridSize);
    const y = Math.floor((clamped.y - bounds.min.y) / 5);
    const z = Math.floor((clamped.z - bounds.min.z) / gridSize);

    // Search nearby nodes for closest walkable
    const searchRadius = 5;
    let closest: NavNode | null = null;
    let closestDist = Infinity;

    for (let dx = -searchRadius; dx <= searchRadius; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        for (let dz = -searchRadius; dz <= searchRadius; dz++) {
          const nx = x + dx;
          const ny = y + dy;
          const nz = z + dz;

          if (grid[nx] && grid[nx][ny] && grid[nx][ny][nz]) {
            const node = grid[nx][ny][nz];
            if (node.walkable) {
              const dist = node.position.distanceTo(position);
              if (dist < closestDist) {
                closest = node;
                closestDist = dist;
              }
            }
          }
        }
      }
    }

    return closest;
  }

  // Heuristic (Euclidean distance)
  private heuristic(a: THREE.Vector3, b: THREE.Vector3): number {
    return a.distanceTo(b);
  }

  // Actual distance
  private distance(a: THREE.Vector3, b: THREE.Vector3): number {
    return a.distanceTo(b);
  }

  // Add dynamic obstacle
  public addObstacle(id: string, bounds: THREE.Box3): void {
    this.obstacleCache.set(id, bounds);

    // Mark nodes as unwalkable
    this.navMesh.nodes.forEach(node => {
      if (bounds.containsPoint(node.position)) {
        node.walkable = false;
      }
    });
  }

  // Remove dynamic obstacle
  public removeObstacle(id: string): void {
    const bounds = this.obstacleCache.get(id);
    if (!bounds) return;

    // Re-evaluate walkability
    this.navMesh.nodes.forEach(node => {
      if (bounds.containsPoint(node.position)) {
        node.walkable = this.isPositionWalkable(node.position);
      }
    });

    this.obstacleCache.delete(id);
  }

  // Get NavMesh for debugging/visualization
  public getNavMesh(): NavMesh {
    return this.navMesh;
  }
}
