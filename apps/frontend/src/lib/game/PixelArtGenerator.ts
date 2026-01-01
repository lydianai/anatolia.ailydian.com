/**
 * PIXEL ART GENERATOR - Turkish Digital Metropol
 *
 * Programmatically generates pixel art characters
 * Creates sprite sheets for Turkish character classes
 */

export interface ColorPalette {
  skin: string;
  hair: string;
  primary: string;
  secondary: string;
  accent: string;
  outline: string;
}

export const TURKISH_COLOR_PALETTES = {
  // Traditional Turkish colors
  entrepreneur: {
    skin: '#f4c7a8',
    hair: '#2d1b00',
    primary: '#1a1a2e', // Dark suit
    secondary: '#ffffff', // White shirt
    accent: '#c9a227', // Gold tie
    outline: '#000000'
  },
  developer: {
    skin: '#d4a574',
    hair: '#3d2817',
    primary: '#2d3142', // Dark hoodie
    secondary: '#4f5d75', // Jeans
    accent: '#00d9ff', // Tech blue
    outline: '#000000'
  },
  designer: {
    skin: '#e8b99a',
    hair: '#8b4513',
    primary: '#000000', // Black outfit
    secondary: '#ff006e', // Pink accent
    accent: '#fb5607', // Orange tablet
    outline: '#000000'
  },
  marketer: {
    skin: '#f5d5b8',
    hair: '#4a2f1e',
    primary: '#283149', // Business casual
    secondary: '#ffffff',
    accent: '#ff6b35', // Sales red
    outline: '#000000'
  },
  trader: {
    skin: '#d9a066',
    hair: '#1a0f00',
    primary: '#8b2635', // Traditional vest
    secondary: '#f2e8cf', // Beige shirt
    accent: '#c9a227', // Gold details
    outline: '#000000'
  }
};

