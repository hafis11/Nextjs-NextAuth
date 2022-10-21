// require("dotenv").config();
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "knowit-vertical.appspot.com",
  messagingSenderId: "495858485432",
  appId: "1:495858485432:web:25e37cdd3c8d90b61c4c4d",
  measurementId: "G-8E3T96G5PK",
};
// var app
// // if a Firebase instance doesn't exist, create one
// if (!firebase.apps.length) {
//     // Initialize Firebase
// }
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firebase = app;
