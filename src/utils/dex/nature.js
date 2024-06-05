const { natureNames } = require('../../../__gamedata');

function getNatureId(natureString) {
  if (!natureString) throw Error(`Bad natureString: ${natureString}`);
  const index = natureNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === natureString);
  if (index === -1) throw Error(`Bad natureString: ${natureString}`);
  return index;
}

function getNatureName(natureId = 0) {
  const natureName = natureNames.labelDataArray[natureId]?.wordDataArray[0].str;
  if (!natureName) throw Error(`Bad natureId: ${natureId}`);
  return natureName;
}

export { getNatureId, getNatureName };
