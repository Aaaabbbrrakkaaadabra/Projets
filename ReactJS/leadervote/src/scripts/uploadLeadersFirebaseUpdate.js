import { db } from "../upload/firebaseAdmin.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lecture JSON
const leaders = JSON.parse(
  fs.readFileSync(path.join(__dirname, "presidents.json"), "utf-8")
);

const collectionRef = db.collection("leaders");

async function uploadLeaders() {
  console.log(`🚀 Début de l’upload de ${leaders.length} leaders...`);

  let count = 0;

  for (const leader of leaders) {
    try {
      // Vérifie existence par nom
      const querySnapshot = await collectionRef
        .where("name", "==", leader.name)
        .limit(1)
        .get();

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        await docRef.set(leader, { merge: true });

        console.log(`♻️ Leader mis à jour : ${leader.name} (${docRef.id})`);
      } else {
        const docRef = collectionRef.doc();

        await docRef.set(leader);

        console.log(`✅ Leader ajouté : ${leader.name} (${docRef.id})`);
      }

      count++;
    } catch (error) {
      console.error(`❌ Erreur avec ${leader?.name}`, error);
    }
  }

  console.log(`🎉 Upload terminé : ${count}/${leaders.length}`);
}

uploadLeaders().catch(console.error);
