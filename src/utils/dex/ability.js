const { abilityNames } = require('../../../__gamedata');

function makeSmogonAbilityObject(abilityId = 0) {
  const abilitiyString = abilityNames.labelDataArray[abilityId].wordDataArray[0].str;

  return { 0: abilitiyString };
}

function getAbilityIdFromAbilityName(abilityString) {
  if (!abilityString) return -1;
  const abilityId = abilityNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === abilityString);
  if (abilityId === -1) throw Error(`Bad ability name: ${abilityString}`);
  return abilityId;
}

function getAbilityString(abiltiyId = 0) {
  const abilityString = abilityNames.labelDataArray[abiltiyId].wordDataArray[0].str;
  if (!abilityString) {
    console.warn(abilityString, abiltiyId);
  }
  return abilityString;
}

function getAbilityInfo(id) {
  return abilityInfo.labelDataArray[id]?.wordDataArray[0]?.str || 'None';
}

export { makeSmogonAbilityObject, getAbilityIdFromAbilityName, getAbilityString, getAbilityInfo };
