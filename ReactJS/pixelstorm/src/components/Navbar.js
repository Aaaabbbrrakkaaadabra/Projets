import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const categories = [
  {
    name: "Pixelwear",
    items: ["Casquette", "T-shirt", "Hoodie", "Shorts", "Sneakers", "Socks", "Glasses", "Pins", "Bags", "Badges"],
  },
  {
    name: "ElectroPop",
    items: ["Headphones", "Speakers", "LEDs", "Mouse", "Keyboard", "Laptop Sleeve", "Phone Case", "Webcam", "USB Disco", "Chargers"],
  },
  {
    name: "RetroWave",
    items: ["Poster", "Vinyl", "Cassette", "Tote Bag", "Stickers", "Art Print", "Lamp", "Clock", "Mug", "Notebook"],
  },
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
const toggleMenu = () => setMenuOpen(!menuOpen);


  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar">
      <div className="logo">🎨 PixelStorm</div>

<ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <Link to="/">Home</Link>
        {categories.map((cat, index) => (
          <li key={index} className="dropdown">
            <span>{cat.name}</span>
            <ul className="dropdown-menu">
              {cat.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
         <li>
          <button className="contrast-btn" onClick={toggleDarkMode}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          </li>
</ul>

   
       
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
            </button>
    
    </nav>
  );
}
