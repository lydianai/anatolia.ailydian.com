/**
 * QUEST ENGINE - ANADOLU REALM
 
 *
 * Features:
 * - Turkish-themed quest system
 * - Main story quests (Ana Hikaye)
 * - Side quests (Yan Görevler)
 * - Daily quests (Günlük Görevler)
 * - Achievement tracking
 * - Reward system
 * - Quest chains
 */

export type QuestType = 'main' | 'side' | 'daily' | 'event';
export type QuestStatus = 'locked' | 'available' | 'active' | 'completed' | 'failed';

export interface QuestObjective {
  id: string;
  description: string;
  type: 'collect' | 'kill' | 'talk' | 'reach' | 'use' | 'craft';
  target?: string; // NPC ID, item ID, location ID, etc.
  current: number;
  required: number;
  completed: boolean;
}

export interface QuestReward {
  xp: number;
  gold: number;
  items?: Array<{ id: string; quantity: number }>;
  title?: string;
  unlockQuest?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  story: string; // Detailed narrative
  type: QuestType;
  level: number;
  status: QuestStatus;
  objectives: QuestObjective[];
  rewards: QuestReward;
  prerequisites?: string[]; // Quest IDs that must be completed first
  timeLimit?: number; // Milliseconds (for dailies/events)
  startedAt?: number; // Timestamp
  npcGiver?: string; // NPC who gives the quest
  location?: string; // Zone ID
  icon: string; // Emoji or icon
}

export class QuestEngine {
  private quests: Map<string, Quest> = new Map();
  private activeQuests: Set<string> = new Set();
  private completedQuests: Set<string> = new Set();
  private onQuestUpdate?: (quest: Quest) => void;

  constructor() {
    this.initializeQuests();
  }

