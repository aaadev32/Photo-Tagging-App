import { useContext } from "react"
import { DropdownRenderContext } from "../stateContexts"

//appears when then user clicks anywhere within the photo with a dropdown menu of characters for the selected difficulty to choose from
const CharacterDropdownMenu = () => {
    console.log("dropdown")
    //make this appear in the area clicked and disappear when making a selection or clicking elsewhere
    let dropdownStyling = {
        display: "none",
    }
    DropdownRenderContext == true ? dropdownStyling.display = "block" : dropdownStyling.display = "none";
    //dropdownStyling.display == "block" ? dropdownStyling.display = "none" : dropdownStyling.display = "block";
    console.log(dropdownStyling.display)

    return (
        <div id="character-dropdown" style={dropdownStyling}>
            <label htmlFor="character-list"> Choose A Character</label>
            <select id="character-list">
                <option>char1</option>
                <option>char2</option>
                <option>char3</option>
                <option>char4</option>
            </select>
        </div >
    )
}

export default CharacterDropdownMenu