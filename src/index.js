// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCppoyrgeZsWad4Zss93GdjjTdlCybn5Zk",
  authDomain: "so101-f8079.firebaseapp.com",
  projectId: "so101-f8079",
  storageBucket: "so101-f8079.firebasestorage.app",
  messagingSenderId: "1035056506659",
  appId: "1:1035056506659:web:93a76861ae259218bb8e96",
  measurementId: "G-T9EQSHWP55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);