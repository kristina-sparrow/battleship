interface Ship {
  length: number;
  hits: number[];
  hit(position: number): void;
  isSunk(): boolean;
}

export default function createShip(length: number): Ship {
  const hits: number[] = [];

  function hit(position: number): void {
    if (hits.includes(position) || position < 0 || position >= length) {
      return;
    }
    hits.push(position);
  }

  function isSunk(): boolean {
    return hits.length === length;
  }

  return { length, hits, hit, isSunk };
}
