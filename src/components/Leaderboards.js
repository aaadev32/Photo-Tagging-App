import { Link, json, useNavigate, } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import * as mediaModule from "../mediaExports"

const Leaderboards = () => {
    const navigate = useNavigate();
    const [refreshLbs, setRefreshLbs] = useState(false);
    //turns the display of the clicked difficulty in the Objectives Component  to flex and others to none
    const setObjectives = (difficulty) => {
        sessionStorage.setItem("difficulty", `${difficulty}`);
        getCharacterCollection();
    }
    let fetchedLb = [];

    async function getCharacterCollection() {
        let fetchedCollection = null;
        let tempCollection = {};
        let jsonCollection = null;
        fetchedCollection = await getDocs(collection(db, `characters ${sessionStorage.getItem("difficulty")}`));
        fetchedCollection.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tempCollection[doc.id] = doc.data();
        });

        jsonCollection = JSON.stringify(tempCollection);
        console.log(jsonCollection)
        sessionStorage.setItem("characterList", `${jsonCollection}`);
    }

    //it was neccessary to set the retrieved leaderboards to local storage to avoid async/react state issues(one problem was the arrays would not be iterable although they would have the proper objects in each index) 
    async function getLeaderboards() {
        let easyFetchedLb = [];
        let mediumFetchedLb = [];
        let hardFetchedLb = [];

        const easyLbSnapshot = await getDocs(collection(db, "leaderboard easy"));
        easyLbSnapshot.forEach((doc) => {
            easyFetchedLb.push(doc.data())
            //console.log(doc.id, " => ", doc.data());
        });

        const mediumLbSnapshot = await getDocs(collection(db, "leaderboard medium"));
        mediumLbSnapshot.forEach((doc) => {
            mediumFetchedLb.push(doc.data())
            //console.log(doc.id, " => ", doc.data());
        });

        const hardLbSnapshot = await getDocs(collection(db, "leaderboard hard"));
        hardLbSnapshot.forEach((doc) => {
            hardFetchedLb.push(doc.data())
            //console.log(doc.id, " => ", doc.data());
        });
        localStorage.setItem("easyLb", JSON.stringify(easyFetchedLb));
        localStorage.setItem("mediumLb", JSON.stringify(mediumFetchedLb));
        localStorage.setItem("hardLb", JSON.stringify(hardFetchedLb));

        setRefreshLbs(refreshLbs ? false : true);
        [easyFetchedLb, mediumFetchedLb, hardFetchedLb] = [[], [], []]
    }

    //TODO make this print all object property key values into list items, worry about sorting it later just get it working for now
    const PopulateEasyLbList = () => {

        let stringLb = localStorage.getItem("easyLb")
        let easyLb = JSON.parse(stringLb);
        const lbList = easyLb.map((element, index) => {
            return (
                <li key={index}>name: {element.name} country: {element.country} time: {element.timeScore}</li>
            )
        })
        return (
            <ol>{lbList} </ol>
        );
    }
    const PopulateMediumLbList = () => {

        let stringLb = localStorage.getItem("mediumLb")
        let mediumLb = JSON.parse(stringLb);
        const lbList = mediumLb.map((element, index) => {
            return (
                <li key={index}>name: {element.name} country: {element.country} time: {element.timeScore}</li>
            )
        })
        return (
            <ol>{lbList} </ol>
        );
    }
    const PopulateHardLbList = () => {

        let stringLb = localStorage.getItem("hardLb")
        let hardLb = JSON.parse(stringLb);
        const lbList = hardLb.map((element, index) => {
            return (
                <li key={index}>name: {element.name} country: {element.country} time: {element.timeScore}</li>
            )

        })
        return (
            <ol>{lbList} </ol>
        );
    }


    useEffect(() => {
        //no states get set so this should only be queried twice at most because of initial component render
        getLeaderboards();
        return () => {
            //stops user from going back in browser history to prevent possible abuse of the leaderboards
            //it seems redundant but i repaste this in PhotoTagging and EndGame, my reasoning is if the user manually navigates to those routes i do not want them being able to refresh the page to abuse leaderboard results in EndGame or cheese the PhotoTagging component game.
            onpopstate = (event) => {
                navigate("/");
            }
        };
    }, []);
    return (
        <div id="leaderboards">
            <video id="leaderboards-video-background" src={mediaModule.arcade} autoPlay muted loop></video>
            <audio id="leaderboards-audio" src={mediaModule.arcadeAudio} autoPlay loop></audio>
            <div id="greeting">
                <h2>Welcome to the leaderboards for the Photo Tagging Speed Run</h2>
                <h2>check out previously set high scores by other users from across the globe</h2>
            </div>

            <div id="leaderboards-container">
                <div className="leaderboard-elements" id="leaderboard-easy">
                    <h2 className="leaderboard-elements-headers">easy leaderboard</h2>
                    <PopulateEasyLbList />
                    <Link to={'/Objectives/1'}>
                        <button className="leaderboard-elements-buttons" onClick={() => setObjectives("easy")}>Play Easy</button>
                    </Link>
                </div>
                <div className="leaderboard-elements" id="leaderboard-medium">
                    <h2 className="leaderboard-elements-headers">medium leaderboard</h2>
                    <PopulateMediumLbList />
                    <Link to={'/Objectives/1'}>
                        <button className="leaderboard-elements-buttons" onClick={() => setObjectives("medium")}>Play Medium</button>
                    </Link>
                </div>
                <div className="leaderboard-elements" id="leaderboard-hard">
                    <h2 className="leaderboard-elements-headers">hard leaderboard</h2>
                    <PopulateHardLbList />
                    <Link to={'/Objectives/1'}>
                        <button className="leaderboard-elements-buttons" onClick={() => setObjectives("hard")}>Play Hard</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Leaderboards;