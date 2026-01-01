/**
 * ANADOLU REALM - Ultra Realistic Game Sound Library
 * Comprehensive sound effects for all games with Ottoman theme
 */

export interface SoundEffect {
  id: string;
  name: string;
  file: string;
  category: 'ui' | 'game' | 'ambient' | 'combat' | 'voice' | 'music';
  volume?: number;
  loop?: boolean;
  variations?: string[]; // Multiple variations for same sound
}

export interface SoundTheme {
  name: string;
  ambient: SoundEffect[];
  music: SoundEffect[];
  effects: SoundEffect[];
}

// =============================================================================
// TAVLA (BACKGAMMON) SOUNDS
// =============================================================================
export const TAVLA_SOUNDS: SoundTheme = {
  name: 'Tavla',
  ambient: [
    {
      id: 'tavla_ambient_coffeehouse',
      name: 'Kahvehane Atmosferi',
      file: '/sounds/ambient/coffeehouse-chatter.mp3',
      category: 'ambient',
      volume: 0.3,
      loop: true
    },
    {
      id: 'tavla_ambient_istanbul',
      name: 'İstanbul Sokak Sesleri',
      file: '/sounds/ambient/istanbul-street.mp3',
      category: 'ambient',
      volume: 0.2,
      loop: true
    }
  ],
  music: [
    {
      id: 'tavla_music_main',
      name: 'Tavla Ana Müziği',
      file: '/sounds/music/tavla-theme.mp3',
      category: 'music',
      volume: 0.4,
      loop: true
    },
    {
      id: 'tavla_music_tense',
      name: 'Gerilim Müziği',
      file: '/sounds/music/tavla-tense.mp3',
      category: 'music',
      volume: 0.5,
      loop: true
    }
  ],
  effects: [
    // Dice Sounds
    {
      id: 'tavla_dice_roll',
      name: 'Zar Atma',
      file: '/sounds/sfx/dice-roll.mp3',
      category: 'game',
      volume: 0.7,
      variations: [
        '/sounds/sfx/dice-roll-1.mp3',
        '/sounds/sfx/dice-roll-2.mp3',
        '/sounds/sfx/dice-roll-3.mp3'
      ]
    },
    {
      id: 'tavla_dice_land',
      name: 'Zar İnişi',
      file: '/sounds/sfx/dice-land.mp3',
      category: 'game',
      volume: 0.8,
      variations: [
        '/sounds/sfx/dice-land-wood-1.mp3',
        '/sounds/sfx/dice-land-wood-2.mp3'
      ]
    },

    // Checker Movement
    {
      id: 'tavla_checker_move',
      name: 'Taş Hareketi',
      file: '/sounds/sfx/checker-slide.mp3',
      category: 'game',
      volume: 0.6,
      variations: [
        '/sounds/sfx/checker-slide-1.mp3',
        '/sounds/sfx/checker-slide-2.mp3',
        '/sounds/sfx/checker-slide-3.mp3'
      ]
    },
    {
      id: 'tavla_checker_place',
      name: 'Taş Yerleştirme',
      file: '/sounds/sfx/checker-place.mp3',
      category: 'game',
      volume: 0.7,
      variations: [
        '/sounds/sfx/checker-tap-1.mp3',
        '/sounds/sfx/checker-tap-2.mp3'
      ]
    },
    {
      id: 'tavla_checker_capture',
      name: 'Taş Vurma',
      file: '/sounds/sfx/checker-hit.mp3',
      category: 'game',
      volume: 0.9
    },

    // Board Sounds
    {
      id: 'tavla_board_fold',
      name: 'Tahta Kapama',
      file: '/sounds/sfx/board-close.mp3',
      category: 'game',
      volume: 0.5
    },
    {
      id: 'tavla_board_setup',
      name: 'Tahta Hazırlama',
      file: '/sounds/sfx/board-setup.mp3',
      category: 'game',
      volume: 0.4
    },

    // Game Events
    {
      id: 'tavla_double',
      name: 'Çift Zar',
      file: '/sounds/sfx/double-roll.mp3',
      category: 'game',
      volume: 0.8
    },
    {
      id: 'tavla_mars',
      name: 'Mars!',
      file: '/sounds/sfx/mars-alert.mp3',
      category: 'game',
      volume: 1.0
    },
    {
      id: 'tavla_win',
      name: 'Kazanma',
      file: '/sounds/sfx/tavla-victory.mp3',
      category: 'game',
      volume: 0.9
    },

    // Voice Lines (Turkish Coffeehouse Style)
    {
      id: 'tavla_voice_goodmove',
      name: 'İyi Hamle!',
      file: '/sounds/voice/tavla-good-move.mp3',
      category: 'voice',
      volume: 0.7,
      variations: [
        '/sounds/voice/tavla-aferin.mp3',
        '/sounds/voice/tavla-guzel.mp3',
        '/sounds/voice/tavla-bravo.mp3'
      ]
    },
    {
      id: 'tavla_voice_badluck',
      name: 'Kötü Şans',
      file: '/sounds/voice/tavla-bad-luck.mp3',
      category: 'voice',
      volume: 0.7,
      variations: [
        '/sounds/voice/tavla-yazik.mp3',
        '/sounds/voice/tavla-olmadi.mp3'
      ]
    }
  ]
};

