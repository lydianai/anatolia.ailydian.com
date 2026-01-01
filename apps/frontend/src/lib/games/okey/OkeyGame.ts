/**
 * OKEY - Turkish 4-Player Card Game
 * Complete game logic with AI players, multiplayer support, and score tracking
 * Based on traditional Turkish Okey rules
 */

export enum PlayerPosition {
  PLAYER1 = 0,
  PLAYER2 = 1,
  PLAYER3 = 2,
  PLAYER4 = 3
}

export interface Tile {
  id: string;
  number: number;
  color: 'red' | 'blue' | 'yellow' | 'black';
  isJoker: boolean;
  isFakeJoker: boolean;
}

export interface Combination {
  tiles: Tile[];
  type: 'set' | 'run'; // Set: same number different colors, Run: same color sequential
  isValid: boolean;
}

export interface PlayerHand {
  position: PlayerPosition;
  isAI: boolean;
  tiles: Tile[];
  combinations: Combination[];
  score: number;
  roundsWon: number;
  hasPlayed: boolean;
  isReady: boolean;
}

export interface GameState {
  players: PlayerHand[];
  discardPile: Tile[];
  drawPile: Tile[];
  currentPlayer: PlayerPosition;
  gamePhase: 'setup' | 'playing' | 'round_end' | 'game_end';
  roundNumber: number;
  totalRounds: number;
  winner: PlayerPosition | null;
  lastTile: Tile | null;
  gameHistory: Array<{ round: number; winner: PlayerPosition; score: number }>;
  currentPlayedCombinations: Combination[];
  isFirstRound: boolean;
  turnCount: number;
}

export class OkeyGame {
  private state: GameState;
  private aiPlayers: Set<PlayerPosition>;
  private tileSet: Tile[];

  constructor(
    playerCount: number = 4,
    aiPlayers: PlayerPosition[] = []
  ) {
    this.aiPlayers = new Set(aiPlayers);
    this.tileSet = this.createTileSet();
    this.state = this.initializeGame(playerCount);
  }

  /**
   * Create a complete Okey tile set (two decks of 52 cards + 2 jokers)
   * Colors: Red, Blue, Yellow, Black
   * Numbers: 1-13 each color
   */
  private createTileSet(): Tile[] {
    const tiles: Tile[] = [];
    const colors: Array<'red' | 'blue' | 'yellow' | 'black'> = [
      'red',
      'blue',
      'yellow',
      'black'
    ];
    const tileId: { [key: string]: number } = {};

    // Create two complete sets
    for (let setNum = 0; setNum < 2; setNum++) {
      for (const color of colors) {
        for (let number = 1; number <= 13; number++) {
          const key = `${color}-${number}`;
          const id = `tile-${color}-${number}-${setNum}`;

          tiles.push({
            id,
            number,
            color,
            isJoker: false,
            isFakeJoker: false
          });
        }
      }
    }

    // Add jokers
    tiles.push(
      {
        id: 'joker-1',
        number: 0,
        color: 'red',
        isJoker: true,
        isFakeJoker: false
      },
      {
        id: 'joker-2',
        number: 0,
        color: 'black',
        isJoker: true,
        isFakeJoker: false
      }
    );

    return tiles.sort(() => Math.random() - 0.5);
  }

  /**
   * Initialize game with players
   */
  private initializeGame(playerCount: number): GameState {
    const players: PlayerHand[] = [];

    for (let i = 0; i < playerCount; i++) {
      const position = i as PlayerPosition;
      players.push({
        position,
        isAI: this.aiPlayers.has(position),
        tiles: [],
        combinations: [],
        score: 0,
        roundsWon: 0,
        hasPlayed: false,
        isReady: false
      });
    }

    return {
      players,
      discardPile: [],
      drawPile: [...this.tileSet],
      currentPlayer: PlayerPosition.PLAYER1,
      gamePhase: 'setup',
      roundNumber: 1,
      totalRounds: 7,
      winner: null,
      lastTile: null,
      gameHistory: [],
      currentPlayedCombinations: [],
      isFirstRound: true,
      turnCount: 0
    };
  }

