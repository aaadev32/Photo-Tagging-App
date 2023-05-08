import { useState, createElement, useEffect, createContext, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
//coordinates tool is a dev tool not used in production but left for documentation purposes
import CoordinatesTool from "./CoordinatesTool";
import { InfoPrompt, exportTimer } from "./InfoPrompt";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firebaseConfig, app, db } from "../firebaseConfig";

const PhotoTagging = () => {

    let jsonCharacterList = sessionStorage.getItem("character list")

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
    let characterKeys = Object.keys(characterList);

    //used to retrieve a specific character from firestore db, might not be used, delete when finished
    /*
    async function getCharacterDoc() {

        const docRef = doc(db, `characters ${difficulty}`, `${userCharacterSelection}`);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            return null;
        }
    }
    */

    //dev tool that displays coordinates clicked within the photo 
    const ClickCoordinates = (e) => {
        return (
            <p id="coordinate-tracker">clicked area coordinates: x-axis:{photoXAxis}, y-axis:{photoYAxis}</p>
        )
    }


    //appears when then user clicks anywhere within the photo with a dropdown menu of characters for the selected difficulty to choose from
    const CharacterDropdownMenu = () => {
        console.log("dropdown", dropdownCoordinates);
        console.log(characterList);
        console.log(characterKeys);
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
                        characterKeys.map((element, index) => <option id={`dropdown-${index}`} key={`dropdown ${index}`} value={element} onClick={() => { checkSelection(element, index) }}>{element}</option>)
                    }
                </select>
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
            console.log(characterMarkerNodes)
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
                { className: "character-marker", key: `${nodeListCopy.length + 1}`, style: { display: "block", position: "absolute", left: `${markerCoordinates[0] - 5}px`, top: `${markerCoordinates[1]}px`, color: "pink" } },
                "Character Marker"
            )
        }

        console.log(characterMarkerNodes)
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
        console.log(choice);
        console.log(index);
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
            console.log("true");
            let deleteKey = characterKeys[index];
            let characterListCopy = characterList;
            console.log()
            characterSelect = true;

            //updates dropdown character list to not include correctly chosen character
            delete characterListCopy[deleteKey];
            setCharacterList(characterListCopy);
            let endGameCheck = Object.keys(characterList);
            setRenderDropdown(false);

            setMarkerCoordinates([...dropdownCoordinates]);
            setCreateCharacterMarker(true);
            //checks if list is empty bringing up the EndGame component page
            if (endGameCheck.length === 0) {
                sessionStorage.setItem("user time", `${timer}`)
                navigate("/EndGame/1");
            }
        } else {
            console.log("false");
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
        console.log(characterList)
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

    return (
        <div id="photo-tagging-container">
            <InfoPrompt />
            <CharacterDropdownMenu />
            <FalseSelectionPopup />
            <CharacterMarker />
            <div id="photo-tagging-image" onClick={(e) => { photoClick(e); }}>
                <CoordinatesTool />
            </div>
            <div id="cursor-coordinates-container">
                <ClickCoordinates />
            </div>
        </div>
    );
}

export { PhotoTagging };