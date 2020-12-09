import { readInput } from "./lib/util.ts";

const input = await readInput<number>((l) => parseInt(l, 10));

function findInvalid(numbers: number[]): number {
  for (let i = 25; i < numbers.length; i++) {
    const check = numbers.slice(i - 25, i);
    const valid = check.some((n, ni) => {
      const index = check.indexOf(numbers[i] - n);
      return index !== -1 && index !== ni;
    });

    if (!valid) {
      return numbers[i];
    }
  }

  return 0;
}

function findWeakness(numbers: number[], invalid: number): number {
  for (let i = 0; i < numbers.length - 1; i++) {
    let j = i + 1;

    let range = [numbers[i], numbers[j]];
    let sum = numbers[i] + numbers[j];

    while (sum < invalid) {
      j++;

      range.push(numbers[j]);
      sum += numbers[j];
    }

    if (sum === invalid) {
      return Math.min(...range) + Math.max(...range);
    }
  }

  return 0;
}

const invalid = findInvalid(input);

console.log(invalid);
console.log(findWeakness(input, invalid));

