"use client";

import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Movie } from "@/lib/mock-data";
import { Star, Clock } from "lucide-react";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  active: boolean;
}

export default function MovieCard({ movie, onSwipeLeft, onSwipeRight, active }: MovieCardProps) {
  const [exitX, setExitX] = useState<number>(0);
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Map the drag x position to a rotation and opacity to give a swiping effect
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Stamp indicators
  const likeOpacity = useTransform(x, [10, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-10, -100], [0, 1]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      setExitX(300);
      onSwipeRight();
    } else if (info.offset.x < -threshold) {
      setExitX(-300);
      onSwipeLeft();
    } else {
      controls.start({ x: 0, rotate: 0 }); // snap back
    }
  };

  return (
    <motion.div
      className="absolute top-0 w-full h-full rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing bg-gray-900 border border-neutral-800"
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, rotate, opacity }}
      exit={{
        x: exitX,
        opacity: 0,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 1.02 }}
    >
      <div className="relative w-full h-full">
        {/* Background Poster */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.posterUrl})` }}
        >
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 w-full p-6 text-white flex flex-col gap-2">
          <div className="flex justify-between items-end gap-4">
            <h2 className="text-3xl font-bold tracking-tight leading-tight">
              {movie.title}
            </h2>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-neutral-300 font-medium">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>{movie.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span>{movie.releaseYear}</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-neutral-800 border border-neutral-700 text-xs">
              {movie.genres[0]}
            </span>
          </div>

          <p className="mt-2 text-sm text-neutral-400 line-clamp-3">
            {movie.description}
          </p>
        </div>

        {/* Swiping Stamps */}
        {active && (
          <>
            <motion.div 
              className="absolute top-10 right-10 border-4 border-green-500 text-green-500 font-bold text-4xl rounded-xl px-4 py-2 rotate-12 bg-black/40 backdrop-blur-md"
              style={{ opacity: likeOpacity }}
            >
              WATCH
            </motion.div>
            <motion.div 
              className="absolute top-10 left-10 border-4 border-red-500 text-red-500 font-bold text-4xl rounded-xl px-4 py-2 -rotate-12 bg-black/40 backdrop-blur-md"
              style={{ opacity: nopeOpacity }}
            >
              SKIP
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
