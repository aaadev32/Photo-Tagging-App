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
        let position1 = 0;
        let position2 = 0;
        let position3 = 0;
        let position4 = 0;
        console.log('click')
        function click(e) {
            // get the mouse cursor position at startup:
            position3 = e.clientX;
            position4 = e.clientY;
            document.onmouseup = null;
            // call a function whenever the cursor moves:
            document.onmousemove = dragMouse(e);
        }

        function dragMouse(e) {
            //position variables for the selection box start in bottom left corner and go clockwise
            //the corners may be calculated by finding a single corners x/y and adding the width to the x to find the next corner and adding height to the y to find the next
            if (document.onmousemove) {
                let selectionBox = document.getElementById('coordinates-tool');

                position1 = position3 - e.clientX;
                position2 = position4 - e.clientY;
                selectionBox.style.top = (selectionBox.offsetTop - position2) + "px";
                selectionBox.style.left = (selectionBox.offsetLeft - position4) + "px";

                let newY = selectionBox.style.top;
                let newX = selectionBox.style.left;
                console.log('trest')
            }
        }

        return (
            <div id="coordinates-tool" onMouseDown={(e) => click(e)}></div >
        );
    }
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
            <p id="coordinate-tracker">x-axis:{xAxis}, y-axis:{yAxis}</p>
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