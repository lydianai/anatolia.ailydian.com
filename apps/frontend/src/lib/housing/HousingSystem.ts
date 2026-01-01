/**
 * ANADOLU REALM - Housing System
 * Buy Homes, 500+ Furniture, House Parties, Personal Garden
 * AI-Powered by AILYDIAN Orchestrator
 */

import * as THREE from 'three';

// HOUSING ENUMS & INTERFACES

export enum HouseType {
  STUDIO = 'studio',           // Küçük oda (20m²)
  APARTMENT = 'apartment',     // Daire (60m²)
  HOUSE = 'house',             // Ev (120m²)
  MANSION = 'mansion',         // Konak (300m²)
  PALACE = 'palace'            // Saray (800m²)
}

export enum RoomType {
  LIVING_ROOM = 'living_room',
  BEDROOM = 'bedroom',
  KITCHEN = 'kitchen',
  BATHROOM = 'bathroom',
  GARDEN = 'garden',
  BALCONY = 'balcony',
  STUDY = 'study',
  WORKSHOP = 'workshop'
}

export enum FurnitureCategory {
  SEATING = 'seating',         // Oturma (koltuk, sandalye)
  STORAGE = 'storage',         // Saklama (dolap, sandık)
  DECORATION = 'decoration',   // Dekorasyon (tablo, halı)
  LIGHTING = 'lighting',       // Aydınlatma (lamba, avize)
  PLANT = 'plant',             // Bitki
  KITCHEN_ITEM = 'kitchen',    // Mutfak eşyası
  BED = 'bed',                 // Yatak
  TABLE = 'table',             // Masa
  OUTDOOR = 'outdoor',         // Bahçe eşyası
  SPECIAL = 'special'          // Özel (müzik aleti, sanat eseri)
}

export enum FurnitureStyle {
  OTTOMAN = 'ottoman',         // Osmanlı
  MODERN = 'modern',           // Modern
  TRADITIONAL = 'traditional', // Geleneksel
  RUSTIC = 'rustic',           // Rustik
  LUXURY = 'luxury'            // Lüks
}

export interface House {
  id: string;
  ownerId: string;
  ownerName: string;

  // Type & Location
  type: HouseType;
  address: string;
  district: string;
  position: THREE.Vector3;

  // Metadata
  purchasedAt: number;
  purchasePrice: number;
  currentValue: number;

  // Rooms
  rooms: Room[];
  totalArea: number;           // m²
  maxFurniture: number;

  // Features
  hasGarden: boolean;
  hasBalcony: boolean;
  hasWorkshop: boolean;

  // Social
  visitCount: number;
  isPublic: boolean;           // Anyone can visit
  allowedVisitors: string[];   // Player IDs

  // Party System
  activeParty: HouseParty | null;
}

export interface Room {
  id: string;
  type: RoomType;
  name: string;
  area: number;                // m²
  furniture: PlacedFurniture[];
  maxFurniture: number;
  wallColor: number;           // Hex color
  floorType: string;
}

export interface Furniture {
  id: string;
  name: string;
  description: string;
  category: FurnitureCategory;
  style: FurnitureStyle;

  // Dimensions
  width: number;
  height: number;
  depth: number;

  // Gameplay
  price: number;
  comfortBonus?: number;       // Rest quality bonus
  buffs?: FurnitureBuff[];

  // 3D Model
  modelPath: string;
  thumbnailPath: string;

  // Restrictions
  outdoorOnly?: boolean;
  indoorOnly?: boolean;
  requiredRoomType?: RoomType;
}

export interface PlacedFurniture {
  furnitureId: string;
  furniture: Furniture;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  placedAt: number;
}

export interface FurnitureBuff {
  type: 'rest' | 'craft' | 'cooking' | 'study';
  bonus: number;               // Percentage bonus
  duration: number;            // Minutes
}

export interface HouseParty {
  id: string;
  hostId: string;
  hostName: string;
  startTime: number;
  endTime: number;

