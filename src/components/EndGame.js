import { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js"
import { Link, useNavigate } from "react-router-dom";

//this local object receives the highest time score document from the associated leaderboard collection in leaderboardUpdate function
//convert to a state at some point

//TODO find a way to prevent the user from using browser back arrows to submit their score several times
let collectionTimes = {
    highestTimeScore: 0,
    highestDocId: null,
    leaderboardEntries: 0
}

//must be called in the global scope otherwise this gets 4 times additively each time the EndGame page is loaded resulting in many listeners each time the page is loaded, useEffect slightly solves the problem but it still attaches additively

const EndGame = () => {
    const [userTimeScore, setUserTimeScore] = useState(sessionStorage.getItem("user time"));
    const [submitLeaderboard, setSubmitLeaderboard] = useState(null);
    const navigate = useNavigate();

    //changes page back to root page when user attempts to use back arrow in browser navigation ui
    let difficulty = sessionStorage.getItem("difficulty");

    //updates the local collectionTimes object to represent the most up to do date highest score from the respective leaderboard
    async function leaderboardUpdate() {
        let currentDoc = null;
        //leaderboard gets called several times to insure the local object is up to date so you must reset the leaderboardEntries before you run the forEach method that increments it otherwise it will not represent the actual entries properly
        const querySnapshot = await getDocs(collection(db, `leaderboard test`));
        collectionTimes.leaderboardEntries = 0;
        querySnapshot.forEach((doc) => {
            currentDoc = doc.data();
            collectionTimes.leaderboardEntries++;
            //this if statement set the highest times to an object to compare to the users time score to see if its appropriate for the leaderboard
            if (currentDoc.timeScore > collectionTimes.highestTimeScore) {
                collectionTimes.highestTimeScore = currentDoc.timeScore;
                collectionTimes.highestDocId = doc.id;
            }
            //deletes slowest times after 10
            if (collectionTimes.leaderboardEntries > 10) {
                docDelete();
            }
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
        });
        console.log(collectionTimes)
    }
    //this function serves to check if the users score is high enough to place on the leaderboard
    function isHighScore() {

        leaderboardUpdate();
        console.log(collectionTimes)
        if (collectionTimes.leaderboardEntries < 10) {
            setSubmitLeaderboard(true);
        } else {
            userTimeScore < collectionTimes.highestTimeScore ? setSubmitLeaderboard(true) : setSubmitLeaderboard(false);
        }
    }

    //this function submits a qualifying score to the leaderboard and removes the excess scores to keep a top 10 only leaderboard
    async function submitTime(userName, userCountry) {

        leaderboardUpdate();

        try {
            const docRef = addDoc(collection(db, `leaderboard test`), {
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
        await deleteDoc(doc(db, `leaderboard test`, `${collectionTimes.highestDocId}`));
        console.log(`document ${collectionTimes.highestDocId} deleted`)
    }

    useEffect(() => {
        //TODO figure out if this belongs here, too many rerenders when declared in component scope but it shouldnt be called every time location dependency changes
        isHighScore()
        return () => {
            //stops user from going back in browser history to prevent possible abuse of the leaderboards
            onpopstate = () => { navigate("/EndGame/1") }
        };
    });

    return (
        <div id="end-game-container">
            <div id="async-await-prompt" style={{ display: submitLeaderboard == null ? "flex" : "none" }}>
                <p>One Moment Please...</p>
            </div>
            <div id="leaderboard-submission-prompt" style={{ display: submitLeaderboard === true ? "flex" : "none" }}>
                <div id="user-final-time">
                    <p> Congratulations Your Speed Of {userTimeScore} Seconds Qualifies You For A Leaderboard Submission! Complete The Form Below to Submit Your Score To The "{difficulty}" Leaderboards</p>
                </div>
                <form id="leaderboard-submission-form">
                    <label htmlFor="user-name">Enter Your Name</label>
                    <input id="user-name" placeholder="Name"></input>
                    <input id="user-country" placeholder="Country"></input>
                    <Link to={"/Leaderboards/1"}><button type="button" onClick={() => submitTime(document.getElementById("user-name").value, document.getElementById("user-name").value)}>submit</button></Link>
                    <button type="button" onClick={() => { docDelete() }}>delete test</button>
                </form>
            </div>
            <div id="non-submission-prompt" style={{ display: submitLeaderboard === false ? "flex" : "none" }}>
                <p>Your Time Was {userTimeScore}, Try Again And See If You Can Qualify For A Spot On The Leaderboards!</p>
                <Link to={"/Leaderboards/1"}><button>Home</button></Link>
            </div>
        </div>
    );
}

export default EndGame;