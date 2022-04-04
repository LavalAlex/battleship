import React from "react";
import { render } from "./testUtils.test";
import PlayerTips from "../Player/PlayerTips";
import { hitsTest, hits } from "../Mock/mockup";
import { fireEvent } from "@testing-library/react";

//Testing winner player
describe("Player Tips: Winner Player, hits = 17", () => {
  let component;
  const startAgain = jest.fn;
  beforeEach(() => {
    const gameState = "computer";
    const winner = "player";
    const handleSurrender = false;
    const hitsT = hitsTest();
    component = render(
      <PlayerTips
        gameState={gameState}
        hitsbyPlayer={hits}
        hitsByComputer={hitsT}
        winner={winner}
        startAgain={startAgain}
        handleSurrender={handleSurrender}
      />
    );
  });

  //Div: "Game Over" - "You Win"
  test(`Should show a text: "Game Over" - "You Win!🎉"`, () => {
    component.getByText("Game Over!");
    component.getByText("You win! 🎉");
  });

  //Button the Play again
  test("chicking the button call event handler once", () => {
    const button = component.getByText("Play again?");
    fireEvent.click(button);
    expect(startAgain.call).toHaveLength(1);
    expect(startAgain.call).not.toHaveLength(2);
  });
});

//Testing winner computer
describe("Player Tips: Winner CPU", () => {
  let component;
  const startAgain = jest.fn;
  beforeEach(() => {
    const gameState = "computer";
    const winner = "computer";
    const handleSurrender = false;
    const hitsT = hitsTest();
    component = render(
      <PlayerTips
        gameState={gameState}
        hitsbyPlayer={hitsT}
        hitsByComputer={hitsT}
        winner={winner}
        startAgain={startAgain}
        handleSurrender={handleSurrender}
      />
    );
  });

  //Divs
  test(`Should show a text: "Game Over" `, () => {
    component.getByText("Game Over!");
    component.getByText("You lose 😭. Better luck next time!");
  });

  //Button play again
  test("clicking the button calls event handler once", () => {
    const button = component.getByText("Play again?");
    fireEvent.click(button);
    expect(startAgain.call).toHaveLength(1);
  });
});

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

  //Testing button
  test("clicking the button calls event handler once", () => {
    const button = component.getByText("SURRENDER");
    fireEvent.click(button);
    expect(startAgain.call).toHaveLength(1);
    expect(startAgain.call).not.toHaveLength(2);
  });
});

describe("Player Tips: Surrender", () => {
  let component;
  const startAgain = jest.fn;
  const handleSurrender = jest.fn;
  beforeEach(() => {
    const gameState = "surrender";
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

  test("It should display a message to the player upon giving up.", () => {
    component.getByText("Game Over!");
    component.getByText("You have given up 🤔");
  });

  test("clicking the button calls event handler once", () => {
    const button = component.getByText("Play again?");
    fireEvent.click(button);
    expect(startAgain.call).toHaveLength(1);
    expect(startAgain.call).not.toHaveLength(2);
  });
});
