import React from "react";
import { IGameboard } from "../../factories/Gameboard";
import { IPlayer } from "../../factories/Player";
import Cell from "./Cell";
import { v4 as uuidv4 } from "uuid";

interface Props {
  gameboard: IGameboard;
  owner: IPlayer;
  enemy: IPlayer;
  onCellClick?: (x: number, y: number) => void;
}

export default function Board({ gameboard, owner, enemy, onCellClick }: Props) {
  function loadCells() {
    return gameboard.board.map((columns, row) =>
      columns.map((cell, column) => {
        const status =
          cell &&
          (owner.name !== "Computer" || enemy.hasAlreadyHit(row, column))
            ? enemy.hasAlreadyHit(row, column)
              ? "hit"
              : "ship"
            : gameboard.missedShots[row][column]
            ? "missed"
            : "default";
        return (
          <Cell
            key={uuidv4()}
            status={status}
            owner={owner}
            onClick={
              owner.name === "Computer"
                ? () => onCellClick?.(row, column)
                : undefined
            }
          />
        );
      })
    );
  }
  return <div className="board-container">{loadCells()}</div>;
}
