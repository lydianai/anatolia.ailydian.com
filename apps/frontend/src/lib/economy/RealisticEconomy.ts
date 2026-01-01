/**
 * ANADOLU REALM - Realistic Economy System
 * Supply & Demand, Inflation, Dynamic Pricing, Player Businesses
 * AI-Powered by AILYDIAN Orchestrator
 */

export interface Item {
  id: string;
  name: string;
  basePrice: number;
  currentPrice: number;
  supply: number;
  demand: number;
  category: ItemCategory;
  region: string;
}

export enum ItemCategory {
  FOOD = 'food',
  DRINK = 'drink',
  CLOTHING = 'clothing',
  TOOLS = 'tools',
  FURNITURE = 'furniture',
  LUXURY = 'luxury',
  RAW_MATERIAL = 'raw_material'
}

export interface Transaction {
  timestamp: number;
  itemId: string;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
  playerId: string;
  region: string;
}

export interface PlayerBusiness {
  id: string;
  ownerId: string;
  type: BusinessType;
  name: string;
  location: string;

  // Finansal
  investment: number;
  balance: number;
  dailyCost: number;
  dailyRevenue: number;
  profit: number;

  // İşletme
  inventory: Map<string, number>;
  employees: number;
  reputation: number; // 0-100
  level: number;

  // Müşteri
  customers: string[];
  customerSatisfaction: number; // 0-100
}

export enum BusinessType {
  BAKKAL = 'bakkal',
  KAHVEHANE = 'kahvehane',
  RESTORAN = 'restoran',
  BERBER = 'berber',
  ESNAF = 'esnaf',
  MARKET = 'market'
}

export class RealisticEconomy {
  private items: Map<string, Item> = new Map();
  private transactions: Transaction[] = [];
  private businesses: Map<string, PlayerBusiness> = new Map();

  // Economic indicators
  private inflationRate: number = 0.02; // 2% annual
  private daysSinceLaunch: number = 0;
  private globalEconomyHealth: number = 1.0; // 0.5-1.5 multiplier

  // Transaction history (for price calculation)
  private readonly TRANSACTION_HISTORY_DURATION = 3600 * 1000; // 1 hour

  constructor() {
    this.initializeItems();
    this.startEconomicCycle();

    console.log('💰 Realistic Economy System initialized');
  }

  private initializeItems(): void {
    // Turkish food & drinks
    this.addItem({ id: 'simit', name: 'Simit', basePrice: 5, category: ItemCategory.FOOD, region: 'all' });
    this.addItem({ id: 'cay', name: 'Çay', basePrice: 3, category: ItemCategory.DRINK, region: 'all' });
    this.addItem({ id: 'su', name: 'Su', basePrice: 2, category: ItemCategory.DRINK, region: 'all' });
    this.addItem({ id: 'lahmacun', name: 'Lahmacun', basePrice: 25, category: ItemCategory.FOOD, region: 'all' });
    this.addItem({ id: 'doner', name: 'Döner', basePrice: 30, category: ItemCategory.FOOD, region: 'all' });
    this.addItem({ id: 'baklava', name: 'Baklava', basePrice: 50, category: ItemCategory.FOOD, region: 'all' });

    console.log(`📦 ${this.items.size} items initialized`);
  }

  private addItem(config: {
    id: string;
    name: string;
    basePrice: number;
    category: ItemCategory;
    region: string;
  }): void {
    this.items.set(config.id, {
      ...config,
      currentPrice: config.basePrice,
      supply: 1000,
      demand: 1000
    });
  }

  
  // DYNAMIC PRICING (Supply & Demand)
  

  calculatePrice(itemId: string, region: string): number {
    const item = this.items.get(itemId);
    if (!item) return 0;

    // Base price
    let price = item.basePrice;

    // 1. Supply & Demand ratio
    const supplyDemandRatio = item.demand / Math.max(1, item.supply);
    const sdMultiplier = Math.pow(supplyDemandRatio, 0.5); // Square root for softer curve
    price *= sdMultiplier;

    // 2. Inflation
    const inflationMultiplier = Math.pow(1 + this.inflationRate, this.daysSinceLaunch / 365);
    price *= inflationMultiplier;

    // 3. Seasonal variation
    const seasonalMultiplier = this.getSeasonalMultiplier(item);
    price *= seasonalMultiplier;

    // 4. Regional variation
    const regionalMultiplier = this.getRegionalMultiplier(item, region);
    price *= regionalMultiplier;

    // 5. Global economy health
    price *= this.globalEconomyHealth;

    // Update current price
    item.currentPrice = Math.round(price * 100) / 100;

    return item.currentPrice;
  }

