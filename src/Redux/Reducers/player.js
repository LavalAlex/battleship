import {
  HITSPLAYER,
  HITSPLAYERCLEAR,
  NAME,
  PLAYERBOAR,
  PLAYERBOARCLEAR,
} from "../Actions/ActionsTypes";

const initialState = {
  name: "",
  board: [],
  hits: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case NAME:
      return {
        ...state,
        name: action.payload,
      };

    case PLAYERBOAR:
      return {
        ...state,
        board: action.payload,
      };

    case PLAYERBOARCLEAR:
      return [];

    case HITSPLAYER:
      return {
        ...state,
        hits: action.payload,
      };

    case HITSPLAYERCLEAR:
      return [];

    default:
      return state;
  }
}
