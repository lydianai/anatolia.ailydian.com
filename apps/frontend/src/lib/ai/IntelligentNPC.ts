/**
 * ANADOLU REALM - Intelligent NPC System
 * Personality, Memory, Emotions, Daily Routines, Social Networks
 * AI-Powered by AILYDIAN Orchestrator + Manus AI
 */

import * as THREE from 'three';

// PERSONALITY TRAITS (Big Five Model)

export interface PersonalityTraits {
  openness: number;          // 0-1: Yeniliklere açıklık
  conscientiousness: number; // 0-1: Sorumluluk, düzen
  extraversion: number;      // 0-1: Dışa dönüklük, sosyallik
  agreeableness: number;     // 0-1: Uyumluluk, yardımseverlik
  neuroticism: number;       // 0-1: Duygusal dengesizlik, kaygı
}

// EMOTIONAL STATE

export enum Emotion {
  JOY = 'joy',
  SADNESS = 'sadness',
  ANGER = 'anger',
  FEAR = 'fear',
  SURPRISE = 'surprise',
  DISGUST = 'disgust',
  NEUTRAL = 'neutral'
}

export interface EmotionalState {
  primary: Emotion;
  intensity: number; // 0-1
  duration: number; // milliseconds
}

// MEMORY SYSTEM

export interface PlayerMemory {
  playerId: string;
  playerName: string;
  firstMet: number; // timestamp
  lastInteraction: number; // timestamp
  interactionCount: number;
  reputation: number; // -100 (düşman) to +100 (dost)
  sharedExperiences: string[]; // ["helped_in_quest", "bought_item", "fought_together"]
  emotionalBond: number; // 0-1
  personalNotes: string[]; // NPC'nin oyuncu hakkındaki notları
}

export class LongTermMemory {
  private memories: Map<string, PlayerMemory> = new Map();
  private readonly MAX_MEMORIES = 100;
  private readonly DECAY_RATE = 0.001; // Hafıza zayıflaması per day

  remember(playerId: string, playerName: string): void {
    if (!this.memories.has(playerId)) {
      this.memories.set(playerId, {
        playerId,
        playerName,
        firstMet: Date.now(),
        lastInteraction: Date.now(),
        interactionCount: 0,
        reputation: 0,
        sharedExperiences: [],
        emotionalBond: 0,
        personalNotes: []
      });
    }
  }

  getMemory(playerId: string): PlayerMemory | null {
    return this.memories.get(playerId) || null;
  }

  updateInteraction(playerId: string, type: 'positive' | 'negative' | 'neutral'): void {
    const memory = this.memories.get(playerId);
    if (!memory) return;

    memory.lastInteraction = Date.now();
    memory.interactionCount++;

    // Reputation değişimi
    if (type === 'positive') {
      memory.reputation = Math.min(100, memory.reputation + 5);
      memory.emotionalBond = Math.min(1, memory.emotionalBond + 0.05);
    } else if (type === 'negative') {
      memory.reputation = Math.max(-100, memory.reputation - 10);
      memory.emotionalBond = Math.max(0, memory.emotionalBond - 0.1);
    }
  }

  addExperience(playerId: string, experience: string): void {
    const memory = this.memories.get(playerId);
    if (!memory) return;

    memory.sharedExperiences.push(experience);
  }

  addNote(playerId: string, note: string): void {
    const memory = this.memories.get(playerId);
    if (!memory) return;

    memory.personalNotes.push(`[${new Date().toISOString()}] ${note}`);
  }

  decay(): void {
    // Hafıza zayıflaması (kullanılmayan hatıralar)
    const now = Date.now();
    this.memories.forEach((memory, playerId) => {
      const daysSinceInteraction = (now - memory.lastInteraction) / (1000 * 60 * 60 * 24);
      const decayAmount = daysSinceInteraction * this.DECAY_RATE;

      memory.emotionalBond = Math.max(0, memory.emotionalBond - decayAmount);

      // Çok eski anıları sil
      if (daysSinceInteraction > 30 && memory.interactionCount < 5) {
        this.memories.delete(playerId);
      }
    });

    // Hafıza limiti
    if (this.memories.size > this.MAX_MEMORIES) {
      this.pruneOldestMemories();
    }
  }

