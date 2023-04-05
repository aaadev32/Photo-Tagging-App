import { useState } from "react";
import collage from "../media/image233.png"
import CoordinatesTool from "./CoordinatesTool";
import { difficultyContext } from "../stateContexts";

const PhotoTagging = () => {
    const [xAxis, setxAxis] = useState(0)
    const [yAxis, setyAxis] = useState(0)
    const [dropdownX, setDropdownX] = useState(0);
    const [dropdownY, setDropdownY] = useState(0)
    let dropdownSelection = "";

    let falco = {
        upperLeftCoordinates: [1140, 356],
        upperRightCoordinates: [1194, 356],
        lowerLeftCoordinates: [1140, 449],
        lowerRightCoordinates: [1194, 449]
    }

    const PhotoClick = (e) => {
        //appears when then user clicks anywhere within the photo with a dropdown menu of characters for the selected difficulty to choose from
        const CharacterDropdownMenu = (e) => {

            return (
                <div>character dropdown menu</div>
            )
        }
        //checks for the character selected in dropdown menu in the area the user originally clicked
        //THIS FUNCTION IS MOCKED
        function characterCheck(e) {
            //after all character positions are uploaded change this to check the database for the position of the character that the user selects in the dropdown menu 
            if ((e.clientX - e.target.offsetLeft > falco.upperLeftCoordinates[0]) && (e.clientX - e.target.offsetLeft < falco.upperRightCoordinates[0]) && (e.clientY - e.target.offsetTop > falco.upperLeftCoordinates[1]) && (e.clientY - e.target.offsetTop < falco.lowerLeftCoordinates[1])) {
                return true;
            } else {
                return false;
            }
        }
        //check that an event has fired else this throws an error, e.preventDefault() doesnt work or perhaps i used it incorrectly
        if (e.target) {

            //the below calculations take the global x and y positioning of the click event and subtract the the elements top and left positioning from within the document to get
            //the x and y positioning of the click relative to the edge of 5photo element itself
            setxAxis(e.clientX - e.target.offsetLeft);
            setyAxis(e.clientY - e.target.offsetTop);
            //check click area for characters
            console.log(characterCheck(e));
        }

        return (
            <p id="coordinate-tracker">clicked area coordinates: x-axis:{xAxis}, y-axis:{yAxis}</p>
        );
    }
    return (
        <div id="photo-tagging-container">
            <div id="photo-tagging-image" onClick={(e) => PhotoClick(e)}>
                <CoordinatesTool />
            </div>

            <div id="cursor-coordinates-container">
                <PhotoClick />
            </div>
        </div>
    );
}

export default PhotoTagging;