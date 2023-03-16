import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.js'
import Objectives from './components/Objectives.js'
import Leaderboards from './components/Leaderboards.js'
import photoTagging from './components/photoTagging.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "Leaderboards/",
        element: <Leaderboards />,
      },
      {
        path: "Objectives/",
        element: <Objectives />,
      },
      {
        path: "photoTagging/",
        element: <photoTagging />,
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
