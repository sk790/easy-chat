// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "easy-chat-e8c2b.firebaseapp.com",
  projectId: "easy-chat-e8c2b",
  storageBucket: "easy-chat-e8c2b.appspot.com",
  messagingSenderId: "503478229250",
  appId: "1:503478229250:web:3c8fed7b30c907c17a4a1b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);