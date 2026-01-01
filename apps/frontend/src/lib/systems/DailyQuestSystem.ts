/**
 * TÜRK GÜNLÜK GÖREV SİSTEMİ
 * World of Warcraft + Final Fantasy XIV kalitesinde
 * Türk kültürüne özel daily quest mekanikleri
 */

export enum QuestCategory {
  SOSYAL = 'sosyal', // Sosyal görevler (çay iç, sohbet et)
  TICARET = 'ticaret', // Ticaret görevleri (pazarlık, sat)
  KULTUR = 'kultur', // Kültürel görevler (müze ziyaret, festival)
  PROFESYON = 'profesyon', // Meslek görevleri (simit sat, taksi sür)
  COMBATIVE = 'combative', // Savaş görevleri
  COLLECTION = 'collection', // Toplama görevleri
  CRAFTING = 'crafting', // Crafting görevleri
  EXPLORATION = 'exploration', // Keşif görevleri
  BAYRAM = 'bayram', // Bayram özel görevleri
}

export enum QuestDifficulty {
  KOLAY = 'kolay', // Kolay görevler (5-10 dk)
  NORMAL = 'normal', // Normal görevler (15-30 dk)
  ZOR = 'zor', // Zor görevler (30-60 dk)
  EFSANE = 'efsane', // Efsane görevler (1+ saat)
}

export enum QuestRarity {
  COMMON = 'common', // Her gün çıkabilir
  UNCOMMON = 'uncommon', // Bazen çıkar
  RARE = 'rare', // Nadir çıkar
  EPIC = 'epic', // Çok nadir
  LEGENDARY = 'legendary', // Haftalık özel
}

export interface QuestObjective {
  id: string;
  description: string;
  type: 'collect' | 'kill' | 'talk' | 'visit' | 'craft' | 'trade' | 'eat' | 'drink';
  target: string; // Hedef (örn: "Çay", "Simit", "NPC:Ahmet")
  current: number;
  required: number;
  location?: string; // İstanbul/Taksim/Beyoğlu
  completed: boolean;
}

export interface QuestReward {
  xp: number;
  gold: number;
  items?: Array<{
    id: string;
    name: string;
    quantity: number;
    icon: string;
  }>;
  reputation?: Array<{
    faction: string; // "Taksim Esnafı", "Beyoğlu Sakinleri"
    amount: number;
  }>;
  title?: string; // "Çaycı", "Simitçi Ustası"
  achievement?: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  story: string; // Görev hikayesi (Türkçe)
  npcName: string; // Görevi veren NPC
  npcAvatar: string;
  npcDialog: string[]; // NPC konuşmaları
  category: QuestCategory;
  difficulty: QuestDifficulty;
  rarity: QuestRarity;
  timeLimit?: number; // Saniye cinsinden (opsiyonel)
  objectives: QuestObjective[];
  rewards: QuestReward;
  prerequisite?: string[]; // Önkoşul görev ID'leri
  repeatable: boolean; // Günlük tekrarlanabilir mi?
  weeklyOnly: boolean; // Sadece haftalık mı?
  icon: string;
  region: string; // Istanbul, Ankara, Izmir
  isActive: boolean;
  startTime?: Date;
  endTime?: Date;
  completedToday: boolean;
  completedCount: number; // Kaç kere tamamlandı
  firstTimeBonus?: QuestReward; // İlk tamamlama bonusu
}

export interface DailyQuestProgress {
  questId: string;
  startedAt: Date;
  objectives: Record<string, number>; // objective.id -> current progress
  completed: boolean;
  completedAt?: Date;
  claimed: boolean; // Ödül alındı mı?
}

/**
 * TÜRK KÜLTÜRÜNE ÖZEL GÜNLÜK GÖREVLER
 */
