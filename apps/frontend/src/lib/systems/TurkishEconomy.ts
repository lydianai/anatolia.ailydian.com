/**
 * TÜRK EKONOMİSİ VE TİCARET SİSTEMİ
 * EVE Online + Black Desert Online kalitesinde
 * Gerçekçi Türk Lirası ekonomisi, player-driven market
 */

export enum Currency {
  TL = 'TL', // Türk Lirası (in-game)
  GOLD = 'GOLD', // Altın (premium currency)
}

export enum ItemRarity {
  COMMON = 'common', // Sıradan
  UNCOMMON = 'uncommon', // Nadir
  RARE = 'rare', // Ender
  EPIC = 'epic', // Efsanevi
  LEGENDARY = 'legendary', // Efsane
  ARTIFACT = 'artifact', // Tarihi Eser
}

export enum ItemCategory {
  // Türk Yemekleri
  FOOD = 'food',
  DRINK = 'drink',
  TURKISH_DELIGHT = 'turkish_delight',

  // Geleneksel El Sanatları
  CARPET = 'carpet',
  CERAMIC = 'ceramic',
  JEWELRY = 'jewelry',
  CALLIGRAPHY = 'calligraphy',

  // Modern Ürünler
  TECHNOLOGY = 'technology',
  CLOTHING = 'clothing',
  FURNITURE = 'furniture',

  // Ticaret Malları
  SPICE = 'spice',
  FABRIC = 'fabric',
  METAL = 'metal',
  WOOD = 'wood',

  // Özel
  QUEST_ITEM = 'quest_item',
  MOUNT = 'mount',
  PET = 'pet',
  COSMETIC = 'cosmetic',
}

export interface MarketItem {
  id: string;
  name: string;
  nameTR: string;
  description: string;
  category: ItemCategory;
  rarity: ItemRarity;
  icon: string;

  // Fiyatlandırma
  basePrice: number; // TL cinsinden base price
  currentPrice: number; // Dinamik fiyat
  minPrice: number;
  maxPrice: number;

  // Arz-Talep
  supply: number; // Toplam arz
  demand: number; // Toplam talep
  stockLevel: number; // Mevcut stok

  // İstatistikler
  dailyVolume: number; // Günlük işlem hacmi
  weeklyVolume: number;
  priceHistory: Array<{
    timestamp: Date;
    price: number;
    volume: number;
  }>;

  // Stackable
  stackable: boolean;
  maxStack: number;

  // Özellikleri
  weight: number;
  tradeable: boolean;
  sellableToNPC: boolean;
  npcSellPrice?: number; // NPC satış fiyatı

  // Üretim
  craftable: boolean;
  craftingRecipe?: CraftingRecipe;

  // Bölge
  region?: string; // Hangi bölgede üretiliyor
  regional: boolean; // Bölgesel ürün mü?
}

export interface CraftingRecipe {
  id: string;
  name: string;
  category: ItemCategory;
  resultItemId: string;
  resultQuantity: number;

  materials: Array<{
    itemId: string;
    quantity: number;
  }>;

  requirements: {
    level?: number;
    skill?: string;
    profession?: string;
    location?: string;
  };

  craftTime: number; // Saniye
  successRate: number; // 0-100
  xpGain: number;
}

export interface AuctionListing {
  id: string;
  sellerId: string;
  sellerName: string;

  itemId: string;
  itemName: string;
  itemIcon: string;
  rarity: ItemRarity;

  quantity: number;
  pricePerUnit: number; // TL
  totalPrice: number;

  listedAt: Date;
  expiresAt: Date;

  status: 'active' | 'sold' | 'expired' | 'cancelled';
  buyerId?: string;
  buyerName?: string;
  soldAt?: Date;

  // Açık artırma
  isAuction: boolean;
  startingBid?: number;
  currentBid?: number;
  bidCount?: number;
  lastBidder?: string;
}

export interface PlayerShop {
  id: string;
  ownerId: string;
  ownerName: string;

  shopName: string;
  shopMotto: string;
  shopIcon: string;

  location: string; // Kapalıçarşı, Taksim, vb.

  items: Array<{
    itemId: string;
    quantity: number;
    price: number;
    discount?: number;
  }>;

  reputation: number; // 0-100
  totalSales: number;
  rating: number; // 1-5 stars
  reviews: number;

  openHours: {
    open: number; // 0-23
    close: number;
  };

  isOpen: boolean;
  featured: boolean; // Öne çıkan dükkan

  stats: {
    dailyVisitors: number;
    dailySales: number;
    weeklyRevenue: number;
  };
}

export interface TradeOffer {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;

