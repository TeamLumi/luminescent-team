const { abilityNames, abilityInfo } = require('./data');
const { abilityNames3, abilityInfo3 } = require('./data3');

function makeSmogonAbilityObject(abilityId = 0, mode = "2.0") {
  const AbilityNames = mode === "2.0" ? abilityNames : abilityNames3
  const abilityString = AbilityNames.labelDataArray[abilityId]?.wordDataArray[0]?.str ?? null;
  if (abilityString === null || !abilityString) throw Error(`Bad ability ID: ${abilityId}`);
  return { 0: abilityString };
}

function getAbilityIdFromAbilityName(abilityString, mode = "2.0") {
  if (!abilityString) throw Error(`Bad ability string: ${abilityString}`);
  const AbilityNames = mode === "2.0" ? abilityNames : abilityNames3

  const abilityId = AbilityNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === abilityString);

  if (abilityId === -1) throw Error(`Bad ability string: ${abilityString}`);
  return abilityId;
}

function getAbilityString(abilityId = 0, mode = "2.0") {
  const AbilityNames = mode === "2.0" ? abilityNames : abilityNames3
  const abilityName = AbilityNames.labelDataArray[abilityId]?.wordDataArray[0]?.str ?? null;
  if (abilityName === null || !abilityName) throw Error(`Bad ability ID: ${abilityId}`);
  return abilityName;
}

function getAbilityInfo(id, mode = "2.0") {
  const AbilityInfo = mode === "2.0" ? abilityInfo : abilityInfo3
  const wordData = AbilityInfo.labelDataArray[id]?.wordDataArray;
  if (wordData === null || wordData === undefined || wordData.length === 0) return 'None';
  const description = wordData.reduce((abilityDescription, currentString) => {
    return abilityDescription + currentString.str + ' ';
  }, '');

  return description.trim();
}

module.exports = { makeSmogonAbilityObject, getAbilityIdFromAbilityName, getAbilityString, getAbilityInfo };
