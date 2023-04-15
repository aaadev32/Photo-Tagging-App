import { useState, useContext } from "react";
//coordinates tool is a dev tool not used in production but left for documentation purposes
import CoordinatesTool from "./CoordinatesTool";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firebaseConfig, app, db } from "../firebaseConfig";

//TODO make character dropdown selections populate base on character collection
//will become an object with the selected difficulties list of characters
let characterList = null;

const PhotoTagging = () => {

    const [photoXAxis, setPhotoXAxis] = useState(0);
    const [photoYAxis, setPhotoYAxis] = useState(0);
    const [dropdownCoordinates, setDropdownCoordinates] = useState([0, 0]);
    const [renderDropdown, setRenderDropdown] = useState(false);
    let difficulty = localStorage.getItem("difficulty");
    //this will be assigned as what the user selects in the character dropdown
    let userCharacterSelection = "";


    //used to retrieve a specific character from firestore db
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

    //fetchs entire character document from firestore db based on users selected difficulty
    async function getCharacterCollection() {
        console.log(difficulty)
        characterList = await getDocs(collection(db, `characters ${difficulty}`));
        characterList.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }

    //dev tool that displays coordinates clicked within the photo 
    const ClickCoordinates = (e) => {
        return (
            <p id="coordinate-tracker">clicked area coordinates: x-axis:{photoXAxis}, y-axis:{photoYAxis}</p>
        )
    }

    //appears when then user clicks anywhere within the photo with a dropdown menu of characters for the selected difficulty to choose from
    const CharacterDropdownMenu = () => {
        console.log("dropdown", dropdownCoordinates)
        let arr = [1, 2, 3, 4, 5, 6]
        let dropdownStyling = {
            display: "none",
            position: "absolute",
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
                        arr.map(element => <option value={arr.value}>{element}</option>)
                    }
                </select>
            </div >
        )
    }

    //used to render PhotoTagging child components as well as log the user click
    const PhotoClick = (e) => {
        console.log(characterList)

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
    //keeps firestore db from being queried after initial render
    if (characterList == null) {
        getCharacterCollection();
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