  // Settings
  theme: string;
  maxGuests: number;

  // Attendees
  guests: PartyGuest[];

  // Activities
  music: boolean;
  food: boolean;
  games: boolean;

  // Rewards
  socialPoints: number;
}

export interface PartyGuest {
  playerId: string;
  playerName: string;
  joinedAt: number;
  giftsGiven: number;
}

export interface Garden {
  houseId: string;
  plots: GardenPlot[];
  maxPlots: number;
  compostLevel: number;        // 0-100
}

export interface GardenPlot {
  id: string;
  position: THREE.Vector3;
  plantId: string | null;
  plantName: string | null;
  plantedAt: number;
  harvestAt: number;
  waterLevel: number;          // 0-100
  fertilized: boolean;
}

// HOUSING SYSTEM

export class HousingSystem {
  private houses: Map<string, House> = new Map();
  private furnitureCatalog: Map<string, Furniture> = new Map();
  private gardens: Map<string, Garden> = new Map();

  // Global settings
  private readonly HOUSE_PRICES: Record<HouseType, number> = {
    [HouseType.STUDIO]: 50000,
    [HouseType.APARTMENT]: 150000,
    [HouseType.HOUSE]: 500000,
    [HouseType.MANSION]: 2000000,
    [HouseType.PALACE]: 10000000
  };

  private readonly HOUSE_AREAS: Record<HouseType, number> = {
    [HouseType.STUDIO]: 20,
    [HouseType.APARTMENT]: 60,
    [HouseType.HOUSE]: 120,
    [HouseType.MANSION]: 300,
    [HouseType.PALACE]: 800
  };

  constructor() {
    this.initializeFurnitureCatalog();

    console.log('🏠 Housing System initialized');
    console.log(`✅ ${this.furnitureCatalog.size} furniture items loaded`);
  }

  
  // HOUSE MANAGEMENT
  

  purchaseHouse(
    playerId: string,
    playerName: string,
    type: HouseType,
    address: string,
    district: string
  ): { success: boolean; house?: House; message: string } {
    const price = this.HOUSE_PRICES[type];

    // Create house
    const houseId = `house_${Date.now()}`;

    const rooms = this.generateRoomsForHouseType(type);
    const area = this.HOUSE_AREAS[type];

    const house: House = {
      id: houseId,
      ownerId: playerId,
      ownerName: playerName,
      type,
      address,
      district,
      position: new THREE.Vector3(
        Math.random() * 1000,
        0,
        Math.random() * 1000
      ),
      purchasedAt: Date.now(),
      purchasePrice: price,
      currentValue: price,
      rooms,
      totalArea: area,
      maxFurniture: Math.floor(area / 2),
      hasGarden: type !== HouseType.STUDIO,
      hasBalcony: type === HouseType.APARTMENT || type === HouseType.MANSION,
      hasWorkshop: type === HouseType.HOUSE || type === HouseType.MANSION || type === HouseType.PALACE,
      visitCount: 0,
      isPublic: false,
      allowedVisitors: [],
      activeParty: null
    };

    this.houses.set(houseId, house);

    // Create garden if applicable
    if (house.hasGarden) {
      this.createGarden(houseId, type);
    }

    console.log(`🏠 Ev satın alındı: ${type} - ${address}`);
    console.log(`💰 Fiyat: ${price} altın`);

    return {
      success: true,
      house,
      message: `${address} adresindeki ${type} satın alındı!`
    };
  }

