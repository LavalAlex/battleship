import React from "react";
import styles from './selectBox.module.css'

export default function SelectBox({
  shipName,
  selectShip,
  availableShips,
  isCurrentlyPlacing,
}) {
  
  let ship = availableShips.find((item) => item.name === shipName);
  
  let shipLength = new Array(ship.length).fill("ship");
  
  let allSquares = shipLength.map((item, index) => (
    <div className={styles.smallSquare} key={index} />
  ));

  return (
    <div
      id={`${shipName}-select`}
      onClick={() => selectShip(shipName)}
      key={`${shipName}`}
      className={isCurrentlyPlacing ? styles.selectPlacing : styles.select}
    >
      <div className={styles.selectTitle}> {shipName}</div>
      <div className={styles.selectSquares}>{allSquares}</div>
    </div>
  );
}
