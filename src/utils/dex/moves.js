import {
  GAMEDATAV,
  GAMEDATA2,
  LearnsetTable,
  EggMovesTable,
  MovesTable,
  SmogonMoves,
  ItemTable,
  PersonalTable,
  MoveNames,
  MoveInfo,
  TutorMoves,
  TMLearnset,
} from '../../../__gamedata';

import { getPokemonFormId, getPokemonMonsNoAndFormNoFromPokemonId, getPokemonName } from './name';

const IS_MOVE_INDEX = false;
const MAX_TM_COUNT = 104;

function generateMovesViaLearnset(monsNo, level, mode = GAMEDATA2) {
  const ModeLearnsetTable = LearnsetTable[mode];
  /**
   * In BDSP, a trainer's Pokemon, when provided no moves,
   * will use the four most recent moves in the learnset.
   */
  if (!Number.isInteger(monsNo) || monsNo < 0 || !ModeLearnsetTable.WazaOboe[monsNo]) {
    throw new Error('Invalid Pokémon number');
  }

  if (!Number.isInteger(level) || level < 0) {
    throw new Error('Invalid level');
  }

  let cutoffIndex = ModeLearnsetTable.WazaOboe[monsNo].ar.findIndex((currentMoveOrLevel, i) => {
    if (i % 2 === 1) return IS_MOVE_INDEX;
    return currentMoveOrLevel > level;
  });
  if (cutoffIndex === -1) {
    cutoffIndex = ModeLearnsetTable.WazaOboe[monsNo].ar.length;
  }
  const moves = ModeLearnsetTable.WazaOboe[monsNo].ar.slice(0, cutoffIndex);

  const moveset = [moves.at(-7) || 0, moves.at(-5) || 0, moves.at(-3) || 0, moves.at(-1) || 0];

  return moveset.map((move) => getMoveString(move, mode));
}

function isMoveNameSmogonCompatible(moveString, mode = GAMEDATA2) {
  if (typeof moveString !== 'string' || !moveString) throw Error(`Bad move string: ${moveString}`);
  return SmogonMoves[mode].some((movesPerGeneration) => Object.keys(movesPerGeneration).includes(moveString));
}

function getMoveString(moveId = 0, mode = GAMEDATA2) {
  const ModeMoveNames = MoveNames[mode];
  if (!moveId) {
    throw new Error(`Bad move string found: ID - ${moveId}`);
  }
  const LabelDataArray = ModeMoveNames.labelDataArray;
  if (moveId > LabelDataArray.length) {
    throw new Error(`Incompatible move string found: ID - ${moveId}, String: ${name}`);
  }
  const nameData = LabelDataArray[moveId].wordDataArray;
  const name = nameData.length ? nameData[0].str : null;

  if (!name) {
    throw new Error(`Bad move name: ${name}`);
  }

  // TODO Removing this for now. Find out where it comes from and add it back in later.
  // if (!isMoveNameSmogonCompatible(name)) {
  //   throw new Error(`Incompatible move string found: ID - ${moveId}, String: ${name}`);
  // }

  return name;
}

function getMoveId(moveName, mode = GAMEDATA2) {
  const ModeMoveNames = MoveNames[mode];

  if (!moveName) {
    throw new Error(`Bad move name: ${moveName}`);
  }

  for (let i = 0; i < ModeMoveNames.labelDataArray.length; i++) {
    const move = ModeMoveNames.labelDataArray[i];
    const moveStr = move.wordDataArray[0].str;
    const normalized_move_string = moveStr.normalize('NFKD').replace(/[^\w\s-]/g, '').trim().toLowerCase();
    if (moveStr === moveName || normalized_move_string === moveName) {
      return i;
    }
  }

  throw new Error(`Bad move name: ${moveName}`);
}

function getMoveProperties(moveId = 0, mode = GAMEDATA2) {
  const ModeMovesTable = MovesTable[mode];
  const ModeMoveNames = MoveNames[mode];
  const move = ModeMovesTable.Waza[moveId];
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
    name: ModeMoveNames.labelDataArray[moveId].wordDataArray[0]?.str ?? 'None',
    desc: getMoveDescription(moveId, mode),
    type,
    damageType, //0 = Status, 1 = Physical, 2 = Special
    maxPP,
    power,
    accuracy: hitPer,
  };
}

function getEggMoves(dexId = 0, mode = GAMEDATA2) {
  const ModePersonalTable = PersonalTable[mode];
  const ModeEggMovesTable = EggMovesTable[mode];
  if (!Number.isInteger(dexId) || ModePersonalTable.Personal[dexId] === undefined) return [];
  const { monsno } = ModePersonalTable.Personal[dexId];
  const formNo = getPokemonFormId(monsno, dexId, mode);
  const eggMoves = ModeEggMovesTable.Data.find((e) => e.no === monsno && e.formNo === formNo)?.wazaNo ?? [];
  return eggMoves.map((moveId) => ({
    level: 'egg',
    move: getMoveProperties(moveId, mode),
  }));
}

