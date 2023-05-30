import "./App.css";
import Leaderboards from "./components/Leaderboards.js";
import router from "./index.js";
import { Link } from "react-router-dom";
import * as mediaModule from "./mediaExports.js"
//the components themselves are treated as pages in themselves so there is no pages directory
function App() {
  return (
    <div id='root'>
      <img src={mediaModule.cyberpunk} width={"100%"} height={"100%"}  frameBorder="0" class="giphy-embed"/>
        <div id='character-background-container'>
          <img className='character-background-image' src={mediaModule.mario}></img>
          <img className='character-background-image' src={mediaModule.ryuHome}></img>
          <img className='character-background-image' src={mediaModule.invoker}></img>
        </div>
        <h1>welcome to the photo tagging speed run</h1>
        <Link to={"Leaderboards/1"}> <button>get started</button> </Link>
        <footer>mobile not supported</footer>
    </div>
  );
}

export default App;
