import { useParams } from "react-router-dom";
import { articles } from "../data/articles";

function BlogDetails() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) return <p>Article non trouvé</p>;

  return (
    <div className="blog-details">
      <h1>{article.title}</h1>
      <img src={article.image} alt={article.title} />
      <p>{article.content}</p>
    </div>
  );
}

export default BlogDetails;
