import { readInput } from "./lib/util.ts";

type L = [number, number, string, string];

const lr = /^(\d+)-(\d+) ([a-z]{1}): ([a-z]+)$/;

const input = (await readInput<L | null>((l) => {
  const m = l.trim().match(lr);
  if (!m) return null;
  return [parseInt(m[1], 10), parseInt(m[2], 10), m[3], m[4]];
})).filter((l): l is L => l !== null);

const xor = (x: boolean, y: boolean): boolean => (x || y) && x !== y;

const v1 = (l: L): boolean => {
  const count = l[3].split("").filter((c) => c === l[2]).length;
  return count >= l[0] && count <= l[1];
}

const v2 = (l: L): boolean => xor(l[3][l[0] - 1] === l[2], l[3][l[1] - 1] === l[2]);

console.log(input.filter(v1).length);
console.log(input.filter(v2).length);
