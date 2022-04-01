import React, { useState } from "react";
import { Navigate} from "react-router-dom";
import { generateEmptyLayout} from "../Utils/Utils";
import styles from "./stylesStart.module.css";
import { playerName } from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";

export default function StartGame() {
  const [player, setName] = useState({ name: "" });
  const [pass, setPass] = useState(false);
  const dispatch = useDispatch();

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
  const start = (e) => {
    e.preventDefault();
    if (player.name === "") {
      alert("Must choose a name");
    } else {
      if (player.name.length < 4) {
        alert("his name is too short");
      } else {
        dispatch(playerName(player.name));
        setPass(true);
      }
    }

    // console.log(player);
  };

  return pass ? (
    <Navigate to="/game" />
  ) : (
    <div className={styles.frame}>
      <div> 
      <div className={styles.title}>BATTLESHIP</div>
      <div className={styles.board}>{squares}</div>
      </div>
      <div className={styles.start}>
      <input placeholder="Player name" name="name" onChange={handleChange} />
      <button onClick={start}> START GAME</button>
      </div>
    </div>
  );
}