  /**
   * Deal tiles to players (14 tiles each, 1 extra to first player)
   */
  startRound(): void {
    // Reset hands and shuffle deck
    this.state.drawPile = this.createTileSet().sort(() => Math.random() - 0.5);
    this.state.discardPile = [];

    // Deal 14 tiles to each player, 15 to first player
    for (const player of this.state.players) {
      player.tiles = [];
      player.combinations = [];
      player.hasPlayed = false;

      const tileCount = player.position === PlayerPosition.PLAYER1 ? 15 : 14;
      for (let i = 0; i < tileCount; i++) {
        if (this.state.drawPile.length > 0) {
          player.tiles.push(this.state.drawPile.pop()!);
        }
      }
    }

    // Deal first discard tile
    if (this.state.drawPile.length > 0) {
      this.state.discardPile.push(this.state.drawPile.pop()!);
    }

    this.state.gamePhase = 'playing';
    this.state.currentPlayer = PlayerPosition.PLAYER1;
    this.state.currentPlayedCombinations = [];
  }

  /**
   * Player draws tile from draw pile
   */
  drawTile(): Tile | null {
    if (this.state.drawPile.length === 0) {
      this.refillDrawPile();
    }

    if (this.state.drawPile.length === 0) return null;

    const tile = this.state.drawPile.pop()!;
    this.state.players[this.state.currentPlayer].tiles.push(tile);

    return tile;
  }

  /**
   * Refill draw pile from discard when running low
   */
  private refillDrawPile(): void {
    if (this.state.discardPile.length <= 1) return;

    const lastDiscard = this.state.discardPile.pop()!;
    this.state.drawPile = this.state.discardPile;
    this.state.drawPile.sort(() => Math.random() - 0.5);
    this.state.discardPile = [lastDiscard];
  }

  /**
   * Player discards a tile
   */
  discardTile(tileId: string): boolean {
    const player = this.state.players[this.state.currentPlayer];
    const tileIndex = player.tiles.findIndex(t => t.id === tileId);

    if (tileIndex === -1) return false;

    const tile = player.tiles.splice(tileIndex, 1)[0];
    this.state.discardPile.push(tile);
    this.state.lastTile = tile;

    return true;
  }

  /**
   * Player claims discard tile (special action)
   */
  claimDiscard(tileId: string): boolean {
    if (this.state.discardPile.length === 0) return false;

    const lastDiscard = this.state.discardPile[this.state.discardPile.length - 1];
    if (lastDiscard.id !== tileId) return false;

    this.state.discardPile.pop();
    this.state.players[this.state.currentPlayer].tiles.push(lastDiscard);

    return true;
  }

  /**
   * Player plays combinations of tiles
   */
  playCombinations(combinations: Combination[]): boolean {
    const player = this.state.players[this.state.currentPlayer];

    // Validate all combinations
    for (const combo of combinations) {
      if (!this.validateCombination(combo)) {
        return false;
      }

      // Check if tiles exist in hand
      for (const tile of combo.tiles) {
        if (!player.tiles.some(t => t.id === tile.id)) {
          return false;
        }
      }
    }

    // Remove tiles from hand
    for (const combo of combinations) {
      for (const tile of combo.tiles) {
        const index = player.tiles.findIndex(t => t.id === tile.id);
        if (index !== -1) {
          player.tiles.splice(index, 1);
        }
      }
    }

    player.combinations.push(...combinations);
    player.hasPlayed = true;
    this.state.currentPlayedCombinations.push(...combinations);

    return true;
  }

