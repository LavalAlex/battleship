import {
  COMPUTERBOARD,
  COMPUTERBOARDCLEAR,
  HITSCOMPUTER,
  HITSCOMPUTERCLEAR,
} from "./ActionsTypes";

export function computerBoard(payload) {
  return {
    type: COMPUTERBOARD,
    payload,
  };
}

export function computerBoardClear() {
  return {
    type: COMPUTERBOARDCLEAR,
  };
}

export function computerHit(payload) {
  return {
    type: HITSCOMPUTER,
    payload,
  };
}

export function computerHitClear() {
  return {
    type: HITSCOMPUTERCLEAR,
  };
}
