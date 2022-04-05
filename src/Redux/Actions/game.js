import { GAMECLEAR, WINNERGAME } from "./ActionsTypes";

export function gameWinner(payload) {
  return {
    type: WINNERGAME,
    payload,
  };
}

export function gameClear() {
  return {
    type: GAMECLEAR,
  };
}
