import firebase from 'firebase/compat/app'; // Import the compat version for now
import 'firebase/compat/storage'; // Import the compat version for now
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore ,collection } from 'firebase/firestore'
// import { collection } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyBcGeNtCmmQgHPvl9xKG5-w-3VVF4hh8hM",
  authDomain: "clipcognition.firebaseapp.com",
  projectId: "clipcognition",
  storageBucket: "clipcognition.appspot.com",
  messagingSenderId: "932819564411",
  appId: "1:932819564411:web:597f25371e3f8e8382afde",
  measurementId: "G-E35220XD5L"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const db = getFirestore(app)
// export const notesCollection = collection(db, "clipcognition")

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const notesCollection = collection(db, "clipcognition")

export const storage = firebase.storage()