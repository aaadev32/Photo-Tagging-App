import { useState } from "react";

const EndGame = () => {
    const [userScore, setUserScore] = useState(localStorage.getItem("user time"));
    let difficulty = sessionStorage.getItem("difficulty");
    //TODO set up function to post user submitted results to leadboards collection in firestore
    function submitTime(time) {
        console.log(time)
    }
    return (
        <div id="end-game-container">
            <div id="user-final-time">
                <p> Your Final Time Was {userScore} Seconds, Complete The Form Below to Submit Your Score To The "{difficulty}" Leaderboards</p></div>
            <form>
                <label htmlFor="user-name">Enter Your Name</label>
                <input id="user-name" placeholder="Name"></input>
                <button onClick={() => submitTime(document.getElementById("user-name").value)}>submit</button>
            </form>
        </div>
    );
}

export default EndGame;