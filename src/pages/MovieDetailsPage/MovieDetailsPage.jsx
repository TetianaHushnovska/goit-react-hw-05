import css from "./MovieDetailsPage.module.css";
import { useEffect, useState, useRef, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieById } from "../../api/api";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  const goBackLink = useRef(location.state ?? "/movies");

  const BASE_IMG_URL =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

  const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovieData() {
      try {
        const response = await fetchMovieById(movieId);
        setMovie(response.data);
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    }

    fetchMovieData();
  }, [movieId]);

  return (
    <div className="container">
      <Link to={goBackLink.current} className={css.goBack}>
        ⬅ Go Back
      </Link>

      <div className={css.block}>
        <div>
          <img
            src={
              movie?.poster_path
                ? `${BASE_POSTER_URL}${movie.poster_path}`
                : BASE_IMG_URL
            }
            alt={movie?.title || "Movie poster"}
            width={300}
          />
        </div>

        <div>
          <h2>{movie?.title}</h2>
          <p>
            User score:{" "}
            {movie?.vote_average
              ? `${Math.round(movie.vote_average * 10)}%`
              : "N/A"}
          </p>

          <h4>Overview</h4>
          <p>{movie?.overview}</p>

          <h4>Genres</h4>
          <ul className={css.list}>
            {movie?.genres?.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.detailsBlock}>
        <h4>Additional information</h4>
        <ul>
          <li>
            <NavLink to="cast" className="link">
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className="link">
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
