import { useState, useEffect } from "react"
import test from "../media/character-images/medium-mode/amaterasu.png"
import * as imageModule from "../imageExports"
const CurrentObjectives = () => {
    //TODO populate the CurrentObjectives component with the chosen difficulties associated character images
    const easyCharacterImages = [imageModule.guile, imageModule.ironman, imageModule.leo, imageModule.scorpion, imageModule.ryu, imageModule.venom];
    const mediumCharacterImages = [imageModule.amaterasu, imageModule.cloud, imageModule.commanderShephard, imageModule.dukeNukem, imageModule.slyCooper, imageModule.jakDaxter];
    const hardCharacterImages = [imageModule.batrider, imageModule.luna, imageModule.darkSeer, imageModule.magnus, imageModule.medusa, imageModule.naturesProphet, imageModule.phantomAssassin, imageModule.sven, imageModule.tinker];
    let jsonCharacterList = sessionStorage.getItem("character list");
    let difficulty = sessionStorage.getItem("difficulty")
    let parsedList = JSON.parse(jsonCharacterList);
    let characterKeys = Object.keys(parsedList);

    //TODO take the newly added image id's and associate them somehow with a truthy character dropdown list selection so that the image transitions out of the image list
    const populateImages = () => {
        if (difficulty === "easy") {
            return easyCharacterImages.map((element, index) => <img id={`image-${easyCharacterImages[index]}`} className={"current-objective-images"} key={`key-${index}`} src={element}></img>)
        } else if (difficulty === "medium") {
            return mediumCharacterImages.map((element, index) => <img id={`image-${mediumCharacterImages[index]}`} className={"current-objective-images"} key={`key-${index}`} src={element}></img>)
        } else if (difficulty === "hard") {
            return hardCharacterImages.map((element, index) => <img id={`image-${hardCharacterImages[index]}`} className={"current-objective-images"} key={`key-${index}`} src={element}></img>)
        }
    }
    return (
        <div id="current-objectives">
            {
                populateImages()
            }
        </div>
    );
}

export { CurrentObjectives }