  private pruneOldestMemories(): void {
    const sorted = Array.from(this.memories.entries())
      .sort(([, a], [, b]) => a.lastInteraction - b.lastInteraction);

    const toDelete = sorted.slice(0, this.memories.size - this.MAX_MEMORIES);
    toDelete.forEach(([playerId]) => this.memories.delete(playerId));
  }
}

// EMOTIONAL ENGINE

export class EmotionalEngine {
  private currentEmotion: EmotionalState = {
    primary: Emotion.NEUTRAL,
    intensity: 0,
    duration: 0
  };

  private emotionHistory: EmotionalState[] = [];
  private readonly HISTORY_SIZE = 10;

  getCurrentMood(): Emotion {
    return this.currentEmotion.primary;
  }

  getCurrentIntensity(): number {
    return this.currentEmotion.intensity;
  }

  setEmotion(emotion: Emotion, intensity: number, duration: number): void {
    // Eski duyguyu kaydet
    if (this.currentEmotion.intensity > 0) {
      this.emotionHistory.push({ ...this.currentEmotion });
      if (this.emotionHistory.length > this.HISTORY_SIZE) {
        this.emotionHistory.shift();
      }
    }

    this.currentEmotion = { primary: emotion, intensity, duration };

    // Auto-decay timer
    setTimeout(() => this.decayEmotion(), duration);
  }

  private decayEmotion(): void {
    this.currentEmotion.intensity *= 0.5;

    if (this.currentEmotion.intensity < 0.1) {
      this.currentEmotion = {
        primary: Emotion.NEUTRAL,
        intensity: 0,
        duration: 0
      };
    }
  }

  reactToEvent(event: string, personality: PersonalityTraits): void {
    // Olay türüne ve kişiliğe göre duygusal tepki
    const reactions: { [key: string]: { emotion: Emotion; intensity: number } } = {
      player_greeting: {
        emotion: Emotion.JOY,
        intensity: 0.3 + personality.extraversion * 0.4
      },
      player_insult: {
        emotion: Emotion.ANGER,
        intensity: 0.5 + personality.neuroticism * 0.5
      },
      player_gift: {
        emotion: Emotion.JOY,
        intensity: 0.6 + personality.agreeableness * 0.4
      },
      player_attack: {
        emotion: Emotion.FEAR,
        intensity: 0.7 + personality.neuroticism * 0.3
      },
      friend_died: {
        emotion: Emotion.SADNESS,
        intensity: 0.8
      },
      unexpected_event: {
        emotion: Emotion.SURPRISE,
        intensity: 0.5 - personality.openness * 0.3
      }
    };

    const reaction = reactions[event];
    if (reaction) {
      this.setEmotion(reaction.emotion, reaction.intensity, 30000); // 30 seconds
    }
  }

  getEmotionModifier(): number {
    // Duygu durumu hareket/konuşma hızını etkiler
    const modifiers: { [key in Emotion]: number } = {
      [Emotion.JOY]: 1.2,
      [Emotion.SADNESS]: 0.7,
      [Emotion.ANGER]: 1.3,
      [Emotion.FEAR]: 0.8,
      [Emotion.SURPRISE]: 1.1,
      [Emotion.DISGUST]: 0.9,
      [Emotion.NEUTRAL]: 1.0
    };

    return modifiers[this.currentEmotion.primary];
  }
}

// GOAL-DRIVEN BEHAVIOR

export interface Goal {
  id: string;
  type: 'survival' | 'social' | 'work' | 'entertainment' | 'curiosity';
  description: string;
  priority: number; // 0-1
  progress: number; // 0-1
  deadline?: number; // timestamp
  isCompleted: boolean;
}

export class GoalDrivenBehavior {
  private goals: Goal[] = [];
  private currentGoal: Goal | null = null;

  addGoal(goal: Goal): void {
    this.goals.push(goal);
    this.goals.sort((a, b) => b.priority - a.priority);
  }

