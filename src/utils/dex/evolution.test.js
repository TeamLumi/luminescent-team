import { getEvolutionMethodDetail, getEvolutionTree } from './evolution';

import { getItemString } from './item';
import { getMoveString } from './moves';
import { getPokemonName } from './name';
import { getTypeName } from './types';
import { doNothing } from './functions';

describe('getEvolutionMethodDetail', () => {
  it('Should return a valid method for a valid id', () => {
    const methodId = 1; // High Friendship
    const [ result, evoMethod ] = getEvolutionMethodDetail(methodId);
    const expected = {
      "function": doNothing,
      method: 'Friendship',
      parameterType: 'None',
      requiresLevel: false,
    };
    expect(result).toEqual(expected);
  });

  it('Should return the filled out method with an item', () => {
    const methodId = 8 // Evolve with Item
    const methodParameter = 849 // Ice Stone
    const [ result, evoMethod ] = getEvolutionMethodDetail(methodId, methodParameter)
    const expected = {
      function: getItemString,
      method: 'Use Ice Stone',
      parameterType: 'Item',
      requiresLevel: false,
    }
    expect(result).toEqual(expected);
  });

  it('should throw an error for an invalid methodId', () => {
    expect(() => {
      getEvolutionMethodDetail('invalid');
    }).toThrow('This Method is currently not handled: invalid');
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

  it('should return only the Pokemon for a Pokemon without evolutions', () => {
    const pokemonId = 151; // Mew
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 151,
      evolutionDetails: null,
      evolvesInto: [],
    };
    expect(result).toEqual(expected);
  });

  it('works for a simple Pokemon (one stage)', () => {
    const firstPokemonId = 21; // Spearow
    const secondPokemonId = 22; // Fearow
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const expected = {
      pokemonId: 21,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 22,
          evolutionDetails: {
            formNos: [0],
            levels: [20],
            methodIds: [4],
            methodParameters: [0],
            monsNos: [22],
          },
          evolvesInto: [],
        },
      ],
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected);
  });

  it('works for a simple Pokemon (two stages)', () => {
    const firstPokemonId = 1; // Bulbasaur
    const secondPokemonId = 2; // Ivysaur
    const thirdPokemonId = 3; // Venusaur
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const thirdResult = getEvolutionTree(thirdPokemonId);
    const expected = {
      pokemonId: 1,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 2,
          evolutionDetails: {
            formNos: [0],
            levels: [16],
            methodIds: [4],
            methodParameters: [0],
            monsNos: [2],
          },
          evolvesInto: [
            {
              pokemonId: 3,
              evolutionDetails: {
                formNos: [0],
                levels: [32],
                methodIds: [4],
                methodParameters: [0],
                monsNos: [3],
              },
              evolvesInto: [],
            },
          ],
        },
      ],
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected);
  });
  
  it('works for a simple Pokemon (one stage across gens)', () => {
    const firstPokemonId = 114; // Tangela
    const secondPokemonId = 465; // Tangrowth
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const expected = {
      pokemonId: 114,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 465,
          evolutionDetails: {
            formNos: [0],
            levels: [0],
            methodIds: [21],
            methodParameters: [246],
            monsNos: [465],
          },
          evolvesInto: [],
        },
      ],
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected);
  });
  
  it('works for a simple Pokemon (two stage across gens)', () => {
    const firstPokemonId = 116; // Horsea
    const secondPokemonId = 117; // Seadra
    const thirdPokemonId = 230; // Kingdra
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const thirdResult = getEvolutionTree(thirdPokemonId);
    const expected = {
      pokemonId: 116,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 117,
          evolutionDetails: {
            formNos: [0],
            levels: [32],
            methodIds: [4],
            methodParameters: [0],
            monsNos: [117],
          },
          evolvesInto: [
            {
              pokemonId: 230,
              evolutionDetails: {
                formNos: [0],
                levels: [0],
                methodIds: [8],
                methodParameters: [235],
                monsNos: [230],
              },
              evolvesInto: [],
            },
          ],
        },
      ],
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected);
  });
  
  it('works for a Pokemon with branching Evolutions (across the same gen)', () => {
    const firstPokemonId = 366; // Clamperl
    const secondPokemonId = 367; // Huntail
    const thirdPokemonId = 368; // Gorebyss
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const thirdResult = getEvolutionTree(thirdPokemonId);
    const expected = {
      pokemonId: 366,
      evolutionDetails: null,
      evolvesInto: [
        {
          evolutionDetails: {
            formNos: [0],
            levels: [0],
            methodIds: [8],
            methodParameters: [226],
            monsNos: [367],
          },
          evolvesInto: [],
          pokemonId: 367,
        },
        {
          evolutionDetails: {
            formNos: [0],
            levels: [0],
            methodIds: [8],
            methodParameters: [227],
            monsNos: [368],
          },
          evolvesInto: [],
          pokemonId: 368,
        },
      ],
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected);
  });
  
  // Does not exist in 2.0 data
  // it('works for a Pokemon with a 2 stage branching Evolution (across the same gen)', () => {
  //   const firstPokemonId = 789; // Cosmog
  //   const secondPokemonId = 790; // Cosmeom
  //   const thirdPokemonId = 791; // Solgaleo
  //   const fourthPokemonId = 792; // Lunala
  //   const firstResult = getEvolutionTree(firstPokemonId);
  //   const secondResult = getEvolutionTree(secondPokemonId);
  //   const thirdResult = getEvolutionTree(thirdPokemonId);
  //   const fourthResult = getEvolutionTree(fourthPokemonId);
  //   const expected = {
  //     pokemonId: 789,
  //     evolutionDetails: null,
  //     evolvesInto: [
  //       {
  //         evolutionDetails: {
  //           formNos: [0],
  //           levels: [43],
  //           methodIds: [4],
  //           methodParameters: [0],
  //           monsNos: [790],
  //         },
  //         evolvesInto: [
  //           {
  //             evolutionDetails: {
  //               formNos: [0],
  //               levels: [53],
  //               methodIds: [32],
  //               methodParameters: [0],
  //               monsNos: [791],
  //             },
  //             evolvesInto: [],
  //             pokemonId: 791,
  //           },
  //           {
  //             evolutionDetails: {
  //               formNos: [0],
  //               levels: [53],
  //               methodIds: [33],
  //               methodParameters: [0],
  //               monsNos: [792],
  //             },
  //             evolvesInto: [],
  //             pokemonId: 792,
  //           },
  //         ],
  //         pokemonId: 790,
  //       },
  //     ],
  //   };
  //   expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected) && expect(fourthResult).toEqual(expected);
  // });
  
  it('works for a Pokemon with many branching Evolutions (across multiple gens)', () => {
    const firstPokemonId = 133; // Eevee
    const secondPokemonId = 134; // Vaporeon
    const thirdPokemonId = 135; // Jolteon
    const fourthPokemonId = 136; // Flareon
    const fifthPokemonId = 196; // Espeon
    const sixthPokemonId = 197; // Umbreon
    const seventhPokemonId = 470; // Leafeon
    const eighthPokemonId = 471; // Glaceon
    const ninthPokemonId = 700; // Sylveon
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const thirdResult = getEvolutionTree(thirdPokemonId);
    const fourthResult = getEvolutionTree(fourthPokemonId);
    const fifthResult = getEvolutionTree(fifthPokemonId);
    const sixthResult = getEvolutionTree(sixthPokemonId);
    const seventhResult = getEvolutionTree(seventhPokemonId);
    const eighthResult = getEvolutionTree(eighthPokemonId);
    const ninthResult = getEvolutionTree(ninthPokemonId);
    const expected = {
      "pokemonId": 133,
      "evolutionDetails": null,
      "evolvesInto": [
        {
          "pokemonId": 470,
          "evolutionDetails": {
            "methodIds": [ 8, 26 ],
            "methodParameters": [ 85, 0 ],
            "monsNos": [ 470, 470 ],
            "formNos": [ 0, 0 ],
            "levels": [ 0, 0 ]
          },
          "evolvesInto": []
        },
        {
          "pokemonId": 471,
          "evolutionDetails": {
            "methodIds": [ 8, 27 ],
            "methodParameters": [ 849, 0 ],
            "monsNos": [ 471, 471 ],
            "formNos": [ 0, 0 ],
            "levels": [ 0, 0 ]
          },
          "evolvesInto": []
        },
        {
          "pokemonId": 135,
          "evolutionDetails": {
            "methodIds": [ 8 ],
            "methodParameters": [ 83 ],
            "monsNos": [ 135 ],
            "formNos": [ 0 ],
            "levels": [ 0 ]
          },
          "evolvesInto": []
        },
        {
          "pokemonId": 134,
          "evolutionDetails": {
            "methodIds": [ 8 ],
            "methodParameters": [ 84 ],
            "monsNos": [ 134 ],
            "formNos": [ 0 ],
            "levels": [ 0 ]
          },
          "evolvesInto": []
        },
        {
          "pokemonId": 136,
          "evolutionDetails": {
            "methodIds": [ 8 ],
            "methodParameters": [ 82 ],
            "monsNos": [ 136 ],
            "formNos": [ 0 ],
            "levels": [ 0 ]
          },
          "evolvesInto": []
        },
        {
          "pokemonId": 700,
          "evolutionDetails": {
            "methodIds": [ 29, 8 ],
            "methodParameters": [ 17, 107 ],
            "monsNos": [ 700, 700 ],
            "formNos": [ 0, 0 ],
            "levels": [ 0, 0 ]
          },
          "evolvesInto": []
        },
        {
          "pokemonId": 196,
          "evolutionDetails": {
            "methodIds": [ 2, 8 ],
            "methodParameters": [ 0, 80 ],
            "monsNos": [ 196, 196 ],
            "formNos": [ 0, 0 ],
            "levels": [ 0, 0 ]
          },
          "evolvesInto": []
        },
        {
          "pokemonId": 197,
          "evolutionDetails": {
            "methodIds": [ 3, 8 ],
            "methodParameters": [ 0, 81 ],
            "monsNos": [ 197, 197 ],
            "formNos": [ 0, 0 ],
            "levels": [ 0, 0 ]
          },
          "evolvesInto": []
        }
      ]
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected) && expect(fourthResult).toEqual(expected);
    expect(fifthResult).toEqual(expected) && expect(sixthResult).toEqual(expected) && expect(seventhResult).toEqual(expected) && expect(eighthResult).toEqual(expected);
    expect(ninthResult).toEqual(expected);
  });

  it('works for pokemon with 2nd stage branching evo (across generations)', () => {
    const pokemonId = 60; // Poliwag
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 60,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 61,
          evolutionDetails: {
            formNos: [0],
            levels: [25],
            methodIds: [4],
            methodParameters: [0],
            monsNos: [61],
          },
          evolvesInto: [
            {
              pokemonId: 62,
              evolutionDetails: {
                formNos: [0],
                levels: [0],
                methodIds: [8],
                methodParameters: [84],
                monsNos: [62],
              },
              evolvesInto: [],
            },
            {
              pokemonId: 186,
              evolutionDetails: {
                formNos: [0],
                levels: [0],
                methodIds: [8],
                methodParameters: [221],
                monsNos: [186],
              },
              evolvesInto: [],
            },
          ],
        },
      ],
    };
    expect(result).toEqual(expected);
  });
  
  it('works for a branching 1st stage evo with 2 stage evos on each side', () => {
    const firstPokemonId = 265; // Wurmple
    const secondPokemonId = 266; // Silcoon
    const thirdPokemonId = 267; // Beautifly
    const fourthPokemonId = 268; // Cascoon
    const fifthPokemonId = 269; // Dustox
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const thirdResult = getEvolutionTree(thirdPokemonId);
    const fourthResult = getEvolutionTree(fourthPokemonId);
    const fifthResult = getEvolutionTree(fifthPokemonId);
    const expected = {
      pokemonId: 265,
      evolutionDetails: null,
      evolvesInto: [
        {
          evolutionDetails: {
            formNos: [0],
            levels: [7],
            methodIds: [12],
            methodParameters: [0],
            monsNos: [266],
          },
          evolvesInto: [
            {
              evolutionDetails: {
                formNos: [0],
                levels: [10],
                methodIds: [4],
                methodParameters: [0],
                monsNos: [267],
              },
              evolvesInto: [],
              pokemonId: 267,
            },
          ],
          pokemonId: 266,
        },
        {
          evolutionDetails: {
            formNos: [0],
            levels: [7],
            methodIds: [13],
            methodParameters: [0],
            monsNos: [268],
          },
          evolvesInto: [
            {
              evolutionDetails: {
                formNos: [0],
                levels: [10],
                methodIds: [4],
                methodParameters: [0],
                monsNos: [269],
              },
              evolvesInto: [],
              pokemonId: 269,
            },
          ],
          pokemonId: 268,
        },
      ],
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected) && expect(fourthResult).toEqual(expected);
    expect(fifthResult).toEqual(expected);
  });
  
  it('works for a baby pokemon (across generations)', () => {
    const firstPokemonId = 124; // Jynx
    const secondPokemonId = 238; // Smoochum
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const expected = {
      pokemonId: 238,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 124,
          evolutionDetails: {
            formNos: [0],
            levels: [30],
            methodIds: [4],
            methodParameters: [0],
            monsNos: [124],
          },
          evolvesInto: [],
        },
      ],
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected);
  });
  
  it('works for a baby pokemon (across generations with 2 stages)', () => {
    const pokemonId = 174; // Igglybuff
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 174,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 39,
          evolutionDetails: {
            formNos: [0],
            levels: [0],
            methodIds: [1],
            methodParameters: [0],
            monsNos: [39],
          },
          evolvesInto: [
            {
              pokemonId: 40,
              evolutionDetails: {
                formNos: [0],
                levels: [0],
                methodIds: [8],
                methodParameters: [81],
                monsNos: [40],
              },
              evolvesInto: [],
            },
          ],
        },
      ],
    };
    expect(result).toEqual(expected);
  });
  
  it('works for a baby pokemon (branching evo across generations)', () => {
    const firstPokemonId = 236; // Tyrogue
    const secondPokemonId = 237; // Hitmontop
    const thirdPokemonId = 106; // Hitmonlee
    const fourthPokemonId = 107; // Hitmonchan
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const thirdResult = getEvolutionTree(thirdPokemonId);
    const fourthResult = getEvolutionTree(fourthPokemonId);
    const expected = {
      pokemonId: 236,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 107,
          evolutionDetails: {
            formNos: [0],
            levels: [20],
            methodIds: [11],
            methodParameters: [0],
            monsNos: [107],
          },
          evolvesInto: [],
        },
        {
          pokemonId: 106,
          evolutionDetails: {
            formNos: [0],
            levels: [20],
            methodIds: [9],
            methodParameters: [0],
            monsNos: [106],
          },
          evolvesInto: [],
        },
        {
          pokemonId: 237,
          evolutionDetails: {
            formNos: [0],
            levels: [20],
            methodIds: [10],
            methodParameters: [0],
            monsNos: [237],
          },
          evolvesInto: [],
        },
      ],
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected) && expect(fourthResult).toEqual(expected);
  });
  
  it('works for a baby Pokemon with a 2 stage branching Evolution (across multiple gens)', () => {
    const firstPokemonId = 172; // Pichu
    const secondPokemonId = 25; // Pikachu
    const thirdPokemonId = 26; // Raichu
    const fourthPokemonId = 1044; // Alolan Raichu
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const thirdResult = getEvolutionTree(thirdPokemonId);
    const fourthResult = getEvolutionTree(fourthPokemonId);
    const expected = {
      pokemonId: 172,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 25,
          evolutionDetails: {
            formNos: [0],
            levels: [0],
            methodIds: [1],
            methodParameters: [0],
            monsNos: [25],
          },
          evolvesInto: [
            {
              evolutionDetails: {
                formNos: [0],
                levels: [0],
                methodIds: [8],
                methodParameters: [83],
                monsNos: [26],
              },
              evolvesInto: [],
              pokemonId: 26,
            },
            {
              evolutionDetails: {
                formNos: [1],
                levels: [0],
                methodIds: [8],
                methodParameters: [80],
                monsNos: [26],
              },
              evolvesInto: [],
              pokemonId: 1044,
            },
          ],
        },
      ],
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected) && expect(fourthResult).toEqual(expected);
  });
  
  it('works for a baby Pokemon with a 2 stage evo on an alternate form (across multiple gens)', () => {
    const firstPokemonId = 439; // Mime Jr.
    const secondPokemonId = 122; // Mr. Mime
    const thirdPokemonId = 1083; // Galarian Mr. Mime
    const fourthPokemonId = 866; // Mr Rime
    const firstResult = getEvolutionTree(firstPokemonId);
    const secondResult = getEvolutionTree(secondPokemonId);
    const thirdResult = getEvolutionTree(thirdPokemonId);
    const fourthResult = getEvolutionTree(fourthPokemonId);
    const expected = {
      pokemonId: 439,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 122,
          evolutionDetails: {
            formNos: [0],
            levels: [0],
            methodIds: [21],
            methodParameters: [102],
            monsNos: [122],
          },
          evolvesInto: [],
        },
        {
          pokemonId: 1083,
          evolutionDetails: {
            formNos: [1],
            levels: [32],
            methodIds: [8],
            methodParameters: [849],
            monsNos: [122],
          },
          evolvesInto: [
            {
              pokemonId: 866,
              evolutionDetails: {
                formNos: [0],
                levels: [42],
                methodIds: [4],
                methodParameters: [0],
                monsNos: [866],
              },
              evolvesInto: [],
            },
          ],
        },
      ],
    };
    expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected) && expect(fourthResult).toEqual(expected);
  });
  
  it('works for a simple pokemon with a an extra form added to first evo (across generations)', () => {
    const pokemonId = 105; // Marowak
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 104,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 105,
          evolutionDetails: {
            formNos: [0],
            levels: [28],
            methodIds: [32],
            methodParameters: [0],
            monsNos: [105],
          },
          evolvesInto: [],
        },
        {
          pokemonId: 1079,
          evolutionDetails: {
            formNos: [1],
            levels: [28],
            methodIds: [33],
            methodParameters: [0],
            monsNos: [105],
          },
          evolvesInto: [],
        },
      ],
    };
    expect(result).toEqual(expected);
  });
  
  it('works for a simple pokemon with a an extra form added to second evo (across generations)', () => {
    const pokemonId = 156; // Quilava
    const result = getEvolutionTree(pokemonId);
    const expected = {
      pokemonId: 155,
      evolutionDetails: null,
      evolvesInto: [
        {
          pokemonId: 156,
          evolutionDetails: {
            formNos: [0],
            levels: [14],
            methodIds: [4],
            methodParameters: [0],
            monsNos: [156],
          },
          evolvesInto: [
            {
              pokemonId: 1102,
              evolutionDetails: {
                formNos: [1],
                levels: [36],
                methodIds: [21],
                methodParameters: [506],
                monsNos: [157],
              },
              evolvesInto: [],
            },
            {
              pokemonId: 157,
              evolutionDetails: {
                formNos: [0],
                levels: [36],
                methodIds: [4],
                methodParameters: [0],
                monsNos: [157],
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
            formNos: [2],
            levels: [20],
            methodIds: [24],
            methodParameters: [0],
            monsNos: [413],
          },
          evolvesInto: [],
          pokemonId: 1175,
        },
        {
          evolutionDetails: {
            formNos: [0],
            levels: [20],
            methodIds: [23],
            methodParameters: [0],
            monsNos: [414],
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
            formNos: [0],
            levels: [20],
            methodIds: [24],
            methodParameters: [0],
            monsNos: [413],
          },
          evolvesInto: [],
          pokemonId: 413,
        },
        {
          evolutionDetails: {
            formNos: [0],
            levels: [20],
            methodIds: [23],
            methodParameters: [0],
            monsNos: [414],
          },
          evolvesInto: [],
          pokemonId: 414,
        },
      ],
    };
  expect(result).toEqual(expected);
  });

  it('works for a Pokemon with multiple methods of evolution', () => {
    const pokemonId = 349; // Feebas
    const result = getEvolutionTree(pokemonId)
    const expected = {
      "pokemonId": 349,
      "evolutionDetails": null,
      "evolvesInto": [
        {
          "pokemonId": 350,
          "evolutionDetails": {
            "methodIds": [
              16,
              8
            ],
            "methodParameters": [
              170,
              537
            ],
            "monsNos": [
              350,
              350
            ],
            "formNos": [
              0,
              0
            ],
            "levels": [
              0,
              0
            ]
          },
          "evolvesInto": []
        }
      ]
    };
    expect(result).toEqual(expected)
  });

  describe("3.0 Evolution Data Tests", () => {
    const MODE = "3.0";
    it('works for a Pokemon with alternate form Evolutions (different evo for each form)', () => {
      const pokemonId = 1198; // Burmy Trash Cloak
      const result = getEvolutionTree(pokemonId, true, MODE);
      const expected = {
        pokemonId: 1198,
        evolutionDetails: null,
        evolvesInto: [
          {
            evolutionDetails: {
              formNos: [2],
              levels: [20],
              methodIds: [24],
              methodParameters: [0],
              monsNos: [413],
            },
            evolvesInto: [],
            pokemonId: 1200,
          },
          {
            evolutionDetails: {
              formNos: [0],
              levels: [20],
              methodIds: [23],
              methodParameters: [0],
              monsNos: [414],
            },
            evolvesInto: [],
            pokemonId: 414,
          },
        ],
      };
      expect(result).toEqual(expected);
    });

    it('works for a simple pokemon with a an extra form added to second evo (across generations)', () => {
      const pokemonId = 156; // Quilava
      const result = getEvolutionTree(pokemonId, true, MODE);
      const expected = {
        pokemonId: 155,
        evolutionDetails: null,
        evolvesInto: [
          {
            pokemonId: 156,
            evolutionDetails: {
              formNos: [0],
              levels: [14],
              methodIds: [4],
              methodParameters: [0],
              monsNos: [156],
            },
            evolvesInto: [
              {
                pokemonId: 1123,
                evolutionDetails: {
                  formNos: [1],
                  levels: [36],
                  methodIds: [21],
                  methodParameters: [506],
                  monsNos: [157],
                },
                evolvesInto: [],
              },
              {
                pokemonId: 157,
                evolutionDetails: {
                  formNos: [0],
                  levels: [36],
                  methodIds: [4],
                  methodParameters: [0],
                  monsNos: [157],
                },
                evolvesInto: [],
              },
            ],
          },
        ],
      };
      expect(result).toEqual(expected);
    });

    it('works for a simple pokemon with a an extra form added to first evo (across generations)', () => {
      const pokemonId = 105; // Marowak
      const result = getEvolutionTree(pokemonId, true, MODE);
      const expected = {
        pokemonId: 104,
        evolutionDetails: null,
        evolvesInto: [
          {
            pokemonId: 105,
            evolutionDetails: {
              formNos: [0],
              levels: [28],
              methodIds: [32],
              methodParameters: [0],
              monsNos: [105],
            },
            evolvesInto: [],
          },
          {
            pokemonId: 1097,
            evolutionDetails: {
              formNos: [1],
              levels: [28],
              methodIds: [33],
              methodParameters: [0],
              monsNos: [105],
            },
            evolvesInto: [],
          },
        ],
      };
      expect(result).toEqual(expected);
    });

    it('works for a baby Pokemon with a 2 stage evo on an alternate form (across multiple gens)', () => {
      const firstPokemonId = 439; // Mime Jr.
      const secondPokemonId = 122; // Mr. Mime
      const thirdPokemonId = 1101; // Galarian Mr. Mime
      const fourthPokemonId = 866; // Mr Rime
      const firstResult = getEvolutionTree(firstPokemonId, true, MODE);
      const secondResult = getEvolutionTree(secondPokemonId, true, MODE);
      const thirdResult = getEvolutionTree(thirdPokemonId, true, MODE);
      const fourthResult = getEvolutionTree(fourthPokemonId, true, MODE);
      const expected = {
        pokemonId: 439,
        evolutionDetails: null,
        evolvesInto: [
          {
            pokemonId: 122,
            evolutionDetails: {
              formNos: [0],
              levels: [0],
              methodIds: [21],
              methodParameters: [102],
              monsNos: [122],
            },
            evolvesInto: [],
          },
          {
            pokemonId: 1101,
            evolutionDetails: {
              formNos: [1],
              levels: [32],
              methodIds: [8],
              methodParameters: [849],
              monsNos: [122],
            },
            evolvesInto: [
              {
                pokemonId: 866,
                evolutionDetails: {
                  formNos: [0],
                  levels: [42],
                  methodIds: [4],
                  methodParameters: [0],
                  monsNos: [866],
                },
                evolvesInto: [],
              },
            ],
          },
        ],
      };
      expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected) && expect(fourthResult).toEqual(expected);
    });

    it('works for a baby Pokemon with a 2 stage branching Evolution (across multiple gens)', () => {
      const firstPokemonId = 172; // Pichu
      const secondPokemonId = 25; // Pikachu
      const thirdPokemonId = 26; // Raichu
      const fourthPokemonId = 1059; // Alolan Raichu
      const firstResult = getEvolutionTree(firstPokemonId, true, MODE);
      const secondResult = getEvolutionTree(secondPokemonId, true, MODE);
      const thirdResult = getEvolutionTree(thirdPokemonId, true, MODE);
      const fourthResult = getEvolutionTree(fourthPokemonId, true, MODE);
      const expected = {
        pokemonId: 172,
        evolutionDetails: null,
        evolvesInto: [
          {
            pokemonId: 25,
            evolutionDetails: {
              formNos: [0],
              levels: [0],
              methodIds: [1],
              methodParameters: [0],
              monsNos: [25],
            },
            evolvesInto: [
              {
                evolutionDetails: {
                  formNos: [0],
                  levels: [0],
                  methodIds: [8],
                  methodParameters: [83],
                  monsNos: [26],
                },
                evolvesInto: [],
                pokemonId: 26,
              },
              {
                evolutionDetails: {
                  formNos: [1],
                  levels: [0],
                  methodIds: [8],
                  methodParameters: [80],
                  monsNos: [26],
                },
                evolvesInto: [],
                pokemonId: 1059,
              },
            ],
          },
        ],
      };
      expect(firstResult).toEqual(expected) && expect(secondResult).toEqual(expected) && expect(thirdResult).toEqual(expected) && expect(fourthResult).toEqual(expected);
    });
  })
});