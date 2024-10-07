import { PersonalTable, PokedexInfo, GAMEDATA2, GAMEDATA3, GAMEDATAV } from '../../../__gamedata';

//BDSP does not stick to the same structure when working with forms, thus this map is necessary.
const FORM_MAP = {
  [GAMEDATAV]: PersonalTable[GAMEDATAV].Personal.reduce(createFormMap, {}),
  [GAMEDATA2]: PersonalTable[GAMEDATA2].Personal.reduce(createFormMap, {}),
  [GAMEDATA3]: PersonalTable[GAMEDATA3].Personal.reduce(createFormMap, {})
};

function createFormMap(formMap, currentPokemon) {
  if (!Array.isArray(formMap[currentPokemon.monsno])) {
    formMap[currentPokemon.monsno] = [];
  }

  formMap[currentPokemon.monsno].push(currentPokemon.id);
  return formMap;
}

function getPokemonIdFromFormMap(monsNo = 0, formNo = 0, mode = GAMEDATA2) {
  const ModeFormMap = FORM_MAP[mode]
  return ModeFormMap[monsNo]?.[formNo] ?? undefined;
}

const getPokemonFormIndexById = (monsno, id, mode = GAMEDATA2) => {
  const ModeFormMap = FORM_MAP[mode]
  return ModeFormMap[monsno].findIndex((pokemonId) => pokemonId === id);
};

const getPokemonFormIds = (monsno, mode = GAMEDATA2) => {
  const ModeFormMap = FORM_MAP[mode]
  return ModeFormMap[monsno];
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
  return `/img/pkm/pm${paddedMonsno}_${paddedFormIndex}_00_00_L.webp`;
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

function getPokemonIdFromMonsNoAndForm(monsno, formno, mode = GAMEDATA2) {
  const ModePersonalTable = PersonalTable[mode];
  const ModeFormMap = FORM_MAP[mode];
  return ModePersonalTable.Personal.find((e) => e.monsno === monsno && ModeFormMap[e.monsno][formno] === e.id)?.id;
}

function isValidPokemon(pokemonId, mode = GAMEDATA2) {
  const ModePersonalTable = PersonalTable[mode];
  const p = ModePersonalTable.Personal[pokemonId];
  return p.valid_flag;
}

function doNothing(evoMethod, evolutionDetails) {
  return [evolutionDetails, evoMethod];
};

function getDexDescription(pokemonId, mode = GAMEDATA2) {
  const ModePokedexInfo = PokedexInfo[mode];
  const labelData = ModePokedexInfo.labelDataArray[pokemonId]
  const combinedStr = labelData.wordDataArray.map(data => data.str).join(' ');
  return combinedStr
}

export {
  FORM_MAP,
  getPokemonIdFromFormMap,
  getPokemonFormIndexById,
  getGender,
  getGrassKnotPower,
  getImage,
  formatBaseStats,
  getPokemonIdFromMonsNoAndForm,
  createFormMap,
  isValidPokemon,
  doNothing,
  getDexDescription,
};