  offeredItems: Array<{
    itemId: string;
    itemName: string;
    quantity: number;
    value: number; // TL değeri
  }>;

  offeredCurrency: {
    tl: number;
    gold: number;
  };

  requestedItems: Array<{
    itemId: string;
    itemName: string;
    quantity: number;
  }>;

  requestedCurrency: {
    tl: number;
    gold: number;
  };

  status: 'pending' | 'accepted' | 'declined' | 'cancelled' | 'expired';
  createdAt: Date;
  expiresAt: Date;

  message?: string;
}

export interface EconomyStats {
  totalTL: number; // Ekonomideki toplam TL
  circulatingTL: number; // Dolaşımdaki TL
  inflationRate: number; // Enflasyon oranı (%)

  avgItemPrice: number;
  dailyTradeVolume: number;
  activeListings: number;
  dailyTransactions: number;

  topTradedItems: Array<{
    itemId: string;
    itemName: string;
    volume: number;
    value: number;
  }>;

  wealthDistribution: {
    top1Percent: number;
    top10Percent: number;
    median: number;
  };

  regionalPrices: Record<string, {
    region: string;
    avgPrice: number;
    priceIndex: number;
  }>;
}

/**
 * TÜRK TİCARET SİSTEMİ
 */
export class TurkishEconomySystem {
  private items: Map<string, MarketItem> = new Map();
  private auctionListings: Map<string, AuctionListing> = new Map();
  private playerShops: Map<string, PlayerShop> = new Map();
  private tradeOffers: Map<string, TradeOffer> = new Map();
  private priceHistory: Map<string, Array<{ timestamp: Date; price: number }>> = new Map();

  private inflationRate: number = 2.5; // Yıllık %2.5 enflasyon
  private taxRate: number = 0.05; // %5 işlem vergisi

  constructor() {
    this.initializeMarketItems();
    this.startPriceUpdates();
    this.startInflationSystem();
  }

