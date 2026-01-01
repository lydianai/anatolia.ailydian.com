/**
 * 🐾 HAYVAN DOSTLARI FARKINDALIK SİSTEMİ - ANADOLU REALM
 *
 * Hayvan hakları ve refah farkındalığı için oyun içi kampanya sistemi:
 * - Sokak hayvanları yardım görevleri
 * - Eğitim içerikleri ve bilgilendirme
 * - Bağış sistemi (gerçek hayvan barınakları)
 * - Hayvan dostu başarımlar
 * - İstatistikler ve etki takibi
 * - Sosyal medya entegrasyonu
 *
 * 💚 Her oyuncu hayvanlara yardım edebilir!
 *
 * @author AILYDIAN Orchestrator v4.0
 */

/**
 * Hayvan türleri
 */
export enum AnimalType {
  DOG = 'dog',
  CAT = 'cat',
  BIRD = 'bird',
  HORSE = 'horse',
  DONKEY = 'donkey',
  SHEEP = 'sheep',
  GOAT = 'goat'
}

/**
 * Hayvan durumu
 */
export enum AnimalCondition {
  HEALTHY = 'healthy',
  HUNGRY = 'hungry',
  THIRSTY = 'thirsty',
  INJURED = 'injured',
  SICK = 'sick',
  SCARED = 'scared',
  COLD = 'cold'
}

/**
 * Yardım eylemi türleri
 */
export enum HelpAction {
  FEED = 'feed',           // Yemek ver
  WATER = 'water',         // Su ver
  TREAT = 'treat',         // Tedavi et
  SHELTER = 'shelter',     // Barınak sağla
  RESCUE = 'rescue',       // Kurtar
  ADOPT = 'adopt',         // Sahiplen
  VACCINATE = 'vaccinate', // Aşıla
  STERILIZE = 'sterilize'  // Kısırlaştır
}

/**
 * Gerçek hayvan barınakları (Türkiye)
 */
export interface AnimalShelter {
  id: string;
  name: string;
  city: string;
  type: 'municipal' | 'ngo' | 'private';
  capacity: number;
  website?: string;
  donationLink?: string;
  contact: {
    phone?: string;
    email?: string;
    address: string;
  };
}

/**
 * Hayvan refahı quest'i
 */
export interface AnimalWelfareQuest {
  id: string;
  title: string;
  description: string;
  animalType: AnimalType;
  condition: AnimalCondition;
  requiredAction: HelpAction;
  location: { x: number; y: number; z: number };
  completed: boolean;
  reward: {
    experience: number;
    coins: number;
    reputation: number;
    badge?: string;
  };
  educationalContent?: string;
}

/**
 * Başarım sistemi
 */
export interface AnimalWelfareAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  progress: number;
  completed: boolean;
  reward: string;
}

/**
 * İstatistikler
 */
export interface AnimalWelfareStats {
  totalAnimalsHelped: number;
  animalsHelpedByType: Map<AnimalType, number>;
  actionsTaken: Map<HelpAction, number>;
  totalDonationsMade: number;
  totalDonationAmount: number; // Gerçek para (TRY)
  sheltersSupported: string[];
  achievementsUnlocked: number;
  reputationScore: number;
}

/**
 * 🐾 Hayvan Dostları Farkındalık Sistemi
 */
export class AnimalWelfareSystem {
  private quests: Map<string, AnimalWelfareQuest> = new Map();
  private achievements: Map<string, AnimalWelfareAchievement> = new Map();
  private stats: AnimalWelfareStats;
  private shelters: Map<string, AnimalShelter> = new Map();

  // Event listeners
  private listeners: Map<string, Function[]> = new Map();

  constructor() {
    this.stats = this.createInitialStats();
    this.initializeShelters();
    this.initializeAchievements();
    this.generateQuests();
  }

  /**
   * 📊 İlk istatistikler
   */
  private createInitialStats(): AnimalWelfareStats {
    return {
      totalAnimalsHelped: 0,
      animalsHelpedByType: new Map(),
      actionsTaken: new Map(),
      totalDonationsMade: 0,
      totalDonationAmount: 0,
      sheltersSupported: [],
      achievementsUnlocked: 0,
      reputationScore: 0
    };
  }

