import { useState } from "react";
import CoordinatesTool from "./CoordinatesTool";
import { DropdownRenderContext } from "../stateContexts";
import CharacterDropdownMenu from "./CharacterDropdown";
import { serverTimestamp } from "firebase/firestore";
import { render } from "@testing-library/react";

const PhotoTagging = () => {
    //used to help render the character dropdowns and coordinates tool which is not featured in production build. 
    const [xAxis, setxAxis] = useState(0);
    const [yAxis, setyAxis] = useState(0);
    let renderDropdown = false;
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


    //mostly used to render PhotoTaggings child components as well as log the user click
    const PhotoClick = (e) => {

        //ensures components are rendered properly and saves client click coordinates
        if (e.target) {
            renderDropdown == false ? renderDropdown = true : renderDropdown = false;
            //the below calculations take the global x and y positioning of the click event and subtract the the elements top and left offset positioning from within the document to get
            //the x and y positioning of the click relative to the edge of photo element itself
            setxAxis(e.clientX - e.target.offsetLeft);
            setyAxis(e.clientY - e.target.offsetTop);
        }

    }
    return (
        <div id="photo-tagging-container">
            <div id="photo-tagging-image" onClick={(e) => { PhotoClick(e); }}>
                <CoordinatesTool />
                <DropdownRenderContext.Provider value={renderDropdown}>
                    <CharacterDropdownMenu />
                </DropdownRenderContext.Provider>
            </div>
            <div id="cursor-coordinates-container">
                <ClickCoordinates />
            </div>
        </div>
    );
}

export default PhotoTagging;