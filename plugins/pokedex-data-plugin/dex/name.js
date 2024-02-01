const { PersonalTable, basePokemonNames, formPokemonNames } = require('./data');
const { PersonalTable3, basePokemonNames3, formPokemonNames3 } = require('./data3');
const { START_OF_LINE_FORMS, END_OF_LINE_FORMS, REVERSE_ORDER_ARRAY } = require('./nameConstants')
const { FORM_MAP, FORM_MAP3 } = require('./functions');

const POKEMON_NAME_MAP = PersonalTable.Personal.reduce((pokemonNameMap, currentPokemon) => {
  return createPokemonMap(pokemonNameMap, currentPokemon, "2.0");
}, {});
const POKEMON_NAME_MAP3 = PersonalTable3.Personal.reduce((pokemonNameMap, currentPokemon) => {
  return createPokemonMap(pokemonNameMap, currentPokemon, "3.0");
}, {});

function createPokemonMap(pokemonNameMap, currentPokemon, mode = "2.0") {
  const baseMonNames = mode === "2.0" ? basePokemonNames : basePokemonNames3;
  const formMonNames = mode === "2.0" ? formPokemonNames : formPokemonNames3;

  try {
    const { id } = currentPokemon;
    if (id < baseMonNames.labelDataArray.length) {
      const baseFormName = baseMonNames.labelDataArray[id]?.wordDataArray[0]?.str;
      const baseFormAltName = formMonNames.labelDataArray[id]?.wordDataArray[0]?.str;
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
    const baseFormName = baseMonNames.labelDataArray[monsNo]?.wordDataArray[0]?.str;
    const baseFormAltName = formMonNames.labelDataArray[monsNo]?.wordDataArray[0]?.str;
    const pokemonName =
      baseFormAltName.length > 0 && !baseFormName.includes(baseFormAltName)
        ? `${baseFormName} ${baseFormAltName}`
        : baseFormName;
        
        const alternateFormName = formMonNames.labelDataArray[id]?.wordDataArray[0]?.str;
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

function getFormName(id = 0, mode = "2.0") {
  return mode === "2.0" ? POKEMON_NAME_MAP[id] : POKEMON_NAME_MAP3[id];
}

function getPokemonName(pokemonId = 0, mode = "2.0") {
  return mode === "2.0" ? POKEMON_NAME_MAP[pokemonId] : POKEMON_NAME_MAP3[pokemonId];
}

function getPokemonIdFromName(name = 'Egg', mode = "2.0") {
  const pokemon_name_map = mode === "2.0" ? POKEMON_NAME_MAP : POKEMON_NAME_MAP3;
  const id = Object.values(pokemon_name_map).findIndex((e) => e === name);
  return id === -1 ? 0 : id;
}

function getFormNameOfProblematicPokemon(id = 0, mode = "2.0") {
  if (mode === "2.0") {
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
  } else {
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
  }
}

function getPokemonMonsnoFromName(pokemonName, mode = "2.0") {
  if (!pokemonName) return -1;
  const baseMonNames = mode === "2.0" ? basePokemonNames : basePokemonNames3;
  return baseMonNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === pokemonName);
}

function getPokemonNames(to, from = 0, mode = "2.0") {
  if (typeof to !== 'number' || to < 0) return [];
  const pokemon_name_map = mode === "2.0" ? POKEMON_NAME_MAP : POKEMON_NAME_MAP3;
  return Object.values(pokemon_name_map).slice(from, to);
}

function getPokemonFormId(monsno = 0, id, mode = "2.0") {
  const form_map = mode === "2.0" ? FORM_MAP : FORM_MAP3;
  return form_map[monsno]?.findIndex((e) => e === id) ?? -1;
}

function normalizePokemonName(value, mode = "2.0") {
  // Converts to lowercase, removes non-word characters,
  // converts spaces to hyphens, and strips leading/trailing whitespace.
  let initialValue = value;
  value = value.replace(/[!]/g, 'emark')
    .replace(/[?]/g, 'qmark')
    .replace(/[♀]/g, '-f')
    .replace(/[♂]/g, '-m')
  value = value.normalize('NFKD').replace(/[^\w\s-]/g, '').trim().toLowerCase();

  if (mode === "2.0" ) {
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

function getPokemonMonsNoAndFormNoFromPokemonId(pokemonId = 0, mode = "2.0") {
  const personalTable = mode === "2.0" ? PersonalTable : PersonalTable3;
  const form_map = mode === "2.0" ? FORM_MAP : FORM_MAP3;

	const { monsno } = personalTable.Personal[pokemonId];
	const formno = form_map[monsno].indexOf(pokemonId);
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
  POKEMON_NAME_MAP3,
  normalizePokemonName,
  getPokemonMonsNoAndFormNoFromPokemonId
};
