// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
    deleteDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js";


// --------------------------------------------------
// FIREBASE CONFIG
// --------------------------------------------------

const firebaseConfig = {
    apiKey: "AIzaSyAFExHo6LvS0xpAAZ1WW-40J6hz2ET2-SI",
    authDomain: "ecommercewebsite-17aef.firebaseapp.com",
    projectId: "ecommercewebsite-17aef",

    // IMPORTANT:
    // This is the actual Storage bucket that now exists.
    storageBucket: "ecommercewebsite-17aef.firebasestorage.app",

    messagingSenderId: "968351741915",
    appId: "1:968351741915:web:18f7cebb8c193c6f1759fe"
};


// --------------------------------------------------
// INITIALIZE FIREBASE
// --------------------------------------------------

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// --------------------------------------------------
// EXPORT EVERYTHING
// --------------------------------------------------

export {
    auth,
    db,
    storage,

    // Firestore
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
    deleteDoc,
    serverTimestamp,

    // Storage
    ref,
    uploadBytes,
    getDownloadURL,

    // Auth
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged
};