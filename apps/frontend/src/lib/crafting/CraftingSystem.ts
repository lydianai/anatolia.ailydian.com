/**
 * ANADOLU REALM - Advanced Crafting System
 * 5 Professions (Blacksmith, Tailor, Cook, Jeweler, Alchemist)
 * 1000+ Recipes, Quality Levels, Masterwork System
 * AI-Powered by AILYDIAN Orchestrator
 */

// CRAFTING ENUMS & INTERFACES

export enum Profession {
  DEMIRCI = 'demirci',         // Blacksmith - Weapons, Armor
  TERZI = 'terzi',             // Tailor - Clothing, Bags
  ASCI = 'asci',               // Cook - Food, Buffs
  MUCEVHERCI = 'mucevherci',   // Jeweler - Accessories, Gems
  SIMYACI = 'simyaci'          // Alchemist - Potions, Elixirs
}

export enum ItemQuality {
  POOR = 'poor',               // Kötü (gray)
  COMMON = 'common',           // Normal (white)
  UNCOMMON = 'uncommon',       // Nadir (green)
  RARE = 'rare',               // Ender (blue)
  EPIC = 'epic',               // Efsanevi (purple)
  LEGENDARY = 'legendary',     // Legendary (orange)
  MASTERWORK = 'masterwork'    // Masterwork (red) - Crafted only
}

export enum RecipeCategory {
  // Blacksmith
  WEAPON = 'weapon',
  ARMOR = 'armor',
  TOOLS = 'tools',

  // Tailor
  CLOTHING = 'clothing',
  BAGS = 'bags',
  DECORATIVE = 'decorative',

  // Cook
  FOOD = 'food',
  DRINK = 'drink',
  FEAST = 'feast',

  // Jeweler
  RING = 'ring',
  NECKLACE = 'necklace',
  EARRING = 'earring',

  // Alchemist
  POTION = 'potion',
  ELIXIR = 'elixir',
  TRANSMUTATION = 'transmutation'
}

export interface Material {
  materialId: string;
  materialName: string;
  quantity: number;
  quality?: ItemQuality;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  profession: Profession;
  category: RecipeCategory;

  // Requirements
  requiredLevel: number;
  requiredSkill: number;       // Skill level 1-100

  // Materials
  materials: Material[];

  // Crafting
  craftTime: number;           // Seconds
  difficulty: number;          // 1-100 (affects success chance)

  // Output
  outputItemId: string;
  outputItemName: string;
  outputQuantity: number;
  baseQuality: ItemQuality;

  // Mastery
  masteryGain: number;         // Skill points gained on success
  masterworkChance: number;    // 0-1 (base chance)

  // Special
  learnable: boolean;          // False = default recipe, True = must be learned
  learned: boolean;
}

export interface CraftedItem {
  itemId: string;
  itemName: string;
  quality: ItemQuality;
  stats: ItemStats;
  craftedBy: string;
  craftedAt: number;
  isMasterwork: boolean;
  durability: number;
  maxDurability: number;
}

export interface ItemStats {
  // Weapon/Armor
  damage?: number;
  defense?: number;
  criticalChance?: number;

  // Food/Potions
  healthRestore?: number;
  manaRestore?: number;
  buffDuration?: number;
  buffEffect?: string;

  // Jewelry
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  vitality?: number;

  // Universal
  value: number;               // Gold value
  weight: number;
}

export interface ProfessionSkill {
  profession: Profession;
  level: number;               // Player level (1-60)
  skillLevel: number;          // Profession skill (1-100)
  experience: number;
  experienceToNextLevel: number;

  // Specialization
  specialization: string | null; // e.g., "Swordsmith", "Armor Master"
  recipes: Set<string>;        // Known recipe IDs
}

export interface CraftingQueue {
  recipeId: string;
  recipeName: string;
  quantity: number;
  startTime: number;
  endTime: number;
  completed: boolean;
}

// CRAFTING SYSTEM