  /**
   * 🏠 Gerçek hayvan barınaklarını başlat
   */
  private initializeShelters(): void {
    const shelters: AnimalShelter[] = [
      {
        id: 'istanbul_beykoz',
        name: 'İstanbul Büyükşehir Belediyesi Beykoz Hayvan Barınağı',
        city: 'İstanbul',
        type: 'municipal',
        capacity: 1200,
        contact: {
          phone: '+90 216 000 0000',
          address: 'Beykoz, İstanbul'
        }
      },
      {
        id: 'ankara_temelli',
        name: 'Ankara Büyükşehir Belediyesi Temelli Hayvan Barınağı',
        city: 'Ankara',
        type: 'municipal',
        capacity: 3500,
        contact: {
          phone: '+90 312 000 0000',
          address: 'Temelli, Ankara'
        }
      },
      {
        id: 'izmir_bornova',
        name: 'İzmir Büyükşehir Belediyesi Bornova Hayvan Barınağı',
        city: 'İzmir',
        type: 'municipal',
        capacity: 1500,
        contact: {
          phone: '+90 232 000 0000',
          address: 'Bornova, İzmir'
        }
      },
      {
        id: 'haytap',
        name: 'HAYTAP - Hayvan Hakları Federasyonu',
        city: 'Türkiye',
        type: 'ngo',
        capacity: 0,
        website: 'https://www.haytap.org',
        donationLink: 'https://www.haytap.org/bagis',
        contact: {
          email: 'info@haytap.org',
          address: 'Türkiye Geneli'
        }
      },
      {
        id: 'patilikulupler',
        name: 'Patili Kulüpler - Sokak Hayvanları Derneği',
        city: 'İstanbul',
        type: 'ngo',
        capacity: 200,
        website: 'https://www.patilikulupler.org',
        contact: {
          email: 'info@patilikulupler.org',
          address: 'İstanbul'
        }
      }
    ];

    shelters.forEach(shelter => {
      this.shelters.set(shelter.id, shelter);
    });
  }

  /**
   * 🏆 Başarımları başlat
   */
  private initializeAchievements(): void {
    const achievements: AnimalWelfareAchievement[] = [
      {
        id: 'first_help',
        title: 'İlk Yardım',
        description: 'İlk hayvanı besle',
        icon: '🐾',
        requirement: 1,
        progress: 0,
        completed: false,
        reward: 'Hayvan Dostu rozeti'
      },
      {
        id: 'animal_friend',
        title: 'Hayvan Dostu',
        description: '10 hayvana yardım et',
        icon: '💚',
        requirement: 10,
        progress: 0,
        completed: false,
        reward: 'Hayvan Koruyucu unvanı'
      },
      {
        id: 'street_guardian',
        title: 'Sokak Koruyucusu',
        description: '50 hayvana yardım et',
        icon: '🛡️',
        requirement: 50,
        progress: 0,
        completed: false,
        reward: 'Özel hayvan yoldaşı'
      },
      {
        id: 'animal_hero',
        title: 'Hayvan Kahramanı',
        description: '100 hayvana yardım et',
        icon: '⭐',
        requirement: 100,
        progress: 0,
        completed: false,
        reward: 'Efsanevi hayvan yoldaşı'
      },
      {
        id: 'first_donor',
        title: 'İlk Bağışçı',
        description: 'İlk gerçek bağışı yap',
        icon: '💝',
        requirement: 1,
        progress: 0,
        completed: false,
        reward: 'Hayırsever rozeti'
      },
      {
        id: 'generous_donor',
        title: 'Cömert Bağışçı',
        description: '5 kez gerçek bağış yap',
        icon: '🌟',
        requirement: 5,
        progress: 0,
        completed: false,
        reward: 'Altın kalp rozeti'
      },
      {
        id: 'cat_lover',
        title: 'Kedi Dostu',
        description: '20 kediye yardım et',
        icon: '🐱',
        requirement: 20,
        progress: 0,
        completed: false,
        reward: 'Kedi kostümü'
      },
      {
        id: 'dog_lover',
        title: 'Köpek Dostu',
        description: '20 köpeğe yardım et',
        icon: '🐕',
        requirement: 20,
        progress: 0,
        completed: false,
        reward: 'Köpek kostümü'
      },
      {
        id: 'veterinarian',
        title: 'Veteriner',
        description: '30 yaralı hayvanı tedavi et',
        icon: '⚕️',
        requirement: 30,
        progress: 0,
        completed: false,
        reward: 'Veteriner üniforması'
      },
      {
        id: 'shelter_supporter',
        title: 'Barınak Destekçisi',
        description: '3 farklı barınağa destek ol',
        icon: '🏠',
        requirement: 3,
        progress: 0,
        completed: false,
        reward: 'Barınak inşa hakkı'
      }
    ];

    achievements.forEach(achievement => {
      this.achievements.set(achievement.id, achievement);
    });
  }

