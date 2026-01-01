/**
 * ANADOLU REALM - NPC Behavior Tree System
 * Advanced AI with Turkish cultural behaviors
 */

import * as THREE from 'three';
import { PathfindingSystem, PathRequest } from './PathfindingSystem';

export enum BehaviorStatus {
  SUCCESS = 'success',
  FAILURE = 'failure',
  RUNNING = 'running'
}

export enum NPCType {
  CITIZEN = 'citizen',
  MERCHANT = 'merchant',
  GUARD = 'guard',
  ENEMY = 'enemy',
  // Turkish cultural NPCs
  SIMITTI = 'simitti', // Simit seller
  CAYCI = 'cayci', // Tea seller
  CARPET_WEAVER = 'carpet_weaver',
  IMAM = 'imam',
  FISHERMAN = 'fisherman',
  STREET_MUSICIAN = 'street_musician'
}

export interface NPCState {
  id: string;
  type: NPCType;
  position: THREE.Vector3;
  targetPosition: THREE.Vector3 | null;
  health: number;
  maxHealth: number;
  stamina: number;
  mood: 'happy' | 'neutral' | 'angry' | 'scared';
  schedule: NPCSchedule;
  inventory: string[];
  isMoving: boolean;
  currentPath: THREE.Vector3[];
  currentPathIndex: number;
  lastPlayerInteraction: number;
}

export interface NPCSchedule {
  currentActivity: string;
  timeOfDay: 'morning' | 'noon' | 'evening' | 'night';
  activities: {
    [time: string]: string;
  };
}

// Behavior Tree Node Base
export abstract class BehaviorNode {
  abstract tick(npc: NPCState, deltaTime: number): BehaviorStatus;
}

// Composite Nodes
export class SequenceNode extends BehaviorNode {
  private children: BehaviorNode[];
  private currentChild: number = 0;

  constructor(children: BehaviorNode[]) {
    super();
    this.children = children;
  }

  tick(npc: NPCState, deltaTime: number): BehaviorStatus {
    while (this.currentChild < this.children.length) {
      const status = this.children[this.currentChild].tick(npc, deltaTime);

      if (status === BehaviorStatus.FAILURE) {
        this.currentChild = 0;
        return BehaviorStatus.FAILURE;
      }

      if (status === BehaviorStatus.RUNNING) {
        return BehaviorStatus.RUNNING;
      }

      // SUCCESS, move to next child
      this.currentChild++;
    }

    // All children succeeded
    this.currentChild = 0;
    return BehaviorStatus.SUCCESS;
  }
}

export class SelectorNode extends BehaviorNode {
  private children: BehaviorNode[];

  constructor(children: BehaviorNode[]) {
    super();
    this.children = children;
  }

  tick(npc: NPCState, deltaTime: number): BehaviorStatus {
    for (const child of this.children) {
      const status = child.tick(npc, deltaTime);

      if (status === BehaviorStatus.SUCCESS) {
        return BehaviorStatus.SUCCESS;
      }

      if (status === BehaviorStatus.RUNNING) {
        return BehaviorStatus.RUNNING;
      }

      // Continue to next child on FAILURE
    }

    return BehaviorStatus.FAILURE;
  }
}

// Condition Nodes
export class IsPlayerNearbyNode extends BehaviorNode {
  private radius: number;
  private playerPosition: THREE.Vector3;

  constructor(playerPosition: THREE.Vector3, radius: number = 5) {
    super();
    this.playerPosition = playerPosition;
    this.radius = radius;
  }

  tick(npc: NPCState): BehaviorStatus {
    const distance = npc.position.distanceTo(this.playerPosition);
    return distance < this.radius ? BehaviorStatus.SUCCESS : BehaviorStatus.FAILURE;
  }
}

export class IsHealthLowNode extends BehaviorNode {
  private threshold: number;

  constructor(threshold: number = 0.3) {
    super();
    this.threshold = threshold;
  }

  tick(npc: NPCState): BehaviorStatus {
    const healthPercent = npc.health / npc.maxHealth;
    return healthPercent < this.threshold ? BehaviorStatus.SUCCESS : BehaviorStatus.FAILURE;
  }
}

export class IsTimeOfDayNode extends BehaviorNode {
  private targetTime: string;

  constructor(time: 'morning' | 'noon' | 'evening' | 'night') {
    super();
    this.targetTime = time;
  }

  tick(npc: NPCState): BehaviorStatus {
    return npc.schedule.timeOfDay === this.targetTime
      ? BehaviorStatus.SUCCESS
      : BehaviorStatus.FAILURE;
  }
}

// Action Nodes
export class MoveToNode extends BehaviorNode {
  private pathfinding: PathfindingSystem;
  private speed: number;

  constructor(pathfinding: PathfindingSystem, speed: number = 2) {
    super();
    this.pathfinding = pathfinding;
    this.speed = speed;
  }

