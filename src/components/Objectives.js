import { useContext, useState } from "react";
import { difficultyContext } from "../stateContexts";
const Objectives = () => {
    const difficulty = useContext(difficultyContext)
    //create a function that will read the difficultyContext and turn display styling to flex from none depending on which mode is selected in the context
    console.log(difficultyContext.Provider)
    console.log(difficulty)
    return (
        <div>
            <div id="easy-mode" style={{display: difficultyContext.Provider == 'easy' ? 'flex' : 'none'}}>
                Easy Mode Objectives
            </div>
            <div id="medium-mode" style={{display: difficultyContext.Provider == 'medium' ? 'flex' : 'none'}}>
                Medium Mode Objectives
            </div>
            <div id="hard-mode" style={{display: difficultyContext.Provider == 'hard' ? 'flex' : 'none'}}>
                Hard Mode Objectives
            </div>
            <button onClick={() => difficultyContext.Provider = '1234'}></button>
        </div >
    );
}

export default Objectives;