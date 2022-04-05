import React from "react";
import { render } from "./testUtils.test";
import PlayerBoard from "../Player/PlayerBoard";
import { ships, hits } from "../Mock/mockupTest";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

//Component Player Board
describe("Player Board", () => {
  let component;
  const setCurrent = jest.fn;
  const placeShip = jest.fn;
  const rotateShip = jest.fn;

  beforeEach(() => {
    component = render(
      <MemoryRouter initialEntries={["/game/Arzion"]}>
        <PlayerBoard
          currentlyPlacing={"null"}
          setCurrentlyPlacing={setCurrent}
          rotateShip={rotateShip}
          placeShip={placeShip}
          placedShips={ships}
          hitsByComputer={hits}
        />
      
      </MemoryRouter>
    );
  });

  test("Should show the div and should be called once on click", () => {
    const div = component.getAllByText("");
    fireEvent.click(div[0]);
    expect(placeShip.call).toHaveLength(1);
    expect(placeShip.call).not.toHaveLength(2);
  });

  test("Should change style on click", () => {
    const div = component.getAllByText("");
    fireEvent.click(div[0]);
    expect(div[0].parentNode).toHaveStyle("background: e3eaf0");
  });

});
