// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAedKx0W6s204JYarZXh69W1vO5M2T0xoU",
  authDomain: "twitch-app-e5d55.firebaseapp.com",
  projectId: "twitch-app-e5d55",
  storageBucket: "twitch-app-e5d55.appspot.com",
  messagingSenderId: "454005446276",
  appId: "1:454005446276:web:3d95e9447736f8028394d1",
  measurementId: "G-84X6LH46V0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
