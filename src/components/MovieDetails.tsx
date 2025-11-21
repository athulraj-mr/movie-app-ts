import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import rating from '../assets/star.svg'
import type { Movie } from '../types/movie'
import { fetchMovieDetails } from '../services/movieApi';
import Spinner from './Spinner';


const MovieDetails = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  
    const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!id) {
        setError('Movie ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const movieData = await fetchMovieDetails(parseInt(id));
        setMovie(movieData);
      } catch (err) {
        setError('Failed to load movie details');
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="wrapper">
        <Spinner />
      </div>
    );
  }

 if (error || !movie) {
    return (
      <div className="wrapper">
          <p className="text-red-500 text-xl mb-4">Movie not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
      </div>
    );
  }

  const { title, vote_average, poster_path, release_date, original_language } = movie;

  return (
      <div>
        <div className="pattern" />

        <div className="wrapper">
          <button 
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-white hover:text-blue-300 transition-colors"
          >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Movies
        </button>
        <div className='movie-detail-wrapper'>
          <div className='movie-details'>
            <img 
                src={poster_path ? 
                    `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} 
                alt={title}
            />
          </div>
          <div className='mt-4'>
            <h3 className='text-white'>{title}</h3>
            <div className='content flex'>
              <div className='rating flex'>
                  <img src={rating} alt="Star Icon" className='pr-1'/>
                  <p className='text-white pr-1'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
              </div>
              <span className='text-white pr-1'>•</span>
              <p className='lang text-white pr-1'>{original_language.toUpperCase()}</p>
              <span className='text-white pr-1'>•</span>
              <p className='year text-white pr-1'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
  )
}

export default MovieDetails