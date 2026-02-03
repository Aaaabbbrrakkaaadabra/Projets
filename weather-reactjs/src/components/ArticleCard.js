import React from "react";

function ArticleCard({ article }) {
  const title = article.title;
  const description = article.description
    ? article.description  : "";

  return (
    <div className="article-card">
      <h3>{title}</h3>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={title} />
      )}
      <p>{description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Lire l'article
      </a>
    </div>
  );
}

export default ArticleCard;
