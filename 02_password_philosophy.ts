import { readInput } from "./lib/util.ts";

interface Line {
  min: number;
  max: number;
  letter: string;
  password: string;
}

const lineRegex = /^(\d+)-(\d+) ([a-z]{1}): ([a-z]+)$/;

const input = (await readInput<Line | null>((l) => {
  const matches = l.trim().match(lineRegex);
  if (!matches) {
    return null;
  }

  return {
    min: parseInt(matches[1]),
    max: parseInt(matches[2]),
    letter: matches[3],
    password: matches[4]
  };
})).filter((l): l is Line => l !== null);

const xor = (x: boolean, y: boolean): boolean => (x || y) && x !== y;

const valid1 = (l: Line): boolean => {
  const count = l.password.split("").filter((c) => c === l.letter).length;
  return count >= l.min && count <= l.max;
}

const valid2 = (l: Line): boolean => xor(l.password[l.min - 1] === l.letter, l.password[l.max - 1] === l.letter);

console.log(input.filter(valid1).length);
console.log(input.filter(valid2).length);
