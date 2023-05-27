import { PersonalTable } from './data';

//BDSP does not stick to the same structure when working with forms, thus this map is necessary.
const FORM_MAP = PersonalTable.Personal.reduce(createFormMap, {});

function createFormMap(formMap, currentPokemon) {
  if (!Array.isArray(formMap[currentPokemon.monsno])) {
    formMap[currentPokemon.monsno] = [];
  }

  formMap[currentPokemon.monsno].push(currentPokemon.id);
  return formMap;
}

function getPokemonIdFromFormMap(monsNo = 0, formNo = 0) {
  return FORM_MAP[monsNo]?.[formNo] ?? undefined;
}

function getGender(sex) {
  if (sex === 0) return 'M';
  if (sex === 254) return 'F';
  if (sex === 255) return 'N';
  return null;
}

function getImage(monsno = 0, formIndex = 0) {
  const paddedMonsno = monsno.toString().padStart(4, 0);
  const paddedFormIndex = formIndex.toString().padStart(2, 0);
  return `/img/pm${paddedMonsno}_${paddedFormIndex}_00_00_L.webp`;
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

function getPokemonIdFromMonsNoAndForm(monsno, formno) {
  return PersonalTable.Personal.find((e) => e.monsno === monsno && FORM_MAP[e.monsno][formno] === e.id)?.id;
}

export {
  FORM_MAP,
  getPokemonIdFromFormMap,
  getGender,
  getGrassKnotPower,
  getImage,
  formatBaseStats,
  getPokemonIdFromMonsNoAndForm,
  createFormMap,
};
