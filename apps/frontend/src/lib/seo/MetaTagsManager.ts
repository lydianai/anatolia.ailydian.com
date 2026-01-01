/**
 * 🏷️ META TAGS MANAGER - ANADOLU REALM
 *
 * Tüm sayfalar için dinamik meta tag yönetimi:
 * - Favicon management
 * - Title optimization
 * - Description generation
 * - OpenGraph tags
 * - Twitter Cards
 * - Apple touch icons
 * - Manifest.json
 *
 * @author AILYDIAN Orchestrator v4.0
 */

/**
 * Page meta configuration
 */
export interface PageMetaConfig {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'game';
}

/**
 * 🏷️ Meta Tags Manager
 */
export class MetaTagsManager {
  private readonly BASE_URL = 'https://anatolia.ailydian.com';
  private readonly DEFAULT_IMAGE = `${this.BASE_URL}/og-image.jpg`;
  private readonly FAVICON_BASE = `${this.BASE_URL}/favicons`;

  /**
   * 📄 Page configurations
   */
  private readonly PAGE_CONFIGS: Record<string, PageMetaConfig> = {
    home: {
      title: 'ANADOLU REALM - Türkiye\'nin Efsanevi MMORPG Oyunu',
      description: 'Osmanlı İmparatorluğu\'nda epik maceralara atıl! Ücretsiz online MMORPG. Lonca kur, savaş, ticaret yap ve Anadolu topraklarını fethet. 100.000+ aktif oyuncu!',
      keywords: [
        'MMORPG Türkiye',
        'Türk oyunu',
        'Osmanlı oyunu',
        'online rol yapma',
        'multiplayer oyun',
        'ücretsiz MMORPG',
        'browser game',
        'Türk kültürü oyunu'
      ],
      type: 'website'
    },

    game: {
      title: 'Oyuna Başla - ANADOLU REALM | Osmanlı Destanı',
      description: 'ANADOLU REALM\'e katıl! Karakterini oluştur, 5 farklı sınıf seç (Yeniçeri, Sipahi, Okçu, Dervish, Haşhaşin), epik görevlere atıl!',
      keywords: [
        'MMORPG oyna',
        'karakter oluştur',
        'sınıf seçimi',
        'online oyun başla',
        'Osmanlı savaşları',
        'multiplayer battle',
        'PvP PvE'
      ],
      type: 'game'
    },

    features: {
      title: 'Oyun Özellikleri - ANADOLU REALM | Premium MMORPG',
      description: 'Gerçekçi fizik motoru, AI NPC sistemi, dinamik hava, gece-gündüz döngüsü, zanaat sistemi, lonca savaşları, ev sistemi, tavla-okey-batak ve 100+ özellik!',
      keywords: [
        'oyun özellikleri',
        'MMORPG features',
        'zanaat sistemi',
        'guild system',
        'housing',
        'crafting',
        'combat system',
        'quest system'
      ],
      type: 'website'
    },

    classes: {
      title: 'Sınıflar ve Yetenekler - ANADOLU REALM',
      description: '5 benzersiz Osmanlı sınıfı! Yeniçeri (Tank), Sipahi (DPS), Okçu (Ranged), Dervish (Healer), Haşhaşin (Assassin). Her sınıf için 3 beceri ağacı!',
      keywords: [
        'oyun sınıfları',
        'Yeniçeri',
        'Sipahi',
        'Okçu',
        'Dervish',
        'Haşhaşin',
        'skill tree',
        'beceri ağacı'
      ],
      type: 'website'
    },

    guilds: {
      title: 'Lonca Sistemi - ANADOLU REALM | Guild Wars',
      description: 'Kendi loncanu kur veya güçlü bir loncaya katıl! Bölge kontrolü, lonca savaşları, özel beceriler, ortak depo ve 100 kişilik topluluk!',
      keywords: [
        'lonca',
        'guild',
        'guild wars',
        'lonca savaşları',
        'bölge kontrolü',
        'topluluk',
        'online community'
      ],
      type: 'website'
    },

    crafting: {
      title: 'Zanaat Sistemi - ANADOLU REALM | 5 Meslek',
      description: 'Demirci, Terzi, Aşçı, Mücevherci, Simyacı! 1000+ tarif, 7 kalite seviyesi, masterwork üretim. Ekonomiye hükmet!',
      keywords: [
        'crafting',
        'zanaat',
        'demirci',
        'terzi',
        'mücevherci',
        'simyacı',
        'meslek sistemi',
        'ekonomi'
      ],
      type: 'website'
    },

    housing: {
      title: 'Ev Sistemi - ANADOLU REALM | Kendi Evinizi Kurun',
      description: 'Stüdyo\'dan Saray\'a 5 farklı ev! 500+ mobilya, bahçe sistemi, ev partileri, kişiselleştirme. Osmanlı mimarisi ile tasarla!',
      keywords: [
        'ev sistemi',
        'housing',
        'Osmanlı evi',
        'konak',
        'saray',
        'mobilya',
        'dekorasyon'
      ],
      type: 'website'
    },

    quests: {
      title: 'Görevler - ANADOLU REALM | 1000+ Macera',
      description: 'Ana hikaye, yan görevler, günlük görevler! Seçimleriniz hikayeyi şekillendirir. Osmanlı/İsyancı/Tarafsız yolları!',
      keywords: [
        'görevler',
        'quest',
        'hikaye',
        'story',
        'macera',
        'branching story',
        'daily quests'
      ],
      type: 'website'
    },

    pvp: {
      title: 'PvP Savaşlar - ANADOLU REALM | Arena & Lonca Savaşları',
      description: '1v1 düello, 3v3 arena, 5v5 savaş alanı, 100v100 lonca savaşları! Sıralama sistemi, sezonluk ödüller, turnuvalar!',
      keywords: [
        'PvP',
        'arena',
        'düello',
        'lonca savaşı',
        'guild war',
        'ranked',
        'turnuva',
        'battle'
      ],
      type: 'website'
    },

    community: {
      title: 'Topluluk - ANADOLU REALM | 100.000+ Oyuncu',
      description: 'Canlı Türk oyuncu topluluğu! Forum, Discord, rehberler, etkinlikler, turnuvalar, cosplay yarışmaları!',
      keywords: [
        'topluluk',
        'community',
        'Türk oyuncular',
        'forum',
        'Discord',
        'etkinlikler',
        'turnuva'
      ],
      type: 'website'
    },

    news: {
      title: 'Haberler - ANADOLU REALM | Güncel Gelişmeler',
      description: 'Son güncellemeler, yamalar, etkinlikler, duyurular ve oyun haberleri!',
      keywords: [
        'oyun haberleri',
        'güncellemeler',
        'patch notes',
        'etkinlikler',
        'duyurular',
        'news'
      ],
      type: 'website'
    },

    download: {
      title: 'İndir - ANADOLU REALM | PC, Mac, Mobil',
      description: 'ANADOLU REALM\'i ücretsiz indir! Windows, macOS, Linux, iOS ve Android desteği. Tarayıcıdan da oynayabilirsiniz!',
      keywords: [
        'oyun indir',
        'download',
        'PC oyun',
        'mobile game',
        'browser game',
        'ücretsiz indir'
      ],
      type: 'website'
    },

    support: {
      title: 'Destek - ANADOLU REALM | Yardım Merkezi',
      description: 'SSS, rehberler, hesap yönetimi, teknik destek. 7/24 canlı destek!',
      keywords: [
        'destek',
        'support',
        'SSS',
        'FAQ',
        'yardım',
        'help',
        'teknik destek'
      ],
      type: 'website'
    },

    about: {
      title: 'Hakkımızda - ANADOLU REALM | Türk Oyun Stüdyosu',
      description: 'AILYDIAN tarafından geliştirildi. Türk kültürünü dünyaya tanıtan AAA kalitesinde MMORPG!',
      keywords: [
        'hakkımızda',
        'about',
        'geliştirici',
        'Türk oyun stüdyosu',
        'AILYDIAN'
      ],
      type: 'website'
    },

    'animal-welfare': {
      title: 'Hayvan Dostları - ANADOLU REALM | Farkındalık Kampanyası',
      description: 'Oyunda hayvan dostlarımıza yardım et, gerçek dünyada da fark yarat! Barınak bağışları, bilgilendirme, farkındalık.',
      keywords: [
        'hayvan hakları',
        'hayvan refahı',
        'sokak hayvanları',
        'barınak',
        'bağış',
        'farkındalık'
      ],
      type: 'website'
    }
  };

