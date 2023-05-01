const { makeSmogonAbilityObject, getAbilityIdFromAbilityName, getAbilityString, getAbilityInfo } = require('./ability');
const { getItemIdFromItemName, getItemString } = require('./item');
const {
  generateMovesViaLearnset,
  getMoveId,
  getMoveString,
  isMoveNameSmogonCompatible,
  getEggMoves,
  getTechMachineLearnset,
  getMoveProperties,
  getPokemonLearnset,
  parseTmLearnsetSection,
} = require('./moves');
const {
  getPokemonMonsnoFromName,
  getFormName,
  getFormNameOfProblematicPokemon,
  getPokemonName,
  getPokemonIdFromName,
  getPokemonNames,
  getPokemonFormId,
} = require('./name');
const { getNatureId, getNatureName } = require('./nature');
const { getTypeName, getTypes } = require('./types');
const { getWeight, getHeight } = require('./details');

const {
  FORM_MAP,
  getPokemonIdFromFormMap,
  getGender,
  getGrassKnotPower,
  getImage,
  formatBaseStats,
  getPokemonIdFromMonsNoAndForm,
} = require('./functions');

const PersonalTable = require('../../../__gamedata/PersonalTable.json');

const POKEMON_MOVE_LEVEL_TYPE = {
  EGG: 'egg',
  TM: 'tm',
};

function getPokemonInfo(monsno = 0) {
  const p = PersonalTable.Personal[monsno];
  return {
    monsno: monsno,
    name: getPokemonName(monsno),
    ability1: getAbilityString(p.tokusei1),
    ability2: getAbilityString(p.tokusei2),
    abilityH: getAbilityString(p.tokusei3),
    tmLearnset: getTechMachineLearnset(p.machine1, p.machine2, p.machine3, p.machine4),
    prettyBaseStats: formatBaseStats(p),
    baseStats: {
      hp: p.basic_hp,
      atk: p.basic_atk,
      def: p.basic_def,
      spa: p.basic_spatk,
      spd: p.basic_spdef,
      spe: p.basic_agi,
    },
    baseStatsTotal: p.basic_hp + p.basic_atk + p.basic_def + p.basic_spatk + p.basic_spdef + p.basic_agi,
    weight: getWeight(monsno),
    height: getHeight(monsno),
    grassKnotPower: getGrassKnotPower(getWeight(monsno)),
    type1: getTypeName(p.type1),
    type2: getTypeName(p.type2),
    imageSrc: getImage(monsno),
    genderDecimalValue: p.sex,
  };
}

module.exports = {
  getPokemonInfo,
};

// module.exports ={
//   FORM_MAP,
//   getPokemonIdFromFormMap,
//   getGender,
//   getGrassKnotPower,
//   getImage,
//   formatBaseStats,
//   parseTmLearnsetSection,
//   getPokemonIdFromMonsNoAndForm,
//   getPokemonInfo,
//   makeSmogonAbilityObject,
//   getAbilityIdFromAbilityName,
//   getAbilityString,
//   getAbilityInfo,
//   getWeight,
//   getHeight,
//   getItemIdFromItemName,
//   getItemString,
//   generateMovesViaLearnset,
//   getMoveId,
//   getMoveString,
//   isMoveNameSmogonCompatible,
//   getEggMoves,
//   getTechMachineLearnset,
//   getMoveProperties,
//   getPokemonMonsnoFromName,
//   getFormName,
//   getFormNameOfProblematicPokemon,
//   getPokemonName,
//   getPokemonIdFromName,
//   getPokemonNames,
//   getNatureId,
//   getNatureName,
//   getTypeName,
//   getTypes,
//   getPokemonLearnset,
//   getPokemonFormId,
//   POKEMON_MOVE_LEVEL_TYPE,
// };