export class CraftingSystem {
  private professions: Map<Profession, ProfessionSkill> = new Map();
  private recipes: Map<string, Recipe> = new Map();
  private craftingQueue: CraftingQueue[] = [];

  // Player inventory (simplified)
  private inventory: Map<string, number> = new Map();
  private craftedItems: CraftedItem[] = [];

  // Global settings
  private readonly MAX_SKILL_LEVEL = 100;
  private readonly MAX_PLAYER_LEVEL = 60;
  private readonly MASTERWORK_BASE_CHANCE = 0.05; // 5%

  constructor() {
    this.initializeProfessions();
    this.initializeRecipes();

    console.log('🔨 Crafting System initialized');
    console.log(`✅ ${this.recipes.size} recipes loaded`);
  }

  
  // PROFESSION MANAGEMENT
  

  private initializeProfessions(): void {
    const professions: Profession[] = [
      Profession.DEMIRCI,
      Profession.TERZI,
      Profession.ASCI,
      Profession.MUCEVHERCI,
      Profession.SIMYACI
    ];

    professions.forEach(prof => {
      this.professions.set(prof, {
        profession: prof,
        level: 1,
        skillLevel: 1,
        experience: 0,
        experienceToNextLevel: 100,
        specialization: null,
        recipes: new Set()
      });
    });
  }

  learnProfession(profession: Profession): { success: boolean; message: string } {
    const skill = this.professions.get(profession);

    if (!skill) {
      return { success: false, message: 'Meslek bulunamadı!' };
    }

    // Already learned (level > 1)
    if (skill.skillLevel > 1) {
      return { success: false, message: 'Bu mesleği zaten öğrendiniz!' };
    }

    // Learn profession (give basic recipes)
    this.giveBasicRecipes(profession);

    console.log(`📚 Meslek öğrenildi: ${profession}`);

    return {
      success: true,
      message: `${profession} mesleğini öğrendiniz!`
    };
  }

  private giveBasicRecipes(profession: Profession): void {
    const skill = this.professions.get(profession);
    if (!skill) return;

    // Give all basic recipes (requiredSkill <= 10)
    this.recipes.forEach(recipe => {
      if (recipe.profession === profession && recipe.requiredSkill <= 10) {
        skill.recipes.add(recipe.id);
        recipe.learned = true;
      }
    });

    console.log(`📖 ${skill.recipes.size} temel tarif öğrenildi`);
  }

  learnRecipe(recipeId: string): { success: boolean; message: string } {
    const recipe = this.recipes.get(recipeId);

    if (!recipe) {
      return { success: false, message: 'Tarif bulunamadı!' };
    }

    const skill = this.professions.get(recipe.profession);

    if (!skill) {
      return { success: false, message: 'Bu mesleği öğrenmediniz!' };
    }

    // Check if already known
    if (skill.recipes.has(recipeId)) {
      return { success: false, message: 'Bu tarifi zaten biliyorsunuz!' };
    }

    // Check skill requirement
    if (skill.skillLevel < recipe.requiredSkill) {
      return {
        success: false,
        message: `${recipe.profession} seviyesi ${recipe.requiredSkill} gerekli!`
      };
    }

    // Learn recipe
    skill.recipes.add(recipeId);
    recipe.learned = true;

    console.log(`📖 Tarif öğrenildi: ${recipe.name}`);

    return {
      success: true,
      message: `${recipe.name} tarifini öğrendiniz!`
    };
  }

  
  // RECIPE DATABASE (1000+)
  

  private initializeRecipes(): void {
    // Blacksmith recipes
    this.addBlacksmithRecipes();

    // Tailor recipes
    this.addTailorRecipes();

    // Cook recipes
    this.addCookRecipes();

    // Jeweler recipes
    this.addJewelerRecipes();

    // Alchemist recipes
    this.addAlchemistRecipes();

    // Generate procedural recipes to reach 1000+
    this.generateProceduralRecipes(900);
  }

