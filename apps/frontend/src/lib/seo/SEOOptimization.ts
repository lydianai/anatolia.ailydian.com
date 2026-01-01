/**
 * 🔍 SEO OPTİMİZASYONU - ANADOLU REALM
 *
 * Türkiye odaklı kapsamlı SEO sistemi:
 * - Türkçe anahtar kelime optimizasyonu
 * - GEO targeting (Türkiye şehirleri)
 * - Dinamik meta tags
 * - Schema.org structured data
 * - Sitemap generation
 * - Robots.txt yönetimi
 * - Open Graph & Twitter Cards
 * - Breadcrumb navigation
 * - Canonical URLs
 * - Performance metrics (Core Web Vitals)
 *
 * @author AILYDIAN Orchestrator v4.0
 */

/**
 * Türkiye şehirleri (81 il)
 */
export const TURKEY_CITIES = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya',
  'Artvin', 'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu',
  'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır',
  'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun',
  'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir',
  'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya',
  'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş',
  'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop',
  'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
  'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale',
  'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük',
  'Kilis', 'Osmaniye', 'Düzce'
];

/**
 * Oyun odaklı anahtar kelimeler (Türkçe)
 */
export const TURKISH_KEYWORDS = {
  primary: [
    'MMORPG Türkiye',
    'Türk oyunu',
    'Osmanlı oyunu',
    'ANADOLU REALM',
    'online rol yapma oyunu',
    'multiplayer oyun',
    'ücretsiz MMORPG',
    'tarayıcı oyunu'
  ],
  secondary: [
    'online savaş oyunu',
    'strateji oyunu',
    'rol yapma oyunu',
    'çok oyunculu oyun',
    'Osmanlı savaşları',
    'Türk tarihi oyunu',
    'lonca sistemi',
    'guild wars',
    'PvP oyunu',
    'PvE oyunu'
  ],
  cultural: [
    'tavla oyunu',
    'okey oyunu',
    'batak oyunu',
    'Türk kültürü',
    'Osmanlı mimarisi',
    'İstanbul oyunu',
    'Anadolu kültürü',
    'geleneksel oyunlar'
  ],
  gameplay: [
    'karakter geliştirme',
    'zanaat sistemi',
    'ev sistemi',
    'ekonomi oyunu',
    'savaş sistemi',
    'görev sistemi',
    'beceri ağacı',
    'level atlama',
    'loot sistemi',
    'crafting sistemi'
  ],
  community: [
    'Türk oyuncu',
    'online topluluk',
    'guild kurma',
    'arkadaş bulma',
    'online sohbet',
    'takım oyunu',
    'sosyal oyun'
  ]
};

/**
 * Meta tag configuration
 */
export interface MetaTagConfig {
  title: string;
  description: string;
  keywords: string[];
  author?: string;
  robots?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

/**
 * Structured data types
 */
export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

/**
 * Sitemap URL entry
 */
export interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * 🔍 SEO Optimization System
 */
export class SEOOptimization {
  private currentMeta: MetaTagConfig;
  private structuredData: StructuredData[] = [];

  // Performance tracking
  private performanceMetrics = {
    LCP: 0,  // Largest Contentful Paint
    FID: 0,  // First Input Delay
    CLS: 0   // Cumulative Layout Shift
  };

  constructor() {
    this.currentMeta = this.getDefaultMeta();
    this.initializeStructuredData();
    this.trackCoreWebVitals();
  }

  /**
   * 📄 Default meta tags
   */
  private getDefaultMeta(): MetaTagConfig {
    return {
      title: 'ANADOLU REALM - Türk MMORPG Oyunu | Osmanlı Destanı',
      description: 'Türkiye\'nin en kapsamlı MMORPG oyunu! Osmanlı İmparatorluğu\'nda epik maceralara atıl. Ücretsiz oyna, lonca kur, savaş ve Anadolu topraklarını fethet!',
      keywords: [
        ...TURKISH_KEYWORDS.primary,
        ...TURKISH_KEYWORDS.secondary.slice(0, 5)
      ],
      author: 'ANADOLU REALM Team',
      robots: 'index, follow, max-image-preview:large',
      canonical: 'https://anatolia.ailydian.com',
      ogType: 'website',
      twitterCard: 'summary_large_image'
    };
  }

