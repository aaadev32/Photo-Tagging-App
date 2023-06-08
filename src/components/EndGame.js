import { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import * as mediaModule from "../mediaExports";

const EndGame = () => {
    const [userTimeScore, setUserTimeScore] = useState(sessionStorage.getItem("userScore"));
    const [submitHighScore, setSubmitHighScore] = useState(null);
    const navigate = useNavigate();
    let collectionTimes = {
        highestTimeScore: 0,
        highestDocId: null,
        leaderboardEntries: 0
    }
    //changes page back to root page when user attempts to use back arrow in browser navigation ui
    let difficulty = sessionStorage.getItem("difficulty");
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
        navigate("/");
    }


    async function docDelete() {
        await deleteDoc(doc(db, `leaderboard ${difficulty}`, `${collectionTimes.highestDocId}`));
    }

    leaderboardUpdate();

    useEffect(() => {

        return () => {
            //prevents the user from refreshing this page to cheese score
            window.onload = (event) => {
                navigate("/");
            }
            //stops user from going back in browser history to prevent possible abuse of the leaderboards
            onpopstate = (event) => {
                navigate("/");
                //prevents user from cheesing the game loops

            }
        };
    }, []);

    return (
        <div id="end-game-container">
            <div id="end-game-async-await-prompt" style={{ display: submitHighScore == null ? "flex" : "none" }}>
                <h1>One Moment Please...</h1>
            </div>
            <div id="end-game-submission-prompt" style={{ display: submitHighScore === true ? "flex" : "none" }}>
                <video id="end-game-highscore-background" src={mediaModule.grid} autoPlay loop></video>
                <div id="user-final-time">
                    <h2>Congratulations Your Speed Of {userTimeScore} Seconds Qualifies You For A Leaderboard Submission! Complete The Form Below to Submit Your Score To The "{difficulty}" Leaderboards</h2>
                </div>
                <form id="end-game-submission-form" >
                    <div>
                        <label htmlFor="user-name">Enter Your Name</label>
                        <input id="user-name" className="end-game-submission-inputs" placeholder="Name" minLength={4} maxLength={42} required></input>
                    </div>
                    <div>
                        <label htmlFor="user-country">Enter Your Country</label>
                        <input id="user-country" className="end-game-submission-inputs" placeholder="Country" minLength={4} maxLength={42} required></input>
                    </div>
                    <button className="end-game-submission-inputs" type="button" onClick={(e) => document.getElementById("end-game-submission-form").checkValidity() ? submitTime(document.getElementById("user-name").value, document.getElementById("user-country").value) : document.getElementById("end-game-submission-form").reportValidity()}>submit</button>                </form>
            </div>
            <div id="end-game-no-submission-prompt" style={{ display: submitHighScore === false ? "flex" : "none" }}>
                <video className="end-game-no-highscore-background" src={mediaModule.noHighscore} autoPlay muted></video>
                <h3 id="end-game-no-submission-message">Your time was {userTimeScore},sorry but thats not quite fast enough to land a spot on the leaderboards... do give it another shot!<Link to={"/"}><button id="end-game-no-submission-message-button">Home</button></Link></h3>
            </div>
        </div >
    );
}

export default EndGame;