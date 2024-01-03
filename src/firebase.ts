// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcJMidUXwpqhyUXO4P5QPKbF3PcLrqbvc",
  authDomain: "laravel-86a61.firebaseapp.com",
  databaseURL: "https://laravel-86a61-default-rtdb.firebaseio.com",
  projectId: "laravel-86a61",
  storageBucket: "laravel-86a61.appspot.com",
  messagingSenderId: "325634781462",
  appId: "1:325634781462:web:3721ac0371d9b935a4a037"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