  updateGoals(): void {
    // En yüksek priority'li ve tamamlanmamış hedefi seç
    this.currentGoal = this.goals.find(g => !g.isCompleted) || null;

    // Deadline geçmiş hedefleri sil
    const now = Date.now();
    this.goals = this.goals.filter(g => !g.deadline || g.deadline > now);
  }

  getCurrentGoal(): Goal | null {
    return this.currentGoal;
  }

  completeGoal(goalId: string): void {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.isCompleted = true;
      goal.progress = 1;
    }
  }

  updateProgress(goalId: string, progress: number): void {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.progress = Math.min(1, progress);
    }
  }
}

// SOCIAL NETWORK

export interface NPCRelationship {
  npcId: string;
  npcName: string;
  relationshipType: 'friend' | 'family' | 'colleague' | 'romantic' | 'enemy';
  strength: number; // 0-1
  lastInteraction: number;
}

export class SocialGraph {
  private relationships: Map<string, NPCRelationship> = new Map();

  public family: string[] = [];
  public colleagues: string[] = [];
  public friends: string[] = [];
  public enemies: string[] = [];

  addRelationship(npc: NPCRelationship): void {
    this.relationships.set(npc.npcId, npc);

    // Kategorize et
    switch (npc.relationshipType) {
      case 'family':
        this.family.push(npc.npcId);
        break;
      case 'colleague':
        this.colleagues.push(npc.npcId);
        break;
      case 'friend':
        this.friends.push(npc.npcId);
        break;
      case 'enemy':
        this.enemies.push(npc.npcId);
        break;
    }
  }

  getRelationship(npcId: string): NPCRelationship | null {
    return this.relationships.get(npcId) || null;
  }

  updateStrength(npcId: string, delta: number): void {
    const rel = this.relationships.get(npcId);
    if (rel) {
      rel.strength = Math.max(0, Math.min(1, rel.strength + delta));
      rel.lastInteraction = Date.now();
    }
  }

  getFriends(): NPCRelationship[] {
    return this.friends
      .map(id => this.relationships.get(id))
      .filter(Boolean) as NPCRelationship[];
  }

  getClosestFriend(): NPCRelationship | null {
    const friendRels = this.getFriends();
    if (friendRels.length === 0) return null;

    return friendRels.reduce((closest, current) =>
      current.strength > closest.strength ? current : closest
    );
  }
}

// DAILY ROUTINE SCHEDULE

export interface ScheduledActivity {
  hour: number; // 0-23
  activity: string;
  location: string;
  duration: number; // minutes
  socialInteraction: boolean;
}

export class DailyRoutine {
  private schedule: ScheduledActivity[] = [];

  constructor(npcType: string) {
    this.generateSchedule(npcType);
  }

