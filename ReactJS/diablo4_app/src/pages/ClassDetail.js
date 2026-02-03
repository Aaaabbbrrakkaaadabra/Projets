import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "../data/classes";
import skillsData from "../data/skills";
import TalentTree from "../components/TalentTree";

export default function ClassDetail() {
  const { id } = useParams();
  const cls = classes.find((c) => c.id === id);

  const [activeTab, setActiveTab] = useState("info");
  const skills = skillsData[id] || [];

  // Filtrage des skills
  const [skillFilter, setSkillFilter] = useState("All");

  // Build en cours
  const [selectedSkills, setSelectedSkills] = useState([]);
  const MAX_SKILLS = 6;

  const toggleSkill = (skill) => {
    const exists = selectedSkills.find((s) => s.id === skill.id);
    if (exists) {
      setSelectedSkills(selectedSkills.filter((s) => s.id !== skill.id));
    } else if (selectedSkills.length < MAX_SKILLS) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  if (!cls) return <p>Classe introuvable</p>;

  return (
    <div className="class-detail">
      {/* Bouton retour */}
      <Link to="/classes" className="back-link">
        ← Retour aux classes
      </Link>

      <h1>{cls.name}</h1>

      {/* Onglets */}
      <div className="tabs">
        {["info", "skills", "builds"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active" : ""}
          >
            {tab === "info" ? "Infos" : tab === "skills" ? "Compétences" : "Builds"}
          </button>
        ))}
      </div>

      {/* CONTENU */}
      {activeTab === "info" && (
        <>
          <p className="detail-role">{cls.role}</p>
          <p className="detail-description">{cls.description}</p>
        </>
      )}

      {activeTab === "skills" && (
        <>
          {/* Filtres */}
          <div className="skill-filters">
            {["All", "Basic", "Core", "Defensive", "Mobility", "Utility"].map(
              (type) => (
                <button
                  key={type}
                  className={skillFilter === type ? "active" : ""}
                  onClick={() => setSkillFilter(type)}
                >
                  {type}
                </button>
              )
            )}
          </div>

          {/* Liste des skills */}
          <div className="skills-list">
            {skills
              .filter((skill) => skillFilter === "All" || skill.type === skillFilter)
              .map((skill) => (
                <div
                  key={skill.id}
                  className={`skill-card ${
                    selectedSkills.find((s) => s.id === skill.id) ? "selected" : ""
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  <h3>{skill.name}</h3>
                  <span>{skill.type}</span>
                  <p>{skill.description}</p>
                </div>
              ))}
          </div>

          {/* Aperçu du build */}
          <div className="build-preview">
            <h3>
              Build en cours ({selectedSkills.length}/{MAX_SKILLS})
            </h3>
            {selectedSkills.length === 0 ? (
              <p>Aucune compétence sélectionnée</p>
            ) : (
              <ul>
                {selectedSkills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {activeTab === "builds" && (
        <div className="builds-tab">
          <h2>Talent Tree</h2>
          <TalentTree classId={id} />
        </div>
      )}

      {/* Bouton Créer un build */}
      <Link to={`/build/new?class=${id}`} className="build-button">
        Créer un build
      </Link>
    </div>
  );
}
