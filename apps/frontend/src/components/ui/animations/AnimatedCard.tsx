"use client";

/**
 * ANIMATED CARD - 3D Tilt + Hover Effects
 * Premium card component with elite interactions
 */

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cardInteractions } from "@/lib/animations/micro-interactions";

// TYPES

export interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "3d" | "glow" | "lift";
  intensity?: number; // 3D tilt intensity (0-1)
  glowColor?: string;
  onClick?: () => void;
}

// COMPONENT

export const AnimatedCard = ({
  children,
  className = "",
  variant = "default",
  intensity = 0.5,
  glowColor = "#dc2626",
  onClick,
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15 * intensity, -15 * intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15 * intensity, 15 * intensity]), {
    stiffness: 300,
    damping: 30,
  });

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant !== "3d") return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(percentX);
    mouseY.set(percentY);
  };

  const handleMouseLeave = () => {
    if (variant !== "3d") return;
    mouseX.set(0);
    mouseY.set(0);
  };

  // Base styles
  const baseStyles = `relative overflow-hidden rounded-xl bg-white p-6 shadow-lg ${className}`;

  // Variant-specific animations
  const getAnimationProps = () => {
    switch (variant) {
      case "3d":
        return {
          style: {
            transformStyle: "preserve-3d" as const,
            rotateX,
            rotateY,
          },
          whileHover: { scale: 1.05 },
          transition: { duration: 0.2 },
        };

      case "glow":
        return cardInteractions.borderGlow;

      case "lift":
        return cardInteractions.lift;

      default:
        return {
          whileHover: { y: -4 },
          transition: { duration: 0.2 },
        };
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={baseStyles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...getAnimationProps()}
    >
      {/* Glow overlay for 3D variant */}
      {variant === "3d" && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0"
          style={{
            background: `radial-gradient(circle at ${mouseX.get() * 50 + 50}% ${mouseY.get() * 50 + 50}%, ${glowColor}40, transparent 50%)`,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Shine effect on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        initial={{ x: "-100%" }}
        whileHover={{
          x: "100%",
          opacity: 0.2,
          transition: { duration: 0.8, ease: "easeInOut" },
        }}
      />

      {/* Content */}
      <div
        style={{
          transform: variant === "3d" ? "translateZ(50px)" : undefined,
        }}
      >
        {children}
      </div>

      {/* Border glow for glow variant */}
      {variant === "glow" && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            border: `2px solid ${glowColor}`,
            boxShadow: `0 0 20px ${glowColor}40`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

// PRESET CARDS

export const Card3D = (props: Omit<AnimatedCardProps, "variant">) => (
  <AnimatedCard variant="3d" intensity={0.7} {...props} />
);

export const CardGlow = (props: Omit<AnimatedCardProps, "variant">) => (
  <AnimatedCard variant="glow" {...props} />
);

export const CardLift = (props: Omit<AnimatedCardProps, "variant">) => (
  <AnimatedCard variant="lift" {...props} />
);

// GAME CHARACTER CARD (Turkish-themed)

export interface CharacterCardProps {
  name: string;
  level: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  image: string;
  stats: { label: string; value: number }[];
  onClick?: () => void;
}

export const CharacterCard = ({
  name,
  level,
  rarity,
  image,
  stats,
  onClick,
}: CharacterCardProps) => {
  const rarityColors = {
    common: "#9ca3af",
    rare: "#3b82f6",
    epic: "#a855f7",
    legendary: "#f59e0b",
  };

  const rarityGlow = {
    common: "0 0 10px rgba(156, 163, 175, 0.3)",
    rare: "0 0 20px rgba(59, 130, 246, 0.5)",
    epic: "0 0 30px rgba(168, 85, 247, 0.6)",
    legendary: "0 0 40px rgba(245, 158, 11, 0.8)",
  };

  return (
    <AnimatedCard
      variant="3d"
      intensity={0.8}
      glowColor={rarityColors[rarity]}
      onClick={onClick}
      className="bg-gradient-to-br from-slate-800 to-slate-900"
    >
      {/* Rarity glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-20"
        style={{
          boxShadow: rarityGlow[rarity],
          backgroundColor: rarityColors[rarity],
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Character Image */}
      <motion.div
        className="relative mb-4 overflow-hidden rounded-lg"
        whileHover={{ scale: 1.05 }}
        style={{ transform: "translateZ(75px)" }}
      >
        <img src={image} alt={name} className="h-48 w-full object-cover" />

        {/* Level badge */}
        <motion.div
          className="absolute right-2 top-2 rounded-full bg-black/50 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          Lv {level}
        </motion.div>

        {/* Rarity indicator */}
        <motion.div
          className="absolute bottom-2 left-2 rounded-full px-3 py-1 text-xs font-bold uppercase"
          style={{
            backgroundColor: rarityColors[rarity],
            color: "white",
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {rarity}
        </motion.div>
      </motion.div>

      {/* Name */}
      <motion.h3
        className="mb-3 text-xl font-bold text-white"
        style={{ transform: "translateZ(50px)" }}
      >
        {name}
      </motion.h3>

      {/* Stats */}
      <motion.div
        className="space-y-2"
        style={{ transform: "translateZ(40px)" }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-gray-400">{stat.label}</span>
              <span className="font-bold text-white">{stat.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-700">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${rarityColors[rarity]}, ${rarityColors[rarity]}dd)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${stat.value}%` }}
                transition={{ delay: 0.2 * index, duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedCard>
  );
};
