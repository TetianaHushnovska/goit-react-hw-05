import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <nav className="nav">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="/movies" className="link">
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
