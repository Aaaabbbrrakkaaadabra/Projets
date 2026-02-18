import { useState } from "react";
import "../pages/SearchImage.css";

function SearchImage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const accessKey = "1eh6C7pLWOyRf6owJka2NtkcVuUls7hfkDWvxBe2aWk"; // ta clé Unsplash

  const handleSearch = async () => {
    if (!query.trim()) {
      setMessage("Veuillez entrer un mot-clé.");
      setImages([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&per_page=20&client_id=${accessKey}`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        setMessage("Aucune image trouvée.");
        setImages([]);
        return;
      }

      setMessage("");
      setImages(data.results);
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de la recherche.");
    }
  };

  return (
    <div>
      <h2>Recherche d'image sur Unsplash</h2>
      <input
        type="text"
        value={query}
        placeholder="Entrez un mot-clé"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>

      {message && <p>{message}</p>}

      <div id="gallery">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <a href={image.links.html} target="_blank" rel="noreferrer">
              Voir l'image originale
            </a>
            <img
              src={image.urls.small}
              alt={image.alt_description || query}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchImage;
