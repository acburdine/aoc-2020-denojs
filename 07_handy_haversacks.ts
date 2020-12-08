import { readInput } from './lib/util.ts';

const bagR = /^([0-9]+) ([a-zA-Z ]+) bags?\.?$/;
const myBag = 'shiny gold';

interface Bag {
  count: number;
  color: string;
}

interface Rule {
  color: string;
  contains: Bag[];
}

interface BagMap { [key: string]: string[] };
interface RuleMap { [key: string]: Bag[] };

const inputData = (await readInput<Rule | null>((l) => {
  if (!l.trim().length) {
    return null;
  }

  const [bag, contains] = l.trim().split("bags contain");
  if (contains.includes("no other bags")) {
    return { color: bag.trim(), contains: [] };
  }

  return {
    color: bag.trim(),
    contains: contains.trim().split(",").map((c) => {
      const matches = c.trim().match(bagR);
      if (!matches) throw new Error(`invalid bag: ${c}`);
      return { count: parseInt(matches[1], 10), color: matches[2] };
    })
  };
})).filter((r): r is Rule => r !== null);

const bagMap = inputData.reduce((obj: BagMap, rule: Rule): BagMap => {
  rule.contains.forEach((bag) => {
    if (!obj[bag.color]) {
      obj[bag.color] = [];
    }

    obj[bag.color].push(rule.color);
  });

  return obj;
}, {});

const ruleMap = inputData.reduce((obj: RuleMap, r: Rule): RuleMap => {
  obj[r.color] = r.contains;
  return obj;
}, {});

const bagSet = new Set<string>();
const mapper = (bm: BagMap, bs: Set<string>, cur: string) => {
  if (!bm[cur]) {
    return;
  }

  bm[cur].forEach((c) => {
    if (bs.has(c) || c === myBag) {
      return;
    }

    bs.add(c);
    mapper(bm, bs, c);
  });
};

mapper(bagMap, bagSet, myBag);

console.log([...bagSet.entries()].length);

const bagCt = (rm: RuleMap, cur: string): number => {
  if (!rm[cur] || !rm[cur].length) {
    return 0;
  }

  return rm[cur].reduce((sum, b) => sum + b.count + (b.count * bagCt(rm, b.color)), 0);
}

console.log(bagCt(ruleMap, myBag));


