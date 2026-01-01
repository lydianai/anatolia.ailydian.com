/**
 * TURK DIJITAL METROPOL - MOCK DATA SYSTEM
 * Premium mock data for all pages
 */

// Turkish Names Generator
const turkishFirstNames = [
  'Ahmet', 'Mehmet', 'Ayse', 'Fatma', 'Zeynep', 'Ali', 'Veli', 'Hasan',
  'Huseyin', 'Mustafa', 'Elif', 'Yasemin', 'Cem', 'Can', 'Deniz', 'Berk',
  'Ege', 'Kaan', 'Arda', 'Emre', 'Burak', 'Baris', 'Selin', 'Ceren',
  'Merve', 'Ebru', 'Ozge', 'Tugce', 'Gizem', 'Busra', 'Kemal', 'Orhan',
  'Emine', 'Hatice', 'Murat', 'Serkan', 'Turgut', 'Osman', 'Esra', 'Derya'
];

const turkishLastNames = [
  'Yilmaz', 'Kaya', 'Demir', 'Sahin', 'Celik', 'Yildiz', 'Yildirim', 'Ozturk',
  'Aydin', 'Ozdemir', 'Arslan', 'Dogan', 'Kilic', 'Aslan', 'Cetin', 'Kara',
  'Koc', 'Kurt', 'Ozkan', 'Simsek', 'Akcay', 'Erdogan', 'Bayrak', 'Tas',
  'Gunay', 'Karaca', 'Acar', 'Polat', 'Tekin', 'Akbas', 'Guler', 'Bozkurt'
];