  private generateSchedule(npcType: string): void {
    // Farklı NPC tipleri için farklı rutinler
    const schedules: { [key: string]: ScheduledActivity[] } = {
      office_worker: [
        { hour: 7, activity: 'wake_up', location: 'home', duration: 30, socialInteraction: false },
        { hour: 8, activity: 'breakfast', location: 'home', duration: 30, socialInteraction: true },
        { hour: 9, activity: 'commute', location: 'transit', duration: 60, socialInteraction: false },
        { hour: 10, activity: 'work', location: 'office', duration: 240, socialInteraction: true },
        { hour: 12, activity: 'lunch', location: 'restaurant', duration: 60, socialInteraction: true },
        { hour: 13, activity: 'work', location: 'office', duration: 240, socialInteraction: true },
        { hour: 17, activity: 'commute_home', location: 'transit', duration: 60, socialInteraction: false },
        { hour: 18, activity: 'dinner', location: 'home', duration: 60, socialInteraction: true },
        { hour: 19, activity: 'relaxation', location: 'home', duration: 120, socialInteraction: false },
        { hour: 23, activity: 'sleep', location: 'home', duration: 480, socialInteraction: false }
      ],
      shopkeeper: [
        { hour: 6, activity: 'wake_up', location: 'home', duration: 30, socialInteraction: false },
        { hour: 7, activity: 'open_shop', location: 'shop', duration: 600, socialInteraction: true },
        { hour: 13, activity: 'lunch_break', location: 'shop_back', duration: 60, socialInteraction: false },
        { hour: 14, activity: 'continue_work', location: 'shop', duration: 360, socialInteraction: true },
        { hour: 20, activity: 'close_shop', location: 'shop', duration: 30, socialInteraction: false },
        { hour: 21, activity: 'dinner', location: 'home', duration: 60, socialInteraction: true },
        { hour: 22, activity: 'tv_time', location: 'home', duration: 60, socialInteraction: false },
        { hour: 23, activity: 'sleep', location: 'home', duration: 420, socialInteraction: false }
      ],
      kahvehane_owner: [
        { hour: 8, activity: 'prepare_kahvehane', location: 'kahvehane', duration: 60, socialInteraction: false },
        { hour: 9, activity: 'serve_customers', location: 'kahvehane', duration: 720, socialInteraction: true },
        { hour: 15, activity: 'afternoon_tea', location: 'kahvehane', duration: 30, socialInteraction: true },
        { hour: 16, activity: 'tavla_time', location: 'kahvehane', duration: 180, socialInteraction: true },
        { hour: 22, activity: 'close_kahvehane', location: 'kahvehane', duration: 30, socialInteraction: false },
        { hour: 23, activity: 'home', location: 'home', duration: 60, socialInteraction: true },
        { hour: 0, activity: 'sleep', location: 'home', duration: 480, socialInteraction: false }
      ]
    };

    this.schedule = schedules[npcType] || schedules.office_worker;
  }

  getCurrentActivity(hour: number): ScheduledActivity | null {
    // En yakın önceki aktiviteyi bul
    const sortedSchedule = [...this.schedule].sort((a, b) => a.hour - b.hour);

    for (let i = sortedSchedule.length - 1; i >= 0; i--) {
      if (hour >= sortedSchedule[i].hour) {
        return sortedSchedule[i];
      }
    }

    // Eğer hiçbiri bulunamazsa, son aktiviteyi döndür (gece aktivitesi)
    return sortedSchedule[sortedSchedule.length - 1];
  }

  getNextActivity(hour: number): ScheduledActivity | null {
    const sortedSchedule = [...this.schedule].sort((a, b) => a.hour - b.hour);

    for (const activity of sortedSchedule) {
      if (activity.hour > hour) {
        return activity;
      }
    }

    // Bir sonraki gün ilk aktivite
    return sortedSchedule[0];
  }
}

// INTELLIGENT NPC CLASS

export class IntelligentNPC {
  public id: string;
  public name: string;
  public type: string;
  public position: THREE.Vector3;

  // Core AI Systems
  public personality: PersonalityTraits;
  public memory: LongTermMemory;
  public emotions: EmotionalEngine;
  public goals: GoalDrivenBehavior;
  public socialNetwork: SocialGraph;
  public dailyRoutine: DailyRoutine;

  // State
  private currentActivity: string = 'idle';
  private currentDialogue: string = '';

  constructor(id: string, name: string, type: string, position: THREE.Vector3) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.position = position;

    // Initialize AI systems
    this.personality = this.generatePersonality();
    this.memory = new LongTermMemory();
    this.emotions = new EmotionalEngine();
    this.goals = new GoalDrivenBehavior();
    this.socialNetwork = new SocialGraph();
    this.dailyRoutine = new DailyRoutine(type);

