import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import classes from "../data/classes";
import skillsData from "../data/skills";
import inventoryData from "../data/inventory";
import TalentTree from "../components/TalentTree";

export default function BuildPlanner() {
  const [searchParams] = useSearchParams();
  const initialClassId = searchParams.get("class") || "";
  const [classId, setClassId] = useState(initialClassId);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const MAX_SKILLS = 6;
  const MAX_ITEMS = 6;

  const currentClass = useMemo(
    () => classes.find((c) => c.id === classId),
    [classId]
  );

  const skills = useMemo(() => skillsData[classId] || [], [classId]);

  // --- Skills toggle
  const toggleSkill = (skill) => {
    if (selectedSkills.find((s) => s.id === skill.id)) {
      setSelectedSkills(selectedSkills.filter((s) => s.id !== skill.id));
    } else if (selectedSkills.length < MAX_SKILLS) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // --- Items toggle
  const toggleItem = (item) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else if (selectedItems.length < MAX_ITEMS) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const resetBuild = () => {
    setSelectedSkills([]);
    setSelectedItems([]);
  };

  return (
    <div className="build-planner">
      <h1>Build Planner</h1>

      {/* Sélecteur de classe */}
      <div className="class-selector">
        <label>Choisir une classe : </label>
        <select
          value={classId}
          onChange={(e) => {
            setClassId(e.target.value);
            resetBuild(); // réinitialise build quand on change de classe
          }}
        >
          <option value="">-- Sélectionner --</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {classId && currentClass && (
        <>
          {/* Skills */}
          <div className="skills-planner">
            <h2>Compétences (max {MAX_SKILLS})</h2>
            <div className="skills-grid">
              {skills.map((skill) => (
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
          </div>

          {/* TalentTree */}
          <div className="talent-planner">
            <h2>Arbre de talents</h2>
            <TalentTree classId={classId} />
          </div>

          {/* Inventory */}
          <div className="inventory-planner">
            <h2>Inventaire (max {MAX_ITEMS})</h2>
            <div className="skills-grid">
              {inventoryData.map((item) => (
                <div
                  key={item.id}
                  className={`skill-card ${
                    selectedItems.find((i) => i.id === item.id) ? "selected" : ""
                  }`}
                  onClick={() => toggleItem(item)}
                >
                  <h3>{item.name}</h3>
                  <span>{item.type}</span>
                  <span className={`rarity ${item.rarity.toLowerCase()}`}>
                    {item.rarity}
                  </span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Build Summary */}
          <div className="build-summary">
            <h2>Résumé du build</h2>
            <p><strong>Compétences :</strong></p>
            {selectedSkills.length ? (
              <ul>
                {selectedSkills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            ) : (
              <p>Aucune compétence sélectionnée</p>
            )}

            <p><strong>Objets :</strong></p>
            {selectedItems.length ? (
              <ul>
                {selectedItems.map((item) => (
                  <li key={item.id}>
                    {item.name} ({item.rarity})
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun objet sélectionné</p>
            )}

            <button className="reset-button" onClick={resetBuild}>
              Réinitialiser le build
            </button>
          </div>
        </>
      )}

      <Link to="/" className="back-home">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
