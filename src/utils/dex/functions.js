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

function parseTmLearnsetSection(decimal) {
  return (decimal >>> 0).toString(2).split('').reverse().join('').padStart(32, 0);
}

function getImage(monsno = 0) {
  return `/img/pm${monsno.toString().padStart(4, 0) ?? '0000'}_00_00_00_L.webp`;
}

function formatBaseStats(p) {
  return `HP: ${p.basic_hp} / ATK: ${p.basic_atk} / DEF: ${p.basic_def} / SPA: ${p.basic_spatk} / SPD: ${p.basic_spdef} / SPE: ${p.basic_agi}`;
}

function getGrassKnotPower(weightkg) {
  if (weightkg >= 200) return 120;
  if (weightkg >= 100) return 100;
  if (weightkg >= 50) return 80;
  if (weightkg >= 25) return 60;
  if (weightkg >= 10) return 40;
  return 20;
}

export { FORM_MAP, getPokemonIdFromFormMap, getGender };
