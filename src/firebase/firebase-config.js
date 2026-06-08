// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS5hpjuPM5SRO1lrqNm6sYi2y0MfHfT7k",
  authDomain: "stem-mentor-7896b.firebaseapp.com",
  projectId: "stem-mentor-7896b",
  storageBucket: "stem-mentor-7896b.firebasestorage.app",
  messagingSenderId: "613578811625",
  appId: "1:613578811625:web:4419d6412e443027882878",
  measurementId: "G-7G7SEWER1B",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };
// const analytics = getAnalytics(app);
