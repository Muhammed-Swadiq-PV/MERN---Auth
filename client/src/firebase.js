// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-7f3f1.firebaseapp.com",
  projectId: "mern-auth-7f3f1",
  storageBucket: "mern-auth-7f3f1.appspot.com",
  messagingSenderId: "501018472672",
  appId: "1:501018472672:web:5ac6ffa79be74dadc7a085"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);