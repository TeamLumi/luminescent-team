const { PersonalTable } = require('../../../__gamedata');

//BDSP does not stick to the same structure when working with forms, thus this map is necessary.
const FORM_MAP = PersonalTable.Personal.reduce((formMap, currentPokemon) => {
  if (!Array.isArray(formMap[currentPokemon.monsno])) {
    formMap[currentPokemon.monsno] = [];
  }

  formMap[currentPokemon.monsno].push(currentPokemon.id);
  return formMap;
}, {});

function getPokemonIdFromFormMap(monsNo = 0, formNo = 0) {
  return FORM_MAP[monsNo][formNo];
}

function getGender(sex) {
  if (sex === 0) return 'M';
  if (sex === 254) return 'F';
  if (sex === 255) return 'N';
  return null;
}

export { FORM_MAP, getPokemonIdFromFormMap, getGender };
