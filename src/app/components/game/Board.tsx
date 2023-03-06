import React from "react";
import { IGameboard } from "../../factories/Gameboard";
import { IPlayer } from "../../factories/Player";
import Cell from "./Cell";
import { v4 as uuidv4 } from "uuid";

interface IBoard {
  gameboard?: IGameboard;
  owner?: IPlayer;
  enemy?: IPlayer;
  onCellClick?: (x: number, y: number) => void;
}

export default function Board({
  gameboard,
  owner,
  enemy,
  onCellClick,
}: IBoard) {
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

  function loadPlacementCells() {
    return gameboard.board.flat().map((isFilled, index) => {
      const row = Math.floor(index / gameboard.board[0].length);
      const column = index % gameboard.board[0].length;
      return (
        <Cell
          key={uuidv4()}
          isFilled={isFilled}
          onClick={() => onCellClick(row, column)}
        />
      );
    });
  }

  // figure out how to get redux state here
  return (
    <div className="board-container">
      {isGameStarted ? loadCells() : loadPlacementCells()}
    </div>
  );
}
