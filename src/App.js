import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./common/Game/Game";
import StartGame from "./common/Start/StartGame";

function App() {
  return (

      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/game" element={<Game />} />
      </Routes>

  );
}

export default App;
