import React, { useState, useEffect } from "react";
import { auth, db } from "../services/firebase.js";
import { doc, getDoc, setDoc, updateDoc, increment, collection, addDoc } from "firebase/firestore";
import { useLanguage } from "../components/LanguageContext.js";
import "../App.css";

const VoteButtons = ({ leader, setLeaderVotes }) => {
  const { t } = useLanguage();
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      if (!auth.currentUser) return;
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, { hasVoted: false, createdAt: new Date() });
      } else if (userSnap.data().hasVoted) {
        setHasVoted(true);
      }
    };
    checkUser();
  }, []);

  const handleVote = async (type) => {
    if (!auth.currentUser) return alert(t("vote_alert_error"));
    if (hasVoted) return alert(t("vote_alert_already"));
  
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { createdAt: new Date() });
      }
  
      // Ajouter le vote
      await addDoc(collection(db, "votes"), {
        userId: auth.currentUser.uid,
        leaderId: leader.id,
        voteType: type,
        createdAt: new Date()
      });
  
      // Mettre à jour le leader
      await updateDoc(doc(db, "leaders", leader.id), {
        ...(type === "best" ? { bestVotes: increment(1) } : { worstVotes: increment(1) })
      });
  
      // Mettre à jour user avec merge
      await setDoc(userRef, { hasVoted: true }, { merge: true });
  
      // Update local state pour vote live
      setLeaderVotes(prev => ({
        ...prev,
        bestVotes: type === "best" ? prev.bestVotes + 1 : prev.bestVotes,
        worstVotes: type === "worst" ? prev.worstVotes + 1 : prev.worstVotes
      }));
  
      setHasVoted(true);
      alert(t("vote_alert_success"));
  
    } catch (err) {
      console.error("Erreur lors du vote :", err);
      alert(t("vote_alert_error"));
    }
  };
  

  return (
    <div className="vote-buttons">
      <button className="best" onClick={() => handleVote("best")} disabled={hasVoted}>{t("best")}</button>
      <button className="worst" onClick={() => handleVote("worst")} disabled={hasVoted}>{t("worst")}</button>
    </div>
  );
};

export default VoteButtons;