  constructor() {
    this.initializeFavicons();
    this.initializeManifest();
  }

  /**
   * 🎨 Initialize all favicon sizes
   */
  private initializeFavicons(): void {
    const faviconSizes = [16, 32, 48, 64, 96, 128, 192, 256, 512];

    // Standard favicon
    this.addLinkTag('icon', `${this.FAVICON_BASE}/favicon.ico`, 'image/x-icon');

    // PNG favicons (multiple sizes)
    faviconSizes.forEach(size => {
      this.addLinkTag(
        'icon',
        `${this.FAVICON_BASE}/favicon-${size}x${size}.png`,
        'image/png',
        `${size}x${size}`
      );
    });

    // Apple Touch Icons
    [57, 60, 72, 76, 114, 120, 144, 152, 180].forEach(size => {
      this.addLinkTag(
        'apple-touch-icon',
        `${this.FAVICON_BASE}/apple-touch-icon-${size}x${size}.png`,
        undefined,
        `${size}x${size}`
      );
    });

    // Apple Touch Icon (default)
    this.addLinkTag(
      'apple-touch-icon',
      `${this.FAVICON_BASE}/apple-touch-icon.png`
    );

    // Android Chrome
    this.addLinkTag(
      'icon',
      `${this.FAVICON_BASE}/android-chrome-192x192.png`,
      'image/png',
      '192x192'
    );
    this.addLinkTag(
      'icon',
      `${this.FAVICON_BASE}/android-chrome-512x512.png`,
      'image/png',
      '512x512'
    );

    // Safari Pinned Tab
    this.addLinkTag(
      'mask-icon',
      `${this.FAVICON_BASE}/safari-pinned-tab.svg`,
      undefined,
      undefined,
      '#1e293b'
    );

    // Microsoft Tile
    this.addMetaTag('msapplication-TileColor', '#1e293b');
    this.addMetaTag('msapplication-TileImage', `${this.FAVICON_BASE}/mstile-144x144.png`);
    this.addMetaTag('msapplication-config', `${this.FAVICON_BASE}/browserconfig.xml`);

    // Theme color
    this.addMetaTag('theme-color', '#1e293b');
  }

