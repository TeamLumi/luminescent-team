import { getEvolutionMethodDetail, getEvolutionTree } from './evolution';

describe('getEvolutionMethodDetail', () => {
  it('Should return a valid method for a valid id', () => {
    const methodId = 1; // High Friendship
    const result = getEvolutionMethodDetail(methodId);
    const expected = {
      method: 'On LvUp: high friendship',
      parameterType: 'None',
      requiresLevel: false,
    };
    expect(result).toEqual(expected);
  });

  it('should throw an error for an invalid methodId', () => {
    expect(() => {
      getEvolutionMethodDetail('invalid');
    }).toThrow('Bad method: invalid');
  });
});

describe('getEvolutionTree', () => {
  it('should throw an error for an invalid pokemonId', () => {
    expect(() => {
      getEvolutionTree('invalid');
    }).toThrow('Bad pokemon ID: invalid');
  });

  it('should throw an error for an invalid pokemonId number', () => {
    expect(() => {
      getEvolutionTree('9999');
    }).toThrow('Bad pokemon ID: 9999');
  });

  it('should return the evolution tree for a simple Pokemon', () => {
    const pokemonId = 1; // Bulbasaur
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 1,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 2,
          evolutionDetails: {
            formNo: 0,
            level: 16,
            methodId: 4,
            methodParameter: 0,
            monsNo: 2,
          },
          evolvesInto: [
            {
              pokemonId: 3,
              evolutionDetails: {
                formNo: 0,
                level: 32,
                methodId: 4,
                methodParameter: 0,
                monsNo: 3,
              },
              evolvesInto: [],
            },
          ],
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('should return the evolution tree for a Pokemon with many Evolutions', () => {
    const pokemonId = 133; // Eevee
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 133,
      evolutionDetails: null,
      evolvesInto: [
        {
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 8,
            methodParameter: 85,
            monsNo: 470,
          },
          evolvesInto: [],
          pokemonId: 470,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 8,
            methodParameter: 849,
            monsNo: 471,
          },
          evolvesInto: [],
          pokemonId: 471,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 8,
            methodParameter: 83,
            monsNo: 135,
          },
          evolvesInto: [],
          pokemonId: 135,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 8,
            methodParameter: 84,
            monsNo: 134,
          },
          evolvesInto: [],
          pokemonId: 134,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 8,
            methodParameter: 82,
            monsNo: 136,
          },
          evolvesInto: [],
          pokemonId: 136,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 29,
            methodParameter: 17,
            monsNo: 700,
          },
          evolvesInto: [],
          pokemonId: 700,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 2,
            methodParameter: 0,
            monsNo: 196,
          },
          evolvesInto: [],
          pokemonId: 196,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 3,
            methodParameter: 0,
            monsNo: 197,
          },
          evolvesInto: [],
          pokemonId: 197,
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('should return the evolution tree for a Pokemon with a cross-generation branching evo.', () => {
    const pokemonId = 172; // Pichu
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 172,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 25,
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 1,
            methodParameter: 0,
            monsNo: 25,
          },
          evolvesInto: [
            {
              evolutionDetails: {
                formNo: 0,
                level: 0,
                methodId: 8,
                methodParameter: 83,
                monsNo: 26,
              },
              evolvesInto: [],
              pokemonId: 26,
            },
            {
              evolutionDetails: {
                formNo: 1,
                level: 0,
                methodId: 8,
                methodParameter: 80,
                monsNo: 26,
              },
              evolvesInto: [],
              pokemonId: 1044,
            },
          ],
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('should return the evolution tree for a Pokemon with alternate form evolutions.', () => {
    const pokemonId = 1173; // Burmy Trash Cloak
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 412,
      evolutionDetails: null,
      evolvesInto: [
        {
          evolutionDetails: {
            formNo: 2,
            level: 20,
            methodId: 24,
            methodParameter: 0,
            monsNo: 413,
          },
          evolvesInto: [],
          pokemonId: 1175,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 20,
            methodId: 23,
            methodParameter: 0,
            monsNo: 414,
          },
          evolvesInto: [],
          pokemonId: 1173,
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('should properly grab those same evolutions as previous running backwards.', () => {
    const pokemonId = 414; // Mothim
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 412,
      evolutionDetails: null,
      evolvesInto: [
        {
          evolutionDetails: {
            formNo: 0,
            level: 20,
            methodId: 24,
            methodParameter: 0,
            monsNo: 413,
          },
          evolvesInto: [],
          pokemonId: 413,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 20,
            methodId: 23,
            methodParameter: 0,
            monsNo: 414,
          },
          evolvesInto: [],
          pokemonId: 414,
        },
      ],
    };
    expect(result).toEqual(expected);
  });
});
