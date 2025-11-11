const {
  PersonalTable,
  BasePokemonNames,
  FormPokemonNames,
  GAMEDATA2,
  GAMEDATA3,
  GAMEDATAV,
} = require('../../../__gamedata');
const {
  START_OF_LINE_FORMS,
  END_OF_LINE_FORMS,
  REVERSE_ORDER_ARRAY,
  RE_SPECIAL,
  RE_ASCII_CHECK,
  RE_MULTI_SEP,
  RE_SPACE_OR_HYPHEN,
  START_MAP,
  START_REGEX,
  END_REGEX,
  END_MAP
} = require('./nameConstants');
const { FORM_MAP } = require('./functions');

// Cache normalized names to avoid redundant work
const normalizeCache = new Map();

const POKEMON_NAME_MAPV = PersonalTable[GAMEDATAV].Personal.reduce((pokemonNameMap, currentPokemon) => {
  return createPokemonMap(pokemonNameMap, currentPokemon, GAMEDATAV);
}, {});
const POKEMON_NAME_MAP2 = PersonalTable[GAMEDATA2].Personal.reduce((pokemonNameMap, currentPokemon) => {
  return createPokemonMap(pokemonNameMap, currentPokemon, GAMEDATA2);
}, {});
const POKEMON_NAME_MAP3 = PersonalTable[GAMEDATA3].Personal.reduce((pokemonNameMap, currentPokemon) => {
  return createPokemonMap(pokemonNameMap, currentPokemon, GAMEDATA3);
}, {});

const POKEMON_NAME_MAP = {
  [GAMEDATAV]: POKEMON_NAME_MAPV,
  [GAMEDATA2]: POKEMON_NAME_MAP2,
  [GAMEDATA3]: POKEMON_NAME_MAP3,
}

function createPokemonMap(pokemonNameMap, currentPokemon, mode = GAMEDATA2) {
  const ModeBasePokemonNames = BasePokemonNames[mode];
  const ModeFormPokemonNames = FormPokemonNames[mode];

  try {
    const { id } = currentPokemon;
    if (id < ModeBasePokemonNames.labelDataArray.length) {
      const baseFormName = ModeBasePokemonNames.labelDataArray[id]?.wordDataArray[0]?.str;
      const baseFormAltName = ModeFormPokemonNames.labelDataArray[id]?.wordDataArray[0]?.str;
      if (typeof baseFormName === 'string' && baseFormName.length > 0) {
        if (
          typeof baseFormAltName === 'string'
          && baseFormAltName.length > 0
          ) {
          if (baseFormAltName.includes(baseFormName)) {
            pokemonNameMap[id] = baseFormAltName;
            return pokemonNameMap;
          }
          pokemonNameMap[id] = `${baseFormName} ${baseFormAltName}`;
          return pokemonNameMap;
        }
        pokemonNameMap[id] = baseFormName;
        return pokemonNameMap;
      }
    }

    const [monsNo, formNo] = getPokemonMonsNoAndFormNoFromPokemonId(id, mode);
    const baseFormName = ModeBasePokemonNames.labelDataArray[monsNo]?.wordDataArray[0]?.str;
    const alternateFormName = ModeFormPokemonNames.labelDataArray[id]?.wordDataArray[0]?.str;

    if (typeof alternateFormName === 'string' && alternateFormName.length > 0) {
      if (!alternateFormName.includes(baseFormName)) {
        pokemonNameMap[id] = `${baseFormName} ${alternateFormName}`
        return pokemonNameMap
      }
      pokemonNameMap[id] = alternateFormName;
      return pokemonNameMap;
    }

    pokemonNameMap[id] = getFormNameOfProblematicPokemon(id, mode);
    return pokemonNameMap;
  } catch (e) {
    throw Error(`${currentPokemon.id} - ${e}`);
  }
}

function getFormName(id = 0, mode = GAMEDATA2) {
  const MODE_POKEMON_NAME_MAP = POKEMON_NAME_MAP[mode];
  return MODE_POKEMON_NAME_MAP[id];
}

// These are the exact same function -_-
function getPokemonName(pokemonId = 0, mode = GAMEDATA2) {
  const MODE_POKEMON_NAME_MAP = POKEMON_NAME_MAP[mode];
  return MODE_POKEMON_NAME_MAP[pokemonId];
}

function getPokemonIdFromName(name = 'Egg', mode = GAMEDATA2) {
  const MODE_POKEMON_NAME_MAP = POKEMON_NAME_MAP[mode];
  const id = Object.values(MODE_POKEMON_NAME_MAP).findIndex((e) => e === name);
  return id === -1 ? 0 : id;
}