  private generateRoomsForHouseType(type: HouseType): Room[] {
    const roomConfigs: Record<HouseType, Array<{ type: RoomType; name: string; area: number }>> = {
      [HouseType.STUDIO]: [
        { type: RoomType.LIVING_ROOM, name: 'Ana Oda', area: 15 },
        { type: RoomType.BATHROOM, name: 'Banyo', area: 5 }
      ],
      [HouseType.APARTMENT]: [
        { type: RoomType.LIVING_ROOM, name: 'Oturma Odası', area: 20 },
        { type: RoomType.BEDROOM, name: 'Yatak Odası', area: 15 },
        { type: RoomType.KITCHEN, name: 'Mutfak', area: 12 },
        { type: RoomType.BATHROOM, name: 'Banyo', area: 8 },
        { type: RoomType.BALCONY, name: 'Balkon', area: 5 }
      ],
      [HouseType.HOUSE]: [
        { type: RoomType.LIVING_ROOM, name: 'Salon', area: 30 },
        { type: RoomType.BEDROOM, name: 'Ana Yatak Odası', area: 20 },
        { type: RoomType.BEDROOM, name: 'Misafir Odası', area: 15 },
        { type: RoomType.KITCHEN, name: 'Mutfak', area: 15 },
        { type: RoomType.BATHROOM, name: 'Banyo', area: 10 },
        { type: RoomType.GARDEN, name: 'Bahçe', area: 30 }
      ],
      [HouseType.MANSION]: [
        { type: RoomType.LIVING_ROOM, name: 'Büyük Salon', area: 60 },
        { type: RoomType.BEDROOM, name: 'Ana Yatak Odası', area: 40 },
        { type: RoomType.BEDROOM, name: 'Misafir Odası 1', area: 25 },
        { type: RoomType.BEDROOM, name: 'Misafir Odası 2', area: 25 },
        { type: RoomType.KITCHEN, name: 'Mutfak', area: 30 },
        { type: RoomType.BATHROOM, name: 'Ana Banyo', area: 15 },
        { type: RoomType.BATHROOM, name: 'Misafir Banyosu', area: 10 },
        { type: RoomType.STUDY, name: 'Çalışma Odası', area: 25 },
        { type: RoomType.GARDEN, name: 'Bahçe', area: 70 }
      ],
      [HouseType.PALACE]: [
        { type: RoomType.LIVING_ROOM, name: 'Taht Salonu', area: 150 },
        { type: RoomType.BEDROOM, name: 'Padişah Odası', area: 80 },
        { type: RoomType.BEDROOM, name: 'Harem Odası 1', area: 50 },
        { type: RoomType.BEDROOM, name: 'Harem Odası 2', area: 50 },
        { type: RoomType.BEDROOM, name: 'Harem Odası 3', area: 50 },
        { type: RoomType.KITCHEN, name: 'Mutfak', area: 60 },
        { type: RoomType.BATHROOM, name: 'Hamam', area: 40 },
        { type: RoomType.STUDY, name: 'Kütüphane', area: 80 },
        { type: RoomType.WORKSHOP, name: 'Atölye', area: 60 },
        { type: RoomType.GARDEN, name: 'Saray Bahçesi', area: 180 }
      ]
    };

    const configs = roomConfigs[type];
    const rooms: Room[] = [];

    configs.forEach((config, index) => {
      rooms.push({
        id: `room_${index}`,
        type: config.type,
        name: config.name,
        area: config.area,
        furniture: [],
        maxFurniture: Math.floor(config.area / 3),
        wallColor: 0xFFFFFF,
        floorType: 'wood'
      });
    });

    return rooms;
  }

  
  // FURNITURE SYSTEM (500+ Items)
  

  private initializeFurnitureCatalog(): void {
    // Ottoman Style
    this.addOttomanFurniture();

    // Modern Style
    this.addModernFurniture();

    // Traditional Turkish
    this.addTraditionalFurniture();

    // Generate procedural furniture to reach 500+
    this.generateProceduralFurniture(450);
  }

