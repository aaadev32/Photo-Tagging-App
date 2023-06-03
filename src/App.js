import "./App.css";
import Leaderboards from "./components/Leaderboards.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import router from "./index.js";
import { Link } from "react-router-dom";
import * as mediaModule from "./mediaExports.js"

function App() {
  const navigate = useNavigate();

  useEffect(() => {

    return () => {
      //stops user from going back in browser history to prevent possible abuse of the leaderboards
      onpopstate = (event) => {
        navigate("/");
      }

    };
  });
  return (
    <div id='root'>
      <div id="home-root">
        <h1 className="home-slide-left-animation">Welcome to the Photo Tagging Speed Run</h1>

        <div id="home-about">
          <h2 className="home-slide-right-animation">Test your dexterity and expand your gaming character knowledge in this Wheres Waldo inspired game!</h2>
          <h2 className="home-slide-left-animation">Complete with a leaderboard system to compare your scores to people across the globe!</h2>
          <h2 className="home-slide-right-animation">Check out the leaderboards and try a few runs  <Link to={"Leaderboards/1"}><button id="home-button">Leaderboards</button> </Link></h2>

        </div>
        <img id="home-background" src={mediaModule.cyberpunk} />

        <footer>mobile not supported</footer>
      </div>
    </div >
  );
}

export default App;
