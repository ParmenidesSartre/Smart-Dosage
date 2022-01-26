// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQKksNAL8WsCiiydznVL_jEus4ZCu8oVU",
  authDomain: "lapapps-bbbcb.firebaseapp.com",
  projectId: "lapapps-bbbcb",
  storageBucket: "lapapps-bbbcb.appspot.com",
  messagingSenderId: "354426386393",
  appId: "1:354426386393:web:2187cfb4081d7ebf318bc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()