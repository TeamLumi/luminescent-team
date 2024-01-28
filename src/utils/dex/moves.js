import {
  LearnsetTable,
  EggMovesTable,
  MovesTable,
  smogonMoves,
  ItemTable,
  PersonalTable,
  moveNames,
  moveInfo,
  tutorMoves,
} from './data';
import {
  LearnsetTable3,
  EggMovesTable3,
  MovesTable3,
  smogonMoves3,
  ItemTable3,
  PersonalTable3,
  moveNames3,
  moveInfo3,
  tutorMoves3
} from './data3';
import { getPokemonFormId } from './name';

const IS_MOVE_INDEX = false;
const MAX_TM_COUNT = 104;

function generateMovesViaLearnset(monsNo, level, mode = "2.0") {
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
  const learnsetTable = mode === "2.0" ? LearnsetTable : LearnsetTable3;

  let cutoffIndex = learnsetTable.WazaOboe[monsNo].ar.findIndex((currentMoveOrLevel, i) => {
    if (i % 2 === 1) return IS_MOVE_INDEX;
    return currentMoveOrLevel > level;
  });
  if (cutoffIndex === -1) {
    cutoffIndex = learnsetTable.WazaOboe[monsNo].ar.length;
  }
  const moves = learnsetTable.WazaOboe[monsNo].ar.slice(0, cutoffIndex);

  const moveset = [moves.at(-7) || 0, moves.at(-5) || 0, moves.at(-3) || 0, moves.at(-1) || 0];

  return moveset.map(getMoveString);
}

function isMoveNameSmogonCompatible(moveString) {
  if (typeof moveString !== 'string' || !moveString) throw Error(`Bad move string: ${moveString}`);
  return smogonMoves.some((movesPerGeneration) => Object.keys(movesPerGeneration).includes(moveString));
}

function getMoveString(moveId = 0, mode) {
  const movesNamedata = mode === "2.0" ? moveNames : moveNames3;
  const nameData = movesNamedata['labelDataArray'][moveId]['wordDataArray'];
  const name = nameData.length ? nameData[0]['str'] : 'None';

  if (!isMoveNameSmogonCompatible(name)) {
    throw new Error(`Incompatible move string found: ID - ${moveId}, String: ${name}`);
  }

  return name;
}

function getMoveId(moveName, mode) {
  const movesNamedata = mode === "2.0" ? moveNames : moveNames3;

  if (!moveName) {
    return -1;
  }

  for (let i = 0; i < movesNamedata['labelDataArray'].length; i++) {
    const move = movesNamedata['labelDataArray'][i];
    const moveStr = move['wordDataArray'][0]['str'];
    const normalized_move_string = moveStr.normalize('NFKD').replace(/[^\w\s-]/g, '').trim().toLowerCase();
    if (moveStr === moveName || normalized_move_string === moveName) {
      return i;
    }
  }

  return -1;
}

function findWazaNoByMachineNo(machineNo, mode) {
  const Item_Table = mode === "2.0" ? ItemTable : ItemTable3;
  const wazaMachineArray = Item_Table['WazaMachine'];

  for (const wazaMachine of wazaMachineArray) {
    if (wazaMachine['machineNo'] === machineNo) {
      return wazaMachine['wazaNo'];
    }
  }

  return null;
}

function getMoveProperties(moveId = 0, mode = "2.0") {
  const MoveTable = mode === "2.0" ? MovesTable : MovesTable3;
  const MoveNames = mode === "2.0" ? moveNames : moveNames3;
  const move = MoveTable.Waza[moveId];
  const type = move.type;
  const damageType = move.damageType;
  const power = move.power;
  const hitPer = move.hitPer;
  const basePP = move.basePP;

  const BASE_PP = basePP ?? 0;
  const MAX_PP_MULTIPLIER = 1.6;
  const maxPP = BASE_PP * MAX_PP_MULTIPLIER;

  return {
    moveId: moveId,
    name: MoveNames.labelDataArray[moveId].wordDataArray[0]?.str ?? 'None',
    desc: getMoveDescription(moveId, mode),
    type,
    damageType, //0 = Status, 1 = Physical, 2 = Special
    maxPP,
    power,
    accuracy: hitPer,
  };
}

function getEggMoves(dexId = 0, mode = "2.0") {
  const personalTable = mode === "2.0" ? PersonalTable : PersonalTable3;
  const eggMovesTable = mode === "2.0" ? EggMovesTable : EggMovesTable3;
  if (!Number.isInteger(dexId) || personalTable.Personal[dexId] === undefined) return [];
  const { monsno } = personalTable.Personal[dexId];
  const formNo = getPokemonFormId(monsno, dexId, mode);
  const eggMoves = eggMovesTable.Data.find((e) => e.no === monsno && e.formNo === formNo)?.wazaNo ?? [];
  return eggMoves.map((moveId) => ({
    level: 'egg',
    moveId,
  }));
}

