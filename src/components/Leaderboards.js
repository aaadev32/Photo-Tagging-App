import {useState } from "react";
import { Link } from "react-router-dom";
import { difficultyContext } from "../stateContexts"

const Leaderboards = () => {
    const [difficulty, setDifficulty] = useState(null);

    //turns the display of the clicked difficulty in the Objectives Component  to flex and others to none
    const setObjectives = (difficulty) => {
        //set the value of the global state difficultySelection to that of the one selected
        difficultyContext.Provider = 'test1234';
        console.log(difficultyContext)
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
                        <button onClick={setObjectives("easy")}>Play Easy</button>
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
                        <button onClick={setObjectives("medium")}>Play Medium</button>
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
                        <button onClick={setObjectives("hard")}>Play Hard</button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Leaderboards;