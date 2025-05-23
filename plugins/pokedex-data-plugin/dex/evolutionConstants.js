const { getItemString } = require('./item');
const { getMoveString } = require('./moves');
const { getPokemonName } = require('./name');
const { getTypeName } = require('./types');
const { doNothing } = require('./functions');

const REPLACE_STRING = "REPLACE";

const LEVEL = "Level"
const FRIENDSHIP = "Friendship"
const DAY = "Day"
const NIGHT = "Night"
const DUSK = "Dusk";
const MOSS_ROCK = "Moss Rock"
const ICE_ROCK = "Ice Rock"
const FEMALE = "Female"
const MALE = "Male"
const BEAUTY = "Beauty"
const CRITICAL_HITS = "critical hits";
const RECEIVE_DAMAGE = "Receive";
const FOLLOWER = "Follower";
const RNG = "RNG";
const ITEM_STRING_FUNCTION = "getItemString";
const MOVE_STRING_FUNCTION = "getMoveString";
const POKEMON_NAME_FUNCTION = "getPokemonName";
const TYPE_NAME_FUNCTION = "getTypeName";

const EVOLUTION_METHOD_DETAILS = {
  0: {
    method: '',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  1: {
    method: 'Friendship',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  2: {
    method: 'Friendship + Day',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  3: {
    method: 'Friendship + Night',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  4: {
    method: `Level ${REPLACE_STRING}`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  5: {
    method: 'Trade',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  6: {
    method: `Trade with ${REPLACE_STRING}`,
    requiresLevel: false,
    parameterType: 'Item',
    function: getItemString,
  },
  7: {
    method: 'Karrablast/Shelmet Trade',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  8: {
    method: `Use ${REPLACE_STRING}`,
    requiresLevel: false,
    parameterType: 'Item',
    function: getItemString,
  },
  9: {
    method: `Level ${REPLACE_STRING} & Atk > Def`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  10: {
    method: `Level ${REPLACE_STRING} & Atk = Def`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  11: {
    method: `Level ${REPLACE_STRING} & Def > Atk`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  12: {
    method: `Level ${REPLACE_STRING} + RNG`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  13: {
    method: `Level ${REPLACE_STRING} + RNG`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  14: {
    method: `Level ${REPLACE_STRING} & Free Space + Poké Ball`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  15: {
    method: 'SPECIAL_NUKENIN',
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  16: {
    method: 'High Beauty',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  17: {
    method: `Use ${REPLACE_STRING} & Male`,
    requiresLevel: false,
    parameterType: 'Item',
    function: getItemString,
  },
  18: {
    method: `Use ${REPLACE_STRING} & Female`,
    requiresLevel: false,
    parameterType: 'Item',
    function: getItemString,
  },
  19: {
    method: `Hold ${REPLACE_STRING} & Day`,
    requiresLevel: false,
    parameterType: 'Item',
    function: getItemString,
  },
  20: {
    method: `Hold ${REPLACE_STRING} & Night`,
    requiresLevel: false,
    parameterType: 'Item',
    function: getItemString,
  },
  21: {
    method: `Level up with ${REPLACE_STRING}`,
    requiresLevel: false,
    parameterType: 'Move',
    function: getMoveString,
  },
  22: {
    method: `${REPLACE_STRING} in party`,
    requiresLevel: false,
    parameterType: 'Pokemon',
    function: getPokemonName,
  },
  23: {
    method: `Level ${REPLACE_STRING} & Male`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  24: {
    method: `Level ${REPLACE_STRING} & Female`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  25: {
    method: 'Level Up in Magnetic Field',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  26: {
    method: 'Level Up By Moss Rock',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  27: {
    method: 'Level Up By Ice Rock',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  28: {
    method: 'Level Up & Device Upside-Down',
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  29: {
    method: `Friendship + ${REPLACE_STRING} Move`,
    requiresLevel: false,
    parameterType: 'Typing',
    function: getTypeName,
  },
  30: {
    method: `Level ${REPLACE_STRING} + Dark-Type in Party`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  31: {
    method: `Level ${REPLACE_STRING} in Rain`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  32: {
    method: `Level ${REPLACE_STRING} During Day`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  33: {
    method: `Level ${REPLACE_STRING} During Night`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  34: {
    method: 'On LvUp: Lv ≥ LvReq & is female → set form to 1',
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  35: {
    method: 'FRIENDLY',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  36: {
    method: 'On LvUp: Lv ≥ LvReq & is game version',
    requiresLevel: true,
    parameterType: 'GameVersion',
    function: doNothing,
  },
  37: {
    method: 'On LvUp: Lv ≥ LvReq & is game version & is day',
    requiresLevel: true,
    parameterType: 'GameVersion',
    function: doNothing,
  },
  38: {
    method: 'On LvUp: Lv ≥ LvReq & is game version & is night',
    requiresLevel: true,
    parameterType: 'GameVersion',
    function: doNothing,
  },
  39: {
    method: 'Level Up on Summit',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  40: {
    method: `Level ${REPLACE_STRING} 7:00-7:59PM`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  41: {
    method: `Level ${REPLACE_STRING} & Non-Native region`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  42: {
    method: `Use ${REPLACE_STRING} & Non-Native region`,
    requiresLevel: false,
    parameterType: 'Item',
    function: getItemString,
  },
  43: {
    method: `${REPLACE_STRING} critical hits in One Battle`,
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  44: {
    method: `Receive at least ${REPLACE_STRING} Damage`,
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  45: {
    method: 'See Alcremie Evolutions page',
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  46: {
    method: `Level ${REPLACE_STRING} & Amped Nature`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  47: {
    method: `Level ${REPLACE_STRING} & Low-Key Nature`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  48: {
    method: `Hold ${REPLACE_STRING}`,
    requiresLevel: false,
    parameterType: 'Item',
    function: getItemString,
  },
  49: {
    method: `${REPLACE_STRING} in party or was last Pokémon to evolve`,
    requiresLevel: false,
    parameterType: 'Pokemon',
    function: getPokemonName,
  },
  50: {
    method: `Level ${REPLACE_STRING} + RNG`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  51: {
    method: `Level ${REPLACE_STRING} + RNG`,
    requiresLevel: true,
    parameterType: 'None',
    function: doNothing,
  },
  52: {
    method: `Have as follower for ${REPLACE_STRING} steps`,
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  53: {
    method: `Have at least 1 ${REPLACE_STRING} in bag`,
    requiresLevel: false,
    parameterType: 'Item',
    function: getItemString,
  },
  54: {
    method: `Have at least 999 ${REPLACE_STRING} in bag`,
    requiresLevel: false,
    parameterType: 'Item',
    function: getItemString,
  },
  55: {
    method: `Knows ${REPLACE_STRING} + RNG`,
    requiresLevel: false,
    parameterType: 'Move',
    function: getMoveString,
  },
  56: {
    method: `Knows ${REPLACE_STRING} + RNG`,
    requiresLevel: false,
    parameterType: 'Move',
    function: getMoveString,
  },
  57: {
    method: `Receive at least ${REPLACE_STRING} Damage & Male`,
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  58: {
    method: `Receive at least ${REPLACE_STRING} Damage & Female`,
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
  59: {
    method: `Do Nothing`,
    requiresLevel: false,
    parameterType: 'None',
    function: doNothing,
  },
};

module.exports = {
  REPLACE_STRING,
  EVOLUTION_METHOD_DETAILS,
  LEVEL,
  FRIENDSHIP,
  DAY,
  NIGHT,
  DUSK,
  MOSS_ROCK,
  ICE_ROCK,
  FEMALE,
  MALE,
  BEAUTY,
  CRITICAL_HITS,
  RECEIVE_DAMAGE,
  FOLLOWER,
  RNG,
  ITEM_STRING_FUNCTION,
  MOVE_STRING_FUNCTION,
  POKEMON_NAME_FUNCTION,
  TYPE_NAME_FUNCTION,
}