import React from "react";
import {
  squateState,
  stateToClass,
  generateEmptyLayout,
  putEntityInLayout,
  indexToCoords,
  calculateOverhang,
  canBePlaced,
} from "../Layout/Layout";

import styles from "./playerStyles.module.css";

export default function PlayerBoard({
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
  hitsByComputer,
}) {

  // Player ships on empty layout
  let layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, squateState.ship),
    generateEmptyLayout()
  );

  // Hits by computer
  layout = hitsByComputer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    layout
  );

  layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, squateState.ship_sunk)
        : prevLayout,
    layout
  );

  console.log(layout)
  console.log(stateToClass)

  const isPlacingOverBoard =
    currentlyPlacing && currentlyPlacing.position != null;
  const canPlaceCurrentShip =
    isPlacingOverBoard && canBePlaced(currentlyPlacing, layout);

  if (isPlacingOverBoard) {
    if (canPlaceCurrentShip) {
      layout = putEntityInLayout(layout, currentlyPlacing, squateState.ship);
    } else {
      let forbiddenShip = {
        ...currentlyPlacing,
        length: currentlyPlacing.length - calculateOverhang(currentlyPlacing),
      };
      layout = putEntityInLayout(layout, forbiddenShip, squateState.forbidden);
    }
  }

  return (
    <div>
      <h2 className={styles.playerTitle}>You</h2>
      <div className={styles.board}>
        {layout.map((square, index) => {
          console.log(square)
              return (
                <div
                  onMouseDown={rotateShip}
                  onClick={() => {
                    if (canPlaceCurrentShip) {
                      placeShip(currentlyPlacing);
                    }
                  }}
                  className={styles[stateToClass[square]]}
                  key={`square-${index}`}
                  id={`square-${index}`}
                  onMouseOver={() => {
                    if (currentlyPlacing) {
                      setCurrentlyPlacing({
                        ...currentlyPlacing,
                        position: indexToCoords(index),
                      });
                    }
                  }}
                />
              );
            })
          }
      </div>
    </div>
  );
}