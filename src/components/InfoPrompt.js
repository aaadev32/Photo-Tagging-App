import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
//should display the time elapsed and change colors based on user true/false selection
let exportTimer = 0
const InfoPrompt = () => {

    const [timer, setTimer] = useState(0);
    const navigate = useNavigate();
    function incrementTimer() {
        let inc = timer;
        setTimer(++inc);
        exportTimer = createContext(timer);

        //the PhotoTagging component page is loaded momentarily when the user attempts to use browser back buttons after receiving a score but is prevented and renavigated to the current page via an onpopstate listener from other components to prevent leaderboard abuse.
        // this can cause the timer to be set back to 0 before the page renavigates so this statement prevents that, i could not find a way to cancel onpopstate event navigations entirely in react-router-dom 6.11.2 (event.preventDefault() does not work for some reason)
        if (timer > 1) {
            sessionStorage.setItem("user score", `${timer}`)
        }
    }

    setTimeout(incrementTimer, 1000)
    return (
        <div id="info-prompt"> time: {timer}</div>
    )
}

export { InfoPrompt, exportTimer }