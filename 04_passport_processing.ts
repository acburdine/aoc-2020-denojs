import { readInput } from "./lib/util.ts";

interface Passport {
  [key: string]: string;
}

const kvp = (arr: string[]): Passport =>
  arr.reduce((obj, l) => {
    let [k, v] = l.split(":", 2);
    return { ...obj, [k]: v };
  }, {});

const input = await readInput<Passport>(
  (l) => kvp(l.replaceAll("\n", " ").split(" ")),
  "\n\n",
);

const validNum = (s: string, min: number, max: number): boolean => {
  let num = parseInt(s.replace(/\D/g, ""), 10);
  return num >= min && num <= max;
};

const validYear = (s: string, min: number, max: number): boolean => {
  if (s.length !== 4) {
    return false;
  }

  return validNum(s, min, max);
};

const VALIDATIONS: { [key: string]: (v: string) => boolean } = {
  "byr": (v) => validYear(v, 1920, 2002),
  "iyr": (v) => validYear(v, 2010, 2020),
  "eyr": (v) => validYear(v, 2020, 2030),
  "hgt": (v) => {
    if (v.endsWith("cm")) return validNum(v, 150, 193);
    if (v.endsWith("in")) return validNum(v, 59, 76);
    return false;
  },
  "hcl": (v) => /^#[0-9a-f]{6}$/.test(v),
  "ecl": (v) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v),
  "pid": (v) => /^\d{9}$/.test(v),
};

const isValid = (p: Passport): boolean =>
  Object.keys(VALIDATIONS).every((k) => Boolean(p[k]) && VALIDATIONS[k](p[k]));

console.log(
  input.filter((p) => Object.keys(VALIDATIONS).every((k) => Boolean(p[k])))
    .length,
);
console.log(input.filter(isValid).length);
