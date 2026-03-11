import { Movie, mockMovies } from './mock-data';
export type { Movie } from './mock-data';
export { mockMovies } from './mock-data';

// Simulate an API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchMovies(): Promise<Movie[]> {
  await delay(800); // simulate network latency
  // In a real app, this would be an API call, we just shuffle the mock data
  return [...mockMovies].sort(() => Math.random() - 0.5);
}

// Simple in-memory save/dismiss tracking for demonstration
// Realistic apps would use local storage, a real DB, or React context
let savedMovieIds: string[] = [];
let dismissedMovieIds: string[] = [];

export function saveMovie(id: string) {
  if (!savedMovieIds.includes(id)) {
    savedMovieIds.push(id);
  }
}

export function removeMovie(id: string) {
  savedMovieIds = savedMovieIds.filter(savedId => savedId !== id);
}

export function dismissMovie(id: string) {
  if (!dismissedMovieIds.includes(id)) {
    dismissedMovieIds.push(id);
  }
}

export function getSavedMovies(): Movie[] {
  return mockMovies.filter((movie) => savedMovieIds.includes(movie.id));
}

// Clear state for easy resetting
export function clearState() {
  savedMovieIds = [];
  dismissedMovieIds = [];
}
