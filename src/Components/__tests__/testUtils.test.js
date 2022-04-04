import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import storeReducer from "../../Redux/Reducers/index";
import StartGame from "../Start/StartGame";

export default function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { user: storeReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}


export * from "@testing-library/react";

describe("UTILS", () => {
  it("Utils component", async () => {
    const component = render(<StartGame />);
  });
});
