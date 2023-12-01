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
const { getPokemonFormId } = require('./name');

const IS_MOVE_INDEX = false;

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

  const cutoffIndex = LearnsetTable.WazaOboe[monsNo].ar.findIndex((currentMoveOrLevel, i) => {
    if (i % 2 === 1) return IS_MOVE_INDEX;
    return currentMoveOrLevel > level;
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
    moveId: moveId,
    name: moveNames.labelDataArray[moveId].wordDataArray[0]?.str ?? 'None',
    desc: getMoveDescription(moveId),
    type,
    damageType, //0 = Status, 1 = Physical, 2 = Special
    basePP,
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
    move: getMoveProperties(moveId),
  }));
}

function getMoveDescription(moveId = 0) {
  const wordData = moveInfo.labelDataArray[moveId].wordDataArray;
  const description = wordData.reduce((moveDescription, currentString) => {
    return moveDescription + currentString.str + ' ';
  }, '');
  return description.trim();
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
    canLearn.push({ level: 'tm', move: getMoveProperties(tm.wazaNo) });
  }

  return canLearn;
}

function getPokemonLearnset(pokemonId = 0) {
  if (!Number.isInteger(pokemonId) || pokemonId < 0) return [];
  return LearnsetTable.WazaOboe[pokemonId]?.ar ?? [];
}

function getLevelLearnset(pokemonId = 0) {
  const learnset = getPokemonLearnset(pokemonId);

  const moveList = [];
  for (let i = 0; i < learnset.length; i += 2) {
    moveList.push({ level: learnset[i], move: getMoveProperties(learnset[i + 1]) });
  }

  return moveList;
}

function parseTmLearnsetSection(decimal) {
  return (decimal >>> 0).toString(2).split('').reverse().join('').padStart(32, 0);
}

function getTutorMoves(monsno = 0, formno = 0) {
  if(monsno === 0) return [];
  if(!Object.hasOwn(tutorMoves, monsno)) return [];
  if(!Object.hasOwn(tutorMoves[monsno], formno)) return [];
  const moveset = tutorMoves[monsno][formno];
  const tutorSet = moveset.map(moveId => ({
    moveLevel: 0,
    move: getMoveProperties(moveId)
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