function getMoveDescription(moveId = 0, mode = GAMEDATA2) {
  const ModeMoveInfo = MoveInfo[mode];
  const wordData = ModeMoveInfo.labelDataArray[moveId].wordDataArray;
  const description = wordData.reduce((moveDescription, currentString) => {
    return moveDescription + currentString.str + ' ';
  }, '');
  return description.trim();
}

function getTMCompatibility(pokemonId = 0, mode = GAMEDATA2) {
  if (pokemonId === 0) {
    return [];
  }
  const ModePersonalTable = PersonalTable[mode];

  if (mode === GAMEDATA2 || mode === GAMEDATAV) {
    const { machine1, machine2, machine3, machine4 } = ModePersonalTable.Personal[pokemonId];
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
  } else {
    const [monsNo, formNo] = getPokemonMonsNoAndFormNoFromPokemonId(pokemonId, mode);
    const {
      set01,
      set02,
      set03,
      set04,
      set05,
      set06,
      set07,
      set08,
    } = TMLearnset[mode][monsNo][`formno_${formNo}`];
    let tmCompatibility = [];

    for (let i = 0; i < 32; i++) {
      tmCompatibility[i] = (set01 & (1 << i)) != 0;
    }
    for (let i = 0; i < 32; i++) {
      tmCompatibility[i + 32] = (set02 & (1 << i)) != 0;
    }
    for (let i = 0; i < 32; i++) {
      tmCompatibility[i + 64] = (set03 & (1 << i)) != 0;
    }
    for (let i = 0; i < 32; i++) {
      tmCompatibility[i + 96] = (set04 & (1 << i)) != 0;
    }
    for (let i = 0; i < 32; i++) {
      tmCompatibility[i + 128] = (set05 & (1 << i)) != 0;
    }
    for (let i = 0; i < 32; i++) {
      tmCompatibility[i + 160] = (set06 & (1 << i)) != 0;
    }
    for (let i = 0; i < 32; i++) {
      tmCompatibility[i + 192] = (set07 & (1 << i)) != 0;
    }
    for (let i = 0; i < 32; i++) {
      tmCompatibility[i + 224] = (set08 & (1 << i)) != 0;
    }

    return tmCompatibility;
  }
}

function getTechMachineLearnset(pokemonId = 0, mode = GAMEDATA2) {
  if (pokemonId === 0) {
    return [];
  }
  const learnset = getTMCompatibility(pokemonId, mode);
  const ModeItemTable = ItemTable[mode];

  if (mode === GAMEDATA2 || mode === GAMEDATAV) {
    const canLearn = [];
    for (let i = 0; i <= learnset.length; i++) {
      const tm = ModeItemTable.WazaMachine[i];

      const legalitySetValue = ModeItemTable.Item[tm.itemNo].group_id;
      const isLearnable = learnset[legalitySetValue - 1];

      if (isLearnable) {
        canLearn.push({ level: 'tm', move: getMoveProperties(tm.wazaNo, mode) });
      }
    }

    return canLearn;
  } else {
    const canLearn = [];
    for (let i = 0; i <= learnset.length; i++) {
      const tm = ModeItemTable.WazaMachine[i];

      const isLearnable = learnset[i];

      if (isLearnable) {
        canLearn.push({ level: 'tm', move: getMoveProperties(tm.wazaNo, mode) });
      }
    }

    return canLearn;
  }
}

function getPokemonLearnset(pokemonId = 0, mode = GAMEDATA2) {
  const ModeLearnsetTable = LearnsetTable[mode];
  if (!Number.isInteger(pokemonId) || pokemonId < 0) return [];
  return ModeLearnsetTable.WazaOboe[pokemonId]?.ar ?? [];
}

function getLevelLearnset(pokemonId = 0, mode = GAMEDATA2) {
  const learnset = getPokemonLearnset(pokemonId, mode);

  const moveList = [];
  for (let i = 0; i < learnset.length; i += 2) {
    moveList.push({ level: learnset[i], move: getMoveProperties(learnset[i + 1], mode) });
  }

  return moveList;
}

function getMoveLevelLearned(pokemonId = 0, moveId = 0, mode = GAMEDATA2) {
  const ModeLearnsetTable = LearnsetTable[mode];
  if (!Number.isInteger(pokemonId) || pokemonId < 0) return [];
  const moveIndex = ModeLearnsetTable.WazaOboe[pokemonId]?.ar.findIndex((move) => move === moveId);
  if (moveIndex === -1) {
    console.error(`This pokemon can't learn this move ${getPokemonName(pokemonId, mode)}: ${getMoveString(moveId, mode)}`)
    return moveIndex;
  }
  const levelLearned = ModeLearnsetTable.WazaOboe[pokemonId]?.ar[moveIndex - 1]
  return levelLearned;
}

function getTutorMoves(monsno = 0, formno = 0, mode = GAMEDATA2) {
  const ModeTutorMoves = TutorMoves[mode];
  if(monsno === 0) return [];
  if(!Object.hasOwn(ModeTutorMoves, monsno)) return [];
  if(!Object.hasOwn(ModeTutorMoves[monsno], formno)) return [];
  const moveset = ModeTutorMoves[monsno][formno];
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
  getMoveLevelLearned,
  getTutorMoves,
  getTMCompatibility,
};
