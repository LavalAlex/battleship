import React from "react";
import styles from "./playerStyles.module.css"


export default function PlayerTips({
  gameState,
  hitsbyPlayer,
  hitsByComputer,
  startAgain,
  winner,
}) {
  let numberOfHits = hitsbyPlayer.length;
  let numberOfSuccessfulHits = hitsbyPlayer.filter(
    (hit) => hit.type === "hit"
  ).length;
  let accuracyScore = Math.round(100 * (numberOfSuccessfulHits / numberOfHits));
  let succesfulComputerHits = hitsByComputer.filter(
    (hit) => hit.type === "hit"
  ).length;

  let gameOverPanel = (
    <div>
      <div className={styles.tipBoxTitle}>Game Over!</div>
      <p className={styles.playerTip}>
        {winner === "player"
          ? "You win! 🎉"
          : "You lose 😭. Better luck next time! "}
      </p>
      <p className={styles.restart} onClick={startAgain}>
        Play again?
      </p>
    </div>
  );

  let tipsPanel = (
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
        <p className={styles.restart} onClick={startAgain}>
          Restart
        </p>
      </div>
    </div>
  );

  return (
    <div id={styles.playerTips}>
      {numberOfSuccessfulHits === 17 || succesfulComputerHits === 17
        ? gameOverPanel
        : tipsPanel}
    </div>
  );
}
