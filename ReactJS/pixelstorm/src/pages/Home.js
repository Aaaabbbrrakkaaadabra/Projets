import React, { useState, useEffect } from "react";
import "./Home.css";

const sampleProducts = [
  { title: "T-shirt Galaxy", price: 24.99, image: "https://picsum.photos/seed/galaxy/300/200" },
  { title: "Casque Neon", price: 59.99, image: "https://picsum.photos/seed/neon/300/200" },
  { title: "Sac Pixel", price: 34.5, image: "https://picsum.photos/seed/pixelbag/300/200" },
  { title: "Sneakers Pop", price: 89.0, image: "https://picsum.photos/seed/sneakers/300/200" },
  { title: "Lunettes Funk", price: 19.99, image: "https://picsum.photos/seed/glasses/300/200" },
  { title: "Hoodie Flash", price: 45.5, image: "https://picsum.photos/seed/hoodie/300/200" },
  { title: "Vinyle Retro", price: 29.99, image: "https://picsum.photos/seed/vinyl/300/200" },
  { title: "Poster Wave", price: 14.99, image: "https://picsum.photos/seed/poster/300/200" },
  { title: "Tote Bag Color", price: 12.99, image: "https://picsum.photos/seed/totebag/300/200" },
  { title: "Casquette Pop", price: 22.5, image: "https://picsum.photos/seed/cap/300/200" },
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Choisir 6 produits aléatoires
    const shuffled = sampleProducts.sort(() => 0.5 - Math.random());
    setProducts(shuffled.slice(0, 6));
  }, []);

  const handleAddToCart = (title) => {
    alert(`🛒 ${title} ajouté au panier !`);
  };

  return (
    <div className="home-container">
      <h2 className="home-title">🎁 Nos Produits Funky du Moment</h2>
      <div className="product-grid">
        {products.map((product, i) => (
          <div className="product-card" key={i}>
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p className="price">{product.price.toFixed(2)} €</p>
              <button onClick={() => handleAddToCart(product.title)}>Ajouter au panier  🛒</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
