import { useParams, useNavigate, useLinkClickHandler } from 'react-router-dom';
import { useEffect, useState } from 'react';
import rating from '../assets/star.svg'
import type { Movie, Genre } from '../types/movie'
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

  const { title, vote_average, poster_path, release_date, original_language, overview, genres, adult } = movie;
  console.log(adult);
  return (
      <div>
        <div className="pattern" />

        <div className="wrapper">
          <button 
            onClick={() => navigate(-1)}
            className="btn"
          >
          <svg className="svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Movies
        </button>
        <div className='movie-detail-wrapper'>
          <div className='movie-cover'>
            <img 
                src={poster_path ? 
                    `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} 
                alt={title}
            />
          </div>
        </div>
        <div className='movie-detail-wrapper'>
          <div className='title-wrapper'>
            <h2 className='title'>{title}</h2>
          </div>
        </div>
        {genres && genres.length > 0 && (
          <div className="genre-container">
            {genres.map((genre: Genre) => (
              <span
                key={genre.id}
                className="genre"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
        <div className='details'>
          <div className='rating'>
              <img src={rating} alt="Star Icon" />
              <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span className='dot'>•</span>
          <p className='lang'>{original_language.toUpperCase()}</p>
          <span className='dot'>•</span>
          <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          <span className='dot'>•</span>
          <p className={`adult ${adult ? 'text-red-500' : 'text-green-500'}`}>
            {adult ? 'R-Rated' : 'PG'}
          </p>
        </div>
        <div className='detail-text-container'>
          <p className='text-white'>{overview}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails