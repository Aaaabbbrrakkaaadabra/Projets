import { useState } from "react";
import { getWeatherByCity } from "../api/weather";
import GetWeatherLocation from "../components/GetWeatherLocation";
import WeatherCard from "../components/WeatherCard";
import Articles from "./Articles";

function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    const data = await getWeatherByCity(city);
    setWeather(data);
    setLoading(false);
  };

  return (
    <div className="home-layout">
      {/* COLONNE GAUCHE : ARTICLES */}
      <aside className="articles-column">
        <div className="article-card">
          <Articles/>
        </div>
      </aside>

      {/* COLONNE DROITE : METEO */}
      <main className="weather-column">
        <div className="search-card">
          <h1>Météo 🌤️</h1>

          <div className="search-bar">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Entrez une ville"
            />
            <button onClick={handleSearch}>
              {loading ? "..." : "Rechercher"}
            </button>
          </div>

          <GetWeatherLocation />
        </div>

        <WeatherCard weather={weather} />
      </main>
    </div>
  );
}

export default Home;
