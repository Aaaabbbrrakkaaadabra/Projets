import axios from "axios";
import { useState } from "react";

function GetWeatherLocation() {
  const [weather, setWeather] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        console.log("Coords:", latitude, longitude);
        console.log("API KEY:", process.env.REACT_APP_WEATHER_API_KEY);

        try {
          const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
              params: {
                lat: latitude,
                lon: longitude,
                units: "metric",
                appid: process.env.REACT_APP_WEATHER_API_KEY,
              },
            }
          );

          setWeather(response.data);
        } catch (error) {
          console.error("Erreur météo GPS:", error);
        }
      },
      (error) => {
        console.error("Erreur géolocalisation:", error);
      }
    );
  };

  return (
    <>
      <button onClick={getLocation}>
        Utiliser ma position
      </button>

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>🌡 {weather.main.temp} °C</p>
        </div>
      )}
    </>
  );
}

export default GetWeatherLocation;
