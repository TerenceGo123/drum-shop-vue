// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD7trVpszBqSH1GnpCEPIdAkOoMGZW7gM",
  authDomain: "my-drum-store.firebaseapp.com",
  databaseURL: "https://my-drum-store-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-drum-store",
  storageBucket: "my-drum-store.firebasestorage.app",
  messagingSenderId: "993028920039",
  appId: "1:993028920039:web:00a894c106c71b8ae84842"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);