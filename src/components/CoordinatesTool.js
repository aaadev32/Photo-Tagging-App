
//this function will be used to create a draggable and resizeable box, it should log its positioning of each cornerwithin the photo
//element so you can use it to log a characters position within the photo and upload it to the database
const CoordinatesTool = (e) => {
    let position1 = 0;
    let position2 = 0;
    let position3 = 0;
    let position4 = 0;


    console.log('click')
    function clickElement(e) {
        // get the mouse cursor position at startup:
        position3 = e.clientX;
        position4 = e.clientY;
        document.onmouseup = stopDrag;
        // call a function whenever the cursor moves:
        document.onmousemove = dragElement;
    }

    function dragElement(e) {
        //position variables for the selection box start in bottom left corner and go clockwise
        //the corners may be calculated by finding a single corners x/y and adding the width to the x to find the next corner and adding height to the y to find the next
        let selectionBox = e.target;
        console.log(e)
        position1 = position3 - e.clientX;
        position2 = position4 - e.clientY;
        selectionBox.style.top = (selectionBox.offsetTop - position2) + "px";
        selectionBox.style.left = (selectionBox.offsetLeft - position1) + "px";

        console.log('312')
    }

    function stopDrag(e) {

        document.onmouseup = null;
        document.onmousemove = null;
        //below returns the coordinates of the four corners of the coordinates tool
        console.log(e.target)

    }

    function logCornerCoordinates(e) {
    }

    return (
        <div id="coordinates-tool">
            <div id="coordinates-tool-drag" onMouseDown={(e) => clickElement(e)}>Drag</div>
        </div >
    );
}

export default CoordinatesTool