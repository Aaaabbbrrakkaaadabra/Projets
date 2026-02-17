import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>LeaderVote</div>

      {/* Burger */}
      <div style={styles.burger} onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* Menu */}
      <div
        style={{
          ...styles.menu,
          ...(open ? styles.menuOpen : {})
        }}
      >
        <Link to="/" style={styles.link} onClick={() => setOpen(false)}>
          Home
        </Link>

        <Link to="/leaders" style={styles.link} onClick={() => setOpen(false)}>
          Leaders
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "#111",
    color: "white",
    position: "relative"
  },

  logo: {
    fontWeight: "bold",
    fontSize: "20px"
  },

  burger: {
    fontSize: "22px",
    cursor: "pointer",
    display: "none"
  },

  menu: {
    display: "flex",
    gap: "20px"
  },

  menuOpen: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "60px",
    left: 0,
    right: 0,
    background: "#111",
    padding: "20px"
  },

  link: {
    color: "white",
    textDecoration: "none"
  }
};

// Responsive CSS inject simple
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @media (max-width: 768px) {
      nav div:nth-child(2) {
        display: block !important;
      }
      nav div:nth-child(3) {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);
}
