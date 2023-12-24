const { PersonalTable, pokemonPokedexInfo } = require('./data');
const { PersonalTable3, pokemonPokedexInfo3 } = require('./data3');

//BDSP does not stick to the same structure when working with forms, thus this map is necessary.
const FORM_MAP = PersonalTable.Personal.reduce(createFormMap, {});
const FORM_MAP3 = PersonalTable3.Personal.reduce(createFormMap, {});

function createFormMap(formMap, currentPokemon) {
  if (!Array.isArray(formMap[currentPokemon.monsno])) {
    formMap[currentPokemon.monsno] = [];
  }

  formMap[currentPokemon.monsno].push(currentPokemon.id);
  return formMap;
}

function getPokemonIdFromFormMap(monsNo = 0, formNo = 0, mode = "2.0") {
  const formMap = mode === "2.0" ? FORM_MAP : FORM_MAP3
  return formMap[monsNo]?.[formNo] ?? undefined;
}

const getPokemonFormIndexById = (monsno, id, mode = "2.0") => {
  const formMap = mode === "2.0" ? FORM_MAP : FORM_MAP3
  return formMap[monsno].findIndex((pokemonId) => pokemonId === id);
};

const getPokemonFormIds = (monsno, mode = "2.0") => {
  const formMap = mode === "2.0" ? FORM_MAP : FORM_MAP3
  return formMap[monsno];
};

function getGender(sex) {
  if (sex === 0) return 'M';
  if (sex === 254) return 'F';
  if (sex === 255) return 'N';
  return null;
}

function getImage(monsno = 0, formIndex = 0) {
  const paddedMonsno = monsno.toString().padStart(4, 0);
  const paddedFormIndex = formIndex.toString().padStart(2, 0);
  return `pm${paddedMonsno}_${paddedFormIndex}_00_00_L.webp`;
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

function getPokemonIdFromMonsNoAndForm(monsno, formno, mode = "2.0") {
  const personalTable = mode === "2.0" ? PersonalTable : PersonalTable3;
  const form_map = mode === "2.0" ? FORM_MAP : FORM_MAP3;
  return personalTable.Personal.find((e) => e.monsno === monsno && form_map[e.monsno][formno] === e.id)?.id;
}

function doNothing(evoMethod, evolutionDetails) {
  return [evolutionDetails, evoMethod];
};

function getDexDescription(pokemonId, mode = "2.0") {
  const PokedexInfo = mode === "2.0" ? pokemonPokedexInfo : pokemonPokedexInfo3;
  const labelData = PokedexInfo.labelDataArray[pokemonId]
  const combinedStr = labelData.wordDataArray.map(data => data.str).join(' ');
  return combinedStr
}

module.exports = {
  FORM_MAP,
  FORM_MAP3,
  getPokemonIdFromFormMap,
  getGender,
  getGrassKnotPower,
  getImage,
  formatBaseStats,
  getPokemonIdFromMonsNoAndForm,
  createFormMap,
  getPokemonFormIndexById,
  getPokemonFormIds,
  getDexDescription,
  doNothing,
};
