import React, { useState } from "react";
import createGameboard, { Gameboard } from "../../factories/Gameboard";
import Board from "./Board";
import createShip from "../../factories/Ship";

type PlacementScreen = {
  gameboard: Gameboard;
  setUserGameboard: (gameBoard: Gameboard) => void;
  setHasGameStarted: (hasGameStarted: boolean) => void;
};

export default function PlacementScreen({
  gameboard,
  setUserGameboard,
  setHasGameStarted,
}: PlacementScreen) {
  const SHIP_CONFIG = [
    createShip(5, "Carrier"),
    createShip(4, "Battleship"),
    createShip(3, "Destroyer"),
    createShip(3, "Submarine"),
    createShip(2, "Patrol Boat"),
  ];
  const [currentShip, setCurrentShip] = useState(SHIP_CONFIG[0]);
  const [isVertical, setIsVertical] = useState(false);

  function onCellClick(row: number, column: number) {
    const nextShipIndex = SHIP_CONFIG.indexOf(currentShip) + 1;
    const nextShip = SHIP_CONFIG[nextShipIndex];
    const nextIsLastShip = nextShipIndex === SHIP_CONFIG.length - 1;
    const nextHasGameStarted = nextIsLastShip ? true : false;

    const updatedGameboard = createGameboard();
    if (
      updatedGameboard.isPlacementPossible(currentShip, row, column, isVertical)
    ) {
      updatedGameboard.placeShip(currentShip, row, column, isVertical);
      setUserGameboard(updatedGameboard);
      setCurrentShip(nextShip);
      setIsVertical(false);
      setHasGameStarted(nextHasGameStarted);
    }
  }

  return (
    <div className="placement-modal">
      <h2 className="placement-message">
        Place your <span className="ship-name">{currentShip.name}</span>
      </h2>
      <button
        className="btn btn-rotate"
        onClick={() => setIsVertical(!isVertical)}
      >
        Rotate
      </button>
      <Board gameboard={gameboard} />
    </div>
  );
}
