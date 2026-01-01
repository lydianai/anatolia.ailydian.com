/**
 * NPC DIALOG SYSTEM - ANADOLU REALM
 
 *
 * Features:
 * - Turkish-themed NPCs with cultural authenticity
 * - Dialog trees with branching conversations
 * - Quest integration
 * - Relationship tracking
 * - Context-aware responses
 * - Turkish colloquialisms and humor
 */

export type NPCPersonality = 'friendly' | 'grumpy' | 'wise' | 'funny' | 'mysterious' | 'professional';

export interface DialogOption {
  id: string;
  text: string;
  nextDialog?: string;
  questTrigger?: string; // Quest ID to trigger
  questRequirement?: string; // Quest ID required
  relationshipChange?: number; // -10 to +10
  unlockDialog?: string; // Unlock new dialog branch
  endConversation?: boolean;
}

export interface Dialog {
  id: string;
  text: string;
  emotion?: 'happy' | 'sad' | 'angry' | 'neutral' | 'surprised' | 'thinking';
  options: DialogOption[];
  requirement?: {
    level?: number;
    quest?: string;
    relationship?: number;
  };
}

export interface NPC {
  id: string;
  name: string;
  title: string; // e.g., "Çaycı", "Simitçi", "Rehber"
  personality: NPCPersonality;
  occupation: string;
  location: string; // Zone ID
  avatar: string; // Emoji or icon
  relationship: number; // 0-100
  dialogs: Dialog[];
  defaultDialog: string; // Dialog ID
  greetings: string[]; // Random greetings
  farewells: string[]; // Random goodbyes
}

export class NPCDialogSystem {
  private npcs: Map<string, NPC> = new Map();
  private activeConversation: { npcId: string; dialogId: string } | null = null;
  private onDialogUpdate?: (npc: NPC, dialog: Dialog) => void;

  constructor() {
    this.initializeNPCs();
  }

