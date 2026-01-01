/**
 * ANADOLU REALM - Envanterim (My Inventory)
 * User's inventory and items management page
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'material' | 'quest';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  quantity: number;
  level?: number;
  stats?: {
    strength?: number;
    agility?: number;
    intelligence?: number;
    vitality?: number;
  };
  sellPrice?: number;
  equipped?: boolean;
}

const mockInventory: Item[] = [
  // Weapons
  {
    id: 'sword_1',
    name: 'Osmanlı Kılıcı +5',
    description: 'Keskin ve dayanıklı bir Osmanlı kılıcı',
    icon: '⚔️',
    category: 'weapon',
    rarity: 'rare',
    quantity: 1,
    level: 25,
    stats: { strength: 45, agility: 10 },
    sellPrice: 5000,
    equipped: true
  },
  {
    id: 'bow_1',
    name: 'Türk Yayı',
    description: 'Geleneksel Türk kompozit yayı',
    icon: '🏹',
    category: 'weapon',
    rarity: 'uncommon',
    quantity: 1,
    level: 20,
    stats: { agility: 35, strength: 15 },
    sellPrice: 3000
  },

  // Armor
  {
    id: 'armor_1',
    name: 'Yeniçeri Zırhı',
    description: 'Yeniçeri birliklerinin geleneksel zırhı',
    icon: '🛡️',
    category: 'armor',
    rarity: 'epic',
    quantity: 1,
    level: 25,
    stats: { vitality: 50, strength: 20 },
    sellPrice: 8000,
    equipped: true
  },
  {
    id: 'helmet_1',
    name: 'Süvari Miğferi',
    description: 'Süvari sınıfına özel koruyucu başlık',
    icon: '⛑️',
    category: 'armor',
    rarity: 'rare',
    quantity: 1,
    level: 22,
    stats: { vitality: 30, agility: 10 },
    sellPrice: 4500
  },

  // Accessories
  {
    id: 'amulet_1',
    name: 'Tuğra Kolyesi',
    description: 'Osmanlı tuğrası işlemeli değerli kolye',
    icon: '📿',
    category: 'accessory',
    rarity: 'legendary',
    quantity: 1,
    level: 30,
    stats: { intelligence: 40, vitality: 25 },
    sellPrice: 15000,
    equipped: true
  },
  {
    id: 'ring_1',
    name: 'Zümrüt Yüzük',
    description: 'Nadir zümrüt taşlı yüzük',
    icon: '💍',
    category: 'accessory',
    rarity: 'epic',
    quantity: 1,
    level: 25,
    stats: { intelligence: 30, agility: 15 },
    sellPrice: 7500
  },

  // Consumables
  {
    id: 'potion_health',
    name: 'Sağlık İksiri',
    description: 'Canı %50 yeniler',
    icon: '🧪',
    category: 'consumable',
    rarity: 'common',
    quantity: 25,
    sellPrice: 100
  },
  {
    id: 'potion_mana',
    name: 'Mana İksiri',
    description: 'Manayı %50 yeniler',
    icon: '💙',
    category: 'consumable',
    rarity: 'common',
    quantity: 18,
    sellPrice: 100
  },
  {
    id: 'food_kebab',
    name: 'İskender Kebap',
    description: 'Güç ve dayanıklılığı 1 saat artırır',
    icon: '🍖',
    category: 'consumable',
    rarity: 'uncommon',
    quantity: 8,
    sellPrice: 250
  },

  // Materials
  {
    id: 'material_iron',
    name: 'Demir Cevheri',
    description: 'Silah ve zırh yapımında kullanılır',
    icon: '⛏️',
    category: 'material',
    rarity: 'common',
    quantity: 143,
    sellPrice: 50
  },
  {
    id: 'material_leather',
    name: 'Deri',
    description: 'Zırh yapımında kullanılır',
    icon: '🦌',
    category: 'material',
    rarity: 'common',
    quantity: 87,
    sellPrice: 30
  },
  {
    id: 'material_gem',
    name: 'Değerli Taş',
    description: 'Aksesuar yapımında kullanılır',
    icon: '💎',
    category: 'material',
    rarity: 'rare',
    quantity: 12,
    sellPrice: 500
  },

  // Quest Items
  {
    id: 'quest_map',
    name: 'Eski Harita',
    description: 'Gizemli bir hazine haritası',
    icon: '🗺️',
    category: 'quest',
    rarity: 'uncommon',
    quantity: 1,
    sellPrice: 0
  },
  {
    id: 'quest_key',
    name: 'Gizli Anahtar',
    description: 'Topkapı Sarayı\'ndaki gizli odanın anahtarı',
    icon: '🔑',
    category: 'quest',
    rarity: 'epic',
    quantity: 1,
    sellPrice: 0
  }
];

const categories = [
  { id: 'all', name: 'Tümü', icon: '📦' },
  { id: 'weapon', name: 'Silahlar', icon: '⚔️' },
  { id: 'armor', name: 'Zırhlar', icon: '🛡️' },
  { id: 'accessory', name: 'Aksesuarlar', icon: '💍' },
  { id: 'consumable', name: 'Tüketilebilir', icon: '🧪' },
  { id: 'material', name: 'Malzemeler', icon: '⛏️' },
  { id: 'quest', name: 'Görev Eşyaları', icon: '📜' }
];

const rarityColors = {
  common: 'border-gray-500 bg-gray-500/10',
  uncommon: 'border-green-500 bg-green-500/10',
  rare: 'border-blue-500 bg-blue-500/10',
  epic: 'border-purple-500 bg-purple-500/10',
  legendary: 'border-yellow-500 bg-yellow-500/10'
};

export default function InventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filteredItems = mockInventory.filter(item =>
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const totalValue = mockInventory.reduce((sum, item) => sum + (item.sellPrice || 0) * item.quantity, 0);
  const totalItems = mockInventory.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
          Envanterim
        </h1>
        <p className="text-gray-400">Eşyalarınızı yönetin ve kullanın</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 rounded-lg"
        >
          <div className="text-4xl mb-2">📦</div>
          <div className="text-3xl font-bold">{totalItems}</div>
          <div className="text-sm opacity-90">Toplam Eşya</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-lg"
        >
          <div className="text-4xl mb-2">💰</div>
          <div className="text-3xl font-bold">{totalValue.toLocaleString()}</div>
          <div className="text-sm opacity-90">Toplam Değer (Akçe)</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-lg"
        >
          <div className="text-4xl mb-2">✨</div>
          <div className="text-3xl font-bold">{mockInventory.filter(i => i.equipped).length}</div>
          <div className="text-sm opacity-90">Kuşanılmış</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Filter + Items List */}
        <div className="lg:col-span-2">
          {/* Categories */}
          <div className="mb-6 bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    px-4 py-2 rounded-lg font-bold transition-all
                    ${selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50'
                      : 'bg-slate-700 hover:bg-slate-600'
                    }
                  `}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${rarityColors[item.rarity]}
                  ${selectedItem?.id === item.id ? 'ring-2 ring-white scale-105' : ''}
                  ${item.equipped ? 'ring-2 ring-green-500' : ''}
                  hover:scale-105
                `}
              >
                {/* Equipped Badge */}
                {item.equipped && (
                  <div className="text-xs bg-green-500 text-white px-2 py-1 rounded mb-2 text-center font-bold">
                    ✓ KUŞANILMIŞ
                  </div>
                )}

                {/* Item Icon */}
                <div className="text-5xl text-center mb-2">{item.icon}</div>

                {/* Item Name */}
                <div className="text-sm font-bold text-center mb-1 truncate">{item.name}</div>

                {/* Quantity */}
                {item.quantity > 1 && (
                  <div className="text-xs text-center text-gray-300">x{item.quantity}</div>
                )}

                {/* Level */}
                {item.level && (
                  <div className="text-xs text-center text-yellow-400 mt-1">Lvl {item.level}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Item Details Panel */}
        <div className="lg:col-span-1">
          {selectedItem ? (
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border-2 ${rarityColors[selectedItem.rarity]}`}
            >
              {/* Item Header */}
              <div className="text-center mb-6">
                <div className="text-7xl mb-4">{selectedItem.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{selectedItem.name}</h3>
                <div className={`text-sm font-bold uppercase ${
                  selectedItem.rarity === 'legendary' ? 'text-yellow-400' :
                  selectedItem.rarity === 'epic' ? 'text-purple-400' :
                  selectedItem.rarity === 'rare' ? 'text-blue-400' :
                  selectedItem.rarity === 'uncommon' ? 'text-green-400' :
                  'text-gray-400'
                }`}>
                  {selectedItem.rarity}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-6 text-center">{selectedItem.description}</p>

              {/* Stats */}
              {selectedItem.stats && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold mb-3 text-gray-400">İSTATİSTİKLER</h4>
                  <div className="space-y-2">
                    {selectedItem.stats.strength && (
                      <div className="flex justify-between">
                        <span className="text-sm">💪 Güç</span>
                        <span className="text-sm font-bold text-red-400">+{selectedItem.stats.strength}</span>
                      </div>
                    )}
                    {selectedItem.stats.agility && (
                      <div className="flex justify-between">
                        <span className="text-sm">⚡ Çeviklik</span>
                        <span className="text-sm font-bold text-green-400">+{selectedItem.stats.agility}</span>
                      </div>
                    )}
                    {selectedItem.stats.intelligence && (
                      <div className="flex justify-between">
                        <span className="text-sm">🧠 Zeka</span>
                        <span className="text-sm font-bold text-blue-400">+{selectedItem.stats.intelligence}</span>
                      </div>
                    )}
                    {selectedItem.stats.vitality && (
                      <div className="flex justify-between">
                        <span className="text-sm">❤️ Dayanıklılık</span>
                        <span className="text-sm font-bold text-purple-400">+{selectedItem.stats.vitality}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="space-y-2 mb-6 text-sm">
                {selectedItem.level && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Seviye</span>
                    <span className="font-bold">{selectedItem.level}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Miktar</span>
                  <span className="font-bold">{selectedItem.quantity}</span>
                </div>
                {selectedItem.sellPrice !== undefined && selectedItem.sellPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Satış Fiyatı</span>
                    <span className="font-bold text-yellow-400">{selectedItem.sellPrice.toLocaleString()} 💰</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {(selectedItem.category === 'weapon' || selectedItem.category === 'armor' || selectedItem.category === 'accessory') && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-3 rounded-lg font-bold ${
                      selectedItem.equipped
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {selectedItem.equipped ? '❌ Çıkar' : '✓ Kuşan'}
                  </motion.button>
                )}

                {selectedItem.category === 'consumable' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold"
                  >
                    🍖 Kullan
                  </motion.button>
                )}

                {selectedItem.sellPrice !== undefined && selectedItem.sellPrice > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-bold"
                  >
                    💰 Sat
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 bg-slate-600 hover:bg-slate-700 rounded-lg font-bold"
                >
                  🗑️ At
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 text-center text-gray-400">
              <div className="text-6xl mb-4">👈</div>
              <p>Detayları görmek için bir eşya seçin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
