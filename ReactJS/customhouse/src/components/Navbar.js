import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </button>

      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/blogs" onClick={closeMenu}>
            Blogs
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </li>
        <li>
          <Link to="/searchimage" onClick={closeMenu}>
            Images
          </Link>
        </li>
        <li>
          <Link to="/polygones" onClick={closeMenu}>
            Polygones
          </Link>
        </li>
        <li>
          <Link to="/tarifsrecharge" onClick={closeMenu}>
            TarifsRecharge
          </Link>
        </li>
        <li>
          <Link to="/warexplosion" onClick={closeMenu}>
            WarExplosion
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
