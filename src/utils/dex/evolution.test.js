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

  it('works for a simple Pokemon (one stage)', () => {
    const pokemonId = 21; // Spearow
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 21,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 22,
          evolutionDetails: {
            formNo: 0,
            level: 20,
            methodId: 4,
            methodParameter: 0,
            monsNo: 22,
          },
          evolvesInto: [],
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('works for a simple Pokemon (two stages)', () => {
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

  it('works for a simple Pokemon (one stage across gens)', () => {
    const pokemonId = 465; // Tangrowth
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 114,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 465,
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 21,
            methodParameter: 246,
            monsNo: 465,
          },
          evolvesInto: [],
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('works for a simple Pokemon (two stage across gens)', () => {
    const pokemonId = 116; // Horsea
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 116,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 117,
          evolutionDetails: {
            formNo: 0,
            level: 32,
            methodId: 4,
            methodParameter: 0,
            monsNo: 117,
          },
          evolvesInto: [
            {
              pokemonId: 230,
              evolutionDetails: {
                formNo: 0,
                level: 0,
                methodId: 8,
                methodParameter: 235,
                monsNo: 230,
              },
              evolvesInto: [],
            },
          ],
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('works for a Pokemon with branching Evolutions (across the same gen)', () => {
    const pokemonId = 367; // Huntail
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 366,
      evolutionDetails: null,
      evolvesInto: [
        {
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 8,
            methodParameter: 226,
            monsNo: 367,
          },
          evolvesInto: [],
          pokemonId: 367,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 8,
            methodParameter: 227,
            monsNo: 368,
          },
          evolvesInto: [],
          pokemonId: 368,
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('works for a Pokemon with a 2 stage branching Evolution (across the same gen)', () => {
    const pokemonId = 789; // Cosmog
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 789,
      evolutionDetails: null,
      evolvesInto: [
        {
          evolutionDetails: {
            formNo: 0,
            level: 43,
            methodId: 4,
            methodParameter: 0,
            monsNo: 790,
          },
          evolvesInto: [
            {
              evolutionDetails: {
                formNo: 0,
                level: 53,
                methodId: 32,
                methodParameter: 0,
                monsNo: 791,
              },
              evolvesInto: [],
              pokemonId: 791,
            },
            {
              evolutionDetails: {
                formNo: 0,
                level: 53,
                methodId: 33,
                methodParameter: 0,
                monsNo: 792,
              },
              evolvesInto: [],
              pokemonId: 792,
            },
          ],
          pokemonId: 790,
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('works for a Pokemon with many branching Evolutions (across multiple gens)', () => {
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

  it('branching 1st stage evo with 2 stage evos on each side', () => {
    const pokemonId = 265; // Wurmple
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 265,
      evolutionDetails: null,
      evolvesInto: [
        {
          evolutionDetails: {
            formNo: 0,
            level: 7,
            methodId: 12,
            methodParameter: 0,
            monsNo: 266,
          },
          evolvesInto: [
            {
              evolutionDetails: {
                formNo: 0,
                level: 10,
                methodId: 4,
                methodParameter: 0,
                monsNo: 267,
              },
              evolvesInto: [],
              pokemonId: 267,
            },
          ],
          pokemonId: 266,
        },
        {
          evolutionDetails: {
            formNo: 0,
            level: 7,
            methodId: 13,
            methodParameter: 0,
            monsNo: 268,
          },
          evolvesInto: [
            {
              evolutionDetails: {
                formNo: 0,
                level: 10,
                methodId: 4,
                methodParameter: 0,
                monsNo: 269,
              },
              evolvesInto: [],
              pokemonId: 269,
            },
          ],
          pokemonId: 268,
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('works for a baby pokemon (across generations)', () => {
    const pokemonId = 124; // Jinx
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 238,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 124,
          evolutionDetails: {
            formNo: 0,
            level: 30,
            methodId: 4,
            methodParameter: 0,
            monsNo: 124,
          },
          evolvesInto: [],
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('works for a baby pokemon (branching evo across generations)', () => {
    const pokemonId = 236; // Tyrogue
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 236,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 107,
          evolutionDetails: {
            formNo: 0,
            level: 20,
            methodId: 11,
            methodParameter: 0,
            monsNo: 107,
          },
          evolvesInto: [],
        },
        {
          pokemonId: 106,
          evolutionDetails: {
            formNo: 0,
            level: 20,
            methodId: 9,
            methodParameter: 0,
            monsNo: 106,
          },
          evolvesInto: [],
        },
        {
          pokemonId: 237,
          evolutionDetails: {
            formNo: 0,
            level: 20,
            methodId: 10,
            methodParameter: 0,
            monsNo: 237,
          },
          evolvesInto: [],
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('works for a baby Pokemon with a 2 stage branching Evolution (across multiple gens)', () => {
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

  it('works for a baby Pokemon with a 2 stage evo on an alternate form (across multiple gens)', () => {
    const pokemonId = 122; // Mr. Mime
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 439,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 122,
          evolutionDetails: {
            formNo: 0,
            level: 0,
            methodId: 21,
            methodParameter: 102,
            monsNo: 122,
          },
          evolvesInto: [],
        },
        {
          pokemonId: 1083,
          evolutionDetails: {
            formNo: 1,
            level: 32,
            methodId: 8,
            methodParameter: 849,
            monsNo: 122,
          },
          evolvesInto: [
            {
              pokemonId: 866,
              evolutionDetails: {
                formNo: 0,
                level: 42,
                methodId: 4,
                methodParameter: 0,
                monsNo: 866,
              },
              evolvesInto: [],
            },
          ],
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('works for a Pokemon with alternate form Evolutions (different evo for each form)', () => {
    const pokemonId = 1173; // Burmy Trash Cloak
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 1173,
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
          pokemonId: 414,
        },
      ],
    };
    expect(result).toEqual(expected);
  });

  it('works for a Pokemon with alternate form Evolutions backwards (assumes base form)', () => {
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
