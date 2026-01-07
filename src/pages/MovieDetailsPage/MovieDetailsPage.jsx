import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails, getImageUrl } from "../../api/tmdb-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  
  // Geri dönülecek konumu kaydediyoruz. Eğer yoksa '/movies' varsayılan olur.
  const backLinkHref = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [movieId]);

  if (loading) return <div>Loading details...</div>;
  if (error) return <div>Error loading movie details.</div>;
  if (!movie) return null;

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown";
  const userScore = Math.round(movie.vote_average * 10);

  return (
    <div className={css.container}>
      <Link to={backLinkHref.current} className={css.goBack}>
        ← Go back
      </Link>

      <div className={css.movieInfo}>
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title} 
          className={css.poster}
        />
        <div className={css.details}>
          <h1>{movie.title} ({releaseYear})</h1>
          <p>User Score: {userScore}%</p>
          
          <h3>Overview</h3>
          <p>{movie.overview}</p>

          <h3>Genres</h3>
          <p>{movie.genres.map(g => g.name).join(", ")}</p>
        </div>
      </div>

      <div className={css.additional}>
        <h3>Additional Information</h3>
        <ul className={css.linkList}>
          <li><Link to="cast" className={css.link}>Cast</Link></li>
          <li><Link to="reviews" className={css.link}>Reviews</Link></li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading sub-component...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}