export const TURKISH_DAILY_QUESTS: DailyQuest[] = [
  // SOSYAL GÖREVLER
  {
    id: 'sabah-cayi',
    title: 'Sabah Çayı Geleneği',
    description: 'Taksim Çay Evi\'nde sabah çayını iç ve 3 kişiyle sohbet et',
    story: 'Taksimci Ahmet abi: "Hayat çay ile başlar evladım. Gel otur, bir çay iç, muhabbetini et."',
    npcName: 'Taksimci Ahmet',
    npcAvatar: '/npcs/taksimci-ahmet.png',
    npcDialog: [
      'Günaydın! Çay demledim, gel otur.',
      'Bu saatte çaysız olmaz vallahi.',
      'Sohbet muhabbet, işte hayat budur.'
    ],
    category: QuestCategory.SOSYAL,
    difficulty: QuestDifficulty.KOLAY,
    rarity: QuestRarity.COMMON,
    objectives: [
      {
        id: 'obj-1',
        description: 'Çay Evi\'ne git',
        type: 'visit',
        target: 'Taksim Çay Evi',
        current: 0,
        required: 1,
        location: 'Istanbul/Taksim',
        completed: false
      },
      {
        id: 'obj-2',
        description: 'Çay iç',
        type: 'drink',
        target: 'Türk Çayı',
        current: 0,
        required: 1,
        completed: false
      },
      {
        id: 'obj-3',
        description: 'Oyuncularla sohbet et',
        type: 'talk',
        target: 'Player',
        current: 0,
        required: 3,
        completed: false
      }
    ],
    rewards: {
      xp: 250,
      gold: 150,
      items: [
        {
          id: 'item-cay-bardagi',
          name: 'Altın Yaldızlı Çay Bardağı',
          quantity: 1,
          icon: '🫖'
        }
      ],
      reputation: [
        {
          faction: 'Taksim Esnafı',
          amount: 50
        }
      ]
    },
    repeatable: true,
    weeklyOnly: false,
    icon: '☕',
    region: 'Istanbul',
    isActive: true,
    completedToday: false,
    completedCount: 0
  },
  {
    id: 'simit-dagiticisi',
    title: 'Simitçi Yardımcısı',
    description: 'Simitçi Mehmet\'e yardım et: 20 simit sat',
    story: 'Simitçi Mehmet: "Bugün çok yoğunuz, yardım edersen çok sevinirim. Şu simitleri sat bakalım!"',
    npcName: 'Simitçi Mehmet',
    npcAvatar: '/npcs/simitci-mehmet.png',
    npcDialog: [
      'Taze simit! Al bir tane!',
      'Sıcacık fırından çıktı!',
      'Simitin yanına ayran da var!'
    ],
    category: QuestCategory.PROFESYON,
    difficulty: QuestDifficulty.NORMAL,
    rarity: QuestRarity.COMMON,
    timeLimit: 1800, // 30 dakika
    objectives: [
      {
        id: 'obj-1',
        description: 'Tezgahtan simit al',
        type: 'collect',
        target: 'Taze Simit',
        current: 0,
        required: 20,
        location: 'Istanbul/Taksim/Simitçi Tezgahı',
        completed: false
      },
      {
        id: 'obj-2',
        description: 'Simit sat (oyunculara veya NPC\'lere)',
        type: 'trade',
        target: 'Taze Simit',
        current: 0,
        required: 20,
        completed: false
      }
    ],
    rewards: {
      xp: 500,
      gold: 300,
      items: [
        {
          id: 'item-simit-sepeti',
          name: 'Simitçi Sepeti',
          quantity: 1,
          icon: '🧺'
        }
      ],
      reputation: [
        {
          faction: 'Taksim Esnafı',
          amount: 100
        }
      ],
      title: 'Simitçi Çırağı'
    },
    repeatable: true,
    weeklyOnly: false,
    icon: '🥨',
    region: 'Istanbul',
    isActive: true,
    completedToday: false,
    completedCount: 0
  },

  // TİCARET GÖREVLERİ
  {
    id: 'kapali-carsi-ticaret',
    title: 'Kapalıçarşı Ticaret Ustası',
    description: 'Kapalıçarşı\'da 5 farklı eşya al ve %15 kârla sat',
    story: 'Halıcı Hüseyin: "Ticaret bir sanattır evladım. Al ucuzundan, sat pahalısından. Ama dürüst ol!"',
    npcName: 'Halıcı Hüseyin',
    npcAvatar: '/npcs/halici-huseyin.png',
    npcDialog: [
      'Buyrun buyrun, en kaliteli halılar burada!',
      'Pazarlık yapabiliriz tabii.',
      'Fiyat vermeden gitmeyin!'
    ],
    category: QuestCategory.TICARET,
    difficulty: QuestDifficulty.ZOR,
    rarity: QuestRarity.UNCOMMON,
    objectives: [
      {
        id: 'obj-1',
        description: 'Kapalıçarşı\'ya git',
        type: 'visit',
        target: 'Kapalıçarşı',
        current: 0,
        required: 1,
        location: 'Istanbul/Eminönü/Kapalıçarşı',
        completed: false
      },
      {
        id: 'obj-2',
        description: 'Farklı eşyalar al',
        type: 'collect',
        target: 'Any Item',
        current: 0,
        required: 5,
        completed: false
      },
      {
        id: 'obj-3',
        description: '%15 kârla sat',
        type: 'trade',
        target: 'Sold Items',
        current: 0,
        required: 5,
        completed: false
      }
    ],
    rewards: {
      xp: 1000,
      gold: 1500,
      items: [
        {
          id: 'item-ticaret-rozeti',
          name: 'Tüccar Rozeti',
          quantity: 1,
          icon: '🏪'
        }
      ],
      reputation: [
        {
          faction: 'Kapalıçarşı Esnafı',
          amount: 200
        }
      ],
      title: 'Tüccar Çırağı'
    },
    repeatable: true,
    weeklyOnly: false,
    icon: '🏬',
    region: 'Istanbul',
    isActive: true,
    completedToday: false,
    completedCount: 0
  },

  // KÜLTÜREL GÖREVLER
  {
    id: 'bogazda-vapur',
    title: 'Boğaz Turu',
    description: 'Boğaz\'da vapur turuna çık, simit-çay iç, 5 fotoğraf çek',
    story: 'Kaptan Hasan: "Boğaz\'ın güzelliğini görmeden İstanbul\'u bilmiş sayılmazsın. Gel bir tur atalım!"',
    npcName: 'Kaptan Hasan',
    npcAvatar: '/npcs/kaptan-hasan.png',
    npcDialog: [
      'Hoş geldiniz! Vapur kalkıyor!',
      'Simit-çay isteyen buraya!',
      'Ayasofya\'yı görüyor musunuz sağda?'
    ],
    category: QuestCategory.KULTUR,
    difficulty: QuestDifficulty.KOLAY,
    rarity: QuestRarity.UNCOMMON,
    timeLimit: 2400, // 40 dakika
    objectives: [
      {
        id: 'obj-1',
        description: 'Vapur iskelesine git',
        type: 'visit',
        target: 'Eminönü Vapur İskelesi',
        current: 0,
        required: 1,
        location: 'Istanbul/Eminönü',
        completed: false
      },
      {
        id: 'obj-2',
        description: 'Simit-çay al',
        type: 'collect',
        target: 'Simit-Çay',
        current: 0,
        required: 1,
        completed: false
      },
      {
        id: 'obj-3',
        description: 'Boğaz manzarası fotoğrafla',
        type: 'collect',
        target: 'Fotoğraf',
        current: 0,
        required: 5,
        location: 'Boğaz',
        completed: false
      }
    ],
    rewards: {
      xp: 750,
      gold: 500,
      items: [
        {
          id: 'item-bogaz-kartpostali',
          name: 'Boğaz Kartpostalı',
          quantity: 5,
          icon: '🖼️'
        },
        {
          id: 'item-vapur-bileti',
          name: 'Altın Vapur Bileti (Sınırsız)',
          quantity: 1,
          icon: '🎫'
        }
      ],
      reputation: [
        {
          faction: 'İstanbul Balıkçıları',
          amount: 150
        }
      ]
    },
    repeatable: true,
    weeklyOnly: false,
    icon: '⛴️',
    region: 'Istanbul',
    isActive: true,
    completedToday: false,
    completedCount: 0,
    firstTimeBonus: {
      xp: 2000,
      gold: 1000,
      items: [
        {
          id: 'achievement-bogaz-gezgini',
          name: 'Boğaz Gezgini Başarımı',
          quantity: 1,
          icon: '🏆'
        }
      ]
    }
  },

  // BAYRAM ÖZEL GÖREVLER
  {
    id: 'ramazan-iftar',
    title: 'Ramazan İftarı',
    description: 'Sultanahmet\'te iftar sofrasına katıl, 3 farklı yemek ye',
    story: 'İmam Hoca: "Ramazan ayının bereketi üzerinize olsun. İftar soframıza buyurun!"',
    npcName: 'İmam Hoca',
    npcAvatar: '/npcs/imam-hoca.png',
    npcDialog: [
      'Hayırlı iftarlar!',
      'Soframız açık, buyurun!',
      'Allah kabul etsin.'
    ],
    category: QuestCategory.BAYRAM,
    difficulty: QuestDifficulty.KOLAY,
    rarity: QuestRarity.EPIC,
    timeLimit: 3600, // 1 saat
    objectives: [
      {
        id: 'obj-1',
        description: 'Sultanahmet Camii\'ne git',
        type: 'visit',
        target: 'Sultanahmet Camii',
        current: 0,
        required: 1,
        location: 'Istanbul/Sultanahmet',
        completed: false
      },
      {
        id: 'obj-2',
        description: 'İftar sofrasına katıl',
        type: 'talk',
        target: 'İmam Hoca',
        current: 0,
        required: 1,
        completed: false
      },
      {
        id: 'obj-3',
        description: 'Farklı yemekler ye',
        type: 'eat',
        target: 'İftar Yemeği',
        current: 0,
        required: 3,
        completed: false
      }
    ],
    rewards: {
      xp: 1500,
      gold: 2000,
      items: [
        {
          id: 'item-ramazan-feneri',
          name: 'Ramazan Feneri (Dekorasyon)',
          quantity: 1,
          icon: '🏮'
        },
        {
          id: 'item-hurma',
          name: 'Kurutulmuş Hurma (Buff: +10% XP 2 saat)',
          quantity: 5,
          icon: '🫒'
        }
      ],
      reputation: [
        {
          faction: 'Sultanahmet Cemaati',
          amount: 300
        }
      ],
      achievement: 'Ramazan Misafiri'
    },
    repeatable: false, // Günde bir kere
    weeklyOnly: false,
    icon: '🌙',
    region: 'Istanbul',
    isActive: false, // Sadece Ramazan ayında aktif
    completedToday: false,
    completedCount: 0
  },

  // KEŞİF GÖREVLERİ
  {
    id: 'istanbul-7-tepe',
    title: 'İstanbul\'un 7 Tepesi',
    description: 'İstanbul\'un 7 tepesini keşfet ve her tepede check-in yap',
    story: 'Tarihçi Zeynep: "İstanbul 7 tepe üzerine kurulmuştur. Hepsini keşfedersen sana bir sır vereceğim..."',
    npcName: 'Tarihçi Zeynep Hanım',
    npcAvatar: '/npcs/tarihci-zeynep.png',
    npcDialog: [
      'İstanbul\'un tarihi çok derin...',
      'Her tepenin bir hikayesi var.',
      'Keşfet ve öğren!'
    ],
    category: QuestCategory.EXPLORATION,
    difficulty: QuestDifficulty.EFSANE,
    rarity: QuestRarity.LEGENDARY,
    timeLimit: 7200, // 2 saat
    objectives: [
      {
        id: 'obj-1',
        description: '1. Tepe: Topkapı Sarayı',
        type: 'visit',
        target: 'Topkapı Sarayı',
        current: 0,
        required: 1,
        location: 'Istanbul/Sultanahmet',
        completed: false
      },
      {
        id: 'obj-2',
        description: '2. Tepe: Süleymaniye Camii',
        type: 'visit',
        target: 'Süleymaniye Camii',
        current: 0,
        required: 1,
        location: 'Istanbul/Süleymaniye',
        completed: false
      },
      {
        id: 'obj-3',
        description: '3. Tepe: Fatih Camii',
        type: 'visit',
        target: 'Fatih Camii',
        current: 0,
        required: 1,
        location: 'Istanbul/Fatih',
        completed: false
      },
      {
        id: 'obj-4',
        description: '4. Tepe: Sultan Selim Camii',
        type: 'visit',
        target: 'Sultan Selim Camii',
        current: 0,
        required: 1,
        location: 'Istanbul/Çarşamba',
        completed: false
      },
      {
        id: 'obj-5',
        description: '5. Tepe: Mihrimah Sultan Camii',
        type: 'visit',
        target: 'Mihrimah Sultan Camii',
        current: 0,
        required: 1,
        location: 'Istanbul/Edirnekapı',
        completed: false
      },
      {
        id: 'obj-6',
        description: '6. Tepe: Koca Mustafa Paşa Camii',
        type: 'visit',
        target: 'Koca Mustafa Paşa Camii',
        current: 0,
        required: 1,
        location: 'Istanbul/Samatya',
        completed: false
      },
      {
        id: 'obj-7',
        description: '7. Tepe: Cerrahpaşa',
        type: 'visit',
        target: 'Cerrahpaşa Bölgesi',
        current: 0,
        required: 1,
        location: 'Istanbul/Cerrahpaşa',
        completed: false
      }
    ],
    rewards: {
      xp: 5000,
      gold: 10000,
      items: [
        {
          id: 'item-istanbul-haritasi',
          name: 'Antika İstanbul Haritası (Dekorasyon)',
          quantity: 1,
          icon: '🗺️'
        },
        {
          id: 'mount-at',
          name: 'Beyaz At (Mount +50% Hız)',
          quantity: 1,
          icon: '🐎'
        }
      ],
      reputation: [
        {
          faction: 'İstanbul Tarih Kurumu',
          amount: 500
        }
      ],
      title: 'İstanbul Kaşifi',
      achievement: 'Yedi Tepenin Ustası'
    },
    repeatable: false, // Haftalık bir kere
    weeklyOnly: true,
    icon: '🏔️',
    region: 'Istanbul',
    isActive: true,
    completedToday: false,
    completedCount: 0,
    firstTimeBonus: {
      xp: 10000,
      gold: 50000,
      items: [
        {
          id: 'legendary-title',
          name: 'İstanbul\'un Efendisi (Unvan)',
          quantity: 1,
          icon: '👑'
        }
      ]
    }
  }
];