// =============================================================================
// OKEY SOUNDS
// =============================================================================
export const OKEY_SOUNDS: SoundTheme = {
  name: 'Okey',
  ambient: [
    {
      id: 'okey_ambient_salon',
      name: 'Okey Salonu',
      file: '/sounds/ambient/okey-salon.mp3',
      category: 'ambient',
      volume: 0.3,
      loop: true
    },
    {
      id: 'okey_ambient_tiles',
      name: 'Taş Sesleri Arka Plan',
      file: '/sounds/ambient/tiles-ambient.mp3',
      category: 'ambient',
      volume: 0.2,
      loop: true
    }
  ],
  music: [
    {
      id: 'okey_music_main',
      name: 'Okey Ana Müziği',
      file: '/sounds/music/okey-theme.mp3',
      category: 'music',
      volume: 0.4,
      loop: true
    },
    {
      id: 'okey_music_final',
      name: 'Final Müziği',
      file: '/sounds/music/okey-finale.mp3',
      category: 'music',
      volume: 0.5,
      loop: true
    }
  ],
  effects: [
    // Tile Sounds
    {
      id: 'okey_tile_shuffle',
      name: 'Taş Karıştırma',
      file: '/sounds/sfx/tiles-shuffle.mp3',
      category: 'game',
      volume: 0.8,
      variations: [
        '/sounds/sfx/tiles-mix-1.mp3',
        '/sounds/sfx/tiles-mix-2.mp3',
        '/sounds/sfx/tiles-mix-3.mp3'
      ]
    },
    {
      id: 'okey_tile_draw',
      name: 'Taş Çekme',
      file: '/sounds/sfx/tile-pick.mp3',
      category: 'game',
      volume: 0.7,
      variations: [
        '/sounds/sfx/tile-pick-1.mp3',
        '/sounds/sfx/tile-pick-2.mp3',
        '/sounds/sfx/tile-pick-3.mp3',
        '/sounds/sfx/tile-pick-4.mp3'
      ]
    },
    {
      id: 'okey_tile_place',
      name: 'Taş Yerleştirme',
      file: '/sounds/sfx/tile-place.mp3',
      category: 'game',
      volume: 0.7,
      variations: [
        '/sounds/sfx/tile-tap-1.mp3',
        '/sounds/sfx/tile-tap-2.mp3',
        '/sounds/sfx/tile-tap-3.mp3'
      ]
    },
    {
      id: 'okey_tile_discard',
      name: 'Taş Atma',
      file: '/sounds/sfx/tile-throw.mp3',
      category: 'game',
      volume: 0.8
    },

    // Rack Sounds
    {
      id: 'okey_rack_organize',
      name: 'Taş Sıralama',
      file: '/sounds/sfx/rack-sort.mp3',
      category: 'game',
      volume: 0.6
    },
    {
      id: 'okey_rack_slide',
      name: 'Taş Kaydırma',
      file: '/sounds/sfx/rack-slide.mp3',
      category: 'game',
      volume: 0.5
    },

    // Game Events
    {
      id: 'okey_indicator_reveal',
      name: 'Gösterge Açılışı',
      file: '/sounds/sfx/indicator-reveal.mp3',
      category: 'game',
      volume: 0.9
    },
    {
      id: 'okey_double_okey',
      name: 'Çift Okey!',
      file: '/sounds/sfx/double-okey.mp3',
      category: 'game',
      volume: 1.0
    },
    {
      id: 'okey_finish',
      name: 'Bitirdim!',
      file: '/sounds/sfx/okey-finish.mp3',
      category: 'game',
      volume: 1.0
    },
    {
      id: 'okey_false_finish',
      name: 'Yanlış Bitiş',
      file: '/sounds/sfx/false-finish.mp3',
      category: 'game',
      volume: 0.8
    },

    // Voice Lines
    {
      id: 'okey_voice_start',
      name: 'Oyun Başlasın',
      file: '/sounds/voice/okey-haydi.mp3',
      category: 'voice',
      volume: 0.7
    },
    {
      id: 'okey_voice_goodhand',
      name: 'Güzel El',
      file: '/sounds/voice/okey-guzel-el.mp3',
      category: 'voice',
      volume: 0.7
    },
    {
      id: 'okey_voice_almost',
      name: 'Az Kaldı',
      file: '/sounds/voice/okey-az-kaldi.mp3',
      category: 'voice',
      volume: 0.7
    }
  ]
};

