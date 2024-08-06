const { GAMEDATA2, NatureNames } = require('../../../__gamedata');

function getNatureId(natureString, mode = GAMEDATA2) {
  if (!natureString) throw Error(`Bad natureString: ${natureString}`);
  const ModeNatureNames = NatureNames[mode];
  const index = ModeNatureNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === natureString);
  if (index === -1) throw Error(`Bad natureString: ${natureString}`);
  return index;
}

function getNatureName(natureId = 0, mode = GAMEDATA2) {
  const ModeNatureNames = NatureNames[mode];
  return ModeNatureNames.labelDataArray[natureId].wordDataArray[0].str;
}

module.exports = { getNatureId, getNatureName };