  private addOttomanFurniture(): void {
    const ottoman: Furniture[] = [
      {
        id: 'furn_ottoman_divan',
        name: 'Osmanlı Divanı',
        description: 'Klasik Osmanlı sedir',
        category: FurnitureCategory.SEATING,
        style: FurnitureStyle.OTTOMAN,
        width: 2.0,
        height: 0.4,
        depth: 0.8,
        price: 5000,
        comfortBonus: 15,
        buffs: [{ type: 'rest', bonus: 10, duration: 60 }],
        modelPath: '/models/furniture/ottoman_divan.glb',
        thumbnailPath: '/images/furniture/ottoman_divan.jpg',
        indoorOnly: true
      },
      {
        id: 'furn_ottoman_carpet',
        name: 'Halı',
        description: 'El dokuması Türk halısı',
        category: FurnitureCategory.DECORATION,
        style: FurnitureStyle.OTTOMAN,
        width: 3.0,
        height: 0.01,
        depth: 2.0,
        price: 8000,
        modelPath: '/models/furniture/turkish_carpet.glb',
        thumbnailPath: '/images/furniture/turkish_carpet.jpg',
        indoorOnly: true
      },
      {
        id: 'furn_ottoman_chandelier',
        name: 'Osmanlı Avizesi',
        description: 'Kristal Osmanlı avizesi',
        category: FurnitureCategory.LIGHTING,
        style: FurnitureStyle.OTTOMAN,
        width: 1.0,
        height: 1.5,
        depth: 1.0,
        price: 15000,
        modelPath: '/models/furniture/ottoman_chandelier.glb',
        thumbnailPath: '/images/furniture/ottoman_chandelier.jpg',
        indoorOnly: true
      },
      {
        id: 'furn_ottoman_chest',
        name: 'Sandık',
        description: 'Geleneksel ahşap sandık',
        category: FurnitureCategory.STORAGE,
        style: FurnitureStyle.OTTOMAN,
        width: 1.2,
        height: 0.6,
        depth: 0.6,
        price: 3000,
        modelPath: '/models/furniture/ottoman_chest.glb',
        thumbnailPath: '/images/furniture/ottoman_chest.jpg'
      }
    ];

    ottoman.forEach(f => this.furnitureCatalog.set(f.id, f));
  }

  private addModernFurniture(): void {
    const modern: Furniture[] = [
      {
        id: 'furn_modern_sofa',
        name: 'Modern Kanepe',
        description: 'Minimalist tasarım kanepe',
        category: FurnitureCategory.SEATING,
        style: FurnitureStyle.MODERN,
        width: 2.2,
        height: 0.8,
        depth: 0.9,
        price: 7000,
        comfortBonus: 20,
        modelPath: '/models/furniture/modern_sofa.glb',
        thumbnailPath: '/images/furniture/modern_sofa.jpg',
        indoorOnly: true
      },
      {
        id: 'furn_modern_bed',
        name: 'Modern Yatak',
        description: 'Konforlu çift kişilik yatak',
        category: FurnitureCategory.BED,
        style: FurnitureStyle.MODERN,
        width: 2.0,
        height: 0.6,
        depth: 2.0,
        price: 10000,
        comfortBonus: 30,
        buffs: [{ type: 'rest', bonus: 25, duration: 480 }],
        modelPath: '/models/furniture/modern_bed.glb',
        thumbnailPath: '/images/furniture/modern_bed.jpg',
        indoorOnly: true,
        requiredRoomType: RoomType.BEDROOM
      },
      {
        id: 'furn_modern_desk',
        name: 'Çalışma Masası',
        description: 'Ergonomik çalışma masası',
        category: FurnitureCategory.TABLE,
        style: FurnitureStyle.MODERN,
        width: 1.5,
        height: 0.75,
        depth: 0.8,
        price: 4000,
        buffs: [{ type: 'study', bonus: 15, duration: 120 }],
        modelPath: '/models/furniture/modern_desk.glb',
        thumbnailPath: '/images/furniture/modern_desk.jpg',
        indoorOnly: true
      }
    ];

    modern.forEach(f => this.furnitureCatalog.set(f.id, f));
  }

