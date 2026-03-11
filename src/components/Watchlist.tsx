"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Trash2 } from "lucide-react";
import { Movie } from "@/lib/api";

interface WatchlistProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onRemoveMovie: (id: string) => void;
}

export default function Watchlist({ isOpen, onClose, movies, onRemoveMovie }: WatchlistProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Your Watchlist
                <span className="bg-green-500/20 text-green-400 text-sm py-0.5 px-2.5 rounded-full font-medium">
                  {movies.length}
                </span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 transition-colors"
                aria-label="Close watchlist"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {movies.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-neutral-500">
                  <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
                    <Star className="w-8 h-8 text-neutral-600" />
                  </div>
                  <p>Your watchlist is empty.<br/>Swipe right on some movies!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <AnimatePresence>
                    {movies.map((movie) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        key={movie.id}
                        className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-neutral-800"
                      >
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                          <p className="text-white font-medium text-sm line-clamp-2 leading-tight">
                            {movie.title}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-yellow-500 font-semibold flex-1">
                            <Star className="w-3 h-3 fill-yellow-500" />
                            {movie.rating}
                          </div>
                        </div>

                        {/* Remove Button Overlay */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveMovie(movie.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full text-neutral-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 z-10"
                          aria-label={`Remove ${movie.title} from watchlist`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
