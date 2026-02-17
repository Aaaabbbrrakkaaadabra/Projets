// firebaseAdmin.js
import admin from "firebase-admin";
import fs from "fs";

// Chemin vers la clé privée que tu as téléchargée depuis Firebase
const serviceAccount = JSON.parse(fs.readFileSync("../NOT_SHARE/serviceAccountKey.json", "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();
