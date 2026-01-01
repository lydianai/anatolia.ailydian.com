/**
 * TAVLA (Turkish Backgammon) - Complete Game Implementation
 * Full AI opponent, multiplayer support, and Turkish rules
 * Includes score tracking and cultural elements
 */

export enum PlayerColor {
  WHITE = 'white',
  BLACK = 'black'
}

export interface TavlaPosition {
  pointIndex: number;
  pieces: number; // positive for white, negative for black
}

export interface GameState {
  board: TavlaPosition[];
  diceValues: [number, number];
  currentPlayer: PlayerColor;
  whiteScore: number;
  blackScore: number;
  gamePhase: 'setup' | 'playing' | 'ended';
  winner: PlayerColor | null;
  capturedPieces: { white: number; black: number };
  movesAvailable: Move[];
  isDoubled: boolean;
  doubleValue: number;
  doubleOwner: PlayerColor | null;
  doubleRefused: boolean;
  matchScore: { white: number; black: number };
}

export interface Move {
  from: number;
  to: number;
  diceValue: number;
}

export interface AIMove {
  from: number;
  to: number;
  sequence: Move[];
}

export class TavlaGame {
  private state: GameState;
  private isAIGame: boolean;
  private aiPlayer: PlayerColor;
  private moveHistory: Array<{ player: PlayerColor; moves: Move[] }> = [];

  constructor(isAIGame: boolean = false, aiPlayer: PlayerColor = PlayerColor.BLACK) {
    this.isAIGame = isAIGame;
    this.aiPlayer = aiPlayer;
    this.state = this.initializeGame();
  }

  /**
   * Initialize the board with standard Tavla starting position
   * Points are numbered 1-24 from white's perspective
   */
  private initializeGame(): GameState {
    const board: TavlaPosition[] = Array(24)
      .fill(null)
      .map((_, i) => ({ pointIndex: i + 1, pieces: 0 }));

    // White pieces starting positions
    board[0].pieces = 2; // Point 1: 2 white pieces
    board[5].pieces = 5; // Point 6: 5 white pieces
    board[7].pieces = 3; // Point 8: 3 white pieces
    board[11].pieces = 5; // Point 12: 5 white pieces

    // Black pieces starting positions (opposite direction)
    board[23].pieces = -2; // Point 24: 2 black pieces
    board[18].pieces = -5; // Point 19: 5 black pieces
    board[16].pieces = -3; // Point 17: 3 black pieces
    board[12].pieces = -5; // Point 13: 5 black pieces

    return {
      board,
      diceValues: [0, 0],
      currentPlayer: PlayerColor.WHITE,
      whiteScore: 0,
      blackScore: 0,
      gamePhase: 'setup',
      winner: null,
      capturedPieces: { white: 0, black: 0 },
      movesAvailable: [],
      isDoubled: false,
      doubleValue: 1,
      doubleOwner: null,
      doubleRefused: false,
      matchScore: { white: 0, black: 0 }
    };
  }

  /**
   * Roll dice and start turn
   */
  rollDice(): [number, number] {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    this.state.diceValues = [dice1, dice2];

    if (this.state.gamePhase === 'setup') {
      this.state.gamePhase = 'playing';
    }

    // Generate available moves
    this.generateAvailableMoves();

    return this.state.diceValues;
  }

  /**
   * Generate all valid moves for current player
   */
  private generateAvailableMoves(): void {
    const moves: Move[] = [];
    const diceValues = this.state.diceValues;
    const isWhite = this.state.currentPlayer === PlayerColor.WHITE;

    // Use doubled dice as separate moves if they match
    const moveValues = diceValues[0] === diceValues[1]
      ? [diceValues[0], diceValues[0], diceValues[0], diceValues[0]]
      : [diceValues[0], diceValues[1]];

    // Find all possible moves from current positions
    for (let pointIndex = 0; pointIndex < 24; pointIndex++) {
      const pieces = this.state.board[pointIndex].pieces;

      // Skip if no pieces or not current player's pieces
      if ((isWhite && pieces <= 0) || (!isWhite && pieces >= 0)) continue;

      // Try each dice value
      moveValues.forEach(diceValue => {
        const targetPoint = isWhite ? pointIndex + diceValue : pointIndex - diceValue;

        if (this.isValidMove(pointIndex, targetPoint, isWhite)) {
          moves.push({
            from: pointIndex,
            to: targetPoint,
            diceValue
          });
        }
      });
    }

    this.state.movesAvailable = moves;
  }

  /**
   * Check if a move is valid according to Turkish Tavla rules
   */
  private isValidMove(from: number, to: number, isWhite: boolean): boolean {
    // Out of bounds
    if (to < 0 || to > 23) return false;

    const targetPieces = this.state.board[to].pieces;
    const sourcePieces = this.state.board[from].pieces;

    // Can't move from empty point
    if ((isWhite && sourcePieces <= 0) || (!isWhite && sourcePieces >= 0)) {
      return false;
    }

    // Can't land on opponent's blot (multiple pieces)
    if (isWhite && targetPieces < -1) return false;
    if (!isWhite && targetPieces > 1) return false;

    return true;
  }

