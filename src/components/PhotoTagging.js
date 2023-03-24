import { useState } from "react";
import collage from "../media/image233.png"

const PhotoTagging = () => {
    const [xAxis, setxAxis] = useState(0)
    const [yAxis, setyAxis] = useState(0)
    let xPosition = 0;
    let yPosition = 0;

    //this function will be used to create a draggable and resizeable box, it should log its positioning of each cornerwithin the photo
    //element so you can use it to log a characters position within the photo and upload it to the database
    const CoordinatesTool = (e) => {
        console.log(e)
        //position variables for the selection box start in bottom left corner and go clockwise
        let corner1 = null;
        let corner2 = null;
        let corner3 = null;
        let corner4 = null;

        return (
            <div id="coordinates-tool" onMouseDown={(e) => CoordinatesTool(e)}></div >
        );
    }
    //create a nested component and display that logs x, y coordinates on mouse click AND mouse over this will be used just for creating element coordinates for your characters
    //it should not be included in production build
    const UpdateCoordinates = (e) => {
        //check that an event has fired else this throws an error, e.preventDefault() doesnt work or perhaps i used it incorrectly
        if (e.target) {
            console.log(e.target.offsetLeft);

            //the below calculations take the global x and y positioning of the click event and subtract the the elements top and left positioning from within the document to get
            //the x and y positioning of the click relative to the element itself
            setxAxis(e.clientX - e.target.offsetLeft);
            setyAxis(e.clientY - e.target.offsetTop);
        }
        //console.log(xPosition, yPosition);
        return (
            <p id="coordinate-tracker">x-axis:{xAxis}, y-axis:{yAxis}</p>
        );
    }
    return (
        <div id="photo-tagging-container">
            <div id="photo-tagging-image-container">
                <img src={collage} id="photo-tagging-image" onClick={(e) => UpdateCoordinates(e)}>
                </img>
                <CoordinatesTool />
            </div>

            <div id="cursor-coordinates-container">
                <UpdateCoordinates />
            </div>
        </div>
    );
}

export default PhotoTagging;