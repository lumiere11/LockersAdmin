// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYY2zLOaO0RWHUWQ7U1OQYOJbk9CB6vTg",
  authDomain: "dagpacket-plataforma.firebaseapp.com",
  databaseURL: "https://dagpacket-plataforma-default-rtdb.firebaseio.com",
  projectId: "dagpacket-plataforma",
  storageBucket: "dagpacket-plataforma.appspot.com",
  messagingSenderId: "628490033893",
  appId: "1:628490033893:web:79f6ec5ff811f54235d20c",
  measurementId: "G-Q5CY6K4Q92"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth()
const db: Firestore = getFirestore(app);

export {app, auth, db}