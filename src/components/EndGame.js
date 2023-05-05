import { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js"
import { Link } from "react-router-dom";

const EndGame = () => {
    const [userTimeScore, setUserTimeScore] = useState(localStorage.getItem("user time"));
    const [submitLeaderboard, setSubmitLeaderboard] = useState(null);
    let difficulty = sessionStorage.getItem("difficulty");
    //may need to be converted to a state in order to not be lost on refresh due to reacts functional nature
    let collectionTimes = {
        lowestTimeScore: null,
        lowestDocId: null,
        highestTimeScore: 0,
        highestDocId: null,
        leaderboardEntries: 0
    }

    async function getLeaderboard() {
        let currentDoc = null;

        const querySnapshot = await getDocs(collection(db, `leaderboard test`));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            currentDoc = doc.data();
            collectionTimes.leaderboardEntries++;
            //these 2 if statements set the lowest and highest times to an object to compare to the users time score to see if its appropriate for the leaderboard, if it IS the highest time or even lowest time if applicable will be deleted and the users added
            if (currentDoc.timeScore > collectionTimes.highestTimeScore) {
                collectionTimes.highestTimeScore = currentDoc.timeScore;
                collectionTimes.highestDocId = doc.id;
            }
            if (currentDoc.timeScore < collectionTimes.lowestTimeScore || collectionTimes.lowestTimeScore === null) {
                collectionTimes.lowestTimeScore = currentDoc.timeScore;
                collectionTimes.lowestDocId = doc.id;
            }

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        console.log(collectionTimes)
    }
    //this function serves to check if the users score is high enough to place on the leaderboard
    function isHighScore() {

        getLeaderboard();
        console.log(collectionTimes)

        if (collectionTimes.leaderboardEntries < 10) {
            setSubmitLeaderboard(true);
        } else {
            userTimeScore < collectionTimes.highestTimeScore ? setSubmitLeaderboard(true) : setSubmitLeaderboard(false);
        }
    }

    //this function submits a qualifying score to the leaderboard and removes the excess scores to keep a top 10 only leaderboard
    async function submitTime(userName, userCountry) {

        getLeaderboard();
        console.log(collectionTimes)

        //gets doc that you are about to delete for console logging purposes
        const docRef = doc(db, "leaderboard test", `${collectionTimes.highestDocId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Deleted Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        //TODO test this
        if (collectionTimes.leaderboardEntries >= 10) {
            //
            await deleteDoc(doc(db, `leaderboard test`, `${collectionTimes.highestDocId}`));
            console.log(`document ${collectionTimes.highestDocId} deleted`)
        }

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

        return () => {
            isHighScore()
        };
    }, []);

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
                    <Link to={"/"}><button type="button" onClick={() => submitTime(document.getElementById("user-name").value, document.getElementById("user-name").value)}>submit</button></Link>
                    <button type="button" onClick={() => { docDelete() }}>delete test</button>
                </form>
            </div>
            <div id="non-submission-prompt" style={{ display: submitLeaderboard === false ? "flex" : "none" }}>
                <p>Your Time Was {userTimeScore}, Try Again And See If You Can Qualify For A Spot On The Leaderboards!</p>
                <Link to={"/"}><button>Home</button></Link>
            </div>
        </div>
    );
}

export default EndGame;