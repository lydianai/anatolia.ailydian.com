/**
 * ANADOLU REALM - Advanced Inventory System
 * PS5-Quality grid-based inventory with Turkish items
 */

export enum ItemType {
  WEAPON = 'weapon',
  ARMOR = 'armor',
  HELMET = 'helmet',
  BOOTS = 'boots',
  ACCESSORY = 'accessory',
  CONSUMABLE = 'consumable',
  MATERIAL = 'material',
  QUEST = 'quest',
  CURRENCY = 'currency'
}

export enum ItemRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
  MYTHIC = 'mythic'
}

export enum EquipmentSlot {
  WEAPON = 'weapon',
  OFFHAND = 'offhand',
  HELMET = 'helmet',
  CHEST = 'chest',
  LEGS = 'legs',
  BOOTS = 'boots',
  GLOVES = 'gloves',
  NECKLACE = 'necklace',
  RING1 = 'ring1',
  RING2 = 'ring2'
}

export interface ItemStats {
  attack?: number;
  defense?: number;
  health?: number;
  stamina?: number;
  mana?: number;
  critChance?: number;
  critDamage?: number;
  moveSpeed?: number;
  attackSpeed?: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  icon: string;
  stackable: boolean;
  maxStack: number;
  weight: number;
  value: number; // in Turkish Lira
  stats?: ItemStats;
  equipmentSlot?: EquipmentSlot;
  durability?: {
    current: number;
    max: number;
  };
  requirements?: {
    level?: number;
    strength?: number;
    intelligence?: number;
  };
  effects?: {
    type: string;
    value: number;
    duration?: number;
  }[];
  set?: string; // Item set name
  unique?: boolean;
  tradeable?: boolean;
}

export interface InventorySlot {
  slotId: number;
  item: Item | null;
  quantity: number;
  locked: boolean;
}

export interface Equipment {
  [EquipmentSlot.WEAPON]: Item | null;
  [EquipmentSlot.OFFHAND]: Item | null;
  [EquipmentSlot.HELMET]: Item | null;
  [EquipmentSlot.CHEST]: Item | null;
  [EquipmentSlot.LEGS]: Item | null;
  [EquipmentSlot.BOOTS]: Item | null;
  [EquipmentSlot.GLOVES]: Item | null;
  [EquipmentSlot.NECKLACE]: Item | null;
  [EquipmentSlot.RING1]: Item | null;
  [EquipmentSlot.RING2]: Item | null;
}

export class InventorySystem {
  private slots: InventorySlot[];
  private equipment: Equipment;
  private maxWeight: number;
  private currentWeight: number;
  private gold: number;

