"use client";

/**
 * LOADING ANIMATIONS - Spinners, Skeletons, Progress
 * Turkish-themed loading states
 */

import { motion } from "framer-motion";
import { progressInteractions, skeletonPulse } from "@/lib/animations/micro-interactions";

// TURKISH CRESCENT SPINNER

export const CrescentSpinner = ({ size = 40, color = "#dc2626" }) => {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          fill={color}
          opacity={0.8}
        />
        <motion.path
          d="M12 2l1.5 4.5L18 8l-4 3 1 5-5-3-5 3 1-5-4-3 4.5-1.5L12 2z"
          fill="#fbbf24"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
};

// TURKISH STAR SPINNER

export const StarSpinner = ({ size = 40 }) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 top-1/2"
          style={{
            width: size / 5,
            height: size / 5,
            backgroundColor: "#dc2626",
            borderRadius: "50%",
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.5, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            },
          }}
          initial={{
            x: Math.cos((index * 2 * Math.PI) / 5) * (size / 3),
            y: Math.sin((index * 2 * Math.PI) / 5) * (size / 3),
          }}
        />
      ))}
    </div>
  );
};

// DOTS SPINNER

export const DotsSpinner = ({ color = "#dc2626" }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.15,
          }}
        />
      ))}
    </div>
  );
};

// PAGE LOADER (Full Screen)

export const PageLoader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Crescent + Star */}
      <motion.div
        className="relative mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          {/* Crescent */}
          <motion.path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="#dc2626"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Star */}
          <motion.path
            d="M12 2l1.5 4.5L18 8l-4 3 1 5-5-3-5 3 1-5-4-3 4.5-1.5L12 2z"
            fill="#fbbf24"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="mb-4 text-2xl font-bold text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Yükleniyor...
      </motion.div>

      {/* Progress bar */}
      <div className="h-2 w-64 overflow-hidden rounded-full bg-slate-700">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-red-400"
          animate={{
            x: ["-100%", "400%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Percentage counter */}
      <motion.div
        className="mt-4 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Türk Dijital Metropol
      </motion.div>
    </motion.div>
  );
};

// PROGRESS BAR

export interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  color?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export const ProgressBar = ({
  progress,
  height = 8,
  color = "#dc2626",
  showLabel = true,
  animated = true,
}: ProgressBarProps) => {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-2 flex justify-between text-sm text-gray-600">
          <span>İlerleme</span>
          <motion.span
            key={progress}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-bold"
            style={{ color }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      )}

      <div
        className="overflow-hidden rounded-full bg-gray-200"
        style={{ height }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: color,
            background: animated
              ? `linear-gradient(90deg, ${color}dd 0%, ${color} 50%, ${color}dd 100%)`
              : color,
            backgroundSize: animated ? "200% 100%" : "100% 100%",
          }}
          initial={{ width: 0 }}
          animate={{
            width: `${progress}%`,
            ...(animated && {
              backgroundPosition: ["0% 0%", "200% 0%"],
            }),
          }}
          transition={{
            width: { duration: 0.5, ease: "easeOut" },
            backgroundPosition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      </div>
    </div>
  );
};

// SKELETON LOADER

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export const Skeleton = ({
  width = "100%",
  height = "1rem",
  className = "",
  variant = "rectangular",
}: SkeletonProps) => {
  const getShape = () => {
    switch (variant) {
      case "circular":
        return "rounded-full";
      case "text":
        return "rounded";
      default:
        return "rounded-lg";
    }
  };

  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${getShape()} ${className}`}
      style={{
        width,
        height,
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "200% 0%"],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// SKELETON CARD (Game Character)

export const SkeletonCard = () => {
  return (
    <div className="overflow-hidden rounded-xl bg-white p-6 shadow-lg">
      {/* Image */}
      <Skeleton height="12rem" className="mb-4" />

      {/* Title */}
      <Skeleton height="1.5rem" width="60%" className="mb-3" />

      {/* Stats */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <Skeleton height="0.75rem" width="40%" className="mb-1" />
            <Skeleton height="0.5rem" />
          </div>
        ))}
      </div>
    </div>
  );
};

// PULSE LOADER

export const PulseLoader = ({ size = 60, color = "#dc2626" }) => {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
          }}
          animate={{
            scale: [1, 2, 2],
            opacity: [0.6, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.4,
          }}
        />
      ))}
      <div
        className="relative z-10 rounded-full"
        style={{
          width: size / 3,
          height: size / 3,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

// SPINNER OVERLAY

export const SpinnerOverlay = ({ message = "Yükleniyor..." }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CrescentSpinner size={60} />
      <motion.p
        className="mt-4 text-lg font-semibold text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};
