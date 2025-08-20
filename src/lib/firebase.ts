// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSyjUsDUI7UnEWEI_2cOtKZ1BvpCq1z4Q",
  authDomain: "cynergy-website-75db7.firebaseapp.com",
  projectId: "cynergy-website-75db7",
  storageBucket: "cynergy-website-75db7.firebasestorage.app",
  messagingSenderId: "69980776805",
  appId: "1:69980776805:web:db747823f07753dc07d98c",
  measurementId: "G-KN6RCQBGZE"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