  // Turkish Item Database
  private readonly TURKISH_ITEMS: Record<string, Partial<Item>> = {
    // Turkish Weapons
    kilij_basic: {
      name: 'Kılıç',
      description: 'Klasik Türk kılıcı',
      type: ItemType.WEAPON,
      rarity: ItemRarity.COMMON,
      icon: '/items/weapons/kilij.png',
      equipmentSlot: EquipmentSlot.WEAPON,
      stats: { attack: 25, critChance: 0.05 },
      weight: 3,
      value: 100
    },
    yataghan_rare: {
      name: 'Yatağan',
      description: 'Eğri Türk kılıcı, kritik şansı yüksek',
      type: ItemType.WEAPON,
      rarity: ItemRarity.RARE,
      icon: '/items/weapons/yataghan.png',
      equipmentSlot: EquipmentSlot.WEAPON,
      stats: { attack: 50, critChance: 0.15, critDamage: 1.5 },
      weight: 2.5,
      value: 500
    },
    turkish_bow: {
      name: 'Türk Yayı',
      description: 'Uzun menzilli Türk yayı',
      type: ItemType.WEAPON,
      rarity: ItemRarity.UNCOMMON,
      icon: '/items/weapons/bow.png',
      equipmentSlot: EquipmentSlot.WEAPON,
      stats: { attack: 35, critChance: 0.10 },
      weight: 2,
      value: 250
    },

    // Turkish Armor
    chainmail_ottoman: {
      name: 'Osmanlı Zırh',
      description: 'Ağır zırh, yüksek savunma',
      type: ItemType.ARMOR,
      rarity: ItemRarity.RARE,
      icon: '/items/armor/chainmail.png',
      equipmentSlot: EquipmentSlot.CHEST,
      stats: { defense: 60, health: 100 },
      weight: 15,
      value: 800
    },
    sipahi_helmet: {
      name: 'Sipahi Başlığı',
      description: 'Türk süvari miğferi',
      type: ItemType.HELMET,
      rarity: ItemRarity.UNCOMMON,
      icon: '/items/armor/sipahi_helmet.png',
      equipmentSlot: EquipmentSlot.HELMET,
      stats: { defense: 25, health: 50 },
      weight: 3,
      value: 300
    },

    // Turkish Consumables
    turkish_coffee: {
      name: 'Türk Kahvesi',
      description: 'Enerji verir, stamina +50',
      type: ItemType.CONSUMABLE,
      rarity: ItemRarity.COMMON,
      icon: '/items/consumables/coffee.png',
      stackable: true,
      maxStack: 20,
      effects: [{ type: 'stamina', value: 50, duration: 300 }],
      weight: 0.2,
      value: 10
    },
    simit: {
      name: 'Simit',
      description: 'Can yeniler, +30 HP',
      type: ItemType.CONSUMABLE,
      rarity: ItemRarity.COMMON,
      icon: '/items/consumables/simit.png',
      stackable: true,
      maxStack: 20,
      effects: [{ type: 'health', value: 30 }],
      weight: 0.3,
      value: 5
    },
    ayran: {
      name: 'Ayran',
      description: 'Serinletir, mana +40',
      type: ItemType.CONSUMABLE,
      rarity: ItemRarity.COMMON,
      icon: '/items/consumables/ayran.png',
      stackable: true,
      maxStack: 20,
      effects: [{ type: 'mana', value: 40 }],
      weight: 0.5,
      value: 8
    },

    // Turkish Materials
    silk_fabric: {
      name: 'İpek Kumaş',
      description: 'Türk ipek kumaşı, zırh yapımında kullanılır',
      type: ItemType.MATERIAL,
      rarity: ItemRarity.UNCOMMON,
      icon: '/items/materials/silk.png',
      stackable: true,
      maxStack: 50,
      weight: 0.5,
      value: 25
    },
    copper_ore: {
      name: 'Bakır Cevheri',
      description: 'Bakır maden, silah yapımında kullanılır',
      type: ItemType.MATERIAL,
      rarity: ItemRarity.COMMON,
      icon: '/items/materials/copper.png',
      stackable: true,
      maxStack: 100,
      weight: 2,
      value: 15
    },
    turkish_carpet_piece: {
      name: 'Halı Parçası',
      description: 'Türk halısı parçası, değerli',
      type: ItemType.MATERIAL,
      rarity: ItemRarity.RARE,
      icon: '/items/materials/carpet.png',
      stackable: true,
      maxStack: 20,
      weight: 1,
      value: 100
    },

    // Legendary Items
    fatih_sword: {
      name: 'Fatih Sultan Mehmet\'in Kılıcı',
      description: 'Efsanevi güç, İstanbul fethinde kullanıldı',
      type: ItemType.WEAPON,
      rarity: ItemRarity.LEGENDARY,
      icon: '/items/weapons/fatih_sword.png',
      equipmentSlot: EquipmentSlot.WEAPON,
      stats: { attack: 120, critChance: 0.30, critDamage: 2.5, health: 200 },
      weight: 4,
      value: 10000,
      unique: true,
      requirements: { level: 50, strength: 100 }
    },
    mete_han_bow: {
      name: 'Mete Han\'ın Yayı',
      description: 'Türk atıcılığının simgesi',
      type: ItemType.WEAPON,
      rarity: ItemRarity.LEGENDARY,
      icon: '/items/weapons/mete_bow.png',
      equipmentSlot: EquipmentSlot.WEAPON,
      stats: { attack: 100, critChance: 0.40, critDamage: 3.0, attackSpeed: 1.5 },
      weight: 3,
      value: 12000,
      unique: true,
      requirements: { level: 50 }
    }
  };

  constructor(slotCount: number = 30, maxWeight: number = 100) {
    this.slots = Array.from({ length: slotCount }, (_, i) => ({
      slotId: i,
      item: null,
      quantity: 0,
      locked: false
    }));

    this.equipment = {
      [EquipmentSlot.WEAPON]: null,
      [EquipmentSlot.OFFHAND]: null,
      [EquipmentSlot.HELMET]: null,
      [EquipmentSlot.CHEST]: null,
      [EquipmentSlot.LEGS]: null,
      [EquipmentSlot.BOOTS]: null,
      [EquipmentSlot.GLOVES]: null,
      [EquipmentSlot.NECKLACE]: null,
      [EquipmentSlot.RING1]: null,
      [EquipmentSlot.RING2]: null
    };

    this.maxWeight = maxWeight;
    this.currentWeight = 0;
    this.gold = 0;
  }

  // Add item to inventory
  public addItem(itemId: string, quantity: number = 1): boolean {
    const itemTemplate = this.TURKISH_ITEMS[itemId];
    if (!itemTemplate) {
      console.error(`Item not found: ${itemId}`);
      return false;
    }

    const item: Item = {
      id: itemId,
      stackable: false,
      maxStack: 1,
      weight: 1,
      value: 0,
      tradeable: true,
      ...itemTemplate
    } as Item;

    // Check weight
    if (this.currentWeight + item.weight * quantity > this.maxWeight) {
      console.warn('Inventory is too heavy');
      return false;
    }

    // Try to stack if stackable
    if (item.stackable) {
      for (const slot of this.slots) {
        if (slot.item?.id === itemId && slot.quantity < item.maxStack) {
          const addableAmount = Math.min(
            quantity,
            item.maxStack - slot.quantity
          );
          slot.quantity += addableAmount;
          this.currentWeight += item.weight * addableAmount;
          quantity -= addableAmount;

          if (quantity === 0) return true;
        }
      }
    }

    // Add to empty slots
    while (quantity > 0) {
      const emptySlot = this.slots.find(s => s.item === null && !s.locked);
      if (!emptySlot) {
        console.warn('No empty slots available');
        return false;
      }

      const addAmount = item.stackable ? Math.min(quantity, item.maxStack) : 1;
      emptySlot.item = { ...item };
      emptySlot.quantity = addAmount;
      this.currentWeight += item.weight * addAmount;
      quantity -= addAmount;
    }

    return true;
  }

