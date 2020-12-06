import { readStringDelim } from "https://deno.land/std@0.79.0/io/mod.ts";

export async function readInput<T>(
  mapFn: (s: string) => Promise<T> | T,
  delim: string = "\n",
): Promise<T[]> {
  let result: T[] = [];

  for await (let line of readStringDelim(Deno.stdin, delim)) {
    result.push(await mapFn(line));
  }

  return result;
}

export function range_incl(min: number, max: number, n: number): boolean {
  return n >= min && n <= max;
}

export function xor(a: boolean, b: boolean): boolean {
  return (a || b) && a !== b;
}
