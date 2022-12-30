import fc from 'fast-check';
import { elfArbitrary, elfHighArbitrary } from './generator';
import { getElfValue } from '../src/elf';

describe('Elf Invariance', () => {
  test('Elf value should always be positive', () => {
    fc.assert(fc.property(elfArbitrary(), elf => getElfValue(elf) > 0));
  });

  // test('The value of a High elf must be an even number', () => {
  //   fc.assert(
  //     fc.property(elfHighArbitrary(), elfHigh => getElfValue(elfHigh) % 2 === 0)
  //   );
  // });
});
