import { useState, useContext } from "react";
//coordinates tool is a dev tool not used in production but left for documentation purposes
import CoordinatesTool from "./CoordinatesTool";
import { DifficultyContext } from "../stateContexts";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig, app, db } from "../firebaseConfig";

//TODO retrieve the character collection from firestore db
//TODO make character dropdown selections populate base on character collection

const PhotoTagging = () => {

    const [photoXAxis, setPhotoXAxis] = useState(0);
    const [photoYAxis, setPhotoYAxis] = useState(0);
    const [dropdownCoordinates, setDropdownCoordinates] = useState([0, 0]);
    const [renderDropdown, setRenderDropdown] = useState(false);
    //this will be assigned as what the user selects in the character dropdown
    let userCharacterSelection = "";

    //used to retrieve the users character selection from firestore db
    async function getCharacterListDoc() {
        const docRef = doc(db, `characters ${DifficultyContext}`, `${userCharacterSelection}`);
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
    //fetches character document from firestore db based on users selected difficulty
    let characterList = getCharacterListDoc();
    console.log(characterList)

    //dev tool that displays coordinates clicked within the photo 
    const ClickCoordinates = (e) => {
        return (
            <p id="coordinate-tracker">clicked area coordinates: x-axis:{photoXAxis}, y-axis:{photoYAxis}</p>
        )
    }

    //appears when then user clicks anywhere within the photo with a dropdown menu of characters for the selected difficulty to choose from
    const CharacterDropdownMenu = () => {
        console.log("dropdown", dropdownCoordinates)

        let dropdownStyling = {
            display: "none",
            position: "absolute",
            left: `${dropdownCoordinates[0]}px`,
            top: `${dropdownCoordinates[1]}px`,
        }
        renderDropdown == true ? dropdownStyling.display = "block" : dropdownStyling.display = "none";
        //dropdownStyling.display == "block" ? dropdownStyling.display = "none" : dropdownStyling.display = "block";

        return (

            //TODO make the option list populate based off of the selected difficulty from firestore database
            <div id="character-dropdown" style={dropdownStyling}>
                <label htmlFor="character-list"></label>
                <select id="character-list">
                    <option value={""}>Choose A Character</option>
                    <option value={""}>char1</option>
                    <option value={""}>char2</option>
                    <option value={""}>char3</option>
                    <option value={""}>char4</option>
                </select>
            </div >
        )
    }

    //used to render PhotoTagging child components as well as log the user click
    const PhotoClick = (e) => {

        if (e.target) {
            //used to set help dropdownCoordinates state
            let clickPosition = [0, 0]
            //used to set help renderDropdown state
            let renderBoolCheck = null;
            //the below calculations take the global x and y positioning of the click event and subtract the the elements top and left offset positioning from within the document to get
            //the x and y positioning of the click relative to the edge of photo element itself
            setPhotoXAxis(e.clientX - e.target.offsetLeft);
            setPhotoYAxis(e.clientY - e.target.offsetTop);
            //character drop down element popup logic and styling, appears on click and disappears on consecutive click and so on, appears where user clicked within PhotoTagging component
            renderDropdown == false ? renderBoolCheck = true : renderBoolCheck = false;
            setRenderDropdown(renderBoolCheck);
            //added 5 to clientX so the user can click the same area to unrender the character dropdown
            clickPosition = [e.clientX + 5, e.clientY]
            setDropdownCoordinates([...clickPosition])
        }

    }
    return (
        <div id="photo-tagging-container">
            <CharacterDropdownMenu />
            <div id="photo-tagging-image" onClick={(e) => { PhotoClick(e); }}>
                <CoordinatesTool />
            </div>
            <div id="cursor-coordinates-container">
                <ClickCoordinates />
            </div>
        </div>
    );
}

export default PhotoTagging;