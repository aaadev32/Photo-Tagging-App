import { difficultyContext } from "../stateContexts";
const Objectives = () => {

    //create a function that will read the difficultyContext and turn display styling to flex from none depending on which mode is selected in the context
    return (
        <div>objectives page test
            <div id="easy-mode">
                Easy Mode Objectives
            </div>
            <div id="medium-mode">
                Medium Mode Objectives
            </div>
            <div id="hard-mode">
                Hard Mode Objectives

            </div>

        </div>
    );
}

export default Objectives;