/**
 * GÜNLÜK GÖREV SİSTEMİ MANAGER
 */
export class DailyQuestSystem {
  private activeQuests: Map<string, DailyQuestProgress> = new Map();
  private questHistory: Map<string, Date[]> = new Map(); // Quest ID -> completion dates
  private dailyResetTime: number = 6; // Saat 06:00'da reset (Turkish time)

  constructor() {
    this.loadProgress();
    this.checkDailyReset();
  }

  /**
   * Günlük görevleri getir
   */
  getDailyQuests(playerLevel: number, region: string = 'Istanbul'): DailyQuest[] {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;

    return TURKISH_DAILY_QUESTS.filter(quest => {
      // Seviye kontrolü (her 10 seviyede yeni görevler)
      const questLevel = this.getQuestLevel(quest.difficulty);
      if (playerLevel < questLevel) return false;

      // Bölge kontrolü
      if (quest.region !== region && quest.region !== 'All') return false;

      // Bayram kontrolü (Ramazan: 3. ay, Kurban: 12. ay)
      if (quest.category === QuestCategory.BAYRAM) {
        if (quest.id === 'ramazan-iftar' && currentMonth !== 3) return false;
      }

      // Haftalık görevler
      if (quest.weeklyOnly) {
        const lastCompleted = this.questHistory.get(quest.id)?.[0];
        if (lastCompleted) {
          const daysSince = Math.floor((now.getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24));
          if (daysSince < 7) return false;
        }
      }

      return quest.isActive;
    });
  }

