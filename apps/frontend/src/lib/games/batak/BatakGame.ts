/**
 * BATAK - Turkish Trick-Taking Card Game
 * Complete game logic with AI players, multiplayer support, and scoring
 * Fast-paced game with bidding and strategic play
 */

export enum Suit {
  SPADES = 'spades',
  HEARTS = 'hearts',
  DIAMONDS = 'diamonds',
  CLUBS = 'clubs'
}

export enum Rank {
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
  ACE = 'A'
}

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  value: number; // Bidding points: Ace=11, 10=10, K=4, Q=3, J=2
}

export interface Bid {
  playerPosition: number;
  amount: number;
  trump: Suit | null;
  timestamp: number;
}

export interface Trick {
  cards: Map<number, Card>; // player position -> card
  winner: number | null;
  suit: Suit;
  sequence: number;
}

export interface PlayerInfo {
  position: number;
  isAI: boolean;
  hand: Card[];
  tricks: Trick[];
  bid: Bid | null;
  score: number;
  roundScore: number;
  bidsMade: number;
  hasPlayed: boolean;
  lastCard: Card | null;
}

export interface GameState {
  players: PlayerInfo[];
  deck: Card[];
  trump: Suit | null;
  currentTrick: Trick;
  tricks: Trick[];
  bids: Bid[];
  currentPlayer: number;
  gamePhase: 'setup' | 'bidding' | 'playing' | 'round_end' | 'game_end';
  roundNumber: number;
  totalRounds: number;
  winner: number | null;
  dealerPosition: number;
  totalScore: { [key: number]: number };
  gameHistory: Array<{
    round: number;
    winner: number;
    score: number;
    trump: Suit;
  }>;
  playedCards: Map<number, Card>;
}

export class BatakGame {
  private state: GameState;
  private aiPlayers: Set<number>;
  private pointValues: { [key in Rank]: number } = {
    [Rank.ACE]: 11,
    [Rank.TEN]: 10,
    [Rank.KING]: 4,
    [Rank.QUEEN]: 3,
    [Rank.JACK]: 2,
    [Rank.TWO]: 0,
    [Rank.THREE]: 0,
    [Rank.FOUR]: 0,
    [Rank.FIVE]: 0,
    [Rank.SIX]: 0,
    [Rank.SEVEN]: 0,
    [Rank.EIGHT]: 0,
    [Rank.NINE]: 0
  };

  constructor(playerCount: number = 4, aiPositions: number[] = []) {
    this.aiPlayers = new Set(aiPositions);
    this.state = this.initializeGame(playerCount);
  }

  /**
   * Initialize game
   */
  private initializeGame(playerCount: number): GameState {
    const players: PlayerInfo[] = [];

    for (let i = 0; i < playerCount; i++) {
      players.push({
        position: i,
        isAI: this.aiPlayers.has(i),
        hand: [],
        tricks: [],
        bid: null,
        score: 0,
        roundScore: 0,
        bidsMade: 0,
        hasPlayed: false,
        lastCard: null
      });
    }

    return {
      players,
      deck: this.createDeck(),
      trump: null,
      currentTrick: {
        cards: new Map(),
        winner: null,
        suit: Suit.SPADES,
        sequence: 0
      },
      tricks: [],
      bids: [],
      currentPlayer: 0,
      gamePhase: 'setup',
      roundNumber: 1,
      totalRounds: 8,
      winner: null,
      dealerPosition: 0,
      totalScore: {},
      gameHistory: [],
      playedCards: new Map()
    };
  }

  /**
   * Create standard 52-card deck
   */
  private createDeck(): Card[] {
    const deck: Card[] = [];
    const suits = [Suit.SPADES, Suit.HEARTS, Suit.DIAMONDS, Suit.CLUBS];
    const ranks = [
      Rank.TWO,
      Rank.THREE,
      Rank.FOUR,
      Rank.FIVE,
      Rank.SIX,
      Rank.SEVEN,
      Rank.EIGHT,
      Rank.NINE,
      Rank.TEN,
      Rank.JACK,
      Rank.QUEEN,
      Rank.KING,
      Rank.ACE
    ];

    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({
          id: `${suit}-${rank}`,
          suit,
          rank,
          value: this.pointValues[rank]
        });
      }
    }

    return deck.sort(() => Math.random() - 0.5);
  }

  /**
   * Deal cards to players (13 cards each)
   */
  startRound(): void {
    // Reset round state
    this.state.deck = this.createDeck();
    this.state.bids = [];
    this.state.tricks = [];
    this.state.playedCards = new Map();
    this.state.trump = null;

    // Update dealer position
    this.state.dealerPosition = (this.state.dealerPosition + 1) % this.state.players.length;

    // Reset player hands
    for (const player of this.state.players) {
      player.hand = [];
      player.tricks = [];
      player.bid = null;
      player.roundScore = 0;
      player.hasPlayed = false;
    }

    // Deal 13 cards to each player
    for (let cardIndex = 0; cardIndex < 13; cardIndex++) {
      for (const player of this.state.players) {
        if (this.state.deck.length > 0) {
          player.hand.push(this.state.deck.pop()!);
        }
      }
    }

    // Start bidding phase
    this.state.gamePhase = 'bidding';
    this.state.currentPlayer = (this.state.dealerPosition + 1) % this.state.players.length;
  }

  /**
   * Player places a bid
   */
  placeBid(playerPosition: number, amount: number, trump: Suit | null): boolean {
    if (this.state.gamePhase !== 'bidding') return false;
    if (this.state.currentPlayer !== playerPosition) return false;
    if (amount < 51 || amount > 120) return false; // Valid bid range

    const bid: Bid = {
      playerPosition,
      amount,
      trump,
      timestamp: Date.now()
    };

    this.state.bids.push(bid);
    this.state.players[playerPosition].bid = bid;
    this.state.trump = trump;

    // Move to next player
    this.nextBidder();

    // Check if bidding is complete
    if (this.isBiddingComplete()) {
      this.startPlayPhase();
    }

    return true;
  }

  /**
   * Player passes on bidding
   */
  passBid(playerPosition: number): boolean {
    if (this.state.gamePhase !== 'bidding') return false;
    if (this.state.currentPlayer !== playerPosition) return false;

    this.state.players[playerPosition].bid = { playerPosition, amount: 0, trump: null, timestamp: Date.now() };

    this.nextBidder();

    if (this.isBiddingComplete()) {
      this.startPlayPhase();
    }

    return true;
  }

  /**
   * Move to next bidder
   */
  private nextBidder(): void {
    let nextPlayer = (this.state.currentPlayer + 1) % this.state.players.length;

    // Skip dealer in first round of bidding
    if (nextPlayer === this.state.dealerPosition && this.state.bids.length < this.state.players.length) {
      nextPlayer = (nextPlayer + 1) % this.state.players.length;
    }

    this.state.currentPlayer = nextPlayer;

    // Execute AI bid if needed
    if (this.state.players[this.state.currentPlayer].isAI) {
      setTimeout(() => this.executeAIBid(), 800);
    }
  }

  /**
   * Check if bidding phase is complete
   */
  private isBiddingComplete(): boolean {
    return (
      this.state.bids.length === this.state.players.length &&
      this.state.bids.some(b => b.amount > 0)
    );
  }

  /**
   * Execute AI bidding strategy
   */
  private executeAIBid(): void {
    const player = this.state.players[this.state.currentPlayer];
    const handStrength = this.evaluateHandStrength(player.hand);

    let bidAmount = 0;
    let trump: Suit | null = null;

    if (handStrength > 65) {
      // Strong hand - bid higher
      bidAmount = 70 + Math.floor(handStrength / 2);
      trump = this.selectBestTrump(player.hand);
    } else if (handStrength > 50) {
      // Medium hand - conservative bid
      bidAmount = 60;
      trump = this.selectBestTrump(player.hand);
    } else {
      // Weak hand - pass
      this.passBid(this.state.currentPlayer);
      return;
    }

    this.placeBid(this.state.currentPlayer, Math.min(bidAmount, 120), trump);
  }

  /**
   * Evaluate hand strength for AI
   */
  private evaluateHandStrength(hand: Card[]): number {
    let strength = 0;

    for (const card of hand) {
      // Add base value
      strength += card.value;

      // Bonus for high cards
      if (
        card.rank === Rank.ACE ||
        card.rank === Rank.KING ||
        card.rank === Rank.QUEEN
      ) {
        strength += 3;
      }

      // Bonus for suit length (more cards of same suit)
      const suitCount = hand.filter(c => c.suit === card.suit).length;
      if (suitCount >= 4) {
        strength += 2;
      }
    }

    return Math.min(strength, 120);
  }

  /**
   * Select best trump suit based on hand
   */
  private selectBestTrump(hand: Card[]): Suit {
    const suitStrengths: { [key in Suit]: number } = {
      [Suit.SPADES]: 0,
      [Suit.HEARTS]: 0,
      [Suit.DIAMONDS]: 0,
      [Suit.CLUBS]: 0
    };

    for (const card of hand) {
      suitStrengths[card.suit] += card.value;
    }

    let bestSuit = Suit.SPADES;
    let bestScore = suitStrengths[Suit.SPADES];

    for (const suit of Object.values(Suit)) {
      if (suitStrengths[suit] > bestScore) {
        bestScore = suitStrengths[suit];
        bestSuit = suit;
      }
    }

    return bestSuit;
  }

  /**
   * Start playing phase
   */
  private startPlayPhase(): void {
    this.state.gamePhase = 'playing';

    // Find highest bidder
    let highestBidder = 0;
    let highestBidAmount = 0;

    for (const bid of this.state.bids) {
      if (bid.amount > highestBidAmount) {
        highestBidAmount = bid.amount;
        highestBidder = bid.playerPosition;
      }
    }

    this.state.currentPlayer = (this.state.dealerPosition + 1) % this.state.players.length;

    // Start first trick
    this.state.currentTrick = {
      cards: new Map(),
      winner: null,
      suit: Suit.SPADES,
      sequence: 1
    };
  }

  /**
   * Play a card
   */
  playCard(playerPosition: number, cardId: string): boolean {
    if (this.state.gamePhase !== 'playing') return false;
    if (this.state.currentPlayer !== playerPosition) return false;

    const player = this.state.players[playerPosition];
    const cardIndex = player.hand.findIndex(c => c.id === cardId);

    if (cardIndex === -1) return false;

    const card = player.hand.splice(cardIndex, 1)[0];

    // Validate card play according to rules
    if (!this.isValidCardPlay(card, player)) {
      player.hand.push(card); // Return card to hand if invalid
      return false;
    }

    // Play the card
    this.state.currentTrick.cards.set(playerPosition, card);
    player.lastCard = card;

    // If trick is complete, determine winner
    if (this.state.currentTrick.cards.size === this.state.players.length) {
      this.completeTrick();
    } else {
      // Move to next player
      this.state.currentPlayer = (this.state.currentPlayer + 1) % this.state.players.length;

      // Execute AI move if needed
      if (this.state.players[this.state.currentPlayer].isAI) {
        setTimeout(() => this.executeAIPlay(), 800);
      }
    }

    return true;
  }

  /**
   * Validate card play against Batak rules
   */
  private isValidCardPlay(card: Card, player: PlayerInfo): boolean {
    // First card in trick sets the suit
    if (this.state.currentTrick.cards.size === 0) {
      this.state.currentTrick.suit = card.suit;
      return true;
    }

    const trickSuit = this.state.currentTrick.suit;

    // Must follow suit if possible
    const mustFollowSuit = player.hand.some(c => c.suit === trickSuit);
    if (mustFollowSuit && card.suit !== trickSuit && card.suit !== this.state.trump) {
      return false;
    }

    // If trump is played, can't play a non-trump non-suit card
    const hasTrump = player.hand.some(c => c.suit === this.state.trump);
    if (
      this.state.currentTrick.cards.size > 0 &&
      this.state.currentTrick.cards.values().next().value?.suit === this.state.trump &&
      hasTrump &&
      card.suit !== this.state.trump
    ) {
      return false;
    }

    return true;
  }

  /**
   * Complete current trick
   */
  private completeTrick(): void {
    // Determine trick winner
    let winner = 0;
    let winningCard: Card | null = null;
    const trickCards = Array.from(this.state.currentTrick.cards.entries());

    for (const [playerPosition, card] of trickCards) {
      if (winningCard === null) {
        winner = playerPosition;
        winningCard = card;
      } else {
        const playerWins =
          (card.suit === this.state.trump && winningCard.suit !== this.state.trump) ||
          (card.suit === winningCard.suit && this.getCardRank(card) > this.getCardRank(winningCard));

        if (playerWins) {
          winner = playerPosition;
          winningCard = card;
        }
      }
    }

    this.state.currentTrick.winner = winner;
    this.state.players[winner].tricks.push(this.state.currentTrick);
    this.state.tricks.push(this.state.currentTrick);

    // Check if game is over
    if (this.state.players[0].hand.length === 0) {
      this.endRound();
    } else {
      // Start new trick - winner plays first
      this.state.currentPlayer = winner;
      this.state.currentTrick = {
        cards: new Map(),
        winner: null,
        suit: Suit.SPADES,
        sequence: this.state.currentTrick.sequence + 1
      };

      // Execute AI move if needed
      if (this.state.players[this.state.currentPlayer].isAI) {
        setTimeout(() => this.executeAIPlay(), 800);
      }
    }
  }

  /**
   * Get card rank for comparison (Ace=14, King=13, Queen=12, Jack=11, ...)
   */
  private getCardRank(card: Card): number {
    const rankMap: { [key in Rank]: number } = {
      [Rank.TWO]: 2,
      [Rank.THREE]: 3,
      [Rank.FOUR]: 4,
      [Rank.FIVE]: 5,
      [Rank.SIX]: 6,
      [Rank.SEVEN]: 7,
      [Rank.EIGHT]: 8,
      [Rank.NINE]: 9,
      [Rank.TEN]: 10,
      [Rank.JACK]: 11,
      [Rank.QUEEN]: 12,
      [Rank.KING]: 13,
      [Rank.ACE]: 14
    };

    return rankMap[card.rank];
  }

  /**
   * Execute AI card play
   */
  private executeAIPlay(): void {
    const player = this.state.players[this.state.currentPlayer];
    const cardToPlay = this.selectBestCard(player);

    if (cardToPlay) {
      this.playCard(this.state.currentPlayer, cardToPlay.id);
    }
  }

  /**
   * Select best card to play for AI
   */
  private selectBestCard(player: PlayerInfo): Card | null {
    if (player.hand.length === 0) return null;

    const validCards = player.hand.filter(c => this.isValidCardPlay(c, player));

    if (validCards.length === 0) {
      return player.hand[0];
    }

    // If first card in trick, play strategically
    if (this.state.currentTrick.cards.size === 0) {
      // Play a low card to test
      return validCards.sort((a, b) => a.value - b.value)[0];
    }

    // Otherwise, try to win or lose strategically
    const trickWinner = this.state.players
      .find(p => Array.from(this.state.currentTrick.cards.keys()).includes(p.position))!;

    const canWin = validCards.some(c => this.wouldWinTrick(c));

    if (canWin) {
      // Win with lowest possible card
      return validCards
        .filter(c => this.wouldWinTrick(c))
        .sort((a, b) => a.value - b.value)[0];
    } else {
      // Lose with lowest card
      return validCards.sort((a, b) => a.value - b.value)[0];
    }
  }

  /**
   * Check if card would win current trick
   */
  private wouldWinTrick(card: Card): boolean {
    const trickCards = Array.from(this.state.currentTrick.cards.values());
    for (const trickCard of trickCards) {
      if (
        card.suit === Suit.CLUBS &&
        trickCard.suit !== Suit.CLUBS
      ) {
        return true;
      }

      if (card.suit === trickCard.suit && this.getCardRank(card) > this.getCardRank(trickCard)) {
        return true;
      }
    }

    return false;
  }

  /**
   * End round and calculate scores
   */
  private endRound(): void {
    const highestBid = Math.max(...this.state.bids.map(b => b.amount));
    const bidder = this.state.bids.find(b => b.amount === highestBid)?.playerPosition || 0;

    const bidderTricks = this.state.players[bidder].tricks.length;
    const bidderScore = this.calculateTricksScore(this.state.players[bidder].tricks);

    // Score bidder
    if (bidderTricks >= highestBid / 10) {
      this.state.players[bidder].roundScore = bidderScore;
    } else {
      this.state.players[bidder].roundScore = -highestBid;
    }

    // Score other players
    for (let i = 0; i < this.state.players.length; i++) {
      if (i !== bidder) {
        this.state.players[i].roundScore = this.calculateTricksScore(
          this.state.players[i].tricks
        );
      }
    }

    // Update total scores
    for (const player of this.state.players) {
      this.state.totalScore[player.position] = (this.state.totalScore[player.position] || 0) + player.roundScore;
    }

    this.state.gameHistory.push({
      round: this.state.roundNumber,
      winner: bidder,
      score: this.state.players[bidder].roundScore,
      trump: this.state.trump || Suit.SPADES
    });

    // Move to next round or end game
    if (this.state.roundNumber < this.state.totalRounds) {
      this.state.roundNumber++;
      this.startRound();
    } else {
      this.endGame();
    }
  }

  /**
   * Calculate score from tricks
   */
  private calculateTricksScore(tricks: Trick[]): number {
    let score = 0;

    for (const trick of tricks) {
      const cards = Array.from(trick.cards.values());
      for (const card of cards) {
        score += card.value;
      }
    }

    return score;
  }

  /**
   * End game and determine winner
   */
  private endGame(): void {
    this.state.gamePhase = 'game_end';

    let maxScore = -Infinity;
    let gameWinner = 0;

    for (const player of this.state.players) {
      if (this.state.totalScore[player.position] > maxScore) {
        maxScore = this.state.totalScore[player.position];
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
  getPlayerHand(position: number): Card[] {
    return this.state.players[position].hand;
  }

  /**
   * Get player's score
   */
  getPlayerScore(position: number): number {
    return this.state.totalScore[position] || 0;
  }

  /**
   * Get all players
   */
  getPlayers(): PlayerInfo[] {
    return this.state.players;
  }

  /**
   * Get game statistics
   */
  getStatistics(): {
    roundNumber: number;
    currentPlayer: number;
    trickNumber: number;
    gamePhase: string;
    trump: Suit | null;
  } {
    return {
      roundNumber: this.state.roundNumber,
      currentPlayer: this.state.currentPlayer,
      trickNumber: this.state.currentTrick.sequence,
      gamePhase: this.state.gamePhase,
      trump: this.state.trump
    };
  }

  /**
   * Export game to JSON format
   */
  exportGame(): string {
    return JSON.stringify(
      {
        game: 'Batak',
        timestamp: new Date().toISOString(),
        finalScores: this.state.players.map(p => ({
          player: p.position,
          score: this.state.totalScore[p.position] || 0,
          tricks: p.tricks.length
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
    this.state = this.initializeGame(this.state.players.length);
  }
}

export default BatakGame;
