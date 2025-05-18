import css from "./MovieDetailsPage.module.css";
import { useEffect, useState, useRef, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieById, fetchMovieImg } from "../../api/api";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [movieImg, setMovieImg] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackLink = useRef(location.state ?? "/movies");

  const BASE_IMG_URL =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovieData() {
      try {
        const [movieData, movieImgPath] = await Promise.all([
          fetchMovieById(movieId),
          fetchMovieImg(),
        ]);
        setMovie(movieData.data);
        setMovieImg(movieImgPath.data.images);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchMovieData();
  }, [movieId]);

  useEffect(() => {
    if (movie && movieImg) {
      const posterSize = "w300";
      const url = `${movieImg.secure_base_url}${posterSize}${movie.poster_path}`;

      return setPosterUrl(url);
    }
  }, [movie, movieImg]);

  return (
    <div className="container">
      <Link to={goBackLink.current} className={css.goBack}>
        ⬅ Go Back
      </Link>
      <div className={css.block}>
        <div>
          <img
            src={movie?.poster_path ? posterUrl : BASE_IMG_URL}
            alt={movie?.title || "Movie poster"}
            width={300}
          />
        </div>

        <div>
          <h2>{movie?.title}</h2>
          <p>User score: {Math.round(movie?.vote_average * 10)}%</p>
          <h4>Overview</h4>
          <p>{movie?.overview}</p>
          <h4>Genres</h4>
          <ul className={css.list}>
            {movie &&
              movie?.genres?.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
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
