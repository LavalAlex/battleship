import { NAME } from "../Actions/ActionsTypes";

const initialState = {
  name: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case NAME:
      return {
        ...state,
        name: action.payload,
      };

      default:
      return state;
  }
}