// =============================================================================
// BATAK SOUNDS
// =============================================================================
export const BATAK_SOUNDS: SoundTheme = {
  name: 'Batak',
  ambient: [
    {
      id: 'batak_ambient_club',
      name: 'Kart Kulübü',
      file: '/sounds/ambient/card-club.mp3',
      category: 'ambient',
      volume: 0.3,
      loop: true
    }
  ],
  music: [
    {
      id: 'batak_music_main',
      name: 'Batak Ana Müziği',
      file: '/sounds/music/batak-theme.mp3',
      category: 'music',
      volume: 0.4,
      loop: true
    },
    {
      id: 'batak_music_bidding',
      name: 'İhale Müziği',
      file: '/sounds/music/batak-bidding.mp3',
      category: 'music',
      volume: 0.5,
      loop: true
    }
  ],
  effects: [
    // Card Sounds
    {
      id: 'batak_card_shuffle',
      name: 'Kart Karıştırma',
      file: '/sounds/sfx/cards-shuffle.mp3',
      category: 'game',
      volume: 0.8,
      variations: [
        '/sounds/sfx/cards-shuffle-1.mp3',
        '/sounds/sfx/cards-shuffle-2.mp3',
        '/sounds/sfx/cards-riffle.mp3'
      ]
    },
    {
      id: 'batak_card_deal',
      name: 'Kart Dağıtma',
      file: '/sounds/sfx/card-deal.mp3',
      category: 'game',
      volume: 0.7,
      variations: [
        '/sounds/sfx/card-flick-1.mp3',
        '/sounds/sfx/card-flick-2.mp3',
        '/sounds/sfx/card-flick-3.mp3'
      ]
    },
    {
      id: 'batak_card_play',
      name: 'Kart Oynama',
      file: '/sounds/sfx/card-place.mp3',
      category: 'game',
      volume: 0.8,
      variations: [
        '/sounds/sfx/card-snap-1.mp3',
        '/sounds/sfx/card-snap-2.mp3',
        '/sounds/sfx/card-snap-3.mp3'
      ]
    },
    {
      id: 'batak_card_collect',
      name: 'El Toplama',
      file: '/sounds/sfx/cards-collect.mp3',
      category: 'game',
      volume: 0.7
    },

    // Bidding Sounds
    {
      id: 'batak_bid_announce',
      name: 'İhale Açıklama',
      file: '/sounds/sfx/bid-bell.mp3',
      category: 'game',
      volume: 0.8
    },
    {
      id: 'batak_bid_pass',
      name: 'Pas',
      file: '/sounds/sfx/bid-pass.mp3',
      category: 'game',
      volume: 0.6
    },
    {
      id: 'batak_bid_raise',
      name: 'İhale Artırma',
      file: '/sounds/sfx/bid-raise.mp3',
      category: 'game',
      volume: 0.9
    },
    {
      id: 'batak_bid_won',
      name: 'İhale Kazanma',
      file: '/sounds/sfx/bid-won.mp3',
      category: 'game',
      volume: 1.0
    },

    // Trump Selection
    {
      id: 'batak_trump_select',
      name: 'Koz Seçimi',
      file: '/sounds/sfx/trump-select.mp3',
      category: 'game',
      volume: 0.9
    },
    {
      id: 'batak_trump_reveal',
      name: 'Koz Açıklaması',
      file: '/sounds/sfx/trump-reveal.mp3',
      category: 'game',
      volume: 1.0
    },

    // Trick Events
    {
      id: 'batak_trick_win',
      name: 'El Kazanma',
      file: '/sounds/sfx/trick-win.mp3',
      category: 'game',
      volume: 0.8
    },
    {
      id: 'batak_contract_made',
      name: 'Kontrat Başarılı',
      file: '/sounds/sfx/contract-success.mp3',
      category: 'game',
      volume: 1.0
    },
    {
      id: 'batak_contract_failed',
      name: 'Kontrat Başarısız',
      file: '/sounds/sfx/contract-fail.mp3',
      category: 'game',
      volume: 0.9
    },

    // Voice Lines
    {
      id: 'batak_voice_bid',
      name: 'İhale Sayıları',
      file: '/sounds/voice/batak-bid.mp3',
      category: 'voice',
      volume: 0.7,
      variations: [
        '/sounds/voice/batak-bid-5.mp3',
        '/sounds/voice/batak-bid-6.mp3',
        '/sounds/voice/batak-bid-7.mp3',
        '/sounds/voice/batak-bid-8.mp3',
        '/sounds/voice/batak-bid-9.mp3',
        '/sounds/voice/batak-bid-10.mp3',
        '/sounds/voice/batak-bid-11.mp3',
        '/sounds/voice/batak-bid-12.mp3',
        '/sounds/voice/batak-bid-13.mp3'
      ]
    },
    {
      id: 'batak_voice_koz',
      name: 'Koz İlanı',
      file: '/sounds/voice/batak-koz.mp3',
      category: 'voice',
      volume: 0.8,
      variations: [
        '/sounds/voice/batak-koz-kupa.mp3',
        '/sounds/voice/batak-koz-karo.mp3',
        '/sounds/voice/batak-koz-sinek.mp3',
        '/sounds/voice/batak-koz-maca.mp3'
      ]
    }
  ]
};