  /**
   * 🎯 Quest'leri oluştur
   */
  private generateQuests(): void {
    const questTemplates: Omit<AnimalWelfareQuest, 'id' | 'location' | 'completed'>[] = [
      {
        title: 'Aç Kedi',
        description: 'Mahallede aç bir kedi dolaşıyor. Ona yemek ver!',
        animalType: AnimalType.CAT,
        condition: AnimalCondition.HUNGRY,
        requiredAction: HelpAction.FEED,
        reward: { experience: 50, coins: 20, reputation: 10 },
        educationalContent: 'Sokak kedileri düzenli beslenmeye ihtiyaç duyar. Mama yerine kedi maması tercih edilmelidir.'
      },
      {
        title: 'Yaralı Köpek',
        description: 'Park yakınında yaralı bir köpek var. Ona yardım et!',
        animalType: AnimalType.DOG,
        condition: AnimalCondition.INJURED,
        requiredAction: HelpAction.TREAT,
        reward: { experience: 100, coins: 50, reputation: 25, badge: 'veteriner_rozeti' },
        educationalContent: 'Yaralı hayvanları kendi başınıza tedavi etmeye çalışmayın. Belediye veteriner hizmetlerini arayın: 153'
      },
      {
        title: 'Susuz Kuş',
        description: 'Sıcak havada kuşlar su bulamıyor. Su kabı koy!',
        animalType: AnimalType.BIRD,
        condition: AnimalCondition.THIRSTY,
        requiredAction: HelpAction.WATER,
        reward: { experience: 30, coins: 15, reputation: 5 },
        educationalContent: 'Yaz aylarında kuşlar için temiz su bırakmak hayati önem taşır. Günde bir kez değiştirin.'
      },
      {
        title: 'Korkmuş Kedi',
        description: 'Bir kedi arabaların arasında sıkışmış. Onu kurtar!',
        animalType: AnimalType.CAT,
        condition: AnimalCondition.SCARED,
        requiredAction: HelpAction.RESCUE,
        reward: { experience: 80, coins: 40, reputation: 20 },
        educationalContent: 'Korkmuş hayvanlar saldırganlaşabilir. Sakinlikle yaklaşın ve gerekirse profesyonel yardım alın.'
      },
      {
        title: 'Hasta Köpek',
        description: 'Hasta bir köpek tedaviye ihtiyaç duyuyor.',
        animalType: AnimalType.DOG,
        condition: AnimalCondition.SICK,
        requiredAction: HelpAction.VACCINATE,
        reward: { experience: 120, coins: 60, reputation: 30 },
        educationalContent: 'Kuduz aşısı sokak hayvanları için hayati önem taşır. Belediyeler ücretsiz aşı hizmeti vermektedir.'
      },
      {
        title: 'Üşüyen Kedi Kolonisi',
        description: 'Kış geldi, sokak kedileri barınağa ihtiyaç duyuyor.',
        animalType: AnimalType.CAT,
        condition: AnimalCondition.COLD,
        requiredAction: HelpAction.SHELTER,
        reward: { experience: 150, coins: 75, reputation: 40 },
        educationalContent: 'Kış aylarında karton kutu ve battaniye ile basit barınaklar yapabilirsiniz.'
      },
      {
        title: 'At Kurtarma',
        description: 'Fayton atı kötü koşullarda yaşıyor. Onu kurtar!',
        animalType: AnimalType.HORSE,
        condition: AnimalCondition.INJURED,
        requiredAction: HelpAction.RESCUE,
        reward: { experience: 200, coins: 100, reputation: 50, badge: 'hayvan_kurtarici' },
        educationalContent: 'Fayton atları için yasal düzenlemeler var. İhmal gördüğünüzde 153 Alo Zabıta\'yı arayın.'
      },
      {
        title: 'Eşek Sahiplenme',
        description: 'Terk edilmiş bir eşek yeni bir yuva arıyor.',
        animalType: AnimalType.DONKEY,
        condition: AnimalCondition.SCARED,
        requiredAction: HelpAction.ADOPT,
        reward: { experience: 300, coins: 150, reputation: 75, badge: 'sahiplendirme_uzmanı' },
        educationalContent: 'Eşekler sosyal hayvanlardır ve bakımları özel bilgi gerektirir.'
      },
      {
        title: 'Kısırlaştırma Kampanyası',
        description: 'Sokak hayvanları popülasyonunu kontrol et!',
        animalType: AnimalType.CAT,
        condition: AnimalCondition.HEALTHY,
        requiredAction: HelpAction.STERILIZE,
        reward: { experience: 180, coins: 90, reputation: 45 },
        educationalContent: 'Kısırlaştırma en insancıl popülasyon kontrol yöntemidir. "Kısırlaştır-Aşıla-Salıver" modeli uygulanır.'
      },
      {
        title: 'Koyun Sürüsü Yardımı',
        description: 'Çobansız kalan koyunlara yardım et.',
        animalType: AnimalType.SHEEP,
        condition: AnimalCondition.HUNGRY,
        requiredAction: HelpAction.FEED,
        reward: { experience: 100, coins: 50, reputation: 25 },
        educationalContent: 'Çiftlik hayvanları da korunmalıdır. Hayvan refahı sadece evcil hayvanlar için değildir.'
      }
    ];

    questTemplates.forEach((template, index) => {
      const quest: AnimalWelfareQuest = {
        id: `animal_quest_${index}`,
        ...template,
        location: {
          x: Math.random() * 1000 - 500,
          y: 0,
          z: Math.random() * 1000 - 500
        },
        completed: false
      };

      this.quests.set(quest.id, quest);
    });
  }

