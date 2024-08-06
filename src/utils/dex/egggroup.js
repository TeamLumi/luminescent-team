import { PersonalTable, GAMEDATA2, GAMEDATA3 } from '../../../__gamedata';

const EGG_GROUPS = {
  0: 'None',
  1: 'Monster',
  2: 'Water 1',
  3: 'Bug',
  4: 'Flying',
  5: 'Field',
  6: 'Fairy',
  7: 'Grass',
  8: 'Human-Like',
  9: 'Water 3',
  10: 'Mineral',
  11: 'Amorphous',
  12: 'Water 2',
  13: 'Ditto',
  14: 'Dragon',
  15: 'No Eggs',
};

const POKEMON_IDS_BY_EGG_GROUP = PersonalTable[GAMEDATA2].Personal.reduce((pokemonMap, currentPokemon) => {
  return createPokemonByEggGroupMap(pokemonMap, currentPokemon);
}, {});
const POKEMON_IDS_BY_EGG_GROUP3 = PersonalTable[GAMEDATA3].Personal.reduce((pokemonMap, currentPokemon) => {
  return createPokemonByEggGroupMap(pokemonMap, currentPokemon);
}, {});
const HIGHEST_EGG_GROUP_ID = 15;

function getEggGroupViaPokemonId(pokemonId = 0, mode = GAMEDATA2) {
  const ModePersonalTable = PersonalTable[mode];
  if (!Number.isInteger(pokemonId) || pokemonId < 0 || pokemonId > ModePersonalTable.Personal.length)
    throw new Error(`Bad pokemonId: ${pokemonId}`);

  const pokemonDetails = ModePersonalTable.Personal[pokemonId];
  const eggGroup1 = pokemonDetails.egg_group1;
  const eggGroup2 = pokemonDetails.egg_group2;
  return eggGroup1 === eggGroup2 ? [eggGroup1] : [eggGroup1, eggGroup2];
}

function getEggGroupNameById(eggGroupId = 0) {
  if (!Number.isInteger(eggGroupId) || eggGroupId < 0 || eggGroupId > HIGHEST_EGG_GROUP_ID)
    throw new Error(`Bad eggGroupId: ${eggGroupId}`);
  return EGG_GROUPS[eggGroupId];
}

function createPokemonByEggGroupMap(pokemonMap, currentPokemon) {
  //Use sets so I don't have to handle duplicates, looking at you Unown
  if (pokemonMap[currentPokemon.egg_group1] === undefined) {
    pokemonMap[currentPokemon.egg_group1] = new Set();
  }

  if (pokemonMap[currentPokemon.egg_group2] === undefined) {
    pokemonMap[currentPokemon.egg_group2] = new Set();
  }

  pokemonMap[currentPokemon.egg_group1].add(currentPokemon.id);
  pokemonMap[currentPokemon.egg_group2].add(currentPokemon.id);
  return pokemonMap;
}

function getPokemonIdsInEggGroup(eggGroupId = 0, mode = GAMEDATA2) {
  if (!Number.isInteger(eggGroupId) || eggGroupId < 0 || eggGroupId > HIGHEST_EGG_GROUP_ID)
    throw new Error(`Bad eggGroupId: ${eggGroupId}`);
  const PokemonByEggGroups = mode === GAMEDATA2 ? POKEMON_IDS_BY_EGG_GROUP : POKEMON_IDS_BY_EGG_GROUP3
  return Array.from(PokemonByEggGroups[eggGroupId]); //Back to array for easier handling
}

export { getPokemonIdsInEggGroup, getEggGroupNameById, getEggGroupViaPokemonId };
