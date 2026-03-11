export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  description: string;
  rating: number;
  releaseYear: number;
  genres: string[];
}

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Dune: Part Two",
    posterUrl: "https://www.themoviedb.org/t/p/w1280/slwFDA9o1awomwnTV1biDSQX4Dl.jpg",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    rating: 8.8,
    releaseYear: 2024,
    genres: ["Sci-Fi", "Adventure"]
  },
  {
    id: "2",
    title: "Oppenheimer",
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    description: "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
    rating: 8.6,
    releaseYear: 2023,
    genres: ["Drama", "History"]
  },
  {
    id: "3",
    title: "Spider-Man: Across the Spider-Verse",
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    rating: 8.7,
    releaseYear: 2023,
    genres: ["Animation", "Action"]
  },
  {
    id: "4",
    title: "John Wick: Chapter 4",
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.",
    rating: 7.7,
    releaseYear: 2023,
    genres: ["Action", "Thriller"]
  },
  {
    id: "5",
    title: "The Batman",
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    rating: 7.8,
    releaseYear: 2022,
    genres: ["Action", "Crime"]
  },
  {
    id: "6",
    title: "Interstellar",
    posterUrl: "https://www.themoviedb.org/t/p/w1280/bzONet3OeCTz5q9WOkGjVpOHMSR.jpg",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    releaseYear: 2014,
    genres: ["Sci-Fi", "Drama"]
  },
  {
    id: "7",
    title: "Everything Everywhere All at Once",
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    description: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes.",
    rating: 8.0,
    releaseYear: 2022,
    genres: ["Action", "Comedy", "Sci-Fi"]
  },
  {
    id: "8",
    title: "Blade Runner 2049",
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    rating: 8.0,
    releaseYear: 2017,
    genres: ["Sci-Fi", "Thriller"]
  }
];
