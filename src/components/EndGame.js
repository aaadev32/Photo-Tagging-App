import { useState } from "react";
import { addDoc, collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js"

const EndGame = () => {
    const [userScore, setUserScore] = useState(localStorage.getItem("user time"));

    let difficulty = sessionStorage.getItem("difficulty");

    //TODO write a function that checks the associated difficulty leaderboard and inserts the users score if its within the top 10, use .pop() or equivalent method to get rid of the 11th score.
    async function isHighScore() {

        let collectionTimes = {
            lowestTimeScore: null,
            lowestDocId: null,
            highestTimeScore: 0,
            highestDocId: null
        }
        let currentDoc = null;

        const querySnapshot = await getDocs(collection(db, `leaderboard test`));
        console.log(db)
        querySnapshot.forEach((doc) => {
            currentDoc = doc.data();
            //these 2 if statements set the lowest and highest times to an object to compare to the users time score to see if its appropriate for the leaderboard, if it IS the highest time or even lowest time if applicable will be deleted and the users added
            //TODO the logic for these statements is backwards somehow
            console.log(currentDoc)
            if (Number(currentDoc.timeScore) > Number(collectionTimes.highestTimeScore)) {
                console.log(`${currentDoc.timeScore} is greater than ${collectionTimes.highestTimeScore}`);
                collectionTimes.highestTimeScore = currentDoc.timeScore;
                collectionTimes.highestDocId = doc.id;
            }
            if (Number(currentDoc.timeScore) < Number(collectionTimes.lowestTimeScore) || collectionTimes.lowestTimeScore === null) {
                console.log(`${currentDoc.timeScore} is less than ${collectionTimes.lowestTimeScore}`);
                collectionTimes.lowestTimeScore = currentDoc.timeScore;
                collectionTimes.lowestDocId = doc.id;
            }
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        console.log(collectionTimes)

    }

    async function submitTime(userName, userCountry) {
        try {
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
                <button type="button" onClick={isHighScore}>get doc test</button>
            </form>
        </div>
    );
}

export default EndGame;