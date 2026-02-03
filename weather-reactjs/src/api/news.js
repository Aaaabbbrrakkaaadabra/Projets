import axios from "axios";

const BASE_URL = "https://newsapi.org/v2/top-headlines";

export const getNewsByCity = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: "france",      // Articles français
        pageSize: 15,       // Nombre d'articles
        apiKey: process.env.REACT_APP_NEWS_API_KEY, // Clé API
      },
    });
    return response.data.articles; // Renvoie directement le tableau d'articles
  } catch (error) {
    console.error("Erreur API news:", error);
    return [];
  }
};