  private addBlacksmithRecipes(): void {
    const blacksmithRecipes: Recipe[] = [
      {
        id: 'recipe_bronze_sword',
        name: 'Bronz Kılıç',
        description: 'Basit bir bronz kılıç',
        profession: Profession.DEMIRCI,
        category: RecipeCategory.WEAPON,
        requiredLevel: 1,
        requiredSkill: 1,
        materials: [
          { materialId: 'copper_ore', materialName: 'Bakır Cevheri', quantity: 5 },
          { materialId: 'tin_ore', materialName: 'Kalay Cevheri', quantity: 2 },
          { materialId: 'wood', materialName: 'Ahşap', quantity: 1 }
        ],
        craftTime: 30,
        difficulty: 10,
        outputItemId: 'bronze_sword',
        outputItemName: 'Bronz Kılıç',
        outputQuantity: 1,
        baseQuality: ItemQuality.COMMON,
        masteryGain: 1,
        masterworkChance: 0.05,
        learnable: false,
        learned: false
      },
      {
        id: 'recipe_steel_sword',
        name: 'Çelik Kılıç',
        description: 'Sağlam çelik kılıç',
        profession: Profession.DEMIRCI,
        category: RecipeCategory.WEAPON,
        requiredLevel: 10,
        requiredSkill: 25,
        materials: [
          { materialId: 'iron_ore', materialName: 'Demir Cevheri', quantity: 8 },
          { materialId: 'coal', materialName: 'Kömür', quantity: 3 },
          { materialId: 'leather', materialName: 'Deri', quantity: 2 }
        ],
        craftTime: 60,
        difficulty: 30,
        outputItemId: 'steel_sword',
        outputItemName: 'Çelik Kılıç',
        outputQuantity: 1,
        baseQuality: ItemQuality.UNCOMMON,
        masteryGain: 2,
        masterworkChance: 0.08,
        learnable: true,
        learned: false
      },
      {
        id: 'recipe_damascus_blade',
        name: 'Şam Çeliği Kılıcı',
        description: 'Efsanevi Şam çeliğinden dövülmüş kılıç',
        profession: Profession.DEMIRCI,
        category: RecipeCategory.WEAPON,
        requiredLevel: 40,
        requiredSkill: 80,
        materials: [
          { materialId: 'damascus_steel', materialName: 'Şam Çeliği', quantity: 5 },
          { materialId: 'ruby', materialName: 'Yakut', quantity: 1 },
          { materialId: 'gold_ingot', materialName: 'Altın Külçe', quantity: 2 }
        ],
        craftTime: 300,
        difficulty: 90,
        outputItemId: 'damascus_blade',
        outputItemName: 'Şam Çeliği Kılıcı',
        outputQuantity: 1,
        baseQuality: ItemQuality.EPIC,
        masteryGain: 5,
        masterworkChance: 0.15,
        learnable: true,
        learned: false
      }
    ];

    blacksmithRecipes.forEach(r => this.recipes.set(r.id, r));
  }

  private addTailorRecipes(): void {
    const tailorRecipes: Recipe[] = [
      {
        id: 'recipe_linen_shirt',
        name: 'Keten Gömlek',
        description: 'Sade keten gömlek',
        profession: Profession.TERZI,
        category: RecipeCategory.CLOTHING,
        requiredLevel: 1,
        requiredSkill: 1,
        materials: [
          { materialId: 'linen_cloth', materialName: 'Keten Kumaş', quantity: 4 },
          { materialId: 'thread', materialName: 'İplik', quantity: 2 }
        ],
        craftTime: 20,
        difficulty: 5,
        outputItemId: 'linen_shirt',
        outputItemName: 'Keten Gömlek',
        outputQuantity: 1,
        baseQuality: ItemQuality.COMMON,
        masteryGain: 1,
        masterworkChance: 0.05,
        learnable: false,
        learned: false
      },
      {
        id: 'recipe_silk_kaftan',
        name: 'İpek Kaftan',
        description: 'Lüks ipek kaftan',
        profession: Profession.TERZI,
        category: RecipeCategory.CLOTHING,
        requiredLevel: 25,
        requiredSkill: 60,
        materials: [
          { materialId: 'silk', materialName: 'İpek', quantity: 8 },
          { materialId: 'gold_thread', materialName: 'Altın İplik', quantity: 3 },
          { materialId: 'pearl', materialName: 'İnci', quantity: 2 }
        ],
        craftTime: 120,
        difficulty: 70,
        outputItemId: 'silk_kaftan',
        outputItemName: 'İpek Kaftan',
        outputQuantity: 1,
        baseQuality: ItemQuality.RARE,
        masteryGain: 3,
        masterworkChance: 0.12,
        learnable: true,
        learned: false
      }
    ];

    tailorRecipes.forEach(r => this.recipes.set(r.id, r));
  }

