import { useState } from "react";
import CoordinatesTool from "./CoordinatesTool";
import { difficultyContext } from "../stateContexts";

const PhotoTagging = () => {
    //used to help render the character dropdowns and coordinates tool which is not featured in production build. 
    const [xAxis, setxAxis] = useState(0);
    const [yAxis, setyAxis] = useState(0);

    let falco = {
        upperLeftCoordinates: [1140, 356],
        upperRightCoordinates: [1194, 356],
        lowerLeftCoordinates: [1140, 449],
        lowerRightCoordinates: [1194, 449]
    }
    //displays coordinates clicked within the photo 
    const ClickCoordinates = (e) => {
        return (

            <p id="coordinate-tracker">clicked area coordinates: x-axis:{xAxis}, y-axis:{yAxis}</p>

        )
    }

    //appears when then user clicks anywhere within the photo with a dropdown menu of characters for the selected difficulty to choose from
    function CharacterDropdownMenu(e) {

        //make this appear in the area clicked and disappear when making a selection or clicking elsewhere
        return (
            <div id="character-dropdown" style={{ display: "none" ? display = "flex" : display = "none" }}>
                <select>
                    <option>char1</option>
                    <option>char2</option>
                    <option>char3</option>
                    <option>char4</option>
                </select>
            </div>
        )
    }

    //mostly used to render PhotoTaggings child components as well as log the user click
    const PhotoClick = (e) => {

        //ensures components are rendered properly and saves client click coordinates
        if (e.target) {

            //the below calculations take the global x and y positioning of the click event and subtract the the elements top and left offset positioning from within the document to get
            //the x and y positioning of the click relative to the edge of photo element itself
            setxAxis(e.clientX - e.target.offsetLeft);
            setyAxis(e.clientY - e.target.offsetTop);
        }

    }
    return (
        <div id="photo-tagging-container">
            <div id="photo-tagging-image" onClick={(e) => PhotoClick(e)}>
                <CoordinatesTool />
                <CharacterDropdownMenu />
            </div>
            <div id="cursor-coordinates-container">
                <ClickCoordinates />
            </div>
        </div>
    );
}

export default PhotoTagging;