import React, { useState } from "react"
import { MapContainer, TileLayer, Circle, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./WarExplosion.css"

// Catégories de bombes (rayon en mètres)
const bombTypes = {
  grenade: { radius: 500, color: "green" }, // 500 m
  missile: { radius: 5000, color: "orange" }, // 5 km
  bombe: { radius: 20000, color: "red" }, // 20 km
  nucleaire: { radius: 100000, color: "darkred" }, // 100 km
}

// Composant qui capte le clic
function MapClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng)
    },
  })
  return null
}

function WarExplosion() {
  const [explosions, setExplosions] = useState([])
  const [bombType, setBombType] = useState("grenade")

  const handleMapClick = (latlng) => {
    const newExplosion = {
      lat: latlng.lat,
      lng: latlng.lng,
      ...bombTypes[bombType],
    }
    setExplosions((prev) => [...prev, newExplosion])
  }

  return (
    <div className="war-container">
      <h1 className="title">WarExplosion</h1>

      {/* Sélecteur de bombes */}
      <div className="bomb-selector">
        {Object.keys(bombTypes).map((type) => (
          <button
            key={type}
            className={`bomb-button ${bombType === type ? "active" : ""}`}
            onClick={() => setBombType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Carte Leaflet */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {/* Clic handler */}
        <MapClickHandler onClick={handleMapClick} />

        {/* Explosions */}
        {explosions.map((explosion, index) => (
          <Circle
            key={index}
            center={[explosion.lat, explosion.lng]}
            radius={explosion.radius}
            pathOptions={{
              color: explosion.color,
              fillColor: explosion.color,
              fillOpacity: 0.3,
            }}
          />
        ))}
      </MapContainer>
    </div>
  )
}

export default WarExplosion