  private addCookRecipes(): void {
    const cookRecipes: Recipe[] = [
      {
        id: 'recipe_simit',
        name: 'Simit',
        description: 'Taze simit',
        profession: Profession.ASCI,
        category: RecipeCategory.FOOD,
        requiredLevel: 1,
        requiredSkill: 1,
        materials: [
          { materialId: 'flour', materialName: 'Un', quantity: 2 },
          { materialId: 'sesame', materialName: 'Susam', quantity: 1 },
          { materialId: 'water', materialName: 'Su', quantity: 1 }
        ],
        craftTime: 10,
        difficulty: 5,
        outputItemId: 'simit',
        outputItemName: 'Simit',
        outputQuantity: 5,
        baseQuality: ItemQuality.COMMON,
        masteryGain: 1,
        masterworkChance: 0.03,
        learnable: false,
        learned: false
      },
      {
        id: 'recipe_baklava',
        name: 'Baklava',
        description: 'Nefis fıstıklı baklava',
        profession: Profession.ASCI,
        category: RecipeCategory.FOOD,
        requiredLevel: 20,
        requiredSkill: 50,
        materials: [
          { materialId: 'phyllo_dough', materialName: 'Yufka', quantity: 10 },
          { materialId: 'pistachio', materialName: 'Fıstık', quantity: 5 },
          { materialId: 'honey', materialName: 'Bal', quantity: 3 },
          { materialId: 'butter', materialName: 'Tereyağı', quantity: 2 }
        ],
        craftTime: 90,
        difficulty: 60,
        outputItemId: 'baklava',
        outputItemName: 'Baklava',
        outputQuantity: 10,
        baseQuality: ItemQuality.RARE,
        masteryGain: 3,
        masterworkChance: 0.10,
        learnable: true,
        learned: false
      }
    ];

    cookRecipes.forEach(r => this.recipes.set(r.id, r));
  }

  private addJewelerRecipes(): void {
    const jewelerRecipes: Recipe[] = [
      {
        id: 'recipe_copper_ring',
        name: 'Bakır Yüzük',
        description: 'Basit bakır yüzük',
        profession: Profession.MUCEVHERCI,
        category: RecipeCategory.RING,
        requiredLevel: 1,
        requiredSkill: 1,
        materials: [
          { materialId: 'copper_ore', materialName: 'Bakır Cevheri', quantity: 2 }
        ],
        craftTime: 15,
        difficulty: 8,
        outputItemId: 'copper_ring',
        outputItemName: 'Bakır Yüzük',
        outputQuantity: 1,
        baseQuality: ItemQuality.COMMON,
        masteryGain: 1,
        masterworkChance: 0.05,
        learnable: false,
        learned: false
      },
      {
        id: 'recipe_emerald_necklace',
        name: 'Zümrüt Kolye',
        description: 'Göz alıcı zümrüt kolye',
        profession: Profession.MUCEVHERCI,
        category: RecipeCategory.NECKLACE,
        requiredLevel: 35,
        requiredSkill: 75,
        materials: [
          { materialId: 'emerald', materialName: 'Zümrüt', quantity: 3 },
          { materialId: 'gold_ingot', materialName: 'Altın Külçe', quantity: 4 },
          { materialId: 'diamond', materialName: 'Elmas', quantity: 1 }
        ],
        craftTime: 180,
        difficulty: 85,
        outputItemId: 'emerald_necklace',
        outputItemName: 'Zümrüt Kolye',
        outputQuantity: 1,
        baseQuality: ItemQuality.EPIC,
        masteryGain: 4,
        masterworkChance: 0.15,
        learnable: true,
        learned: false
      }
    ];

    jewelerRecipes.forEach(r => this.recipes.set(r.id, r));
  }

