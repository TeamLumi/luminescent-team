import { PersonalTable, basePokemonNames, formPokemonNames } from '../../../__3.0gamedata';
import { FORM_MAP } from './functions';

const POKEMON_NAME_MAP = PersonalTable.Personal.reduce(createPokemonMap, {});
const POKEMON_NAME_LIST = Object.values(POKEMON_NAME_MAP);
function createPokemonMap(pokemonNameMap, currentPokemon) {
  try {
    const { id } = currentPokemon;

    const baseFormName = basePokemonNames.labelDataArray[id]?.wordDataArray[0]?.str;
    if (typeof baseFormName === 'string' && baseFormName.length > 0) {
      pokemonNameMap[id] = baseFormName;
      return pokemonNameMap;
    }

    const alternateFormName = formPokemonNames.labelDataArray[id]?.wordDataArray[0]?.str;
    if (typeof alternateFormName === 'string' && alternateFormName.length > 0) {
      pokemonNameMap[id] = alternateFormName;
      return pokemonNameMap;
    }

    pokemonNameMap[id] = getFormNameOfProblematicPokemon(id);
    return pokemonNameMap;
  } catch (e) {
    throw Error(`${currentPokemon.id} - ${e}`);
  }
}

function getFormName(id = 0) {
  return POKEMON_NAME_MAP[id];
}

function getPokemonName(pokemonId = 0) {
  return POKEMON_NAME_MAP[pokemonId];
}

function getPokemonIdFromName(name = 'Egg') {
  const id = Object.values(POKEMON_NAME_MAP).findIndex((e) => e === name);
  return id === -1 ? 0 : id;
}

function getFormNameOfProblematicPokemon(id = 0, mode = "2.0") {
  if (mode === "3.0") {
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
  }
}

function getPokemonMonsnoFromName(pokemonName) {
  if (!pokemonName) return -1;
  return basePokemonNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === pokemonName);
}

function getPokemonNames(to, from = 0) {
  if (typeof to !== 'number' || to < 0) return [];
  return POKEMON_NAME_LIST.slice(from, to);
}

function getPokemonFormId(monsno = 0, id) {
  return FORM_MAP[monsno]?.findIndex((e) => e === id) ?? -1;
}

function getPokemonMonsNoAndFormNoFromPokemonId(pokemonId = 0) {
	const { monsno } = PersonalTable.Personal[pokemonId];
	const formno = FORM_MAP[monsno].indexOf(pokemonId);
	return [monsno, formno];
}

export {
  getPokemonMonsnoFromName,
  getFormName,
  getFormNameOfProblematicPokemon,
  getPokemonName,
  getPokemonIdFromName,
  getPokemonNames,
  getPokemonFormId,
  createPokemonMap,
  POKEMON_NAME_MAP,
  getPokemonMonsNoAndFormNoFromPokemonId
};
