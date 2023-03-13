// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

import { collection, addDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyBZGpH3WNTDN86x81xf-TSr963OXj5L8wo",

    authDomain: "photo-tagging-75ac8.firebaseapp.com",

    projectId: "photo-tagging-75ac8",

    storageBucket: "photo-tagging-75ac8.appspot.com",

    messagingSenderId: "388620435076",

    appId: "1:388620435076:web:f249ace3431538eb190cd1",

    measurementId: "G-BB0JZ3WB3Z"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

//Firestore Database Function

async function generateDB() {
    try {
        const docRef = await addDoc(collection(db, `political figures`), {
            photo0: 'biden',
            photo1: 'obama',
            photo2: 'sanders',
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
generateDB();

