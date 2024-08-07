import {
  makeSmogonAbilityObject,
  getAbilityIdFromAbilityName,
  getAbilityString,
  getAbilityInfo
} from './ability';
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
  getLevelLearnset,
  getTutorMoves,
} from './moves';
import {
  getPokemonMonsnoFromName,
  getFormName,
  getFormNameOfProblematicPokemon,
  getPokemonName,
  getPokemonIdFromName,
  getPokemonNames,
  getPokemonFormId,
  getPokemonMonsNoAndFormNoFromPokemonId,
} from './name';
import { getNatureId, getNatureName } from './nature';
import { getTypeName, getTypes } from './types';
import { getWeight, getHeight } from './details';
import {
  FORM_MAP,
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
import { getFieldItemsFromZoneID, getHiddenItemsFromZoneID } from './location';
import { getEvolutionTree } from './evolution';
import { getEggGroupNameById, getEggGroupViaPokemonId } from './egggroup';

import { GAMEDATA2, PersonalTable } from '../../../__gamedata';

const POKEMON_MOVE_LEVEL_TYPE = {
  EGG: 'egg',
  TM: 'tm',
};

function getPokemonInfo(pokemonId = 0, mode = GAMEDATA2) {
  const ModePersonalTable = PersonalTable[mode];
  const p = ModePersonalTable.Personal[pokemonId];
  const id = p.id;
  const monsno = p.monsno;
  const [_, formno] = getPokemonMonsNoAndFormNoFromPokemonId(p.id, mode);
  const name = getPokemonName(p.id, mode);
  const dexDescription = getDexDescription(p.id, mode)
  const baseStats = {
    hp: p.basic_hp,
    atk: p.basic_atk,
    def: p.basic_def,
    spa: p.basic_spatk,
    spd: p.basic_spdef,
    spe: p.basic_agi,
  };
  const baseStatsTotal = Object.values(baseStats).reduce((total, stat) => total + stat, 0);
  const weight = getWeight(pokemonId);
  const height = getHeight(pokemonId);
  const type1 = getTypeName(p.type1);
  const type2 = getTypeName(p.type2);
  const type1Id = p.type1;
  const type2Id = p.type2;
  const genderDecimalValue = p.sex;
  const imageSrc = getImage(p.monsno, getPokemonFormIndexById(p.monsno, p.id, mode));
  const grassKnotPower = getGrassKnotPower(weight);

  const ability1 = getAbilityString(p.tokusei1, mode);
  const ability2 = getAbilityString(p.tokusei2, mode);
  const abilityH = getAbilityString(p.tokusei3, mode);

  const evolutionTree = getEvolutionTree(pokemonId, true, mode);

  const learnset = {
    level: getLevelLearnset(pokemonId, mode),
    tm: getTechMachineLearnset(pokemonId, mode),
    egg: getEggMoves(pokemonId, mode),
    tutor: getTutorMoves(monsno, formno, mode)
  };
  const eggGroupNames = getEggGroupViaPokemonId(pokemonId, mode).map((eggId) => getEggGroupNameById(eggId));
  const forms = getPokemonFormId(p.monsno, mode).map((formId) => {
    return {
      name: getPokemonName(formId, mode),
      imageSrc: getImage(p.monsno, getPokemonFormIndexById(p.monsno, formId, mode)),
    };
  });

  const isValid = p.valid_flag === 1;
  const isBaseForm = p.form_index === 0;

  const item1 = getItemString(p.item1, mode)
  const item2 = getItemString(p.item2, mode)
  const item3 = getItemString(p.item3, mode)

  return {
    id,
    monsno,
    formno,
    name,
    dexDescription,
    baseStats,
    baseStatsTotal,
    weight,
    height,
    type1,
    type2,
    type1Id,
    type2Id,
    genderDecimalValue,
    imageSrc,
    grassKnotPower,
    ability1,
    ability2,
    abilityH,
    evolutionTree,
    learnset,
    eggGroupNames,
    forms,
    isValid,
    isBaseForm,
    item1,
    item2,
    item3,
  };
}

export {
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