export class PixelArtGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private readonly CHAR_WIDTH = 32;
  private readonly CHAR_HEIGHT = 32;
  private readonly SPRITE_SHEET_WIDTH = 512; // 16 frames x 32px
  private readonly SPRITE_SHEET_HEIGHT = 512; // 16 rows (4 states x 4 dirs)

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.SPRITE_SHEET_WIDTH;
    this.canvas.height = this.SPRITE_SHEET_HEIGHT;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;
  }

  /**
   * Generate complete sprite sheet for a character class
   */
  generateCharacterSpriteSheet(
    characterClass: keyof typeof TURKISH_COLOR_PALETTES
  ): HTMLCanvasElement {
    const palette = TURKISH_COLOR_PALETTES[characterClass];

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Generate all animations
    // Row layout: idle(0-3), walk(4-7), run(8-11), action(12-15)
    // Each row has 8 directions x 12 frames

    let row = 0;

    // IDLE animations (8 directions)
    for (let dir = 0; dir < 8; dir++) {
      for (let frame = 0; frame < 12; frame++) {
        const x = (dir * 12 + frame) * this.CHAR_WIDTH;
        const y = row * this.CHAR_HEIGHT;
        this.drawIdleFrame(x, y, dir, frame, palette);
      }
    }

    row = 1;
    // WALK animations
    for (let dir = 0; dir < 8; dir++) {
      for (let frame = 0; frame < 12; frame++) {
        const x = (dir * 12 + frame) * this.CHAR_WIDTH;
        const y = row * this.CHAR_HEIGHT;
        this.drawWalkFrame(x, y, dir, frame, palette);
      }
    }

    row = 2;
    // RUN animations
    for (let dir = 0; dir < 8; dir++) {
      for (let frame = 0; frame < 12; frame++) {
        const x = (dir * 12 + frame) * this.CHAR_WIDTH;
        const y = row * this.CHAR_HEIGHT;
        this.drawRunFrame(x, y, dir, frame, palette);
      }
    }

    row = 3;
    // ACTION animations
    for (let dir = 0; dir < 8; dir++) {
      for (let frame = 0; frame < 12; frame++) {
        const x = (dir * 12 + frame) * this.CHAR_WIDTH;
        const y = row * this.CHAR_HEIGHT;
        this.drawActionFrame(x, y, dir, frame, palette, characterClass);
      }
    }

    return this.canvas;
  }

  /**
   * Draw idle frame
   */
  private drawIdleFrame(
    x: number,
    y: number,
    direction: number,
    frame: number,
    palette: ColorPalette
  ): void {
    // Simple breathing animation
    const breathe = Math.sin(frame * 0.5) * 0.5;

    this.drawCharacterBase(x, y + breathe, direction, palette);
  }

  /**
   * Draw walk frame
   */
  private drawWalkFrame(
    x: number,
    y: number,
    direction: number,
    frame: number,
    palette: ColorPalette
  ): void {
    // Walking animation with leg movement
    const legOffset = Math.sin(frame * 0.5) * 2;
    const bobbing = Math.abs(Math.sin(frame * 0.5)) * 1;

    this.drawCharacterBase(x, y + bobbing, direction, palette, legOffset);
  }

  /**
   * Draw run frame
   */
  private drawRunFrame(
    x: number,
    y: number,
    direction: number,
    frame: number,
    palette: ColorPalette
  ): void {
    // Running animation with more leg movement
    const legOffset = Math.sin(frame * 0.8) * 3;
    const bobbing = Math.abs(Math.sin(frame * 0.8)) * 2;

    this.drawCharacterBase(x, y + bobbing, direction, palette, legOffset);
  }

  /**
   * Draw action frame (class-specific)
   */
  private drawActionFrame(
    x: number,
    y: number,
    direction: number,
    frame: number,
    palette: ColorPalette,
    characterClass: string
  ): void {
    const armRaise = Math.min(frame / 6, 1) * 4;

    this.drawCharacterBase(x, y, direction, palette, 0, armRaise);

    // Class-specific action effects
    if (frame > 6) {
      this.drawActionEffect(x, y, direction, characterClass);
    }
  }

  /**
   * Draw base character (simplified pixel art)
   */
  private drawCharacterBase(
    x: number,
    y: number,
    direction: number,
    palette: ColorPalette,
    legOffset: number = 0,
    armRaise: number = 0
  ): void {
    const offsetX = x + 16; // Center
    const offsetY = y + 16;

    // Outline
    this.ctx.fillStyle = palette.outline;

    // Head (8x8)
    this.drawPixelRect(offsetX - 4, offsetY - 10, 8, 8);

    // Body (6x10)
    this.drawPixelRect(offsetX - 3, offsetY - 2, 6, 10);

    // Fill
    // Head
    this.ctx.fillStyle = palette.skin;
    this.drawPixelRect(offsetX - 3, offsetY - 9, 6, 6);

    // Hair (simplified)
    this.ctx.fillStyle = palette.hair;
    this.drawPixelRect(offsetX - 3, offsetY - 10, 6, 3);

    // Body/Clothes
    this.ctx.fillStyle = palette.primary;
    this.drawPixelRect(offsetX - 2, offsetY - 1, 4, 8);

    // Arms (with animation)
    this.drawPixelRect(offsetX - 4, offsetY + 1 - armRaise, 2, 6);
    this.drawPixelRect(offsetX + 2, offsetY + 1 - armRaise, 2, 6);

    // Legs (with walking animation)
    this.ctx.fillStyle = palette.secondary;
    this.drawPixelRect(offsetX - 2, offsetY + 7, 2, 5 + legOffset);
    this.drawPixelRect(offsetX, offsetY + 7, 2, 5 - legOffset);

    // Accent (tie, accessory, etc.)
    this.ctx.fillStyle = palette.accent;
    this.drawPixelRect(offsetX - 1, offsetY, 2, 3);
  }

  /**
   * Draw action effect (sparkles, etc.)
   */
  private drawActionEffect(
    x: number,
    y: number,
    direction: number,
    characterClass: string
  ): void {
    const offsetX = x + 16;
    const offsetY = y + 16;

    // Simple sparkle effect
    this.ctx.fillStyle = '#ffff00';
    this.drawPixel(offsetX - 6, offsetY - 8);
    this.drawPixel(offsetX + 6, offsetY - 8);
    this.drawPixel(offsetX, offsetY - 12);
  }

  /**
   * Helper: Draw single pixel
   */
  private drawPixel(x: number, y: number): void {
    this.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
  }

  /**
   * Helper: Draw pixel rectangle
   */
  private drawPixelRect(x: number, y: number, w: number, h: number): void {
    this.ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
  }

  /**
   * Export as PNG blob
   */
  async exportAsPNG(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      }, 'image/png');
    });
  }

  /**
   * Export as data URL
   */
  exportAsDataURL(): string {
    return this.canvas.toDataURL('image/png');
  }

  /**
   * Generate all character classes
   */
  async generateAllCharacters(): Promise<Map<string, Blob>> {
    const characters = new Map<string, Blob>();

    for (const className of Object.keys(TURKISH_COLOR_PALETTES)) {
      this.generateCharacterSpriteSheet(
        className as keyof typeof TURKISH_COLOR_PALETTES
      );
      const blob = await this.exportAsPNG();
      characters.set(className, blob);
    }

    return characters;
  }

  /**
   * Download sprite sheet
   */
  downloadSpriteSheet(characterClass: string): void {
    const dataURL = this.exportAsDataURL();
    const link = document.createElement('a');
    link.download = `character_${characterClass}.png`;
    link.href = dataURL;
    link.click();
  }
}

/**
 * Utility: Generate and save all character sprites
 */
export async function generateAndSaveAllCharacters(): Promise<void> {
  const generator = new PixelArtGenerator();
  const characters = await generator.generateAllCharacters();

  // Download all
  for (const [className, blob] of characters.entries()) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `character_${className}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  console.log('All character sprites generated!');
}
