import { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js"

const EndGame = () => {
    const [userScore, setUserScore] = useState(localStorage.getItem("user time"));

    let difficulty = sessionStorage.getItem("difficulty");
    //TODO set up function to post user submitted results to appropriate leadboards collection in firestore
    async function submitTime(userName, userCountry) {
        try {
            //TODO get this to automatically generate document names since it is not important, they will be sorted later by timeScore and only the top 10
            const docRef = addDoc(collection(db, `leaderboard test`), {
                name: `${userName}`,
                country: `${userCountry}`,
                timeScore: `${userScore}`
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <div id="end-game-container">
            <div id="user-final-time">
                <p> Your Final Time Was {userScore} Seconds, Complete The Form Below to Submit Your Score To The "{difficulty}" Leaderboards</p></div>
            <form>
                <label htmlFor="user-name">Enter Your Name</label>
                <input id="user-name" placeholder="Name"></input>
                <input id="user-country" placeholder="Country"></input>
                <button type="button" onClick={() => submitTime(document.getElementById("user-name").value, document.getElementById("user-name").value)}>submit</button>
            </form>
        </div>
    );
}

export default EndGame;