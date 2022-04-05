import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Game from "./Components/Game/Game";
import StartGame from "./Components/Start/StartGame";
import GameOver from "./Components/Game/GameOver";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <StartGame />
          </Route>
          <Route path="/game/:name?">
            <Game />
          </Route>
          <Route path="/gameover/:name?">
            <GameOver />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
