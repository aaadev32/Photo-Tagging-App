import { useState } from "react";
import collage from "../media/image233.png"
import CoordinatesTool from "./CoordinatesTool";

const PhotoTagging = () => {
    const [xAxis, setxAxis] = useState(0)
    const [yAxis, setyAxis] = useState(0)
    const [position1, setPosition1] = useState(0)
    const [position2, setPosition2] = useState(0)
    const [position3, setPosition3] = useState(0)
    const [position4, setPosition4] = useState(0)


    //create a nested component and display that logs x, y coordinates on mouse click AND mouse over this will be used just for creating element coordinates for your characters
    //it should not be included in production build
    const UpdateCoordinates = (e) => {
        //check that an event has fired else this throws an error, e.preventDefault() doesnt work or perhaps i used it incorrectly
        if (e.target) {

            //the below calculations take the global x and y positioning of the click event and subtract the the elements top and left positioning from within the document to get
            //the x and y positioning of the click relative to the element itself
            setxAxis(e.clientX - e.target.offsetLeft);
            setyAxis(e.clientY - e.target.offsetTop);
        }
        //console.log(xPosition, yPosition);
        return (
            <p id="coordinate-tracker">clicked area coordinates: x-axis:{xAxis}, y-axis:{yAxis}</p>
        );
    }
    return (
        <div id="photo-tagging-container">
            <div id="photo-tagging-image" onClick={(e) => UpdateCoordinates(e)}>
                <CoordinatesTool />
            </div>

            <div id="cursor-coordinates-container">
                <UpdateCoordinates />
            </div>
        </div>
    );
}

export default PhotoTagging;