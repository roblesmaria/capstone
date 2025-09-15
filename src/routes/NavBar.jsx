import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/login" className="nav_link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="nav_link">
              Register
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="nav_link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/help" className="nav_link">
              Help
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
