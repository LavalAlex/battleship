import { combineReducers } from "redux";
import playerReducer from "./player";
import computerReducer from "./computer";
import gameReducer from "./game";

const reducers = combineReducers({
  player: playerReducer,
  computer: computerReducer,
  game: gameReducer,
});

export default reducers;
