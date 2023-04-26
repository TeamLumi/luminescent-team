const { abilityNames, abilityInfo } = require('../../../__gamedata');

function makeSmogonAbilityObject(abilityId = 0) {
  const abilitiyString = abilityNames.labelDataArray[abilityId]?.wordDataArray[0]?.str ?? null;
  if (abilitiyString === null) return null;
  return { 0: abilitiyString };
}

function getAbilityIdFromAbilityName(abilityString) {
  if (!abilityString) return -1;
  const abilityId = abilityNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === abilityString);
  if (abilityId === -1) throw Error(`Bad ability name: ${abilityString}`);
  return abilityId;
}

function getAbilityString(abiltiyId = 0) {
  const abilityString = abilityNames.labelDataArray[abiltiyId]?.wordDataArray[0]?.str ?? null;
  if (!abilityString) {
    return null;
  }
  return abilityString;
}

function getAbilityInfo(id) {
  const wordData = abilityInfo.labelDataArray[id]?.wordDataArray;
  if (wordData === null || wordData === undefined || wordData.length === 0) return 'None';
  let description = wordData.reduce((abilityDescription, currentString) => {
    return abilityDescription + currentString.str + ' ';
  }, '');

  return description.trim();
}

export { makeSmogonAbilityObject, getAbilityIdFromAbilityName, getAbilityString, getAbilityInfo };
