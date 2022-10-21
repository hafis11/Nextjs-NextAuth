import { fireConfig } from "./fireConfig";

var admin = require("firebase-admin");

async function getFirebaseAdmin() {
  if (!admin.apps.length) {
    await admin.initializeApp({
      credential: admin.credential.cert(fireConfig),
    });
  }
  return admin;
}

export default getFirebaseAdmin;
