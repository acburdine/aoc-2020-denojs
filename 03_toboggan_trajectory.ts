import { readInput } from "./lib/util.ts";

const map = await readInput<string[]>((l) => l.trim().split(""));
const hasTree = (x: number, y: number): boolean =>
  map[y][x % map[0].length] === "#";

function checkSlope(xs: number, ys: number): number {
  let x = 0, y = 0;
  let treeCount = 0;

  while (y < map.length) {
    if (hasTree(x, y)) treeCount++;

    y += ys;
    x += xs;
  }

  return treeCount;
}

console.log(checkSlope(3, 1));
console.log(
  checkSlope(1, 1) * checkSlope(3, 1) * checkSlope(5, 1) * checkSlope(7, 1) *
    checkSlope(1, 2),
);
