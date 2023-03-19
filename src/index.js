import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.js'
import Objectives from './components/Objectives.js'
import Leaderboards from './components/Leaderboards.js'
import PhotoTagging from './components/PhotoTagging.js'


const router = createBrowserRouter([

  {
    path: "/",
    element: <App />
  },
  {
    path: "Home/:HomeId",
    element: <Home />,
  },
  {
    path: "Leaderboards/:LeaderboardId",
    element: <Leaderboards />,
  },
  {
    path: "Objectives/:ObjectivesId",
    element: <Objectives />,
  },
  {
    path: "PhotoTagging/:PhotoTaggingId",
    element: <PhotoTagging />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

