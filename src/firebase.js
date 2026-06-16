import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlzNwhMzQY-Wm29HR_tje-PbuwcyYsYXQ",
  authDomain: "dongri-cha-raja.firebaseapp.com",
  projectId: "dongri-cha-raja",
  storageBucket: "dongri-cha-raja.appspot.com",
  messagingSenderId: "379120494160",
  appId: "1:379120494160:web:09387c8e114e7b47201355",
  measurementId: "G-V54QBLC4KL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
