import { createElf } from './elf';
import { pipe } from 'fp-ts/lib/function';
import {
  allElvesOfAKindResurrected,
  createTroll,
  iGot,
  iGotOne,
  oopsHeSurvived,
  printWarband,
  scoring,
} from './troll';

const archerDark = createElf('Archer', 'Dark Elf');
const warlockDark = createElf('Warlock', 'Dark Elf');
const swordsmanDark = createElf('Swordsman', 'Dark Elf');
const priestHigh = createElf('Priest', 'High Elf');
const swordsmanHigh = createElf('Swordsman', 'High Elf');

const aklass = pipe(
  createTroll('Aklass'),
  iGot(5)(warlockDark),
  iGot(2)(priestHigh),
  iGot(20)(swordsmanDark),
  iGot(10)(archerDark)
);

const lesglandes = pipe(
  createTroll('Lesglandes'),
  iGotOne(priestHigh),
  oopsHeSurvived(priestHigh),
  iGot(5)(warlockDark),
  allElvesOfAKindResurrected(warlockDark)
);

const lesklat = pipe(
  createTroll('Lesklat'),
  iGotOne(priestHigh),
  iGot(20)(swordsmanDark),
  iGot(2)(priestHigh),
  iGotOne(swordsmanHigh),
  iGotOne(warlockDark),
  oopsHeSurvived(warlockDark)
);

console.log(scoring(lesklat));

const tyneth = pipe(
  createTroll('Tyneth'),
  iGot(5)(swordsmanDark),
  iGotOne(priestHigh)
);

const r = pipe(
  createTroll('Tyneth'),
  iGot(5)(swordsmanDark),
  iGotOne(priestHigh)
);

const warband = [aklass, lesglandes, lesklat, tyneth];

console.log(tyneth === r);
printWarband(warband);
