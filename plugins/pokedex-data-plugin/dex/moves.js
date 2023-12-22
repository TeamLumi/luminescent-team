const {
  LearnsetTable,
  EggMovesTable,
  MovesTable,
  moveEnum,
  smogonMoves,
  ItemTable,
  PersonalTable,
  moveNames,
  moveInfo,
  tutorMoves
} = require('./data');
const {
  LearnsetTable3,
  EggMovesTable3,
  MovesTable3,
  ItemTable3,
  PersonalTable3,
  moveNames3,
  moveInfo3,
  tutorMoves3
} = require('./data3');
const { getPokemonFormId } = require('./name');

const IS_MOVE_INDEX = false;

function generateMovesViaLearnset(monsNo, level, mode = "2.0") {
  /**
   * In BDSP, a trainer's Pokemon, when provided no moves,
   * will use the four most recent moves in the learnset.
   */
  const learnsetTable = mode === "2.0" ? LearnsetTable : LearnsetTable3;
  if (!Number.isInteger(monsNo) || monsNo < 0 || !learnsetTable.WazaOboe[monsNo]) {
    throw new Error('Invalid Pokémon number');
  }

  if (!Number.isInteger(level) || level < 0) {
    throw new Error('Invalid level');
  }

  const cutoffIndex = learnsetTable.WazaOboe[monsNo].ar.findIndex((currentMoveOrLevel, i) => {
    if (i % 2 === 1) return IS_MOVE_INDEX;
    return currentMoveOrLevel > level;
  });

  const moves = learnsetTable.WazaOboe[monsNo].ar.slice(0, cutoffIndex);

  return [
    getMoveString(moves.at(-7)),
    getMoveString(moves.at(-5)),
    getMoveString(moves.at(-3)),
    getMoveString(moves.at(-1)),
  ];
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
    move: getMoveProperties(moveId, mode),
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

function getTechMachineLearnset(m1, m2, m3, m4, mode = "2.0") {
  const itemTable = mode === "2.0" ? ItemTable : ItemTable3;
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

    const tm = itemTable.WazaMachine[i];
    canLearn.push({ level: 'tm', move: getMoveProperties(tm.wazaNo, mode) });
  }

  return canLearn;
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

function parseTmLearnsetSection(decimal) {
  return (decimal >>> 0).toString(2).split('').reverse().join('').padStart(32, 0);
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

module.exports = {
  generateMovesViaLearnset,
  getMoveId,
  getMoveString,
  isMoveNameSmogonCompatible,
  getEggMoves,
  getTechMachineLearnset,
  getMoveProperties,
  getPokemonLearnset,
  parseTmLearnsetSection,
  getLevelLearnset,
  getTutorMoves
};
