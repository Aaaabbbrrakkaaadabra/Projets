import React, { useState } from "react";
import inventoryData from "../data/inventory";
import { Link } from "react-router-dom";

export default function Inventory() {
  const [filterType, setFilterType] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const types = ["All", "Weapon", "Armor", "Accessory"];
  const rarities = ["All", "Common", "Rare", "Epic", "Legendary"];

  const [filterRarity, setFilterRarity] = useState("All");

  const filteredItems = inventoryData.filter((item) => {
    return (
      (filterType === "All" || item.type === filterType) &&
      (filterRarity === "All" || item.rarity === filterRarity)
    );
  });

  return (
    <div className="inventory-page">
      <h1>Inventory</h1>

      {/* Filtres */}
      <div className="inventory-filters">
        <div>
          <span>Type: </span>
          {types.map((type) => (
            <button
              key={type}
              className={filterType === type ? "active" : ""}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div>
          <span>Rareté: </span>
          {rarities.map((r) => (
            <button
              key={r}
              className={filterRarity === r ? "active" : ""}
              onClick={() => setFilterRarity(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="inventory-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`item-card ${selectedItem?.id === item.id ? "selected" : ""}`}
            onClick={() => setSelectedItem(item)}
          >
            <h3>{item.name}</h3>
            <span>{item.type}</span>
            <span className={`rarity ${item.rarity.toLowerCase()}`}>{item.rarity}</span>
          </div>
        ))}
      </div>

      {/* Aperçu */}
      {selectedItem && (
        <div className="item-preview">
          <h2>{selectedItem.name}</h2>
          <p><strong>Type:</strong> {selectedItem.type}</p>
          {selectedItem.damage && <p><strong>Dégâts:</strong> {selectedItem.damage}</p>}
          {selectedItem.defense && <p><strong>Défense:</strong> {selectedItem.defense}</p>}
          {selectedItem.bonus && <p><strong>Bonus:</strong> {selectedItem.bonus}</p>}
          <p>{selectedItem.description}</p>
        </div>
      )}

      <Link to="/" className="back-home">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
