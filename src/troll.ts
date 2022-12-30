import chalk from 'chalk';
import { getElfValue, isEqual } from './elf';
import assert from 'assert';
import type { Elf } from '../types/elf';
import type { Kill, Troll } from '../types/troll';

export const createTroll = (name: string, kills: Kill[] = []): Troll => ({
  name,
  kills,
});

export const trollToString = ({ name, kills }: Troll) => `${name} ${kills}`;

export const scoring = ({ kills }: Troll) => {
  return kills.reduce((_acc, { elf, count }) => getElfValue(elf) * count, 0);
};

export const iGot =
  (count: number) =>
  (elf: Elf) =>
  (troll: Troll): Troll => ({
    ...troll,
    kills: [...troll.kills, { elf, count }],
  });

export const iGotOne = iGot(1);

export const oopsHeSurvived = iGot(-1);

export const allElvesOfAKindResurrected =
  (elf: Elf) =>
  (troll: Troll): Troll => ({
    ...troll,
    kills: troll.kills.filter(({ elf: e }) => !isEqual(e, elf)),
  });

export const allElvesResurrected = (troll: Troll): Troll => ({
  ...troll,
  kills: [],
});

export const printWarband = (warband: Troll[]) => {
  console.log(chalk.red('Troll of Fame'));
  warband.forEach(troll => {
    console.log(chalk.green(`${troll.name} scored ${scoring(troll)}`));
  });
};

export const isTrollsEquals = (t1: Troll, t2: Troll) => {
  try {
    assert.deepStrictEqual(t1, t2);
    return true;
  } catch (e) {
    return false;
  }
};
