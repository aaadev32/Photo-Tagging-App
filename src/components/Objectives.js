import { useState } from "react";
import { DifficultyContext } from "../stateContexts";
import { Link } from "react-router-dom"
const Objectives = () => {
    //create a function that will read the DifficultyContext and turn display styling to flex from none depending on which mode is selected in the context
    console.log(DifficultyContext.Provider)
    return (
        <div>
            <div id="easy-mode" style={{ display: DifficultyContext.Provider.value === 'easy' ? 'flex' : 'none' }}>
                Easy Mode Objectives
                <Link to={"/PhotoTagging/1"}><button>Play Now</button></Link>
            </div>
            <div id="medium-mode" style={{ display: DifficultyContext.Provider.value === 'medium' ? 'flex' : 'none' }}>
                Medium Mode Objectives
                <Link to={"/PhotoTagging/1"}><button>Play Now</button></Link>
            </div>
            <div id="hard-mode" style={{ display: DifficultyContext.Provider.value === 'hard' ? 'flex' : 'none' }}>
                Hard Mode Objectives
                <Link to={"/PhotoTagging/1"}> <button>Play Now</button> </Link>
            </div>
            <button onClick={() => DifficultyContext.Provider = '1234'}></button>
        </div >
    );
}

export default Objectives;