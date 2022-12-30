import { createElf, getElfValue } from '../src/elf';

describe('Elf test suite', () => {
  test('2 Warlock Dark Elves should be equal', () => {
    const doomshadow = createElf('Warlock', 'High Elf');
    const thundershade = createElf('Warlock', 'High Elf');

    expect(getElfValue(doomshadow)).toBe(getElfValue(thundershade));
  });

  test('1 Archer Dark Elf and 1 Swordsman High Elf should be equal', () => {
    const faeor = createElf('Swordsman', 'High Elf');
    const shadowblight = createElf('Archer', 'Dark Elf');
    expect(getElfValue(shadowblight)).toBe(getElfValue(faeor));
  });
});
