import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: "metric",
        appid: process.env.REACT_APP_WEATHER_API_KEY,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Erreur API météo:", error);
    return null;
  }
};
