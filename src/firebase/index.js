import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAuRaWfukMoH8H6PoKGs-CUyxEcKFGldYE",
    authDomain: "anicha-579c1.firebaseapp.com",
    projectId: "anicha-579c1",
    storageBucket: "anicha-579c1.appspot.com",
    messagingSenderId: "494953735891",
    appId: "1:494953735891:web:5632ba59c78edc276a9626",
    measurementId: "G-38X86XEYK8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app);


export { app, auth, db }