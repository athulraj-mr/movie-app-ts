import rating from '../assets/star.svg'
import type { Movie } from '../types/movie'

interface MovieCardProps {
    movie: Movie
}

const MovieCard = ({movie}: MovieCardProps) => {
    const {title, vote_average, poster_path, release_date, original_language} = movie

    return (
        <div>
            <div className='movie-card'>
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
    )
}

export default MovieCard