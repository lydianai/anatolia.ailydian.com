/**
 * SEO METADATA - ANADOLU REALM
 * Türkiye'ye özel premium SEO optimizasyonu
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogType: string;
  twitterCard: string;
  canonical: string;
}

const BASE_URL = 'https://anatolia.ailydian.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/default.jpg`;

export const SEO_METADATA: Record<string, PageMetadata> = {
  // Ana Sayfa
  home: {
    title: 'Anadolu Realm - Türk Dijital Metropol MMORPG Oyunu',
    description: 'İstanbul sokaklarında epik maceralara atıl! Türkiye\'nin ilk gerçek zamanlı MMORPG oyunu. Çay iç, simit sat, lonca kur, İstanbul\'u fethet. Ücretsiz oyna!',
    keywords: [
      'türk mmorpg',
      'istanbul oyunu',
      'türkiye online oyun',
      'anadolu realm',
      'türk rpg oyunu',
      'çevrimiçi rol yapma oyunu',
      'istanbul mmorpg',
      'türk kültürü oyunu',
      'multiplayer oyun türkiye',
      'free to play mmorpg'
    ],
    ogImage: `${BASE_URL}/og/home.jpg`,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: BASE_URL
  },

  // Karakterler
  characters: {
    title: 'Karakterler - 5 Türk Sınıfı | Anadolu Realm',
    description: 'İş Adamı, Yazılımcı, Tasarımcı, Pazarlamacı ve Tüccar! Her biri benzersiz yeteneklere sahip 5 Türk karakter sınıfı. Senin stilin hangisi?',
    keywords: [
      'karakter sınıfları',
      'türk karakterler',
      'iş adamı sınıfı',
      'yazılımcı karakter',
      'rpg sınıfları',
      'karakter seçimi',
      'oyun karakterleri'
    ],
    ogImage: `${BASE_URL}/og/characters.jpg`,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/characters`
  },

  // Karakter Oluşturma
  characterCreation: {
    title: 'Karakter Oluştur - İstanbul Macerana Başla | Anadolu Realm',
    description: 'Kendi Türk karakterini oluştur! 5 farklı sınıf, binlerce özelleştirme seçeneği. İstanbul Taksim Meydanı\'nda macera başlıyor!',
    keywords: [
      'karakter oluşturma',
      'avatar yaratma',
      'karakter özelleştirme',
      'oyuna başla',
      'türk karakteri yarat'
    ],
    ogImage: `${BASE_URL}/og/character-creation.jpg`,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/character-creation`
  },

  // Dünya
  world: {
    title: 'İstanbul Dünyası - Keşfedilecek 7 Bölge | Anadolu Realm',
    description: 'Taksim\'den Boğaz\'a, Kapalıçarşı\'dan Sultanahmet\'e... İstanbul\'un 7 tepesini keşfet, bölgeleri fethet, loncanı büyüt!',
    keywords: [
      'istanbul haritası',
      'oyun dünyası',
      'taksim meydanı',
      'kapalıçarşı',
      'boğaz turu',
      'sultanahmet',
      'istanbul keşfi',
      'oyun bölgeleri'
    ],
    ogImage: `${BASE_URL}/og/world.jpg`,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/world`
  },

  // Özellikler
  features: {
    title: 'Oyun Özellikleri - 50+ Benzersiz Sistem | Anadolu Realm',
    description: 'Günlük görevler, lonca sistemi, Türk ekonomisi, PvP arenası, çay evi, simit ticareti ve daha fazlası! Türk kültürü ile harmanlanmış premium MMORPG deneyimi.',
    keywords: [
      'oyun özellikleri',
      'mmorpg sistemleri',
      'lonca sistemi',
      'pvp arena',
      'trading sistem',
      'quest sistem',
      'türk kültürü',
      'çay evi',
      'ekonomi sistemi'
    ],
    ogImage: `${BASE_URL}/og/features.jpg`,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/features`
  },

  // Nasıl Oynanır
  howToPlay: {
    title: 'Nasıl Oynanır? - Başlangıç Rehberi | Anadolu Realm',
    description: 'Adım adım başlangıç rehberi: Karakter oluşturma, ilk görevler, çay içme, simit satma, lonca kurma. 5 dakikada öğren, saatlerce eğlen!',
    keywords: [
      'nasıl oynanır',
      'başlangıç rehberi',
      'oyun rehberi',
      'yeni başlayanlar',
      'tutorial',
      'oyun kılavuzu',
      'ipuçları'
    ],
    ogImage: `${BASE_URL}/og/how-to-play.jpg`,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/how-to-play`
  },

  // Topluluk
  community: {
    title: 'Topluluk - 50,000+ Aktif Oyuncu | Anadolu Realm',
    description: 'Türkiye\'nin en büyük MMORPG topluluğuna katıl! Discord, forum, etkinlikler, turnuvalar. En iyi loncaları keşfet, arkadaşlar edin!',
    keywords: [
      'oyun topluluğu',
      'discord sunucusu',
      'türk oyuncular',
      'mmorpg community',
      'oyun arkadaşları',
      'lonca arama',
      'etkinlikler',
      'turnuvalar'
    ],
    ogImage: `${BASE_URL}/og/community.jpg`,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/community`
  },

  // Hakkında
  about: {
    title: 'Hakkımızda - Türkiye\'nin İlk AAA MMORPG\'si | Anadolu Realm',
    description: 'Türk kültürünü dijital dünyada yaşatmak için yola çıktık. 50+ kişilik geliştirici ekibi, 2 yıllık geliştirme süreci, sınırsız tutku!',
    keywords: [
      'hakkımızda',
      'geliştirici ekibi',
      'oyun yapımı',
      'türk oyun',
      'indie game',
      'game development',
      'hikayemiz'
    ],
    ogImage: `${BASE_URL}/og/about.jpg`,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/about`
  },

  // Blog
  blog: {
    title: 'Blog - Güncellemeler ve Haberler | Anadolu Realm',
    description: 'Son güncellemeler, patch notları, geliştirici günlükleri, topluluk hikayeleri. MMORPG dünyasından son haberler!',
    keywords: [
      'oyun blogu',
      'güncellemeler',
      'patch notes',
      'haberler',
      'duyurular',
      'geliştirici günlüğü',
      'mmorpg haberleri'
    ],
    ogImage: `${BASE_URL}/og/blog.jpg`,
    ogType: 'blog',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/blog`
  },

  // İletişim
  contact: {
    title: 'İletişim - Bizimle İletişime Geç | Anadolu Realm',
    description: 'Sorularınız mı var? Önerilerinizi paylaşmak mı istiyorsunuz? 7/24 destek ekibimiz size yardımcı olmak için burada!',
    keywords: [
      'iletişim',
      'destek',
      'yardım',
      'feedback',
      'öneri',
      'support',
      'customer service'
    ],
    ogImage: `${BASE_URL}/og/contact.jpg`,
    ogType: 'article',
    twitterCard: 'summary',
    canonical: `${BASE_URL}/contact`
  },

  // SSS
  faq: {
    title: 'Sık Sorulan Sorular (SSS) - Tüm Cevaplar | Anadolu Realm',
    description: 'Oyun hakkında merak ettikleriniz: Nasıl başlarım? Ücretli mi? Sistem gereksinimleri nedir? Tüm sorularınızın cevapları burada!',
    keywords: [
      'sık sorulan sorular',
      'sss',
      'faq',
      'yardım',
      'sorular',
      'cevaplar',
      'oyun yardımı'
    ],
    ogImage: `${BASE_URL}/og/faq.jpg`,
    ogType: 'article',
    twitterCard: 'summary',
    canonical: `${BASE_URL}/faq`
  },

  // Giriş
  login: {
    title: 'Giriş Yap - Maceraya Devam Et | Anadolu Realm',
    description: 'Hesabına giriş yap ve İstanbul sokaklarındaki macerana kaldığın yerden devam et!',
    keywords: [
      'giriş yap',
      'login',
      'hesap girişi',
      'oyuna gir',
      'oturum aç'
    ],
    ogImage: `${BASE_URL}/og/login.jpg`,
    ogType: 'website',
    twitterCard: 'summary',
    canonical: `${BASE_URL}/auth/login`
  },

  // Kayıt
  register: {
    title: 'Kayıt Ol - Ücretsiz Hesap Oluştur | Anadolu Realm',
    description: 'Ücretsiz hesap oluştur ve Türkiye\'nin en büyük MMORPG oyununa katıl! Email onayı yok, anında oyna!',
    keywords: [
      'kayıt ol',
      'ücretsiz hesap',
      'sign up',
      'register',
      'yeni hesap',
      'üyelik'
    ],
    ogImage: `${BASE_URL}/og/register.jpg`,
    ogType: 'website',
    twitterCard: 'summary',
    canonical: `${BASE_URL}/auth/register`
  },

  // Oyun
  game: {
    title: 'Oyun - Canlı MMORPG Dünyası | Anadolu Realm',
    description: 'İstanbul\'da gerçek zamanlı multiplayer deneyim! Şu anda binlerce oyuncu online. Sen de aramıza katıl!',
    keywords: [
      'online oyun',
      'mmorpg gameplay',
      'canlı oyun',
      'multiplayer',
      'real-time game',
      'browser game'
    ],
    ogImage: `${BASE_URL}/og/game.jpg`,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/game`
  },

  // 3D Oyun
  game3d: {
    title: '3D Dünya - İstanbul\'u 3 Boyutta Keşfet | Anadolu Realm',
    description: 'Premium 3D grafikleri ile İstanbul sokaklarını keşfet! Gerçekçi karakterler, atmosferik ışıklandırma, muhteşem detaylar.',
    keywords: [
      '3d mmorpg',
      '3d oyun',
      'three.js',
      '3d istanbul',
      'gerçekçi grafikler',
      '3d world'
    ],
    ogImage: `${BASE_URL}/og/game-3d.jpg`,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/game-3d`
  },

  // Demo Animasyonlar
  demoAnimations: {
    title: 'Premium Animasyonlar - 150+ Efekt | Anadolu Realm',
    description: '150+ premium animasyon efekti ile oyun deneyimini bir üst seviyeye taşıyoruz. Butik animasyon stüdyosu kalitesinde!',
    keywords: [
      'oyun animasyonları',
      'framer motion',
      'premium effects',
      'ui animations',
      'game effects'
    ],
    ogImage: `${BASE_URL}/og/demo-animations.jpg`,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/demo-animations`
  },

  // Sprite Generator
  spriteGenerator: {
    title: 'Sprite Generator - Pixel Art Karakter Oluştur | Anadolu Realm',
    description: 'Kendi pixel art karakterini oluştur! Profesyonel sprite sheet generator ile 384 frame animasyonlu karakterler.',
    keywords: [
      'sprite generator',
      'pixel art',
      'character creator',
      'sprite sheet',
      'game assets'
    ],
    ogImage: `${BASE_URL}/og/sprite-generator.jpg`,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/sprite-generator`
  },

  // Gizlilik
  privacy: {
    title: 'Gizlilik Politikası - Verileriniz Güvende | Anadolu Realm',
    description: 'Kişisel verilerinizin korunması bizim önceliğimiz. KVKK uyumlu, şeffaf gizlilik politikamız.',
    keywords: [
      'gizlilik politikası',
      'kvkk',
      'veri koruma',
      'privacy policy',
      'gdpr'
    ],
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    twitterCard: 'summary',
    canonical: `${BASE_URL}/privacy`
  },

  // Kullanım Şartları
  terms: {
    title: 'Kullanım Şartları - Oyun Kuralları | Anadolu Realm',
    description: 'Anadolu Realm kullanım şartları ve topluluk kuralları. Adil oyun için hep birlikte!',
    keywords: [
      'kullanım şartları',
      'terms of service',
      'oyun kuralları',
      'tos',
      'user agreement'
    ],
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    twitterCard: 'summary',
    canonical: `${BASE_URL}/terms`
  }
};

/**
 * Sayfa için metadata getir
 */
export function getPageMetadata(page: string): PageMetadata {
  return SEO_METADATA[page] || SEO_METADATA.home;
}

/**
 * Dinamik metadata oluştur (Next.js 15)
 */
export function generateMetadata(page: string, customData?: Partial<PageMetadata>) {
  const meta = getPageMetadata(page);

  return {
    title: customData?.title || meta.title,
    description: customData?.description || meta.description,
    keywords: customData?.keywords || meta.keywords,
    authors: [{ name: 'Anadolu Realm Team' }],
    creator: 'Anadolu Realm',
    publisher: 'Anadolu Realm',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: meta.ogType as any,
      locale: 'tr_TR',
      url: customData?.canonical || meta.canonical,
      title: customData?.title || meta.title,
      description: customData?.description || meta.description,
      siteName: 'Anadolu Realm',
      images: [
        {
          url: customData?.ogImage || meta.ogImage,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: meta.twitterCard as any,
      title: customData?.title || meta.title,
      description: customData?.description || meta.description,
      images: [customData?.ogImage || meta.ogImage],
      creator: '@anadolurealm',
      site: '@anadolurealm',
    },
    alternates: {
      canonical: customData?.canonical || meta.canonical,
      languages: {
        'tr-TR': customData?.canonical || meta.canonical,
        'en-US': `${customData?.canonical || meta.canonical}?lang=en`,
      },
    },
    other: {
      'theme-color': '#dc2626',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
  };
}

/**
 * JSON-LD Schema (Structured Data)
 */
export function getStructuredData(page: string) {
  const meta = getPageMetadata(page);

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Anadolu Realm',
    description: meta.description,
    url: BASE_URL,
    image: meta.ogImage,
    genre: ['MMORPG', 'Role-Playing', 'Multiplayer', 'Turkish Culture'],
    gamePlatform: ['Web Browser', 'PC'],
    applicationCategory: 'Game',
    operatingSystem: 'Any (Browser-based)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency': 'TRY',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '15420',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'Anadolu Realm Team',
      url: BASE_URL,
    },
    inLanguage: 'tr-TR',
    datePublished: '2024-01-01',
    keywords: meta.keywords.join(', '),
  };

  // Sayfa tipine göre ek schema
  if (page === 'blog') {
    return {
      ...baseSchema,
      '@type': 'Blog',
      blogPost: [],
    };
  }

  if (page === 'faq') {
    return {
      ...baseSchema,
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name': 'Anadolu Realm ücretsiz mi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, Anadolu Realm tamamen ücretsizdir. Free-to-play modeliyle çalışır.',
          },
        },
      ],
    };
  }

  return baseSchema;
}
