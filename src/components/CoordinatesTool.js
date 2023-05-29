//this component is a tool for developing the app and is not intended tofully cooperate with react by using states and other react library tools, this component will not be interacted with by the user ever.
//if you are having trouble getting this to drag you may need to mock a state in the parent component and set it during a click event to get it to render the drag and resize
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";


//the below 4 variables are the coordinates of each corner of the coordinate tool when its stops being dragged, these values are used when logging a characters position
let upperLeftCorner = 0;
let upperRightCorner = 0;
let lowerRightCorner = 0;
let lowerLeftCorner = 0
//the below 4 variables are used to set the new position of the coordinate tool when being dragged
let position1 = 0;
let position2 = 0;
let position3 = 0;
let position4 = 0;


const CoordinatesTool = (e) => {
    /* 

    let selectionBox = document.getElementById("coordinates-tool");
    let image = document.getElementById("photo-tagging-image");

    function clickElement(e) {

        e.preventDefault();
        console.log(document.getElementById("coordinates-tool"))
        console.log(document.getElementById("photo-tagging-image"))
        //absolute positioning is crucial to enable dragging.
        selectionBox.style.position = "absolute";

        // get the mouse cursor position at startup:
        position3 = e.clientX;
        position4 = e.clientY;
        document.onmouseup = stopDrag;
        // call dragElement function whenever the cursor moves:
        document.onmousemove = dragElement;
        console.log(e)
    }

    function dragElement(e) {
        position1 = position3 - e.clientX;
        position2 = position4 - e.clientY;
        selectionBox.style.top = (selectionBox.offsetTop - position2) + "px";
        selectionBox.style.left = (selectionBox.offsetLeft - position1) + "px";
    }

    function stopDrag(e) {
        //must be set fixed to acquire accurate coordinates of elements position relative to the image,
        //if done in absolute you will get coordinates relative to the document page instead
        selectionBox.style.position = "fixed";
        document.onmouseup = null;
        document.onmousemove = null;

        //the offsets of the image is used to help get the tool positioning because of the css positioning settings required to make the tool draggable also set the offsetParent as the document body
        //rather than the tools parentElement which is the photo tagging image so you must use the offsets of the photo and subtract them from the offsets of the box tool to get the coordinates of it relative to the photo
        //below returns the coordinates of the four corners of the coordinates tool element
        upperLeftCorner = [selectionBox.offsetLeft - image.offsetLeft, selectionBox.offsetTop - image.offsetTop];
        upperRightCorner = [selectionBox.offsetLeft - image.offsetLeft + selectionBox.offsetWidth, selectionBox.offsetTop - image.offsetTop];
        lowerLeftCorner = [selectionBox.offsetLeft - image.offsetLeft, selectionBox.offsetTop - image.offsetTop + selectionBox.offsetHeight];
        lowerRightCorner = [selectionBox.offsetLeft - image.offsetLeft + selectionBox.offsetWidth, selectionBox.offsetTop - image.offsetTop + selectionBox.offsetHeight];
        console.log(upperLeftCorner, upperRightCorner, lowerLeftCorner, lowerRightCorner)
    }
    //the below function uploads character maps to firestore database, must enable uploads via the rules tab in firestore website console to enable uploads.
    //if you resize the coordinates tool be sure to click the draggable box area to update the new coordinates area before uploading
    async function uploadCharacterCoordinates() {
        console.log(upperLeftCorner)
        let character = document.getElementById("upload-character-name").value;
        let collection = document.getElementById("upload-collection-name").value;
        const docRef = await setDoc(doc(db, `${collection}`, `${character}`), {
            upperLeftCoordinates: upperLeftCorner,
            upperRightCoordinates: upperRightCorner,
            lowerLeftCoordinates: lowerLeftCorner,
            lowerRightCoordinates: lowerRightCorner
        });

    }

    return (
        <div id="coordinates-tool">
            <div id="coordinates-tool-drag-area" onMouseDown={(e) => clickElement(e)}></div>
            <button id="upload-coordinates-button" onClick={() => uploadCharacterCoordinates()}>upload character</button>
            <input placeholder="collection name" id="upload-collection-name"></input>
            <input placeholder="character name" id="upload-character-name"></input>
        </div >
    );
    */
}



export default CoordinatesTool