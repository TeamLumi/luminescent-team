import { PersonalTable, formPokemonNames, basePokemonNames } from '../../../__gamedata';

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

export const getPokemonImageFilename = (monsno, formIndex) => {
  const paddedMonsno = monsno.toString().padStart(4, 0);
  const paddedFormIndex = formIndex.toString().padStart(2, 0);
  return `pm${paddedMonsno}_${paddedFormIndex}_00_00_L.webp`;
};
