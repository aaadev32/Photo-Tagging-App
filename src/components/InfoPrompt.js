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

        //prevents possible unforeseen abuse
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