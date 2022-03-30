import React, { useState } from "react";
import { Link, Navigate, Redirect } from "react-router-dom";
import { generateEmptyLayout, putEntityInLayout } from "../Layout/Layout";
import styles from "./stylesStart.module.css";

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

  const start = (e) => {
    if (player.name === "") {
      alert("Must choose a name");
    } else {
      if (player.name.length < 4) {
        alert("his name is too short");
      } else {
        setPass(true);
      }
    }

    console.log(player);
  };

  return pass ? (
    <Navigate to="/game" />
  ) : (
    <div>
      <h2 className={styles.title}>BATTLESHIP</h2>
      <div className={styles.board}>{squares}</div>
      <input placeholder="Player name" name="name" onChange={handleChange} />
      <button onClick={start}> START GAME</button>
    </div>
  );
}
