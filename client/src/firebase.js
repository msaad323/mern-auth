// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b7396.firebaseapp.com",
  projectId: "mern-auth-b7396",
  storageBucket: "mern-auth-b7396.firebasestorage.app",
  messagingSenderId: "962201236535",
  appId: "1:962201236535:web:3daf5c96d485b9d95d3bb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };