// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZpaYEtkIKCqatLIxegn8cbRyrltHtJtw",
    authDomain: "vue-demos-88c42.firebaseapp.com",
    databaseURL: "https://vue-demos-88c42-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-demos-88c42",
    storageBucket: "vue-demos-88c42.appspot.com",
    messagingSenderId: "231500115885",
    appId: "1:231500115885:web:df4685393aa6f0a7adfb24"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseStorage = getStorage(FirebaseApp);