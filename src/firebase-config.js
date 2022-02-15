// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7Zy5gOzci3w-E5CD952r5XFLU1qAq_DM",
  authDomain: "volumelistener-1acf4.firebaseapp.com",
  projectId: "volumelistener-1acf4",
  storageBucket: "volumelistener-1acf4.appspot.com",
  messagingSenderId: "772627533950",
  appId: "1:772627533950:web:d974876328e3a3ae4cc82f",
  measurementId: "G-QGT1KXMXTC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();