import './App.css';
import Leaderboards from './components/Leaderboards.js';
import router from "./index.js";
import { Link } from "react-router-dom";
//the components themselves are treated as pages in themselves so there is no pages directory
function App() {

  return (
    <div id='root'>
      <h1>welcome to the photo tagging speed run</h1>
      <p>test your gaming history and dexterity</p>
      <Link to={"Leaderboards/1"}> <button>get started</button> </Link>
      <footer>currently supported only on desktop</footer>
    </div>
  );
}

export default App;