function getFormNameOfProblematicPokemon(id = 0, mode = GAMEDATA2) {
  if (mode === GAMEDATA2) {
    switch (id) {
      case 1242:
        return 'Ash-Greninja';
      case 1285:
        return 'Meowstic-F';
      case 1310:
        return 'Rockruff Own-Tempo';
      case 1441:
        return 'Indeedee-F';
      case 1454:
        return 'Basculegion-F';
      case 1456:
        return 'Oinkologne-F';
      default:
        throw Error(`Bad 2.0 Pokemon ID in PokemonNameMap: ${id}`);
    }
  } else if (mode === GAMEDATA3) {
    switch (id) {
      case 1266:
        return 'Ash-Greninja';
      case 1309:
        return 'Meowstic-F';
      case 1335:
        return 'Rockruff Own-Tempo';
      case 1466:
        return 'Indeedee-F';
      case 1481:
        return 'Basculegion-F';
      case 1483:
        return 'Oinkologne-F';
      default:
        throw Error(`Bad 3.0 Pokemon ID in PokemonNameMap: ${id}`);
    }
  } else if (mode === GAMEDATAV) {
    return;
  } else {
    throw Error(`Bad Mode passed to getFormNameOfProblematicPokemon: ${mode}`)
  }
}

function getPokemonMonsnoFromName(pokemonName, mode = GAMEDATA2) {
  if (!pokemonName) return -1;
  const ModeBasePokemonNames = BasePokemonNames[mode];
  return ModeBasePokemonNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === pokemonName);
}

function getPokemonNames(to, from = 0, mode = GAMEDATA2) {
  if (typeof to !== 'number' || to < 0) return [];
  const MODE_POKEMON_NAME_MAP = POKEMON_NAME_MAP[mode];
  return Object.values(MODE_POKEMON_NAME_MAP).slice(from, to);
}

function getPokemonFormId(monsno = 0, id, mode = GAMEDATA2) {
  const MODE_FORM_MAP = FORM_MAP[mode];
  return MODE_FORM_MAP[monsno]?.findIndex((e) => e === id) ?? -1;
}

function normalizePokemonName(value, mode = GAMEDATA2) {
  if (!value) return '';

  const cacheKey = `${mode}:${value}`;
  if (normalizeCache.has(cacheKey)) return normalizeCache.get(cacheKey);

  // --- 1. Replace special symbols efficiently ---
  let cleaned = value.replace(RE_SPECIAL, m => {
    switch (m) {
      case '!': return 'emark';
      case '?': return 'qmark';
      case '♀': return '-f';
      case '♂': return '-m';
      default: return ''; // remove other non-word chars
    }
  });

  // --- 2. Normalize only if non-ASCII characters are found ---
  if (RE_ASCII_CHECK.test(cleaned)) {
    cleaned = cleaned.normalize('NFKD').replace(/[^\w\s-]/g, '');
  }

  cleaned = cleaned.trim().toLowerCase();

  if (START_REGEX) {
    cleaned = cleaned.replace(START_REGEX, (m) => {
      // we compiled START_MAP with lowercase keys, and cleaned is lowercase, so lookup succeeds
      return START_MAP[m] ?? m;
    });
  }

  if (END_REGEX) {
    // END_REGEX captures the suffix as group 1; but because we used a group,
    // replace callback receives the full match as first arg and group as second.
    cleaned = cleaned.replace(END_REGEX, (fullMatch, group1) => {
      const key = group1.toLowerCase();
      // return replacement (could be empty string) - we preserve any leading separator from fullMatch if needed
      return END_MAP[key] ?? '';
    });
  }

  // --- 3. Early return for common mode ---
  if (mode === GAMEDATA2) {
    const result = cleaned.replace(RE_MULTI_SEP, '-');
    normalizeCache.set(cacheKey, result);
    return result;
  }

  // --- 4. Handle name reordering and special suffix/prefix cases ---
  if (RE_SPACE_OR_HYPHEN.test(cleaned)) {
    // Replace known bad prefixes/suffixes using precompiled regex
    cleaned = cleaned.replace(START_REGEX, m => START_OF_LINE_FORMS[m]);
    cleaned = cleaned.replace(END_REGEX, m => END_OF_LINE_FORMS[m]);

    // Extract last word efficiently
    const lastSpace = cleaned.lastIndexOf(' ');
    const lastWord = lastSpace === -1 ? cleaned : cleaned.slice(lastSpace + 1);

    // Handle reverse-order names like "Mega" or "Gigantamax"
    if (REVERSE_ORDER_ARRAY.includes(lastWord) || lastWord === 'genesect') {
      const before = cleaned.slice(0, lastSpace).replace(RE_MULTI_SEP, '-');
      cleaned = `${before}-${lastWord}`;
    }
  }

  // --- 5. Final normalization for separators ---
  const result = cleaned.replace(RE_MULTI_SEP, '-');
  normalizeCache.set(cacheKey, result);
  return result;
}

function getPokemonMonsNoAndFormNoFromPokemonId(pokemonId = 0, mode = GAMEDATA2) {
  const ModePersonalTable = PersonalTable[mode];
  const MODE_FORM_MAP = FORM_MAP[mode];

	const { monsno } = ModePersonalTable.Personal[pokemonId];
	const formno = MODE_FORM_MAP[monsno].indexOf(pokemonId);
	return [monsno, formno];
}

module.exports = {
  getPokemonMonsnoFromName,
  getFormName,
  getFormNameOfProblematicPokemon,
  getPokemonName,
  getPokemonIdFromName,
  getPokemonNames,
  getPokemonFormId,
  createPokemonMap,
  POKEMON_NAME_MAP,
  normalizePokemonName,
  getPokemonMonsNoAndFormNoFromPokemonId
};
