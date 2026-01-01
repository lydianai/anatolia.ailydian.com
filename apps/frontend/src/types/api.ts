// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatar?: string;
  level: number;
  experience: number;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

// Character Types
export interface Character {
  id: string;
  userId: string;
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
  position: Position;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  stats: CharacterStats;
  equipment: Equipment;
  inventory: InventoryItem[];
  createdAt: string;
  updatedAt: string;
}

export enum CharacterClass {
  WARRIOR = 'WARRIOR',
  MAGE = 'MAGE',
  ARCHER = 'ARCHER',
  ASSASSIN = 'ASSASSIN',
}

export interface Position {
  x: number;
  y: number;
  z?: number;
}

export interface CharacterStats {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
  luck: number;
}

export interface Equipment {
  weapon?: Item;
  armor?: Item;
  helmet?: Item;
  boots?: Item;
  gloves?: Item;
  accessory?: Item;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  level: number;
  stats?: Partial<CharacterStats>;
  icon?: string;
}

export enum ItemType {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR',
  HELMET = 'HELMET',
  BOOTS = 'BOOTS',
  GLOVES = 'GLOVES',
  ACCESSORY = 'ACCESSORY',
  CONSUMABLE = 'CONSUMABLE',
  QUEST = 'QUEST',
  MATERIAL = 'MATERIAL',
}

export enum ItemRarity {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

export interface InventoryItem {
  item: Item;
  quantity: number;
  slot: number;
}

// World Types
export interface World {
  id: string;
  name: string;
  description: string;
  map: MapData;
  npcs: NPC[];
  monsters: Monster[];
}

export interface MapData {
  width: number;
  height: number;
  tileSize: number;
  layers: MapLayer[];
}

export interface MapLayer {
  name: string;
  data: number[][];
  zIndex: number;
}

export interface NPC {
  id: string;
  name: string;
  position: Position;
  dialogue?: string[];
  quests?: string[];
}

export interface Monster {
  id: string;
  name: string;
  level: number;
  position: Position;
  health: number;
  maxHealth: number;
  stats: CharacterStats;
  loot: Item[];
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