// =============================================================================
// OTTOMAN COMBAT SOUNDS
// =============================================================================
export const COMBAT_SOUNDS: SoundTheme = {
  name: 'Ottoman Combat',
  ambient: [
    {
      id: 'combat_ambient_battlefield',
      name: 'Savaş Alanı',
      file: '/sounds/ambient/battlefield.mp3',
      category: 'ambient',
      volume: 0.4,
      loop: true
    },
    {
      id: 'combat_ambient_army',
      name: 'Ordu Sesleri',
      file: '/sounds/ambient/army-march.mp3',
      category: 'ambient',
      volume: 0.3,
      loop: true
    }
  ],
  music: [
    {
      id: 'combat_music_battle',
      name: 'Savaş Müziği',
      file: '/sounds/music/ottoman-battle.mp3',
      category: 'music',
      volume: 0.6,
      loop: true
    },
    {
      id: 'combat_music_mehter',
      name: 'Mehter Marşı',
      file: '/sounds/music/mehter-march.mp3',
      category: 'music',
      volume: 0.7,
      loop: true
    }
  ],
  effects: [
    // Yeniçeri Sounds
    {
      id: 'yeni_shield_block',
      name: 'Kalkan Bloğu',
      file: '/sounds/sfx/shield-block.mp3',
      category: 'combat',
      volume: 0.8,
      variations: [
        '/sounds/sfx/shield-block-1.mp3',
        '/sounds/sfx/shield-block-2.mp3',
        '/sounds/sfx/shield-impact.mp3'
      ]
    },
    {
      id: 'yeni_cannon_fire',
      name: 'Top Atışı',
      file: '/sounds/sfx/cannon-fire.mp3',
      category: 'combat',
      volume: 1.0
    },
    {
      id: 'yeni_formation',
      name: 'Phalanx Formasyonu',
      file: '/sounds/sfx/formation-shout.mp3',
      category: 'combat',
      volume: 0.9
    },

    // Sipahi Sounds
    {
      id: 'sipahi_horse_gallop',
      name: 'At Koşusu',
      file: '/sounds/sfx/horse-gallop.mp3',
      category: 'combat',
      volume: 0.8,
      loop: true
    },
    {
      id: 'sipahi_sword_slash',
      name: 'Kılıç Savurma',
      file: '/sounds/sfx/sword-slash.mp3',
      category: 'combat',
      volume: 0.9,
      variations: [
        '/sounds/sfx/sword-swing-1.mp3',
        '/sounds/sfx/sword-swing-2.mp3',
        '/sounds/sfx/sword-whoosh.mp3'
      ]
    },
    {
      id: 'sipahi_charge',
      name: 'Süvari Şarjı',
      file: '/sounds/sfx/cavalry-charge.mp3',
      category: 'combat',
      volume: 1.0
    },

    // Okçu Sounds
    {
      id: 'okcu_bow_draw',
      name: 'Yay Germe',
      file: '/sounds/sfx/bow-draw.mp3',
      category: 'combat',
      volume: 0.7
    },
    {
      id: 'okcu_arrow_fire',
      name: 'Ok Atışı',
      file: '/sounds/sfx/arrow-release.mp3',
      category: 'combat',
      volume: 0.8,
      variations: [
        '/sounds/sfx/arrow-fire-1.mp3',
        '/sounds/sfx/arrow-fire-2.mp3',
        '/sounds/sfx/arrow-whistle.mp3'
      ]
    },
    {
      id: 'okcu_arrow_hit',
      name: 'Ok İsabeti',
      file: '/sounds/sfx/arrow-impact.mp3',
      category: 'combat',
      volume: 0.9
    },

    // Derviş Sounds
    {
      id: 'dervish_heal',
      name: 'İyileştirme',
      file: '/sounds/sfx/heal-chime.mp3',
      category: 'combat',
      volume: 0.7
    },
    {
      id: 'dervish_prayer',
      name: 'Dua Sesi',
      file: '/sounds/sfx/prayer-echo.mp3',
      category: 'combat',
      volume: 0.6
    },
    {
      id: 'dervish_blessing',
      name: 'Bereket Duası',
      file: '/sounds/sfx/blessing-glow.mp3',
      category: 'combat',
      volume: 0.8
    },

    // Haşhaşin Sounds
    {
      id: 'hashasin_stealth',
      name: 'Gizlenme',
      file: '/sounds/sfx/stealth-vanish.mp3',
      category: 'combat',
      volume: 0.6
    },
    {
      id: 'hashasin_dagger',
      name: 'Hançer Saldırısı',
      file: '/sounds/sfx/dagger-stab.mp3',
      category: 'combat',
      volume: 0.9
    },
    {
      id: 'hashasin_backstab',
      name: 'Arkadan Saldırı',
      file: '/sounds/sfx/critical-strike.mp3',
      category: 'combat',
      volume: 1.0
    },

    // Ultimate Sounds
    {
      id: 'ultimate_activate',
      name: 'Ultimate Aktivasyon',
      file: '/sounds/sfx/ultimate-charge.mp3',
      category: 'combat',
      volume: 1.0
    },
    {
      id: 'ultimate_osmanlı',
      name: 'Osmanlı Fatihi',
      file: '/sounds/sfx/ultimate-osmanlı.mp3',
      category: 'combat',
      volume: 1.0
    }
  ]
};

