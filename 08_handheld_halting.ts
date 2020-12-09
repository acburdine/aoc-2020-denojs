import { readInput } from "./lib/util.ts";

type Inst = [string, number];

function run(instr: Inst[]): [number, boolean] {
  let reg = 0, pos = 0;
  let visited: { [key: number]: boolean } = {};

  while (!visited[pos]) {
    if (pos === instr.length) return [reg, true];
    if (pos > instr.length) throw new Error("pos invalid");

    visited[pos] = true;
    const [i, amt] = instr[pos];

    switch (i) {
      case "acc":
        reg += amt;
        pos += 1;
        break;
      case "jmp":
        pos += amt;
        break;
      default:
        pos += 1;
    }
  }

  return [reg, false];
}

function fix(instr: Inst[]): number {
  for (let i = 0; i < instr.length; i++) {
    const [inst, amt] = instr[i];
    if (inst === "acc") continue;
    let newInst = "nop";
    if (inst === "nop") newInst = "jmp";

    const tmp = instr.slice(0);
    tmp[i] = [newInst, amt];

    const [reg, fixed] = run(tmp);
    if (fixed) {
      return reg;
    }
  }

  return 0;
}

const instructions = await readInput<Inst>((l) => {
  const [instr, amt] = l.trim().split(" ");
  return [instr.trim(), parseInt(amt.trim(), 10)];
});

console.log(run(instructions)[0]);
console.log(fix(instructions));
