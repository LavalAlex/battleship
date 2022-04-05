import React from "react";
import { render } from "./testUtils.test";
import { ComputerBoard } from "../Computer/ComputerBoard";
import { ships } from "../Mock/mockupTest";
import { fireEvent } from "@testing-library/react";

//Component computer board
describe("Computer Board", () => {
  let component;
  const mockHitsPlayer = jest.fn;
  const mockChangeTurn = jest.fn;
  beforeEach(() => {
    const gameState = "computer";
    const hitsByPlayer = [];
    const handleComputerTurn = "player-turn";
    const checkIfGameOver = "hit";
    const setComputerShips = [];
    const hitComputer = "miss";
    component = render(
      <ComputerBoard
        computerShips={ships}
        changeTurn={mockChangeTurn}
        gameState={gameState}
        hitComputer={hitComputer}
        hitsByPlayer={hitsByPlayer}
        setHitsByPlayer={mockHitsPlayer}
        handleComputerTurn={handleComputerTurn}
        checkIfGameOver={checkIfGameOver}
        setComputerShips={setComputerShips}
      />
    );
  });

  test(`Should show title: "CPU"`, () => {
    const title = component.getByText("CPU");
    expect(title.parentNode).toHaveStyle("color: f03e3e");
  });

  test("Should show the div and should be called once on click", () => {
    const div = component.getAllByText("");
    fireEvent.click(div[0]);
    expect(mockHitsPlayer.call).toHaveLength(1);
    expect(mockHitsPlayer.call).not.toHaveLength(2);
  });

  test("Should change style on click", () => {
    const div = component.getAllByText("");
    fireEvent.click(div[0]);
    expect(div[0].parentNode).toHaveStyle("background: e3eaf0");
  });
});
