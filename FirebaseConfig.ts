import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCdyTVYEe36eLxFRNBcFVSeX806v5XPO2g",
  authDomain: "taskmanagement-99777.firebaseapp.com",
  projectId: "taskmanagement-99777",
  storageBucket: "taskmanagement-99777.firebasestorage.app",
  messagingSenderId: "502713758642",
  appId: "1:502713758642:web:4e28069532a283875aeaab"
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_Auth = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);