  private initializeNPCs() {
    const npcs: NPC[] = [
      // Ahmet Bey - Rehber (Guide)
      {
        id: 'npc_ahmet_guide',
        name: 'Ahmet Bey',
        title: 'Dijital Rehber',
        personality: 'wise',
        occupation: 'Rehber',
        location: 'zone_istanbul_taksim',
        avatar: '👨‍🏫',
        relationship: 50,
        greetings: [
          'Hoş geldin evladım!',
          'Merhaba! Nasılsın?',
          'Ah, yine görüşmek ne güzel!',
          'Selam kardeşim, yolun açık olsun!'
        ],
        farewells: [
          'Güle güle, yolun açık olsun!',
          'Kendine iyi bak!',
          'Görüşmek üzere!',
          'Allah\'a emanet ol!'
        ],
        defaultDialog: 'ahmet_intro',
        dialogs: [
          {
            id: 'ahmet_intro',
            text: 'Hoş geldin Anadolu Realm\'e! Ben Ahmet, buranın dijital rehberiyim. Sana bu muhteşem dünyayı göstermek isterim. Ne dersin?',
            emotion: 'happy',
            options: [
              {
                id: 'opt_1',
                text: 'Merhaba Ahmet Bey! Evet, çok merak ediyorum.',
                nextDialog: 'ahmet_explain',
                relationshipChange: 5
              },
              {
                id: 'opt_2',
                text: 'Teşekkürler ama kendi başıma keşfetmek istiyorum.',
                nextDialog: 'ahmet_understand',
                relationshipChange: -2
              },
              {
                id: 'opt_3',
                text: 'Quest sistemi nasıl çalışıyor?',
                nextDialog: 'ahmet_quest_explain'
              }
            ]
          },
          {
            id: 'ahmet_explain',
            text: 'Harika! Bu dijital Anadolu, binlerce yıllık kültürümüzün modern versiyonu. İstanbul\'dan Ankara\'ya, her şehir burada. Görevler yaparak seviye atla, arkadaşlar edin, ve efsaneni yaz!',
            emotion: 'happy',
            options: [
              {
                id: 'opt_4',
                text: 'Harika! İlk görevim nedir?',
                questTrigger: 'main_001',
                nextDialog: 'ahmet_first_quest',
                relationshipChange: 5
              },
              {
                id: 'opt_5',
                text: 'Peki burada neler yapabilirim?',
                nextDialog: 'ahmet_activities'
              }
            ]
          },
          {
            id: 'ahmet_quest_explain',
            text: 'Görevler bu dünyanın can damarı! Ana hikaye görevleri (📖) senin destanını anlatır. Yan görevler (⭐) para ve deneyim kazanmanı sağlar. Günlük görevler (📅) ise her gün sıfırlanır. Hepsini tamamla, seviye atla!',
            emotion: 'thinking',
            options: [
              {
                id: 'opt_6',
                text: 'Anladım, ilk görevime başlayayım!',
                questTrigger: 'main_001',
                nextDialog: 'ahmet_first_quest'
              },
              {
                id: 'opt_7',
                text: 'Başka ne bilmem lazım?',
                nextDialog: 'ahmet_explain'
              }
            ]
          },
          {
            id: 'ahmet_first_quest',
            text: 'Mükemmel! İlk görevin: İstanbul Taksim Meydanı\'nı keşfet ve 3 önemli noktayı ziyaret et. Taksim Anıtı\'ndan başla. Hadi bakalım, seni bekliyorum!',
            emotion: 'happy',
            options: [
              {
                id: 'opt_8',
                text: 'Tamam, hemen gidiyorum!',
                endConversation: true,
                relationshipChange: 5
              }
            ]
          },
          {
            id: 'ahmet_understand',
            text: 'Anlıyorum, keşfetmeyi seven birisin. Saygı duyuyorum. Ama unutma, bir şeye ihtiyacın olursa ben buradayım!',
            emotion: 'neutral',
            options: [
              {
                id: 'opt_9',
                text: 'Teşekkürler Ahmet Bey.',
                endConversation: true
              },
              {
                id: 'opt_10',
                text: 'Aslında biraz yardım almak isterim.',
                nextDialog: 'ahmet_explain'
              }
            ]
          },
          {
            id: 'ahmet_activities',
            text: 'Bu dünyada çok şey var! Mini oyunlar oyna (tavla, okey), arkadaşlarla guild kur, ticaret yap, emlak sat, NPC\'lerle konuş... Sınır senin hayal gücün!',
            emotion: 'excited',
            options: [
              {
                id: 'opt_11',
                text: 'Vay be, heyecan verici!',
                nextDialog: 'ahmet_first_quest'
              }
            ]
          }
        ]
      },

      // Mehmet - Çaycı (Tea Man)
      {
        id: 'npc_mehmet_teaman',
        name: 'Mehmet',
        title: 'Çaycı',
        personality: 'friendly',
        occupation: 'Çay Ocağı Sahibi',
        location: 'zone_istanbul_taksim',
        avatar: '☕',
        relationship: 30,
        greetings: [
          'Hoş geldin kardeşim, çay içer misin?',
          'Aaa, müşteri geldi! Buyur, buyur!',
          'Merhaba! Tavlaya oturalım mı?',
          'Selam dostum, nasıl gidiyor?'
        ],
        farewells: [
          'Yine bekleriz ha!',
          'Güle güle, afiyet olsun!',
          'Hadi hayırlı işler!',
          'Sağlıcakla kal!'
        ],
        defaultDialog: 'mehmet_intro',
        dialogs: [
          {
            id: 'mehmet_intro',
            text: 'Hoş geldin kardeşim! Ben Mehmet, bu çay ocağının sahibiyim. İstanbul\'un en güzel çayı bende! Bir çay alsana?',
            emotion: 'happy',
            options: [
              {
                id: 'opt_m1',
                text: 'Bir çay alayım. Kaça?',
                nextDialog: 'mehmet_tea_price',
                relationshipChange: 3
              },
              {
                id: 'opt_m2',
                text: 'Teşekkürler, şimdi olmaz.',
                nextDialog: 'mehmet_no_tea'
              },
              {
                id: 'opt_m3',
                text: 'Çay ocağı işi nasıl gidiyor?',
                nextDialog: 'mehmet_business'
              }
            ]
          },
          {
            id: 'mehmet_tea_price',
            text: 'Sana 5 altına vereyim. Ama dikkat et, sıcak! Anadolu çayı hakkını verir he!',
            emotion: 'happy',
            options: [
              {
                id: 'opt_m4',
                text: 'Al bakalım 5 altın. [ÇAY AL]',
                endConversation: true,
                relationshipChange: 5
                // TODO: Give tea item, remove gold
              },
              {
                id: 'opt_m5',
                text: 'Biraz pahalı, başka zaman.',
                nextDialog: 'mehmet_haggle'
              }
            ]
          },
          {
            id: 'mehmet_haggle',
            text: 'Aaa ne pahalısı ya! En kaliteli çayı getiriyorum ben. Ama sen müşterimsin, sana 3 altına vereyim.',
            emotion: 'thinking',
            options: [
              {
                id: 'opt_m6',
                text: 'Tamam, 3 altına olsun. [ÇAY AL]',
                endConversation: true,
                relationshipChange: 3
              },
              {
                id: 'opt_m7',
                text: 'Yok sağ ol, başka zaman.',
                endConversation: true,
                relationshipChange: -1
              }
            ]
          },
          {
            id: 'mehmet_no_tea',
            text: 'Tamamdır kardeşim, istediğin zaman gel. Kapım her zaman açık!',
            emotion: 'neutral',
            options: [
              {
                id: 'opt_m8',
                text: 'Görüşürüz Mehmet!',
                endConversation: true
              }
            ]
          },
          {
            id: 'mehmet_business',
            text: 'İş yavaş be kardeş... Malzeme bulmak zor. Çay yaprağı, şeker, falan... Sen bana yardım etsen mi acaba?',
            emotion: 'sad',
            requirement: {
              level: 2
            },
            options: [
              {
                id: 'opt_m9',
                text: 'Tabii, ne lazım?',
                questTrigger: 'side_001',
                nextDialog: 'mehmet_quest',
                relationshipChange: 10
              },
              {
                id: 'opt_m10',
                text: 'Üzgünüm, şu an vaktim yok.',
                nextDialog: 'mehmet_understand'
              }
            ]
          },
          {
            id: 'mehmet_quest',
            text: 'Allah razı olsun! 10 çay yaprağı ve 5 şeker paketi lazım. Pazarda bulursun. Getirirsen sana özel bir şey yapacağım!',
            emotion: 'happy',
            options: [
              {
                id: 'opt_m11',
                text: 'Tamam, hemen getiririm!',
                endConversation: true
              }
            ]
          },
          {
            id: 'mehmet_understand',
            text: 'Anladım kardeş, sorun değil. İstersen sen de müşterimsin, gel otur biraz sohbet edelim.',
            emotion: 'neutral',
            options: [
              {
                id: 'opt_m12',
                text: 'Olur, biraz oturalım.',
                nextDialog: 'mehmet_chat'
              },
              {
                id: 'opt_m13',
                text: 'Başka zaman, şimdi acelem var.',
                endConversation: true
              }
            ]
          },
          {
            id: 'mehmet_chat',
            text: 'Aaa mis gibi! Biliyor musun, ben burada 20 yıldır çaycılık yapıyorum. Dijital dünyada da aynı işi yapıyorum, hahaha! İşte bu benim tutkum.',
            emotion: 'happy',
            options: [
              {
                id: 'opt_m14',
                text: 'Vay be, harika! İyi ki varsın.',
                relationshipChange: 5,
                endConversation: true
              }
            ]
          }
        ]
      },

      // Ali - Simitçi (Simit Seller)
      {
        id: 'npc_ali_simitci',
        name: 'Ali',
        title: 'Simitçi',
        personality: 'funny',
        occupation: 'Seyyar Satıcı',
        location: 'zone_istanbul_taksim',
        avatar: '🥯',
        relationship: 20,
        greetings: [
          'Taze simit, taze taze!',
          'Hoşgeldin kardeş, simit alıyoruz!',
          'Aaaaa, en iyi müşterim geldi!',
          'Buyur kanka, bugün sıcacık!'
        ],
        farewells: [
          'Hadi eyvallah!',
          'Yine bekleriz!',
          'Güle güle kullan!',
          'Kolay gelsin!'
        ],
        defaultDialog: 'ali_intro',
        dialogs: [
          {
            id: 'ali_intro',
            text: 'Hoşgeldin gardaş! Taze taze simit var, daha fırından çıktı! Bi tane alır mısın?',
            emotion: 'happy',
            options: [
              {
                id: 'opt_a1',
                text: 'Bir simit ver bakalım, kaça?',
                nextDialog: 'ali_price',
                relationshipChange: 2
              },
              {
                id: 'opt_a2',
                text: 'Şimdi olmaz, belki sonra.',
                nextDialog: 'ali_okay'
              },
              {
                id: 'opt_a3',
                text: 'İşin nasıl gidiyor Ali?',
                nextDialog: 'ali_business'
              }
            ]
          },
          {
            id: 'ali_price',
            text: 'Sana 2 altına vereyim kardeş! Hem susamlı hem de taze. Bunun gibisini bulamazsın!',
            emotion: 'happy',
            options: [
              {
                id: 'opt_a4',
                text: 'Al 2 altın, ver simiti!',
                endConversation: true,
                relationshipChange: 5
              },
              {
                id: 'opt_a5',
                text: '2 altın mı? Çok pahalı!',
                nextDialog: 'ali_haggle'
              }
            ]
          },
          {
            id: 'ali_haggle',
            text: 'Aaaa pahalı deme ya! Ama sen müşterimsin, 1 altına vereyim. Ama son!',
            emotion: 'funny',
            options: [
              {
                id: 'opt_a6',
                text: 'Tamam, al 1 altın!',
                endConversation: true,
                relationshipChange: 3
              },
              {
                id: 'opt_a7',
                text: 'Yok başka zaman.',
                endConversation: true,
                relationshipChange: -2
              }
            ]
          },
          {
            id: 'ali_okay',
            text: 'Tamamdır kanka, istersen gel. Ben buradayım zaten, hahahaha!',
            emotion: 'happy',
            options: [
              {
                id: 'opt_a8',
                text: 'Görüşürüz Ali!',
                endConversation: true
              }
            ]
          },
          {
            id: 'ali_business',
            text: 'Valla kardeş, dertlerim çok! Arabam kayboldu, müşteriler şikayet ediyor... Yok ben bittim!',
            emotion: 'sad',
            requirement: {
              level: 4
            },
            options: [
              {
                id: 'opt_a9',
                text: 'Arabanı ben bulurum, merak etme!',
                questTrigger: 'side_002',
                nextDialog: 'ali_quest',
                relationshipChange: 15
              },
              {
                id: 'opt_a10',
                text: 'Geçmiş olsun, umarım bulursun.',
                nextDialog: 'ali_sad'
              }
            ]
          },
          {
            id: 'ali_quest',
            text: 'Gerçekten mi lan!? Sen adamsın be! Arabayı Galata taraflarında görmüşlerdi. Bulursan sana ömür boyu bedava simit!',
            emotion: 'surprised',
            options: [
              {
                id: 'opt_a11',
                text: 'Tamam, hemen gidip bakıyorum!',
                endConversation: true
              }
            ]
          },
          {
            id: 'ali_sad',
            text: 'Sağol kardeş... İnşallah bulacağım bir şekilde.',
            emotion: 'sad',
            options: [
              {
                id: 'opt_a12',
                text: 'Görüşürüz Ali, başın sağolsun.',
                endConversation: true
              }
            ]
          }
        ]
      }
    ];

    // Add all NPCs to the map
    npcs.forEach(npc => {
      this.npcs.set(npc.id, npc);
    });
  }

