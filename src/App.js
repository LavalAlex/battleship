import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./common/Game/Game";
import StartGame from "./common/Start/StartGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/game/:name" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
