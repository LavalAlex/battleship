import { HITSPLAYER, HITSPLAYERCLEAR, NAME, PLAYERBOAR, PLAYERBOARCLEAR } from "./ActionsTypes";

export function playerName(payload) {
  return {
    type: NAME,
    payload,
  };
}

export function playerBoard(payload) {
  return {
    type: PLAYERBOAR,
    payload,
  };
}

export function playerBoardClear() {
  return {
    type: PLAYERBOARCLEAR,
  };
}

export function playerHits(payload) {
  return {
    type: HITSPLAYER,
    payload,
  };
}

export function playerHitsClear(){
  return {
    type: HITSPLAYERCLEAR
  }
}