export function generateTurkishName(): { firstName: string; lastName: string; fullName: string } {
  const firstName = turkishFirstNames[Math.floor(Math.random() * turkishFirstNames.length)];
  const lastName = turkishLastNames[Math.floor(Math.random() * turkishLastNames.length)];
  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`
  };
}

// Character Classes
export const characterClasses = [
  {
    id: 'isadami',
    name: 'Is Adami',
    title: 'Entrepreneur',
    description: 'Ticaret ve liderlikte usta, Istanbul sokaklarinin patronu',
    sprite: '/sprites/characters/entrepreneur.png',
    stats: {
      liderlik: 9,
      ticaret: 10,
      ikna: 9,
      guc: 5,
      ceviklik: 6,
      dayaniklilik: 7,
      zeka: 8,
      karizma: 10
    },
    abilities: [
      {
        name: 'Pazarlik Ustasi',
        description: 'Tum alisverisilerde %20 indirim',
        icon: '💰',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Vizyon',
        description: 'Pasif gelir +50%',
        icon: '🎯',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Network',
        description: 'Arkadaslik XP bonusu +30%',
        icon: '🤝',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Buyuk Anlasmalar',
        description: 'Dev ticarette ekstra bonus',
        icon: '📊',
        cooldown: 300,
        type: 'active'
      }
    ],
    quotes: [
      'Her sey bir firsat!',
      'Risk almadan kazanc olmaz',
      'Istanbul\'un nabzi buradan atar',
      'Basari icin calisilir, beklenilmez'
    ],
    lore: 'Istanbul\'un carsisinda buyuyen, kucuk yastan beri ticaretin inceliklerini ogrenen bir usta. Sabah erkenden Misir Carsisi\'nda isini acip, gece gec saatlere kadar calisir. Herkesle arasi iyidir, cunku bilir ki network her seydir.',
    startingEquipment: ['Takım Elbise', 'Akıllı Telefon', 'Kartvizit Destesi', 'Evrak Çantası'],
    startingGold: 1000,
    playerCount: 12450
  },
  {
    id: 'yazilimci',
    name: 'Yazilimci',
    title: 'Developer',
    description: 'Kodun gucu ile dijital dunyanin mimarı',
    sprite: '/sprites/characters/developer.png',
    stats: {
      zeka: 10,
      teknoloji: 10,
      problemCozme: 9,
      guc: 4,
      ceviklik: 5,
      dayaniklilik: 6,
      ticaret: 7,
      karizma: 6
    },
    abilities: [
      {
        name: 'Debug Master',
        description: 'Hata bulma ve duzeltme +30%',
        icon: '🐛',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Code Sprint',
        description: 'Hizlanma +25% (1 dakika)',
        icon: '⚡',
        cooldown: 120,
        type: 'active'
      },
      {
        name: 'Open Source',
        description: 'Takim bonusu +15%',
        icon: '🌐',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'AI Assistant',
        description: 'Otomatik problem cozme',
        icon: '🤖',
        cooldown: 600,
        type: 'active'
      }
    ],
    quotes: [
      'console.log("Merhaba Dunya")',
      'It\'s not a bug, it\'s a feature',
      'Kahve + Kod = Mucize',
      'Git commit -m "feat: saved the day"'
    ],
    lore: 'Teknolojiyle buyuyen, klavyenin ustasi. Gece kodlayan, gunduz debug yapan modern kahraman. Stack Overflow\'un en aktif Turk uyesi. Startup\'larin kurtarıcısı.',
    startingEquipment: ['MacBook Pro', 'Mechanical Keyboard', 'Kahve Termosu', 'Hoodie'],
    startingGold: 800,
    playerCount: 15230
  },
  {
    id: 'tasarimci',
    name: 'Tasarimci',
    title: 'Designer',
    description: 'Estetigin ve yaraticilikgin ustasi',
    sprite: '/sprites/characters/designer.png',
    stats: {
      yaraticilik: 10,
      estetik: 10,
      inovasyon: 9,
      guc: 4,
      ceviklik: 6,
      dayaniklilik: 5,
      ticaret: 7,
      karizma: 8
    },
    abilities: [
      {
        name: 'Pixel Perfect',
        description: 'Crafting kalitesi +40%',
        icon: '🎨',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Color Theory',
        description: 'Renkli aura ve bonus itibar',
        icon: '🌈',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Design Thinking',
        description: 'Problem cozme +25%',
        icon: '💡',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Inspiration Burst',
        description: 'Hiz ve yaraticilik patlamasi',
        icon: '✨',
        cooldown: 180,
        type: 'active'
      }
    ],
    quotes: [
      'Details matter',
      'Less is more, but more is fun',
      'Tasarim bir yasam seklidir',
      'Her pixel bir hikaye anlatir'
    ],
    lore: 'Renklerin ve sekillerin dilini konusan sanatci. Figma\'dan Photoshop\'a, Illustrator\'dan Blender\'a her araci ustalıkla kullanan kreatif deha. Istanbul\'un en cool coffee shop\'larinda calisir.',
    startingEquipment: ['iPad Pro', 'Apple Pencil', 'Sketchbook', 'Pantone Kartları'],
    startingGold: 900,
    playerCount: 10890
  },
  {
    id: 'pazarlamaci',
    name: 'Pazarlamaci',
    title: 'Marketer',
    description: 'Viral iceriklerin yaraticisi, influencer\'ların ustasi',
    sprite: '/sprites/characters/marketer.png',
    stats: {
      karizma: 10,
      iletisim: 10,
      satis: 9,
      guc: 5,
      ceviklik: 7,
      dayaniklilik: 6,
      ticaret: 8,
      zeka: 8
    },
    abilities: [
      {
        name: 'Viral Content',
        description: 'Fame ve followers +50%',
        icon: '🚀',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'ROI Master',
        description: 'Gelir artisi +30%',
        icon: '💸',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Influencer Aura',
        description: 'Insanlari etkile ve cek',
        icon: '👑',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Campaign Launch',
        description: 'Mega pazarlama kampanyasi',
        icon: '📢',
        cooldown: 300,
        type: 'active'
      }
    ],
    quotes: [
      'Content is king!',
      'Engage, convert, retain',
      'Her sey bir story\'dir',
      'ROI > Her sey'
    ],
    lore: 'Sosyal medyanin krali, trend yaratici. Instagram, Twitter, LinkedIn\'de her yerde aktif. Sabah trend analizi, ogle kampanya, aksam networking. 100K+ follower sayisi.',
    startingEquipment: ['iPhone Pro', 'Ring Light', 'Tripod', 'Content Planner'],
    startingGold: 950,
    playerCount: 13670
  },
  {
    id: 'tuccar',
    name: 'Tuccar',
    title: 'Trader',
    description: 'Anadolu\'nun ticaret ustasi, kervan basi',
    sprite: '/sprites/characters/trader.png',
    stats: {
      ticaret: 10,
      ekonomi: 10,
      sabir: 9,
      guc: 6,
      ceviklik: 5,
      dayaniklilik: 8,
      karizma: 7,
      liderlik: 8
    },
    abilities: [
      {
        name: 'Market Guru',
        description: 'Fiyat tahmini ve analiz',
        icon: '📈',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Bulk Deal',
        description: 'Toplu alisveriste %20 bonus',
        icon: '📦',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Heritage',
        description: 'Pasif gelir sistemleri',
        icon: '🏛️',
        cooldown: 0,
        type: 'passive'
      },
      {
        name: 'Caravan Master',
        description: 'Dev ticaret konvoyu',
        icon: '🐪',
        cooldown: 400,
        type: 'active'
      }
    ],
    quotes: [
      'Al ucuzdan, sat pahaliya',
      'Piyasa benim evim',
      'Ticaret asirlardir kandadir',
      'Sabir ve strateji kazandirir'
    ],
    lore: 'Nesillerin biriktirdigi ticaret bilgisi ve deneyim. Buyuk babasinin babasinden ogrendigi sirlari modern ekonomiye uyarlayan usta. Kapalicarsinin derinliklerinden kripto paraya her seyi bilir.',
    startingEquipment: ['Ticaret Defteri', 'Tartı', 'Antika Kese', 'Mühür Yüzüğü'],
    startingGold: 1200,
    playerCount: 11540
  }
];

// Mock Users
export const mockUsers = Array.from({ length: 100 }, (_, i) => {
  const name = generateTurkishName();
  const classData = characterClasses[Math.floor(Math.random() * characterClasses.length)];

  return {
    id: `user-${i + 1}`,
    username: `${name.firstName.toLowerCase()}${Math.floor(Math.random() * 9999)}`,
    email: `${name.firstName.toLowerCase()}.${name.lastName.toLowerCase()}@example.com`,
    displayName: name.fullName,
    level: Math.floor(Math.random() * 100) + 1,
    experience: Math.floor(Math.random() * 1000000),
    characterClass: classData.id,
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: `/avatars/${classData.id}-${(i % 5) + 1}.png`,
    achievements: Math.floor(Math.random() * 50),
    gold: Math.floor(Math.random() * 100000),
    isOnline: Math.random() > 0.7
  };
});

// Leaderboard Data
export const leaderboardData = mockUsers
  .sort((a, b) => b.experience - a.experience)
  .slice(0, 100)
  .map((user, index) => ({
    rank: index + 1,
    ...user,
    previousRank: index + Math.floor(Math.random() * 5) - 2,
    weeklyXP: Math.floor(Math.random() * 50000)
  }));

// Team Members
export const teamMembers = [
  {
    id: 1,
    name: 'Demo Kullanici',
    role: 'Founder & CEO',
    avatar: '/team/ceo.jpg',
    bio: 'Serial entrepreneur ve game developer. 15+ yillik sektorel deneyim.',
    social: {
      twitter: '@demokullanici',
      linkedin: '/in/demokullanici',
      github: 'demokullanici'
    },
    quote: 'Oyun gelistirmek bir sanattir, biz de sanatci ruhluyuz.'
  },
  {
    id: 2,
    name: 'Ayse Kaya',
    role: 'Lead Developer',
    avatar: '/team/lead-dev.jpg',
    bio: 'Full-stack wizard. React, Node.js, PixiJS uzmani.',
    social: {
      twitter: '@aysekaya',
      linkedin: '/in/aysekaya',
      github: 'aysekaya'
    },
    quote: 'Temiz kod, mutlu takim!'
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    role: 'Art Director',
    avatar: '/team/art-director.jpg',
    bio: 'Pixel art ve 2D animation specialist. 10+ yil tasarim tecrubesi.',
    social: {
      twitter: '@mehmetdemir',
      linkedin: '/in/mehmetdemir',
      github: 'mehmetdemir'
    },
    quote: 'Her pixel bir hikaye anlatir.'
  },
  {
    id: 4,
    name: 'Zeynep Sahin',
    role: 'Game Designer',
    avatar: '/team/game-designer.jpg',
    bio: 'Gameplay mechanics ve level design uzmani.',
    social: {
      twitter: '@zeynepsahin',
      linkedin: '/in/zeynepsahin',
      github: 'zeynepsahin'
    },
    quote: 'Oyun tasarlamak bir dengedir - zorluk ve eglence.'
  },
  {
    id: 5,
    name: 'Can Ozturk',
    role: 'Backend Engineer',
    avatar: '/team/backend.jpg',
    bio: 'Node.js, MongoDB, Redis guru. Scalability expert.',
    social: {
      twitter: '@canozturk',
      linkedin: '/in/canozturk',
      github: 'canozturk'
    },
    quote: 'Performans her seydir!'
  },
  {
    id: 6,
    name: 'Elif Yildiz',
    role: 'Community Manager',
    avatar: '/team/community.jpg',
    bio: 'Topluluk yonetimi ve social media strategisti.',
    social: {
      twitter: '@elifyildiz',
      linkedin: '/in/elifyildiz',
      github: 'elifyildiz'
    },
    quote: 'Oyuncularimiz bizim en buyuk hazinemi'
  }
];

// Events Data
export const eventsData = [
  {
    id: 1,
    title: 'Ramazan Bayrami Festivali',
    description: 'Ozel gorevler, bonus XP ve benzersiz odulleer!',
    startDate: '2024-04-10T00:00:00',
    endDate: '2024-04-13T23:59:59',
    type: 'festival',
    rewards: ['Bayram Kostumu', '2x XP', '50000 Gold'],
    image: '/events/ramazan.jpg',
    participants: 8450
  },
  {
    id: 2,
    title: 'Guild Wars: Istanbul Savasi',
    description: 'Loncanla birlikte Istanbul\'un kontrolu icin savas!',
    startDate: '2024-05-01T00:00:00',
    endDate: '2024-05-07T23:59:59',
    type: 'pvp',
    rewards: ['Istanbul Bayragı', 'Legendary Weapon', '1M Gold'],
    image: '/events/guild-wars.jpg',
    participants: 15230
  },
  {
    id: 3,
    title: 'Yaz Karnavali',
    description: 'Mini oyunlar turnuvasi ve ozel etkinlikler!',
    startDate: '2024-06-21T00:00:00',
    endDate: '2024-06-23T23:59:59',
    type: 'carnival',
    rewards: ['Yaz Kostumu', 'Ozel Pet', '100000 Gold'],
    image: '/events/summer.jpg',
    participants: 12890
  },
  {
    id: 4,
    title: 'Cumhuriyet Bayrami Onuru',
    description: '29 Ekim ozel gorevleri ve kutlamalar!',
    startDate: '2024-10-29T00:00:00',
    endDate: '2024-10-31T23:59:59',
    type: 'national',
    rewards: ['Ataturk Portresi', 'Turk Bayragi', '29 Ekim Rozeti'],
    image: '/events/cumhuriyet.jpg',
    participants: 18650
  },
  {
    id: 5,
    title: 'Kis Senligi',
    description: 'Kar festivali, kayak yarislari ve sicak sahlep!',
    startDate: '2024-12-20T00:00:00',
    endDate: '2024-12-26T23:59:59',
    type: 'seasonal',
    rewards: ['Kis Elbisesi', 'Snowboard', '75000 Gold'],
    image: '/events/winter.jpg',
    participants: 10450
  }
];

// Blog Posts
export const blogPosts = [
  {
    id: 1,
    title: 'Turk Dijital Metropol Beta Surumu Yayinlandi!',
    slug: 'beta-surumu-yayinlandi',
    excerpt: 'Uzun beklenen beta surumumuz nihayet burada! Ilk 10.000 oyuncuya ozel bonuslar...',
    content: 'Lorem ipsum dolor sit amet...',
    author: teamMembers[0],
    publishDate: '2024-01-15T10:00:00',
    category: 'Duyuru',
    image: '/blog/beta-release.jpg',
    views: 15420,
    likes: 1250
  },
  {
    id: 2,
    title: 'Karakter Siniflarini Detayli Inceleme',
    slug: 'karakter-siniflari-inceleme',
    excerpt: '5 farkli Turk karakter sinifi ve ozellikleri hakkinda her sey...',
    content: 'Lorem ipsum dolor sit amet...',
    author: teamMembers[3],
    publishDate: '2024-01-20T14:30:00',
    category: 'Rehber',
    image: '/blog/characters.jpg',
    views: 12340,
    likes: 890
  },
  {
    id: 3,
    title: 'Istanbul Haritasi ve Bolgeler',
    slug: 'istanbul-haritasi-bolgeler',
    excerpt: 'Oyun icinde gezebileceginiz Istanbul bolgeleri ve ozel mekanlar...',
    content: 'Lorem ipsum dolor sit amet...',
    author: teamMembers[3],
    publishDate: '2024-01-25T09:15:00',
    category: 'Dunya',
    image: '/blog/map.jpg',
    views: 9870,
    likes: 670
  }
];

// Zones/Regions
export const zones = [
  {
    id: 'taksim',
    name: 'Taksim Meydani',
    city: 'Istanbul',
    description: 'Modernligin ve klasikligin bulustugu merkez nokta',
    levelRequirement: 1,
    playerCount: 2450,
    features: ['Spawn Point', 'Marketplace', 'Guild Hall', 'Quest Hub'],
    buildings: ['Kahvehane', 'Bakkal', 'Silah Dukkani', 'Eczane'],
    npcs: ['Taksimci Ahmet', 'Simidci Mehmet', 'Berber Ali'],
    miniGames: ['Tavla', 'Okey', 'Koz Oyunu'],
    image: '/zones/taksim.jpg',
    coordinates: { x: 41.0369, y: 28.9859 }
  },
  {
    id: 'kizilay',
    name: 'Kizilay Meydani',
    city: 'Ankara',
    description: 'Baskentin kalbi, siyaset ve ticaretin merkezi',
    levelRequirement: 10,
    playerCount: 1890,
    features: ['Trading Hub', 'Bank', 'Embassy', 'Auction House'],
    buildings: ['Buyukelcilik', 'Banka', 'Kafe', 'Kitapevi'],
    npcs: ['Diplomat Hasan', 'Banker Ayse', 'Kitapci Mehmet'],
    miniGames: ['Satranc', 'King', 'Poker'],
    image: '/zones/kizilay.jpg',
    coordinates: { x: 39.9199, y: 32.8543 }
  },
  {
    id: 'kordon',
    name: 'Kordon Sahili',
    city: 'Izmir',
    description: 'Deniz kokulu, huzurlu ticaret bolgesi',
    levelRequirement: 15,
    playerCount: 1650,
    features: ['Beach', 'Fishing', 'Restaurant', 'Harbor'],
    buildings: ['Balik Restoran', 'Sahil Kafe', 'Gemi Limani'],
    npcs: ['Balikci Cemal', 'Kaptan Hasan', 'Garson Ayhan'],
    miniGames: ['Balik Tutma', 'Yat Yarisi', 'Beach Voleybol'],
    image: '/zones/kordon.jpg',
    coordinates: { x: 38.4361, y: 27.1518 }
  },
  {
    id: 'kaleici',
    name: 'Antalya Kaleici',
    city: 'Antalya',
    description: 'Tarihi doku ve turizmin bulusma noktasi',
    levelRequirement: 20,
    playerCount: 1420,
    features: ['Tourist Spot', 'Museum', 'Hotel', 'Beach Access'],
    buildings: ['Otel', 'Muzee', 'Suvenir Dukkani', 'Restoran'],
    npcs: ['Rehber Mustafa', 'Otelier Fatma', 'Muzeci Zeynep'],
    miniGames: ['Dalış', 'Fotograf Cekme', 'Suvenir Toplama'],
    image: '/zones/antalya.jpg',
    coordinates: { x: 36.8853, y: 30.7056 }
  },
  {
    id: 'ulu-cami',
    name: 'Bursa Ulu Cami',
    city: 'Bursa',
    description: 'Tarihi carsi ve ipek yolu',
    levelRequirement: 25,
    playerCount: 980,
    features: ['Historical Site', 'Silk Market', 'Craft Guild'],
    buildings: ['Cami', 'Carsi', 'Ipekci Dukkani', 'Kervansaray'],
    npcs: ['Imam Hoca', 'Ipekci Haci', 'Carsici Bekir'],
    miniGames: ['Ipek Dokuma', 'Carsi Gezintisi'],
    image: '/zones/bursa.jpg',
    coordinates: { x: 40.1926, y: 29.0611 }
  },
  {
    id: 'trabzon-meydan',
    name: 'Trabzon Meydan Parki',
    city: 'Trabzon',
    description: 'Karadenizin incisi, hamsi ve cay kulturu',
    levelRequirement: 30,
    playerCount: 850,
    features: ['Tea Garden', 'Fish Market', 'Mountain Access'],
    buildings: ['Cay Bahcesi', 'Hamsi Dukkani', 'Firinlik', 'Kemence Evi'],
    npcs: ['Cayci Huseyin', 'Hamsici Ismail', 'Kemenceci Omer'],
    miniGames: ['Horon', 'Cay Servisi', 'Hamsi Yakalama'],
    image: '/zones/trabzon.jpg',
    coordinates: { x: 41.0027, y: 39.7168 }
  },
  {
    id: 'mevlana',
    name: 'Konya Mevlana Meydani',
    city: 'Konya',
    description: 'Huzur ve manevi atmosfer',
    levelRequirement: 35,
    playerCount: 720,
    features: ['Spiritual Center', 'Meditation', 'Sema Ceremony'],
    buildings: ['Turbe', 'Medrese', 'Kutuphanee', 'Tekke'],
    npcs: ['Dervis Suleyman', 'Aliim Hoca', 'Kutuphaneci Emine'],
    miniGames: ['Sema', 'Kaligraffi', 'Meditation'],
    image: '/zones/konya.jpg',
    coordinates: { x: 37.8667, y: 32.4833 }
  }
];

// Achievements
export const achievements = [
  { id: 1, name: 'Ilk Adim', description: 'Oyuna ilk giris yap', icon: '👣', rarity: 'common', points: 10 },
  { id: 2, name: 'Seviye 10', description: '10. seviyeye ulas', icon: '⭐', rarity: 'common', points: 20 },
  { id: 3, name: 'Zengin Olma Yolunda', description: '10,000 gold biriktir', icon: '💰', rarity: 'uncommon', points: 30 },
  { id: 4, name: 'Sosyal Kelebek', description: '50 arkadas edin', icon: '🦋', rarity: 'uncommon', points: 40 },
  { id: 5, name: 'Lonca Kurucusu', description: 'Bir lonca kur', icon: '🏰', rarity: 'rare', points: 50 },
  { id: 6, name: 'PvP Savascisi', description: '100 PvP galibiyeti', icon: '⚔️', rarity: 'rare', points: 75 },
  { id: 7, name: 'Quest Master', description: 'Tum ana gorevleri tamamla', icon: '📜', rarity: 'epic', points: 100 },
  { id: 8, name: 'Efsane Oyuncu', description: 'Seviye 100\'e ulas', icon: '👑', rarity: 'legendary', points: 200 },
];

export default {
  characterClasses,
  mockUsers,
  leaderboardData,
  teamMembers,
  eventsData,
  blogPosts,
  zones,
  achievements,
  generateTurkishName
};
