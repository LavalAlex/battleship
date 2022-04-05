import { GAMECLEAR, WINNERGAME } from "../Actions/ActionsTypes";

const initialState = {
  winner: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case WINNERGAME:
      return {
        ...state,
        winner: action.payload,
      };

    case GAMECLEAR:
      return {
        ...state,
        winner:null
      }
    default:
      return state;
  }
}