  /**
   * ✅ Quest'i tamamla
   */
  public completeQuest(questId: string): boolean {
    const quest = this.quests.get(questId);
    if (!quest || quest.completed) return false;

    quest.completed = true;

    // İstatistikleri güncelle
    this.stats.totalAnimalsHelped++;

    const typeCount = this.stats.animalsHelpedByType.get(quest.animalType) || 0;
    this.stats.animalsHelpedByType.set(quest.animalType, typeCount + 1);

    const actionCount = this.stats.actionsTaken.get(quest.requiredAction) || 0;
    this.stats.actionsTaken.set(quest.requiredAction, actionCount + 1);

    this.stats.reputationScore += quest.reward.reputation;

    // Başarımları kontrol et
    this.checkAchievements();

    // Event yayınla
    this.emit('quest-completed', { quest, stats: this.stats });

    return true;
  }

  /**
   * 🏆 Başarımları kontrol et
   */
  private checkAchievements(): void {
    // İlk yardım
    const firstHelp = this.achievements.get('first_help')!;
    if (!firstHelp.completed && this.stats.totalAnimalsHelped >= 1) {
      firstHelp.progress = this.stats.totalAnimalsHelped;
      this.unlockAchievement('first_help');
    }

    // Hayvan dostu
    const animalFriend = this.achievements.get('animal_friend')!;
    animalFriend.progress = this.stats.totalAnimalsHelped;
    if (!animalFriend.completed && this.stats.totalAnimalsHelped >= 10) {
      this.unlockAchievement('animal_friend');
    }

    // Sokak koruyucusu
    const streetGuardian = this.achievements.get('street_guardian')!;
    streetGuardian.progress = this.stats.totalAnimalsHelped;
    if (!streetGuardian.completed && this.stats.totalAnimalsHelped >= 50) {
      this.unlockAchievement('street_guardian');
    }

    // Hayvan kahramanı
    const animalHero = this.achievements.get('animal_hero')!;
    animalHero.progress = this.stats.totalAnimalsHelped;
    if (!animalHero.completed && this.stats.totalAnimalsHelped >= 100) {
      this.unlockAchievement('animal_hero');
    }

    // Kedi dostu
    const catLover = this.achievements.get('cat_lover')!;
    const catCount = this.stats.animalsHelpedByType.get(AnimalType.CAT) || 0;
    catLover.progress = catCount;
    if (!catLover.completed && catCount >= 20) {
      this.unlockAchievement('cat_lover');
    }

    // Köpek dostu
    const dogLover = this.achievements.get('dog_lover')!;
    const dogCount = this.stats.animalsHelpedByType.get(AnimalType.DOG) || 0;
    dogLover.progress = dogCount;
    if (!dogLover.completed && dogCount >= 20) {
      this.unlockAchievement('dog_lover');
    }

    // Veteriner
    const veterinarian = this.achievements.get('veterinarian')!;
    const treatCount = this.stats.actionsTaken.get(HelpAction.TREAT) || 0;
    veterinarian.progress = treatCount;
    if (!veterinarian.completed && treatCount >= 30) {
      this.unlockAchievement('veterinarian');
    }

    // İlk bağışçı
    const firstDonor = this.achievements.get('first_donor')!;
    firstDonor.progress = this.stats.totalDonationsMade;
    if (!firstDonor.completed && this.stats.totalDonationsMade >= 1) {
      this.unlockAchievement('first_donor');
    }

    // Cömert bağışçı
    const generousDonor = this.achievements.get('generous_donor')!;
    generousDonor.progress = this.stats.totalDonationsMade;
    if (!generousDonor.completed && this.stats.totalDonationsMade >= 5) {
      this.unlockAchievement('generous_donor');
    }

    // Barınak destekçisi
    const shelterSupporter = this.achievements.get('shelter_supporter')!;
    shelterSupporter.progress = this.stats.sheltersSupported.length;
    if (!shelterSupporter.completed && this.stats.sheltersSupported.length >= 3) {
      this.unlockAchievement('shelter_supporter');
    }
  }

