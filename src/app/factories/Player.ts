import { IGameboard } from "./Gameboard";

export interface IPlayer {
  name: string;
  alreadyHitCoords: number[][];
  attack(positionX: number, positionY: number, gameboard: IGameboard): void;
  randomAttack(gameboard: IGameboard): void;
  hasAlreadyHit(positionX: number, positionY: number): boolean;
}

export default function createPlayer(name: string): IPlayer {
  const alreadyHitCoords: number[][] = [];

  const attack = (
    positionX: number,
    positionY: number,
    gameboard: IGameboard
  ): void => {
    if (hasAlreadyHit(positionX, positionY)) return;

    alreadyHitCoords.push([positionX, positionY]);
    gameboard.receiveAttack(positionX, positionY);
  };

  function randomAttack(gameboard: IGameboard): void {
    if (alreadyHitCoords.length === 100) return;

    let positionX = Math.floor(Math.random() * 10);
    let positionY = Math.floor(Math.random() * 10);

    while (hasAlreadyHit(positionX, positionY)) {
      positionX = Math.floor(Math.random() * 10);
      positionY = Math.floor(Math.random() * 10);
    }

    alreadyHitCoords.push([positionX, positionY]);
    gameboard.receiveAttack(positionX, positionY);
  }

  function hasAlreadyHit(positionX: number, positionY: number): boolean {
    return alreadyHitCoords.some(
      ([x, y]) => x === positionX && y === positionY
    );
  }

  return { name, alreadyHitCoords, attack, randomAttack, hasAlreadyHit };
}
