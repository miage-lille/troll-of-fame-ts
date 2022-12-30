import * as fc from 'fast-check';
import {
  createElf,
  createSwordsman,
  createArcher,
  createPriest,
  createWarlock,
  createDarkElf,
  createHighElf,
} from '../src/elf';
import { createTroll } from '../src/troll';
import { Role, Race, Elf } from '../types/elf';
import { Kill, Troll } from '../types/troll';

const roleArbitrary = (): fc.Arbitrary<Role['name']> =>
  fc.oneof(
    fc.constant(createSwordsman().name),
    fc.constant(createArcher().name),
    fc.constant(createPriest().name),
    fc.constant(createWarlock().name)
  );

const raceArbitrary = (): fc.Arbitrary<Race['name']> =>
  fc.oneof(
    fc.constant(createDarkElf().name),
    fc.constant(createHighElf().name)
  );

const elfArbitrary = (): fc.Arbitrary<Elf> =>
  fc
    .tuple(roleArbitrary(), raceArbitrary())
    .map(([role, race]) => createElf(role, race));

const elfHighArbitrary = (): fc.Arbitrary<Elf> =>
  fc
    .tuple(roleArbitrary(), fc.constant(createHighElf().name))
    .map(([role, race]) => createElf(role, race));

const killArbitrary = (): fc.Arbitrary<Kill> =>
  fc.record({ elf: elfArbitrary(), count: fc.nat() });

const trollArbitrary = (): fc.Arbitrary<Troll> =>
  fc
    .tuple(fc.string(), fc.array(killArbitrary()))
    .map(([name, kills]) => createTroll(name, kills));

export { elfArbitrary, trollArbitrary, elfHighArbitrary };
