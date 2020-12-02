import { readLines } from "https://deno.land/std@0.79.0/io/mod.ts";

export async function readInput<T>(
  mapFn: (s: string) => Promise<T> | T,
): Promise<T[]> {
  let result: T[] = [];

  for await (let line of readLines(Deno.stdin)) {
    result.push(await mapFn(line));
  }

  return result;
}
