import React, { useState } from "react";
import GameView from "./GameView";
import {
  placeAllComputerShips,
  squateState,
  indexToCoords,
  putEntityInLayout,
  generateEmptyLayout,
  generateRandomIndex,
  getNeighbors,
  updateSunkShips,
  coordsToIndex,
} from "../Utils/Utils";

import {
  computerBoard,
  computerBoardClear,
  computerHit,
  computerHitClear,
  playerBoard,
  playerBoardClear,
  playerHits,
  playerHitsClear,
  gameWinner
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { shipsAvailable } from "../Mock/gameMock";
import { useParams } from "react-router-dom";


export default function Game() {
  const dispatch = useDispatch();
  const placedShips = useSelector((state) => state.player.board || []);
  const computerShips = useSelector((state) => state.computer.board || []);
  const hitsByPlayer = useSelector((state) => state.player.hits || []);
  const hitsByComputer = useSelector((state) => state.computer.hits || []);
  const winner = useSelector((state) => state.game.winner || null)
  const [gameState, setGameState] = useState("placement");
  const [currentlyPlacing, setCurrentlyPlacing] = useState(null);
  const [availableShips, setAvailableShips] = useState(shipsAvailable);
  const [surrender, setSurrender] = useState(false);
  const {name} = useParams()

  const setPlayerBoard = (placedShips) => {
    dispatch(playerBoard(placedShips));
  };

  const setHitsByComputer = (computerHits) => {
    dispatch(computerHit(computerHits));
  };

  const setComputerShips = (placedShips) => {
    dispatch(computerBoard(placedShips));
  };

  const setHitsByPlayer = (hits) => {
    dispatch(playerHits(hits));
  };

  const setWinner = (state) =>{
    dispatch(gameWinner(state))
  }
  // *** PLAYER ***
  const selectShip = (shipName) => {
    let shipIdx = availableShips.findIndex((ship) => ship.name === shipName);
    const shipToPlace = availableShips[shipIdx];

    setCurrentlyPlacing({
      ...shipToPlace,
      orientation: "horizontal",
      position: null,
    });
  };

  const placeShip = (currentlyPlacing) => {
    setPlayerBoard([
      ...placedShips,
      {
        ...currentlyPlacing,
        placed: true,
      },
    ]);

    setAvailableShips((previousShips) =>
      previousShips.filter((ship) => ship.name !== currentlyPlacing.name)
    );

    setCurrentlyPlacing(null);
  };

  const rotateShip = (event) => {
    if (currentlyPlacing != null && event.button === 2) {
      setCurrentlyPlacing({
        ...currentlyPlacing,
        orientation:
          currentlyPlacing.orientation === "vertical"
            ? "horizontal"
            : "vertical",
      });
    }
  };

  const startTurn = () => {
    generateComputerShips();
    setGameState("player-turn");
  };

  const changeTurn = () => {
    setGameState((oldGameState) =>
      oldGameState === "player-turn" ? "computer-turn" : "player-turn"
    );
  };

  // *** COMPUTER ***
  const generateComputerShips = () => {
    let placedComputerShips = placeAllComputerShips(shipsAvailable.slice());
    setComputerShips(placedComputerShips);
  };

  const computerFire = (index, layout) => {
    let computerHits;
    if (layout[index] === "ship") {
      computerHits = [
        ...hitsByComputer,
        {
          position: indexToCoords(index),
          type: squateState.hit,
        },
      ];
    }
    if (layout[index] === "empty") {
      computerHits = [
        ...hitsByComputer,
        {
          position: indexToCoords(index),
          type: squateState.miss,
        },
      ];
    }
    const sunkShips = updateSunkShips(computerHits, placedShips);
    setPlayerBoard(sunkShips);
    setHitsByComputer(computerHits);
  };

  // Change to computer turn, check if game over and stop if yes; if not fire into an eligible square
  const handleComputerTurn = () => {
    changeTurn();

    if (checkIfGameOver()) {
      return;
    }

    // Recreate layout to get eligible squares
    let layout = placedShips.reduce(
      (prevLayout, currentShip) =>
        putEntityInLayout(prevLayout, currentShip, squateState.ship),
      generateEmptyLayout()
    );

    layout = hitsByComputer.reduce(
      (prevLayout, currentHit) =>
        putEntityInLayout(prevLayout, currentHit, currentHit.type),
      layout
    );

    layout = placedShips.reduce(
      (prevLayout, currentShip) =>
        currentShip.sunk
          ? putEntityInLayout(prevLayout, currentShip, squateState.shipSunk)
          : prevLayout,
      layout
    );

    let successfulComputerHits = hitsByComputer.filter(
      (hit) => hit.type === "hit"
    );

    let nonSunkComputerHits = successfulComputerHits.filter((hit) => {
      const hitIndex = coordsToIndex(hit.position);
      return layout[hitIndex] === "hit";
    });

    let potentialTargets = nonSunkComputerHits
      .flatMap((hit) => getNeighbors(hit.position))
      .filter((idx) => layout[idx] === "empty" || layout[idx] === "ship");

    // Until there's a successful hit
    if (potentialTargets.length === 0) {
      let layoutIndices = layout.map((item, idx) => idx);
      potentialTargets = layoutIndices.filter(
        (index) => layout[index] === "ship" || layout[index] === "empty"
      );
    }

    let randomIndex = generateRandomIndex(potentialTargets.length);

    let target = potentialTargets[randomIndex];

    setTimeout(() => {
      computerFire(target, layout);
      changeTurn();
    }, 300);
  };

  // *** END GAME ***

  // Check if either player or computer ended the game
  const checkIfGameOver = () => {
    let successfulPlayerHits = hitsByPlayer.filter(
      (hit) => hit.type === "hit"
    ).length;
    let successfulComputerHits = hitsByComputer.filter(
      (hit) => hit.type === "hit"
    ).length;

    if (surrender) {
      setGameState("surrender");
      setWinner("computer");
    }

    if (successfulComputerHits === 15 || successfulPlayerHits === 15) {
      setGameState("game-over");
      console.log('game-over')
      if (successfulComputerHits === 15) {
        setWinner("computer");
      }
      if (successfulPlayerHits === 15) {
        setWinner("player");
      }

      return true;
    }

    return false;
  };

  const startAgain = () => {
    setGameState("placement");
    setWinner(null);
    setCurrentlyPlacing(null);
    setAvailableShips(shipsAvailable);
    dispatch(playerBoardClear());
    dispatch(computerBoardClear());
    dispatch(playerHitsClear());
    dispatch(computerHitClear());
  };

  const handleSurrender = () => {
    setWinner("surrender");
  
  };

  return (
    <React.Fragment>
      <GameView
        availableShips={availableShips}
        selectShip={selectShip}
        currentlyPlacing={currentlyPlacing}
        setCurrentlyPlacing={setCurrentlyPlacing}
        rotateShip={rotateShip}
        placeShip={placeShip}
        placedShips={placedShips}
        startTurn={startTurn}
        computerShips={computerShips}
        gameState={gameState}
        changeTurn={changeTurn}
        hitsByPlayer={hitsByPlayer}
        setHitsByPlayer={setHitsByPlayer}
        hitsByComputer={hitsByComputer}
        setHitsByComputer={setHitsByComputer}
        handleComputerTurn={handleComputerTurn}
        checkIfGameOver={checkIfGameOver}
        startAgain={startAgain}
        winner={winner}
        setComputerShips={setComputerShips}
        handleSurrender={handleSurrender}
        palyerName={name}
      />
    </React.Fragment>
  );
}
