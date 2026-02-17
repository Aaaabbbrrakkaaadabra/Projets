import { useEffect, useState } from "react";
import { db } from "../services/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export default function LeadersList() {
  const [presidents, setPresidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPresidents();
  }, []);

  async function fetchPresidents() {
    try {
      const querySnapshot = await getDocs(collection(db, "leaders"));

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // ✅ Tri alphabétique par nom
      data.sort((a, b) => a.name.localeCompare(b.name));

      setPresidents(data);
    } catch (error) {
      console.error("Erreur récupération presidents :", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Liste des Présidents</h1>

      <ul>
        {presidents.map(president => (
          <li key={president.id}>
            {president.name} <img alt="leader" style={{width:"100px", height:"100px"}} src={president.photoUrl}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
