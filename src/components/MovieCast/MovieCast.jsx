import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast, getImageUrl } from "../../api/tmdb-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

useEffect(() => {
  async function fetchCast() {
    try {
      setLoading(true);
      const data = await getMovieCast(movieId);
      setCast(data || []);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  fetchCast();
}, [movieId]);


  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>Could not load cast.</p>;
  if (cast.length === 0) return <p>We don't have any cast info for this movie.</p>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.item}>
          <img 
            src={getImageUrl(actor.profile_path)} 
            alt={actor.name} 
            className={css.image}
          />
          <div className={css.info}>
            <p className={css.name}>{actor.name}</p>
            <p className={css.character}>as {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}