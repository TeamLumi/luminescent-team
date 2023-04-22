const { PersonalTable, basePokemonNames, formPokemonNames } = require('../../../__gamedata');

const POKEMON_NAME_MAP = PersonalTable.Personal.reduce((pokemonNameMap, currentPokemon) => {
  try {
    const { id } = currentPokemon;

    const baseFormname = basePokemonNames.labelDataArray[id]?.wordDataArray[0]?.str;
    if (typeof baseFormname === 'string' && baseFormname.length > 0) {
      pokemonNameMap[id] = baseFormname;
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
}, {});

function getFormName(id = 0) {
  return POKEMON_NAME_MAP[id];
}

function getPokemonName(pokemonId = 0) {
  return POKEMON_NAME_MAP[pokemonId];
}

function getFormNameOfProblematicPokemon(id = 0) {
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
      throw Error(`Bad Pokemon ID in PokemonNameMap: ${id}`);
  }
}

function getPokemonMonsNoFromName(pokemonName) {
  if (!pokemonName) return -1;
  return basePokemonNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === pokemonName);
}

export { getPokemonMonsNoFromName, getFormName, getFormNameOfProblematicPokemon, getPokemonName };
