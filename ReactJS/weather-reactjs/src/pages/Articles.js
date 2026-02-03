import React, { useEffect, useState } from "react";
import ArticleCard from '../components/ArticleCard';
import { getNewsByCity } from "../api/news";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getNewsByCity(); // renvoie directement un tableau
      setArticles(data);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Chargement des articles...</p>;
  if (!articles.length) return <p>Aucun article trouvé.</p>;

  return (
    <div>
      <div className="articles-list">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Articles;
