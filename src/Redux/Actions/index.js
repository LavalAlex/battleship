import { NAME } from "./ActionsTypes";

export function playerName(payload) {
  return {
    type: NAME,
    payload,
  };
}