  public getNPC(npcId: string): NPC | undefined {
    return this.npcs.get(npcId);
  }

  public getAllNPCs(): NPC[] {
    return Array.from(this.npcs.values());
  }

  public getNPCsByLocation(location: string): NPC[] {
    return this.getAllNPCs().filter(npc => npc.location === location);
  }

  public startConversation(npcId: string): Dialog | null {
    const npc = this.npcs.get(npcId);
    if (!npc) return null;

    const dialog = npc.dialogs.find(d => d.id === npc.defaultDialog);
    if (!dialog) return null;

    this.activeConversation = { npcId, dialogId: dialog.id };
    this.onDialogUpdate?.(npc, dialog);

    return dialog;
  }

  public selectOption(optionId: string): Dialog | null {
    if (!this.activeConversation) return null;

    const npc = this.npcs.get(this.activeConversation.npcId);
    if (!npc) return null;

    const currentDialog = npc.dialogs.find(d => d.id === this.activeConversation!.dialogId);
    if (!currentDialog) return null;

    const option = currentDialog.options.find(opt => opt.id === optionId);
    if (!option) return null;

    // Update relationship
    if (option.relationshipChange) {
      npc.relationship = Math.max(0, Math.min(100, npc.relationship + option.relationshipChange));
    }

    // End conversation if specified
    if (option.endConversation) {
      this.activeConversation = null;
      return null;
    }

    // Move to next dialog
    if (option.nextDialog) {
      const nextDialog = npc.dialogs.find(d => d.id === option.nextDialog);
      if (nextDialog) {
        this.activeConversation.dialogId = nextDialog.id;
        this.onDialogUpdate?.(npc, nextDialog);
        return nextDialog;
      }
    }

    return null;
  }

  public endConversation(): void {
    this.activeConversation = null;
  }

  public getRandomGreeting(npcId: string): string {
    const npc = this.npcs.get(npcId);
    if (!npc) return 'Merhaba!';

    return npc.greetings[Math.floor(Math.random() * npc.greetings.length)];
  }

  public getRandomFarewell(npcId: string): string {
    const npc = this.npcs.get(npcId);
    if (!npc) return 'Güle güle!';

    return npc.farewells[Math.floor(Math.random() * npc.farewells.length)];
  }

  public setDialogUpdateCallback(callback: (npc: NPC, dialog: Dialog) => void): void {
    this.onDialogUpdate = callback;
  }

  public getActiveConversation(): { npcId: string; dialogId: string } | null {
    return this.activeConversation;
  }
}

// Singleton instance
let npcDialogSystemInstance: NPCDialogSystem | null = null;

export function getNPCDialogSystem(): NPCDialogSystem {
  if (!npcDialogSystemInstance) {
    npcDialogSystemInstance = new NPCDialogSystem();
  }
  return npcDialogSystemInstance;
}
