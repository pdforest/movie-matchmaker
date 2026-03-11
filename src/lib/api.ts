// Define the Movie interface matching what the app expects
export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  description: string;
  rating: number;
  releaseYear: number;
  genres: string[];
}

export async function fetchMovies(): Promise<Movie[]> {
  try {
    const response = await fetch('/api/movies');
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies from API:", error);
    return []; // Return an empty array on failure
  }
}

// Simple in-memory save/dismiss tracking for demonstration
// Realistic apps would use local storage, a real DB, or React context
let savedMovies: Movie[] = [];
let dismissedMovieIds: string[] = [];

// Notice we changed saveMovie to accept the WHOLE Movie object 
// because we don't have the mockMovies array to pull from anymore.
export function saveMovie(movie: Movie) {
  if (!savedMovies.some(m => m.id === movie.id)) {
    savedMovies.push(movie);
  }
}

export function removeMovie(id: string) {
  savedMovies = savedMovies.filter(savedMovie => savedMovie.id !== id);
}

export function dismissMovie(id: string) {
  if (!dismissedMovieIds.includes(id)) {
    dismissedMovieIds.push(id);
  }
}

export function getSavedMovies(): Movie[] {
  return [...savedMovies];
}

// Clear state for easy resetting
export function clearState() {
  savedMovies = [];
  dismissedMovieIds = [];
}
