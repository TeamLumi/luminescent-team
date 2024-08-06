const { PersonalTable, BasePokemonNames, FormPokemonNames, GAMEDATA2, GAMEDATA3 } = require('../../../__gamedata');
const { START_OF_LINE_FORMS, END_OF_LINE_FORMS, REVERSE_ORDER_ARRAY } = require('./nameConstants')
const { FORM_MAP } = require('./functions');

const POKEMON_NAME_MAP2 = PersonalTable[GAMEDATA2].Personal.reduce((pokemonNameMap, currentPokemon) => {
  return createPokemonMap(pokemonNameMap, currentPokemon, GAMEDATA2);
}, {});
const POKEMON_NAME_MAP3 = PersonalTable[GAMEDATA3].Personal.reduce((pokemonNameMap, currentPokemon) => {
  return createPokemonMap(pokemonNameMap, currentPokemon, GAMEDATA3);
}, {});

const POKEMON_NAME_MAP = {
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
    const baseFormAltName = ModeFormPokemonNames.labelDataArray[monsNo]?.wordDataArray[0]?.str;
    const pokemonName =
      baseFormAltName.length > 0 && !baseFormName.includes(baseFormAltName)
        ? `${baseFormName} ${baseFormAltName}`
        : baseFormName;
        
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
  // Converts to lowercase, removes non-word characters,
  // converts spaces to hyphens, and strips leading/trailing whitespace.
  let initialValue = value;
  value = value.replace(/[!]/g, 'emark')
    .replace(/[?]/g, 'qmark')
    .replace(/[♀]/g, '-f')
    .replace(/[♂]/g, '-m')
  value = value.normalize('NFKD').replace(/[^\w\s-]/g, '').trim().toLowerCase();

  if (mode === GAMEDATA2 ) {
    return value.replace(/[-\s]+/g, '-');
  }

  if (value.includes(' ') || value.includes('-')) {
    // Split the string at the last space
    for (const badValue in START_OF_LINE_FORMS) {
      if (value.includes(badValue)) {
        value = value.replace(badValue, START_OF_LINE_FORMS[badValue]);
      }
    }

    const lastWord = value.split(' ').pop();
    for (const badEndValue in END_OF_LINE_FORMS) {
      if (lastWord === badEndValue) {
        value = value.replace(` ${badEndValue}`, END_OF_LINE_FORMS[badEndValue]);
      }
    }

    const parts = value.split(' ').reverse();

    // Check if the first part is "Mega" or "Gigantamax"
    if (REVERSE_ORDER_ARRAY.includes(parts[0]) || lastWord === 'genesect') {
      // Rearrange string and join with hyphen
      value = [parts[1], parts[0]].join('-');
      return value;
    }
  }

  return value.replace(/[-\s]+/g, '-');
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
