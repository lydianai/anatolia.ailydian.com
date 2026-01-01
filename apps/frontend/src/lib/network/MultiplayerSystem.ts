/**
 * ANADOLU REALM - Multiplayer Real-time Networking System
 * Client prediction, server reconciliation, and lag compensation
 */

import { io, Socket } from 'socket.io-client';
import * as THREE from 'three';

export interface PlayerState {
  id: string;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  velocity: THREE.Vector3;
  health: number;
  animation: string;
  timestamp: number;
  sequenceNumber: number;
}

export interface InputCommand {
  sequenceNumber: number;
  timestamp: number;
  inputs: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right;
    jump: boolean;
    attack: boolean;
  };
  deltaTime: number;
}

export interface ServerUpdate {
  timestamp: number;
  lastProcessedInput: number;
  players: {
    [id: string]: PlayerState;
  };
}

export class MultiplayerSystem {
  private socket: Socket;
  private clientId: string = '';
  private localPlayer: PlayerState;
  private remotePlayers: Map<string, PlayerState> = new Map();

  // Client prediction
  private pendingInputs: InputCommand[] = [];
  private sequenceNumber: number = 0;

  // Interpolation
  private interpolationBuffer: Map<string, PlayerState[]> = new Map();
  private readonly INTERPOLATION_DELAY = 100; // ms

  // Lag compensation
  private serverTimestamp: number = 0;
  private clientTimestamp: number = 0;
  private latency: number = 0;

  // Network optimization
  private readonly UPDATE_RATE = 60; // ticks per second
  private readonly SNAPSHOT_RATE = 20; // snapshots per second
  private lastSnapshotTime: number = 0;

  // Event callbacks
  private onPlayerJoin?: (playerId: string, state: PlayerState) => void;
  private onPlayerLeave?: (playerId: string) => void;
  private onPlayerUpdate?: (playerId: string, state: PlayerState) => void;

