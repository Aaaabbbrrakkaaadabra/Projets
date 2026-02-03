import React, { useState, useEffect, useRef, useMemo } from "react";
import talentTree from "../data/talentTree";

function TalentTree({ classId }) {
  const [unlocked, setUnlocked] = useState([]);
  const nodeRefs = useRef({});
  const [lines, setLines] = useState([]);

  // wrapper ref pour calcul des positions correctes
  const wrapperRef = useRef(null);

  const talents = useMemo(() => talentTree[classId] || [], [classId]);
  const tiers = useMemo(
    () => [...new Set(talents.map((t) => t.tier))].sort((a, b) => a - b),
    [talents]
  );

  const isUnlocked = (id) => unlocked.includes(id);
  const canUnlock = (talent) =>
    !talent.requires || talent.requires.every((req) => unlocked.includes(req));

  const toggleTalent = (talent) => {
    if (isUnlocked(talent.id)) {
      setUnlocked(unlocked.filter((id) => id !== talent.id));
    } else if (canUnlock(talent)) {
      setUnlocked([...unlocked, talent.id]);
    }
  };

  useEffect(() => {
    const parentRect = wrapperRef.current.getBoundingClientRect();
    const newLines = [];

    talents.forEach((talent) => {
      if (!talent.requires) return;
      talent.requires.forEach((reqId) => {
        const from = nodeRefs.current[reqId]?.getBoundingClientRect();
        const to = nodeRefs.current[talent.id]?.getBoundingClientRect();
        if (from && to) {
          newLines.push({
            x1: from.left + from.width / 2 - parentRect.left,
            y1: from.bottom - parentRect.top,
            x2: to.left + to.width / 2 - parentRect.left,
            y2: to.top - parentRect.top
          });
        }
      });
    });

    setLines(newLines);
  }, [talents, unlocked]);

  if (!talents.length) return <p>Aucun arbre de talents pour cette classe.</p>;

  return (
    <div className="talent-tree-wrapper" ref={wrapperRef}>
      <svg className="talent-lines">
        {lines.map((line, idx) => (
          <line
            key={idx}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#888"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="talent-tree">
        {tiers.map((tier) => (
          <div key={tier} className="talent-tier">
            {talents
              .filter((t) => t.tier === tier)
              .map((talent) => {
                const active = isUnlocked(talent.id);
                const locked = !canUnlock(talent);
                return (
                  <div
                    key={talent.id}
                    ref={(el) => (nodeRefs.current[talent.id] = el)}
                    className={`talent-node ${active ? "active" : ""} ${
                      locked ? "locked" : ""
                    }`}
                    onClick={() => toggleTalent(talent)}
                  >
                    {talent.name}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TalentTree;
