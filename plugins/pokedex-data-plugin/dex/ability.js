const { AbilityNames, AbilityInfo, GAMEDATA2 } = require('../../../__gamedata');

function makeSmogonAbilityObject(abilityId = 0, mode = GAMEDATA2) {
  const ModeAbilityNames = AbilityNames[mode];
  const abilityString = ModeAbilityNames.labelDataArray[abilityId]?.wordDataArray[0]?.str ?? null;
  if (abilityString === null || !abilityString) throw Error(`Bad ability ID: ${abilityId}`);
  return { 0: abilityString };
}

function getAbilityIdFromAbilityName(abilityString, mode = GAMEDATA2) {
  if (!abilityString) throw Error(`Bad ability string: ${abilityString}`);
  const ModeAbilityNames = AbilityNames[mode];

  let abilityId = ModeAbilityNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === abilityString);

  if (abilityId === -1) {
    abilityId = 0;
    console.error(`Bad ability string: ${abilityString}`)
  };
  return abilityId;
}

function getAbilityString(abilityId = 0, mode = GAMEDATA2) {
  const ModeAbilityNames = AbilityNames[mode];
  const abilityName = ModeAbilityNames.labelDataArray[abilityId]?.wordDataArray[0]?.str ?? null;
  if (abilityName === null || !abilityName) throw Error(`Bad ability ID: ${abilityId}`);
  return abilityName;
}

function getAbilityInfo(id, mode = GAMEDATA2) {
  const ModeAbilityInfo = AbilityInfo[mode];
  const wordData = ModeAbilityInfo.labelDataArray[id]?.wordDataArray;
  if (wordData === null || wordData === undefined || wordData.length === 0) return 'None';
  const description = wordData.reduce((abilityDescription, currentString) => {
    return abilityDescription + currentString.str + ' ';
  }, '');

  return description.trim();
}

function getAllAbilities(mode = GAMEDATA2) {
  const ModeAbilityNames = AbilityNames[mode];

  if (!ModeAbilityNames?.labelDataArray) {
    throw new Error(`Invalid AbilityNames table for mode: ${mode}`);
  }

  return ModeAbilityNames.labelDataArray
    .map((label, abilityId) => {
      const name = label?.wordDataArray?.[0]?.str;
      if (!name) return null;

      return {
        id: abilityId,
        name,
      };
    })
    .filter(Boolean) // remove null / invalid entries
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
}

module.exports = {
  makeSmogonAbilityObject,
  getAbilityIdFromAbilityName,
  getAbilityString,
  getAbilityInfo,
  getAllAbilities,
};
