const {
  LearnsetTable,
  EggMovesTable,
  MovesTable,
  SmogonMoves,
  ItemTable,
  PersonalTable,
  MoveNames,
  MoveInfo,
  TutorMoves,
  GAMEDATA2
} = require('../../../__gamedata');
const { FORM_MAP, isValidPokemon } = require('./functions');
const { getPokemonFormId, getPokemonName, getPokemonMonsNoAndFormNoFromPokemonId } = require('./name');

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
    throw new Error(`Incompatible move string found: ID - ${moveId}`);
  }
  const nameData = LabelDataArray[moveId].wordDataArray;
  const name = nameData.length ? nameData[0].str : null;

  if (!name) {
    throw new Error(`Bad move name: ${name}`);
  }

  // TODO Removing this for now. Find out where it comes from and add it back in later.
  // if (!isMoveNameSmogonCompatible(name)) {
  //   throw new Error(`This move is not Smogon Compatible: ID - ${moveId}, String: ${name}`);
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

function findWazaNoByMachineNo(machineNo, mode = GAMEDATA2) {
  const ModeItemTable = ItemTable[mode];
  const wazaMachineArray = ModeItemTable.WazaMachine;

  for (let i = 0; i < wazaMachineArray.length; i++) {
    if (wazaMachineArray[i]['machineNo'] === machineNo) {
      return wazaMachineArray[i]['wazaNo'];
    }
  }

  return null;
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
    return null;
  }
  const ModePersonalTable = PersonalTable[mode];

  if (mode === GAMEDATA2) {
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
    const personalData = ModePersonalTable.Personal[pokemonId];
    const machineNos = [personalData['machine1'], personalData['machine2'], personalData['machine3'], personalData['machine4']];
    const tmBinaryList = convertListToBinaryArray(machineNos);
    const tmCompatibility = createMoveIdLearnset(tmBinaryList, mode);
  
    return tmCompatibility;
  }
}

function getTechMachineLearnset(pokemonId = 0, mode = GAMEDATA2) {
  if (pokemonId === 0) {
    return [];
  }
  const learnset = getTMCompatibility(pokemonId, mode)

  if (mode === GAMEDATA2) {
    const ModeItemTable = ItemTable[mode];

    const canLearn = [];
    for (let i = 0; i <= MAX_TM_COUNT; i++) {
      const tm = ModeItemTable.WazaMachine[i];

      const legalitySetValue = ModeItemTable.Item[tm.itemNo].group_id;
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

function convertListToBinaryArray(decimalList) {
  if (decimalList.length !== 4) {
    throw new Error("Input list must have exactly 4 elements");
  }

  const binaryArray = [];

  binaryArray.push(...decimalList.map((decimalNumber) => {
    if (!Number.isInteger(decimalNumber) || decimalNumber < 0) {
      throw new Error("All elements in the list must be non-negative integers");
    }
  
    return decimalToBinaryArray(decimalNumber);
  }).flat());
  
  // Pad the binary array to have a length of 128 by adding leading zeros
  while (binaryArray.length < 128) {
    binaryArray.unshift(0);
  }

  return binaryArray;
}

function createMoveIdLearnset(binaryArray, mode = GAMEDATA2) {
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

function searchForMovesOnPokemon(moveId = 0, mode = GAMEDATA2) {
  // This is a wild function.
  // I may want to make a json specifically for loading this in the movedex
  // Just depends on the load times for it
  // This maps over every pokemon in a mode,
  // then maps over their entire learnset to see if it can learn a move
  return Object.values(FORM_MAP[mode])
    .flat()
    .slice(1)
    .map((id) => {
      // This is a map and not a filter because
      // we want to return which method(s) a pokemon can learn a move
      const isValid = isValidPokemon(id, mode);
      if (!isValid) {
        return null; // Skip invalid Pokémon
      }
      let monsNo = 0, formNo = 0;
      try {
        [monsNo, formNo] = getPokemonMonsNoAndFormNoFromPokemonId(id, mode);
      } catch (error) {
        console.log("This pokemonID didn't work", id, mode);
      }
      const learnsets = {
        level: getLevelLearnset(id, mode),
        tm: getTechMachineLearnset(id, mode),
        egg: getEggMoves(id, mode),
        tutor: getTutorMoves(monsNo, formNo, mode)
      };

      // Find which learnsets contain the move
      const setsContainingMove = Object.entries(learnsets)
        .filter(([key, moves]) => 
          Array.isArray(moves) && 
          moves.some(move => move.move?.moveId === moveId) // Check moveId
        )
        .map(([key]) => key); // Only keep the keys (e.g., "level", "tm")

      if (setsContainingMove.length > 0) {
        return {
          id,
          mode,
          learnsets: setsContainingMove // Include only the relevant learnset names
        };
      }

      return null; // Skip if no learnsets contain the move
    })
    .filter(Boolean); // Remove null values}
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
  getMoveLevelLearned,
  getLevelLearnset,
  getTutorMoves,
  searchForMovesOnPokemon,
};
