import assert from 'assert';
import type {
  Elf,
  DarkElf,
  HighElf,
  Race,
  Archer,
  Priest,
  Role,
  Swordsman,
  Warlock,
} from '../types/elf';

export const createDarkElf = (): DarkElf => ({ name: 'Dark Elf', value: 1 });
export const createHighElf = (): HighElf => ({ name: 'High Elf', value: 2 });
const createRace = (name: Race['name']) => {
  switch (name) {
    case 'Dark Elf':
      return createDarkElf();
    case 'High Elf':
      return createHighElf();
  }
};

export const createSwordsman = (): Swordsman => ({
  name: 'Swordsman',
  value: 1,
});
export const createArcher = (): Archer => ({ name: 'Archer', value: 2 });
export const createPriest = (): Priest => ({ name: 'Priest', value: 5 });
export const createWarlock = (): Warlock => ({ name: 'Warlock', value: 4 });

export const createRole = (name: Role['name']): Role => {
  switch (name) {
    case 'Archer':
      return createArcher();
    case 'Priest':
      return createPriest();
    case 'Swordsman':
      return createSwordsman();
    case 'Warlock':
      return createWarlock();
  }
};

export const createElf = (role: Role['name'], race: Race['name']): Elf => ({
  role: createRole(role),
  race: createRace(race),
});

export const getElfValue = ({ role, race }: Elf) => role.value + race.value;

export const elfToString = ({ role, race }: Elf) => `${role.name} ${race.name}`;

export const isEqual = (elf1: Elf, elf2: Elf) => {
  try {
    assert.deepStrictEqual(elf1, elf2);
    return true;
  } catch (e) {
    return false;
  }
};
