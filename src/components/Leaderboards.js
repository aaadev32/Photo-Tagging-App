import { Link, json, useNavigate, } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import * as mediaModule from "../mediaExports"

const Leaderboards = () => {
    const navigate = useNavigate();
    const [render, setRender] = useState(false);
    //used to prevent null errors during a users fresh session  in the populateLb functions
    const [lbDataExists, setLbDataExists] = useState(false);
    const [refreshLbs, setRefreshLbs] = useState(false);
    //turns the display of the clicked difficulty in the Objectives Component  to flex and others to none
    const setObjectives = (difficulty) => {
        sessionStorage.setItem("difficulty", `${difficulty}`);
        getCharacterCollection();
        //a bandaid fix for allowing the async getCharacterCollection function compile the character list so they appear and update properly on the Objectives page, at my experience level im not sure what the best way to handle this is, useEffect is occupied by other functions in this component and in the Objectives component useEffect doesn seem to work with dependency array being used on sessionStorage or setting an event listener for storage changes or setting the sessionStorage variable state after a setTimeout function. 
        setTimeout(() => {
            navigate("/Objectives/1");
        }, 400);

    }
    //this is mostly used to instantiate the deleteImageIndex in a fresh session to keep CurrentObjectives from unintentionally deleting images, the CurrentObjectives component will read it as 0 if it is not instantiated at all.
    sessionStorage.setItem("deleteImageIndex", "null")
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
        let temp = 0;

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
        //insures that the leaderboards are rerendered when async data is retrieved 
        if (lbDataExists === false) {
            setLbDataExists(true)
        }
        console.log(lbDataExists)
    }

    //TODO make this print all object property key values into list items, worry about sorting it later just get it working for now
    const PopulateEasyLbList = () => {
        //this if statement on each PopulateLb component simply checks a bool that switches to true when the leaderboard data has fetched
        if (lbDataExists) {
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
    }

    const PopulateMediumLbList = () => {
        if (lbDataExists) {

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
    }

    const PopulateHardLbList = () => {
        if (lbDataExists) {

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
    }

    useEffect(() => {
        getLeaderboards();

        return () => {
            //stops user from going back in browser history to prevent possible abuse of the leaderboards
            //it seems redundant but i repaste this in PhotoTagging and EndGame, my reasoning is if the user manually navigates to those routes i do not want them being able to refresh the page to abuse leaderboard results in EndGame or cheese the PhotoTagging component game.
            onpopstate = (event) => {
                navigate("/");
            }

        };
    }, [lbDataExists]);
    return (
        <div id="leaderboards-root">
            <video id="leaderboards-video-background" src={mediaModule.arcade} autoPlay muted loop></video>
            <audio id="leaderboards-audio" src={mediaModule.arcadeAudio} autoPlay loop></audio>
            <div id="greeting" style={{ display: lbDataExists ? "flex" : "none" }}>
                <h2>Welcome to the leaderboards for the Photo Tagging Speed Run</h2>
                <h2>check out previously set high scores by other users from across the globe</h2>
            </div>

            <div id="leaderboards-async-prompt" style={{ display: lbDataExists ? "none" : "flex " }}>
                <h2>fetching leaderboard data...</h2>
            </div>

            <div id="leaderboards-container" style={{ display: lbDataExists ? "flex" : "none" }}>
                <div className="leaderboard-elements" id="leaderboard-easy">
                    <h2 className="leaderboard-elements-headers">easy leaderboard</h2>
                    <PopulateEasyLbList />
                    <button className="leaderboard-elements-buttons" onClick={() => setObjectives("easy")}>Play Easy</button>
                </div>
                <div className="leaderboard-elements" id="leaderboard-medium">
                    <h2 className="leaderboard-elements-headers">medium leaderboard</h2>
                    <PopulateMediumLbList />
                    <button className="leaderboard-elements-buttons" onClick={() => setObjectives("medium")}>Play Medium</button>
                </div>
                <div className="leaderboard-elements" id="leaderboard-hard">
                    <h2 className="leaderboard-elements-headers">hard leaderboard</h2>
                    <PopulateHardLbList />
                    <button className="leaderboard-elements-buttons" onClick={() => setObjectives("hard")}>Play Hard</button>
                </div>
            </div>
        </div>
    );
}

export default Leaderboards;