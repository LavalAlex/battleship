import React from "react";
import styles from "./playerStyles.module.css";

export default function PlayerTips({
  gameState,
  hitsbyPlayer,
  hitsByComputer,
  startAgain,
  winner,
  handleSurrender,
}) {
  
  let numberOfHits = hitsbyPlayer.length;
  let numberOfSuccessfulHits = hitsbyPlayer.filter(
    (hit) => hit.type === "hit"
  ).length;
  let accuracyScore = Math.round(100 * (numberOfSuccessfulHits / numberOfHits));
  let succesfulComputerHits = hitsByComputer.filter(
    (hit) => hit.type === "hit"
  ).length;

  return (
    <div className={styles.playerTips}>
      {numberOfSuccessfulHits === 17 ||
      succesfulComputerHits === 17 ||
      gameState === "surrender" ? (
        <div className={styles.tipFrame}>
          <div className={styles.tipBoxTitle}>Game Over!</div>
          {gameState === "surrender" ? (
            <div>
              <p>You have given up 🤔</p>
            </div>
          ) : (
            <p className={styles.playerTip}>
              {winner === "player"
                ? "You win! 🎉"
                : "You lose 😭. Better luck next time! "}
            </p>
          )}
          <div className={styles.tipsButton}>
            <button onClick={startAgain}>Play again?</button>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.tipBoxTitle}>Stats</div>
          <div id={styles.firingInfo}>
            <ul>
              <li>{numberOfSuccessfulHits} successful hits</li>
              <li>
                {accuracyScore > 0 ? `${accuracyScore}%` : `0%`} accuracy{" "}
              </li>
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
      )}
    </div>
  );
}