  private getSeasonalMultiplier(item: Item): number {
    const month = new Date().getMonth();

    // Summer drinks more expensive
    if (item.category === ItemCategory.DRINK && (month >= 5 && month <= 8)) {
      return 1.2;
    }

    // Winter food more expensive
    if (item.category === ItemCategory.FOOD && (month >= 11 || month <= 2)) {
      return 1.15;
    }

    return 1.0;
  }

  private getRegionalMultiplier(item: Item, region: string): number {
    // Tourist areas more expensive
    const touristAreas = ['sultanahmet', 'taksim', 'besiktas'];
    if (touristAreas.includes(region.toLowerCase())) {
      return 1.3;
    }

    // Local neighborhoods cheaper
    const localAreas = ['fatih', 'bagcilar', 'esenyurt'];
    if (localAreas.includes(region.toLowerCase())) {
      return 0.9;
    }

    return 1.0;
  }

  
  // TRANSACTION PROCESSING
  

  processPurchase(
    playerId: string,
    itemId: string,
    quantity: number,
    region: string
  ): { success: boolean; totalCost: number; message: string } {
    const item = this.items.get(itemId);
    if (!item) {
      return { success: false, totalCost: 0, message: 'Item not found' };
    }

    // Check supply
    if (item.supply < quantity) {
      return { success: false, totalCost: 0, message: 'Insufficient supply' };
    }

    // Calculate cost
    const price = this.calculatePrice(itemId, region);
    const totalCost = price * quantity;

    // Record transaction
    const transaction: Transaction = {
      timestamp: Date.now(),
      itemId,
      quantity,
      price,
      type: 'buy',
      playerId,
      region
    };

    this.transactions.push(transaction);

    // Update supply & demand
    item.supply -= quantity;
    item.demand += 1;

    console.log(`💵 Purchase: ${quantity}x ${item.name} for ${totalCost} TL`);

    return { success: true, totalCost, message: 'Purchase successful' };
  }

  processSale(
    playerId: string,
    itemId: string,
    quantity: number,
    region: string
  ): { success: boolean; totalRevenue: number; message: string } {
    const item = this.items.get(itemId);
    if (!item) {
      return { success: false, totalRevenue: 0, message: 'Item not found' };
    }

    // Calculate revenue
    const price = this.calculatePrice(itemId, region);
    const totalRevenue = price * quantity;

    // Record transaction
    const transaction: Transaction = {
      timestamp: Date.now(),
      itemId,
      quantity,
      price,
      type: 'sell',
      playerId,
      region
    };

    this.transactions.push(transaction);

    // Update supply & demand
    item.supply += quantity;
    item.demand -= 1;

    console.log(`💰 Sale: ${quantity}x ${item.name} for ${totalRevenue} TL`);

    return { success: true, totalRevenue, message: 'Sale successful' };
  }

  
  // MARKET UPDATE (Every hour)
  

  private startEconomicCycle(): void {
    // Update market every hour
    setInterval(() => {
      this.updateMarket();
    }, 3600 * 1000); // 1 hour

    // Daily cycle
    setInterval(() => {
      this.dailyCycle();
    }, 24 * 3600 * 1000); // 1 day
  }

  private updateMarket(): void {
    const now = Date.now();

    this.items.forEach((item) => {
      // Get recent transactions
      const recentTransactions = this.transactions.filter(
        (t) => t.itemId === item.id && now - t.timestamp < this.TRANSACTION_HISTORY_DURATION
      );

      // Count buys vs sells
      const buys = recentTransactions.filter((t) => t.type === 'buy').length;
      const sells = recentTransactions.filter((t) => t.type === 'sell').length;

      // Adjust supply & demand based on activity
      if (buys > sells) {
        item.demand += buys - sells;
        item.supply = Math.max(100, item.supply - (buys - sells) * 10);
      } else if (sells > buys) {
        item.demand = Math.max(100, item.demand - (sells - buys));
        item.supply += (sells - buys) * 10;
      }

      // Natural supply regeneration (production)
      item.supply += Math.floor(item.supply * 0.05); // 5% growth

      // Natural demand decay
      item.demand = Math.max(100, item.demand - Math.floor(item.demand * 0.02)); // 2% decay

      // Recalculate price
      this.calculatePrice(item.id, 'default');
    });

    console.log('📊 Market updated');
  }

