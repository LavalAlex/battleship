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
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

const shipsAvailable = [
  {
    name: "carrier",
    length: 5,
    placed: null,
  },
  {
    name: "battleship",
    length: 4,
    placed: null,
  },
  {
    name: "cruiser",
    length: 3,
    placed: null,
  },
  {
    name: "submarine",
    length: 3,
    placed: null,
  },
  {
    name: "destroyer",
    length: 2,
    placed: null,
  },
];

export default function Game() {
  const dispatch = useDispatch();
  const placedShips = useSelector((state) => state.player.board || []);
  const computerShips = useSelector((state) => state.computer.board || []);
  const hitsByPlayer = useSelector((state) => state.player.hits || []);
  const hitsByComputer = useSelector((state) => state.computer.hits || []);
  const playerName = useSelector((state) => state.player.name);
  const [gameState, setGameState] = useState("placement");
  const [winner, setWinner] = useState(null);
  const [currentlyPlacing, setCurrentlyPlacing] = useState(null);
  const [availableShips, setAvailableShips] = useState(shipsAvailable);
  const [surrender, setSurrender] = useState(false);
  const [nickName, setNick] = useState(null)

  const setPlayerBoard = (placedShips) =>{
    dispatch(playerBoard(placedShips))
  }
  
  const setHitsByComputer =(computerHits) =>{
    dispatch(computerHit(computerHits))
  }

  const setComputerShips = (placedShips) => {
    dispatch(computerBoard(placedShips));
  };

  const setHitsByPlayer = (hits) => {
    dispatch(playerHits(hits));
  };


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
      ])


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
    // dispatch(computerHit(computerHits))
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

    if (successfulComputerHits === 17 || successfulPlayerHits === 17) {
      setGameState("game-over");

      if (successfulComputerHits === 17) {
        setWinner("computer");
      }
      if (successfulPlayerHits === 17) {
        setWinner("player");
      }

      return true;
    }

    return false;
  };

  const startAgain = () => {
    setNick(playerName)
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
    setSurrender(true);
    checkIfGameOver();
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
        playerName = {!nickName?playerName: nickName}
      />
    </React.Fragment>
  );
}