  tick(npc: NPCState, deltaTime: number): BehaviorStatus {
    if (!npc.targetPosition) {
      return BehaviorStatus.FAILURE;
    }

    // Find path if needed
    if (npc.currentPath.length === 0) {
      const request: PathRequest = {
        start: npc.position,
        end: npc.targetPosition,
        agentRadius: 0.5
      };

      const result = this.pathfinding.findPath(request);
      if (!result.success) {
        return BehaviorStatus.FAILURE;
      }

      npc.currentPath = result.path;
      npc.currentPathIndex = 0;
      npc.isMoving = true;
    }

    // Follow path
    if (npc.currentPathIndex < npc.currentPath.length) {
      const target = npc.currentPath[npc.currentPathIndex];
      const direction = target.clone().sub(npc.position);
      const distance = direction.length();

      if (distance < 0.5) {
        // Reached waypoint
        npc.currentPathIndex++;
        if (npc.currentPathIndex >= npc.currentPath.length) {
          // Reached final destination
          npc.currentPath = [];
          npc.isMoving = false;
          return BehaviorStatus.SUCCESS;
        }
      } else {
        // Move towards waypoint
        direction.normalize();
        const movement = direction.multiplyScalar(this.speed * deltaTime);
        npc.position.add(movement);
      }

      return BehaviorStatus.RUNNING;
    }

    return BehaviorStatus.SUCCESS;
  }
}

export class WaitNode extends BehaviorNode {
  private duration: number;
  private elapsed: number = 0;

  constructor(duration: number) {
    super();
    this.duration = duration;
  }

  tick(npc: NPCState, deltaTime: number): BehaviorStatus {
    this.elapsed += deltaTime;

    if (this.elapsed >= this.duration) {
      this.elapsed = 0;
      return BehaviorStatus.SUCCESS;
    }

    return BehaviorStatus.RUNNING;
  }
}

export class InteractWithPlayerNode extends BehaviorNode {
  private dialogue: string;

  constructor(dialogue: string) {
    super();
    this.dialogue = dialogue;
  }

  tick(npc: NPCState): BehaviorStatus {
    console.log(`NPC ${npc.id}: ${this.dialogue}`);
    npc.lastPlayerInteraction = Date.now();
    return BehaviorStatus.SUCCESS;
  }
}

// Turkish Cultural Action Nodes
export class SellSimitsNode extends BehaviorNode {
  tick(npc: NPCState): BehaviorStatus {
    console.log(`Simitti ${npc.id}: "Sıcak sıcak simit! Taze simit!"  `);
    return BehaviorStatus.SUCCESS;
  }
}

export class ServeTurkishTeaNode extends BehaviorNode {
  tick(npc: NPCState): BehaviorStatus {
    console.log(`Çaycı ${npc.id}: "Buyurun çayınız! İyi günler!"  `);
    return BehaviorStatus.SUCCESS;
  }
}

export class WeaveC arpetNode extends BehaviorNode {
  private progress: number = 0;

  tick(npc: NPCState, deltaTime: number): BehaviorStatus {
    this.progress += deltaTime;

    if (this.progress >= 10) {
      console.log(`Carpet Weaver ${npc.id}: Finished weaving a beautiful Turkish carpet!`);
      this.progress = 0;
      return BehaviorStatus.SUCCESS;
    }

    return BehaviorStatus.RUNNING;
  }
}

export class CallToPrayerNode extends BehaviorNode {
  private hasCalledToday: boolean = false;

  tick(npc: NPCState): BehaviorStatus {
    if (npc.schedule.timeOfDay === 'noon' && !this.hasCalledToday) {
      console.log(`İmam ${npc.id}: *Ezan okunuyor* Allahu Akbar...`);
      this.hasCalledToday = true;
      return BehaviorStatus.SUCCESS;
    }

    if (npc.schedule.timeOfDay === 'evening') {
      this.hasCalledToday = false;
    }

    return BehaviorStatus.FAILURE;
  }
}

// NPC Behavior Tree Templates
export class NPCBehaviorTreeFactory {
  private pathfinding: PathfindingSystem;

  constructor(pathfinding: PathfindingSystem) {
    this.pathfinding = pathfinding;
  }

  // Create behavior tree for NPC type
  createBehaviorTree(type: NPCType, playerPosition: THREE.Vector3): BehaviorNode {
    switch (type) {
      case NPCType.SIMITTI:
        return this.createSimittiBehavior(playerPosition);

      case NPCType.CAYCI:
        return this.createCayciBehavior(playerPosition);

      case NPCType.CARPET_WEAVER:
        return this.createCarpetWeaverBehavior();

      case NPCType.IMAM:
        return this.createImamBehavior();

      case NPCType.GUARD:
        return this.createGuardBehavior(playerPosition);

      case NPCType.ENEMY:
        return this.createEnemyBehavior(playerPosition);

      case NPCType.CITIZEN:
      default:
        return this.createCitizenBehavior();
    }
  }

