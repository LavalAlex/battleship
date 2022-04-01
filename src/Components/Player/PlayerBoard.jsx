import React from "react";
import {
  squateState,
  stateToClass,
  generateEmptyLayout,
  putEntityInLayout,
  indexToCoords,
  calculateOverhang,
  canBePlaced,
} from "../Utils/Utils";

import styles from "./playerStyles.module.css";
import { useSelector } from "react-redux";

export default function PlayerBoard({
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
  hitsByComputer,

}) {
  const playerName = useSelector((state) => state)
  // const [playerName, setName] = useState("Alex")
  
  // Player ships on empty layout
  let layout = placedShips.reduce(
    (prevLayout, currentShip) =>
    putEntityInLayout(prevLayout, currentShip, squateState.ship),
    generateEmptyLayout()
    );
    // setName("name")

  // Hits by computer
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

  let squares = layout.map((square, index) => {
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
  });

  return (
    <div>
      <div className={styles.playerTitle}>{playerName.name}</div>
      <div className={styles.board}>{squares}</div>
  
    </div>
  );
}
