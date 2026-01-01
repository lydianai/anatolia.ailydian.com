/**
 * ANADOLU REALM - Mini Games System
 * Complete Turkish games system with AI opponents and multiplayer support
 *
 * Games Included:
 * - Tavla (Turkish Backgammon)
 * - Okey (Turkish 4-Player Card Game)
 * - Batak (Turkish Trick-Taking Card Game)
 */

// Import game classes
import { TavlaGame } from './tavla/TavlaGame';
import { OkeyGame } from './okey/OkeyGame';
import { BatakGame } from './batak/BatakGame';

// Tavla exports
export {
  TavlaGame,
  PlayerColor as TavlaPlayerColor,
  type GameState as TavlaGameState,
  type Move as TavlaMove,
  type TavlaPosition,
  type AIMove
} from './tavla/TavlaGame';

// Okey exports
export {
  OkeyGame,
  PlayerPosition as OkeyPlayerPosition,
  type Tile,
  type Combination,
  type PlayerHand,
  type GameState as OkeyGameState
} from './okey/OkeyGame';

// Batak exports
export {
  BatakGame,
  Suit as BatakSuit,
  Rank as BatakRank,
  type Card,
  type Bid,
  type Trick,
  type PlayerInfo,
  type GameState as BatakGameState
} from './batak/BatakGame';

/**
 * Game type enumeration for type-safe game selection
 */
export enum GameType {
  TAVLA = 'tavla',
  OKEY = 'okey',
  BATAK = 'batak'
}

/**
 * Get game instance by type
 */
export function createGame(
  gameType: GameType,
  playerCount?: number,
  aiPlayers?: number[]
) {
  switch (gameType) {
    case GameType.TAVLA:
      return new TavlaGame(aiPlayers ? aiPlayers.length > 0 : false);
    case GameType.OKEY:
      return new OkeyGame(playerCount || 4, aiPlayers || []);
    case GameType.BATAK:
      return new BatakGame(playerCount || 4, aiPlayers || []);
    default:
      throw new Error(`Unknown game type: ${gameType}`);
  }
}

/**
 * Game metadata for UI display
 */
export const GAMES_METADATA = {
  [GameType.TAVLA]: {
    name: 'Tavla',
    displayName: 'Tavla (Backgammon)',
    description: 'Turkish version of Backgammon - Race your pieces around the board',
    minPlayers: 2,
    maxPlayers: 2,
    estimatedDuration: '15-45 minutes',
    difficulty: 'Medium',
    icon: 'dice',
    culturalNote: 'Traditional Turkish game played in coffeehouses for centuries'
  },
  [GameType.OKEY]: {
    name: 'Okey',
    displayName: 'Okey',
    description: 'Turkish rummy-style game - Form sets and runs of tiles',
    minPlayers: 2,
    maxPlayers: 4,
    estimatedDuration: '30-60 minutes',
    difficulty: 'Medium',
    icon: 'tiles',
    culturalNote: 'Modern Turkish favorite, similar to Mexican Domino games'
  },
  [GameType.BATAK]: {
    name: 'Batak',
    displayName: 'Batak (Card Game)',
    description: 'Fast-paced Turkish trick-taking card game with bidding',
    minPlayers: 2,
    maxPlayers: 4,
    estimatedDuration: '20-40 minutes',
    difficulty: 'Hard',
    icon: 'cards',
    culturalNote: 'Rapidly growing popular Turkish card game combining strategy and luck'
  }
};

export default {
  TavlaGame: TavlaGame,
  OkeyGame: OkeyGame,
  BatakGame: BatakGame,
  GameType,
  createGame,
  GAMES_METADATA
};
