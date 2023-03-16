import './App.css';
import * as fireBaseFunctions from "./firebaseConfig.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.js'

//the components themselves are treated as pages in themselves so there is no pages directory
function App() {

  return (
    <Home />
  );
}

export default App;
