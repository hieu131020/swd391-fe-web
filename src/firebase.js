// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWHwlJjlQc0zz34D_mYBbuk9eMlWny7aI",
  authDomain: "uploadingfile-175d8.firebaseapp.com",
  projectId: "uploadingfile-175d8",
  storageBucket: "uploadingfile-175d8.appspot.com",
  messagingSenderId: "820748105789",
  appId: "1:820748105789:web:77a660c03827754b071254"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);