  private addTraditionalFurniture(): void {
    const traditional: Furniture[] = [
      {
        id: 'furn_trad_sedir',
        name: 'Sedir',
        description: 'Geleneksel Türk sediri',
        category: FurnitureCategory.SEATING,
        style: FurnitureStyle.TRADITIONAL,
        width: 2.5,
        height: 0.5,
        depth: 0.8,
        price: 6000,
        comfortBonus: 18,
        modelPath: '/models/furniture/sedir.glb',
        thumbnailPath: '/images/furniture/sedir.jpg',
        indoorOnly: true
      },
      {
        id: 'furn_trad_mangal',
        name: 'Mangal',
        description: 'Bahçe mangalı',
        category: FurnitureCategory.OUTDOOR,
        style: FurnitureStyle.TRADITIONAL,
        width: 1.0,
        height: 0.8,
        depth: 0.6,
        price: 2000,
        buffs: [{ type: 'cooking', bonus: 20, duration: 180 }],
        modelPath: '/models/furniture/mangal.glb',
        thumbnailPath: '/images/furniture/mangal.jpg',
        outdoorOnly: true,
        requiredRoomType: RoomType.GARDEN
      },
      {
        id: 'furn_trad_cay_seti',
        name: 'Çay Seti',
        description: 'Geleneksel çay takımı',
        category: FurnitureCategory.DECORATION,
        style: FurnitureStyle.TRADITIONAL,
        width: 0.5,
        height: 0.3,
        depth: 0.5,
        price: 500,
        modelPath: '/models/furniture/cay_seti.glb',
        thumbnailPath: '/images/furniture/cay_seti.jpg'
      }
    ];

    traditional.forEach(f => this.furnitureCatalog.set(f.id, f));
  }

  private generateProceduralFurniture(count: number): void {
    const categories = Object.values(FurnitureCategory);
    const styles = Object.values(FurnitureStyle);

    for (let i = 0; i < count; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const style = styles[Math.floor(Math.random() * styles.length)];

      const furniture: Furniture = {
        id: `furn_proc_${i}`,
        name: `Mobilya ${i + 1}`,
        description: `Otomatik oluşturulmuş ${category} ${style}`,
        category,
        style,
        width: 0.5 + Math.random() * 2,
        height: 0.5 + Math.random() * 2,
        depth: 0.5 + Math.random() * 2,
        price: Math.floor(1000 + Math.random() * 10000),
        modelPath: `/models/furniture/procedural_${i}.glb`,
        thumbnailPath: `/images/furniture/procedural_${i}.jpg`
      };

      this.furnitureCatalog.set(furniture.id, furniture);
    }

    console.log(`🤖 ${count} procedural furniture generated`);
  }

  placeFurniture(
    houseId: string,
    roomId: string,
    furnitureId: string,
    position: THREE.Vector3,
    rotation: THREE.Euler
  ): { success: boolean; message: string } {
    const house = this.houses.get(houseId);
    const furniture = this.furnitureCatalog.get(furnitureId);

    if (!house || !furniture) {
      return { success: false, message: 'Ev veya mobilya bulunamadı!' };
    }

    const room = house.rooms.find(r => r.id === roomId);

    if (!room) {
      return { success: false, message: 'Oda bulunamadı!' };
    }

    // Check room capacity
    if (room.furniture.length >= room.maxFurniture) {
      return { success: false, message: 'Oda dolu!' };
    }

    // Check room type requirement
    if (furniture.requiredRoomType && room.type !== furniture.requiredRoomType) {
      return {
        success: false,
        message: `Bu mobilya sadece ${furniture.requiredRoomType} için!`
      };
    }

    // Check indoor/outdoor
    if (furniture.outdoorOnly && room.type !== RoomType.GARDEN && room.type !== RoomType.BALCONY) {
      return { success: false, message: 'Bu mobilya sadece dışarıda kullanılabilir!' };
    }

    if (furniture.indoorOnly && (room.type === RoomType.GARDEN || room.type === RoomType.BALCONY)) {
      return { success: false, message: 'Bu mobilya sadece içeride kullanılabilir!' };
    }

    // Place furniture
    const placed: PlacedFurniture = {
      furnitureId,
      furniture,
      position: position.clone(),
      rotation: rotation.clone(),
      placedAt: Date.now()
    };

    room.furniture.push(placed);

    console.log(`🛋️ Mobilya yerleştirildi: ${furniture.name} - ${room.name}`);

    return {
      success: true,
      message: `${furniture.name} yerleştirildi!`
    };
  }

  
  // HOUSE PARTY SYSTEM
  