  private initializeQuests() {
    // Main Story Quests (Ana Hikaye)
    const mainQuests: Quest[] = [
      {
        id: 'main_001',
        title: 'Anadolu\'ya Hoş Geldin',
        description: 'Dijital Anadolu\'nun kapıları açıldı. Yolculuğuna başla!',
        story: 'Binlerce yıllık tarihe sahip Anadolu toprakları, şimdi dijital bir evrende yeniden doğuyor. Sen, bu yeni dünyanın öncülerinden birisin. İlk adımını at ve efsaneni yaz!',
        type: 'main',
        level: 1,
        status: 'available',
        objectives: [
          {
            id: 'obj_001',
            description: 'Karakterini oluştur',
            type: 'reach',
            target: 'character_created',
            current: 0,
            required: 1,
            completed: false
          },
          {
            id: 'obj_002',
            description: 'İstanbul Taksim Meydanı\'na git',
            type: 'reach',
            target: 'zone_istanbul_taksim',
            current: 0,
            required: 1,
            completed: false
          },
          {
            id: 'obj_003',
            description: 'Rehber NPC Ahmet Bey ile konuş',
            type: 'talk',
            target: 'npc_ahmet_guide',
            current: 0,
            required: 1,
            completed: false
          }
        ],
        rewards: {
          xp: 500,
          gold: 100,
          items: [
            { id: 'item_turkish_tea', quantity: 5 },
            { id: 'item_simit', quantity: 3 }
          ],
          title: 'Anadolu Çömezi'
        },
        npcGiver: 'npc_ahmet_guide',
        location: 'zone_istanbul_taksim',
        icon: '🇹🇷'
      },
      {
        id: 'main_002',
        title: 'İstanbul\'u Keşfet',
        description: 'İstanbul\'un dijital versiyonunu keşfet ve 5 önemli noktayı ziyaret et.',
        story: 'İstanbul, iki kıtayı birleştiren bu muhteşem şehir, dijital dünyada da tüm ihtişamıyla duruyor. Boğaz\'dan Sultanahmet\'e, Galata\'dan Çamlıca\'ya... Keşfet ve öğren!',
        type: 'main',
        level: 3,
        status: 'locked',
        prerequisites: ['main_001'],
        objectives: [
          {
            id: 'obj_004',
            description: 'Taksim Anıtı\'nı ziyaret et',
            type: 'reach',
            target: 'landmark_taksim_monument',
            current: 0,
            required: 1,
            completed: false
          },
          {
            id: 'obj_005',
            description: 'Galata Kulesi\'ne çık',
            type: 'reach',
            target: 'landmark_galata_tower',
            current: 0,
            required: 1,
            completed: false
          },
          {
            id: 'obj_006',
            description: 'Boğaz\'ı geç',
            type: 'reach',
            target: 'landmark_bosphorus',
            current: 0,
            required: 1,
            completed: false
          },
          {
            id: 'obj_007',
            description: 'Sultanahmet Camii\'ni gör',
            type: 'reach',
            target: 'landmark_sultanahmet',
            current: 0,
            required: 1,
            completed: false
          },
          {
            id: 'obj_008',
            description: 'Çamlıca Kulesi\'ne ulaş',
            type: 'reach',
            target: 'landmark_camlica',
            current: 0,
            required: 1,
            completed: false
          }
        ],
        rewards: {
          xp: 1000,
          gold: 250,
          items: [{ id: 'item_istanbul_map', quantity: 1 }],
          title: 'İstanbul Gezgini'
        },
        npcGiver: 'npc_ahmet_guide',
        location: 'zone_istanbul_taksim',
        icon: '🗺️'
      },
      {
        id: 'main_003',
        title: 'Anadolu\'nun Sesi',
        description: '10 farklı NPC ile konuş ve Anadolu kültürünü öğren.',
        story: 'Anadolu\'nun zenginliği, topraklarında değil, insanlarındadır. Her biri bir hikaye, her biri bir kültür... Dinle, öğren, anlat!',
        type: 'main',
        level: 5,
        status: 'locked',
        prerequisites: ['main_002'],
        objectives: [
          {
            id: 'obj_009',
            description: 'Çaycı Mehmet ile konuş',
            type: 'talk',
            target: 'npc_mehmet_teaman',
            current: 0,
            required: 1,
            completed: false
          },
          {
            id: 'obj_010',
            description: '10 farklı NPC ile sohbet et',
            type: 'talk',
            target: 'any_npc',
            current: 0,
            required: 10,
            completed: false
          }
        ],
        rewards: {
          xp: 1500,
          gold: 400,
          items: [
            { id: 'item_turkish_coffee', quantity: 10 },
            { id: 'item_conversation_skill', quantity: 1 }
          ],
          title: 'Anadolu Hikayecisi'
        },
        npcGiver: 'npc_mehmet_teaman',
        location: 'zone_istanbul_taksim',
        icon: '💬'
      }
    ];

    // Side Quests (Yan Görevler)
    const sideQuests: Quest[] = [
      {
        id: 'side_001',
        title: 'Çay Saati',
        description: 'Mehmet Bey\'in çay ocağı için malzeme topla.',
        story: 'Mehmet Bey\'in çay ocağı İstanbul\'un en ünlüsü. Ama malzemeler azaldı. Yardım edebilir misin?',
        type: 'side',
        level: 2,
        status: 'available',
        objectives: [
          {
            id: 'obj_011',
            description: 'Çay yaprağı topla',
            type: 'collect',
            target: 'item_tea_leaves',
            current: 0,
            required: 10,
            completed: false
          },
          {
            id: 'obj_012',
            description: 'Şeker paketi al',
            type: 'collect',
            target: 'item_sugar',
            current: 0,
            required: 5,
            completed: false
          },
          {
            id: 'obj_013',
            description: 'Malzemeleri Mehmet Bey\'e teslim et',
            type: 'talk',
            target: 'npc_mehmet_teaman',
            current: 0,
            required: 1,
            completed: false
          }
        ],
        rewards: {
          xp: 300,
          gold: 150,
          items: [{ id: 'item_premium_tea', quantity: 5 }]
        },
        npcGiver: 'npc_mehmet_teaman',
        location: 'zone_istanbul_taksim',
        icon: '☕'
      },
      {
        id: 'side_002',
        title: 'Simitçi\'nin Derdi',
        description: 'Simitçi Ali\'nin kaybolan arabasını bul.',
        story: 'Simitçi Ali\'nin simit arabası kaybolmuş! Onsuz iş yapamıyor. Arabayı bulup geri getir.',
        type: 'side',
        level: 4,
        status: 'available',
        objectives: [
          {
            id: 'obj_014',
            description: 'Kayıp simit arabasını bul',
            type: 'reach',
            target: 'location_lost_cart',
            current: 0,
            required: 1,
            completed: false
          },
          {
            id: 'obj_015',
            description: 'Arabayı Ali\'ye geri götür',
            type: 'talk',
            target: 'npc_ali_simitci',
            current: 0,
            required: 1,
            completed: false
          }
        ],
        rewards: {
          xp: 500,
          gold: 200,
          items: [
            { id: 'item_simit', quantity: 20 },
            { id: 'item_golden_simit', quantity: 1 }
          ]
        },
        npcGiver: 'npc_ali_simitci',
        location: 'zone_istanbul_taksim',
        icon: '🥯'
      }
    ];

    // Daily Quests (Günlük Görevler)
    const dailyQuests: Quest[] = [
      {
        id: 'daily_001',
        title: 'Günlük Keşif',
        description: 'Bugün 1000 adım at ve dünyayı keşfet.',
        story: 'Her gün yeni bir keşif, her adım yeni bir macera!',
        type: 'daily',
        level: 1,
        status: 'available',
        timeLimit: 24 * 60 * 60 * 1000, // 24 hours
        objectives: [
          {
            id: 'obj_016',
            description: '1000 adım at',
            type: 'reach',
            target: 'steps_1000',
            current: 0,
            required: 1000,
            completed: false
          }
        ],
        rewards: {
          xp: 200,
          gold: 50
        },
        icon: '🚶'
      },
      {
        id: 'daily_002',
        title: 'Sosyal Kelebek',
        description: 'Bugün 5 oyuncu ile sohbet et.',
        story: 'Anadolu Realm bir topluluk. Yeni arkadaşlar edin!',
        type: 'daily',
        level: 1,
        status: 'available',
        timeLimit: 24 * 60 * 60 * 1000,
        objectives: [
          {
            id: 'obj_017',
            description: '5 oyuncu ile sohbet et',
            type: 'talk',
            target: 'player',
            current: 0,
            required: 5,
            completed: false
          }
        ],
        rewards: {
          xp: 150,
          gold: 75,
          items: [{ id: 'item_friendship_token', quantity: 1 }]
        },
        icon: '👥'
      }
    ];

    // Add all quests to the map
    [...mainQuests, ...sideQuests, ...dailyQuests].forEach(quest => {
      this.quests.set(quest.id, quest);
    });
  }

