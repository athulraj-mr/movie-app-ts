export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date?: string;
    vote_average?: number;
    original_language: string;
}

export interface MovieApiResponse {
  results: Movie[];
}