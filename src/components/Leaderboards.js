import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";


const Leaderboards = () => {
    //turns the display of the clicked difficulty in the Objectives Component  to flex and others to none
    const setObjectives = (difficulty) => {
        sessionStorage.setItem("difficulty", `${difficulty}`);
        getCharacterCollection();

    }
    
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

    return (
        <div id="home-container">
            <div id="greeting">Welcome to the Photo Tagging Speed Run</div>
            <div>Check Out Previous Users High Scores</div>

            <div id="leaderboards-container">
                <div id="leaderboard-easy">
                    easy leaderboard
                    <ol>
                        <li>score</li>
                        <li>score</li>
                        <li>score</li>
                    </ol>
                    <Link to={'Objectives/1'}>
                        <button onClick={() => setObjectives("easy")}>Play Easy</button>
                    </Link>
                </div>
                <div id="leaderboard-medium">
                    medium leaderboard
                    <ol>
                        <li>score</li>
                        <li>score</li>
                        <li>score</li>
                    </ol>
                    <Link to={'Objectives/1'}>
                        <button onClick={() => setObjectives("medium")}>Play Medium</button>
                    </Link>

                </div>
                <div id="leaderboard-hard">
                    hard leaderboard
                    <ol>
                        <li>score</li>
                        <li>score</li>
                        <li>score</li>
                    </ol>

                    <Link to={'Objectives/1'}>
                        <button onClick={() => setObjectives("hard")}>Play Hard</button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Leaderboards;