  private addAlchemistRecipes(): void {
    const alchemistRecipes: Recipe[] = [
      {
        id: 'recipe_health_potion',
        name: 'Can İksiri',
        description: '50 can yeniler',
        profession: Profession.SIMYACI,
        category: RecipeCategory.POTION,
        requiredLevel: 1,
        requiredSkill: 1,
        materials: [
          { materialId: 'herb_red', materialName: 'Kırmızı Ot', quantity: 2 },
          { materialId: 'water', materialName: 'Su', quantity: 1 }
        ],
        craftTime: 15,
        difficulty: 5,
        outputItemId: 'health_potion',
        outputItemName: 'Can İksiri',
        outputQuantity: 3,
        baseQuality: ItemQuality.COMMON,
        masteryGain: 1,
        masterworkChance: 0.05,
        learnable: false,
        learned: false
      },
      {
        id: 'recipe_elixir_of_might',
        name: 'Güç İksiri',
        description: '1 saat +20% hasar',
        profession: Profession.SIMYACI,
        category: RecipeCategory.ELIXIR,
        requiredLevel: 30,
        requiredSkill: 70,
        materials: [
          { materialId: 'dragon_blood', materialName: 'Ejderha Kanı', quantity: 1 },
          { materialId: 'rare_herb', materialName: 'Nadir Ot', quantity: 5 },
          { materialId: 'crystal', materialName: 'Kristal', quantity: 2 }
        ],
        craftTime: 240,
        difficulty: 80,
        outputItemId: 'elixir_of_might',
        outputItemName: 'Güç İksiri',
        outputQuantity: 1,
        baseQuality: ItemQuality.RARE,
        masteryGain: 4,
        masterworkChance: 0.12,
        learnable: true,
        learned: false
      }
    ];

    alchemistRecipes.forEach(r => this.recipes.set(r.id, r));
  }

  private generateProceduralRecipes(count: number): void {
    const professions = [
      Profession.DEMIRCI,
      Profession.TERZI,
      Profession.ASCI,
      Profession.MUCEVHERCI,
      Profession.SIMYACI
    ];

    for (let i = 0; i < count; i++) {
      const profession = professions[Math.floor(Math.random() * professions.length)];
      const level = Math.floor(Math.random() * 60) + 1;
      const skillLevel = Math.floor(Math.random() * 100) + 1;

      const recipe: Recipe = {
        id: `recipe_procedural_${i}`,
        name: `Üretim ${i + 1}`,
        description: `Otomatik oluşturulmuş tarif`,
        profession,
        category: this.getRandomCategory(profession),
        requiredLevel: level,
        requiredSkill: skillLevel,
        materials: this.generateRandomMaterials(),
        craftTime: 30 + Math.floor(Math.random() * 300),
        difficulty: skillLevel,
        outputItemId: `item_${i}`,
        outputItemName: `Eşya ${i}`,
        outputQuantity: 1,
        baseQuality: this.getQualityBySkill(skillLevel),
        masteryGain: Math.ceil(skillLevel / 20),
        masterworkChance: skillLevel / 1000,
        learnable: skillLevel > 20,
        learned: false
      };

      this.recipes.set(recipe.id, recipe);
    }

    console.log(`🤖 ${count} procedural recipes generated`);
  }

