import { PersonalTable, formPokemonNames, basePokemonNames } from '../utils/dex/data';
import { PersonalTable3, formPokemonNames3, basePokemonNames3 } from '../utils/dex/data3';

const UNKNOWN_POKEMON_FORM_NAME = 'Egg';

export const POKEMON_FORM_ID_MAP = PersonalTable.Personal.reduce((formMap, pokemon) => {
  if (!Array.isArray(formMap[pokemon.monsno])) {
    formMap[pokemon.monsno] = [];
  }

  const pokemonData = basePokemonNames.labelDataArray[pokemon.id] ?? formPokemonNames.labelDataArray[pokemon.id];
  const formName = pokemonData?.wordDataArray[0]?.str || UNKNOWN_POKEMON_FORM_NAME;
  formMap[pokemon.monsno].push({ pokemonId: pokemon.id, formName: formName });

  return formMap;
}, {});

export const POKEMON_FORM_ID_MAP3 = PersonalTable3.Personal.reduce((formMap, pokemon) => {
  if (!Array.isArray(formMap[pokemon.monsno])) {
    formMap[pokemon.monsno] = [];
  }

  const pokemonData = basePokemonNames3.labelDataArray[pokemon.id] ?? formPokemonNames3.labelDataArray[pokemon.id];
  const formName = pokemonData?.wordDataArray[0]?.str || UNKNOWN_POKEMON_FORM_NAME;
  formMap[pokemon.monsno].push({ pokemonId: pokemon.id, formName: formName });

  return formMap;
}, {});

export const getPokemonFormIndexById = (monsno, id, mode = "2.0") => {
  const form_id_map = mode === "2.0" ? POKEMON_FORM_ID_MAP : POKEMON_FORM_ID_MAP3
  return form_id_map[monsno].findIndex((pokemonForm) => pokemonForm.pokemonId === id);
};

export const getPokemonImageFilename = (monsno, formIndex = 0) => {
  const paddedMonsno = monsno.toString().padStart(4, 0);
  const paddedFormIndex = formIndex.toString().padStart(2, 0);
  return `pm${paddedMonsno}_${paddedFormIndex}_00_00_L.webp`;
};
