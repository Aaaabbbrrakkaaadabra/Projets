import React, { useState } from "react";
import VoteButtons from "../components/VoteButtons.js";
import { useLanguage } from "../components/LanguageContext.js";
import "../App.css";

const LeaderCard = ({ leader }) => {
  const { t } = useLanguage();
  // State local pour vote live
  const [leaderVotes, setLeaderVotes] = useState({
    bestVotes: leader.bestVotes,
    worstVotes: leader.worstVotes
  });

  const badgeClass = leaderVotes.bestVotes >= leaderVotes.worstVotes ? "badge top" : "badge flop";
  const badgeText = leaderVotes.bestVotes >= leaderVotes.worstVotes ? "TOP" : "FLOP";

  return (
    <div className="leader-card">
      <img src={leader.photoUrl || "https://placehold.co/200"} alt={leader.name} />
      <h3>{leader.name}</h3>
      <p>{t("role")}: {leader.role}</p>
      <p>{t("country")}: {leader.country}</p>
      <p>{t("party")}: {leader.party}</p>
      <p>👍 {leaderVotes.bestVotes} | 👎 {leaderVotes.worstVotes}</p>
      <span className={badgeClass}>{badgeText}</span>
      <VoteButtons leader={leader} setLeaderVotes={setLeaderVotes} />
    </div>
  );
};

export default LeaderCard;
