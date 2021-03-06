import React from "react";
import { render } from "./testUtils.test";
import PlayerFleet from "../Player/PlayerFleet";
import { shipsAvailable } from "../Mock/mockupTest";
import { fireEvent } from "@testing-library/react";

//Accommodating the ships...
describe("PlayerFleet with ships", () => {
  let component;
  const mockAgain = jest.fn;
  const mockShip = jest.fn;

  beforeEach(() => {
    const available = shipsAvailable;
    const currentlyPlacing = "vertical";
    const startTurn = "player-turn";

    component = render(
      <PlayerFleet
        availableShips={available}
        selectShip={mockShip}
        currentlyPlacing={currentlyPlacing}
        startTurn={startTurn}
        startAgain={mockAgain}
      />
    );
  });

  test("Title the select", () => {
    component.getByText("Your Ships");
  });

  test("It should display a message to the player upon giving up.", () => {
    component.getByText("Right click to rotate before you position.")
  })

  test("Chicking the button restart calls event handler once", async () => {
    const restart = component.getByText("Restart");
    fireEvent.click(restart);
    expect(mockAgain.call).toHaveLength(1);
  });

  //Render select ships
  test("Render SelectBox and clicking the ships calls event handler once", async () => {
    const carrier = component.getByText("carrier");
    const cruiser1 = component.getByText("cruiser-01");
    const cruiser2 = component.getByText("cruiser-02");
    const cruiser3 = component.getByText("cruiser-03");
    const submarine = component.getByText("submarine");

    fireEvent.click(carrier);
    expect(mockShip.call).toHaveLength(1);

    fireEvent.click(cruiser1);
    expect(mockShip.call).toHaveLength(1);

    fireEvent.click(cruiser2);
    expect(mockShip.call).toHaveLength(1);

    fireEvent.click(cruiser3);
    expect(mockShip.call).toHaveLength(1);

    fireEvent.click(submarine);
    expect(mockShip.call).toHaveLength(1);
  });

  //Select a ship
  test("When selecting a ship you must change the style", async () => {
    const carrier = component.getByText("carrier");
    fireEvent.click(carrier);
    expect(carrier.parentNode).toHaveStyle("margin-left: 30");
  });

});

//select with bo ships
describe("PlayerFleet: with no ships", () => {
  let component;
  const mockAgain = jest.fn;
  const mockShip = jest.fn;
  const startTurn = jest.fn;

  beforeEach(() => {
    const available = [];
    const currentlyPlacing = "vertical";
    component = render(
      <PlayerFleet
        availableShips={available}
        selectShip={mockShip}
        currentlyPlacing={currentlyPlacing}
        startTurn={startTurn}
        startAgain={mockAgain}
      />
    );
  });
  
  test("Button Start-Game: chicking the button calls event handler once ", () => {
    const btnStart = component.getByText("Start Game");
    fireEvent.click(btnStart);
    expect(mockAgain.call).toHaveLength(1);
  });

  test("It should show a message to the player before starting the game", ()=>{
    component.getByText("Ships are in formation.")
  })
});
