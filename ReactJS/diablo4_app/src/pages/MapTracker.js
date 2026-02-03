import React, { useState } from "react";
import mapData from "../data/mapData";
import mapImage from "../assets/map_diablo4.jpg"; // Image de la carte
import { Link } from "react-router-dom";

export default function MapTracker() {
  const [filter, setFilter] = useState("All");
  const [userMarkers, setUserMarkers] = useState([]);

  const types = ["All", "Dungeon", "Boss", "Town", "Chest"];

  const filteredPOI = mapData.filter((poi) => filter === "All" || poi.type === filter);

  const addMarker = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const name = prompt("Nom du marqueur ?");
    if (name) {
      setUserMarkers([...userMarkers, { id: Date.now(), name, x, y }]);
    }
  };

  return (
    <div className="map-tracker">
      <h1>Map Tracker</h1>

      {/* Filtres */}
      <div className="map-filters">
        {types.map((t) => (
          <button
            key={t}
            className={filter === t ? "active" : ""}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Carte */}
      <div className="map-container">
        <img
          src={mapImage}
          alt="Carte de Diablo 4"
          className="map-image"
          onClick={addMarker}
        />

        {/* POI */}
        {filteredPOI.map((poi) => (
          <div
            key={poi.id}
            className={`map-marker ${poi.type.toLowerCase()}`}
            style={{ left: poi.x, top: poi.y }}
            title={poi.name}
          />
        ))}

        {/* Marqueurs utilisateur */}
        {userMarkers.map((marker) => (
          <div
            key={marker.id}
            className="map-marker user-marker"
            style={{ left: marker.x, top: marker.y }}
            title={marker.name}
          />
        ))}
      </div>

      <Link to="/" className="back-home">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
