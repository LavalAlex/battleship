import React from 'react';
import {
  stateToClass,
  generateEmptyLayout,
  putEntityInLayout,
  squateState,
  indexToCoords,
  updateSunkShips,
} from '../Utils/Utils';

import styles from "./computerStyles.module.css"

export const ComputerBoard = ({
  computerShips,
  gameState,
  hitsByPlayer,
  setHitsByPlayer,
  handleComputerTurn,
  checkIfGameOver,
  setComputerShips,
}) => {

  // Ships on an empty layout
  let compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, squateState.ship),
    generateEmptyLayout()
  );

  //  Add hits dealt by player
  compLayout = hitsByPlayer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    compLayout
  );

  compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, squateState.shipSunk)
        : prevLayout,
    compLayout
  );

  // Check what's at the square and decide what next
  const fireTorpedo = (index) => {
    if (compLayout[index] === 'ship') {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: squateState.hit,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
    if (compLayout[index] === 'empty') {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: squateState.miss,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
  };

  const playerTurn = gameState === 'player-turn';
  const playerCanFire = playerTurn && !checkIfGameOver();

  let alreadyHit = (index) =>
    compLayout[index] === 'hit' ||
    compLayout[index] === 'miss' ||
    compLayout[index] === 'shipSunk';

  let compSquares = compLayout.map((square, index) => {
    //   console.log('state: ',stateToClass[square])
    return (
      <div
        // Only display square if it's a hit, miss, or sunk ship
        className={
          stateToClass[square] === 'hit' ||
          stateToClass[square] === 'miss' ||
          stateToClass[square] === 'shipSunk'
            ? styles[stateToClass[square]]
            : styles.square
        }
        key={`comp-square-${index}`}
        id={`comp-square-${index}`}
        onClick={() => {
          if (playerCanFire && !alreadyHit(index)) {
            const newHits = fireTorpedo(index);
            const shipsWithSunkFlag = updateSunkShips(newHits, computerShips);
            setComputerShips(shipsWithSunkFlag);
            handleComputerTurn();
          }
        }}
      />
    );
  });

  return (
    <div>
      <div className={styles.playerTitle}>CPU</div>
      <div className={styles.board}>{compSquares}</div>
    </div>
  );
};
