import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Menu from "./components/Menu/Menu"
import Frame from "./components/Frame/Frame"
import History from './components/History/History';
import Credits from './components/Credits/Credits';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />
  },
  {
    path: "/game",
    element: <Frame />
  },
  {
    path: "/history",
    element: <History />
  },
  {
    path: "/credits",
    element: <Credits />
  }
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={(router)}/>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
