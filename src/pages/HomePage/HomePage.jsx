// import axios from "axios";
import { useEffect, useState } from "react";
import { fetchMoviePerDay } from "../../api/api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        const responce = await fetchMoviePerDay();
        setCollection(responce.data.results);
      } catch (error) {
        console.log(" error", error);
      }
    }
    fetchMoviesData();
  }, []);

  return (
    <div className="container">
      <h2>Trending today</h2>
      {collection.length > 0 && <MovieList collection={collection} />}
    </div>
  );
}