  /**
   * Market itemlarını başlat (Türk ürünleri)
   */
  private initializeMarketItems(): void {
    const turkishItems: MarketItem[] = [
      // YEMEKLER
      {
        id: 'simit',
        name: 'Fresh Simit',
        nameTR: 'Taze Simit',
        description: 'Sıcacık fırından çıkmış susam kaplı geleneksel Türk simidi',
        category: ItemCategory.FOOD,
        rarity: ItemRarity.COMMON,
        icon: '🥨',
        basePrice: 5,
        currentPrice: 5,
        minPrice: 3,
        maxPrice: 10,
        supply: 1000,
        demand: 800,
        stockLevel: 500,
        dailyVolume: 2000,
        weeklyVolume: 14000,
        priceHistory: [],
        stackable: true,
        maxStack: 99,
        weight: 0.2,
        tradeable: true,
        sellableToNPC: true,
        npcSellPrice: 3,
        craftable: true,
        craftingRecipe: {
          id: 'recipe-simit',
          name: 'Simit Yapımı',
          category: ItemCategory.FOOD,
          resultItemId: 'simit',
          resultQuantity: 10,
          materials: [
            { itemId: 'flour', quantity: 5 },
            { itemId: 'sesame', quantity: 2 },
            { itemId: 'water', quantity: 1 }
          ],
          requirements: {
            skill: 'Fırıncılık',
            level: 1,
            location: 'Fırın'
          },
          craftTime: 300, // 5 dakika
          successRate: 95,
          xpGain: 50
        },
        regional: true,
        region: 'Istanbul'
      },

      // ÇAYLAR
      {
        id: 'turkish-tea',
        name: 'Turkish Tea',
        nameTR: 'Türk Çayı',
        description: 'Geleneksel ince belli bardakta servis edilen koyu demleme çay',
        category: ItemCategory.DRINK,
        rarity: ItemRarity.COMMON,
        icon: '☕',
        basePrice: 10,
        currentPrice: 10,
        minPrice: 5,
        maxPrice: 20,
        supply: 5000,
        demand: 6000,
        stockLevel: 2000,
        dailyVolume: 10000,
        weeklyVolume: 70000,
        priceHistory: [],
        stackable: true,
        maxStack: 50,
        weight: 0.3,
        tradeable: true,
        sellableToNPC: true,
        npcSellPrice: 7,
        craftable: true,
        regional: false
      },

      // LOKUM
      {
        id: 'turkish-delight',
        name: 'Turkish Delight',
        nameTR: 'Lokum',
        description: 'Şekerleme ustalı tarafından el yapımı geleneksel Türk lokumu',
        category: ItemCategory.TURKISH_DELIGHT,
        rarity: ItemRarity.UNCOMMON,
        icon: '🍬',
        basePrice: 50,
        currentPrice: 50,
        minPrice: 30,
        maxPrice: 100,
        supply: 500,
        demand: 700,
        stockLevel: 200,
        dailyVolume: 1000,
        weeklyVolume: 7000,
        priceHistory: [],
        stackable: true,
        maxStack: 20,
        weight: 0.5,
        tradeable: true,
        sellableToNPC: true,
        npcSellPrice: 35,
        craftable: true,
        regional: true,
        region: 'Istanbul'
      },

      // HALILAR
      {
        id: 'silk-carpet-small',
        name: 'Small Silk Carpet',
        nameTR: 'Küçük İpek Halı',
        description: 'El dokuması geleneksel Türk halısı (60x90 cm)',
        category: ItemCategory.CARPET,
        rarity: ItemRarity.RARE,
        icon: '🧵',
        basePrice: 5000,
        currentPrice: 5000,
        minPrice: 3000,
        maxPrice: 10000,
        supply: 50,
        demand: 80,
        stockLevel: 20,
        dailyVolume: 10,
        weeklyVolume: 70,
        priceHistory: [],
        stackable: false,
        maxStack: 1,
        weight: 5,
        tradeable: true,
        sellableToNPC: true,
        npcSellPrice: 3500,
        craftable: true,
        craftingRecipe: {
          id: 'recipe-carpet',
          name: 'Halı Dokuma',
          category: ItemCategory.CARPET,
          resultItemId: 'silk-carpet-small',
          resultQuantity: 1,
          materials: [
            { itemId: 'silk-thread', quantity: 100 },
            { itemId: 'dye-red', quantity: 10 },
            { itemId: 'dye-blue', quantity: 10 }
          ],
          requirements: {
            skill: 'Dokumacılık',
            level: 50,
            location: 'Dokuma Tezgahı'
          },
          craftTime: 7200, // 2 saat
          successRate: 70,
          xpGain: 1000
        },
        regional: true,
        region: 'Bursa'
      },

      // KAHVE
      {
        id: 'turkish-coffee',
        name: 'Turkish Coffee',
        nameTR: 'Türk Kahvesi',
        description: 'Geleneksel yöntemle pişirilmiş köpüklü Türk kahvesi',
        category: ItemCategory.DRINK,
        rarity: ItemRarity.UNCOMMON,
        icon: '☕',
        basePrice: 25,
        currentPrice: 25,
        minPrice: 15,
        maxPrice: 50,
        supply: 1000,
        demand: 1200,
        stockLevel: 400,
        dailyVolume: 3000,
        weeklyVolume: 21000,
        priceHistory: [],
        stackable: true,
        maxStack: 50,
        weight: 0.4,
        tradeable: true,
        sellableToNPC: true,
        npcSellPrice: 18,
        craftable: true,
        regional: false
      },

      // BAKIR CEZVE
      {
        id: 'copper-cezve',
        name: 'Copper Coffee Pot',
        nameTR: 'Bakır Cezve',
        description: 'El işçiliği bakır cezve, kahve pişirmek için ideal',
        category: ItemCategory.CERAMIC,
        rarity: ItemRarity.RARE,
        icon: '🫖',
        basePrice: 500,
        currentPrice: 500,
        minPrice: 300,
        maxPrice: 1000,
        supply: 200,
        demand: 250,
        stockLevel: 100,
        dailyVolume: 50,
        weeklyVolume: 350,
        priceHistory: [],
        stackable: false,
        maxStack: 1,
        weight: 1.5,
        tradeable: true,
        sellableToNPC: true,
        npcSellPrice: 350,
        craftable: true,
        regional: true,
        region: 'Gaziantep'
      },

      // NAZARBONCUĞU
      {
        id: 'evil-eye-charm',
        name: 'Evil Eye Charm',
        nameTR: 'Nazar Boncuğu',
        description: 'Kötü gözden koruyan geleneksel Türk tılsımı',
        category: ItemCategory.JEWELRY,
        rarity: ItemRarity.COMMON,
        icon: '🧿',
        basePrice: 20,
        currentPrice: 20,
        minPrice: 10,
        maxPrice: 50,
        supply: 2000,
        demand: 1800,
        stockLevel: 800,
        dailyVolume: 500,
        weeklyVolume: 3500,
        priceHistory: [],
        stackable: true,
        maxStack: 99,
        weight: 0.1,
        tradeable: true,
        sellableToNPC: true,
        npcSellPrice: 12,
        craftable: true,
        regional: false
      }
    ];

    turkishItems.forEach(item => this.items.set(item.id, item));
    this.loadPriceHistory();
  }

