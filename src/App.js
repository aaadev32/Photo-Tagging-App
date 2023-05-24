import './App.css';
import Leaderboards from './components/Leaderboards.js';
import router from "./index.js";
import { Link } from "react-router-dom";
import chief from "./media/login-images/MasterChief2.png";
import mario from "./media/login-images/SuperMario.png";
import slippy from "./media/login-images/Slippy.png";
//the components themselves are treated as pages in themselves so there is no pages directory
function App() {

  return (
    <div id='root'>
      <div id='character-background-container'>
        <img className='character-background-image' src={""}></img>
        <img className='character-background-image' src={""}></img>
        <img className='character-background-image' src={""}></img>
      </div>
      <h1>welcome to the photo tagging speed run</h1>
      <Link to={"Leaderboards/1"}> <button>get started</button> </Link>
      <footer>mobile not supported</footer>
    </div>
  );
}

export default App;
