import type { Zone } from '../types/index.js';

/**
 * Zone management system
 * Handles different areas of the world with unique properties
 */
export class ZoneManager {
  private zones: Map<string, Zone> = new Map();
  private currentZone: Zone | null = null;

  /**
   * Register a zone
   */
  registerZone(zone: Zone): void {
    this.zones.set(zone.id, zone);
  }

  /**
   * Remove a zone
   */
  removeZone(zoneId: string): void {
    this.zones.delete(zoneId);
  }

  /**
   * Check if position is in zone
   */
  private isInZone(x: number, y: number, zone: Zone): boolean {
    return (
      x >= zone.bounds.x &&
      x <= zone.bounds.x + zone.bounds.width &&
      y >= zone.bounds.y &&
      y <= zone.bounds.y + zone.bounds.height
    );
  }

  /**
   * Get zone at position
   */
  getZoneAt(x: number, y: number): Zone | null {
    for (const zone of this.zones.values()) {
      if (this.isInZone(x, y, zone)) {
        return zone;
      }
    }
    return null;
  }

  /**
   * Update current zone based on player position
   */
  update(playerX: number, playerY: number): void {
    const newZone = this.getZoneAt(playerX, playerY);

    if (newZone !== this.currentZone) {
      // Exit old zone
      if (this.currentZone?.onExit) {
        this.currentZone.onExit();
      }

      // Enter new zone
      if (newZone?.onEnter) {
        newZone.onEnter();
      }

      this.currentZone = newZone;
    }
  }

  /**
   * Get current zone
   */
  getCurrentZone(): Zone | null {
    return this.currentZone;
  }

  /**
   * Get zone by ID
   */
  getZone(id: string): Zone | undefined {
    return this.zones.get(id);
  }

  /**
   * Get all zones
   */
  getAllZones(): Zone[] {
    return Array.from(this.zones.values());
  }

  /**
   * Create Turkish-themed zones
   */
  createTurkishZones(): void {
    // Historical Istanbul
    this.registerZone({
      id: 'sultanahmet',
      name: 'Sultanahmet Meydanı',
      bounds: { x: 0, y: 0, width: 500, height: 500 },
      music: 'ottoman_ambient',
      onEnter: () => console.log('Sultanahmet\'e hoş geldiniz!')
    });

    // Modern district
    this.registerZone({
      id: 'taksim',
      name: 'Taksim',
      bounds: { x: 500, y: 0, width: 500, height: 500 },
      music: 'modern_city',
      onEnter: () => console.log('Taksim\'e hoş geldiniz!')
    });

    // Bosphorus area
    this.registerZone({
      id: 'bogaz',
      name: 'Boğaz',
      bounds: { x: 0, y: 500, width: 1000, height: 300 },
      music: 'sea_ambient',
      ambience: 'seagulls',
      onEnter: () => console.log('Boğaz\'a hoş geldiniz!')
    });

    // Grand Bazaar
    this.registerZone({
      id: 'kapali_carsi',
      name: 'Kapalı Çarşı',
      bounds: { x: 200, y: 200, width: 200, height: 200 },
      music: 'bazaar_ambient',
      onEnter: () => console.log('Kapalı Çarşı\'ya hoş geldiniz!')
    });
  }
}