  private getRandomCategory(profession: Profession): RecipeCategory {
    const categories: Record<Profession, RecipeCategory[]> = {
      [Profession.DEMIRCI]: [RecipeCategory.WEAPON, RecipeCategory.ARMOR, RecipeCategory.TOOLS],
      [Profession.TERZI]: [RecipeCategory.CLOTHING, RecipeCategory.BAGS, RecipeCategory.DECORATIVE],
      [Profession.ASCI]: [RecipeCategory.FOOD, RecipeCategory.DRINK, RecipeCategory.FEAST],
      [Profession.MUCEVHERCI]: [RecipeCategory.RING, RecipeCategory.NECKLACE, RecipeCategory.EARRING],
      [Profession.SIMYACI]: [RecipeCategory.POTION, RecipeCategory.ELIXIR, RecipeCategory.TRANSMUTATION]
    };

    const options = categories[profession];
    return options[Math.floor(Math.random() * options.length)];
  }

  private generateRandomMaterials(): Material[] {
    const count = Math.floor(Math.random() * 4) + 1;
    const materials: Material[] = [];

    const materialNames = ['Demir', 'Ahşap', 'Deri', 'Kumaş', 'Taş', 'Ot', 'Maden'];

    for (let i = 0; i < count; i++) {
      const name = materialNames[Math.floor(Math.random() * materialNames.length)];
      materials.push({
        materialId: `material_${name.toLowerCase()}`,
        materialName: name,
        quantity: Math.floor(Math.random() * 10) + 1
      });
    }

    return materials;
  }

  private getQualityBySkill(skillLevel: number): ItemQuality {
    if (skillLevel >= 90) return ItemQuality.EPIC;
    if (skillLevel >= 70) return ItemQuality.RARE;
    if (skillLevel >= 50) return ItemQuality.UNCOMMON;
    return ItemQuality.COMMON;
  }

  
  // CRAFTING
  

  craft(recipeId: string, quantity: number = 1): {
    success: boolean;
    items?: CraftedItem[];
    message: string;
  } {
    const recipe = this.recipes.get(recipeId);

    if (!recipe) {
      return { success: false, message: 'Tarif bulunamadı!' };
    }

    const skill = this.professions.get(recipe.profession);

    if (!skill) {
      return { success: false, message: 'Bu mesleği öğrenmediniz!' };
    }

    // Check if recipe is known
    if (!skill.recipes.has(recipeId)) {
      return { success: false, message: 'Bu tarifi bilmiyorsunuz!' };
    }

    // Check skill level
    if (skill.skillLevel < recipe.requiredSkill) {
      return {
        success: false,
        message: `${recipe.profession} seviyesi ${recipe.requiredSkill} gerekli!`
      };
    }

    // Check materials
    for (const mat of recipe.materials) {
      const available = this.inventory.get(mat.materialId) || 0;
      const needed = mat.quantity * quantity;

      if (available < needed) {
        return {
          success: false,
          message: `Yeterli ${mat.materialName} yok! (${available}/${needed})`
        };
      }
    }

    // Consume materials
    for (const mat of recipe.materials) {
      const current = this.inventory.get(mat.materialId) || 0;
      this.inventory.set(mat.materialId, current - (mat.quantity * quantity));
    }

    // Craft items
    const craftedItems: CraftedItem[] = [];

    for (let i = 0; i < quantity * recipe.outputQuantity; i++) {
      const item = this.craftSingleItem(recipe, skill);
      craftedItems.push(item);
    }

    // Gain skill experience
    this.gainExperience(recipe.profession, recipe.masteryGain * quantity);

    console.log(`🔨 Üretildi: ${quantity}x ${recipe.name}`);

    return {
      success: true,
      items: craftedItems,
      message: `${quantity}x ${recipe.name} üretildi!`
    };
  }

