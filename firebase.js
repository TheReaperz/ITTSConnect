// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBifVN8G2GXOw4xvuJONE4Y3tnxcojewBQ",
  authDomain: "ittsconnect-efd89.firebaseapp.com",
  projectId: "ittsconnect-efd89",
  storageBucket: "ittsconnect-efd89.appspot.com",
  messagingSenderId: "1035865124672",
  appId: "1:1035865124672:web:903b72ed3e05054f46d4a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

console.log("Firestore connection successful!");

export { app, db }; 
