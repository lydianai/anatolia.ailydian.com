/**
 * ANADOLU REALM - Inventory Grid Component
 * PS5-Quality drag-and-drop inventory system
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Sword, Shield, Crown, ShoppingBag, Package,
  Droplet, Star, Lock, X, Info, ArrowUpDown
} from 'lucide-react';
import { Item, ItemRarity, InventorySlot } from '@/lib/inventory/InventorySystem';

const ITEM_TYPE = 'INVENTORY_ITEM';

interface DragItem {
  slotId: number;
  item: Item;
  quantity: number;
}

// Rarity color mapping
const rarityConfig: Record<ItemRarity, {
  border: string;
  glow: string;
  bg: string;
  text: string;
}> = {
  [ItemRarity.COMMON]: {
    border: 'border-gray-500',
    glow: 'shadow-[0_0_10px_rgba(107,114,128,0.5)]',
    bg: 'from-gray-500/20 to-gray-700/20',
    text: 'text-gray-300'
  },
  [ItemRarity.UNCOMMON]: {
    border: 'border-green-500',
    glow: 'shadow-[0_0_10px_rgba(34,197,94,0.6)]',
    bg: 'from-green-500/20 to-green-700/20',
    text: 'text-green-400'
  },
  [ItemRarity.RARE]: {
    border: 'border-blue-500',
    glow: 'shadow-[0_0_12px_rgba(59,130,246,0.7)]',
    bg: 'from-blue-500/20 to-blue-700/20',
    text: 'text-blue-400'
  },
  [ItemRarity.EPIC]: {
    border: 'border-purple-500',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.8)]',
    bg: 'from-purple-500/20 to-purple-700/20',
    text: 'text-purple-400'
  },
  [ItemRarity.LEGENDARY]: {
    border: 'border-orange-500',
    glow: 'shadow-[0_0_20px_rgba(249,115,22,1)]',
    bg: 'from-orange-500/20 to-red-600/20',
    text: 'text-orange-400'
  },
  [ItemRarity.MYTHIC]: {
    border: 'border-pink-500',
    glow: 'shadow-[0_0_25px_rgba(236,72,153,1)]',
    bg: 'from-pink-500/20 to-rose-600/20',
    text: 'text-pink-400'
  }
};

// Individual Inventory Slot Component
function InventorySlotItem({
  slot,
  onMove,
  onClick
}: {
  slot: InventorySlot;
  onMove: (from: number, to: number) => void;
  onClick: (slot: InventorySlot) => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: slot.item ? {
      slotId: slot.slotId,
      item: slot.item,
      quantity: slot.quantity
    } : null,
    canDrag: () => !slot.locked && slot.item !== null,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: () => !slot.locked,
    drop: (draggedItem: DragItem) => {
      if (draggedItem.slotId !== slot.slotId) {
        onMove(draggedItem.slotId, slot.slotId);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  const config = slot.item ? rarityConfig[slot.item.rarity] : rarityConfig[ItemRarity.COMMON];

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative w-16 h-16 rounded-lg border-2 ${
        slot.item ? config.border : 'border-gray-700'
      } ${
        slot.item ? config.glow : ''
      } bg-gradient-to-br ${
        slot.item ? config.bg : 'from-gray-900/50 to-gray-800/50'
      } backdrop-blur-sm transition-all cursor-pointer ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${
        isOver ? 'border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.8)] scale-105' : ''
      } ${
        slot.locked ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => onClick(slot)}
    >
      {/* Locked Icon */}
      {slot.locked && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Lock className="w-6 h-6 text-gray-500" />
        </div>
      )}

      {/* Item Icon */}
      {slot.item && !slot.locked && (
        <>
          {/* Rarity Glow Animation */}
          {[ItemRarity.LEGENDARY, ItemRarity.MYTHIC].includes(slot.item.rarity) && (
            <motion.div
              className={`absolute inset-0 rounded-lg bg-gradient-to-br ${config.bg} blur-md`}
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )}

          {/* Item Image/Icon */}
          <div className="absolute inset-1 flex items-center justify-center">
            <div className={`text-3xl ${config.text}`}>
              {getItemIcon(slot.item)}
            </div>
          </div>

          {/* Stack Count */}
          {slot.quantity > 1 && (
            <div className="absolute bottom-1 right-1 bg-black/80 rounded px-1 text-xs font-bold text-white">
              {slot.quantity}
            </div>
          )}

          {/* Durability Bar */}
          {slot.item.durability && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/70 rounded-b-lg overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-green-500"
                style={{
                  width: `${(slot.item.durability.current / slot.item.durability.max) * 100}%`
                }}
              />
            </div>
          )}
        </>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && slot.item && (
          <motion.div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`bg-black/95 backdrop-blur-lg rounded-lg p-3 border-2 ${config.border} ${config.glow} min-w-[200px] max-w-[300px]`}>
              {/* Item Name */}
              <div className={`font-bold text-sm ${config.text} mb-1`}>
                {slot.item.name}
                {slot.item.unique && <Star className="inline w-3 h-3 ml-1 text-yellow-400" />}
              </div>

              {/* Rarity */}
              <div className={`text-xs ${config.text} mb-2`}>
                {slot.item.rarity.toUpperCase()}
              </div>

              {/* Description */}
              <div className="text-xs text-white/70 mb-2">
                {slot.item.description}
              </div>

              {/* Stats */}
              {slot.item.stats && (
                <div className="border-t border-white/20 pt-2 mt-2 space-y-1">
                  {Object.entries(slot.item.stats).map(([key, value]) => (
                    <div key={key} className="text-xs text-green-400 flex justify-between">
                      <span className="capitalize">{key}:</span>
                      <span className="font-bold">+{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Requirements */}
              {slot.item.requirements && (
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="text-xs text-red-400">
                    Gereksinimler:
                    {slot.item.requirements.level && ` Seviye ${slot.item.requirements.level}`}
                    {slot.item.requirements.strength && ` Güç ${slot.item.requirements.strength}`}
                    {slot.item.requirements.intelligence && ` Zeka ${slot.item.requirements.intelligence}`}
                  </div>
                </div>
              )}

              {/* Value */}
              <div className="border-t border-white/20 pt-2 mt-2 text-xs text-yellow-400">
                Değer: {slot.item.value} ₺
              </div>

              {/* Weight */}
              <div className="text-xs text-gray-400">
                Ağırlık: {slot.item.weight} kg
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Inventory Grid
export default function InventoryGrid({
  slots,
  onMoveItem,
  onUseItem,
  onSortByRarity,
  onSortByType,
  currentWeight,
  maxWeight,
  gold
}: {
  slots: InventorySlot[];
  onMoveItem: (from: number, to: number) => void;
  onUseItem: (slotId: number) => void;
  onSortByRarity: () => void;
  onSortByType: () => void;
  currentWeight: number;
  maxWeight: number;
  gold: number;
}) {
  const [selectedSlot, setSelectedSlot] = useState<InventorySlot | null>(null);

  const handleSlotClick = useCallback((slot: InventorySlot) => {
    setSelectedSlot(slot);
  }, []);

  const weightPercentage = (currentWeight / maxWeight) * 100;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-black text-white">Envanter</h2>
          </div>

          {/* Sort Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onSortByRarity}
              className="px-3 py-1 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500 rounded-lg text-xs font-bold text-white transition-all"
            >
              <Star className="w-4 h-4 inline mr-1" />
              Nadirlik
            </button>
            <button
              onClick={onSortByType}
              className="px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500 rounded-lg text-xs font-bold text-white transition-all"
            >
              <ArrowUpDown className="w-4 h-4 inline mr-1" />
              Tür
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Weight */}
          <div>
            <div className="flex items-center justify-between text-sm text-white/80 mb-1">
              <span>Ağırlık</span>
              <span>{currentWeight.toFixed(1)} / {maxWeight} kg</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${
                  weightPercentage > 90 ? 'bg-red-500' : weightPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${weightPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Gold */}
          <div className="flex items-center gap-2 justify-end">
            <span className="text-sm text-white/80">Altın:</span>
            <span className="text-xl font-bold text-yellow-400">{gold.toLocaleString()} ₺</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          {slots.map((slot) => (
            <InventorySlotItem
              key={slot.slotId}
              slot={slot}
              onMove={onMoveItem}
              onClick={handleSlotClick}
            />
          ))}
        </div>

        {/* Selected Item Details */}
        <AnimatePresence>
          {selectedSlot?.item && (
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`text-3xl ${rarityConfig[selectedSlot.item.rarity].text}`}>
                      {getItemIcon(selectedSlot.item)}
                    </div>
                    <div>
                      <h3 className={`font-bold ${rarityConfig[selectedSlot.item.rarity].text}`}>
                        {selectedSlot.item.name}
                      </h3>
                      <p className="text-xs text-white/60">{selectedSlot.item.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    {selectedSlot.item.type === 'consumable' && (
                      <button
                        onClick={() => onUseItem(selectedSlot.slotId)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-bold text-white transition-all"
                      >
                        Kullan
                      </button>
                    )}
                    {selectedSlot.item.equipmentSlot && (
                      <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold text-white transition-all"
                      >
                        Kuşan
                      </button>
                    )}
                    <button
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-bold text-white transition-all"
                    >
                      At
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSlot(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DndProvider>
  );
}

// Helper function to get item icon
function getItemIcon(item: Item): string {
  // In a real implementation, this would return actual icons
  // For now, return emoji based on item type
  const iconMap: Record<string, string> = {
    weapon: '⚔️',
    armor: '🛡️',
    helmet: '⛑️',
    boots: '👢',
    accessory: '💍',
    consumable: '🧪',
    material: '📦',
    quest: '📜',
    currency: '💰'
  };

  return iconMap[item.type] || '📦';
}