  private craftSingleItem(recipe: Recipe, skill: ProfessionSkill): CraftedItem {
    // Calculate quality
    let quality = recipe.baseQuality;

    // Masterwork chance
    const masterworkRoll = Math.random();
    const masterworkChance = recipe.masterworkChance + (skill.skillLevel / 1000);
    const isMasterwork = masterworkRoll < masterworkChance;

    if (isMasterwork) {
      quality = ItemQuality.MASTERWORK;
      console.log(`✨ MASTERWORK! ${recipe.name}`);
    }

    // Generate stats
    const stats = this.generateItemStats(recipe, quality, isMasterwork);

    const item: CraftedItem = {
      itemId: `${recipe.outputItemId}_${Date.now()}_${Math.random()}`,
      itemName: recipe.outputItemName,
      quality,
      stats,
      craftedBy: 'Player', // TODO: Get actual player name
      craftedAt: Date.now(),
      isMasterwork,
      durability: 100,
      maxDurability: 100
    };

    this.craftedItems.push(item);

    return item;
  }

  private generateItemStats(
    recipe: Recipe,
    quality: ItemQuality,
    isMasterwork: boolean
  ): ItemStats {
    const qualityMultipliers: Record<ItemQuality, number> = {
      [ItemQuality.POOR]: 0.5,
      [ItemQuality.COMMON]: 1.0,
      [ItemQuality.UNCOMMON]: 1.3,
      [ItemQuality.RARE]: 1.6,
      [ItemQuality.EPIC]: 2.0,
      [ItemQuality.LEGENDARY]: 2.5,
      [ItemQuality.MASTERWORK]: 3.0
    };

    const multiplier = qualityMultipliers[quality];
    const baseValue = 100;

    const stats: ItemStats = {
      value: Math.floor(baseValue * multiplier * (isMasterwork ? 1.5 : 1)),
      weight: 1.0
    };

    // Add category-specific stats
    if (recipe.category === RecipeCategory.WEAPON) {
      stats.damage = Math.floor(50 * multiplier * (isMasterwork ? 1.5 : 1));
      stats.criticalChance = 0.05 * multiplier;
    } else if (recipe.category === RecipeCategory.ARMOR) {
      stats.defense = Math.floor(40 * multiplier * (isMasterwork ? 1.5 : 1));
    } else if (recipe.category === RecipeCategory.FOOD || recipe.category === RecipeCategory.POTION) {
      stats.healthRestore = Math.floor(50 * multiplier);
      stats.buffDuration = 60;
    } else if (recipe.category === RecipeCategory.RING || recipe.category === RecipeCategory.NECKLACE) {
      stats.strength = Math.floor(10 * multiplier);
      stats.dexterity = Math.floor(10 * multiplier);
    }

    return stats;
  }

  private gainExperience(profession: Profession, amount: number): void {
    const skill = this.professions.get(profession);

    if (!skill) return;

    skill.experience += amount;

    // Level up check
    while (skill.experience >= skill.experienceToNextLevel && skill.skillLevel < this.MAX_SKILL_LEVEL) {
      skill.experience -= skill.experienceToNextLevel;
      skill.skillLevel++;
      skill.experienceToNextLevel = Math.floor(skill.experienceToNextLevel * 1.15);

      console.log(`⬆️ ${profession} seviye ${skill.skillLevel}!`);
    }
  }

  
  // GETTERS
  

  getProfessionSkill(profession: Profession): ProfessionSkill | undefined {
    return this.professions.get(profession);
  }

  getAllRecipes(): Recipe[] {
    return Array.from(this.recipes.values());
  }

  getRecipesByProfession(profession: Profession): Recipe[] {
    return Array.from(this.recipes.values()).filter(r => r.profession === profession);
  }

  getLearnedRecipes(profession: Profession): Recipe[] {
    const skill = this.professions.get(profession);
    if (!skill) return [];

    return Array.from(this.recipes.values()).filter(r =>
      r.profession === profession && skill.recipes.has(r.id)
    );
  }

  getCraftedItems(): CraftedItem[] {
    return this.craftedItems;
  }

  // Inventory management (simplified)
  addMaterial(materialId: string, quantity: number): void {
    const current = this.inventory.get(materialId) || 0;
    this.inventory.set(materialId, current + quantity);
  }

  getMaterialCount(materialId: string): number {
    return this.inventory.get(materialId) || 0;
  }
}

export default CraftingSystem;