  // Simitti (Simit Seller) - Walks around selling simits
  private createSimittiBehavior(playerPosition: THREE.Vector3): BehaviorNode {
    return new SelectorNode([
      // If player nearby, interact
      new SequenceNode([
        new IsPlayerNearbyNode(playerPosition, 3),
        new SellSimitsNode(),
        new WaitNode(2)
      ]),
      // Otherwise, patrol
      new SequenceNode([
        new MoveToNode(this.pathfinding, 1.5),
        new WaitNode(5)
      ])
    ]);
  }

  // Çaycı (Tea Seller) - Serves tea at tea house
  private createCayciBehavior(playerPosition: THREE.Vector3): BehaviorNode {
    return new SelectorNode([
      new SequenceNode([
        new IsPlayerNearbyNode(playerPosition, 2),
        new ServeTurkishTeaNode(),
        new WaitNode(3)
      ]),
      new WaitNode(1) // Idle at tea house
    ]);
  }

  // Carpet Weaver - Works on carpets
  private createCarpetWeaverBehavior(): BehaviorNode {
    return new SequenceNode([
      new WeaveCarpetNode(),
      new WaitNode(2)
    ]);
  }

  // İmam - Calls to prayer
  private createImamBehavior(): BehaviorNode {
    return new SelectorNode([
      new CallToPrayerNode(),
      new WaitNode(1)
    ]);
  }

  // Guard - Patrols and defends
  private createGuardBehavior(playerPosition: THREE.Vector3): BehaviorNode {
    return new SelectorNode([
      // If player too close, warn
      new SequenceNode([
        new IsPlayerNearbyNode(playerPosition, 5),
        new InteractWithPlayerNode("Dikkatli ol, buralar tehlikeli!"),
        new WaitNode(3)
      ]),
      // Patrol
      new SequenceNode([
        new MoveToNode(this.pathfinding, 2),
        new WaitNode(4)
      ])
    ]);
  }

  // Enemy - Attacks player
  private createEnemyBehavior(playerPosition: THREE.Vector3): BehaviorNode {
    return new SelectorNode([
      // If health low, flee
      new SequenceNode([
        new IsHealthLowNode(0.3),
        new MoveToNode(this.pathfinding, 3),
        new WaitNode(1)
      ]),
      // If player nearby, chase
      new SequenceNode([
        new IsPlayerNearbyNode(playerPosition, 10),
        new MoveToNode(this.pathfinding, 2.5),
        new InteractWithPlayerNode("*Saldırıyor!*")
      ]),
      // Otherwise, idle
      new WaitNode(1)
    ]);
  }

  // Citizen - Daily routine
  private createCitizenBehavior(): BehaviorNode {
    return new SelectorNode([
      // Morning: Go to work
      new SequenceNode([
        new IsTimeOfDayNode('morning'),
        new MoveToNode(this.pathfinding, 1.5),
        new WaitNode(10)
      ]),
      // Noon: Work
      new SequenceNode([
        new IsTimeOfDayNode('noon'),
        new WaitNode(5)
      ]),
      // Evening: Go home
      new SequenceNode([
        new IsTimeOfDayNode('evening'),
        new MoveToNode(this.pathfinding, 1.5),
        new WaitNode(5)
      ]),
      // Night: Sleep
      new SequenceNode([
        new IsTimeOfDayNode('night'),
        new WaitNode(1)
      ])
    ]);
  }
}

// NPC Manager
export class NPCManager {
  private npcs: Map<string, NPCState> = new Map();
  private behaviorTrees: Map<string, BehaviorNode> = new Map();
  private factory: NPCBehaviorTreeFactory;
  private playerPosition: THREE.Vector3;

  constructor(pathfinding: PathfindingSystem, playerPosition: THREE.Vector3) {
    this.factory = new NPCBehaviorTreeFactory(pathfinding);
    this.playerPosition = playerPosition;
  }

  // Add NPC
  addNPC(id: string, type: NPCType, position: THREE.Vector3): NPCState {
    const npc: NPCState = {
      id,
      type,
      position: position.clone(),
      targetPosition: null,
      health: 100,
      maxHealth: 100,
      stamina: 100,
      mood: 'neutral',
      schedule: {
        currentActivity: 'idle',
        timeOfDay: 'noon',
        activities: {}
      },
      inventory: [],
      isMoving: false,
      currentPath: [],
      currentPathIndex: 0,
      lastPlayerInteraction: 0
    };

    const behaviorTree = this.factory.createBehaviorTree(type, this.playerPosition);

    this.npcs.set(id, npc);
    this.behaviorTrees.set(id, behaviorTree);

    return npc;
  }

  // Update all NPCs
  update(deltaTime: number): void {
    this.npcs.forEach((npc, id) => {
      const tree = this.behaviorTrees.get(id);
      if (tree) {
        tree.tick(npc, deltaTime);
      }
    });
  }

  // Get NPC
  getNPC(id: string): NPCState | undefined {
    return this.npcs.get(id);
  }

  // Remove NPC
  removeNPC(id: string): void {
    this.npcs.delete(id);
    this.behaviorTrees.delete(id);
  }

  // Get all NPCs
  getAllNPCs(): NPCState[] {
    return Array.from(this.npcs.values());
  }
}