  /**
   * Görevi başlat
   */
  startQuest(questId: string): boolean {
    const quest = TURKISH_DAILY_QUESTS.find(q => q.id === questId);
    if (!quest) return false;

    // Zaten aktif mi?
    if (this.activeQuests.has(questId)) return false;

    // Bugün tamamlandı mı?
    if (quest.completedToday && !quest.repeatable) return false;

    const progress: DailyQuestProgress = {
      questId,
      startedAt: new Date(),
      objectives: {},
      completed: false,
      claimed: false
    };

    quest.objectives.forEach(obj => {
      progress.objectives[obj.id] = 0;
    });

    this.activeQuests.set(questId, progress);
    this.saveProgress();
    return true;
  }

  /**
   * Görev ilerlemesini güncelle
   */
  updateProgress(questId: string, objectiveId: string, amount: number = 1): boolean {
    const progress = this.activeQuests.get(questId);
    if (!progress || progress.completed) return false;

    const quest = TURKISH_DAILY_QUESTS.find(q => q.id === questId);
    if (!quest) return false;

    const objective = quest.objectives.find(obj => obj.id === objectiveId);
    if (!objective) return false;

    // İlerlemeyi güncelle
    progress.objectives[objectiveId] = Math.min(
      (progress.objectives[objectiveId] || 0) + amount,
      objective.required
    );

    // Hedef tamamlandı mı?
    objective.current = progress.objectives[objectiveId];
    objective.completed = objective.current >= objective.required;

    // Tüm hedefler tamamlandı mı?
    const allCompleted = quest.objectives.every(obj =>
      progress.objectives[obj.id] >= obj.required
    );

    if (allCompleted) {
      progress.completed = true;
      progress.completedAt = new Date();
      quest.completedToday = true;
      quest.completedCount++;
    }

    this.saveProgress();
    return allCompleted;
  }