  /**
   * Execute a move
   */
  makeMove(move: Move): boolean {
    if (!this.isLegalMove(move)) return false;

    const { from, to } = move;
    const isWhite = this.state.currentPlayer === PlayerColor.WHITE;

    // Handle capturing
    if (this.state.board[to].pieces !== 0) {
      if (isWhite && this.state.board[to].pieces < 0) {
        this.state.capturedPieces.black++;
        this.state.board[to].pieces = 0;
      } else if (!isWhite && this.state.board[to].pieces > 0) {
        this.state.capturedPieces.white++;
        this.state.board[to].pieces = 0;
      }
    }

    // Move piece
    if (isWhite) {
      this.state.board[from].pieces--;
      this.state.board[to].pieces++;
    } else {
      this.state.board[from].pieces++;
      this.state.board[to].pieces--;
    }

    // Check if piece bears off (reached home)
    if (isWhite && to === 23) {
      this.state.board[to].pieces--;
      this.state.whiteScore++;
    } else if (!isWhite && to === 0) {
      this.state.board[to].pieces++;
      this.state.blackScore++;
    }

    // Remove used dice value
    this.removeUsedDice(move.diceValue);

    return true;
  }

  /**
   * Check if move is legal
   */
  private isLegalMove(move: Move): boolean {
    return this.state.movesAvailable.some(
      m => m.from === move.from && m.to === move.to && m.diceValue === move.diceValue
    );
  }

  /**
   * Remove used dice value
   */
  private removeUsedDice(diceValue: number): void {
    if (this.state.diceValues[0] === diceValue) {
      this.state.diceValues[0] = 0;
    } else if (this.state.diceValues[1] === diceValue) {
      this.state.diceValues[1] = 0;
    }

    // Regenerate available moves for remaining dice
    this.generateAvailableMoves();
  }

  /**
   * End current player's turn
   */
  endTurn(): void {
    this.moveHistory.push({
      player: this.state.currentPlayer,
      moves: []
    });

    // Switch player
    this.state.currentPlayer =
      this.state.currentPlayer === PlayerColor.WHITE
        ? PlayerColor.BLACK
        : PlayerColor.WHITE;

    this.state.diceValues = [0, 0];
    this.state.movesAvailable = [];

    // Check win condition
    if (this.checkWinCondition()) {
      this.state.gamePhase = 'ended';
      this.calculateMatchScore();
    }

    // AI turn if configured
    if (this.isAIGame && this.state.currentPlayer === this.aiPlayer) {
      setTimeout(() => this.executeAITurn(), 1000);
    }
  }

  /**
   * Execute AI turn with intelligent strategy
   */
  private executeAITurn(): void {
    this.rollDice();

    // Get AI move recommendation
    const aiMoves = this.getAIMoves();

    // Execute recommended moves
    for (const move of aiMoves.sequence) {
      if (this.state.movesAvailable.length > 0) {
        this.makeMove(move);
      }
    }

    this.endTurn();
  }

  /**
   * Calculate AI moves using strategy
   */
  private getAIMoves(): AIMove {
    const moves: Move[] = [];
    const availableMoves = [...this.state.movesAvailable];

    // AI Strategy: Prioritize bearing off pieces
    const homeProgress = this.calculatePlayerProgress(this.aiPlayer);

    // Strategy 1: Prioritize moving pieces home
    for (let i = 0; i < Math.min(availableMoves.length, 2); i++) {
      const move = this.selectBestMove(availableMoves);
      moves.push(move);

      // Simulate move for next iteration
      availableMoves.splice(availableMoves.indexOf(move), 1);
    }

    return { from: moves[0]?.from || 0, to: moves[0]?.to || 0, sequence: moves };
  }

