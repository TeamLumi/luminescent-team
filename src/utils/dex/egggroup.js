import { PersonalTable } from '../../../__gamedata';

const EGG_GROUPS = [
  'None',
  'Monster',
  'Water 1',
  'Bug',
  'Flying',
  'Field',
  'Fairy',
  'Grass',
  'Human-Like',
  'Water 3',
  'Mineral',
  'Amorphous',
  'Water 2',
  'Ditto',
  'Dragon',
  'No Eggs',
];

const POKEMON_BY_EGG_GROUP = PersonalTable.Personal.reduce(createPokemonByEggGroupMap, []);
const HIGHEST_EGG_GROUP_ID = 15;

function getEggGroupViaPokemonId(pokemonId = 0) {
  if (!Number.isInteger(pokemonId) || pokemonId < 0 || pokemonId > PersonalTable.Personal.length)
    throw new Error(`Bad pokemonId: ${pokemonId}`);

  const pokemonDetails = PersonalTable.Personal[pokemonId];
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

function getPokemonInEggGroup(eggGroupId = 0) {
  if (!Number.isInteger(eggGroupId) || eggGroupId < 0 || eggGroupId > HIGHEST_EGG_GROUP_ID)
    throw new Error(`Bad eggGroupId: ${eggGroupId}`);
  return Array.from(POKEMON_BY_EGG_GROUP[eggGroupId]); //Back to array for easier handling
}

export { getPokemonInEggGroup, getEggGroupNameById, getEggGroupViaPokemonId };