  /**
   * Auction House'a ürün listele
   */
  listOnAuctionHouse(
    sellerId: string,
    sellerName: string,
    itemId: string,
    quantity: number,
    pricePerUnit: number,
    duration: number = 24, // 24 saat
    isAuction: boolean = false,
    startingBid?: number
  ): AuctionListing | null {
    const item = this.items.get(itemId);
    if (!item || !item.tradeable) return null;

    const now = new Date();
    const expiresAt = new Date(now.getTime() + duration * 60 * 60 * 1000);

    const listing: AuctionListing = {
      id: `auction-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sellerId,
      sellerName,
      itemId,
      itemName: item.nameTR,
      itemIcon: item.icon,
      rarity: item.rarity,
      quantity,
      pricePerUnit,
      totalPrice: pricePerUnit * quantity,
      listedAt: now,
      expiresAt,
      status: 'active',
      isAuction,
      startingBid: isAuction ? startingBid : undefined,
      currentBid: isAuction ? startingBid : undefined,
      bidCount: 0
    };

    this.auctionListings.set(listing.id, listing);

    // Arz artışı
    item.supply += quantity;
    this.updatePrice(item);

    this.saveState();
    return listing;
  }

  /**
   * Auction'dan satın al
   */
  buyFromAuction(listingId: string, buyerId: string, buyerName: string): boolean {
    const listing = this.auctionListings.get(listingId);
    if (!listing || listing.status !== 'active') return false;

    // Auction değilse direkt satın al
    if (!listing.isAuction) {
      listing.status = 'sold';
      listing.buyerId = buyerId;
      listing.buyerName = buyerName;
      listing.soldAt = new Date();

      // İstatistikleri güncelle
      const item = this.items.get(listing.itemId);
      if (item) {
        item.dailyVolume += listing.quantity;
        item.supply -= listing.quantity;
        item.demand += listing.quantity * 0.1; // Talep artışı

        // Fiyat geçmişi
        this.addPriceHistory(listing.itemId, listing.pricePerUnit);
        this.updatePrice(item);
      }

      this.saveState();
      return true;
    }

    return false;
  }

  /**
   * Bid yap (açık artırma)
   */
  placeBid(listingId: string, bidderId: string, bidderName: string, bidAmount: number): boolean {
    const listing = this.auctionListings.get(listingId);
    if (!listing || !listing.isAuction || listing.status !== 'active') return false;

    // Bid mevcut bid'den yüksek olmalı
    if (bidAmount <= (listing.currentBid || listing.startingBid || 0)) return false;

    listing.currentBid = bidAmount;
    listing.lastBidder = bidderId;
    listing.bidCount = (listing.bidCount || 0) + 1;

    this.saveState();
    return true;
  }

  /**
   * Player shop aç
   */
  openPlayerShop(
    ownerId: string,
    ownerName: string,
    shopName: string,
    location: string
  ): PlayerShop {
    const shop: PlayerShop = {
      id: `shop-${Date.now()}`,
      ownerId,
      ownerName,
      shopName,
      shopMotto: 'Kalite ve güven!',
      shopIcon: '🏪',
      location,
      items: [],
      reputation: 50,
      totalSales: 0,
      rating: 5,
      reviews: 0,
      openHours: {
        open: 9,
        close: 22
      },
      isOpen: true,
      featured: false,
      stats: {
        dailyVisitors: 0,
        dailySales: 0,
        weeklyRevenue: 0
      }
    };

    this.playerShops.set(shop.id, shop);
    this.saveState();
    return shop;
  }

  /**
   * Dinamik fiyat güncelle (arz-talep)
   */
  private updatePrice(item: MarketItem): void {
    // Basit arz-talep modeli
    const supplyDemandRatio = item.supply / Math.max(item.demand, 1);

    let priceMultiplier = 1.0;

    if (supplyDemandRatio > 1.5) {
      // Çok fazla arz, fiyat düşer
      priceMultiplier = 0.8;
    } else if (supplyDemandRatio > 1.2) {
      priceMultiplier = 0.9;
    } else if (supplyDemandRatio < 0.5) {
      // Çok fazla talep, fiyat yükselir
      priceMultiplier = 1.5;
    } else if (supplyDemandRatio < 0.8) {
      priceMultiplier = 1.2;
    }

    // Bölgesel fiyat farklılıkları
    if (item.regional && item.region) {
      priceMultiplier *= this.getRegionalPriceMultiplier(item.region);
    }

    // Yeni fiyat hesapla
    const newPrice = Math.floor(item.basePrice * priceMultiplier);
    item.currentPrice = Math.max(item.minPrice, Math.min(item.maxPrice, newPrice));
  }

  /**
   * Bölgesel fiyat çarpanı
   */
  private getRegionalPriceMultiplier(region: string): number {
    const multipliers: Record<string, number> = {
      'Istanbul': 1.2, // İstanbul daha pahalı
      'Ankara': 1.1,
      'Izmir': 1.0,
      'Bursa': 0.9,
      'Antalya': 1.15,
      'Trabzon': 0.85
    };
    return multipliers[region] || 1.0;
  }

  /**
   * Fiyat geçmişine ekle
   */
  private addPriceHistory(itemId: string, price: number): void {
    const item = this.items.get(itemId);
    if (!item) return;

    item.priceHistory.push({
      timestamp: new Date(),
      price,
      volume: 1
    });

    // Son 30 günü tut
    if (item.priceHistory.length > 30 * 24) {
      item.priceHistory = item.priceHistory.slice(-30 * 24);
    }
  }

  /**
   * Otomatik fiyat güncellemeleri
   */
  private startPriceUpdates(): void {
    // Her 1 saatte bir fiyatları güncelle
    setInterval(() => {
      this.items.forEach(item => {
        // Rastgele arz-talep değişimi
        item.demand += Math.random() * 100 - 50;
        item.demand = Math.max(0, item.demand);

        this.updatePrice(item);
      });

      this.saveState();
    }, 60 * 60 * 1000); // 1 saat
  }

  /**
   * Enflasyon sistemi
   */
  private startInflationSystem(): void {
    // Her hafta enflasyon uygula
    setInterval(() => {
      const weeklyInflation = this.inflationRate / 52; // Yıllık / 52 hafta

      this.items.forEach(item => {
        item.basePrice *= (1 + weeklyInflation / 100);
        item.minPrice *= (1 + weeklyInflation / 100);
        item.maxPrice *= (1 + weeklyInflation / 100);
        item.currentPrice *= (1 + weeklyInflation / 100);
      });

      console.log(`📈 Haftalık enflasyon uygulandı: %${weeklyInflation.toFixed(2)}`);
      this.saveState();
    }, 7 * 24 * 60 * 60 * 1000); // 1 hafta
  }

  /**
   * Ekonomi istatistikleri
   */
  getEconomyStats(): EconomyStats {
    const items = Array.from(this.items.values());
    const listings = Array.from(this.auctionListings.values());

    const totalTL = listings.reduce((sum, l) => sum + (l.totalPrice || 0), 0);
    const avgPrice = items.reduce((sum, i) => sum + i.currentPrice, 0) / items.length;
    const dailyVolume = items.reduce((sum, i) => sum + (i.dailyVolume * i.currentPrice), 0);

    // En çok işlem gören itemlar
    const topTraded = items
      .sort((a, b) => b.dailyVolume - a.dailyVolume)
      .slice(0, 10)
      .map(i => ({
        itemId: i.id,
        itemName: i.nameTR,
        volume: i.dailyVolume,
        value: i.dailyVolume * i.currentPrice
      }));

    return {
      totalTL,
      circulatingTL: totalTL * 0.8,
      inflationRate: this.inflationRate,
      avgItemPrice: avgPrice,
      dailyTradeVolume: dailyVolume,
      activeListings: listings.filter(l => l.status === 'active').length,
      dailyTransactions: listings.filter(l =>
        l.soldAt && l.soldAt.getTime() > Date.now() - 24 * 60 * 60 * 1000
      ).length,
      topTradedItems: topTraded,
      wealthDistribution: {
        top1Percent: totalTL * 0.4,
        top10Percent: totalTL * 0.7,
        median: avgPrice * 100
      },
      regionalPrices: {
        istanbul: { region: 'Istanbul', avgPrice: avgPrice * 1.2, priceIndex: 120 },
        ankara: { region: 'Ankara', avgPrice: avgPrice * 1.1, priceIndex: 110 },
        izmir: { region: 'Izmir', avgPrice: avgPrice, priceIndex: 100 }
      }
    };
  }

  /**
   * Save/Load
   */
  private saveState(): void {
    const state = {
      items: Array.from(this.items.entries()),
      listings: Array.from(this.auctionListings.entries()),
      shops: Array.from(this.playerShops.entries())
    };
    localStorage.setItem('turkish_economy', JSON.stringify(state));
  }

  private loadPriceHistory(): void {
    const saved = localStorage.getItem('turkish_economy');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.items) {
          this.items = new Map(state.items);
        }
      } catch (e) {
        console.error('Failed to load economy:', e);
      }
    }
  }
}

// Export singleton
export const turkishEconomy = new TurkishEconomySystem();
