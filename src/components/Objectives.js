import { useEffect, useState, forceUpdate } from "react";
import { Link } from "react-router-dom"
import * as mediaModule from "../mediaExports"

const Objectives = () => {
    const [characterList, setCharacterList] = useState(JSON.parse(sessionStorage.getItem(`characterList`)));
    const [characterKeys, setCharacterKeys] = useState(Object.keys(characterList));
    const easyCharacterImages = [mediaModule.guile, mediaModule.ironman, mediaModule.leo, mediaModule.ryu, mediaModule.scorpion, mediaModule.venom];
    const mediumCharacterImages = [mediaModule.amaterasu, mediaModule.cloud, mediaModule.commanderShephard, mediaModule.dukeNukem, mediaModule.jakDaxter, mediaModule.slyCooper];
    const hardCharacterImages = [mediaModule.batrider, mediaModule.darkSeer, mediaModule.luna, mediaModule.magnus, mediaModule.medusa, mediaModule.naturesProphet, mediaModule.phantomAssassin, mediaModule.sven, mediaModule.tinker];
    let difficulty = sessionStorage.getItem("difficulty");


    console.log(characterKeys)
    //fetchs entire character document from firestore db based on users selected difficulty
    console.log(characterList)
    const populateImages = () => {
        if (difficulty === "easy") {
            return easyCharacterImages.map((element, index) => <div className="objectives-images-div" key={`dkey-${index}`}><img className={"objectives-images"} key={`ikey-${index}`} src={element}></img> <p key={`pkey-${index}`}>{characterKeys[index]}</p></div>)
        } else if (difficulty === "medium") {
            return mediumCharacterImages.map((element, index) => <div className="objectives-images-div" key={`dkey-${index}`}><img className={"objectives-images"} key={`ikey-${index}`} src={element}></img> <p key={`pkey-${index}`}>{characterKeys[index]}</p></div>)
        } else if (difficulty === "hard") {
            return hardCharacterImages.map((element, index) => <div className="objectives-images-div" key={`dkey-${index}`}><img className={"objectives-images"} key={`ikey-${index}`} src={element}></img> <p key={`pkey-${index}`}>{characterKeys[index]}</p></div>)
        }
    }

    return (
        <div id="objectives-root">
            <div id="objectives-container">
                <h2>Here are your characters you need to find, take a minute to note their characterics so you can find them as fast as possible on the next page and get a high score!</h2>
                <div id="objectives-images-container">
                    {populateImages()}
                </div>
                <Link to={"/PhotoTagging/1"}><button>Play Now</button></Link>
            </div>
        </div >
    );
}

export default Objectives;