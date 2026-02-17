import fs from "fs";
import { db } from "../upload/firebaseAdmin.js";

// Lire fichier texte
const names = fs
  .readFileSync("./presidents.txt", "utf-8")
  .split("\n")
  .map(n => n.trim())
  .filter(Boolean);

const collectionRef = db.collection("leaders");

// ======================
// Wikipedia Photo Fetch
// ======================

async function getPhotoUrl(name) {
  try {
    // Tentative directe
    let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;

    let res = await fetch(url);

    if (res.ok) {
      let data = await res.json();
      if (data?.thumbnail?.source) return data.thumbnail.source;
    }

    // Fallback recherche
    const searchUrl =
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name)}&format=json`;

    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (searchData?.query?.search?.length > 0) {
      const bestTitle = searchData.query.search[0].title;

      const res2 = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestTitle)}`
      );

      const data2 = await res2.json();

      return data2?.thumbnail?.source || null;
    }

    return null;
  } catch (error) {
    console.log("❌ Wikipedia erreur pour", name);
    return null;
  }
}

// ======================
// Firestore Update
// ======================

async function updateFirestore(name, photoUrl) {
  try {
    const snapshot = await collectionRef
      .where("name", "==", name)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;

      await docRef.set(
        { photoUrl },
        { merge: true }
      );

      console.log(`♻️ Update Firestore : ${name}`);
    } else {
      await collectionRef.add({
        name,
        photoUrl
      });

      console.log(`✅ Ajout Firestore : ${name}`);
    }
  } catch (error) {
    console.log(`❌ Firestore erreur ${name}`, error.message);
  }
}

// ======================
// Main Script
// ======================

async function main() {
  console.log(`🚀 Traitement ${names.length} présidents`);

  for (const name of names) {
    console.log(`🔎 Recherche photo : ${name}`);

    const photoUrl = await getPhotoUrl(name);

    console.log(`📸 URL :`, photoUrl);

    await updateFirestore(name, photoUrl);
  }

  console.log("🎉 Terminé");
}

main();
