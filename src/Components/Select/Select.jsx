import React from "react";
import { SelectBox } from "./SelectBox";

import styles from "./selectBox.module.css";

// Returns a tiny select ship and its name
export default function getSelectShip(availableShips, shipName, selectShip) {
  let ship = availableShips.find((item) => item.name === shipName);
  let shipLength = new Array(ship.length).fill("ship");

  let allSquares = shipLength.map((item, index) => (
    <div className={styles.smallSquare} key={index} />
  ));

  return (
    <SelectBox
      key={shipName}
      selectShip={selectShip}
      shipName={shipName}
      squares={allSquares}
    />
  );
}
