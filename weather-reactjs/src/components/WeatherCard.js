

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weather.name.replace(/arrondissement/gi, 'Ville')}</h2>
        <span className="weather-desc">
          {weather.weather[0].description}
        </span>
      </div>

      <div className="weather-temp">
        {Math.round(weather.main.temp)}°C
      </div>

      <div className="weather-details">
        <div>
          <span>💧</span>
          <p>{weather.main.humidity}%</p>
          <small>Humidité</small>
        </div>

        <div>
          <span>💨</span>
          <p>{weather.wind.speed} m/s</p>
          <small>Vent</small>
        </div>
      </div>
      
    </div>
  );
}

export default WeatherCard;
