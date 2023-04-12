import { useState, useContext } from "react";
import CoordinatesTool from "./CoordinatesTool";
import { DifficultyContext } from "../stateContexts";

const PhotoTagging = () => {
    //used to help render the character dropdowns and coordinates tool which is not featured in production build. 
    const [photoXAxis, setPhotoXAxis] = useState(0);
    const [photoYAxis, setPhotoYAxis] = useState(0);
    const [dropdownCoordinates, setDropdownCoordinates] = useState([0, 0]);
    const [renderDropdown, setRenderDropdown] = useState(false);

    //displays coordinates clicked within the photo 
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

            //TODO make the option list populate based off of the selected difficulty
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