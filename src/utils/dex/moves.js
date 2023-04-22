const { LearnsetTable, moveEnum, smogonMoves } = require('../../../__gamedata');

function generateMovesViaLearnset(monsNo, level) {
  //In BDSP, a trainer's Pokemon, when provided no moves,
  //will use the four most recent moves in the learnset.
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

export { generateMovesViaLearnset, getMoveId, getMoveString, isMoveNameSmogonCompatible };