function getMoveDescription(moveId = 0, mode = "2.0") {
  const MoveInfo = mode === "2.0" ? moveInfo : moveInfo3;
  const wordData = MoveInfo.labelDataArray[moveId].wordDataArray;
  const description = wordData.reduce((moveDescription, currentString) => {
    return moveDescription + currentString.str + ' ';
  }, '');
  return description.trim();
}

function getTMCompatibility(pokemonId = 0, mode = "2.0") {
  const personalTable = mode === "2.0" ? PersonalTable : PersonalTable3;
  const { machine1, machine2, machine3, machine4 } = personalTable.Personal[pokemonId];
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

function getTechMachineLearnset(pokemonId = 0, mode = "2.0") {
  const learnset = mode === "2.0"
    ? getTMCompatibility(pokemonId, mode)
    : getTmCompatibility3(pokemonId, mode);

  if (mode === "2.0") {
    const itemTable = mode === "2.0" ? ItemTable : ItemTable3;

    const canLearn = [];
    for (let i = 0; i <= MAX_TM_COUNT; i++) {
      const tm = itemTable.WazaMachine[i];

      const legalitySetValue = itemTable.Item[tm.itemNo].group_id;
      const isLearnable = learnset[legalitySetValue - 1];

      if (isLearnable) {
        canLearn.push({ level: 'tm', move: getMoveProperties(tm.wazaNo, mode) });
      }
    }

    return canLearn;
  } else {
    if (learnset === null) {
      return [];
    }

    const canLearn = learnset.map(move => ({ level: 'tm', move: getMoveProperties(move, mode)}));
    return canLearn;
  }
}

function getTmCompatibility3(pokemonId = 0, mode) {
  if (pokemonId === 0) {
    return null;
  }
  const personalTable = mode === "2.0" ? PersonalTable : PersonalTable3;

  const personalData = personalTable.Personal[pokemonId];
  const machineNos = [personalData['machine1'], personalData['machine2'], personalData['machine3'], personalData['machine4']];
  const tmBinaryList = convertListToBinaryArray(machineNos);
  const tmCompatibility = createMoveIdLearnset(tmBinaryList, mode);

  return tmCompatibility;
}

function convertListToBinaryArray(decimalList) {
  if (decimalList.length !== 4) {
    throw new Error("Input list must have exactly 4 elements");
  }

  const binaryArray = [];

  for (const decimalNumber of decimalList) {
    if (!Number.isInteger(decimalNumber) || decimalNumber < 0) {
      throw new Error("All elements in the list must be non-negative integers");
    }

    binaryArray.push(...decimalToBinaryArray(decimalNumber));
  }

  // Pad the binary array to have a length of 128 by adding leading zeros
  while (binaryArray.length < 128) {
    binaryArray.unshift(0);
  }

  return binaryArray;
}

function createMoveIdLearnset(binaryArray, mode) {
  const tmArray = [];

  for (let machineNoIndex = 0; machineNoIndex < binaryArray.length; machineNoIndex++) {
    const binaryInt = binaryArray[machineNoIndex];

    if (binaryInt === 0) {
      continue;
    }

    if (machineNoIndex > 103) {
      break;
    }

    const machineNo = machineNoIndex + 1;
    tmArray.push(findWazaNoByMachineNo(machineNo, mode));
  }

  return tmArray;
}

function decimalToBinaryArray(decimalNumber) {
  if (!Number.isInteger(decimalNumber) || decimalNumber < 0) {
    throw new Error("Input must be a non-negative integer");
  }

  const binaryString = (decimalNumber >>> 0).toString(2);  // Convert to binary and ensure positive
  const binaryArray = Array.from(binaryString, Number);

  // Pad the binary array to have a length of 32 by adding leading zeros
  while (binaryArray.length < 32) {
    binaryArray.unshift(0);
  }

  return binaryArray.reverse();
}

function getPokemonLearnset(pokemonId = 0, mode = "2.0") {
  const learnsetTable = mode === "2.0" ? LearnsetTable : LearnsetTable3;
  if (!Number.isInteger(pokemonId) || pokemonId < 0) return [];
  return learnsetTable.WazaOboe[pokemonId]?.ar ?? [];
}

function getLevelLearnset(pokemonId = 0, mode = "2.0") {
  const learnset = getPokemonLearnset(pokemonId, mode);

  const moveList = [];
  for (let i = 0; i < learnset.length; i += 2) {
    moveList.push({ level: learnset[i], move: getMoveProperties(learnset[i + 1], mode) });
  }

  return moveList;
}

function getTutorMoves(monsno = 0, formno = 0, mode = "2.0") {
  const TutorMoves = mode === "2.0" ? tutorMoves : tutorMoves3;
  if(monsno === 0) return [];
  if(!Object.hasOwn(TutorMoves, monsno)) return [];
  if(!Object.hasOwn(TutorMoves[monsno], formno)) return [];
  const moveset = TutorMoves[monsno][formno];
  const tutorSet = moveset.map(moveId => ({
    moveLevel: 0,
    move: getMoveProperties(moveId, mode)
  }));

  return tutorSet;
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
  getLevelLearnset,
  getTutorMoves,
  getTMCompatibility,
};
