import type { Vector2, PathNode, PathfindingConfig } from '../types/index.js';

/**
 * A* Pathfinding algorithm
 * For NPC movement and navigation
 */
export class PathFinding {
  private config: PathfindingConfig = {
    allowDiagonal: true,
    heuristic: 'manhattan',
    weight: 1
  };

  constructor(config?: Partial<PathfindingConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  /**
   * Find path from start to goal
   */
  findPath(
    start: Vector2,
    goal: Vector2,
    collisionMap: boolean[][],
    gridWidth: number,
    gridHeight: number
  ): Vector2[] | null {
    const startNode: PathNode = {
      x: Math.floor(start.x),
      y: Math.floor(start.y),
      g: 0,
      h: this.heuristic(start, goal),
      f: 0
    };
    startNode.f = startNode.g + startNode.h;

    const goalNode = {
      x: Math.floor(goal.x),
      y: Math.floor(goal.y)
    };

    const openList: PathNode[] = [startNode];
    const closedList: Set<string> = new Set();

    while (openList.length > 0) {
      // Get node with lowest f value
      openList.sort((a, b) => a.f - b.f);
      const currentNode = openList.shift()!;

      // Goal reached
      if (currentNode.x === goalNode.x && currentNode.y === goalNode.y) {
        return this.reconstructPath(currentNode);
      }

      closedList.add(`${currentNode.x},${currentNode.y}`);

      // Check neighbors
      const neighbors = this.getNeighbors(currentNode, gridWidth, gridHeight);

      for (const neighbor of neighbors) {
        // Skip if in closed list or collision
        if (closedList.has(`${neighbor.x},${neighbor.y}`)) continue;
        if (this.hasCollision(neighbor.x, neighbor.y, collisionMap, gridWidth, gridHeight)) continue;

        const g = currentNode.g + this.getDistance(currentNode, neighbor);
        const h = this.heuristic(neighbor, goalNode);
        const f = g + h * this.config.weight;

        // Check if neighbor is in open list
        const existingNode = openList.find(n => n.x === neighbor.x && n.y === neighbor.y);

        if (!existingNode) {
          openList.push({
            x: neighbor.x,
            y: neighbor.y,
            g,
            h,
            f,
            parent: currentNode
          });
        } else if (g < existingNode.g) {
          // Better path found
          existingNode.g = g;
          existingNode.f = f;
          existingNode.parent = currentNode;
        }
      }
    }

    // No path found
    return null;
  }

  /**
   * Get neighboring nodes
   */
  private getNeighbors(node: PathNode, width: number, height: number): Vector2[] {
    const neighbors: Vector2[] = [];

    // Cardinal directions
    const directions = [
      { x: 0, y: -1 },  // North
      { x: 1, y: 0 },   // East
      { x: 0, y: 1 },   // South
      { x: -1, y: 0 }   // West
    ];

    // Diagonal directions
    if (this.config.allowDiagonal) {
      directions.push(
        { x: 1, y: -1 },  // NE
        { x: 1, y: 1 },   // SE
        { x: -1, y: 1 },  // SW
        { x: -1, y: -1 }  // NW
      );
    }

    for (const dir of directions) {
      const x = node.x + dir.x;
      const y = node.y + dir.y;

      if (x >= 0 && x < width && y >= 0 && y < height) {
        neighbors.push({ x, y });
      }
    }

    return neighbors;
  }

  /**
   * Calculate heuristic distance
   */
  private heuristic(a: Vector2, b: Vector2): number {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);

    switch (this.config.heuristic) {
      case 'manhattan':
        return dx + dy;
      case 'euclidean':
        return Math.sqrt(dx * dx + dy * dy);
      case 'chebyshev':
        return Math.max(dx, dy);
      default:
        return dx + dy;
    }
  }

  /**
   * Get distance between two nodes
   */
  private getDistance(a: Vector2, b: Vector2): number {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);

    // Diagonal movement costs more
    if (dx === 1 && dy === 1) return 1.414; // sqrt(2)
    return 1;
  }

  /**
   * Check if position has collision
   */
  private hasCollision(
    x: number,
    y: number,
    collisionMap: boolean[][],
    width: number,
    height: number
  ): boolean {
    if (x < 0 || x >= width || y < 0 || y >= height) return true;
    return collisionMap[y] && collisionMap[y][x];
  }

  /**
   * Reconstruct path from goal to start
   */
  private reconstructPath(node: PathNode): Vector2[] {
    const path: Vector2[] = [];
    let current: PathNode | undefined = node;

    while (current) {
      path.unshift({ x: current.x, y: current.y });
      current = current.parent;
    }

    return path;
  }

  /**
   * Smooth path by removing unnecessary nodes
   */
  smoothPath(path: Vector2[], collisionMap: boolean[][], gridWidth: number, gridHeight: number): Vector2[] {
    if (path.length <= 2) return path;

    const smoothed: Vector2[] = [path[0]];
    let currentIndex = 0;

    while (currentIndex < path.length - 1) {
      let furthestIndex = currentIndex + 1;

      // Try to go as far as possible with line of sight
      for (let i = currentIndex + 2; i < path.length; i++) {
        if (this.hasLineOfSight(path[currentIndex], path[i], collisionMap, gridWidth, gridHeight)) {
          furthestIndex = i;
        } else {
          break;
        }
      }

      smoothed.push(path[furthestIndex]);
      currentIndex = furthestIndex;
    }

    return smoothed;
  }

  /**
   * Check line of sight between two points
   */
  private hasLineOfSight(
    start: Vector2,
    end: Vector2,
    collisionMap: boolean[][],
    gridWidth: number,
    gridHeight: number
  ): boolean {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.ceil(distance);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.floor(start.x + dx * t);
      const y = Math.floor(start.y + dy * t);

      if (this.hasCollision(x, y, collisionMap, gridWidth, gridHeight)) {
        return false;
      }
    }

    return true;
  }
}
