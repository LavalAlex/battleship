import React from "react";
import { render } from "./testUtils.test";
import PlayerTips from "../Player/PlayerTips";
import {  hits } from "../Mock/mockupTest";
import { fireEvent } from "@testing-library/react";

describe("Player Tips: Playing...", () => {
  let component;
  const startAgain = jest.fn;
  const handleSurrender = jest.fn;
  beforeEach(() => {
    const gameState = "placement";
    const winner = null;
    component = render(
      <PlayerTips
        gameState={gameState}
        hitsbyPlayer={hits}
        hitsByComputer={hits}
        winner={winner}
        startAgain={startAgain}
        handleSurrender={handleSurrender}
      />
    );
  });

  //Message the player
  test("Should show message the player", () => {
    component.getByText("Stats");
    component.getByText("The first to sink all 5 opponent ships wins.");
  });

  //Title 
  test("should show the player's opponent", () => {
    component.getByText("Playing:")
    component.getByText("CPU")
  })

  //Testing button
  test("clicking the button calls event handler once", () => {
    const button = component.getByText("SURRENDER");
    fireEvent.click(button);
    expect(startAgain.call).toHaveLength(1);
    expect(startAgain.call).not.toHaveLength(2);
  });

    //Statistics the game
    test("Should show a list with statistics", ()=>{
      const li = component.container.querySelector('ul')
    })
});