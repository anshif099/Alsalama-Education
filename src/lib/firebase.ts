// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8_D9UEcLlxJffJ4ipf3YVlO9scRXbVLc",
  authDomain: "alsalama-education.firebaseapp.com",
  projectId: "alsalama-education",
  storageBucket: "alsalama-education.firebasestorage.app",
  messagingSenderId: "488399270433",
  appId: "1:488399270433:web:7a3da6979fb4b05dcde960",
  measurementId: "G-HGQHY4KK89",
  databaseURL: "https://alsalama-education-default-rtdb.asia-southeast1.firebasedatabase.app" // In case needed, though authDomain could usually map to default for us-central1. We'll let initializeApp figure it out if default, but I'll add the standard one if not provided, wait actually firebase will auto-detect databaseURL if it's the default one, or I can just leave it out and let it infer. Let's just use what user provided, and export getDatabase.
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const database = getDatabase(app);