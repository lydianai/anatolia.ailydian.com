import type { Vector2, Bounds } from '../types/index.js';

/**
 * Collision detection utilities
 * AABB, circle, and tile-based collision
 */
export class CollisionDetection {
  /**
   * AABB (Axis-Aligned Bounding Box) collision
   */
  static aabb(a: Bounds, b: Bounds): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /**
   * Circle collision
   */
  static circle(
    a: { x: number; y: number; radius: number },
    b: { x: number; y: number; radius: number }
  ): boolean {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < a.radius + b.radius;
  }

  /**
   * Point in rectangle
   */
  static pointInRect(point: Vector2, rect: Bounds): boolean {
    return (
      point.x >= rect.x &&
      point.x <= rect.x + rect.width &&
      point.y >= rect.y &&
      point.y <= rect.y + rect.height
    );
  }

  /**
   * Point in circle
   */
  static pointInCircle(point: Vector2, center: Vector2, radius: number): boolean {
    const dx = point.x - center.x;
    const dy = point.y - center.y;
    return Math.sqrt(dx * dx + dy * dy) <= radius;
  }

  /**
   * Line intersection
   */
  static lineIntersection(
    a1: Vector2,
    a2: Vector2,
    b1: Vector2,
    b2: Vector2
  ): Vector2 | null {
    const dax = a2.x - a1.x;
    const day = a2.y - a1.y;
    const dbx = b2.x - b1.x;
    const dby = b2.y - b1.y;

    const det = dax * dby - day * dbx;
    if (Math.abs(det) < 0.0001) return null; // Parallel

    const dx = b1.x - a1.x;
    const dy = b1.y - a1.y;

    const t = (dx * dby - dy * dbx) / det;
    const u = (dx * day - dy * dax) / det;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: a1.x + t * dax,
        y: a1.y + t * day
      };
    }

    return null;
  }

  /**
   * Tile-based collision check
   */
  static tileCollision(
    position: Vector2,
    size: Vector2,
    tileSize: number,
    collisionMap: boolean[][]
  ): boolean {
    const startX = Math.floor(position.x / tileSize);
    const startY = Math.floor(position.y / tileSize);
    const endX = Math.floor((position.x + size.x) / tileSize);
    const endY = Math.floor((position.y + size.y) / tileSize);

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        if (y >= 0 && y < collisionMap.length && x >= 0 && x < collisionMap[0].length) {
          if (collisionMap[y][x]) return true;
        }
      }
    }

    return false;
  }

  /**
   * Resolve AABB collision
   */
  static resolveAABB(
    moving: Bounds & { velocity: Vector2 },
    static_: Bounds
  ): Vector2 {
    const overlapX = Math.min(
      moving.x + moving.width - static_.x,
      static_.x + static_.width - moving.x
    );

    const overlapY = Math.min(
      moving.y + moving.height - static_.y,
      static_.y + static_.height - moving.y
    );

    // Push back by smallest overlap
    if (overlapX < overlapY) {
      const direction = moving.x < static_.x ? -1 : 1;
      return { x: direction * overlapX, y: 0 };
    } else {
      const direction = moving.y < static_.y ? -1 : 1;
      return { x: 0, y: direction * overlapY };
    }
  }

  /**
   * Swept AABB (continuous collision)
   */
  static sweptAABB(
    moving: Bounds & { velocity: Vector2 },
    static_: Bounds,
    delta: number
  ): { time: number; normal: Vector2 } | null {
    const vx = moving.velocity.x * delta;
    const vy = moving.velocity.y * delta;

    // Calculate entry and exit times for each axis
    let xInvEntry, yInvEntry;
    let xInvExit, yInvExit;

    if (vx > 0) {
      xInvEntry = static_.x - (moving.x + moving.width);
      xInvExit = static_.x + static_.width - moving.x;
    } else {
      xInvEntry = static_.x + static_.width - moving.x;
      xInvExit = static_.x - (moving.x + moving.width);
    }

    if (vy > 0) {
      yInvEntry = static_.y - (moving.y + moving.height);
      yInvExit = static_.y + static_.height - moving.y;
    } else {
      yInvEntry = static_.y + static_.height - moving.y;
      yInvExit = static_.y - (moving.y + moving.height);
    }

    const xEntry = vx === 0 ? -Infinity : xInvEntry / vx;
    const xExit = vx === 0 ? Infinity : xInvExit / vx;
    const yEntry = vy === 0 ? -Infinity : yInvEntry / vy;
    const yExit = vy === 0 ? Infinity : yInvExit / vy;

    const entryTime = Math.max(xEntry, yEntry);
    const exitTime = Math.min(xExit, yExit);

    // No collision
    if (entryTime > exitTime || (xEntry < 0 && yEntry < 0) || xEntry > 1 || yEntry > 1) {
      return null;
    }

    // Calculate normal
    const normal: Vector2 = { x: 0, y: 0 };
    if (xEntry > yEntry) {
      normal.x = xInvEntry < 0 ? 1 : -1;
    } else {
      normal.y = yInvEntry < 0 ? 1 : -1;
    }

    return { time: entryTime, normal };
  }

  /**
   * Get collision normal
   */
  static getCollisionNormal(a: Bounds, b: Bounds): Vector2 {
    const centerA = { x: a.x + a.width / 2, y: a.y + a.height / 2 };
    const centerB = { x: b.x + b.width / 2, y: b.y + b.height / 2 };

    const dx = centerB.x - centerA.x;
    const dy = centerB.y - centerA.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) return { x: 0, y: 0 };

    return {
      x: dx / length,
      y: dy / length
    };
  }

  /**
   * Broadphase collision with spatial hashing
   */
  static spatialHash(
    entities: any[],
    cellSize: number
  ): Map<string, any[]> {
    const hash = new Map<string, any[]>();

    for (const entity of entities) {
      const bounds = entity.getBounds();
      const minX = Math.floor(bounds.x / cellSize);
      const minY = Math.floor(bounds.y / cellSize);
      const maxX = Math.floor((bounds.x + bounds.width) / cellSize);
      const maxY = Math.floor((bounds.y + bounds.height) / cellSize);

      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          const key = `${x},${y}`;
          if (!hash.has(key)) {
            hash.set(key, []);
          }
          hash.get(key)!.push(entity);
        }
      }
    }

    return hash;
  }
}
