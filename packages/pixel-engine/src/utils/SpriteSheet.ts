import { Texture, Rectangle } from 'pixi.js';
import type { SpriteSheetData } from '../types/index.js';

/**
 * Sprite sheet parser
 * Parses texture atlases into individual sprites
 */
export class SpriteSheetParser {
  /**
   * Parse sprite sheet data
   */
  static parse(baseTexture: Texture, data: SpriteSheetData): Map<string, Texture> {
    const textures = new Map<string, Texture>();

    for (const [frameName, frameData] of Object.entries(data.frames)) {
      const frame = frameData.frame;
      const rect = new Rectangle(frame.x, frame.y, frame.w, frame.h);

      const texture = new Texture({
        source: baseTexture.source,
        frame: rect
      });

      textures.set(frameName, texture);
    }

    return textures;
  }

  /**
   * Get animation frames from sprite sheet
   */
  static getAnimationFrames(
    textures: Map<string, Texture>,
    prefix: string,
    start: number,
    end: number
  ): Texture[] {
    const frames: Texture[] = [];

    for (let i = start; i <= end; i++) {
      const frameName = `${prefix}${i.toString().padStart(4, '0')}.png`;
      const texture = textures.get(frameName);
      if (texture) {
        frames.push(texture);
      }
    }

    return frames;
  }

  /**
   * Create character animation set
   */
  static createCharacterAnimations(
    textures: Map<string, Texture>,
    characterName: string
  ): Record<string, Texture[]> {
    return {
      idle_down: this.getAnimationFrames(textures, `${characterName}_idle_down_`, 0, 3),
      idle_up: this.getAnimationFrames(textures, `${characterName}_idle_up_`, 0, 3),
      idle_left: this.getAnimationFrames(textures, `${characterName}_idle_left_`, 0, 3),
      idle_right: this.getAnimationFrames(textures, `${characterName}_idle_right_`, 0, 3),
      walk_down: this.getAnimationFrames(textures, `${characterName}_walk_down_`, 0, 7),
      walk_up: this.getAnimationFrames(textures, `${characterName}_walk_up_`, 0, 7),
      walk_left: this.getAnimationFrames(textures, `${characterName}_walk_left_`, 0, 7),
      walk_right: this.getAnimationFrames(textures, `${characterName}_walk_right_`, 0, 7)
    };
  }

  /**
   * Create tile set from sprite sheet
   */
  static createTileSet(
    textures: Map<string, Texture>,
    _tileWidth: number,
    _tileHeight: number
  ): Map<number, Texture> {
    const tileSet = new Map<number, Texture>();
    let index = 0;

    for (const [name, texture] of textures) {
      if (name.startsWith('tile_')) {
        tileSet.set(index++, texture);
      }
    }

    return tileSet;
  }

  /**
   * Split texture into grid
   */
  static splitIntoGrid(
    texture: Texture,
    tileWidth: number,
    tileHeight: number
  ): Texture[][] {
    const textures: Texture[][] = [];
    const cols = Math.floor(texture.width / tileWidth);
    const rows = Math.floor(texture.height / tileHeight);

    for (let y = 0; y < rows; y++) {
      const row: Texture[] = [];
      for (let x = 0; x < cols; x++) {
        const rect = new Rectangle(
          x * tileWidth,
          y * tileHeight,
          tileWidth,
          tileHeight
        );

        const tile = new Texture({
          source: texture.source,
          frame: rect
        });

        row.push(tile);
      }
      textures.push(row);
    }

    return textures;
  }
}
