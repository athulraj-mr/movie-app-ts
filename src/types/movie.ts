export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  original_language: string;
  genre_ids?: number[];
  popularity: number;
  adult: boolean;
  video: boolean;
}

export interface MovieApiResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}