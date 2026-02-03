import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Bienvenue sur Diablo 4 Companion</h1>
      <p>
        Planifiez vos builds, suivez vos objets et quêtes, et optimisez votre
        expérience de jeu.
      </p>

      <div className="home-grid">
        <Link to="/classes" className="home-card card-red">
          <h2>Classes</h2>
          <p>Découvrez les classes et leurs compétences.</p>
        </Link>

        <Link to="/build" className="home-card card-blue">
          <h2>Build Planner</h2>
          <p>Créez et optimisez vos builds.</p>
        </Link>

        <Link to="/inventory" className="home-card card-green">
          <h2>Inventory</h2>
          <p>Gérez vos objets et votre équipement.</p>
        </Link>

        <Link to="/map" className="home-card card-purple">
          <h2>Map & Quests</h2>
          <p>Suivez les quêtes, boss et événements.</p>
        </Link>

        <Link to="/stats" className="home-card card-yellow">
          <h2>Stats</h2>
          <p>Analysez vos performances et classements.</p>
        </Link>
      </div>
    </div>
  );
}
