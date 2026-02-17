import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export const getTop10Leaders = async () => {
  const q = query(collection(db, "leaders"), orderBy("bestVotes", "desc"), limit(10));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getFlop10Leaders = async () => {
  const q = query(collection(db, "leaders"), orderBy("worstVotes", "desc"), limit(10));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
