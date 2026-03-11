import { NextResponse } from 'next/server';

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

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

// Map TMDB genre IDs to strings
const genreMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export async function GET() {
  if (!TMDB_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'TMDB_ACCESS_TOKEN is not configured in the environment variables.' },
      { status: 500 }
    );
  }

  try {
    // Determine if it's a v3 API Key (32 chars) or a v4 Access Token (JWT)
    const isV3Key = TMDB_ACCESS_TOKEN.length < 50; // v4 tokens are very long JWTs
    const apiKeyParam = isV3Key ? `&api_key=${TMDB_ACCESS_TOKEN}` : '';
    
    // Fetch popular movies from TMDB
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1${apiKeyParam}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        // Only add the Bearer token if it's NOT a v3 key
        ...(isV3Key ? {} : { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` })
      },
      // Cache the response for 1 hour to prevent hitting rate limits
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      throw new Error(`TMDB API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Map TMDB results to our Movie interface
    const movies: Movie[] = data.results.map((tmdbMovie: any) => {
      // Get human-readable genres
      const genres = tmdbMovie.genre_ids
        .map((id: number) => genreMap[id])
        .filter(Boolean); // fallback if genre not found

      // Construct the poster URL
      // Best practice: Use 'w500' for list/card views, not 'original' 
      const posterUrl = tmdbMovie.poster_path 
        ? `${TMDB_IMAGE_BASE_URL}/w500${tmdbMovie.poster_path}`
        : ''; // In a real app, you might provide a local fallback placeholder image URL here

      return {
        id: tmdbMovie.id.toString(), // TMDB returns IDs as numbers, but our app expects string
        title: tmdbMovie.title,
        posterUrl,
        description: tmdbMovie.overview,
        // Round to 1 decimal place (e.g., 8.5)
        rating: Math.round(tmdbMovie.vote_average * 10) / 10,
        // Extract just the year from "YYYY-MM-DD"
        releaseYear: tmdbMovie.release_date ? parseInt(tmdbMovie.release_date.substring(0, 4)) : 0, 
        genres: genres.length > 0 ? genres : ["Unknown"]
      };
    });

    // Return the formatted movies
    return NextResponse.json(movies);

  } catch (error) {
    console.error("Error fetching movies from TMDB:", error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
