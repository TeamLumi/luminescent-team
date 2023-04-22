const { natureNames } = require('../../../__gamedata');

function getNatureId(natureString) {
  if (!natureString) return -1;
  const index = natureNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === natureString);
  if (index === -1) throw Error(`Bad natureString: ${natureString}`);
  return index;
}

function getNatureName(natureId = 0) {
  return natureNames.labelDataArray[natureId].wordDataArray[0].str;
}

export { getNatureId, getNatureName };
