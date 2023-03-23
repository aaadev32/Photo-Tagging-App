import { useState } from "react";
import collage from "../media/image233.png"

const PhotoTagging = () => {
    const [xAxis, setxAxis] = useState(0)
    const [yAxis, setyAxis] = useState(0)

    //create a nested component and display that logs x, y coordinates on mouse click AND mouse over this will be used just for creating element coordinates for your characters
    //it should not be included in production build
    const UpdateCoordinates = (e) => {
        //e.preventDefault();
        console.log(e.target.offsetLeft)
        //the below calculations take the global x and y positioning of the click event and subtract the the elements top and left positioning from within the document to get
        //the x and y positioning of the click relative to the element itself
        //const xPosition = e.clientX - e.target.offsetLeft;
        //const yPosition = e.clientY - e.target.offsetTop;

        //console.log(xPosition, yPosition);
        return (
            <p>x-axis:{xAxis}, y-axis:{yAxis}</p>
        );
    }
    return (
        <div id="photo-tagging-container">
            <img src={collage} id="photo-tagging-image" onClick={(e) => UpdateCoordinates(e)}></img>
            <div id="cursor-coordinates-container">
                <UpdateCoordinates />
            </div>
        </div>
    );
}

export default PhotoTagging;