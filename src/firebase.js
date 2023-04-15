// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { config } from '../config/config.js'
import {
    collection, getDocs, addDoc, deleteDoc, doc, updateDoc, Timestamp, query, where
} from 'firebase/firestore/lite';
import "firebase/storage";
import {
    signInWithCredential,
    signInWithRedirect,
    getRedirectResult,
    getAuth,
    onAuthStateChanged, signOut,
    createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup
} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: "azufrestore.appspot.com",
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
    auth,
    getRedirectResult,
    signInWithRedirect,
    signInWithCredential,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    provider,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    storage,
    getDocs,
    deleteDoc,
    db,
    updateDoc,
    storageRef,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    doc,
    collection,
    addDoc,
    Timestamp,
    query, where,
}