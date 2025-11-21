import type { MovieApiResponse, Movie } from '../types/movie';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

export const fetchMovies = async (query: string = ''): Promise<MovieApiResponse> => {

  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data: MovieApiResponse = await response.json();
  return data;
};

export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  const endpoint = `${API_BASE_URL}/movie/${movieId}`;

  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  const data: Movie = await response.json();
  return data;
};