import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api/api";

const DEFAULT_POSTER =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReviewsForMovie() {
      try {
        setLoading(true);

        const [detailReview] = await Promise.all([fetchMovieReviews(movieId)]);

        setReviews(detailReview.data.reviews.results);

        console.log("RESPONSE:", detailReview.data);
        console.log("REVIEWS:", detailReview.data.reviews.results);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviewsForMovie();
  }, [movieId]);

  return (
    <div className="container">
      {loading && <strong>Loading reviews...</strong>}

      {!loading && reviews?.length > 0 && (
        <ul className={css.wrap}>
          {reviews.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <h4>Author: {author}</h4>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      )}

      {!loading && reviews?.length === 0 && (
        <strong>We don't have any reviews for this movie.</strong>
      )}
    </div>
  );
}