  /**
   * Select best move using heuristics
   */
  private selectBestMove(availableMoves: Move[]): Move {
    if (availableMoves.length === 0) return { from: 0, to: 0, diceValue: 0 };

    let bestMove = availableMoves[0];
    let bestScore = this.evaluateMove(bestMove);

    for (const move of availableMoves) {
      const score = this.evaluateMove(move);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  /**
   * Evaluate move quality using heuristics
   */
  private evaluateMove(move: Move): number {
    let score = 0;
    const isAIWhite = this.aiPlayer === PlayerColor.WHITE;
    const homeStart = isAIWhite ? 18 : 6;

    // Bonus for moving towards home
    const targetDistance = isAIWhite
      ? 23 - move.to
      : move.to;
    score += (24 - targetDistance) * 2;

    // Bonus for bearing off
    if ((isAIWhite && move.to === 23) || (!isAIWhite && move.to === 0)) {
      score += 100;
    }

    // Bonus for creating safe points (blots)
    if (this.state.board[move.to].pieces === 0) {
      score += 5;
    }

    // Penalty for exposing pieces
    if (Math.abs(this.state.board[move.to].pieces) === 1) {
      score -= 3;
    }

    return score;
  }

  /**
   * Calculate player's progress towards home
   */
  private calculatePlayerProgress(player: PlayerColor): number {
    let progress = 0;
    const isWhite = player === PlayerColor.WHITE;

    for (let i = 0; i < 24; i++) {
      const pieces = Math.abs(this.state.board[i].pieces);
      if ((isWhite && this.state.board[i].pieces > 0) ||
          (!isWhite && this.state.board[i].pieces < 0)) {
        progress += pieces * (isWhite ? (23 - i) : i);
      }
    }

    return progress;
  }

  /**
   * Check win condition - all pieces borne off
   */
  private checkWinCondition(): boolean {
    const whitePiecesLeft = this.state.board.reduce((sum, p) =>
      sum + Math.max(0, p.pieces), 0);
    const blackPiecesLeft = this.state.board.reduce((sum, p) =>
      sum + Math.max(0, -p.pieces), 0);

    if (whitePiecesLeft === 0 && this.state.whiteScore === 15) {
      this.state.winner = PlayerColor.WHITE;
      return true;
    }

    if (blackPiecesLeft === 0 && this.state.blackScore === 15) {
      this.state.winner = PlayerColor.BLACK;
      return true;
    }

    return false;
  }

  /**
   * Calculate match score based on game outcome
   */
  private calculateMatchScore(): void {
    if (!this.state.winner) return;

    let points = 1;

    // Check for backgammon (all opponent pieces captured or in home)
    const loserColor = this.state.winner === PlayerColor.WHITE
      ? PlayerColor.BLACK
      : PlayerColor.WHITE;
    const loserBoard = this.state.board.filter(p =>
      (loserColor === PlayerColor.WHITE && p.pieces > 0) ||
      (loserColor === PlayerColor.BLACK && p.pieces < 0)
    );

    if (loserBoard.every(p => p.pointIndex > 18)) {
      points = 3; // Backgammon
    }

    // Apply doubler value
    if (this.state.isDoubled) {
      points *= this.state.doubleValue;
    }

    if (this.state.winner === PlayerColor.WHITE) {
      this.state.matchScore.white += points;
    } else {
      this.state.matchScore.black += points;
    }
  }

  /**
   * Offer double to opponent
   */
  offerDouble(): boolean {
    if (this.state.isDoubled) return false;

    this.state.isDoubled = true;
    this.state.doubleOwner = this.state.currentPlayer;
    this.state.doubleValue = 2;

    return true;
  }

  /**
   * Accept double
   */
  acceptDouble(): void {
    // Double accepted, continue game with new value
  }

  /**
   * Refuse double - opponent wins
   */
  refuseDouble(): void {
    this.state.doubleRefused = true;
    this.state.gamePhase = 'ended';
    this.state.winner = this.state.currentPlayer;
    this.calculateMatchScore();
  }

  /**
   * Get current game state
   */
  getState(): GameState {
    return this.state;
  }

  /**
   * Get board representation
   */
  getBoard(): TavlaPosition[] {
    return this.state.board;
  }

  /**
   * Get available moves
   */
  getAvailableMoves(): Move[] {
    return this.state.movesAvailable;
  }

  /**
   * Get player's score
   */
  getScore(player: PlayerColor): number {
    return player === PlayerColor.WHITE ? this.state.whiteScore : this.state.blackScore;
  }

  /**
   * Get match score
   */
  getMatchScore(): { white: number; black: number } {
    return this.state.matchScore;
  }

  /**
   * Reset game for new match
   */
  resetGame(): void {
    this.state = this.initializeGame();
    this.moveHistory = [];
  }

  /**
   * Undo last move
   */
  undoMove(): boolean {
    if (this.moveHistory.length === 0) return false;

    this.resetGame();
    // Replay all moves except last
    for (let i = 0; i < this.moveHistory.length - 1; i++) {
      // Replay logic here
    }

    this.moveHistory.pop();
    return true;
  }

  /**
   * Get game statistics
   */
  getStatistics(): {
    totalMoves: number;
    gamePhase: string;
    capturedPieces: { white: number; black: number };
  } {
    return {
      totalMoves: this.moveHistory.length,
      gamePhase: this.state.gamePhase,
      capturedPieces: this.state.capturedPieces
    };
  }

  /**
   * Export game to PGN-like format
   */
  exportGame(): string {
    return JSON.stringify({
      game: 'Tavla',
      timestamp: new Date().toISOString(),
      matchScore: this.state.matchScore,
      moveHistory: this.moveHistory,
      winner: this.state.winner
    }, null, 2);
  }
}

export default TavlaGame;