  /**
   * 📊 Initialize structured data (Schema.org)
   */
  private initializeStructuredData(): void {
    // VideoGame schema
    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      'name': 'ANADOLU REALM',
      'description': 'Türkiye\'nin en kapsamlı MMORPG oyunu. Osmanlı İmparatorluğu\'nda epik maceralara atıl.',
      'genre': ['MMORPG', 'Rol Yapma Oyunu', 'Strateji Oyunu'],
      'gamePlatform': ['Web Browser', 'PC', 'Mobile'],
      'operatingSystem': ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
      'applicationCategory': 'Game',
      'inLanguage': 'tr-TR',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'TRY',
        'availability': 'https://schema.org/InStock'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'ratingCount': '15000',
        'bestRating': '5',
        'worstRating': '1'
      },
      'author': {
        '@type': 'Organization',
        'name': 'ANADOLU REALM Team'
      },
      'datePublished': '2026-01-01',
      'countryOfOrigin': {
        '@type': 'Country',
        'name': 'Turkey'
      }
    });

    // Organization schema
    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'ANADOLU REALM',
      'url': 'https://anatolia.ailydian.com',
      'logo': 'https://anatolia.ailydian.com/logo.png',
      'description': 'Türkiye\'nin lider MMORPG oyun platformu',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'TR'
      },
      'sameAs': [
        'https://twitter.com/anadolurealm',
        'https://facebook.com/anadolurealm',
        'https://instagram.com/anadolurealm',
        'https://youtube.com/anadolurealm'
      ]
    });

    // WebSite schema with search
    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'ANADOLU REALM',
      'url': 'https://anatolia.ailydian.com',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://anatolia.ailydian.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    });

    // BreadcrumbList
    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Ana Sayfa',
          'item': 'https://anatolia.ailydian.com'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Oyun',
          'item': 'https://anatolia.ailydian.com/game'
        }
      ]
    });
  }

  /**
   * ➕ Add structured data
   */
  public addStructuredData(data: StructuredData): void {
    this.structuredData.push(data);
    this.updateStructuredDataInDOM();
  }

  /**
   * 🔄 Update structured data in DOM
   */
  private updateStructuredDataInDOM(): void {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add new structured data
    this.structuredData.forEach(data => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data, null, 2);
      document.head.appendChild(script);
    });
  }

  /**
   * 🏷️ Set meta tags for a page
   */
  public setMetaTags(config: Partial<MetaTagConfig>): void {
    this.currentMeta = { ...this.currentMeta, ...config };

    // Title
    document.title = this.currentMeta.title;

    // Description
    this.setMetaTag('description', this.currentMeta.description);

    // Keywords
    if (this.currentMeta.keywords.length > 0) {
      this.setMetaTag('keywords', this.currentMeta.keywords.join(', '));
    }

    // Author
    if (this.currentMeta.author) {
      this.setMetaTag('author', this.currentMeta.author);
    }

    // Robots
    if (this.currentMeta.robots) {
      this.setMetaTag('robots', this.currentMeta.robots);
    }

    // Canonical
    if (this.currentMeta.canonical) {
      this.setLinkTag('canonical', this.currentMeta.canonical);
    }

    // Open Graph
    this.setMetaTag('og:title', this.currentMeta.ogTitle || this.currentMeta.title, 'property');
    this.setMetaTag('og:description', this.currentMeta.ogDescription || this.currentMeta.description, 'property');
    this.setMetaTag('og:type', this.currentMeta.ogType || 'website', 'property');
    this.setMetaTag('og:url', this.currentMeta.canonical || window.location.href, 'property');
    this.setMetaTag('og:locale', 'tr_TR', 'property');
    this.setMetaTag('og:site_name', 'ANADOLU REALM', 'property');

    if (this.currentMeta.ogImage) {
      this.setMetaTag('og:image', this.currentMeta.ogImage, 'property');
      this.setMetaTag('og:image:width', '1200', 'property');
      this.setMetaTag('og:image:height', '630', 'property');
    }

    // Twitter Card
    this.setMetaTag('twitter:card', this.currentMeta.twitterCard || 'summary_large_image');
    this.setMetaTag('twitter:title', this.currentMeta.twitterTitle || this.currentMeta.title);
    this.setMetaTag('twitter:description', this.currentMeta.twitterDescription || this.currentMeta.description);

    if (this.currentMeta.twitterImage || this.currentMeta.ogImage) {
      this.setMetaTag('twitter:image', this.currentMeta.twitterImage || this.currentMeta.ogImage!);
    }

    // Additional meta tags
    this.setMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=5');
    this.setMetaTag('theme-color', '#1e293b');
    this.setMetaTag('format-detection', 'telephone=no');
  }

  /**
   * 🏷️ Set individual meta tag
   */
  private setMetaTag(name: string, content: string, attribute: string = 'name'): void {
    let tag = document.querySelector(`meta[${attribute}="${name}"]`);

    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }

    tag.setAttribute('content', content);
  }

  /**
   * 🔗 Set link tag
   */
  private setLinkTag(rel: string, href: string): void {
    let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }

    link.href = href;
  }

  /**
   * 🗺️ Generate sitemap
   */
  public generateSitemap(): string {
    const urls: SitemapURL[] = [
      {
        loc: 'https://anatolia.ailydian.com',
        changefreq: 'daily',
        priority: 1.0
      },
      {
        loc: 'https://anatolia.ailydian.com/game',
        changefreq: 'daily',
        priority: 0.9
      },
      {
        loc: 'https://anatolia.ailydian.com/features',
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: 'https://anatolia.ailydian.com/download',
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: 'https://anatolia.ailydian.com/community',
        changefreq: 'daily',
        priority: 0.7
      },
      {
        loc: 'https://anatolia.ailydian.com/news',
        changefreq: 'daily',
        priority: 0.7
      },
      {
        loc: 'https://anatolia.ailydian.com/support',
        changefreq: 'weekly',
        priority: 0.6
      },
      {
        loc: 'https://anatolia.ailydian.com/about',
        changefreq: 'monthly',
        priority: 0.5
      }
    ];

    // Add city-specific pages
    TURKEY_CITIES.forEach(city => {
      urls.push({
        loc: `https://anatolia.ailydian.com/regions/${city.toLowerCase().replace(/\s/g, '-')}`,
        changefreq: 'weekly',
        priority: 0.6
      });
    });

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;
      if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      if (url.changefreq) xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      if (url.priority !== undefined) xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    return xml;
  }

  /**
   * 🤖 Generate robots.txt
   */
  public generateRobotsTxt(): string {
    return `# ANADOLU REALM - Robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Sitemap
Sitemap: https://anatolia.ailydian.com/sitemap.xml

# Google Bot
User-agent: Googlebot
Allow: /

# Bing Bot
User-agent: Bingbot
Allow: /

# Yandex Bot (popular in Turkey)
User-agent: Yandex
Allow: /

# Crawl delay
Crawl-delay: 1
`;
  }

  /**
   * 📊 Track Core Web Vitals
   */
  private trackCoreWebVitals(): void {
    // LCP - Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.performanceMetrics.LCP = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID - First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.performanceMetrics.FID = entry.processingStart - entry.startTime;
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS - Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              this.performanceMetrics.CLS = clsValue;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Performance Observer not fully supported');
      }
    }
  }

  /**
   * 📊 Get performance metrics
   */
  public getPerformanceMetrics() {
    return {
      ...this.performanceMetrics,
      // Grade based on Google's thresholds
      grades: {
        LCP: this.performanceMetrics.LCP < 2500 ? 'good' : this.performanceMetrics.LCP < 4000 ? 'needs-improvement' : 'poor',
        FID: this.performanceMetrics.FID < 100 ? 'good' : this.performanceMetrics.FID < 300 ? 'needs-improvement' : 'poor',
        CLS: this.performanceMetrics.CLS < 0.1 ? 'good' : this.performanceMetrics.CLS < 0.25 ? 'needs-improvement' : 'poor'
      }
    };
  }

  /**
   * 🔍 Generate keyword-rich content
   */
  public generateSEOContent(pageType: 'home' | 'game' | 'features' | 'community'): string {
    const keywords = TURKISH_KEYWORDS;

    switch (pageType) {
      case 'home':
        return `ANADOLU REALM - Türkiye'nin En Kapsamlı MMORPG Oyunu! Ücretsiz online rol yapma oyunu olarak ${keywords.primary[0]} dünyasına adım atın. Osmanlı İmparatorluğu'nda epik maceralara katılın, lonca kurun ve Anadolu topraklarını fethedin!`;

      case 'game':
        return `${keywords.gameplay.join(', ')} ve daha fazlası! ANADOLU REALM'de ${keywords.secondary[0]} deneyimi yaşayın. Türk tarihi temalı ${keywords.primary[1]} ile dostlarınızla birlikte oynayın!`;

      case 'features':
        return `Oyun Özellikleri: ${keywords.cultural.join(', ')}. ${keywords.primary[4]} ile zenginleştirilmiş ${keywords.primary[3]} size eşsiz bir deneyim sunuyor!`;

      case 'community':
        return `${keywords.community.join(', ')} imkanları! ${keywords.primary[5]} olarak binlerce ${keywords.community[0]} ile tanışın!`;

      default:
        return '';
    }
  }

  /**
   * 🌍 GEO-specific meta tags
   */
  public setGEOTargeting(city?: string): void {
    this.setMetaTag('geo.region', 'TR');
    this.setMetaTag('geo.placename', city || 'Türkiye');

    if (city) {
      // City-specific meta
      this.setMetaTags({
        title: `ANADOLU REALM ${city} - Türk MMORPG | ${city}'de Oyna`,
        description: `${city}'de ANADOLU REALM oyna! ${city} bölgesinde binlerce oyuncu ile birlikte Osmanlı maceralarına katıl. Ücretsiz MMORPG.`,
        keywords: [
          ...TURKISH_KEYWORDS.primary,
          `${city} oyun`,
          `${city} MMORPG`,
          `${city} online oyun`
        ]
      });
    }
  }

  /**
   * 🧹 Cleanup
   */
  public dispose(): void {
    this.structuredData = [];
  }
}