  /**
   * Validate a combination according to Okey rules
   */
  private validateCombination(combo: Combination): boolean {
    if (combo.tiles.length < 3) return false;

    // Check if it's a set (same number, different colors)
    const isSet = combo.tiles.every(t => t.number === combo.tiles[0].number);
    if (isSet && combo.tiles.length >= 3) {
      const colors = new Set(combo.tiles.map(t => t.color));
      return colors.size === combo.tiles.length;
    }

    // Check if it's a run (same color, sequential numbers)
    if (combo.tiles.every(t => t.color === combo.tiles[0].color)) {
      const numbers = combo.tiles.map(t => t.number).sort((a, b) => a - b);

      for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] !== numbers[i - 1] + 1) {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  /**
   * Check if player has won (Okey - all tiles played in valid combinations)
   */
  checkOkey(): boolean {
    const player = this.state.players[this.state.currentPlayer];

    // Player wins if no tiles left in hand
    if (player.tiles.length === 0) {
      return true;
    }

    // Player wins if they have Okey (specific tile) or can complete with draw
    return false;
  }

  /**
   * End current turn and move to next player
   */
  endTurn(): void {
    this.state.currentPlayer = (this.state.currentPlayer + 1) % this.state.players.length;
    this.state.turnCount++;

    // Check for AI player turn
    if (this.state.players[this.state.currentPlayer].isAI) {
      setTimeout(() => this.executeAITurn(), 1000);
    }
  }

  /**
   * Execute AI player turn
   */
  private executeAITurn(): void {
    const player = this.state.players[this.state.currentPlayer];

    // AI Strategy
    const action = this.getAIAction(player);

    if (action.type === 'draw') {
      this.drawTile();
    } else if (action.type === 'play') {
      const combinations = action.combinations || [];
      this.playCombinations(combinations);
    } else if (action.type === 'discard') {
      const tileToDiscard = this.selectTileToDiscard(player);
      if (tileToDiscard) {
        this.discardTile(tileToDiscard.id);
      }
    }

    this.endTurn();
  }

  /**
   * Determine AI action
   */
  private getAIAction(player: PlayerHand): {
    type: 'draw' | 'play' | 'discard';
    combinations?: Combination[];
  } {
    const combinations = this.findValidCombinations(player.tiles);

    // If we can play multiple combinations, play them
    if (combinations.length > 0 && this.canPlayCombinations(combinations, player.tiles)) {
      return { type: 'play', combinations };
    }

    // Otherwise draw a tile
    if (this.state.drawPile.length > 0) {
      return { type: 'draw' };
    }

    // If no tiles to draw, discard
    return { type: 'discard' };
  }

  /**
   * Find valid combinations in tiles
   */
  private findValidCombinations(tiles: Tile[]): Combination[] {
    const combinations: Combination[] = [];

    // Find all valid sets (same number)
    for (let number = 1; number <= 13; number++) {
      const tilesWithNumber = tiles.filter(t => t.number === number && !t.isJoker);

      if (tilesWithNumber.length >= 3) {
        for (let colorCount = 3; colorCount <= tilesWithNumber.length; colorCount++) {
          const colors = new Set(tilesWithNumber.map(t => t.color));
          if (colors.size >= colorCount) {
            combinations.push({
              tiles: tilesWithNumber.slice(0, colorCount),
              type: 'set',
              isValid: true
            });
          }
        }
      }
    }

    // Find all valid runs (same color, sequential)
    const colors: Set<string> = new Set(tiles.map(t => t.color));
    const colorArray = Array.from(colors);

    for (const color of colorArray) {
      const tilesWithColor = tiles
        .filter(t => t.color === color && !t.isJoker)
        .sort((a, b) => a.number - b.number);

      for (let start = 0; start < tilesWithColor.length - 2; start++) {
        for (let end = start + 2; end < tilesWithColor.length; end++) {
          const sequence = tilesWithColor.slice(start, end + 1);

          if (this.isValidSequence(sequence)) {
            combinations.push({
              tiles: sequence,
              type: 'run',
              isValid: true
            });
          }
        }
      }
    }

    return combinations;
  }

  /**
   * Check if tiles form valid sequence
   */
  private isValidSequence(tiles: Tile[]): boolean {
    const numbers = tiles.map(t => t.number).sort((a, b) => a - b);

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] !== numbers[i - 1] + 1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if combinations can be played
   */
  private canPlayCombinations(combinations: Combination[], hand: Tile[]): boolean {
    const usedTiles = new Set<string>();

    for (const combo of combinations) {
      for (const tile of combo.tiles) {
        usedTiles.add(tile.id);
      }
    }

    return usedTiles.size <= hand.length;
  }

  /**
   * Select a tile to discard (AI strategy)
   */
  private selectTileToDiscard(player: PlayerHand): Tile | null {
    if (player.tiles.length === 0) return null;

    // AI Strategy: Discard tiles that don't form combinations
    const combinations = this.findValidCombinations(player.tiles);
    const usedInCombos = new Set<string>();

    for (const combo of combinations) {
      for (const tile of combo.tiles) {
        usedInCombos.add(tile.id);
      }
    }

    const discardable = player.tiles.filter(t => !usedInCombos.has(t.id));

    if (discardable.length > 0) {
      // Prefer to discard jokers last
      const nonJokers = discardable.filter(t => !t.isJoker);
      return nonJokers.length > 0 ? nonJokers[0] : discardable[0];
    }

    return player.tiles[0];
  }

  /**
   * End round when player wins
   */
  endRound(winnerPosition: PlayerPosition): void {
    const winner = this.state.players[winnerPosition];
    winner.roundsWon++;

    // Calculate round score based on remaining tiles in opponents' hands
    let baseScore = 0;
    for (const player of this.state.players) {
      if (player.position !== winnerPosition) {
        baseScore += player.tiles.length * 5; // Each remaining tile = 5 points
      }
    }

    winner.score += baseScore;

    this.state.gameHistory.push({
      round: this.state.roundNumber,
      winner: winnerPosition,
      score: baseScore
    });

    if (this.state.roundNumber < this.state.totalRounds) {
      this.state.roundNumber++;
      this.startRound();
    } else {
      this.endGame();
    }
  }

  /**
   * End game and determine final winner
   */
  private endGame(): void {
    this.state.gamePhase = 'game_end';

    let maxScore = -1;
    let gameWinner: PlayerPosition | null = null;

    for (const player of this.state.players) {
      if (player.score > maxScore) {
        maxScore = player.score;
        gameWinner = player.position;
      }
    }

    this.state.winner = gameWinner;
  }

  /**
   * Get current game state
   */
  getState(): GameState {
    return this.state;
  }

  /**
   * Get player's hand
   */
  getPlayerHand(position: PlayerPosition): Tile[] {
    return this.state.players[position].tiles;
  }

  /**
   * Get player's score
   */
  getPlayerScore(position: PlayerPosition): number {
    return this.state.players[position].score;
  }

  /**
   * Get all players
   */
  getPlayers(): PlayerHand[] {
    return this.state.players;
  }

  /**
   * Get discard pile
   */
  getDiscardPile(): Tile[] {
    return this.state.discardPile;
  }

  /**
   * Get game statistics
   */
  getStatistics(): {
    roundNumber: number;
    currentPlayer: PlayerPosition;
    tilesInDraw: number;
    tilesInDiscard: number;
    gamePhase: string;
  } {
    return {
      roundNumber: this.state.roundNumber,
      currentPlayer: this.state.currentPlayer,
      tilesInDraw: this.state.drawPile.length,
      tilesInDiscard: this.state.discardPile.length,
      gamePhase: this.state.gamePhase
    };
  }

  /**
   * Export game to JSON format
   */
  exportGame(): string {
    return JSON.stringify(
      {
        game: 'Okey',
        timestamp: new Date().toISOString(),
        finalScores: this.state.players.map(p => ({
          player: p.position,
          score: p.score,
          roundsWon: p.roundsWon
        })),
        gameHistory: this.state.gameHistory,
        winner: this.state.winner
      },
      null,
      2
    );
  }

  /**
   * Reset game for new match
   */
  resetGame(): void {
    this.tileSet = this.createTileSet();
    this.state = this.initializeGame(this.state.players.length);
  }
}

export default OkeyGame;
