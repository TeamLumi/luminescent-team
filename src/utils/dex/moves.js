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

function generateMovesViaLearnset(monsNo, level) {
  /**
   * In BDSP, a trainer's Pokemon, when provided no moves,
   * will use the four most recent moves in the learnset.
   */

  const cutoffIndex = LearnsetTable.WazaOboe[monsNo].ar.findIndex((e, i) => {
    if (i % 2 === 1) return;
    return e > level;
  });

  const moves = LearnsetTable.WazaOboe[monsNo].ar.slice(0, cutoffIndex);

  return [
    getMoveString(moves.at(-7)),
    getMoveString(moves.at(-5)),
    getMoveString(moves.at(-3)),
    getMoveString(moves.at(-1)),
  ];
}

function isMoveNameSmogonCompatible(moveString) {
  for (let movesPerGeneration of smogonMoves) {
    if (Object.keys(movesPerGeneration).includes(moveString)) {
      return true;
    }
  }

  return false;
}

function getMoveId(moveName) {
  if (!moveName) return 0;
  const id = moveEnum.findIndex((e) => e === moveName.trim());
  if (id === -1) throw Error(`Bad move name: ${moveName}`);
  return id;
}

function getMoveString(id = 0) {
  const str = moveEnum[id];
  if (!isMoveNameSmogonCompatible(str)) {
    throw Error(`Incompatible move string found: ID - ${id}, String: ${str}`);
  }

  return str;
}

function getMoveProperties(moveId = 0) {
  const { type, damageType, power, hitPer, basePP } = MovesTable.Waza[moveId];
  const maxPP = (basePP ?? 0) * (8 / 5);
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
  let description = wordData.reduce((moveDescription, currentString) => {
    return moveDescription + currentString.str + ' ';
  }, '');
  return description;
}

function getTechMachineLearnset(m1, m2, m3, m4) {
  const learnset = [
    parseTmLearnsetSection(m1),
    parseTmLearnsetSection(m2),
    parseTmLearnsetSection(m3),
    parseTmLearnsetSection(m4),
  ]
    .join('')
    .split('')
    .flatMap((e) => parseInt(e));

  const canLearn = [];
  for (let i = 0; i < learnset.length; i++) {
    if (learnset[i] === 0) continue;

    const tm = ItemTable.WazaMachine[i];
    canLearn.push({ level: 'tm', moveId: tm.wazaNo });
  }

  return canLearn;
}
function getPokemonLearnset(pokemonId = 0) {
  return LearnsetTable.WazaOboe[pokemonId].ar;
}

function parseTmLearnsetSection(decimal) {
  return (decimal >>> 0).toString(2).split('').reverse().join('').padStart(32, 0);
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
  parseTmLearnsetSection,
};
