# Troll of Fame - Typescript training

## Getting started

- Clone this project
- Install dependencies : `npm i`
- Run executable : `npm start`
- Run tests : `npm test`

## Once upon a time...

The King of the Trolls Gnonpom coded the **Troll of Fame** : a wonderfull application that would help Trolls to learn numbers when they are hunting.
Gnonpom was a hard skilled Test Driven Developer king who just released **ToF** when all tests passed Green.

Sadly he was shooted by a disgusting Elf.

Here come a new King, Hurrah for the great Troll Aklass!

This time it's decided, the elf hunting contest is launched!

At the end of each battle, the trolls want to compare the number and attributes of the slain elves. And with **ToF** it should be easy ⋯ should.

## Exercices

### Work with legacy code


You inherit an application that seems to work fine. Run `npm test` (•̀ᴗ•́)و

Read [elf.test.ts](./__tests__/elf.test.ts) and [troll.test.ts](./__tests__/troll.test.ts) as a first specification of the software.

Now uncomment the content of [elf.prop.test.ts](./__tests__/elf.prop.test.ts) and run tests again `npm test` ⋯ Ooops seems that our unit tests was not so complete. (╥﹏╥)

We will try to improve the quality of _Troll of Frame_ thanks to Property Based Testing

### Property testing

Property Based Testing (a.k.a. PBT) is about generating tests instead of manually writing them. Unlike unit tests where you know what goes in and what comes out (a.k.a. oracle tests), you assess properties that should always be true. The PBT library checks for arbitrary inputs that the property is true.

In Javascript (or Typescript of course), we use [fast-check](https://github.com/dubzzz/fast-check/) library to write and run Property Based tests.

#### Step 1 - Configuration and Invariance

![invariant](./invariant.png)
_No matter the year, the 31st of December is a New Year's Eve_

- For a simpler start, we already configured the build dependencies and created generators for `Elf` and `Troll` in the test lib.
- PBT tests are located in [elf.prop.test.ts](./__tests__/elf.prop.test.ts) and [troll.prop.test.ts](./__tests__/troll.prop.test.ts)

```typescript
test('Elf value should always be positive', () => {
  fc.assert(
    fc.property(
      elfArbitrary(), elf => getElfValue(elf) > 0
    )
  );
});
```

- Did you notice the property test takes a `Elf` as input ? That's where PBT shines! The library will run this test 1000 times, and each time will pass a random Elf to it. We no longer care about building input data!

- The first property test we will write aims to assess Invariance property: it means a property should always be true even if the input varies (e.g. the Elf)

- As an example, no matter the elf, his value is always > 0.

- High Elves are the worst ! Trolls hate them so killing them double the hit score. So we can extract a property of our application: since killing a High Elf double the score, any High Elf value must be an **even** number.

```typescript
test('The value of a High elf must be an even number', () => {
    fc.assert(
      fc.property(
        elfHighArbitrary(), elfHigh => getElfValue(elfHigh) % 2 === 0
      )
    );
  });
```
⬆️ That's the test which made you discover a bug when you uncommented it while our unit tests were _PASS_ ! 😵

**Exercice 0**
- ❓ Fix the bug you discovered with this first _invariant_ test !

> 📌 Whenever you find a bug thanks to a new PBT, fix it

**Exercice 1**
- 🧑‍💻 Implement an _invariant Test_ for a `Troll`. No matter the troll, his score is always >= 0 (i.e. is never negative).

- ❓ What would the same check with regular unit tests look like ?

> 📌 Most unit tests can actually be converted to **Invariance properties**

#### Step 2 - Inverse

Inverse properties check that it's possible to transform some input to an output and back to the original input, no matter the input. This is a useful property because it guarantees some functions don't lose information and/or are consistent.

![inverse](./inverse.png)
_`bar` and `foo` are inverse of each other_

- ❓ For any `Troll` and any `Elf`, if the `Troll` kills the `Elf` and then realizes the elf survived, what should be the result ?
- 🧑‍💻 Write an inverse property test to check that

➡️ Testing it will ensure that `iGotOne` and `oopsHeSurvived` are consistent.

#### Step 3 - Analogy

Analogous properties check that there are at least 2 different ways from any input to reach an output. This is a useful property because it guarantees some functions are consistent (can also be useful for refactors)

![analogy](./analogy1.png)
_Adding any number to itself is the same as multiplying this number by 2_

- ❓ For any troll, any elf and any positive quantity of killed elves, what should be the difference between:

  - killing a single elf and repeating this operation quantity times
  - killing in a single strike quantity units of elf ?

- 🧑‍💻 Write an analogous property test to check that.

➡️ Testing it will ensure that `iGotOne` and `iGot` are consistent.

![analogy](./analogy2.png)
_For refactors, copy the function to refactor, do your changes, then write an Analogy property test to check for any input that they return the same output, i.e. the refactor has no regression! Now you can delete the test and the legacy function, and rename the refactored function to the legacy name_

#### Step 4 - Idempotence

Idempotent properties check that running a function once or several times leads to exactly the same result, i.e. an idempotent function brings to a stable state from which this function becomes useless.

![idempotence](./idempotence1.png)
_Once a list of numbers is sorted, sorting it again doesn't change anything_

- ❓ For any `Troll` and any `Elf`, once all elves have been resurrected, what should happen if these elves are resurrected again ?
- 🧑‍💻 Write an idempotent property test to check that.

➡️ This ensures that `allElvesOfAKindResurrected` brings the `Troll` killing list to a stable state (i.e. many call should have the same result as once).

![idempotence](./idempotence2.png)
_More generally, `function` is idempotent if applying it to its own result doesn't change anything_

#### [Bonus] Step 5 - Metamorphism

Metamorphic properties check that running a function with variants of the same input should lead to equal or consistent outputs. E.g. if the input is multiplied by 2, is the output also multiplied by 2? Divided by 2? The same?

- ❓ For any `Troll` and any elf, what should the `Troll` score be compared to the score of the `Troll` after killing elf ?
- 🧑‍💻 Write a metamorphic property test to check that.

➡️ This ensures that `iGotOne` correctly increases the kill list (and thus the score) when an elf is killed.

#### [Bonus] Step 6 - Injection

Injective properties check that different inputs lead to different outputs, i.e. there aren't 2 different inputs that lead to the same output, i.e. each output has at most 1 input.

- ❓ For any `Troll` and any 2 elves elf1 and elf2, assuming elf1 is different from elf2, troll after killing elf1 must be different from `Troll` after killing elf2
- 🧑‍💻 Write an injective property test to check that.

➡️ This ensures that `iGotOne` always updates the provided `Troll` in a unique way.
