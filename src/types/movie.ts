export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  original_language: string;
  original_title: string;
  genre_ids?: number[];
  genres?: Genre[];
  popularity: number;
  adult: boolean;
  video: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieApiResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}