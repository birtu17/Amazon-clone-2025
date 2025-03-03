// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcsV10zAersbCXoT8Ztxf2KxmMU-IYNk0",
  authDomain: "clone-d0560.firebaseapp.com",
  projectId: "clone-d0560",
  storageBucket: "clone-d0560.firebasestorage.app",
  messagingSenderId: "663557740604",
  appId: "1:663557740604:web:de3fde0e06ef8d84d78b39",
};

// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
