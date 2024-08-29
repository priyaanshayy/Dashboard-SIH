import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtoWjp8cu9ggnrONAv1RZ8RxNLIuLgyRs",
  authDomain: "collab-o-452a2.firebaseapp.com",
  projectId: "collab-o-452a2",
  storageBucket: "collab-o-452a2.appspot.com",
  messagingSenderId: "289580180962",
  appId: "1:289580180962:web:a66f65df99d6fdb69005bb",
  measurementId: "G-FVS0XWFXHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