  private dailyCycle(): void {
    this.daysSinceLaunch++;

    // Update inflation
    this.inflationRate = 0.02 + (Math.random() - 0.5) * 0.01; // 1.5-2.5%

    // Update global economy health
    this.globalEconomyHealth += (Math.random() - 0.5) * 0.1;
    this.globalEconomyHealth = Math.max(0.5, Math.min(1.5, this.globalEconomyHealth));

    // Update all businesses
    this.businesses.forEach((business) => {
      this.updateBusiness(business);
    });

    console.log(`📅 Day ${this.daysSinceLaunch}: Inflation ${(this.inflationRate * 100).toFixed(2)}%, Economy ${(this.globalEconomyHealth * 100).toFixed(0)}%`);
  }

  
  // PLAYER BUSINESSES
  

  createBusiness(
    ownerId: string,
    type: BusinessType,
    name: string,
    location: string
  ): PlayerBusiness {
    const businessConfigs = {
      [BusinessType.BAKKAL]: {
        investment: 100000,
        dailyCost: 500,
        employees: 2
      },
      [BusinessType.KAHVEHANE]: {
        investment: 250000,
        dailyCost: 1000,
        employees: 3
      },
      [BusinessType.RESTORAN]: {
        investment: 500000,
        dailyCost: 2500,
        employees: 8
      },
      [BusinessType.BERBER]: {
        investment: 50000,
        dailyCost: 300,
        employees: 1
      },
      [BusinessType.ESNAF]: {
        investment: 150000,
        dailyCost: 700,
        employees: 2
      },
      [BusinessType.MARKET]: {
        investment: 1000000,
        dailyCost: 5000,
        employees: 15
      }
    };

    const config = businessConfigs[type];

    const business: PlayerBusiness = {
      id: `business_${Date.now()}`,
      ownerId,
      type,
      name,
      location,
      investment: config.investment,
      balance: 0,
      dailyCost: config.dailyCost,
      dailyRevenue: 0,
      profit: 0,
      inventory: new Map(),
      employees: config.employees,
      reputation: 50,
      level: 1,
      customers: [],
      customerSatisfaction: 50
    };

    this.businesses.set(business.id, business);

    console.log(`🏪 New business: ${name} (${type})`);

    return business;
  }

  private updateBusiness(business: PlayerBusiness): void {
    // Calculate daily revenue (based on reputation, location, etc.)
    const baseRevenue = business.type === BusinessType.MARKET ? 10000 :
                       business.type === BusinessType.RESTORAN ? 5000 :
                       business.type === BusinessType.KAHVEHANE ? 2000 : 1000;

    const reputationMultiplier = business.reputation / 50; // 0-2x
    const levelMultiplier = 1 + (business.level * 0.1);

    business.dailyRevenue = baseRevenue * reputationMultiplier * levelMultiplier;

    // Subtract daily costs
    business.balance += business.dailyRevenue - business.dailyCost;
    business.profit = business.dailyRevenue - business.dailyCost;

    // Update reputation (customer satisfaction affects it)
    if (business.customerSatisfaction > 70) {
      business.reputation = Math.min(100, business.reputation + 1);
    } else if (business.customerSatisfaction < 30) {
      business.reputation = Math.max(0, business.reputation - 1);
    }

    console.log(`🏪 ${business.name}: Revenue ${business.dailyRevenue} TL, Profit ${business.profit} TL`);
  }

  
  // GETTERS
  

  getItem(itemId: string): Item | undefined {
    return this.items.get(itemId);
  }

  getAllItems(): Item[] {
    return Array.from(this.items.values());
  }

  getBusiness(businessId: string): PlayerBusiness | undefined {
    return this.businesses.get(businessId);
  }

  getPlayerBusinesses(playerId: string): PlayerBusiness[] {
    return Array.from(this.businesses.values()).filter(
      (b) => b.ownerId === playerId
    );
  }

  getInflationRate(): number {
    return this.inflationRate;
  }

  getEconomyHealth(): number {
    return this.globalEconomyHealth;
  }
}

export default RealisticEconomy;