  /**
   * Ödülleri al
   */
  claimRewards(questId: string): QuestReward | null {
    const progress = this.activeQuests.get(questId);
    if (!progress || !progress.completed || progress.claimed) return null;

    const quest = TURKISH_DAILY_QUESTS.find(q => q.id === questId);
    if (!quest) return null;

    progress.claimed = true;

    // İlk tamamlama bonusu
    const isFirstTime = (quest.completedCount || 0) <= 1;
    let rewards = { ...quest.rewards };

    if (isFirstTime && quest.firstTimeBonus) {
      rewards = {
        xp: rewards.xp + quest.firstTimeBonus.xp,
        gold: rewards.gold + quest.firstTimeBonus.gold,
        items: [...(rewards.items || []), ...(quest.firstTimeBonus.items || [])],
        reputation: rewards.reputation,
        title: rewards.title || quest.firstTimeBonus.title,
        achievement: rewards.achievement || quest.firstTimeBonus.achievement
      };
    }

    // Geçmişe ekle
    if (!this.questHistory.has(questId)) {
      this.questHistory.set(questId, []);
    }
    this.questHistory.get(questId)!.push(new Date());

    this.activeQuests.delete(questId);
    this.saveProgress();

    return rewards;
  }

  /**
   * Görev seviyesini hesapla
   */
  private getQuestLevel(difficulty: QuestDifficulty): number {
    switch (difficulty) {
      case QuestDifficulty.KOLAY: return 1;
      case QuestDifficulty.NORMAL: return 10;
      case QuestDifficulty.ZOR: return 25;
      case QuestDifficulty.EFSANE: return 50;
      default: return 1;
    }
  }

