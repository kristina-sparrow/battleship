import React from "react";

type EndScreen = {
  message: string;
  resetGame: () => void;
};

export default function EndScreen({ message, resetGame }: EndScreen) {
  return (
    <div className="end-modal">
      <h2 className="end-message">{message}</h2>
      <button className="btn btn-reset" onClick={resetGame}>
        Play Again
      </button>
    </div>
  );
}
