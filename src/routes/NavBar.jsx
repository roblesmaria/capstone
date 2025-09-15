import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/login" className="nav_link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/register" className="nav_link">
              Products
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="nav_link">
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/help" className="nav_link">
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
