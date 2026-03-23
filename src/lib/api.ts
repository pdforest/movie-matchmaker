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

if (typeof window !== "undefined") {
  try {
    const storedMovies = localStorage.getItem("matchmaker_saved");
    if (storedMovies) savedMovies = JSON.parse(storedMovies);

    const storedDismissed = localStorage.getItem("matchmaker_dismissed");
    if (storedDismissed) dismissedMovieIds = JSON.parse(storedDismissed);
  } catch (error) {
    console.error("Failed to parse local storage data:", error);
  }
}

const persist = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("matchmaker_saved", JSON.stringify(savedMovies));
    localStorage.setItem("matchmaker_dismissed", JSON.stringify(dismissedMovieIds));
  }
};

export function saveMovie(movie: Movie) {
  if (!savedMovies.some(m => m.id === movie.id)) {
    savedMovies.push(movie);
    persist();
  }
}

export function removeMovie(id: string) {
  savedMovies = savedMovies.filter(savedMovie => savedMovie.id !== id);
  persist();
}

export function dismissMovie(id: string) {
  if (!dismissedMovieIds.includes(id)) {
    dismissedMovieIds.push(id);
    persist();
  }
}

export function getSavedMovies(): Movie[] {
  return [...savedMovies];
}

// Clear state for easy resetting
export function clearState() {
  savedMovies = [];
  dismissedMovieIds = [];
  persist();
}
