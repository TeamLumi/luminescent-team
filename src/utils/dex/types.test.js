import { getTypeName, getTypes } from './types';

describe('Dex Utils Type Getters', () => {
  describe('getTypeName', () => {
    it('should return the name of the type at the given index', () => {
      expect(getTypeName(0)).toBe('Normal');
      expect(getTypeName(1)).toBe('Fighting');
      expect(getTypeName(2)).toBe('Flying');
      expect(getTypeName()).toBe('Normal');
      expect(() => getTypeName(-1)).toThrow('Bad typeId: -1');
    });
  });

  describe('getTypes', () => {
    it('should return an array with two type names when the Pokemon has two types', () => {
      const pokemonObject = { type1: 0, type2: 1 };
      expect(getTypes(pokemonObject)).toEqual(['Normal', 'Fighting']);
    });

    it('should return an array with one type name when the Pokemon has two identical types', () => {
      const pokemonObject = { type1: 0, type2: 0 };
      expect(getTypes(pokemonObject)).toEqual(['Normal']);
    });
  });
});
