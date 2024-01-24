// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm8X36hM_z4lPxRL-y6-vJhk9zRIayEBw",
  authDomain: "mu-talk.firebaseapp.com",
  projectId: "mu-talk",
  storageBucket: "mu-talk.appspot.com",
  messagingSenderId: "137159898465",
  appId: "1:137159898465:web:925ecb4f50603c5c7a8120",
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export const storageService = firebase.storage();

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword };
