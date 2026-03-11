"use client";

import { useEffect, useState } from "react";
import { Film, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MovieCard from "@/components/MovieCard";
import ActionButtons from "@/components/ActionButtons";
import Watchlist from "@/components/Watchlist";
import { fetchMovies, saveMovie, dismissMovie, getSavedMovies, removeMovie, Movie } from "@/lib/api";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [updateTick, setUpdateTick] = useState(0);
  
  // Track history for undo functionality
  const [history, setHistory] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    if (movies.length === 0) return;

    const currentMovie = movies[movies.length - 1];
    
    // Save to history for undo
    setHistory((prev) => [...prev, currentMovie]);

    if (direction === "right") {
      saveMovie(currentMovie.id);
    } else {
      dismissMovie(currentMovie.id);
    }

    // Remove from active stack
    setMovies((prev) => prev.slice(0, -1));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    
    const lastMovie = history[history.length - 1];
    
    // In a real app we'd also reverse the save/dismiss status in the backend
    setMovies((prev) => [...prev, lastMovie]);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleRemoveMovie = (id: string) => {
    removeMovie(id);
    // Trigger a re-render so getSavedMovies() picks up the change
    setUpdateTick(prev => prev + 1);
  };

  const activeMovie = movies[movies.length - 1];
  const savedMoviesList = getSavedMovies();

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden font-sans">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-gradient-to-br from-red-500 to-orange-600 p-2 rounded-xl shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
            <Film className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            Matchmaker
          </h1>
        </div>
        
        <button 
          onClick={() => setWatchlistOpen(true)}
          className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors shadow-lg relative"
        >
          <Menu className="w-6 h-6" />
          {savedMoviesList.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-neutral-900">
              {savedMoviesList.length}
            </span>
          )}
        </button>
      </header>

      {/* Main Discover Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 pb-8 relative z-0">
        <div className="relative w-full aspect-[2/3] max-h-[70vh] flex items-center justify-center perspective-[1000px]">
          {loading ? (
            <div className="animate-pulse flex flex-col items-center gap-4 text-neutral-500">
              <div className="w-12 h-12 border-4 border-neutral-800 border-t-red-500 rounded-full animate-spin" />
              <p className="font-medium animate-pulse">Finding perfect matches...</p>
            </div>
          ) : movies.length > 0 ? (
            <AnimatePresence>
              {movies.map((movie, index) => {
                const isTop = index === movies.length - 1;
                // Render only top 2 cards for performance and clean look
                if (index < movies.length - 2) return null;
                
                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    active={isTop}
                    onSwipeLeft={() => handleSwipe("left")}
                    onSwipeRight={() => handleSwipe("right")}
                  />
                );
              })}
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl w-full h-full shadow-2xl">
              <Film className="w-16 h-16 text-neutral-700 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">You're all caught up!</h2>
              <p className="text-neutral-400">
                You've reviewed all the movies. Check your watchlist or come back later for more.
              </p>
            </div>
          )}
        </div>

        <ActionButtons 
          onSwipeLeft={() => handleSwipe("left")}
          onSwipeRight={() => handleSwipe("right")}
          onUndo={handleUndo}
          onInfo={() => {
            if (activeMovie) setInfoOpen(true);
          }}
          disabled={movies.length === 0 || loading}
        />
      </div>

      <Watchlist 
        isOpen={watchlistOpen} 
        onClose={() => setWatchlistOpen(false)} 
        movies={savedMoviesList}
        onRemoveMovie={handleRemoveMovie}
      />

      {/* Info Modal */}
      <AnimatePresence>
        {infoOpen && activeMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setInfoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative"
            >
              <div className="relative h-64 w-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeMovie.posterUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                <button
                  onClick={() => setInfoOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-md transition-colors shadow-lg z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{activeMovie.title}</h2>
                <div className="flex items-center gap-3 text-sm text-neutral-300 mb-4 flex-wrap">
                  <span className="flex items-center gap-1 text-yellow-500 font-medium">
                    ★ {activeMovie.rating}
                  </span>
                  <span>•</span>
                  <span>{activeMovie.releaseYear}</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-xs text-neutral-400">
                    {activeMovie.genres.join(", ")}
                  </span>
                </div>
                <p className="text-neutral-300 leading-relaxed text-sm">
                  {activeMovie.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
