import { Link } from "react-router-dom"
const Objectives = () => {
    let difficulty = localStorage.getItem("difficulty");
    return (
        <div>
            <div id="easy-mode" style={{ display: difficulty === 'easy' ? 'flex' : 'none' }}>
                Easy Mode Objectives
                <Link to={"/PhotoTagging/1"}><button>Play Now</button></Link>
            </div>
            <div id="medium-mode" style={{ display: difficulty === 'medium' ? 'flex' : 'none' }}>
                Medium Mode Objectives
                <Link to={"/PhotoTagging/1"}><button>Play Now</button></Link>
            </div>
            <div id="hard-mode" style={{ display: difficulty === 'hard' ? 'flex' : 'none' }}>
                Hard Mode Objectives
                <Link to={"/PhotoTagging/1"}> <button>Play Now</button> </Link>
            </div>
        </div >
    );
}

export default Objectives;