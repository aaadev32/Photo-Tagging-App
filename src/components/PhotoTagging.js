import { useState, createElement, useEffect, createContext, useRef, useContext } from "react";
import { useBeforeUnload, useNavigate } from "react-router-dom";
//coordinates tool is a dev tool not used in production but left for documentation purposes
import CoordinatesTool from "./CoordinatesTool";
import { InfoPrompt, exportTimer } from "./InfoPrompt";
import { CurrentObjectives } from "./CurrentObjectives";
import * as mediaModule from "../mediaExports"


//important note: when the photo tagging image is not fully visible such as when it is scrolled with overflow on none of the character coordinates will be correct, this is a development oversight although
//i cannot think of an easy way to patch this issue, getting the x,y coordinates of a click relative to the clicked element is not possible without subtracting the client x/y - offsets bordering the element you click as far
//as i am aware, therefore if the sizing of the window is changed such that it hides any of the photo it throws off all coordinate checks, the best i can do is to disable overflow so the user is forced into fullscreen
//a way that might fix this would be to insert actual elements where my character coordinate boxes are that way there is a persistent node to check in checkSelection but the investment would not be worth the time it would cost

const PhotoTagging = () => {
    let jsonCharacterList = sessionStorage.getItem("characterList")
    const [photoXAxis, setPhotoXAxis] = useState(0);
    const [photoYAxis, setPhotoYAxis] = useState(0);
    const [dropdownCoordinates, setDropdownCoordinates] = useState([0, 0]);
    const [markerCoordinates, setMarkerCoordinates] = useState([0, 0]);
    const [falseSelectionCoordinates, setFalseSelectionCoordinates] = useState([0, 0]);
    const [renderDropdown, setRenderDropdown] = useState(false);
    const [createCharacterMarker, setCreateCharacterMarker] = useState(false);
    const [renderFalseMarker, setRenderFalseMarker] = useState(false);
    const [characterList, setCharacterList] = useState(JSON.parse(jsonCharacterList));
    const [characterMarkerNodes, setCharacterMarkerNodes] = useState([]);
    const timer = useContext(exportTimer);
    const navigate = useNavigate();
    let backgroundPhoto = {
        backgroundImage: `url(${mediaModule.easyImage})`,
        backgroundSize: "100% 100%"
    }
    let characterKeys = Object.keys(characterList);


    //dev tool that displays coordinates clicked within the photo 
    const ClickCoordinates = (e) => {
        return (
            <p id="coordinate-tracker">clicked area coordinates: x-axis:{photoXAxis}, y-axis:{photoYAxis}</p>
        )
    }

    //appears when then user clicks anywhere within the photo with a dropdown menu of characters for the selected difficulty to choose from
    const CharacterDropdownMenu = () => {

        let dropdownStyling = {
            left: `${dropdownCoordinates[0]}px`,
            top: `${dropdownCoordinates[1]}px`,
        }

        renderDropdown == true ? dropdownStyling.display = "block" : dropdownStyling.display = "none";

        return (

            <div id="character-dropdown" style={dropdownStyling}>
                <label htmlFor="character-list"></label>
                <select id="character-list" name="character-list">
                    <option value={""}>Choose A Character</option>
                    {
                        characterKeys.map((element, index) => <option id={`dropdown-${index}`} key={`dropdown-${index}`} value={element} onClick={() => { checkSelection(element, index) }}>{element}</option>)
                    }
                </select>
                <button>Confirm</button>
            </div >
        )
    }

    const CharacterMarker = () => {
        let nodeListCopy = [...characterMarkerNodes];
        let newNode = newChild();

        //TODO push to node list copy then set characterMarkerNodes state with it
        if (createCharacterMarker) {
            nodeListCopy.push(newNode);
            setCharacterMarkerNodes([...nodeListCopy])
            setCreateCharacterMarker(false);
        }

        const populateMarkerNodes = () => {
            return (
                characterMarkerNodes.map((element) => element)
            )
        }

        function newChild() {
            return createElement(
                "div",
                { className: "character-marker", key: `${nodeListCopy.length + 1}`, style: { display: "block", position: "absolute", left: `${markerCoordinates[0] - 17}px`, top: `${markerCoordinates[1] - 30}px` } },
                <img src={mediaModule.marker} style={{ height: "30px", width: "25px" }}></img>
            )
        }

        return (
            <div id="character-marker">
                {populateMarkerNodes()}
            </div>
        )
    }

    const FalseSelectionPopup = () => {

        let popupStyling = {
            left: `${falseSelectionCoordinates[0]}px`,
            top: `${falseSelectionCoordinates[1]}px`
        }

        renderFalseMarker ? popupStyling.display = "block" : popupStyling.display = "none";
        return (
            <div id="false-selection-popup" style={popupStyling}>Nope!!!</div>
        )
    }

    //checks that the character selected in the CharacterDropdownMenu component is within the selected area, updates the selection menu accordingly.
    const checkSelection = (choice, index) => {
        let chosenCharacter = characterList[`${choice}`]
        let popupElement = document.getElementById("false-selection-popup");
        //bool for checking if chosen character was correct
        let characterSelect = null;

        //enables display for FalseSelectionPopup component prompting the user that the selection was false
        function popupDisplay() {
            popupElement.style.display = "none";
            setRenderFalseMarker(false);
        }

        //checks if the click event is greater than the character left/bottom most x/y coordinates but less than its right/top most x/y coordinate values
        if ((photoXAxis > chosenCharacter.upperLeftCoordinates[0]) && (photoXAxis < chosenCharacter.upperRightCoordinates[0]) && (photoYAxis > chosenCharacter.upperLeftCoordinates[1]) && (photoYAxis < chosenCharacter.lowerLeftCoordinates[1])) {
            let deleteKey = characterKeys[index];
            let characterListCopy = characterList;
            characterSelect = true;
            console.log(index)
            //sets the image index to delete in the CharacterImages component
            sessionStorage.setItem("deleteImageIndex", `${index}`)
            //updates dropdown character list to not include correctly chosen character
            delete characterListCopy[deleteKey];
            setCharacterList(characterListCopy);
            let endGameCheck = Object.keys(characterList);
            setRenderDropdown(false);

            setMarkerCoordinates([...dropdownCoordinates]);
            setCreateCharacterMarker(true);
            if (endGameCheck.length === 0) {
                navigate("/EndGame/1");
            }
        } else {

            characterSelect = false;
            popupElement.style.display = "block";
            setFalseSelectionCoordinates([...dropdownCoordinates])
            setRenderFalseMarker(true);
            //turns off false selection popup after a time
            setTimeout(() => {
                popupDisplay();
            }, 1500);
            setRenderDropdown(false);
        }
    }

    //used to render PhotoTagging child components as well as log the user click
    const photoClick = (e) => {
        if (e.target) {
            //used to set help dropdownCoordinates state
            let clickPosition = [0, 0]
            //used to set help renderDropdown state
            let renderBool = null;

            //the below calculations take the global x and y positioning of the click event and subtract the the elements top and left offset positioning from within the document to get
            //the x and y positioning of the click relative to the edge of photo element itself
            setPhotoXAxis(e.clientX - e.target.offsetLeft);
            setPhotoYAxis(e.clientY - e.target.offsetTop);

            //character drop down element popup logic and styling, appears on click and disappears on consecutive click and so on, appears where user clicked within PhotoTagging component
            renderDropdown ? renderBool = false : renderBool = true;
            setRenderDropdown(renderBool);

            //added 5 to clientX so the user can click the same area to unrender the character dropdown
            clickPosition = [e.clientX + 5, e.clientY]
            setDropdownCoordinates([...clickPosition])
        }
    }
    //sets the photo image for the chosen difficulty, background photo must be reassigned in its entirety rather than through dot notation since backgroundImage is a read only property, backgroundSize doesnt apply when done through the css file for some reason so its set here
    if (sessionStorage.getItem("difficulty") === "easy") {
        backgroundPhoto = {
            backgroundImage: `url(${mediaModule.easyImage})`,
            backgroundSize: "100% 100%"
        }
    } else if (sessionStorage.getItem("difficulty") === "medium") {
        backgroundPhoto = {
            backgroundImage: `url(${mediaModule.mediumImage})`,
            backgroundSize: "100% 100%"

        }
    } else if (sessionStorage.getItem("difficulty") === "hard") {
        backgroundPhoto = {
            backgroundImage: `url(${mediaModule.hardImage})`,
            backgroundSize: "100% 100%"
        }
    }
    useEffect(() => {

        return () => {

            //prevents the user from refreshing this page to cheese score
            window.onload = (event) => {
                navigate("/");
            }
            //stops user from going back in browser history to prevent possible abuse of the leaderboards
            onpopstate = (event) => {
                navigate("/");
                //prevents user from cheesing the game loops

            }
        };
    }, []);

    return (
        <div id="photo-tagging-container">
            <InfoPrompt />
            <CurrentObjectives />
            <CharacterDropdownMenu />
            <FalseSelectionPopup />
            <CharacterMarker />
            <div id="photo-tagging-image" style={backgroundPhoto} onClick={(e) => { photoClick(e); }}>
                <CoordinatesTool />
            </div>
            <div id="cursor-coordinates-container">
            </div>
        </div>
    );
}

export { PhotoTagging };