import { initializeApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCifB3OWrW7BrRbHSM5MO9FTrRshGjeQGM",
  authDomain: "businesscard-225c8.firebaseapp.com",
  projectId: "businesscard-225c8",
  storageBucket: "businesscard-225c8.firebasestorage.app",
  messagingSenderId: "862648091307",
  appId: "1:862648091307:web:86a527cf556f9bf692edee",
};

// Initialize Firebase only if it hasn't been initialized already
export const FIREBASE_APP = getApps().length === 0 
  ? initializeApp(firebaseConfig) 
  : getApps()[0];

export const FIREBASE_Auth = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
