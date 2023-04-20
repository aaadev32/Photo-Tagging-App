import { useState } from "react";
//coordinates tool is a dev tool not used in production but left for documentation purposes
import CoordinatesTool from "./CoordinatesTool";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firebaseConfig, app, db } from "../firebaseConfig";

//TODO update the selection options after the user selects correctly 


const PhotoTagging = () => {

    const [photoXAxis, setPhotoXAxis] = useState(0);
    const [photoYAxis, setPhotoYAxis] = useState(0);
    const [dropdownCoordinates, setDropdownCoordinates] = useState([0, 0]);
    const [renderDropdown, setRenderDropdown] = useState(false);

    let jsonCharacterList = sessionStorage.getItem("character list")
    let characterList = JSON.parse(jsonCharacterList);
    console.log(characterList)
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
        let characterKeys = Object.keys(characterList);
        console.log(characterKeys);
        let dropdownStyling = {
            left: `${dropdownCoordinates[0]}px`,
            top: `${dropdownCoordinates[1]}px`,
        }
        renderDropdown == true ? dropdownStyling.display = "block" : dropdownStyling.display = "none";

        return (

            //TODO make the option list populate based off of the selected difficulty from firestore database
            <div id="character-dropdown" style={dropdownStyling}>
                <label htmlFor="character-list"></label>
                <select id="character-list" name="character-list">
                    <option value={""}>Choose A Character</option>
                    {
                        characterKeys.map((element, index) => <option id={`dropdown-${index}`} value={element} onClick={() => { checkSelection(element, index) }}>{element}</option>)
                    }
                </select>
            </div >
        )
    }

    const SelectionPrompt = () => {
        return (
            <div id="selection-prompt"> selection prompt test <button>ok</button></div>
        )
    }

    //checks that the character selected in the CharacterDropdownMenu component is within the selected area, updates the selction menu accordingly.
    const checkSelection = (choice, index) => {
        console.log(choice);
        console.log(index)
        let chosenCharacter = characterList[`${choice}`]
        //bool for checking if chosen character was correct
        let characterSelect = null;
        let prompt = document.getElementById("selection-prompt");
        //TODO check that the selected character is within the user selected area, display a prompt saying if their choice is right or wrong, remove the option from the drop down if it is correct
        //checks if the click event is greater than the character left most x coordinates but less than its greatest x coordinate value
        if ((photoXAxis > chosenCharacter.upperLeftCoordinates[0]) && (photoXAxis < chosenCharacter.upperRightCoordinates[0]) && (photoYAxis > chosenCharacter.upperLeftCoordinates[1]) && (photoYAxis < chosenCharacter.lowerLeftCoordinates[1])) {
            console.log("true")
            characterSelect = true;
        } else {
            console.log("false")
            characterSelect = false;
        }

        prompt.style.display = "block";
        //TODO update options in character dropdown
        if (characterSelect) {
            let selctionNode = document.getElementById("character-list");
            let removeNode = document.getElementById(`dropdown-${index}`)
            console.log("character select true")
            selctionNode.removeChild(removeNode);
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
            <SelectionPrompt />
            <CharacterDropdownMenu />
            <div id="photo-tagging-image" onClick={(e) => { photoClick(e); }}>
                <CoordinatesTool />
            </div>
            <div id="cursor-coordinates-container">
                <ClickCoordinates />
            </div>
        </div>
    );
}

export default PhotoTagging;