import { getItemString } from './item';
import { getMoveString, getMoveProperties } from './moves';
import { getPokemonName } from './name';

export const EVOLUTION_METHOD_DETAILS = (methodParameter) => ({
  0: {
    method: '',
    requiresLevel: false,
    parameterType: 'None',
  },
  1: {
    method: 'Friendship',
    requiresLevel: false,
    parameterType: 'None',
  },
  2: {
    method: 'Friendship + Day',
    requiresLevel: false,
    parameterType: 'None',
  },
  3: {
    method: 'Friendship + Night',
    requiresLevel: false,
    parameterType: 'None',
  },
  4: {
    method: `Level ${methodParameter}`,
    requiresLevel: true,
    parameterType: 'None',
  },
  5: {
    method: 'Trade',
    requiresLevel: false,
    parameterType: 'None',
  },
  6: {
    method: `Trade with ${getItemString(methodParameter)}`,
    requiresLevel: false,
    parameterType: 'Item',
  },
  7: {
    method: 'Karrablast/Shelmet Trade',
    requiresLevel: false,
    parameterType: 'None',
  },
  8: {
    method: `Use ${getItemString(methodParameter)}`,
    requiresLevel: false,
    parameterType: 'Item',
  },
  9: {
    method: `Level ${methodParameter} & Atk > Def`,
    requiresLevel: true,
    parameterType: 'None',
  },
  10: {
    method: `Level ${methodParameter} & Def > Atk`,
    requiresLevel: true,
    parameterType: 'None',
  },
  11: {
    method: `Level ${methodParameter} & Atk = Def`,
    requiresLevel: true,
    parameterType: 'None',
  },
  12: {
    method: `Level ${methodParameter} + RNG`,
    requiresLevel: true,
    parameterType: 'None',
  },
  13: {
    method: `Level ${methodParameter} + RNG`,
    requiresLevel: true,
    parameterType: 'None',
  },
  14: {
    method: `Level ${methodParameter} & Free Space + Poké Ball`,
    requiresLevel: true,
    parameterType: 'None',
  },
  15: {
    method: 'SPECIAL_NUKENIN',
    requiresLevel: true,
    parameterType: 'None',
  },
  16: {
    method: 'High Beauty',
    requiresLevel: false,
    parameterType: 'None',
  },
  17: {
    method: `Use ${getItemString(methodParameter)} & Male`,
    requiresLevel: false,
    parameterType: 'Item',
  },
  18: {
    method: `Use ${getItemString(methodParameter)} & Female`,
    requiresLevel: false,
    parameterType: 'Item',
  },
  19: {
    method: `Hold ${getItemString(methodParameter)} & Day`,
    requiresLevel: true,
    parameterType: 'Item',
  },
  20: {
    method: `Hold ${getItemString(methodParameter)} & Night`,
    requiresLevel: true,
    parameterType: 'Item',
  },
  21: {
    method: `Knows ${getMoveString(methodParameter)}`,
    requiresLevel: false,
    parameterType: 'Move',
  },
  22: {
    method: `${getPokemonName(methodParameter)} in party`,
    requiresLevel: false,
    parameterType: 'Pokemon',
  },
  23: {
    method: `Level ${methodParameter} & Male`,
    requiresLevel: true,
    parameterType: 'None',
  },
  24: {
    method: `Level ${methodParameter} & Female`,
    requiresLevel: true,
    parameterType: 'None',
  },
  25: {
    method: 'Level Up in Magnetic Field',
    requiresLevel: false,
    parameterType: 'None',
  },
  26: {
    method: 'Level Up By Moss Rock',
    requiresLevel: false,
    parameterType: 'None',
  },
  27: {
    method: 'Level Up By Ice Rock',
    requiresLevel: false,
    parameterType: 'None',
  },
  28: {
    method: 'Level Up & Device Upside-Down',
    requiresLevel: true,
    parameterType: 'None',
  },
  29: {
    method: `Friendship with ${getMoveProperties(methodParameter).type} Move`,
    requiresLevel: false,
    parameterType: 'Typing',
  },
  30: {
    method: `Level ${methodParameter} with Dark-Type in Party`,
    requiresLevel: true,
    parameterType: 'None',
  },
  31: {
    method: `Level ${methodParameter} in Rain`,
    requiresLevel: true,
    parameterType: 'None',
  },
  32: {
    method: `Level ${methodParameter} During Day`,
    requiresLevel: true,
    parameterType: 'None',
  },
  33: {
    method: `Level ${methodParameter} During Night`,
    requiresLevel: true,
    parameterType: 'None',
  },
  34: {
    method: 'On LvUp: Lv ≥ LvReq & is female → set form to 1',
    requiresLevel: true,
    parameterType: 'None',
  },
  35: {
    method: 'FRIENDLY',
    requiresLevel: false,
    parameterType: 'None',
  },
  36: {
    method: 'On LvUp: Lv ≥ LvReq & is game version',
    requiresLevel: true,
    parameterType: 'GameVersion',
  },
  37: {
    method: 'On LvUp: Lv ≥ LvReq & is game version & is day',
    requiresLevel: true,
    parameterType: 'GameVersion',
  },
  38: {
    method: 'On LvUp: Lv ≥ LvReq & is game version & is night',
    requiresLevel: true,
    parameterType: 'GameVersion',
  },
  39: {
    method: 'Level Up on Summit',
    requiresLevel: false,
    parameterType: 'None',
  },
  40: {
    method: `Level ${methodParameter} 7:00-7:59PM`,
    requiresLevel: true,
    parameterType: 'None',
  },
  41: {
    method: `Level ${methodParameter} & Non-Native region`,
    requiresLevel: true,
    parameterType: 'None',
  },
  42: {
    method: `Use ${getItemString(methodParameter)} & Non-Native region`,
    requiresLevel: false,
    parameterType: 'Item',
  },
  43: {
    method: "3 Crits in One Battle",
    requiresLevel: false,
    parameterType: 'None',
  },
  44: {
    method: 'Galarian Yamask Evolution',
    requiresLevel: false,
    parameterType: 'None',
  },
  45: {
    method: 'PokéSafe Blender',
    requiresLevel: false,
    parameterType: 'None',
  },
  46: {
    method: `Level ${methodParameter} & Amped Nature`,
    requiresLevel: true,
    parameterType: 'None',
  },
  47: {
    method: `Level ${methodParameter} & Low-Key Nature`,
    requiresLevel: true,
    parameterType: 'None',
  },
});