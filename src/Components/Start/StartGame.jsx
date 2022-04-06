import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { generateEmptyLayout } from "../Utils/Utils";
import styles from "./stylesStart.module.css";
import PropTypes from "prop-types";

/**
 *Fisrt app screen, receive player the name
 */

export default function StartGame() {
  const [player, setName] = useState({ name: "" });
  const [pass, setPass] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setName((old) => ({
      ...old,
      [name]: value,
    }));
  };

  // Player ships on empty layout
  let layout = generateEmptyLayout();
  let squares = layout.map((square, index) => {
    return (
      <div
        className={styles.empty}
        key={`square-${index}`}
        id={`square-${index}`}
      />
    );
  });

  //Player name
  const handleStart = (e) => {
    e.preventDefault();
    if (player.name === "") {
      alert("Must choose a name");
    } else {
      if (player.name.length < 4) {
        alert("his name is too short");
      } else {
        setPass(true);
      }
    }
  };

  return pass ? (
    <Redirect to={`/game/${player.name}`} />
  ) : (
    <div className={styles.frame}>
      <div>
        <div className={styles.title}>BATTLESHIP</div>
        <div className={styles.board}>{squares}</div>
      </div>
      <div className={styles.start}>
        <input placeholder="Player name" name="name" onChange={handleChange} />

        <button onClick={handleStart}> START GAME</button>
      </div>
    </div>
  );
}
