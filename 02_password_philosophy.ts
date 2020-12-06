import { readInput, range_incl, xor } from "./lib/util.ts";

type L = [number, number, string, string[]];

const lr = /^(\d+)-(\d+) ([a-z]{1}): ([a-z]+)$/;

const i = await readInput<L>((l) => {
  const m = l.trim().match(lr);
  if (!m) throw new Error(`invalid line: ${l}`);
  return [parseInt(m[1], 10), parseInt(m[2], 10), m[3], m[4].split("")];
});

const v1 = (l: L): boolean => range_incl(l[0], l[1], l[3].filter((c) => c === l[2]).length);
const v2 = (l: L): boolean => xor(l[3][l[0] - 1] === l[2], l[3][l[1] - 1] === l[2]);

console.log(i.filter(v1).length);
console.log(i.filter(v2).length);
