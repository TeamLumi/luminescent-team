import {
  LearnsetTable,
  EggMovesTable,
  MovesTable,
  moveEnum,
  smogonMoves,
  ItemTable,
  PersonalTable,
  moveNames,
  moveInfo,
} from '../../../__gamedata';
import { getPokemonFormId } from './name';

const IS_MOVE_INDEX = false;
const MAX_TM_COUNT = 104;

function generateMovesViaLearnset(monsNo, level) {
  /**
   * In BDSP, a trainer's Pokemon, when provided no moves,
   * will use the four most recent moves in the learnset.
   */
  if (!Number.isInteger(monsNo) || monsNo < 0 || !LearnsetTable.WazaOboe[monsNo]) {
    throw new Error('Invalid Pokémon number');
  }

  if (!Number.isInteger(level) || level < 0) {
    throw new Error('Invalid level');
  }

  let cutoffIndex = LearnsetTable.WazaOboe[monsNo].ar.findIndex((currentMoveOrLevel, i) => {
    if (i % 2 === 1) return IS_MOVE_INDEX;
    return currentMoveOrLevel > level;
  });
  if (cutoffIndex === -1) {
    cutoffIndex = LearnsetTable.WazaOboe[monsNo].ar.length;
  }
  const moves = LearnsetTable.WazaOboe[monsNo].ar.slice(0, cutoffIndex);

  const moveset = [moves.at(-7) || 0, moves.at(-5) || 0, moves.at(-3) || 0, moves.at(-1) || 0];

  return moveset.map(getMoveString);
}

function isMoveNameSmogonCompatible(moveString) {
  if (typeof moveString !== 'string' || !moveString) throw Error(`Bad move string: ${moveString}`);
  return smogonMoves.some((movesPerGeneration) => Object.keys(movesPerGeneration).includes(moveString));
}

function getMoveId(moveName) {
  if (typeof moveName !== 'string' || !moveName) throw Error(`Bad move name: ${moveName}`);
  const id = moveEnum.findIndex((e) => e === moveName.trim());
  if (id === -1) throw Error(`Bad move name: ${moveName}`);
  return id;
}

function getMoveString(id = 0) {
  if (!Number.isInteger(id) || id < 0) throw Error(`Bad move string found: ID - ${id}`);

  const str = moveEnum[id];
  if (typeof str !== 'string' || !isMoveNameSmogonCompatible(str)) {
    throw Error(`Incompatible move string found: ID - ${id}, String: ${str}`);
  }

  return str;
}

function getMoveProperties(moveId = 0) {
  const move = MovesTable.Waza[moveId];
  const type = move.type;
  const damageType = move.damageType;
  const power = move.power;
  const hitPer = move.hitPer;
  const basePP = move.basePP;

  const BASE_PP = basePP ?? 0;
  const MAX_PP_MULTIPLIER = 1.6;
  const maxPP = BASE_PP * MAX_PP_MULTIPLIER;

  return {
    name: moveNames.labelDataArray[moveId].wordDataArray[0]?.str ?? 'None',
    desc: getMoveDescription(moveId),
    type,
    damageType, //0 = Status, 1 = Physical, 2 = Special
    maxPP,
    power,
    accuracy: hitPer,
  };
}

function getEggMoves(dexId = 0) {
  if (!Number.isInteger(dexId) || PersonalTable.Personal[dexId] === undefined) return [];
  const { monsno } = PersonalTable.Personal[dexId];
  const formNo = getPokemonFormId(monsno, dexId);
  const eggMoves = EggMovesTable.Data.find((e) => e.no === monsno && e.formNo === formNo)?.wazaNo ?? [];
  return eggMoves.map((moveId) => ({
    level: 'egg',
    moveId,
  }));
}

function getMoveDescription(moveId = 0) {
  const wordData = moveInfo.labelDataArray[moveId].wordDataArray;
  const description = wordData.reduce((moveDescription, currentString) => {
    return moveDescription + currentString.str + ' ';
  }, '');
  return description.trim();
}

function getTMCompatibility(pokemonId = 0) {
  const { machine1, machine2, machine3, machine4 } = PersonalTable.Personal[pokemonId];
  let tmCompatibility = [];

  for (let i = 0; i < 32; i++) {
    tmCompatibility[i] = (machine1 & (1 << i)) != 0;
  }
  for (let i = 0; i < 32; i++) {
    tmCompatibility[i + 32] = (machine2 & (1 << i)) != 0;
  }
  for (let i = 0; i < 32; i++) {
    tmCompatibility[i + 64] = (machine3 & (1 << i)) != 0;
  }
  for (let i = 0; i < 32; i++) {
    tmCompatibility[i + 96] = (machine4 & (1 << i)) != 0;
  }

  return tmCompatibility;
}

function getTechMachineLearnset(pokemonId = 0) {
  const learnset = getTMCompatibility(pokemonId);

  const canLearn = [];
  for (let i = 0; i <= MAX_TM_COUNT; i++) {
    const tm = ItemTable.WazaMachine[i];

    const legalitySetValue = ItemTable.Item[tm.itemNo].group_id;
    const isLearnable = learnset[legalitySetValue - 1];
    if (tm.wazaNo === 216) {
      console.log(legalitySetValue, learnset[legalitySetValue - 1], isLearnable);
    }

    if (isLearnable) {
      canLearn.push({ level: 'tm', moveId: tm.wazaNo });
    }
  }

  return canLearn;
}

function getPokemonLearnset(pokemonId = 0) {
  if (!Number.isInteger(pokemonId) || pokemonId < 0) return [];
  return LearnsetTable.WazaOboe[pokemonId]?.ar ?? [];
}

export {
  generateMovesViaLearnset,
  getMoveId,
  getMoveString,
  isMoveNameSmogonCompatible,
  getEggMoves,
  getTechMachineLearnset,
  getMoveProperties,
  getPokemonLearnset,
  getTMCompatibility,
};
