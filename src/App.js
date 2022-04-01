import React from "react";
import  ReactDOM  from "react-dom";
import "./App.css";
import { Route, Routes } from "react-router";
import Game from "./Components/Game/Game";
import StartGame from "./Components/Start/StartGame";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
