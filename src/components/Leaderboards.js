import { Link, json, useNavigate, } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

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
                <li key={index}>{element.name} country: {element.country} time: {element.timeScore}</li>
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
                <li key={index}>{element.name} country: {element.country} time: {element.timeScore}</li>
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
                <li key={index}>{element.name} country: {element.country} time: {element.timeScore}</li>
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
        <div id="leaderboard-container">
            <div id="greeting">Welcome to the Photo Tagging Speed Run</div>
            <div>Check Out Previous Users High Scores</div>

            <div id="leaderboards-container">
                <div id="leaderboard-easy">
                    easy leaderboard
                    <ol>
                        <PopulateEasyLbList />
                    </ol>
                    <Link to={'/Objectives/1'}>
                        <button onClick={() => setObjectives("easy")}>Play Easy</button>
                    </Link>
                </div>
                <div id="leaderboard-medium">
                    medium leaderboard
                    <ol>
                        <PopulateMediumLbList />
                    </ol>
                    <Link to={'/Objectives/1'}>
                        <button onClick={() => setObjectives("medium")}>Play Medium</button>
                    </Link>

                </div>
                <div id="leaderboard-hard">
                    hard leaderboard
                    <ol>
                        <PopulateHardLbList />
                    </ol>

                    <Link to={'/Objectives/1'}>
                        <button onClick={() => setObjectives("hard")}>Play Hard</button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Leaderboards;