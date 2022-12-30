import { pipe } from 'fp-ts/lib/function';
import { createElf, isEqual } from '../src/elf';
import {
  allElvesOfAKindResurrected,
  allElvesResurrected,
  createTroll,
  iGot,
  iGotOne,
  oopsHeSurvived,
  scoring,
} from '../src/troll';

describe('Troll test suite', () => {
  test('iGot should kill faeor with value 5', () => {
    const faeor = createElf('Swordsman', 'High Elf');
    const aklassBefore = createTroll('Aklass');
    const aklassAfter = pipe(aklassBefore, pipe(faeor, iGot(5)));
    expect(
      aklassAfter.kills.reduce(
        (acc, { elf, count }) => (elf === faeor ? acc + count : acc),
        0
      )
    ).toBe(5);
  });
  test('iGotOne should kill faeor with value 1', () => {
    const faeor = createElf('Swordsman', 'High Elf');
    const aklassBefore = createTroll('Aklass');
    const aklassAfter = iGotOne(faeor)(aklassBefore);
    expect(
      aklassAfter.kills.reduce(
        (acc, { elf, count }) => (elf === faeor ? acc + count : acc),
        0
      )
    ).toBe(1);
  });
  test('oopsHeSurvived should remove faeor from kill', () => {
    const faeor = createElf('Swordsman', 'High Elf');
    const aklassFaeorSurvived = pipe(
      createTroll('Aklass'),
      iGotOne(faeor),
      oopsHeSurvived(faeor)
    );
    expect(
      aklassFaeorSurvived.kills.reduce(
        (acc, { elf, count }) => (elf === faeor ? acc + count : acc),
        0
      )
    ).toBe(0);
  });
  test('allElvesOfAKindResurrected should remove all SWORDMAN DARK elves', () => {
    const faeor = createElf('Swordsman', 'High Elf');
    const shadowblight = createElf('Archer', 'Dark Elf');
    const aklass = pipe(
      createTroll('Aklass'),
      iGotOne(faeor),
      oopsHeSurvived(faeor),
      iGot(10)(shadowblight),
      iGotOne(faeor),
      allElvesOfAKindResurrected(createElf('Swordsman', 'High Elf'))
    );
    expect(
      aklass.kills.reduce(
        (acc, { elf, count }) =>
          isEqual(
            createElf('Swordsman', 'Dark Elf'),
            createElf('Swordsman', 'High Elf')
          )
            ? acc + count
            : acc,
        0
      )
    ).toBe(0);
  });
  test('Troll scoring should be equal before adding a kind and after allElvesOfAKindResurrected', () => {
    const shadowblight = createElf('Archer', 'Dark Elf');
    const faeor = createElf('Swordsman', 'High Elf');
    const eramus = createElf('Swordsman', 'High Elf');
    const aklassBefore = iGotOne(shadowblight)(createTroll('Aklass'));
    const aklassAfter = pipe(
      aklassBefore,
      iGotOne(faeor),
      iGot(5)(eramus),
      allElvesOfAKindResurrected(createElf('Swordsman', 'High Elf'))
    );
    expect(scoring(aklassBefore)).toBe(scoring(aklassAfter));
  });
  test('allElvesResurrected should remove all elves', () => {
    const doomshadow = createElf('Warlock', 'High Elf');
    const shadowblight = createElf('Archer', 'Dark Elf');
    const faeor = createElf('Swordsman', 'High Elf');
    const aklass = pipe(
      createTroll('Aklass'),
      iGotOne(faeor),
      iGot(10)(shadowblight),
      iGotOne(doomshadow),
      allElvesResurrected
    );
    expect(aklass.kills.length).toBe(0);
  });
});
