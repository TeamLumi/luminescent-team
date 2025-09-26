const START_OF_LINE_FORMS = {
  "hisuian": "hisui",
  "galarian": "galar",
  "alolan": "alola",
  "paldean": "paldea",
  "gigantamax": "gmax",
  "ash-": "ash ",
  "-f": "-female",
  "drive ": "",
  "type ": " ",
  " sweet": "",
  " forme power construct": " power construct",
  " rider": "",
  " wings": "",
  " mane ": " ",
  " color": "",
  "! form": "emark",
  "? form": "qmark",
}

const END_OF_LINE_FORMS = {
  "forme": "",
  "form": "",
  "pattern": "",
  "mode": "",
  "flower": "",
  "trim": "",
  "size": "",
  "style": "",
  "core": "",
  "face": "",
  "construct": "",
  "sword": "",
  "shield": "",
}

const REVERSE_ORDER_ARRAY = [
  "hisui",
  "galar",
  "alola",
  "paldea",
  "mega",
  "gmax",
  "totem",
  "eternamax",
  "dada",
  "ice",
  "white",
  "black",
  "ultra",
  "ash",
  "titanic",
  "shadow",
  "dawn",
  "dusk",
  "original",
];

const LUMI_TO_RELUMI_PIKACHU_FORMS = {
  7: 7,
  8: 7,
  9: 7,
  10: 7,
  11: 7,
  12: 7,
  13: 7,
  14: 7,
  15: 8,
  16: 9,
  17: 10
};

module.exports = { START_OF_LINE_FORMS, END_OF_LINE_FORMS, REVERSE_ORDER_ARRAY, LUMI_TO_RELUMI_PIKACHU_FORMS }