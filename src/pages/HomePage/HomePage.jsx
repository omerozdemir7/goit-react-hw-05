import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending Today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}