  constructor(serverUrl: string = 'http://localhost:3001') {
    // Initialize local player
    this.localPlayer = {
      id: '',
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      health: 100,
      animation: 'idle',
      timestamp: Date.now(),
      sequenceNumber: 0
    };

    // Connect to server
    this.socket = io(serverUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.setupSocketListeners();
  }

  // Setup socket event listeners
  private setupSocketListeners(): void {
    // Connection established
    this.socket.on('connect', () => {
      console.log('Connected to multiplayer server');
    });

    // Receive client ID
    this.socket.on('client_id', (id: string) => {
      this.clientId = id;
      this.localPlayer.id = id;
      console.log(`Assigned client ID: ${id}`);
    });

    // Server state update
    this.socket.on('server_update', (update: ServerUpdate) => {
      this.handleServerUpdate(update);
    });

    // Player joined
    this.socket.on('player_joined', (data: { id: string; state: PlayerState }) => {
      console.log(`Player joined: ${data.id}`);
      this.remotePlayers.set(data.id, data.state);
      this.interpolationBuffer.set(data.id, [data.state]);
      this.onPlayerJoin?.(data.id, data.state);
    });

    // Player left
    this.socket.on('player_left', (playerId: string) => {
      console.log(`Player left: ${playerId}`);
      this.remotePlayers.delete(playerId);
      this.interpolationBuffer.delete(playerId);
      this.onPlayerLeave?.(playerId);
    });

    // Ping/pong for latency measurement
    this.socket.on('pong', (timestamp: number) => {
      this.latency = Date.now() - timestamp;
    });

    // Disconnection
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  // Send player input to server
  public sendInput(input: Omit<InputCommand, 'sequenceNumber' | 'timestamp'>): void {
    const command: InputCommand = {
      ...input,
      sequenceNumber: this.sequenceNumber++,
      timestamp: Date.now()
    };

    // Send to server
    this.socket.emit('player_input', command);

    // Store for client prediction
    this.pendingInputs.push(command);

    // Apply input locally (client prediction)
    this.applyInput(this.localPlayer, command);
  }

  // Apply input to player state
  private applyInput(player: PlayerState, input: InputCommand): void {
    const moveSpeed = 5; // units per second
    const movement = new THREE.Vector3(0, 0, 0);

    if (input.inputs.forward) movement.z -= moveSpeed * input.deltaTime;
    if (input.inputs.backward) movement.z += moveSpeed * input.deltaTime;
    if (input.inputs.left) movement.x -= moveSpeed * input.deltaTime;
    if (input.inputs.right) movement.x += moveSpeed * input.deltaTime;

    // Apply rotation
    movement.applyEuler(player.rotation);

    // Update velocity
    player.velocity.copy(movement);

    // Update position
    player.position.add(movement);

    // Jump
    if (input.inputs.jump && player.position.y === 0) {
      player.velocity.y = 10;
    }

    // Gravity
    player.velocity.y += -9.8 * input.deltaTime;
    player.position.y = Math.max(0, player.position.y + player.velocity.y * input.deltaTime);

    // Update timestamp and sequence
    player.timestamp = input.timestamp;
    player.sequenceNumber = input.sequenceNumber;

    // Animation
    if (movement.length() > 0.1) {
      player.animation = input.inputs.forward ? 'run' : 'walk';
    } else {
      player.animation = 'idle';
    }
  }

  // Handle server update with reconciliation
  private handleServerUpdate(update: ServerUpdate): void {
    this.serverTimestamp = update.timestamp;

    // Update remote players
    for (const [id, state] of Object.entries(update.players)) {
      if (id === this.clientId) {
        // Server reconciliation for local player
        this.reconcileLocalPlayer(state, update.lastProcessedInput);
      } else {
        // Entity interpolation for remote players
        this.addToInterpolationBuffer(id, state);
      }
    }
  }

  // Server reconciliation
  private reconcileLocalPlayer(serverState: PlayerState, lastProcessedInput: number): void {
    // Remove acknowledged inputs
    this.pendingInputs = this.pendingInputs.filter(
      input => input.sequenceNumber > lastProcessedInput
    );

    // Check if server state matches prediction
    const positionError = this.localPlayer.position.distanceTo(serverState.position);

    if (positionError > 0.5) {
      // Significant error, snap to server state
      console.log(`Position error: ${positionError.toFixed(2)}, reconciling...`);
      this.localPlayer.position.copy(serverState.position);
      this.localPlayer.velocity.copy(serverState.velocity);

      // Re-apply pending inputs
      for (const input of this.pendingInputs) {
        this.applyInput(this.localPlayer, input);
      }
    }
  }

  // Add state to interpolation buffer
  private addToInterpolationBuffer(playerId: string, state: PlayerState): void {
    if (!this.interpolationBuffer.has(playerId)) {
      this.interpolationBuffer.set(playerId, []);
    }

    const buffer = this.interpolationBuffer.get(playerId)!;
    buffer.push(state);

    // Keep buffer size manageable
    if (buffer.length > 20) {
      buffer.shift();
    }

    // Update remote player
    if (!this.remotePlayers.has(playerId)) {
      this.remotePlayers.set(playerId, state);
    }
  }

  // Interpolate remote players
  public update(deltaTime: number): void {
    const renderTime = Date.now() - this.INTERPOLATION_DELAY;

    this.remotePlayers.forEach((player, id) => {
      const buffer = this.interpolationBuffer.get(id);
      if (!buffer || buffer.length < 2) return;

      // Find two states to interpolate between
      let from: PlayerState | null = null;
      let to: PlayerState | null = null;

      for (let i = 0; i < buffer.length - 1; i++) {
        if (buffer[i].timestamp <= renderTime && buffer[i + 1].timestamp >= renderTime) {
          from = buffer[i];
          to = buffer[i + 1];
          break;
        }
      }

      if (!from || !to) {
        // Use latest state
        const latest = buffer[buffer.length - 1];
        player.position.copy(latest.position);
        player.rotation.copy(latest.rotation);
        player.animation = latest.animation;
        return;
      }

      // Interpolate
      const t = (renderTime - from.timestamp) / (to.timestamp - from.timestamp);
      player.position.lerpVectors(from.position, to.position, t);
      player.rotation.x = THREE.MathUtils.lerp(from.rotation.x, to.rotation.x, t);
      player.rotation.y = THREE.MathUtils.lerp(from.rotation.y, to.rotation.y, t);
      player.rotation.z = THREE.MathUtils.lerp(from.rotation.z, to.rotation.z, t);
      player.animation = to.animation;

      this.onPlayerUpdate?.(id, player);
    });

    // Send snapshot if needed
    const now = Date.now();
    if (now - this.lastSnapshotTime >= 1000 / this.SNAPSHOT_RATE) {
      this.sendSnapshot();
      this.lastSnapshotTime = now;
    }

    // Ping for latency measurement
    if (now % 1000 < deltaTime * 1000) {
      this.socket.emit('ping', now);
    }
  }

  // Send full state snapshot
  private sendSnapshot(): void {
    this.socket.emit('player_snapshot', {
      position: this.localPlayer.position.toArray(),
      rotation: [this.localPlayer.rotation.x, this.localPlayer.rotation.y, this.localPlayer.rotation.z],
      velocity: this.localPlayer.velocity.toArray(),
      health: this.localPlayer.health,
      animation: this.localPlayer.animation,
      timestamp: Date.now()
    });
  }

  // Combat actions
  public sendAttack(targetId: string, damage: number): void {
    this.socket.emit('player_attack', {
      targetId,
      damage,
      timestamp: Date.now()
    });
  }

  public sendChatMessage(message: string): void {
    this.socket.emit('chat_message', {
      playerId: this.clientId,
      message,
      timestamp: Date.now()
    });
  }

  // Callbacks
  public onJoin(callback: (playerId: string, state: PlayerState) => void): void {
    this.onPlayerJoin = callback;
  }

  public onLeave(callback: (playerId: string) => void): void {
    this.onPlayerLeave = callback;
  }

  public onUpdate(callback: (playerId: string, state: PlayerState) => void): void {
    this.onPlayerUpdate = callback;
  }

  // Getters
  public getLocalPlayer(): PlayerState {
    return this.localPlayer;
  }

  public getRemotePlayers(): Map<string, PlayerState> {
    return this.remotePlayers;
  }

  public getLatency(): number {
    return this.latency;
  }

  public getClientId(): string {
    return this.clientId;
  }

  // Disconnect
  public disconnect(): void {
    this.socket.disconnect();
  }
}
