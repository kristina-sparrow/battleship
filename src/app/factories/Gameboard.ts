import { IShip } from "./Ship";
import createShip from "./Ship";

const BOARD_SIZE = 10;
const SHIP_CONFIG = [
  createShip(5),
  createShip(4),
  createShip(3),
  createShip(3),
  createShip(2),
];

export interface IGameboard {
  board: (IShip | null)[][];
  missedShots: boolean[][];
  initialize: () => void;
  placeShip: (
    ship: IShip,
    row: number,
    column: number,
    isVertical: boolean
  ) => boolean;
  placeShipsRandomly: () => void;
  isPlacementPossible: (
    ship: IShip,
    row: number,
    column: number,
    isVertical: boolean
  ) => boolean;
  receiveAttack: (row: number, column: number) => boolean;
  getHitIndex: (row: number, column: number) => number;
  isGameOver: () => boolean;
  isEmpty: () => boolean;
}

export default function createGameboard(): IGameboard {
  const board = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => null)
  );
  const missedShots = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => false)
  );

  function initialize() {
    board.forEach((row) => row.fill(null));
    missedShots.forEach((row) => row.fill(false));
  }

  function placeShip(
    ship: IShip,
    row: number,
    column: number,
    isVertical: boolean
  ) {
    if (!isPlacementPossible(ship, row, column, isVertical)) return false;

    for (let i = 0; i < ship.length; i++) {
      if (isVertical) {
        board[row + i][column] = ship;
      } else {
        board[row][column + i] = ship;
      }
    }

    return true;
  }

  function placeShipsRandomly() {
    if (!isEmpty()) return;
    const ships = SHIP_CONFIG;
    let successfulPlacements = 0;
    while (successfulPlacements < 5) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const isVertical = Math.floor(Math.random() * 2) === 1;
      if (placeShip(ships[successfulPlacements], row, column, isVertical)) {
        successfulPlacements++;
      }
    }
  }

  function isPlacementPossible(
    ship: IShip,
    row: number,
    column: number,
    isVertical: boolean
  ) {
    if (row < 0 || row >= BOARD_SIZE || column < 0 || column >= BOARD_SIZE)
      return false;
    const end = isVertical ? row + ship.length : column + ship.length;
    if (end > BOARD_SIZE) return false;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const r = row + i;
        const c = column + j;
        if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c])
          return false;
      }
    }
    return true;
  }

  function receiveAttack(row: number, column: number): boolean {
    if (row < 0 || row >= BOARD_SIZE || column < 0 || column >= BOARD_SIZE) {
      return false;
    }
    const ship = board[row][column];
    if (!ship) {
      missedShots[row][column] = true;
      return false;
    }
    const hitIndex = getHitIndex(row, column);
    ship.hit(hitIndex);
    return true;
  }

  function getHitIndex(row: number, column: number): number {
    let i = 1;
    if (column > 0 && board[row][column - 1]) {
      while (column - i >= 0 && board[row][column - i]) {
        i++;
      }
      return i - 1;
    } else if (row > 0 && board[row - 1][column]) {
      while (row - i >= 0 && board[row - i][column]) {
        i++;
      }
      return i - 1;
    } else {
      return 0;
    }
  }

  function isGameOver() {
    return (
      board.flat().filter((cell) => cell !== null && !cell.isSunk()).length ===
      0
    );
  }

  function isEmpty() {
    return board.flat().every((cell) => cell === null);
  }

  return {
    board,
    missedShots,
    initialize,
    placeShip,
    placeShipsRandomly,
    isPlacementPossible,
    receiveAttack,
    getHitIndex,
    isGameOver,
    isEmpty,
  };
}
