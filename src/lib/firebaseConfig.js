// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJdSmDrp0M9FKbmj53Nb97CSuIu9c5iDY",
  authDomain: "manager-users-da922.firebaseapp.com",
  projectId: "manager-users-da922",
  storageBucket: "manager-users-da922.firebasestorage.app",
  messagingSenderId: "543536463854",
  appId: "1:543536463854:web:6f6a5720c813ea0eea58ff",
  measurementId: "G-RYDT5G2BQ8"
};

// Initialize Firebase
// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);

// Exporter l'instance de Firestore
export { db, app };