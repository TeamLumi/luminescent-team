import { makeSmogonAbilityObject, getAbilityIdFromAbilityName, getAbilityString, getAbilityInfo } from './ability';
import { getItemIdFromItemName, getItemString } from './item';
import {
  generateMovesViaLearnset,
  getMoveId,
  getMoveString,
  isMoveNameSmogonCompatible,
  getEggMoves,
  getTechMachineLearnset,
  getMoveProperties,
  getPokemonLearnset,
  getTMCompatibility,
} from './moves';
import {
  getPokemonMonsnoFromName,
  getFormName,
  getFormNameOfProblematicPokemon,
  getPokemonName,
  getPokemonIdFromName,
  getPokemonNames,
  getPokemonFormId,
} from './name';
import { getNatureId, getNatureName } from './nature';
import { getTypeName, getTypes } from './types';
import { getWeight, getHeight } from './details';
import {
  FORM_MAP,
  FORM_MAP3,
  getPokemonIdFromFormMap,
  getPokemonFormIndexById,
  getGender,
  getGrassKnotPower,
  getImage,
  formatBaseStats,
  getPokemonIdFromMonsNoAndForm,
  getDexDescription,
} from './functions';
import {
  getAllGroundEncounters,
  getAllIncenseEncounters,
  getAllRodEncounters,
  getAllSurfingEncounters,
  getAreaEncounters,
  getTimeOfDayEncounters,
  getAllHoneyTreeEncounters
} from './encounters'
import { getTrainersFromZoneId } from './trainers';

import { PersonalTable } from './data';
import { PersonalTable3 } from './data3';

import {getFieldItemsFromZoneID, getHiddenItemsFromZoneID} from './location';

const POKEMON_MOVE_LEVEL_TYPE = {
  EGG: 'egg',
  TM: 'tm',
};

function getPokemonInfo(monsno = 0, pokemonId = 0, mode = "2.0") {
  const personalTable = mode === "2.0" ? PersonalTable : PersonalTable3
  const p = personalTable.Personal[pokemonId];
  const weight = getWeight(pokemonId, mode);

  return {
    monsno: monsno,
    name: getPokemonName(pokemonId, mode),
    ability1: getAbilityString(p.tokusei1, mode),
    ability2: getAbilityString(p.tokusei2, mode),
    abilityH: getAbilityString(p.tokusei3, mode),
    tmLearnset: getTechMachineLearnset(pokemonId, mode),
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
    weight: weight,
    height: getHeight(pokemonId, mode),
    grassKnotPower: getGrassKnotPower(weight),
    type1: getTypeName(p.type1),
    type2: getTypeName(p.type2),
    imageSrc: getImage(monsno, getPokemonFormIndexById(monsno, pokemonId, mode)),
    genderDecimalValue: p.sex,
    held_item1: p.item1,
    held_item2: p.item2,
    held_item3: p.item3,
  };
}

export {
  FORM_MAP,
  FORM_MAP3,
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
  getPokemonMonsnoFromName,
  getFormName,
  getFormNameOfProblematicPokemon,
  getPokemonName,
  getPokemonIdFromName,
  getPokemonNames,
  getNatureId,
  getNatureName,
  getTypeName,
  getTypes,
  getPokemonLearnset,
  getPokemonFormId,
  POKEMON_MOVE_LEVEL_TYPE,
  getDexDescription,
  getAllGroundEncounters,
  getAllIncenseEncounters,
  getAllRodEncounters,
  getAllSurfingEncounters,
  getAreaEncounters,
  getTimeOfDayEncounters,
  getAllHoneyTreeEncounters,
  getTrainersFromZoneId,
  getFieldItemsFromZoneID,
  getHiddenItemsFromZoneID
};