  /**
   * 🔓 Başarım kilidini aç
   */
  private unlockAchievement(achievementId: string): void {
    const achievement = this.achievements.get(achievementId);
    if (!achievement || achievement.completed) return;

    achievement.completed = true;
    this.stats.achievementsUnlocked++;

    this.emit('achievement-unlocked', achievement);
  }

  /**
   * 💝 Gerçek bağış yap
   */
  public async makeDonation(shelterId: string, amount: number): Promise<boolean> {
    const shelter = this.shelters.get(shelterId);
    if (!shelter || amount <= 0) return false;

    // Gerçek bağış linkine yönlendir
    if (shelter.donationLink) {
      window.open(shelter.donationLink, '_blank');
    }

    // İstatistikleri güncelle
    this.stats.totalDonationsMade++;
    this.stats.totalDonationAmount += amount;

    if (!this.stats.sheltersSupported.includes(shelterId)) {
      this.stats.sheltersSupported.push(shelterId);
    }

    this.checkAchievements();
    this.emit('donation-made', { shelter, amount });

    return true;
  }

  /**
   * 📊 İstatistikleri al
   */
  public getStats(): AnimalWelfareStats {
    return { ...this.stats };
  }

  /**
   * 🎯 Tüm quest'leri al
   */
  public getQuests(): AnimalWelfareQuest[] {
    return Array.from(this.quests.values());
  }

  /**
   * 🎯 Aktif quest'leri al
   */
  public getActiveQuests(): AnimalWelfareQuest[] {
    return this.getQuests().filter(q => !q.completed);
  }

  /**
   * 🏆 Tüm başarımları al
   */
  public getAchievements(): AnimalWelfareAchievement[] {
    return Array.from(this.achievements.values());
  }

  /**
   * 🏆 Kilit açılmış başarımları al
   */
  public getUnlockedAchievements(): AnimalWelfareAchievement[] {
    return this.getAchievements().filter(a => a.completed);
  }

  /**
   * 🏠 Tüm barınakları al
   */
  public getShelters(): AnimalShelter[] {
    return Array.from(this.shelters.values());
  }

  /**
   * 🏠 Barınak detaylarını al
   */
  public getShelter(shelterId: string): AnimalShelter | undefined {
    return this.shelters.get(shelterId);
  }

  /**
   * 📱 Sosyal medyada paylaş
   */
  public shareProgress(platform: 'twitter' | 'facebook' | 'instagram'): void {
    const stats = this.getStats();
    const message = `ANADOLU REALM'de ${stats.totalAnimalsHelped} hayvana yardım ettim! 🐾💚 Sen de hayvan dostlarımıza yardım et!`;

    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&hashtags=HayvanHakları,ANADOLU`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL
        alert('Instagram için ekran görüntüsü alıp paylaşabilirsiniz!');
        return;
    }

    window.open(url, '_blank', 'width=600,height=400');
  }

  /**
   * 📡 Event sistemi
   */
  public on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  public off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  /**
   * 🧹 Cleanup
   */
  public dispose(): void {
    this.quests.clear();
    this.achievements.clear();
    this.shelters.clear();
    this.listeners.clear();
  }
}
