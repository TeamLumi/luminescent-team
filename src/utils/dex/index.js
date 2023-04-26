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
} from './moves';
import {
  getPokemonMonsNoFromName,
  getFormName,
  getFormNameOfProblematicPokemon,
  getPokemonName,
  getPokemonIdFromName,
  getPokemonNames,
} from './name';
import { getNatureId, getNatureName } from './nature';
import { getTypeName, getTypes } from './types';
import { getWeight, getHeight } from './details';
import {
  FORM_MAP,
  getPokemonIdFromFormMap,
  getGender,
  getGrassKnotPower,
  getImage,
  formatBaseStats,
  parseTmLearnsetSection,
  getPokemonIdFromMonsNoAndForm,
  getPokemonInfo,
  getPokemonFormId,
} from './functions';

const POKEMON_MOVE_LEVEL_TYPE = {
  EGG: 'egg',
  TM: 'tm',
};

export {
  FORM_MAP,
  getPokemonIdFromFormMap,
  getGender,
  getGrassKnotPower,
  getImage,
  formatBaseStats,
  parseTmLearnsetSection,
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
  getPokemonMonsNoFromName,
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
};
