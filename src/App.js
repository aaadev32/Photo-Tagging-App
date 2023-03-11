import './App.css';
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

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

function App() {
  return (
    <div className="App">
      TEST
    </div>
  );
}

export default App;