// =============================================================================
// UI SOUNDS
// =============================================================================
export const UI_SOUNDS: SoundEffect[] = [
  {
    id: 'ui_click',
    name: 'Tıklama',
    file: '/sounds/ui/click.mp3',
    category: 'ui',
    volume: 0.5,
    variations: [
      '/sounds/ui/click-1.mp3',
      '/sounds/ui/click-2.mp3',
      '/sounds/ui/tap.mp3'
    ]
  },
  {
    id: 'ui_hover',
    name: 'Hover',
    file: '/sounds/ui/hover.mp3',
    category: 'ui',
    volume: 0.3
  },
  {
    id: 'ui_open',
    name: 'Menü Açma',
    file: '/sounds/ui/menu-open.mp3',
    category: 'ui',
    volume: 0.6
  },
  {
    id: 'ui_close',
    name: 'Menü Kapama',
    file: '/sounds/ui/menu-close.mp3',
    category: 'ui',
    volume: 0.6
  },
  {
    id: 'ui_success',
    name: 'Başarı',
    file: '/sounds/ui/success.mp3',
    category: 'ui',
    volume: 0.7
  },
  {
    id: 'ui_error',
    name: 'Hata',
    file: '/sounds/ui/error.mp3',
    category: 'ui',
    volume: 0.7
  },
  {
    id: 'ui_notification',
    name: 'Bildirim',
    file: '/sounds/ui/notification.mp3',
    category: 'ui',
    volume: 0.6
  }
];

