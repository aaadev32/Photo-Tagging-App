import { Link, useNavigate, } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect } from "react";

const Leaderboards = () => {
    const navigate = useNavigate();
    //turns the display of the clicked difficulty in the Objectives Component  to flex and others to none
    const setObjectives = (difficulty) => {
        sessionStorage.setItem("difficulty", `${difficulty}`);
        getCharacterCollection();
    }
    let easyLb = [];
    let mediumLb = [];
    let hardLb = [];

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
        sessionStorage.setItem("character list", `${jsonCollection}`);
    }
    async function getEasyLeaderboard() {
        const querySnapshot = await getDocs(collection(db, "leaderboard easy"));
        querySnapshot.forEach((doc) => {
            easyLb.push(doc.data());
            //console.log(doc.id, " => ", doc.data());
        });
    }
    async function getMediumLeaderboard() {
        const querySnapshot = await getDocs(collection(db, "leaderboard medium"));
        querySnapshot.forEach((doc) => {
            mediumLb.push(doc.data());
            //console.log(doc.id, " => ", doc.data());
        });
    }
    async function getHardLeaderboard() {
        const querySnapshot = await getDocs(collection(db, "leaderboard hard"));
        querySnapshot.forEach((doc) => {
            hardLb.push(doc.data());
            //console.log(doc.id, " => ", doc.data());
        });

    }

    //TODO make this print all object property key values into list items, worry about sorting it later just get it working for now
    const PopulateEasyLbList = () => {
        let test = <li>asf</li>
        console.log(easyLb)
        let test1, test2, test3 = 0
        let testObj = [test1 = { test: 1 }, test2 = { test2: 2 }, test3 = { test3: 3 }]
        let lbList = testObj.map((element, index) => {

            /*
            for (const [key, value] of Object.entries(element)) {
                <li> {key}: {value}</li>
            } */
            console.log(index)
        })


        return (
            <ol>{lbList} </ol>
        );
    }
    const populateMediumLbList = () => {

        return (

            //mediumLb.map((element) => <li>{element}</li>)
            <div>asdf</div>
        );
    }
    const populateHardLbList = () => {

        return (
            //hardLb.map((element) => <li>{element}</li>)
            <div>asdf</div>
        );
    }
    getEasyLeaderboard();
    getMediumLeaderboard();
    getHardLeaderboard();
    console.log(easyLb);

    useEffect(() => {

        return () => {
            //stops user from going back in browser history to prevent possible abuse of the leaderboards
            //it seems redundant but i repaste this in PhotoTagging and EndGame, my reasoning is if the user manually navigates to those routes i do not want them being able to refresh the page to abuse leaderboard results in EndGame or cheese the PhotoTagging component game.
            onpopstate = (event) => {
                navigate("/Leaderboards/1");
                console.log("pop")
            }
        };
    });
    return (
        <div id="home-container">
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
                        {populateMediumLbList()}
                    </ol>
                    <Link to={'/Objectives/1'}>
                        <button onClick={() => setObjectives("medium")}>Play Medium</button>
                    </Link>

                </div>
                <div id="leaderboard-hard">
                    hard leaderboard
                    <ol>
                        {populateHardLbList()}
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