import type { System, Vector2 } from '../types/index.js';

/**
 * Movement system
 * Handles entity movement, pathfinding, and collision
 */
export class MovementSystem implements System {
  priority = 20;

  /**
   * Update entity movements
   */
  update(delta: number, entities: any[]): void {
    for (const entity of entities) {
      if (entity.getVelocity && entity.move) {
        const velocity = entity.getVelocity();

        // Apply velocity
        if (Math.abs(velocity.x) > 0.001 || Math.abs(velocity.y) > 0.001) {
          entity.move(velocity.x * delta, velocity.y * delta);
        }
      }
    }
  }

  /**
   * Move entity to target position
   */
  moveTo(entity: any, target: Vector2, speed: number): void {
    const current = entity.getPosition();
    const dx = target.x - current.x;
    const dy = target.y - current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0.1) {
      const dirX = dx / distance;
      const dirY = dy / distance;
      entity.setVelocity(dirX * speed, dirY * speed);
    } else {
      entity.setVelocity(0, 0);
    }
  }

  /**
   * Check collision between two entities
   */
  checkCollision(entityA: any, entityB: any): boolean {
    const boundsA = entityA.getBounds();
    const boundsB = entityB.getBounds();

    return (
      boundsA.x < boundsB.x + boundsB.width &&
      boundsA.x + boundsA.width > boundsB.x &&
      boundsA.y < boundsB.y + boundsB.height &&
      boundsA.y + boundsA.height > boundsB.y
    );
  }

  /**
   * Resolve collision between entities
   */
  resolveCollision(entityA: any, entityB: any): void {
    const boundsA = entityA.getBounds();
    const boundsB = entityB.getBounds();

    // Calculate overlap
    const overlapX = Math.min(
      boundsA.x + boundsA.width - boundsB.x,
      boundsB.x + boundsB.width - boundsA.x
    );

    const overlapY = Math.min(
      boundsA.y + boundsA.height - boundsB.y,
      boundsB.y + boundsB.height - boundsA.y
    );

    // Push back by smallest overlap
    if (overlapX < overlapY) {
      const direction = boundsA.x < boundsB.x ? -1 : 1;
      entityA.move(direction * overlapX, 0);
    } else {
      const direction = boundsA.y < boundsB.y ? -1 : 1;
      entityA.move(0, direction * overlapY);
    }
  }

  destroy(): void {
    // Cleanup
  }
}
