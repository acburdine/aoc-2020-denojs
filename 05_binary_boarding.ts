import { readInput } from "./lib/util.ts";

const input = await readInput<string>((l) => l.trim());

const id = (l: string): number => {
  const chars = l.split('');
  let rowstart = 0, rowend = 127;
  let colstart = 0, colend = 7;

  chars.forEach((c) => {
    if (c === "F") rowend = rowend - Math.ceil((rowend - rowstart) / 2);
    else if (c === "B") rowstart = rowstart + Math.floor((rowend - rowstart) / 2);
    else if (c === "L") colend = colend - Math.ceil((colend - colstart) / 2);
    else if (c === "R") colstart = colstart + Math.floor((colend - colstart) / 2);
    else throw new Error("invalid char");
  });

  return (rowend * 8) + colend;
}

// console.log(input.map(id).sort().reverse()[0]);
const keys: { [key: string]: boolean } = input.map(id).reduce((obj, i) => ({ ...obj, [i]: true }), {});

for (let i = 0; i < 855; i++) {
  if (!keys[i] && keys[i - 1] && keys[i + 1]) {
    console.log(i);
    break;
  }
}
