export type Ship = {
  name?: string;
  length: number;
  hits: Set<number>;
  hit(position: number): void;
  isSunk(): boolean;
};

export default function createShip(length: number, name?: string): Ship {
  const hits = new Set<number>();

  function hit(position: number): void {
    if (hits.has(position) || position < 0 || position >= length) return;
    hits.add(position);
  }

  function isSunk(): boolean {
    return hits.size === length;
  }

  return {
    name,
    length,
    hits,
    hit,
    isSunk,
  };
}
