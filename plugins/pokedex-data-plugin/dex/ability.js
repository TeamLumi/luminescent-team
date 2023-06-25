const { abilityNames, abilityInfo } = require('./data');

function makeSmogonAbilityObject(abilityId = 0) {
  const abilityString = abilityNames.labelDataArray[abilityId]?.wordDataArray[0]?.str ?? null;
  if (abilityString === null || !abilityString) throw Error(`Bad ability ID: ${abilityId}`);
  return { 0: abilityString };
}

function getAbilityIdFromAbilityName(abilityString) {
  if (!abilityString) throw Error(`Bad ability string: ${abilityString}`);

  const abilityId = abilityNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === abilityString);

  if (abilityId === -1) throw Error(`Bad ability string: ${abilityString}`);
  return abilityId;
}

function getAbilityString(abiltiyId = 0) {
  const abilityName = abilityNames.labelDataArray[abiltiyId]?.wordDataArray[0]?.str ?? null;
  if (abilityName === null || !abilityName) throw Error(`Bad ability ID: ${abiltiyId}`);
  return abilityName;
}

function getAbilityInfo(id) {
  const wordData = abilityInfo.labelDataArray[id]?.wordDataArray;
  if (wordData === null || wordData === undefined || wordData.length === 0) return 'None';
  const description = wordData.reduce((abilityDescription, currentString) => {
    return abilityDescription + currentString.str + ' ';
  }, '');

  return description.trim();
}

module.exports = { makeSmogonAbilityObject, getAbilityIdFromAbilityName, getAbilityString, getAbilityInfo };
