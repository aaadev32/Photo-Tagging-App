import { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js"
import { Link, useNavigate } from "react-router-dom";
import { exportTimer } from "./InfoPrompt.js";

const EndGame = () => {
    console.log(exportTimer)
    const [userTimeScore, setUserTimeScore] = useState(sessionStorage.getItem("user score"));
    const [submitHighScore, setSubmitHighScore] = useState(null);
    const navigate = useNavigate();
    let collectionTimes = {
        highestTimeScore: 0,
        highestDocId: null,
        leaderboardEntries: 0
    }
    //changes page back to root page when user attempts to use back arrow in browser navigation ui
    let difficulty = sessionStorage.getItem("difficulty");
    console.log(difficulty)
    //updates the local collectionTimes object to represent the most up to do date highest score from the respective leaderboard
    async function leaderboardUpdate() {
        let currentDoc = null;
        //leaderboard gets called several times to insure the local object is up to date so you must reset the leaderboardEntries before you run the forEach method that increments it otherwise it will not represent the actual entries properly
        const querySnapshot = await getDocs(collection(db, `leaderboard ${difficulty}`));
        console.log(querySnapshot)
        collectionTimes.leaderboardEntries = 0;
        querySnapshot.forEach((doc) => {
            currentDoc = doc.data();
            collectionTimes.leaderboardEntries++;
            //this if statement set the highest times to an object to compare to the users time score to see if its appropriate for the leaderboard
            if (currentDoc.timeScore > collectionTimes.highestTimeScore) {
                collectionTimes.highestTimeScore = currentDoc.timeScore;
                collectionTimes.highestDocId = doc.id;
            }
            //deletes slowest times after 10 entries in case of async or code bugs
            if (collectionTimes.leaderboardEntries > 10) {
                docDelete();
                console.log(doc.id)
            }
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
        });
        if (collectionTimes.highestTimeScore > userTimeScore || collectionTimes.leaderboardEntries < 10) {
            setSubmitHighScore(true);
        } else {
            setSubmitHighScore(false);
        }
        console.log(collectionTimes)
    }

    //this function submits a qualifying score to the leaderboard and removes the excess scores to keep a top 10 only leaderboard
    async function submitTime(userName, userCountry) {

        leaderboardUpdate();

        try {
            const docRef = addDoc(collection(db, `leaderboard ${difficulty}`), {
                name: `${userName}`,
                country: `${userCountry}`,
                timeScore: Number(`${userTimeScore}`)
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }

    async function docDelete() {
        await deleteDoc(doc(db, `leaderboard ${difficulty}`, `${collectionTimes.highestDocId}`));
        console.log(`document ${collectionTimes.highestDocId} deleted`)
    }

    leaderboardUpdate();

    useEffect(() => {

        return () => {
            //stops user from going back in browser history to prevent possible abuse of the leaderboards
            onpopstate = (event) => {
                navigate("/Leaderboards/1");
                console.log("pop")
            }
        };
    }, []);

    return (
        <div id="end-game-container">
            <div id="async-await-prompt" style={{ display: submitHighScore == null ? "flex" : "none" }}>
                <p>One Moment Please...</p>
            </div>
            <div id="leaderboard-submission-prompt" style={{ display: submitHighScore === true ? "flex" : "none" }}>
                <div id="user-final-time">
                    <p> Congratulations Your Speed Of {userTimeScore} Seconds Qualifies You For A Leaderboard Submission! Complete The Form Below to Submit Your Score To The "{difficulty}" Leaderboards</p>
                </div>
                <form id="leaderboard-submission-form">
                    <label htmlFor="user-name">Enter Your Name</label>
                    <input id="user-name" placeholder="Name"></input>
                    <input id="user-country" placeholder="Country"></input>
                    <Link to={"/Leaderboards/1"}><button type="button" onClick={() => submitTime(document.getElementById("user-name").value, document.getElementById("user-country").value)}>submit</button></Link>
                </form>
            </div>
            <div id="non-submission-prompt" style={{ display: submitHighScore === false ? "flex" : "none" }}>
                <p>Your Time Was {userTimeScore}, Try Again And See If You Can Qualify For A Spot On The Leaderboards!</p>
                <Link to={"/Leaderboards/1"}><button>Home</button></Link>
            </div>
        </div>
    );
}

export default EndGame;