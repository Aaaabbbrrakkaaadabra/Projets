import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import "./Home.css"; // style CSS associé

function Home() {
  return (
    <div className="home-container">
      <h1>Idées de Customisation Maison & Extérieur</h1>
      <div className="card-grid">
        {articles.map((article) => (
          <div key={article.id} className="card">
            <img src={article.image} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <div className="card-footer">
              <Link to={`/blogs/${article.id}`} className="btn">Voir plus</Link>
              <span className="heart">❤️</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
