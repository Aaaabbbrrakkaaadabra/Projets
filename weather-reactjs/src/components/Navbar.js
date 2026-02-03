import logo from '../logo_weather.png'

function Navbar() {
    const navItems = ["Articles", "Blogs", "Contact"];
  
    return (
      <nav className="navbar">
        <div className="navbar-logo">
        <img src={logo} alt="Logo WeatherApp" style={{ height: "100px" }} />
      </div>
  
        <ul className="navbar-links">
          {navItems.map((item, index) => (
            <li key={index} className="navbar-item">
              {item}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  
  export default Navbar;
  