"use client";

import { X, Heart, Info, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface ActionButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onUndo?: () => void;
  onInfo?: () => void;
  disabled: boolean;
}

export default function ActionButtons({ onSwipeLeft, onSwipeRight, onUndo, onInfo, disabled }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-6 pb-6 w-full max-w-sm mx-auto">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onUndo}
        disabled={disabled}
        className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-yellow-500/20 transition-all"
        aria-label="Undo"
      >
        <RotateCcw className="w-5 h-5" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onSwipeLeft}
        disabled={disabled}
        className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/20 transition-all"
        aria-label="Skip"
      >
        <X className="w-8 h-8" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onSwipeRight}
        disabled={disabled}
        className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-green-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/20 transition-all"
        aria-label="Watchlist"
      >
        <Heart className="w-8 h-8 fill-green-500/20" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onInfo}
        disabled={disabled}
        className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-400/20 transition-all"
        aria-label="Info"
      >
        <Info className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