    console.log(`🤖 Intelligent NPC created: ${name} (${type})`);
  }

  private generatePersonality(): PersonalityTraits {
    // Rastgele ama dengeli kişilik
    return {
      openness: Math.random() * 0.6 + 0.2,           // 0.2-0.8
      conscientiousness: Math.random() * 0.6 + 0.2,  // 0.2-0.8
      extraversion: Math.random() * 0.6 + 0.2,       // 0.2-0.8
      agreeableness: Math.random() * 0.6 + 0.2,      // 0.2-0.8
      neuroticism: Math.random() * 0.4 + 0.1         // 0.1-0.5
    };
  }

  
  // INTERACTION WITH PLAYER
  

  async interactWithPlayer(playerId: string, playerName: string, context: string): Promise<string> {
    // Oyuncuyu hatırla
    this.memory.remember(playerId, playerName);
    const playerMemory = this.memory.getMemory(playerId);

    // Duygu durumu
    const mood = this.emotions.getCurrentMood();
    const intensity = this.emotions.getCurrentIntensity();

    // Dialogue generation (Manus AI ile gerçek zamanlı)
    const dialogue = await this.generateDialogue(playerMemory!, context, mood);

    this.currentDialogue = dialogue;
    return dialogue;
  }

  private async generateDialogue(
    playerMemory: PlayerMemory,
    context: string,
    mood: Emotion
  ): Promise<string> {
    // Bu fonksiyon Manus AI ile entegre edilecek
    // Şimdilik template-based dialogue
    const templates = this.getDialogueTemplates(mood, playerMemory.reputation);
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private getDialogueTemplates(mood: Emotion, reputation: number): string[] {
    // Ruh hali ve ilişkiye göre dialoglar
    if (reputation > 50) {
      // Dost
      return [
        `Hoş geldin dostum! Nasıl gidiyor?`,
        `Seni görmek ne güzel! Çay içer misin?`,
        `Aa ${this.name} bey/hanım! Buyurun, buyurun!`
      ];
    } else if (reputation < -50) {
      // Düşman
      return [
        `Sen yine mi geldin?`,
        `Burada işin ne senin?`,
        `Git buradan, seni görmek istemiyorum!`
      ];
    } else {
      // Tarafsız
      return [
        `Merhaba, buyurun.`,
        `Ne arzu edersiniz?`,
        `Hoş geldiniz.`
      ];
    }
  }

  
  // DAILY ROUTINE EXECUTION
  

  async performDailyRoutine(currentHour: number): Promise<void> {
    const activity = this.dailyRoutine.getCurrentActivity(currentHour);
    if (!activity) return;

    this.currentActivity = activity.activity;

    // Aktiviteye göre davranış
    switch (activity.activity) {
      case 'work':
        await this.performWork();
        break;
      case 'lunch':
      case 'dinner':
      case 'breakfast':
        await this.performEating(activity.location);
        break;
      case 'relaxation':
      case 'tv_time':
        await this.performRelaxation();
        break;
      case 'tavla_time':
        await this.playTavla();
        break;
      case 'serve_customers':
        await this.serveCustomers();
        break;
      case 'sleep':
        this.sleep();
        break;
      default:
        // Idle
        break;
    }
  }

  private async performWork(): Promise<void> {
    // İş aktivitesi simulation
    console.log(`${this.name} çalışıyor...`);
  }

  private async performEating(location: string): Promise<void> {
    console.log(`${this.name} ${location}'de yemek yiyor...`);
  }

  private async performRelaxation(): Promise<void> {
    console.log(`${this.name} dinleniyor...`);
  }

  private async playTavla(): Promise<void> {
    console.log(`${this.name} tavla oynuyor!`);
  }

  private async serveCustomers(): Promise<void> {
    console.log(`${this.name} müşterilere hizmet veriyor...`);
  }

  private sleep(): void {
    console.log(`${this.name} uyuyor... 💤`);
  }

  
  // UPDATE LOOP
  

  update(deltaTime: number): void {
    // Hedefleri güncelle
    this.goals.updateGoals();

    // Hafıza decay (günlük)
    if (Math.random() < 0.001) { // ~once per day
      this.memory.decay();
    }
  }

  
  // GETTERS
  

  getPersonalityDescription(): string {
    const p = this.personality;
    let desc = `${this.name} `;

    if (p.extraversion > 0.6) desc += 'çok sosyal, ';
    if (p.agreeableness > 0.6) desc += 'yardımsever, ';
    if (p.conscientiousness > 0.6) desc += 'düzenli, ';
    if (p.openness > 0.6) desc += 'meraklı, ';
    if (p.neuroticism > 0.6) desc += 'kaygılı, ';

    return desc + 'bir karakter.';
  }

  getCurrentMood(): string {
    return this.emotions.getCurrentMood();
  }

  getCurrentActivity(): string {
    return this.currentActivity;
  }
}

export default IntelligentNPC;
