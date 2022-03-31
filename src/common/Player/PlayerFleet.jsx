import React from "react";
import SelectBox from "../Select/SelectBox";

import styles from "./playerStyles.module.css";

export default function PlayerFleet({
  availableShips,
  selectShip,
  currentlyPlacing,
  startTurn,
  startAgain,
}) {
  
  let shipsLeft = availableShips.map((ship) => ship.name);

  // For every ship still available, return a Replica Box with the ship's name and as many squares as its length
  let shipSelectBoxs = shipsLeft.map((shipName) => (
    <SelectBox
      selectShip={selectShip}
      key={shipName}
      isCurrentlyPlacing={
        currentlyPlacing && currentlyPlacing.name === shipName
      }
      shipName={shipName}
      availableShips={availableShips}
    />
  ));

  return (
    <div className={styles.availableShips}>
      <div className={styles.tipBoxTitle}> Your Ships</div>
      {availableShips.length > 0 ? (
        <div className={styles.selectFleet}>
          {shipSelectBoxs}
          <p className={styles.playerTip}>
            Right click to rotate before you position.
          </p>
          <div  className={styles.tipsButton} >
          <button onClick={startAgain}>
            Restart
          </button>
          </div>
        </div>
      ) : (
        <div id={styles.playReady}>
          <p className={styles.playerTip}>Ships are in formation.</p>
          <div className={styles.tipsButton}>

          <button  onClick={startTurn}>
            Start game
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
