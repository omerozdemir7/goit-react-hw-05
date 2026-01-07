import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p>We don't have any reviews for this movie.</p>;

  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css.item}>
          <h4 className={css.author}>Author: {review.author}</h4>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}