import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Leaderboards from './components/Leaderboards.js'
import Objectives from './components/Objectives.js'
import EndGame from './components/EndGame.js'
import PhotoTagging from './components/PhotoTagging.js'
import { DifficultyContext } from './stateContexts';


const router = createBrowserRouter([

  {
    path: "/",
    element: <App />
  },
  {
    path: "Leaderboards/:LeaderboardsId",
    element: <Leaderboards />,
  },
  {
    path: "Objectives/:ObjectivesId",
    element: <Objectives />,
  },
  {
    path: "PhotoTagging/:PhotoTaggingId",
    element: <PhotoTagging />,
  },
  {
    path: "EndGame/:EndGame",
    element: <EndGame />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DifficultyContext.Provider value={DifficultyContext.Provider}>
      <RouterProvider router={router} />
    </DifficultyContext.Provider>
  </React.StrictMode>
);

