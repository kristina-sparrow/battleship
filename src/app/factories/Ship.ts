export interface IShip {
  length: number;
  hits?: Set<number>;
  hit?(position: number): void;
  isSunk?(): boolean;
}

export default function createShip(length: number): IShip {
  const hits = new Set<number>();

  function hit(position: number): void {
    if (hits.has(position) || position < 0 || position >= length) return;
    hits.add(position);
  }

  function isSunk(): boolean {
    return hits.size === length;
  }

  return {
    length,
    hits,
    hit,
    isSunk,
  };
}
