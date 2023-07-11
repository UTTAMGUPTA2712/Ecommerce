// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsIxUiWXSikphS4hQDQex0mzT30g6rCyg",
  authDomain: "ecommerce-f51d2.firebaseapp.com",
  projectId: "ecommerce-f51d2",
  storageBucket: "ecommerce-f51d2.appspot.com",
  messagingSenderId: "519862458951",
  appId: "1:519862458951:web:aa24307f4d1f39f1a8ef62"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);