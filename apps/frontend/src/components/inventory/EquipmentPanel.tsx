/**
 * ANADOLU REALM - Equipment Panel Component
 * Character equipment display with stats
 */

'use client';

import { motion } from 'framer-motion';
import { useDrop } from 'react-dnd';
import {
  Sword, Shield, Crown, Shirt, ListOrdered,
  Heart, Zap, Activity, Target, TrendingUp
} from 'lucide-react';
import { Equipment, EquipmentSlot, Item, ItemStats } from '@/lib/inventory/InventorySystem';

interface EquipmentSlotProps {
  slot: EquipmentSlot;
  item: Item | null;
  label: string;
  icon: React.ReactNode;
  onEquip?: (item: Item) => void;
  onUnequip?: () => void;
}

function EquipmentSlotComponent({
  slot,
  item,
  label,
  icon,
  onEquip,
  onUnequip
}: EquipmentSlotProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'INVENTORY_ITEM',
    canDrop: (draggedItem: any) => {
      return draggedItem.item?.equipmentSlot === slot;
    },
    drop: (draggedItem: any) => {
      if (draggedItem.item) {
        onEquip?.(draggedItem.item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver() && monitor.canDrop()
    })
  });

  return (
    <div
      ref={drop}
      className={`relative w-20 h-20 rounded-lg border-2 ${
        item ? 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)]' : 'border-gray-600'
      } ${
        isOver ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] scale-105' : ''
      } bg-gradient-to-br ${
        item ? 'from-yellow-900/30 to-orange-900/30' : 'from-gray-900/50 to-gray-800/50'
      } backdrop-blur-sm transition-all cursor-pointer`}
      onClick={() => item && onUnequip?.()}
    >
      {/* Slot Icon */}
      {!item && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          {icon}
        </div>
      )}

      {/* Item */}
      {item && (
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          {getItemIcon(item)}
        </div>
      )}

      {/* Label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70 whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

export default function EquipmentPanel({
  equipment,
  totalStats,
  onEquip,
  onUnequip,
  characterLevel = 1,
  className = ''
}: {
  equipment: Equipment;
  totalStats: ItemStats;
  onEquip?: (slot: EquipmentSlot, item: Item) => void;
  onUnequip?: (slot: EquipmentSlot) => void;
  characterLevel?: number;
  className?: string;
}) {
  const slots: Array<{
    slot: EquipmentSlot;
    label: string;
    icon: React.ReactNode;
    position: string;
  }> = [
    {
      slot: EquipmentSlot.HELMET,
      label: 'Başlık',
      icon: <Crown className="w-8 h-8" />,
      position: 'col-start-2'
    },
    {
      slot: EquipmentSlot.NECKLACE,
      label: 'Kolye',
      icon: <Activity className="w-6 h-6" />,
      position: 'col-start-1 row-start-2'
    },
    {
      slot: EquipmentSlot.CHEST,
      label: 'Gövde',
      icon: <Shirt className="w-8 h-8" />,
      position: 'col-start-2 row-start-2'
    },
    {
      slot: EquipmentSlot.WEAPON,
      label: 'Silah',
      icon: <Sword className="w-8 h-8" />,
      position: 'col-start-3 row-start-2'
    },
    {
      slot: EquipmentSlot.GLOVES,
      label: 'Eldivenler',
      icon: <ListOrdered className="w-6 h-6" />,
      position: 'col-start-1 row-start-3'
    },
    {
      slot: EquipmentSlot.LEGS,
      label: 'Bacaklar',
      icon: <ListOrdered className="w-7 h-7" />,
      position: 'col-start-2 row-start-3'
    },
    {
      slot: EquipmentSlot.OFFHAND,
      label: 'Kalkan',
      icon: <Shield className="w-8 h-8" />,
      position: 'col-start-3 row-start-3'
    },
    {
      slot: EquipmentSlot.RING1,
      label: 'Yüzük 1',
      icon: <Target className="w-5 h-5" />,
      position: 'col-start-1 row-start-4'
    },
    {
      slot: EquipmentSlot.BOOTS,
      label: 'Botlar',
      icon: <TrendingUp className="w-6 h-6" />,
      position: 'col-start-2 row-start-4'
    },
    {
      slot: EquipmentSlot.RING2,
      label: 'Yüzük 2',
      icon: <Target className="w-5 h-5" />,
      position: 'col-start-3 row-start-4'
    }
  ];

  return (
    <div className={`bg-black/80 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 shadow-2xl ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-black text-white">Ekipman</h2>
        <div className="ml-auto text-sm text-white/70">
          Seviye: <span className="text-yellow-400 font-bold">{characterLevel}</span>
        </div>
      </div>

      {/* Equipment Slots Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {slots.map(({ slot, label, icon, position }) => (
          <div key={slot} className={position}>
            <EquipmentSlotComponent
              slot={slot}
              item={equipment[slot]}
              label={label}
              icon={icon}
              onEquip={(item) => onEquip?.(slot, item)}
              onUnequip={() => onUnequip?.(slot)}
            />
          </div>
        ))}
      </div>

      {/* Total Stats */}
      <div className="border-t-2 border-white/20 pt-4">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-400" />
          Toplam İstatistikler
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Attack */}
          {totalStats.attack !== undefined && totalStats.attack > 0 && (
            <div className="flex items-center justify-between bg-red-900/20 rounded-lg px-3 py-2 border border-red-500/30">
              <div className="flex items-center gap-2">
                <Sword className="w-4 h-4 text-red-400" />
                <span className="text-sm text-white/80">Saldırı</span>
              </div>
              <span className="text-sm font-bold text-red-400">+{totalStats.attack}</span>
            </div>
          )}

          {/* Defense */}
          {totalStats.defense !== undefined && totalStats.defense > 0 && (
            <div className="flex items-center justify-between bg-cyan-900/20 rounded-lg px-3 py-2 border border-cyan-500/30">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white/80">Savunma</span>
              </div>
              <span className="text-sm font-bold text-cyan-400">+{totalStats.defense}</span>
            </div>
          )}

          {/* Health */}
          {totalStats.health !== undefined && totalStats.health > 0 && (
            <div className="flex items-center justify-between bg-green-900/20 rounded-lg px-3 py-2 border border-green-500/30">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/80">Can</span>
              </div>
              <span className="text-sm font-bold text-green-400">+{totalStats.health}</span>
            </div>
          )}

          {/* Stamina */}
          {totalStats.stamina !== undefined && totalStats.stamina > 0 && (
            <div className="flex items-center justify-between bg-yellow-900/20 rounded-lg px-3 py-2 border border-yellow-500/30">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white/80">Dayanıklılık</span>
              </div>
              <span className="text-sm font-bold text-yellow-400">+{totalStats.stamina}</span>
            </div>
          )}

          {/* Crit Chance */}
          {totalStats.critChance !== undefined && totalStats.critChance > 0 && (
            <div className="flex items-center justify-between bg-orange-900/20 rounded-lg px-3 py-2 border border-orange-500/30">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-white/80">Kritik Şans</span>
              </div>
              <span className="text-sm font-bold text-orange-400">+{(totalStats.critChance * 100).toFixed(0)}%</span>
            </div>
          )}

          {/* Crit Damage */}
          {totalStats.critDamage !== undefined && totalStats.critDamage > 0 && (
            <div className="flex items-center justify-between bg-purple-900/20 rounded-lg px-3 py-2 border border-purple-500/30">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/80">Kritik Hasar</span>
              </div>
              <span className="text-sm font-bold text-purple-400">+{(totalStats.critDamage * 100).toFixed(0)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Power Score */}
      <motion.div
        className="mt-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/80">Güç Skoru</span>
          <span className="text-2xl font-black text-yellow-400">
            {calculatePowerScore(totalStats)}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// Helper function
function getItemIcon(item: Item): string {
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

function calculatePowerScore(stats: ItemStats): number {
  let score = 0;

  score += (stats.attack || 0) * 2;
  score += (stats.defense || 0) * 1.5;
  score += (stats.health || 0) * 0.1;
  score += (stats.critChance || 0) * 500;
  score += (stats.critDamage || 0) * 100;

  return Math.floor(score);
}
