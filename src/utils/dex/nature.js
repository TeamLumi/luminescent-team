const { NatureNames, GAMEDATA2 } = require('../../../__gamedata');

function getNatureId(natureString, mode = GAMEDATA2) {
  if (!natureString) throw Error(`Bad natureString: ${natureString}`);
  const index = NatureNames[mode].labelDataArray.findIndex((e) => e.wordDataArray[0].str === natureString);
  if (index === -1) throw Error(`Bad natureString: ${natureString}`);
  return index;
}

function getNatureName(natureId = 0, mode = GAMEDATA2) {
  return NatureNames[mode].labelDataArray[natureId].wordDataArray[0].str;
}

export { getNatureId, getNatureName };