  public getQuest(questId: string): Quest | undefined {
    return this.quests.get(questId);
  }

  public getAllQuests(): Quest[] {
    return Array.from(this.quests.values());
  }

  public getAvailableQuests(): Quest[] {
    return this.getAllQuests().filter(q => q.status === 'available');
  }

  public getActiveQuests(): Quest[] {
    return this.getAllQuests().filter(q => q.status === 'active');
  }

  public getCompletedQuests(): Quest[] {
    return this.getAllQuests().filter(q => q.status === 'completed');
  }

  public getQuestsByType(type: QuestType): Quest[] {
    return this.getAllQuests().filter(q => q.type === type);
  }

  public acceptQuest(questId: string): boolean {
    const quest = this.quests.get(questId);
    if (!quest || quest.status !== 'available') return false;

    // Check prerequisites
    if (quest.prerequisites) {
      const allPrereqsComplete = quest.prerequisites.every(prereqId =>
        this.completedQuests.has(prereqId)
      );
      if (!allPrereqsComplete) return false;
    }

    quest.status = 'active';
    quest.startedAt = Date.now();
    this.activeQuests.add(questId);

    this.onQuestUpdate?.(quest);
    return true;
  }

  public updateObjective(questId: string, objectiveId: string, progress: number): void {
    const quest = this.quests.get(questId);
    if (!quest || quest.status !== 'active') return;

    const objective = quest.objectives.find(obj => obj.id === objectiveId);
    if (!objective) return;

    objective.current = Math.min(progress, objective.required);
    objective.completed = objective.current >= objective.required;

    // Check if all objectives are completed
    const allCompleted = quest.objectives.every(obj => obj.completed);
    if (allCompleted) {
      this.completeQuest(questId);
    } else {
      this.onQuestUpdate?.(quest);
    }
  }

  public completeQuest(questId: string): void {
    const quest = this.quests.get(questId);
    if (!quest || quest.status !== 'active') return;

    quest.status = 'completed';
    this.activeQuests.delete(questId);
    this.completedQuests.add(questId);

    // Unlock next quests
    if (quest.rewards.unlockQuest) {
      const nextQuest = this.quests.get(quest.rewards.unlockQuest);
      if (nextQuest && nextQuest.status === 'locked') {
        nextQuest.status = 'available';
      }
    }

    // Unlock quests that have this quest as prerequisite
    this.getAllQuests().forEach(q => {
      if (q.prerequisites?.includes(questId) && q.status === 'locked') {
        const allPrereqsComplete = q.prerequisites.every(prereqId =>
          this.completedQuests.has(prereqId)
        );
        if (allPrereqsComplete) {
          q.status = 'available';
        }
      }
    });

    this.onQuestUpdate?.(quest);
  }

  public abandonQuest(questId: string): void {
    const quest = this.quests.get(questId);
    if (!quest || quest.status !== 'active') return;

    quest.status = quest.type === 'daily' ? 'available' : 'failed';
    quest.objectives.forEach(obj => {
      obj.current = 0;
      obj.completed = false;
    });

    this.activeQuests.delete(questId);
    this.onQuestUpdate?.(quest);
  }

  public setQuestUpdateCallback(callback: (quest: Quest) => void): void {
    this.onQuestUpdate = callback;
  }

  public getQuestProgress(questId: string): number {
    const quest = this.quests.get(questId);
    if (!quest) return 0;

    const totalObjectives = quest.objectives.length;
    const completedObjectives = quest.objectives.filter(obj => obj.completed).length;

    return totalObjectives > 0 ? (completedObjectives / totalObjectives) * 100 : 0;
  }

  public resetDailyQuests(): void {
    const dailies = this.getQuestsByType('daily');
    dailies.forEach(quest => {
      quest.status = 'available';
      quest.objectives.forEach(obj => {
        obj.current = 0;
        obj.completed = false;
      });
      if (this.activeQuests.has(quest.id)) {
        this.activeQuests.delete(quest.id);
      }
    });
  }
}

// Singleton instance
let questEngineInstance: QuestEngine | null = null;

export function getQuestEngine(): QuestEngine {
  if (!questEngineInstance) {
    questEngineInstance = new QuestEngine();
  }
  return questEngineInstance;
}
