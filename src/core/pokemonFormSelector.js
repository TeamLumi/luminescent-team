import {
  GAMEDATA2,
  GAMEDATA3,
  PersonalTable,
  FormPokemonNames,
  BasePokemonNames
} from '../../__gamedata';

const UNKNOWN_POKEMON_FORM_NAME = 'Egg';

export const POKEMON_FORM_ID_MAP = PersonalTable[GAMEDATA2].Personal.reduce((formMap, pokemon) => {
  return createPokemonFormIdMap(formMap, pokemon, GAMEDATA2);
}, {});

export const POKEMON_FORM_ID_MAP3 = PersonalTable[GAMEDATA3].Personal.reduce((formMap, pokemon) => {
  return createPokemonFormIdMap(formMap, pokemon, GAMEDATA3);
}, {});

function createPokemonFormIdMap(formMap, pokemon, mode = GAMEDATA2) {
  if (!Array.isArray(formMap[pokemon.monsno])) {
    formMap[pokemon.monsno] = [];
  }
  const ModeBasePokemonNames = BasePokemonNames[mode];
  const ModeFormPokemonNames = FormPokemonNames[mode];

  const pokemonData = ModeBasePokemonNames.labelDataArray[pokemon.id] ?? ModeFormPokemonNames.labelDataArray[pokemon.id];
  const formName = pokemonData?.wordDataArray[0]?.str || UNKNOWN_POKEMON_FORM_NAME;
  formMap[pokemon.monsno].push({ pokemonId: pokemon.id, formName: formName });

  return formMap;
}

export const getPokemonFormIndexById = (monsno, id, mode = GAMEDATA2) => {
  const form_id_map = mode === GAMEDATA2 ? POKEMON_FORM_ID_MAP : POKEMON_FORM_ID_MAP3
  return form_id_map[monsno].findIndex((pokemonForm) => pokemonForm.pokemonId === id);
};

export const getPokemonImageFilename = (monsno, formIndex = 0) => {
  const paddedMonsno = monsno.toString().padStart(4, 0);
  const paddedFormIndex = formIndex.toString().padStart(2, 0);
  return `pm${paddedMonsno}_${paddedFormIndex}_00_00_L.webp`;
};
