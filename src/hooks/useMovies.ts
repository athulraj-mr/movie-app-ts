import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { fetchMovies } from '../services/movieApi';
import type { Movie } from '../types/movie';

export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMoviesData = async (query = ''): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await fetchMovies(query);
      console.log(data);
      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesData(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    errorMessage,
    movieList,
    isloading
  };
};