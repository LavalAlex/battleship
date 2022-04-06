import React from "react";
import styles from "./playerStyles.module.css";

/**
 * In this component it shows you the statistics of the game.
 * @param{array} hitsbyPlayer
 */
export default function PlayerTips({
  hitsbyPlayer,
  handleSurrender,
}) {

  let numberOfHits = hitsbyPlayer.length;
  let numberOfSuccessfulHits = hitsbyPlayer.filter(
    (hit) => hit.type === "hit"
  ).length;
  let accuracyScore = Math.round(100 * (numberOfSuccessfulHits / numberOfHits));

  return (
    <div className={styles.playerTips}>
      <div>
        <div className={styles.tipBoxTitle}>Stats</div>
        <div id={styles.firingInfo}>
          <ul>
            <li>{numberOfSuccessfulHits} successful hits</li>
            <li>{accuracyScore > 0 ? `${accuracyScore}%` : `0%`} accuracy </li>
          </ul>
          <p className={styles.playerTip}>
            The first to sink all 5 opponent ships wins.
          </p>
          <div className={styles.tipSurrender}>
            Playing: <span>CPU</span>
            <button onClick={handleSurrender}>SURRENDER</button>
          </div>
        </div>
      </div>
    </div>
  );
}
