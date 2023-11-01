import { getPokemonIdsInEggGroup, getEggGroupNameById, getEggGroupViaPokemonId } from './egggroup';

describe('Dex Utils Egg Group Tests', () => {
  describe('getEggGroupViaPokemonId', () => {
    const testData = [
      { pokemonId: 0, expected: [0] },
      { pokemonId: 1, expected: [1, 7] },
      { pokemonId: 2, expected: [1, 7] },
      { pokemonId: 3, expected: [1, 7] },
      { pokemonId: 150, expected: [15] },
      { pokemonId: -1, expectedError: 'Bad pokemonId: -1' },
      { pokemonId: 'a', expectedError: 'Bad pokemonId: a' },
    ];

    testData.forEach(({ pokemonId, expected, expectedError }) => {
      const testTitle = `returns ${JSON.stringify(expected)} for pokemonId ${pokemonId}`;
      if (expectedError) {
        test(testTitle, () => {
          expect(() => getEggGroupViaPokemonId(pokemonId)).toThrow(expectedError);
        });
      } else {
        test(testTitle, () => {
          expect(getEggGroupViaPokemonId(pokemonId)).toEqual(expected);
        });
      }
    });
  });

  describe('getEggGroupNameById', () => {
    const testData = [
      { eggGroupId: 0, expected: 'None' },
      { eggGroupId: 1, expected: 'Monster' },
      { eggGroupId: 2, expected: 'Water 1' },
      { eggGroupId: 7, expected: 'Grass' },
      { eggGroupId: 14, expected: 'Dragon' },
      { eggGroupId: -1, expectedError: 'Bad eggGroupId: -1' },
      { eggGroupId: 'a', expectedError: 'Bad eggGroupId: a' },
      { eggGroupId: 100, expectedError: `Bad eggGroupId: 100` },
    ];

    testData.forEach(({ eggGroupId, expected, expectedError }) => {
      const testTitle = `returns "${expected}" for eggGroupId ${eggGroupId}`;
      if (expectedError) {
        test(testTitle, () => {
          expect(() => getEggGroupNameById(eggGroupId)).toThrow(expectedError);
        });
      } else {
        test(testTitle, () => {
          expect(getEggGroupNameById(eggGroupId)).toBe(expected);
        });
      }
    });
  });

  describe('getEggGroupNameById', () => {
    const validIds = [
      { id: 0, name: 'None' },
      { id: 5, name: 'Field' },
      { id: 10, name: 'Mineral' },
    ];

    const invalidIds = [
      { id: 'not a number', message: 'Bad eggGroupId: not a number' },
      { id: -5, message: 'Bad eggGroupId: -5' },
      { id: 123, message: 'Bad eggGroupId: 123' },
      { id: 16, message: `Bad eggGroupId: ${16}` },
    ];

    validIds.forEach(({ id, name }) => {
      test(`should return the correct egg group name for ID ${id}`, () => {
        const result = getEggGroupNameById(id);
        expect(result).toBe(name);
      });
    });

    invalidIds.forEach(({ id, message }) => {
      test(`should throw an error for invalid ID ${id}`, () => {
        expect(() => getEggGroupNameById(id)).toThrow(Error(message));
      });
    });
  });

  describe('getPokemonInEggGroup', () => {
    const validIds = [
      { id: 0, count: 1 },
      { id: 5, count: 404 },
      { id: 10, count: 100 },
    ];

    const invalidIds = [
      { id: 'not a number', message: 'Bad eggGroupId: not a number' },
      { id: -5, message: 'Bad eggGroupId: -5' },
      { id: 123, message: 'Bad eggGroupId: 123' },
    ];

    validIds.forEach(({ id, count }) => {
      test(`should return an array of ${count} Pokemon for egg group ID ${id}`, () => {
        const result = getPokemonIdsInEggGroup(id);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(count);
      });
    });

    invalidIds.forEach(({ id, message }) => {
      test(`should throw an error for invalid egg group ID ${id}`, () => {
        expect(() => getPokemonIdsInEggGroup(id)).toThrow(Error(message));
      });
    });
  });
});
