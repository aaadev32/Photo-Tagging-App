import { useState, createContext } from "react";
//should display the time elapsed and change colors based on user true/false selection
let exportTimer = 0
const InfoPrompt = () => {

    const [timer, setTimer] = useState(0);
    function incrementTimer() {
        let inc = timer;
        setTimer(++inc);
        exportTimer = createContext(timer)
    }


    setTimeout(incrementTimer, 1000)
    return (
        <div id="info-prompt"> time: {timer}</div>
    )
}

export { InfoPrompt, exportTimer }