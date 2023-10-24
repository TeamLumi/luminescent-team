const { abilityNames, abilityInfo } = require("../__gamedata");

function makeSmogonAbilityObject(abilityId = 0) {
  const abilityString = abilityNames[abilityId]?.str ?? null;
  if (abilityString === null || !abilityString)
    throw Error(`Bad ability ID: ${abilityId}`);
  return { 0: abilityString };
}

function getAbilityIdFromAbilityName(abilityString) {
  if (!abilityString) throw Error(`Bad ability string: ${abilityString}`);

  const abilityId = abilityNames.findIndex((e) => e.str === abilityString);

  if (abilityId === -1) throw Error(`Bad ability string: ${abilityString}`);
  return abilityId;
}

function getAbilityString(abiltiyId = 0) {
  const abilityName = abilityNames[abiltiyId]?.str ?? null;
  if (abilityName === null || !abilityName)
    throw Error(`Bad ability ID: ${abiltiyId}`);
  return abilityName;
}

function getAbilityInfo(labelIndex) {
  const labelData = abilityInfo.labelDataArray.find(
    (data) => data.labelIndex === labelIndex
  );

  if (
    !labelData ||
    !labelData.wordDataArray ||
    labelData.wordDataArray.length === 0
  ) {
    return "None";
  }

  const description = labelData.wordDataArray.reduce(
    (abilityDescription, currentString) => {
      return abilityDescription + currentString.str + " ";
    },
    ""
  );

  return description.trim();
}

module.exports = {
  makeSmogonAbilityObject,
  getAbilityIdFromAbilityName,
  getAbilityString,
  getAbilityInfo,
};
