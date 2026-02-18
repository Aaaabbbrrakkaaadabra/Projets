import { articles } from "../data/articles";

function Blogs() {
const randomIndex = Math.floor(Math.random() * articles.length);
const article = articles[randomIndex];

  if (!article) return <p>Article non trouvé</p>;

  return (
    <div className="blog-details">
      <h1>{article.title}</h1>
      <img src={article.image} alt={article.title} />
      <p>{article.content}</p>
    </div>
  );
}

export default Blogs;
