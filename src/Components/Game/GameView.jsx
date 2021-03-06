import React from "react";
import PlayerFleet from "../Player/PlayerFleet";
import PlayerBoard from "../Player/PlayerBoard";
import { ComputerBoard } from "../Computer/ComputerBoard";
import PlayerTips from "../Player/PlayerTips";

import styles from "./gameStyles.module.css";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";

/**
 * Component that handles which component goes first depending 
 * on what moment of the application you are in.
 * @param{object} availableShips --Mockup
 * @param{string} selectShip  --Ship selected by the player
 * @param{object} currentlyPlacing --Orientation ship
 * @param{array} computerShips --Ships the computer
 * @param{string} gameState --State the game
 * @param{string} winner --PLAYER | CPU | SURRENDER
 * @param{array} hitsByPlayer --Hit the Player
 * @param{array} histByComputer --Hit the computer
 */
export default function GameView({
  availableShips,
  selectShip,
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
  startTurn,
  computerShips,
  gameState,
  changeTurn,
  hitComputer,
  hitsByPlayer,
  setHitsByPlayer,
  hitsByComputer,
  handleComputerTurn,
  checkIfGameOver,
  winner,
  startAgain,
  setComputerShips,
  handleSurrender,
}) {
  const { name } = useParams();

  return winner === null ? (
    <section id={styles.gameScreen}>
      {gameState !== "placement" ? (
        <PlayerTips
          gameState={gameState}
          hitsbyPlayer={hitsByPlayer}
          hitsByComputer={hitsByComputer}
          winner={winner}
          startAgain={startAgain}
          handleSurrender={handleSurrender}
        />
      ) : (
        <PlayerFleet
          availableShips={availableShips}
          selectShip={selectShip}
          currentlyPlacing={currentlyPlacing}
          startTurn={startTurn}
          startAgain={startAgain}
        />
      )}
      <PlayerBoard
        currentlyPlacing={currentlyPlacing}
        setCurrentlyPlacing={setCurrentlyPlacing}
        rotateShip={rotateShip}
        placeShip={placeShip}
        placedShips={placedShips}
        hitsByComputer={hitsByComputer}
      />
      <ComputerBoard
        computerShips={computerShips}
        changeTurn={changeTurn}
        gameState={gameState}
        hitComputer={hitComputer}
        hitsByPlayer={hitsByPlayer}
        setHitsByPlayer={setHitsByPlayer}
        handleComputerTurn={handleComputerTurn}
        checkIfGameOver={checkIfGameOver}
        setComputerShips={setComputerShips}
      />
    </section>
  ) : (
    <Redirect to={`/gameover/${name}`} />
  );
}
