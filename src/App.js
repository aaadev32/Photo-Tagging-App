import './App.css';
import * as fireBaseFunctions from "./firebaseConfig.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Leaderboards from './components/Leaderboards.js'

//the components themselves are treated as pages in themselves so there is no pages directory
function App() {

  return (
    <Leaderboards />
  );
}

export default App;
