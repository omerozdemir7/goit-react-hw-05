import { Link, useLocation } from "react-router-dom";
import { getImageUrl } from "../../api/tmdb-api";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.link}>
            <div className={css.thumb}>
               <img 
                 src={getImageUrl(movie.poster_path)} 
                 alt={movie.title} 
                 loading="lazy"
               />
            </div>
            <div className={css.info}>
              <h3 className={css.title}>{movie.title}</h3>
              <p className={css.year}>
                {movie.release_date ? movie.release_date.split("-")[0] : "Unknown"}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
