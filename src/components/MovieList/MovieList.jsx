import { Link, useLocation } from "react-router-dom";

export default function MovieList({ collection }) {
  const location = useLocation();
  return (
    <ul>
      {collection.map(({ id, title }, index) => (
        <li key={index}>
          <Link to={`/movies/${id}`} state={location}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
