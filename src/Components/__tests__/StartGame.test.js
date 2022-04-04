import React from "react";
import { fireEvent } from "@testing-library/react";
import render from "./testUtils.test";
import StartGame from "../Start/StartGame";

//Component StartGame
describe("SartGame", () => {
  let component;

  beforeEach(() => {
    const mockHandler = jest.fn;
    component = render(<StartGame handleStart={mockHandler} />);
  });

  //title
  test('should show a title: "BATTLESHIP"', async () => {
    const title = component.getByText("BATTLESHIP");
    expect(title.parentNode).toHaveStyle("color: f03e3e");
  });

  //input
  test('should show a input with placeholder: "Player name"', async () => {
    component.getByPlaceholderText("Player name");
  });

  // button
  test("chicking the button calls event handler once", async () => {
    const mockHandler = jest.fn;
    const button = component.getByText("START GAME");
    expect(mockHandler.call).toHaveLength(1);
  });
});