  // Remove item from inventory
  public removeItem(slotId: number, quantity: number = 1): boolean {
    const slot = this.slots[slotId];
    if (!slot.item || slot.quantity < quantity) {
      return false;
    }

    this.currentWeight -= slot.item.weight * quantity;
    slot.quantity -= quantity;

    if (slot.quantity === 0) {
      slot.item = null;
    }

    return true;
  }

  // Move item between slots
  public moveItem(fromSlot: number, toSlot: number): boolean {
    const from = this.slots[fromSlot];
    const to = this.slots[toSlot];

    if (!from.item || from.locked || to.locked) {
      return false;
    }

    // Swap items
    const tempItem = to.item;
    const tempQuantity = to.quantity;

    to.item = from.item;
    to.quantity = from.quantity;

    from.item = tempItem;
    from.quantity = tempQuantity;

    return true;
  }

  // Equip item
  public equipItem(slotId: number): boolean {
    const slot = this.slots[slotId];
    if (!slot.item || !slot.item.equipmentSlot) {
      return false;
    }

    const equipSlot = slot.item.equipmentSlot;

    // Unequip current item if exists
    if (this.equipment[equipSlot]) {
      this.unequipItem(equipSlot);
    }

    // Equip new item
    this.equipment[equipSlot] = slot.item;
    slot.item = null;
    slot.quantity = 0;

    return true;
  }

  // Unequip item
  public unequipItem(equipSlot: EquipmentSlot): boolean {
    const item = this.equipment[equipSlot];
    if (!item) {
      return false;
    }

    // Find empty slot
    const emptySlot = this.slots.find(s => s.item === null && !s.locked);
    if (!emptySlot) {
      console.warn('No empty slots to unequip item');
      return false;
    }

    emptySlot.item = item;
    emptySlot.quantity = 1;
    this.equipment[equipSlot] = null;

    return true;
  }

  // Use consumable item
  public useItem(slotId: number): boolean {
    const slot = this.slots[slotId];
    if (!slot.item || slot.item.type !== ItemType.CONSUMABLE) {
      return false;
    }

    // Apply effects (would trigger events here)
    console.log(`Using ${slot.item.name}`, slot.item.effects);

    this.removeItem(slotId, 1);
    return true;
  }

  // Get total stats from equipment
  public getTotalStats(): ItemStats {
    const total: ItemStats = {
      attack: 0,
      defense: 0,
      health: 0,
      stamina: 0,
      mana: 0,
      critChance: 0,
      critDamage: 0,
      moveSpeed: 0,
      attackSpeed: 0
    };

    Object.values(this.equipment).forEach(item => {
      if (item?.stats) {
        Object.keys(item.stats).forEach(key => {
          const statKey = key as keyof ItemStats;
          total[statKey] = (total[statKey] || 0) + (item.stats![statKey] || 0);
        });
      }
    });

    return total;
  }

  // Getters
  public getSlots(): InventorySlot[] {
    return this.slots;
  }

  public getEquipment(): Equipment {
    return this.equipment;
  }

  public getCurrentWeight(): number {
    return this.currentWeight;
  }

  public getMaxWeight(): number {
    return this.maxWeight;
  }

  public getGold(): number {
    return this.gold;
  }

  public addGold(amount: number): void {
    this.gold += amount;
  }

  public removeGold(amount: number): boolean {
    if (this.gold < amount) {
      return false;
    }
    this.gold -= amount;
    return true;
  }

  // Sort inventory
  public sortByRarity(): void {
    const rarityOrder = {
      [ItemRarity.MYTHIC]: 6,
      [ItemRarity.LEGENDARY]: 5,
      [ItemRarity.EPIC]: 4,
      [ItemRarity.RARE]: 3,
      [ItemRarity.UNCOMMON]: 2,
      [ItemRarity.COMMON]: 1
    };

    this.slots.sort((a, b) => {
      if (!a.item) return 1;
      if (!b.item) return -1;
      return rarityOrder[b.item.rarity] - rarityOrder[a.item.rarity];
    });

    // Reassign slot IDs
    this.slots.forEach((slot, index) => {
      slot.slotId = index;
    });
  }

  public sortByType(): void {
    this.slots.sort((a, b) => {
      if (!a.item) return 1;
      if (!b.item) return -1;
      return a.item.type.localeCompare(b.item.type);
    });

    this.slots.forEach((slot, index) => {
      slot.slotId = index;
    });
  }
}
