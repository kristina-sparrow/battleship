import React from "react";

type StartScreen = {
  message: string;
  startGame: () => void;
};

export default function StartScreen({ startGame }: StartScreen) {
  return (
    <div className="start-modal">
      <h2 className="start-message">Welcome to Battleship</h2>
      <label>
        Enter your name, captain:
        <input className="input-name" type="text" required></input>
      </label>
      <button className="btn btn-start" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}
