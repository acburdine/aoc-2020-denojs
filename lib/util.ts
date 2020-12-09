import Ask from 'https://deno.land/x/ask/mod.ts';
import { readStringDelim } from "https://deno.land/std@0.79.0/io/mod.ts";

export async function readInput<T>(
  mapFn: (s: string) => Promise<T> | T,
  delim: string = "\n",
): Promise<T[]> {
  let result: T[] = [];

  for await (let line of readStringDelim(Deno.stdin, delim)) {
    if (!line.trim().length) {
      continue;
    }

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

export async function submit(day: number, level: number, answer: any): Promise<void> {
  const input = await Deno.open("/dev/tty", { read: true });

  console.log(`Submitting answer ${answer} for day ${day}, level ${level}`);
  const ask = new Ask({ input });
  const result = await ask.confirm({
    message: 'Submit?',
    name: 'submit'
  });

  if (!result.submit) {
    return;
  }

  const url = `https://adventofcode.com/2020/day/${day}/answer`;
  const body = `level=${level}&answer=${answer}`;

  const resp = await fetch(url, {
    method: "POST",
    body,
    headers: {
      'Cookie': `session=${Deno.env.get("AOC_SESSION_TOKEN")}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const respBody = await resp.text();
  console.log(respBody);
}
