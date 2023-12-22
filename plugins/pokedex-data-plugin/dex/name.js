const { PersonalTable, basePokemonNames, formPokemonNames } = require('./data');
const { PersonalTable3, basePokemonNames3, formPokemonNames3 } = require('./data3');
const { FORM_MAP, FORM_MAP3 } = require('./functions');

const POKEMON_NAME_MAP = PersonalTable.Personal.reduce(createPokemonMap, {});
const POKEMON_NAME_MAP3 = PersonalTable3.Personal.reduce(createPokemonMap, {}, "3.0");
function createPokemonMap(pokemonNameMap, currentPokemon, mode = "2.0") {
  const baseMonNames = mode === "2.0" ? basePokemonNames : basePokemonNames3;
  const formMonNames = mode === "2.0" ? formPokemonNames : formPokemonNames3;

  try {
    const { id } = currentPokemon;

    const baseFormName = baseMonNames.labelDataArray[id]?.wordDataArray[0]?.str;
    if (typeof baseFormName === 'string' && baseFormName.length > 0) {
      pokemonNameMap[id] = baseFormName;
      return pokemonNameMap;
    }

    const alternateFormName = formMonNames.labelDataArray[id]?.wordDataArray[0]?.str;
    if (typeof alternateFormName === 'string' && alternateFormName.length > 0) {
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

function normalizePokemonName(name) {
  return name.toLowerCase().replace(/\s+/g, '').replaceAll("'", '');
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
