// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6cqIm3KHqB4BaSilCQQiIat_gli7AbDM",
  authDomain: "nuevadagpacket.firebaseapp.com",
  projectId: "nuevadagpacket",
  storageBucket: "nuevadagpacket.appspot.com",
  messagingSenderId: "47925489505",
  appId: "1:47925489505:web:e263b84cd870d780dcdf20",
  measurementId: "G-WPH86N0VSB"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth()
const db: Firestore = getFirestore(app);

export {app, auth, db}