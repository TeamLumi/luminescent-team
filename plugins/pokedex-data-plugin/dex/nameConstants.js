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

// --- Precompile Regex Patterns ---
const RE_SPECIAL = /[!?♀♂]|[^\w\s-]/g;
const RE_MULTI_SEP = /[-\s]+/g;
const RE_ASCII_CHECK = /[^\x00-\x7F]/; // detect if normalization needed
const RE_SPACE_OR_HYPHEN = /[ -]/;

// Helper to escape regex metacharacters in a literal string
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// --- Normalize the replacement maps to lowercase keys (so they match .toLowerCase() later) ---
const START_MAP = Object.fromEntries(
  Object.entries(START_OF_LINE_FORMS).map(([k, v]) => [k.toLowerCase(), v])
);

const END_MAP = Object.fromEntries(
  Object.entries(END_OF_LINE_FORMS).map(([k, v]) => [k.toLowerCase(), v])
);

// --- Sort keys by length desc to prefer longest match first (avoids partial matches) ---
const startKeysSorted = Object.keys(START_MAP)
  .slice()
  .sort((a, b) => b.length - a.length)          // longest-first
  .map(escapeRegExp);                           // escape regex metachars

const endKeysSorted = Object.keys(END_MAP)
  .slice()
  .sort((a, b) => b.length - a.length)
  .map(escapeRegExp);

// Build safe regexes. We use non-capturing groups where appropriate.
const START_REGEX = startKeysSorted.length
  ? new RegExp(startKeysSorted.join('|'), 'g')
  : null;

// For end-of-line forms, match the pattern at the end of the string.
// Keys are escaped literal strings; we allow the match to be preceded by a space or hyphen or nothing.
const END_REGEX = endKeysSorted.length
  ? new RegExp(`(?:\\s|-|)(${endKeysSorted.join('|')})$`, 'g')
  : null;

module.exports = {
  START_OF_LINE_FORMS,
  END_OF_LINE_FORMS,
  REVERSE_ORDER_ARRAY,
  LUMI_TO_RELUMI_PIKACHU_FORMS,
  RE_SPECIAL,
  RE_MULTI_SEP,
  RE_ASCII_CHECK,
  RE_SPACE_OR_HYPHEN,
  START_MAP,
  END_MAP,
  START_REGEX,
  END_REGEX
}