import {
  getPokemonMonsnoFromName,
  getFormName,
  getFormNameOfProblematicPokemon,
  getPokemonName,
  getPokemonIdFromName,
  getPokemonNames,
  getPokemonFormId,
  createPokemonMap,
} from './name';

describe('Dex utils Name getters', () => {
  describe('createPokemonMap', () => {
    test('creates a map with the base name of a pokemon when available', () => {
      const pokemon = { id: 25 };
      const result = createPokemonMap({}, pokemon);
      expect(result[pokemon.id]).toBe('Pikachu');
    });

    test('creates a map with the alternate form name of a pokemon when available', () => {
      const pokemon = { id: 487 };
      const result = createPokemonMap({}, pokemon);
      expect(result[pokemon.id]).toBe('Giratina');
    });

    test('creates a map with the default form name of a problematic pokemon', () => {
      const pokemon = { id: 25 };
      const basePokemonNames = { labelDataArray: [] };
      const formPokemonNames = { labelDataArray: [] };
      basePokemonNames.labelDataArray[pokemon.id] = undefined;
      formPokemonNames.labelDataArray[pokemon.id] = undefined;
      const result = createPokemonMap({}, pokemon);
      expect(result[pokemon.id]).toBe('Pikachu');
    });

    test('throws an error if the pokemon id is invalid', () => {
      const pokemon = { id: -1 };
      expect(() => createPokemonMap({}, pokemon)).toThrow();
    });
  });

  describe('getFormName', () => {
    test('returns the name of a pokemon form', () => {
      const result = getFormName(800);
      expect(result).toBe('Necrozma');
    });

    test('returns undefined if the pokemon id is invalid', () => {
      const result = getFormName(-1);
      expect(result).toBeUndefined();
    });
  });

  describe('getPokemonName', () => {
    test('returns the name of a pokemon', () => {
      const result = getPokemonName(25);
      expect(result).toBe('Pikachu');
    });

    test('returns undefined if the pokemon id is invalid', () => {
      const result = getPokemonName(-1);
      expect(result).toBeUndefined();
    });
  });

  describe('getPokemonIdFromName', () => {
    it('should return 0 if name is not found', () => {
      expect(getPokemonIdFromName('Non-existing Pokemon')).toBe(0);
    });

    it('should return the correct id for valid names', () => {
      expect(getPokemonIdFromName('Bulbasaur')).toBe(1);
      expect(getPokemonIdFromName('Charmander')).toBe(4);
      expect(getPokemonIdFromName('Squirtle')).toBe(7);
      expect(getPokemonIdFromName('Pikachu')).toBe(25);
    });
  });
  describe('getFormNameOfProblematicPokemon', () => {
    test('getFormNameOfProblematicPokemon returns correct form name for specified ID', () => {
      expect(getFormNameOfProblematicPokemon(1242)).toBe('Ash-Greninja');
      expect(getFormNameOfProblematicPokemon(1285)).toBe('Meowstic-F');
      expect(getFormNameOfProblematicPokemon(1310)).toBe('Rockruff Own-Tempo');
      expect(getFormNameOfProblematicPokemon(1441)).toBe('Indeedee-F');
      expect(getFormNameOfProblematicPokemon(1454)).toBe('Basculegion-F');
      expect(getFormNameOfProblematicPokemon(1456)).toBe('Oinkologne-F');
      expect(() => getFormNameOfProblematicPokemon(1000)).toThrow('Bad 2.0 Pokemon ID in PokemonNameMap: 1000');
    });
  });

  describe('getPokemonMonsnoFromName()', () => {
    test('getPokemonMonsnoFromName() returns the correct index for a given pokemon name', () => {
      expect(getPokemonMonsnoFromName('Bulbasaur')).toBe(1);
      expect(getPokemonMonsnoFromName('Charmander')).toBe(4);
      expect(getPokemonMonsnoFromName('Pikachu')).toBe(25);
    });

    test('getPokemonMonsnoFromName() returns -1 for an empty input', () => {
      expect(getPokemonMonsnoFromName()).toBe(-1);
      expect(getPokemonMonsnoFromName('')).toBe(-1);
    });

    test('getPokemonMonsnoFromName() returns -1 for an invalid pokemon name', () => {
      expect(getPokemonMonsnoFromName('Missingno.')).toBe(-1);
      expect(getPokemonMonsnoFromName('Mewthree')).toBe(-1);
    });
  });

  describe('Test getPokemonNames()', () => {
    test('getPokemonNames() returns an array of pokemon names with length equal to the given maxMonsno', () => {
      const names = getPokemonNames(5);
      expect(names).toHaveLength(5);
      expect(names).toEqual(['Egg', 'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander']);
    });

    test('getPokemonNames() returns an array of all pokemon names when maxMonsno is greater than the number of pokemon', () => {
      const names = getPokemonNames(10000);
      expect(names).toHaveLength(1466);
      expect(names[0]).toBe('Egg');
      expect(names[808]).toBe('Meltan');
    });
    test('getPokemonNames() returns an empty array if maxMonsno is less than 0', () => {
      const names = getPokemonNames(-1);
      expect(Array.isArray(names)).toBeTruthy();
      expect(names).toHaveLength(0);
    });
    test('getPokemonNames() returns an empty array if maxMonsno is not a number', () => {
      const names = getPokemonNames('wibblywobbly');
      expect(Array.isArray(names)).toBeTruthy();
      expect(names).toHaveLength(0);
    });
  });

  describe('getPokemonFormId', () => {
    it('should return the correct index for a valid form ID', () => {
      expect(getPokemonFormId(25, 1027)).toBe(1);
      expect(getPokemonFormId(133, 133)).toBe(0);
    });

    it('should return -1 for an invalid form ID', () => {
      expect(getPokemonFormId(25, 2)).toBe(-1);
      expect(getPokemonFormId(133, 1)).toBe(-1);
      expect(getPokemonFormId(800, 3)).toBe(-1);
    });

    it('should return -1 for an invalid monsno', () => {
      expect(getPokemonFormId(-1, -1)).toBe(-1);
      expect(getPokemonFormId(1000, 0)).toBe(-1);
    });
  });
});
