// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtzHBw-0MerwY9f8qWRYBxJV0VOgLWqlQ",
  authDomain: "room-management-33a07.firebaseapp.com",
  databaseURL: "https://room-management-33a07-default-rtdb.firebaseio.com",
  projectId: "room-management-33a07",
  storageBucket: "room-management-33a07.appspot.com",
  messagingSenderId: "1079760027246",
  appId: "1:1079760027246:web:2821e17d1e57bcec64707f",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
