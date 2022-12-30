import fc from 'fast-check';
import { allElvesResurrected, scoring } from '../src/troll';
import { trollArbitrary } from './generator';

describe('Troll Invariance', () => {
  test('Troll score should be 0 when all elves resurrected', () => {
    fc.assert(
      fc.property(
        trollArbitrary(),
        troll => scoring(allElvesResurrected(troll)) === 0
      )
    );
  });
  test('Troll score should always be >= 0', () => {
    fc.assert(fc.property(trollArbitrary(), troll => scoring(troll) >= 0));
  });
});

describe('Troll Inverse', () => {
  test('oopsHeSurvived should always be inverse of iGotOne', () => {
    throw new Error('Not implemented.');
  });
});

describe('Troll Analogy', () => {
  test('iGotOne and iGot should be consistent', () => {
    throw new Error('Not implemented.');
  });
});

describe('Troll Idempotence', () => {
  test('allElvesOfAKindResurrected brings the Troll killing list to a stable state', () => {
    throw new Error('Not implemented.');
  });
});

describe('Troll Metamorphism', () => {
  test("Troll's score is correctly increased when an elf is killed", () => {
    throw new Error('Not implemented.');
  });
});

describe('Troll Injection', () => {
  test('iGotOne always updates the provided Troll in a unique way', () => {
    throw new Error('Not implemented.');
  });
});