  /**
   * Günlük reset kontrolü
   */
  private checkDailyReset(): void {
    const now = new Date();
    const lastReset = localStorage.getItem('daily_quest_last_reset');

    if (lastReset) {
      const lastResetDate = new Date(lastReset);
      const resetToday = new Date(now);
      resetToday.setHours(this.dailyResetTime, 0, 0, 0);

      if (now >= resetToday && lastResetDate < resetToday) {
        this.resetDailyQuests();
      }
    }

    // Her 1 dakikada bir kontrol et
    setInterval(() => this.checkDailyReset(), 60000);
  }

  /**
   * Günlük görevleri sıfırla
   */
  private resetDailyQuests(): void {
    TURKISH_DAILY_QUESTS.forEach(quest => {
      quest.completedToday = false;
      quest.objectives.forEach(obj => {
        obj.current = 0;
        obj.completed = false;
      });
    });

    this.activeQuests.clear();
    localStorage.setItem('daily_quest_last_reset', new Date().toISOString());
    this.saveProgress();

    console.log('🌅 Günlük görevler sıfırlandı! Yeni bir gün başladı!');
  }

  /**
   * İlerlemeyi kaydet
   */
  private saveProgress(): void {
    const data = {
      active: Array.from(this.activeQuests.entries()),
      history: Array.from(this.questHistory.entries())
    };
    localStorage.setItem('daily_quest_progress', JSON.stringify(data));
  }

