import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <div className="navbar-title">Diablo 4 Companion</div>

      <ul className="navbar-links">
        <li><Link className={isActive("/")} to="/">Home</Link></li>
        <li><Link className={isActive("/classes")} to="/classes">Classes</Link></li>
        <li><Link className={isActive("/build")} to="/build">Build Planner</Link></li>
        <li><Link className={isActive("/inventory")} to="/inventory">Inventory</Link></li>
        <li><Link className={isActive("/map")} to="/map">Map / Quests</Link></li>
        <li><Link className={isActive("/stats")} to="/stats">Stats</Link></li>
      </ul>
    </nav>
  );
}
