import type { System, Vector2 } from '../types/index.js';

/**
 * Simple physics system
 * Handles gravity, friction, and basic physics
 */
export class PhysicsSystem implements System {
  priority = 15;
  private gravity: Vector2 = { x: 0, y: 0 };
  private friction: number = 0.98;

  /**
   * Update physics
   */
  update(delta: number, entities: any[]): void {
    for (const entity of entities) {
      if (!entity.getVelocity || !entity.setVelocity) continue;

      const velocity = entity.getVelocity();

      // Apply gravity
      velocity.x += this.gravity.x * delta;
      velocity.y += this.gravity.y * delta;

      // Apply friction
      velocity.x *= this.friction;
      velocity.y *= this.friction;

      // Stop if velocity is very small
      if (Math.abs(velocity.x) < 0.01) velocity.x = 0;
      if (Math.abs(velocity.y) < 0.01) velocity.y = 0;

      entity.setVelocity(velocity.x, velocity.y);
    }
  }

  /**
   * Set gravity
   */
  setGravity(x: number, y: number): void {
    this.gravity.x = x;
    this.gravity.y = y;
  }

  /**
   * Set friction
   */
  setFriction(friction: number): void {
    this.friction = Math.max(0, Math.min(1, friction));
  }

  /**
   * Apply impulse to entity
   */
  applyImpulse(entity: any, impulse: Vector2): void {
    if (!entity.getVelocity || !entity.setVelocity) return;

    const velocity = entity.getVelocity();
    entity.setVelocity(
      velocity.x + impulse.x,
      velocity.y + impulse.y
    );
  }

  /**
   * Apply force to entity
   */
  applyForce(entity: any, force: Vector2, delta: number): void {
    if (!entity.getVelocity || !entity.setVelocity) return;

    const velocity = entity.getVelocity();
    entity.setVelocity(
      velocity.x + force.x * delta,
      velocity.y + force.y * delta
    );
  }

  destroy(): void {
    // Cleanup
  }
}
