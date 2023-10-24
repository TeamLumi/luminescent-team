const {
  makeSmogonAbilityObject,
  getAbilityIdFromAbilityName,
  getAbilityString,
  getAbilityInfo,
} = require("./ability");

const { getItemIdFromItemName, getItemString } = require("./item");

const {
  generateMovesViaLearnset,
  getMoveId,
  getMoveString,
  isMoveNameSmogonCompatible,
  getEggMoves,
  getTechMachineLearnset,
  getMoveProperties,
  getPokemonLearnset,
  getTMCompatibility,
} = require("./moves");

const {
  getPokemonMonsnoFromName,
  getFormName,
  getFormNameOfProblematicPokemon,
  getPokemonName,
  getPokemonMonsNoAndFormNoFromPokemonId,
  getPokemonIdFromName,
  getPokemonIdFromDisplayName,
  getPokemonNames,
  getPokemonFormId,
  getPokemonDisplayName,
} = require("./name");

const { getNatureId, getNatureName } = require("./nature");

const { getTypeName, getTypes } = require("./types");

const { getWeight, getHeight } = require("./details");

const {
  FORM_MAP,
  getPokemonIdFromFormMap,
  getGender,
  getGrassKnotPower,
  getImage,
  formatBaseStats,
  getPokemonIdFromMonsNoAndForm,
} = require("./functions");

const { PersonalTable } = require("../__gamedata");

const POKEMON_MOVE_LEVEL_TYPE = {
  EGG: "egg",
  TM: "tm",
};

const { getEncounterLocations } = require("./location");

function getPokemonInfo(monsId = 0) {
  const p = PersonalTable[monsId];
  const [monsNo, formNo] = getPokemonMonsNoAndFormNoFromPokemonId(monsId);
  return {
    formno: formNo,
    monsno: monsNo,
    name: getPokemonDisplayName(monsId),
    ability1: getAbilityString(p.tokusei1),
    ability2: getAbilityString(p.tokusei2),
    abilityH: getAbilityString(p.tokusei3),
    tmLearnset: getTechMachineLearnset(p.id),
    prettyBaseStats: formatBaseStats(p),
    baseStats: {
      hp: p.basic_hp,
      atk: p.basic_atk,
      def: p.basic_def,
      spa: p.basic_spatk,
      spd: p.basic_spdef,
      spe: p.basic_agi,
    },
    baseStatsTotal:
      p.basic_hp +
      p.basic_atk +
      p.basic_def +
      p.basic_spatk +
      p.basic_spdef +
      p.basic_agi,
    weight: getWeight(monsId),
    height: getHeight(monsId),
    grassKnotPower: getGrassKnotPower(getWeight(monsId)),
    type1: getTypeName(p.type1),
    type2: getTypeName(p.type2),
    imageSrc: getImage(monsNo, formNo),
    genderDecimalValue: p.sex,
  };
}

module.exports = {
  FORM_MAP,
  getPokemonIdFromFormMap,
  getGender,
  getGrassKnotPower,
  getImage,
  formatBaseStats,
  getTMCompatibility,
  getPokemonIdFromMonsNoAndForm,
  getPokemonInfo,
  makeSmogonAbilityObject,
  getAbilityIdFromAbilityName,
  getAbilityString,
  getAbilityInfo,
  getWeight,
  getHeight,
  getItemIdFromItemName,
  getItemString,
  generateMovesViaLearnset,
  getMoveId,
  getMoveString,
  isMoveNameSmogonCompatible,
  getEggMoves,
  getTechMachineLearnset,
  getMoveProperties,
  getEncounterLocations,
  getPokemonMonsnoFromName,
  getFormName,
  getFormNameOfProblematicPokemon,
  getPokemonName,
  getPokemonIdFromName,
  getPokemonIdFromDisplayName,
  getPokemonNames,
  getNatureId,
  getNatureName,
  getTypeName,
  getTypes,
  getPokemonLearnset,
  getPokemonFormId,
  POKEMON_MOVE_LEVEL_TYPE,
};
