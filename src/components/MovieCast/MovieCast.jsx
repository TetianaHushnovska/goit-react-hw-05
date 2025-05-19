import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { fetchMovieCredits } from "../../api/api";

const DEFAULT_POSTER =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w200";

export default function MovieCast() {
  const { movieId } = useParams();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setLoading(true);

        const castDetails = await fetchMovieCredits(movieId);
        setCredits(castDetails.data.credits.cast);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <div className="container">
      {loading ? (
        <strong>Loading cast...</strong>
      ) : (
        <ul className={css.wrap}>
          {credits && credits.length > 0 ? (
            credits.map(({ id, name, character, profile_path }) => (
              <li key={id} className={css.item}>
                <div>
                  <img
                    src={
                      profile_path
                        ? `${BASE_POSTER_URL}${profile_path}`
                        : DEFAULT_POSTER
                    }
                    alt={name}
                    width={300}
                  />
                  <h4>{name}</h4>
                  <p>Character: {character}</p>
                </div>
              </li>
            ))
          ) : (
            <strong>We don't have any cast info for this movie</strong>
          )}
        </ul>
      )}
    </div>
  );
}