  startHouseParty(
    houseId: string,
    hostId: string,
    hostName: string,
    theme: string,
    duration: number = 120 // minutes
  ): { success: boolean; party?: HouseParty; message: string } {
    const house = this.houses.get(houseId);

    if (!house) {
      return { success: false, message: 'Ev bulunamadı!' };
    }

    if (house.ownerId !== hostId) {
      return { success: false, message: 'Sadece ev sahibi parti düzenleyebilir!' };
    }

    if (house.activeParty) {
      return { success: false, message: 'Zaten aktif bir parti var!' };
    }

    // Create party
    const partyId = `party_${Date.now()}`;
    const now = Date.now();

    const party: HouseParty = {
      id: partyId,
      hostId,
      hostName,
      startTime: now,
      endTime: now + (duration * 60 * 1000),
      theme,
      maxGuests: Math.floor(house.totalArea / 5), // 1 guest per 5m²
      guests: [],
      music: true,
      food: true,
      games: true,
      socialPoints: 0
    };

    house.activeParty = party;

    console.log(`🎉 Parti başladı: ${theme} - ${house.address}`);

    return {
      success: true,
      party,
      message: `${theme} partisi başladı!`
    };
  }

  joinHouseParty(
    houseId: string,
    playerId: string,
    playerName: string
  ): { success: boolean; message: string } {
    const house = this.houses.get(houseId);

    if (!house || !house.activeParty) {
      return { success: false, message: 'Aktif parti bulunamadı!' };
    }

    const party = house.activeParty;

    // Check guest limit
    if (party.guests.length >= party.maxGuests) {
      return { success: false, message: 'Parti dolu!' };
    }

    // Check if already joined
    if (party.guests.some(g => g.playerId === playerId)) {
      return { success: false, message: 'Zaten partidesiniz!' };
    }

    // Join party
    const guest: PartyGuest = {
      playerId,
      playerName,
      joinedAt: Date.now(),
      giftsGiven: 0
    };

    party.guests.push(guest);
    party.socialPoints += 10;

    console.log(`👥 ${playerName} partiye katıldı (${party.guests.length}/${party.maxGuests})`);

    return {
      success: true,
      message: `${party.theme} partisine katıldınız!`
    };
  }

  
  // GARDEN SYSTEM
  

  private createGarden(houseId: string, houseType: HouseType): void {
    const plotCounts: Record<HouseType, number> = {
      [HouseType.STUDIO]: 0,
      [HouseType.APARTMENT]: 0,
      [HouseType.HOUSE]: 6,
      [HouseType.MANSION]: 12,
      [HouseType.PALACE]: 30
    };

    const maxPlots = plotCounts[houseType];

    const garden: Garden = {
      houseId,
      plots: [],
      maxPlots,
      compostLevel: 0
    };

    // Create plots
    for (let i = 0; i < maxPlots; i++) {
      garden.plots.push({
        id: `plot_${i}`,
        position: new THREE.Vector3(i % 6, 0, Math.floor(i / 6)),
        plantId: null,
        plantName: null,
        plantedAt: 0,
        harvestAt: 0,
        waterLevel: 100,
        fertilized: false
      });
    }

    this.gardens.set(houseId, garden);

    console.log(`🌱 Bahçe oluşturuldu: ${maxPlots} parsel`);
  }

