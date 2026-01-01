"use client";

/**
 * ANIMATED INVENTORY - Game Inventory with Drag & Drop
 * Elite game UI component with premium animations
 */

import { motion, Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { staggerContainer, scaleIn } from "@/lib/animations";

// TYPES

export interface InventoryItem {
  id: string;
  name: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  quantity: number;
  icon: string;
  type: "weapon" | "armor" | "consumable" | "material";
}

export interface InventoryProps {
  items: InventoryItem[];
  onItemClick?: (item: InventoryItem) => void;
  onItemDrop?: (itemId: string, targetId: string) => void;
}

// RARITY CONFIG

const RARITY_CONFIG = {
  common: {
    color: "#9ca3af",
    glow: "0 0 10px rgba(156, 163, 175, 0.3)",
    bg: "bg-gray-500/20",
  },
  rare: {
    color: "#3b82f6",
    glow: "0 0 20px rgba(59, 130, 246, 0.5)",
    bg: "bg-blue-500/20",
  },
  epic: {
    color: "#a855f7",
    glow: "0 0 30px rgba(168, 85, 247, 0.6)",
    bg: "bg-purple-500/20",
  },
  legendary: {
    color: "#f59e0b",
    glow: "0 0 40px rgba(245, 158, 11, 0.8)",
    bg: "bg-yellow-500/20",
  },
};

// INVENTORY SLOT

const InventorySlot = ({
  item,
  index,
  onClick,
}: {
  item: InventoryItem | null;
  index: number;
  onClick?: (item: InventoryItem) => void;
}) => {
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);

  if (!item) {
    return (
      <motion.div
        className="relative aspect-square rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50"
        variants={scaleIn}
        whileHover={{ scale: 1.05, borderColor: "#4b5563" }}
        transition={{ duration: 0.2 }}
      />
    );
  }

  const rarityConfig = RARITY_CONFIG[item.rarity];

  return (
    <motion.div
      className="group relative aspect-square cursor-pointer"
      variants={scaleIn}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragControls={dragControls}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={() => onClick?.(item)}
    >
      {/* Slot background */}
      <div
        className={`absolute inset-0 rounded-lg border-2 ${rarityConfig.bg}`}
        style={{
          borderColor: rarityConfig.color,
          boxShadow: rarityConfig.glow,
        }}
      />

      {/* Rarity glow animation */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
        style={{ boxShadow: rarityConfig.glow }}
        animate={{
          opacity: isDragging ? 0.6 : 0,
        }}
      />

      {/* Item icon */}
      <div className="relative flex h-full items-center justify-center p-2">
        <motion.div
          className="text-4xl"
          animate={{
            rotate: isDragging ? 10 : 0,
          }}
        >
          {item.icon}
        </motion.div>
      </div>

      {/* Quantity badge */}
      {item.quantity > 1 && (
        <motion.div
          className="absolute bottom-1 right-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-bold text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          {item.quantity}
        </motion.div>
      )}

      {/* Rarity indicator */}
      <motion.div
        className="absolute left-1 top-1 h-2 w-2 rounded-full"
        style={{ backgroundColor: rarityConfig.color }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Tooltip */}
      <motion.div
        className="pointer-events-none absolute -top-16 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/90 px-3 py-2 text-sm font-semibold text-white opacity-0 group-hover:opacity-100"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
      >
        <div style={{ color: rarityConfig.color }}>{item.rarity.toUpperCase()}</div>
        <div>{item.name}</div>
        <div className="text-xs text-gray-400">{item.type}</div>

        {/* Tooltip arrow */}
        <div
          className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black/90"
        />
      </motion.div>
    </motion.div>
  );
};

// MAIN COMPONENT

export const AnimatedInventory = ({ items, onItemClick, onItemDrop }: InventoryProps) => {
  const [reorderableItems, setReorderableItems] = useState(items);

  // Fill empty slots (8x6 grid = 48 slots)
  const slots = Array.from({ length: 48 }, (_, i) => {
    return reorderableItems[i] || null;
  });

  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl">
      {/* Header */}
      <motion.div
        className="mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white">Envanter</h2>
        <motion.div
          className="text-sm text-gray-400"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {items.length} / 48
        </motion.div>
      </motion.div>

      {/* Inventory Grid */}
      <motion.div
        className="grid grid-cols-8 gap-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {slots.map((item, index) => (
          <InventorySlot
            key={item?.id || `empty-${index}`}
            item={item}
            index={index}
            onClick={onItemClick}
          />
        ))}
      </motion.div>

      {/* Footer Actions */}
      <motion.div
        className="mt-6 flex gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className="flex-1 rounded-lg bg-red-600 py-2 font-semibold text-white"
          whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
          whileTap={{ scale: 0.95 }}
        >
          Sırala
        </motion.button>
        <motion.button
          className="flex-1 rounded-lg border-2 border-gray-600 py-2 font-semibold text-white"
          whileHover={{ scale: 1.05, borderColor: "#dc2626" }}
          whileTap={{ scale: 0.95 }}
        >
          Temizle
        </motion.button>
      </motion.div>
    </div>
  );
};

// EXAMPLE DATA

export const EXAMPLE_ITEMS: InventoryItem[] = [
  {
    id: "1",
    name: "Yeniçeri Kılıcı",
    rarity: "legendary",
    quantity: 1,
    icon: "⚔️",
    type: "weapon",
  },
  {
    id: "2",
    name: "Osmanlı Zırhı",
    rarity: "epic",
    quantity: 1,
    icon: "🛡️",
    type: "armor",
  },
  {
    id: "3",
    name: "Sağlık İksiri",
    rarity: "rare",
    quantity: 15,
    icon: "🧪",
    type: "consumable",
  },
  {
    id: "4",
    name: "Mana Kristali",
    rarity: "epic",
    quantity: 8,
    icon: "💎",
    type: "consumable",
  },
  {
    id: "5",
    name: "Demir Cevheri",
    rarity: "common",
    quantity: 99,
    icon: "⛏️",
    type: "material",
  },
  {
    id: "6",
    name: "Altın Sikke",
    rarity: "rare",
    quantity: 500,
    icon: "🪙",
    type: "material",
  },
  {
    id: "7",
    name: "Hilal Kolyesi",
    rarity: "legendary",
    quantity: 1,
    icon: "🌙",
    type: "armor",
  },
  {
    id: "8",
    name: "Yıldız Taşı",
    rarity: "epic",
    quantity: 3,
    icon: "⭐",
    type: "material",
  },
];
