const { natureNames } = require("../__gamedata");

function getNatureId(natureString) {
  if (!natureString) throw Error(`Bad natureString: ${natureString}`);
  const index = natureNames.findIndex((e) => e.str === natureString);
  if (index === -1) throw Error(`Bad natureString: ${natureString}`);
  return index;
}

function getNatureName(natureId = 0) {
  return natureNames[natureId].str;
}

module.exports = { getNatureId, getNatureName };
