import { useState } from "react";
//should display the time elapsed and change colors based on user true/false selection
const InfoPrompt = () => {
    const [timer, setTimer] = useState(0);

    function incrementTimer() {
        let inc = timer;
        setTimer(++inc);
        console.log(timer)
    }
    //TODO causes the CharacterDropdown to rerender every second, fix at a later time 4/21/23
    setTimeout(incrementTimer, 1000)

    return (
        <div id="info-prompt"> time: {timer}</div>
    )
}

export default InfoPrompt