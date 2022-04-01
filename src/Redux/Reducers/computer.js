import {
  COMPUTERBOARD,
  COMPUTERBOARDCLEAR,
  HITSCOMPUTER,
} from "../Actions/ActionsTypes";

const initialState = {
  board: [],
  hits: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case COMPUTERBOARD:
      return {
        ...state,
        board: action.payload,
      };

    case COMPUTERBOARDCLEAR: {
      return [];
    }

    case HITSCOMPUTER: {
      return {
        ...state,
        hits: action.payload,
      };
    }
    default:
      return state;
  }
}