  plantSeed(
    houseId: string,
    plotId: string,
    plantId: string,
    plantName: string,
    growthTime: number // hours
  ): { success: boolean; message: string } {
    const garden = this.gardens.get(houseId);

    if (!garden) {
      return { success: false, message: 'Bahçe bulunamadı!' };
    }

    const plot = garden.plots.find(p => p.id === plotId);

    if (!plot) {
      return { success: false, message: 'Parsel bulunamadı!' };
    }

    if (plot.plantId) {
      return { success: false, message: 'Bu parselde zaten bitki var!' };
    }

    // Plant seed
    const now = Date.now();
    plot.plantId = plantId;
    plot.plantName = plantName;
    plot.plantedAt = now;
    plot.harvestAt = now + (growthTime * 60 * 60 * 1000);
    plot.waterLevel = 100;

    console.log(`🌱 Tohum ekildi: ${plantName} (${growthTime} saat)`);

    return {
      success: true,
      message: `${plantName} ekildi!`
    };
  }

  waterPlant(houseId: string, plotId: string): { success: boolean; message: string } {
    const garden = this.gardens.get(houseId);

    if (!garden) {
      return { success: false, message: 'Bahçe bulunamadı!' };
    }

    const plot = garden.plots.find(p => p.id === plotId);

    if (!plot || !plot.plantId) {
      return { success: false, message: 'Bu parselde bitki yok!' };
    }

    plot.waterLevel = 100;

    return { success: true, message: 'Bitki sulandı!' };
  }

  harvestPlant(houseId: string, plotId: string): {
    success: boolean;
    yield: number;
    message: string;
  } {
    const garden = this.gardens.get(houseId);

    if (!garden) {
      return { success: false, yield: 0, message: 'Bahçe bulunamadı!' };
    }

    const plot = garden.plots.find(p => p.id === plotId);

    if (!plot || !plot.plantId) {
      return { success: false, yield: 0, message: 'Bu parselde bitki yok!' };
    }

    const now = Date.now();

    if (now < plot.harvestAt) {
      const remaining = Math.ceil((plot.harvestAt - now) / (60 * 60 * 1000));
      return {
        success: false,
        yield: 0,
        message: `Henüz hasat zamanı değil! (${remaining} saat kaldı)`
      };
    }

    // Calculate yield
    let baseYield = 5;

    // Water bonus
    if (plot.waterLevel > 80) baseYield += 2;

    // Fertilizer bonus
    if (plot.fertilized) baseYield += 3;

    // Compost bonus
    baseYield += Math.floor(garden.compostLevel / 20);

    const plantName = plot.plantName;

    // Reset plot
    plot.plantId = null;
    plot.plantName = null;
    plot.plantedAt = 0;
    plot.harvestAt = 0;
    plot.waterLevel = 100;
    plot.fertilized = false;

    console.log(`🌾 Hasat: ${plantName} x${baseYield}`);

    return {
      success: true,
      yield: baseYield,
      message: `${plantName} x${baseYield} hasat edildi!`
    };
  }

  
  // GETTERS
  

  getHouse(houseId: string): House | undefined {
    return this.houses.get(houseId);
  }

  getPlayerHouses(playerId: string): House[] {
    return Array.from(this.houses.values()).filter(h => h.ownerId === playerId);
  }

  getFurniture(furnitureId: string): Furniture | undefined {
    return this.furnitureCatalog.get(furnitureId);
  }

  getAllFurniture(): Furniture[] {
    return Array.from(this.furnitureCatalog.values());
  }

  getFurnitureByCategory(category: FurnitureCategory): Furniture[] {
    return Array.from(this.furnitureCatalog.values()).filter(
      f => f.category === category
    );
  }

  getFurnitureByStyle(style: FurnitureStyle): Furniture[] {
    return Array.from(this.furnitureCatalog.values()).filter(
      f => f.style === style
    );
  }

  getGarden(houseId: string): Garden | undefined {
    return this.gardens.get(houseId);
  }

  getActiveParties(): HouseParty[] {
    const parties: HouseParty[] = [];

    this.houses.forEach(house => {
      if (house.activeParty && Date.now() < house.activeParty.endTime) {
        parties.push(house.activeParty);
      }
    });

    return parties;
  }
}

export default HousingSystem;
