import { parse } from "https://deno.land/std@0.79.0/flags/mod.ts";
const input = parse(Deno.args);

if (!input.d) {
  console.error("missing day arg");
  Deno.exit(1);
}

if (isNaN(input.d)) {
  console.error("invalid day arg");
  Deno.exit(1);
}

const url = `https://adventofcode.com/2020/day/${input.d}/input`;
const resp = await fetch(url, {
  headers: {
    'Cookie': `session=${Deno.env.get("AOC_SESSION_TOKEN")}`
  }
});

const result = await resp.text();
const padded = (input.d as number).toString().padStart(2, "0");
const file = `./inputs/day${padded}.txt`;

console.log(`Writing input for day ${input.d} to ${file}`);

await Deno.writeTextFile(file, result);