// =============================================================================
// SOUND LIBRARY MANAGER
// =============================================================================
export class SoundLibrary {
  private sounds: Map<string, SoundEffect> = new Map();
  private themes: Map<string, SoundTheme> = new Map();

  constructor() {
    this.initializeLibrary();
  }

  private initializeLibrary() {
    // Register all themes
    this.themes.set('tavla', TAVLA_SOUNDS);
    this.themes.set('okey', OKEY_SOUNDS);
    this.themes.set('batak', BATAK_SOUNDS);
    this.themes.set('combat', COMBAT_SOUNDS);

    // Register all sounds
    [...TAVLA_SOUNDS.effects, ...TAVLA_SOUNDS.ambient, ...TAVLA_SOUNDS.music].forEach(sound => {
      this.sounds.set(sound.id, sound);
    });

    [...OKEY_SOUNDS.effects, ...OKEY_SOUNDS.ambient, ...OKEY_SOUNDS.music].forEach(sound => {
      this.sounds.set(sound.id, sound);
    });

    [...BATAK_SOUNDS.effects, ...BATAK_SOUNDS.ambient, ...BATAK_SOUNDS.music].forEach(sound => {
      this.sounds.set(sound.id, sound);
    });

    [...COMBAT_SOUNDS.effects, ...COMBAT_SOUNDS.ambient, ...COMBAT_SOUNDS.music].forEach(sound => {
      this.sounds.set(sound.id, sound);
    });

    UI_SOUNDS.forEach(sound => {
      this.sounds.set(sound.id, sound);
    });
  }

  getSound(id: string): SoundEffect | undefined {
    return this.sounds.get(id);
  }

  getTheme(name: string): SoundTheme | undefined {
    return this.themes.get(name);
  }

  getAllSounds(): SoundEffect[] {
    return Array.from(this.sounds.values());
  }

  getSoundsByCategory(category: SoundEffect['category']): SoundEffect[] {
    return this.getAllSounds().filter(sound => sound.category === category);
  }

  getRandomVariation(soundId: string): string | null {
    const sound = this.getSound(soundId);
    if (!sound) return null;

    if (sound.variations && sound.variations.length > 0) {
      const randomIndex = Math.floor(Math.random() * sound.variations.length);
      return sound.variations[randomIndex];
    }

    return sound.file;
  }
}

export const soundLibrary = new SoundLibrary();
