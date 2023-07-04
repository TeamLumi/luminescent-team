export const EVOLUTION_METHOD_DETAILS = {
  0: {
    method: '',
    requiresLevel: false,
    paremeterType: 'None',
  },
  1: {
    method: 'On LvUp: high friendship',
    requiresLevel: false,
    paremeterType: 'None',
  },
  2: {
    method: 'On LvUp: high friendship & is day',
    requiresLevel: false,
    paremeterType: 'None',
  },
  3: {
    method: 'On LvUp: high friendship & is night',
    requiresLevel: false,
    paremeterType: 'None',
  },
  4: {
    method: 'On LvUp: Lv ≥ LvReq',
    requiresLevel: true,
    paremeterType: 'None',
  },
  5: {
    method: 'On Trade',
    requiresLevel: false,
    paremeterType: 'None',
  },
  6: {
    method: 'On Trade: holds item',
    requiresLevel: false,
    paremeterType: 'Item',
  },
  7: {
    method: 'Karrablast/Shelmet Trade',
    requiresLevel: false,
    paremeterType: 'None',
  },
  8: {
    method: 'On UseItem',
    requiresLevel: false,
    paremeterType: 'Item',
  },
  9: {
    method: 'On LvUp: Lv ≥ LvReq & Atk > Def',
    requiresLevel: true,
    paremeterType: 'None',
  },
  10: {
    method: 'On LvUp: Lv ≥ LvReq & Def > Atk',
    requiresLevel: true,
    paremeterType: 'None',
  },
  11: {
    method: 'On LvUp: Lv ≥ LvReq & Atk = Def',
    requiresLevel: true,
    paremeterType: 'None',
  },
  12: {
    method: 'On LvUp: Lv ≥ LvReq & rng(0-9) ≤ 4',
    requiresLevel: true,
    paremeterType: 'None',
  },
  13: {
    method: 'On LvUp: Lv ≥ LvReq & rng(0-9) > 4',
    requiresLevel: true,
    paremeterType: 'None',
  },
  14: {
    method: 'On LvUp: Lv ≥ LvReq → Get Shedinja',
    requiresLevel: true,
    paremeterType: 'None',
  },
  15: {
    method: 'SPECIAL_NUKENIN',
    requiresLevel: true,
    paremeterType: 'None',
  },
  16: {
    method: 'On LvUp: high beauty',
    requiresLevel: false,
    paremeterType: 'None',
  },
  17: {
    method: 'On UseItem: is male',
    requiresLevel: false,
    paremeterType: 'Item',
  },
  18: {
    method: 'On UseItem: is female',
    requiresLevel: false,
    paremeterType: 'Item',
  },
  19: {
    method: 'On LvUp: Lv ≥ LvReq & holds item & is day',
    requiresLevel: true,
    paremeterType: 'Item',
  },
  20: {
    method: 'On LvUp: Lv ≥ LvReq & holds item & is night',
    requiresLevel: true,
    paremeterType: 'Item',
  },
  21: {
    method: 'On LvUp: has move',
    requiresLevel: false,
    paremeterType: 'Move',
  },
  22: {
    method: 'On LvUp: Pokémon in party',
    requiresLevel: false,
    paremeterType: 'Pokemon',
  },
  23: {
    method: 'On LvUp: Lv ≥ LvReq & is male',
    requiresLevel: true,
    paremeterType: 'None',
  },
  24: {
    method: 'On LvUp: Lv ≥ LvReq & is female',
    requiresLevel: true,
    paremeterType: 'None',
  },
  25: {
    method: 'On LvUp: is by magnetic field',
    requiresLevel: false,
    paremeterType: 'None',
  },
  26: {
    method: 'On LvUp: is by moss rock',
    requiresLevel: false,
    paremeterType: 'None',
  },
  27: {
    method: 'On LvUp: is by ice rock',
    requiresLevel: false,
    paremeterType: 'None',
  },
  28: {
    method: 'On LvUp: Lv ≥ LvReq & device upside down',
    requiresLevel: true,
    paremeterType: 'None',
  },
  29: {
    method: 'On LvUp: high friendship & has move of type',
    requiresLevel: false,
    paremeterType: 'Typing',
  },
  30: {
    method: 'On LvUp: Lv ≥ LvReq & Dark Pokémon in party',
    requiresLevel: true,
    paremeterType: 'None',
  },
  31: {
    method: 'On LvUp: Lv ≥ LvReq & is raining',
    requiresLevel: true,
    paremeterType: 'None',
  },
  32: {
    method: 'On LvUp: Lv ≥ LvReq & is day',
    requiresLevel: true,
    paremeterType: 'None',
  },
  33: {
    method: 'On LvUp: Lv ≥ LvReq & is night',
    requiresLevel: true,
    paremeterType: 'None',
  },
  34: {
    method: 'On LvUp: Lv ≥ LvReq & is female → set form to 1',
    requiresLevel: true,
    paremeterType: 'None',
  },
  35: {
    method: 'FRIENDLY',
    requiresLevel: false,
    paremeterType: 'None',
  },
  36: {
    method: 'On LvUp: Lv ≥ LvReq & is game version',
    requiresLevel: true,
    paremeterType: 'GameVersion',
  },
  37: {
    method: 'On LvUp: Lv ≥ LvReq & is game version & is day',
    requiresLevel: true,
    paremeterType: 'GameVersion',
  },
  38: {
    method: 'On LvUp: Lv ≥ LvReq & is game version & is night',
    requiresLevel: true,
    paremeterType: 'GameVersion',
  },
  39: {
    method: 'On LvUp: is by summit',
    requiresLevel: false,
    paremeterType: 'None',
  },
  40: {
    method: 'On LvUp: Lv ≥ LvReq & is dusk',
    requiresLevel: true,
    paremeterType: 'None',
  },
  41: {
    method: 'On LvUp: Lv ≥ LvReq & is outside region',
    requiresLevel: true,
    paremeterType: 'None',
  },
  42: {
    method: 'On UseItem: is outside region',
    requiresLevel: false,
    paremeterType: 'Item',
  },
  43: {
    method: "Galarian Farfetch'd Evolution",
    requiresLevel: false,
    paremeterType: 'None',
  },
  44: {
    method: 'Galarian Yamask Evolution',
    requiresLevel: false,
    paremeterType: 'None',
  },
  45: {
    method: 'Milcery Evolution',
    requiresLevel: false,
    paremeterType: 'None',
  },
  46: {
    method: 'On LvUp: Lv ≥ LvReq & has amped nature',
    requiresLevel: true,
    paremeterType: 'None',
  },
  47: {
    method: 'On LvUp: Lv ≥ LvReq & has low-key nature',
    requiresLevel: true,
    paremeterType: 'None',
  },
};
