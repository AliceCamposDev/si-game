import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Frame from "./components/Frame/Frame";
import History from "./components/History/History";
import Login from "./components/Login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GameOver from "./components/GameOver/GameOver";

const router = createBrowserRouter([
  {
    path: "/gameover",
    element: <GameOver />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/game",
    element: <Frame />,
  },
  {
    path: "/history",
    element: <History />,
  },
]);

const root = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="635981813825-j9633eq563tkb3f81rbjtt61t38kafef.apps.googleusercontent.com">
    <RouterProvider router={router} />
     <App/>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
