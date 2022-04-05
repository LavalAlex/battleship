import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {
  computerBoardClear,
  computerHitClear,
  gameClear,
  playerBoardClear,
  playerHitsClear,
} from "../../Redux/Actions";
import styles from "./gameStyles.module.css";

export default function GameOver() {
  const winner = useSelector((state) => state.game.winner);
  const dispatch = useDispatch();
  const { name } = useParams();

  const handlestart = () => {
    dispatch(gameClear());
    dispatch(playerBoardClear());
    dispatch(computerBoardClear());
    dispatch(playerHitsClear());
    dispatch(computerHitClear());
  };

  return winner === null ? (
    <Redirect to={`/game/${name}`} />
  ) : (
    <div className={styles.playerTips}>
      <div className={styles.tipFrame}>
        <div className={styles.tipBoxTitle}>Game Over!</div>
        {winner === "surrender" ? (
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
          <button onClick={handlestart}>Play again?</button>
        </div>
      </div>
    </div>
  );
}
