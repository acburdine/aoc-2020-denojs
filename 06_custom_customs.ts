import { readInput } from "./lib/util.ts";

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const input = await readInput<string>((l) => l.trim(), "\n\n");
const sum = input.reduce((sum, group) => {
  const people = group.split("\n");
  const any = letters.reduce((s, l) => {
    if (people.some((p) => p.includes(l))) {
      s += 1;
    }

    return s;
  }, 0);
  const every = letters.reduce((s, l) => {
    if (people.every((p) => p.includes(l))) {
      s += 1
    }

    return s;
  }, 0);

  sum.any += any;
  sum.every += every;
  return sum;
}, { any: 0, every: 0 });

console.log(sum.any);
console.log(sum.every);
