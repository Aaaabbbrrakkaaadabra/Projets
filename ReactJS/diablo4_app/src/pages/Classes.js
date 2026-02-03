import { Link } from "react-router-dom";
import classes from "../data/classes";

export default function Classes() {
  return (
    <div className="classes-page">
      <h1>Classes</h1>
      <p className="subtitle">
        Découvrez les classes jouables de Diablo IV.
      </p>

      <div className="classes-grid">
        {classes.map((cls) => (
          <Link
            key={cls.id}
            to={`/classes/${cls.id}`}
            className="class-card"
          >
            <h2>{cls.name}</h2>
            {cls.unofficial && (
              <span className="badge-unofficial">Non officiel</span>
            )}
            <p className="class-role">{cls.role}</p>
            <p className="class-description">{cls.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
