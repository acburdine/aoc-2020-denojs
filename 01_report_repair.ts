import { readInput } from "./lib/util.ts";

const EXPECTED = 2020;

function part1(nums: number[]): number {
  nums.sort().reverse();

  let end = nums.length - 1;
  for (let i = 0; i < end; i++) {
    while (nums[i] + nums[end] < EXPECTED && end > i) {
      end -= 1;
    }

    if (nums[i] + nums[end] === EXPECTED) {
      return nums[i] * nums[end];
    }
  }

  return 0;
}

function part2(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === EXPECTED) {
          return nums[i] * nums[j] * nums[k];
        }
      }
    }
  }

  return 0;
}

const nums = await readInput<number>((f) => parseInt(f, 10));
console.log(part1(nums.slice(0)));
console.log(part2(nums.slice(0)));