  /**
   * İlerlemeyi yükle
   */
  private loadProgress(): void {
    const saved = localStorage.getItem('daily_quest_progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.activeQuests = new Map(data.active);
        this.questHistory = new Map(data.history.map(([id, dates]: [string, string[]]) => [
          id,
          dates.map((d: string) => new Date(d))
        ]));
      } catch (e) {
        console.error('Failed to load quest progress:', e);
      }
    }
  }

  /**
   * Görev istatistikleri
   */
  getStats(): {
    totalCompleted: number;
    todayCompleted: number;
    weeklyCompleted: number;
    favoriteCategory: QuestCategory;
    streak: number;
  } {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    let totalCompleted = 0;
    let todayCompleted = 0;
    let weeklyCompleted = 0;
    const categoryCount: Record<string, number> = {};

    this.questHistory.forEach((dates, questId) => {
      totalCompleted += dates.length;

      const quest = TURKISH_DAILY_QUESTS.find(q => q.id === questId);
      if (quest) {
        categoryCount[quest.category] = (categoryCount[quest.category] || 0) + dates.length;
      }

      dates.forEach(date => {
        if (date >= today) todayCompleted++;
        if (date >= weekAgo) weeklyCompleted++;
      });
    });

    const favoriteCategory = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] as QuestCategory || QuestCategory.SOSYAL;

    // Streak hesapla (ardışık günler)
    let streak = 0;
    const checkDate = new Date(today);
    while (true) {
      const hasCompletion = Array.from(this.questHistory.values()).some(dates =>
        dates.some(date => {
          const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          return d.getTime() === checkDate.getTime();
        })
      );

      if (!hasCompletion) break;
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return {
      totalCompleted,
      todayCompleted,
      weeklyCompleted,
      favoriteCategory,
      streak
    };
  }
}

// Export singleton instance
export const dailyQuestSystem = new DailyQuestSystem();
