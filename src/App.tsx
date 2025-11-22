import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import { useMovies } from './hooks/useMovies';
import hero from '../public/hero.png'


const App = () => {

  const { searchTerm, setSearchTerm, errorMessage, movieList, isloading } = useMovies();

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <main>
            <div className='pattern' />

            <div className='wrapper'>
              <header>
                <img src={hero} alt="Hero Banner" />
                <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
              </header>

              <section className='all-movies'>
                <h2 className='mt-10'>All Movies</h2>

                {isloading ? (
                  <Spinner />
                ): errorMessage ? (
                  <p className='text-red-500'>{errorMessage}</p>
                ): (
                  <ul>
                    {movieList.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </main>
        } />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  )
}
export default App