  /**
   * 📱 Initialize Web App Manifest
   */
  private initializeManifest(): void {
    const manifest = {
      name: 'ANADOLU REALM - Türk MMORPG',
      short_name: 'ANADOLU',
      description: 'Osmanlı İmparatorluğu\'nda epik maceralara atıl!',
      start_url: '/',
      display: 'standalone',
      background_color: '#0f172a',
      theme_color: '#1e293b',
      orientation: 'any',
      icons: [
        {
          src: `${this.FAVICON_BASE}/android-chrome-192x192.png`,
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: `${this.FAVICON_BASE}/android-chrome-512x512.png`,
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ],
      categories: ['games', 'entertainment'],
      lang: 'tr-TR',
      dir: 'ltr',
      scope: '/',
      screenshots: [
        {
          src: `${this.BASE_URL}/screenshots/gameplay-1.jpg`,
          sizes: '1920x1080',
          type: 'image/jpeg'
        },
        {
          src: `${this.BASE_URL}/screenshots/gameplay-2.jpg`,
          sizes: '1920x1080',
          type: 'image/jpeg'
        }
      ]
    };

    // Add manifest link
    this.addLinkTag('manifest', '/manifest.json');

    // Store manifest for later use
    (window as any).__APP_MANIFEST__ = manifest;
  }

  /**
   * 🏷️ Set meta tags for a specific page
   */
  public setPageMeta(pageKey: string, customConfig?: Partial<PageMetaConfig>): void {
    const config = customConfig || this.PAGE_CONFIGS[pageKey];

    if (!config) {
      console.warn(`No meta configuration found for page: ${pageKey}`);
      return;
    }

    const url = customConfig?.url || `${this.BASE_URL}/${pageKey === 'home' ? '' : pageKey}`;
    const image = config.image || this.DEFAULT_IMAGE;

    // Basic meta tags
    document.title = config.title;
    this.addMetaTag('description', config.description);
    this.addMetaTag('keywords', config.keywords.join(', '));

    // Open Graph
    this.addMetaTag('og:title', config.title, 'property');
    this.addMetaTag('og:description', config.description, 'property');
    this.addMetaTag('og:type', config.type || 'website', 'property');
    this.addMetaTag('og:url', url, 'property');
    this.addMetaTag('og:image', image, 'property');
    this.addMetaTag('og:image:width', '1200', 'property');
    this.addMetaTag('og:image:height', '630', 'property');
    this.addMetaTag('og:image:alt', config.title, 'property');
    this.addMetaTag('og:locale', 'tr_TR', 'property');
    this.addMetaTag('og:site_name', 'ANADOLU REALM', 'property');

    // Twitter Card
    this.addMetaTag('twitter:card', 'summary_large_image');
    this.addMetaTag('twitter:title', config.title);
    this.addMetaTag('twitter:description', config.description);
    this.addMetaTag('twitter:image', image);
    this.addMetaTag('twitter:image:alt', config.title);
    this.addMetaTag('twitter:site', '@anadolurealm');
    this.addMetaTag('twitter:creator', '@anadolurealm');

    // Facebook
    this.addMetaTag('fb:app_id', '123456789', 'property');

    // Additional SEO
    this.addMetaTag('robots', 'index, follow, max-image-preview:large');
    this.addMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large');
    this.addMetaTag('bingbot', 'index, follow');

    // Canonical URL
    this.addLinkTag('canonical', url);

    // Language alternates
    this.addLinkTag('alternate', url, undefined, undefined, undefined, 'tr-TR');
    this.addLinkTag('alternate', `${this.BASE_URL}/en/${pageKey}`, undefined, undefined, undefined, 'en-US');

    // Author & Publisher
    this.addMetaTag('author', 'ANADOLU REALM Team');
    this.addLinkTag('publisher', 'https://ailydian.com');

    // Content type
    this.addMetaTag('content-type', 'text/html; charset=UTF-8', 'http-equiv');

    // Viewport (mobile optimization)
    this.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes');

    // Format detection
    this.addMetaTag('format-detection', 'telephone=no, date=no, address=no, email=no');

    // Apple Web App
    this.addMetaTag('apple-mobile-web-app-capable', 'yes');
    this.addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    this.addMetaTag('apple-mobile-web-app-title', 'ANADOLU REALM');

    // Microsoft
    this.addMetaTag('application-name', 'ANADOLU REALM');

    // Rating
    this.addMetaTag('rating', 'general');

    // Referrer policy
    this.addMetaTag('referrer', 'origin-when-cross-origin');
  }

  /**
   * 🏷️ Add meta tag to head
   */
  private addMetaTag(name: string, content: string, attribute: string = 'name'): void {
    let tag = document.querySelector(`meta[${attribute}="${name}"]`);

    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }

    tag.setAttribute('content', content);
  }

  /**
   * 🔗 Add link tag to head
   */
  private addLinkTag(
    rel: string,
    href: string,
    type?: string,
    sizes?: string,
    color?: string,
    hreflang?: string
  ): void {
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : sizes
      ? `link[rel="${rel}"][sizes="${sizes}"]`
      : `link[rel="${rel}"][href="${href}"]`;

    let link = document.querySelector(selector) as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }

    link.href = href;
    if (type) link.type = type;
    if (sizes) link.setAttribute('sizes', sizes);
    if (color) link.setAttribute('color', color);
    if (hreflang) link.setAttribute('hreflang', hreflang);
  }

  /**
   * 📊 Get all page configurations
   */
  public getPageConfigs(): Record<string, PageMetaConfig> {
    return { ...this.PAGE_CONFIGS };
  }

  /**
   * 📄 Get config for specific page
   */
  public getPageConfig(pageKey: string): PageMetaConfig | undefined {
    return this.PAGE_CONFIGS[pageKey];
  }

  /**
   * ➕ Add custom page config
   */
  public addPageConfig(pageKey: string, config: PageMetaConfig): void {
    this.PAGE_CONFIGS[pageKey] = config;
  }

  /**
   * 📱 Generate Web App Manifest JSON
   */
  public getManifestJSON(): string {
    const manifest = (window as any).__APP_MANIFEST__;
    return JSON.stringify(manifest, null, 2);
  }

  /**
   * 🤖 Generate Browserconfig XML (for IE/Edge)
   */
  public getBrowserConfigXML(): string {
    return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="${this.FAVICON_BASE}/mstile-70x70.png"/>
      <square150x150logo src="${this.FAVICON_BASE}/mstile-150x150.png"/>
      <square310x310logo src="${this.FAVICON_BASE}/mstile-310x310.png"/>
      <wide310x150logo src="${this.FAVICON_BASE}/mstile-310x150.png"/>
      <TileColor>#1e293b</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
  }
}

/**
 * 🌐 Global meta tags manager instance
 */
export const metaTagsManager = new MetaTagsManager();
