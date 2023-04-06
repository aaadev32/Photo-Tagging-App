// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

import { collection, addDoc, setDoc, doc } from "firebase/firestore";


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

//Firestore Database Functions
//these functions were used once to upload to the DB a single time, leaving them commented for context purposes
/*
async function easySelection() {
    try {
        const docRef = await addDoc(collection(db, `easy difficulty`), {
            character1: 'Rool',
            character2: 'Master Chief',
            character3: 'Doctor Robotnik'
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function mediumSelection() {
    try {
        const docRef = await addDoc(collection(db, `medium difficulty`), {
            character1: 'Gordon Freeman',
            character2: 'Rayman',
            character3: 'Tails',
            character4: 'Laura Croft'
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function hardSelection() {
    try {
        const docRef = await addDoc(collection(db, `hard difficulty`), {
            character1: 'Amaterasu',
            character2: 'Duke Nukem',
            character3: 'Sly Cooper',
            character4: 'Commander Shepard',
            character5: 'Captain falcon',
            character6: 'Cloud'
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
easySelection();
mediumSelection();
hardSelection();
*/

async function uploadCharacterCoordinates() {
    // do this for every character
    try {
        const docRef = await setDoc(doc(db, "characters", "rool"), {
            upperLeftCoordinates: [1140, 356],
            upperRightCoordinates: [1194, 356],
            lowerLeftCoordinates: [1140, 449],
            lowerRightCoordinates: [1194, 449]
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
