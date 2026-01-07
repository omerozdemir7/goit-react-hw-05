import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await searchMovies(query);
        setMovies(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newQuery = form.elements.query.value.trim();
    
    if (newQuery === "") {
      return;
    }
    setSearchParams({ query: newQuery });
    form.reset();
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input 
          type="text" 
          name="query" 
          placeholder="Search movies..." 
          className={css.input}
        />
        <button type="submit" className={css.button}>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}