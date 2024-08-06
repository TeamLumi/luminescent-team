import { AbilityNames, AbilityInfo, GAMEDATA2 } from '../../../__gamedata';

function makeSmogonAbilityObject(abilityId = 0, mode = GAMEDATA2) {
  const ModeAbilityNames = AbilityNames[mode];
  const abilityString = ModeAbilityNames.labelDataArray[abilityId]?.wordDataArray[0]?.str ?? null;
  if (abilityString === null || !abilityString) throw Error(`Bad ability ID: ${abilityId}`);
  return { 0: abilityString };
}

function getAbilityIdFromAbilityName(abilityString, mode = GAMEDATA2) {
  if (!abilityString) throw Error(`Bad ability string: ${abilityString}`);
  const ModeAbilityNames = AbilityNames[mode];

  const abilityId = ModeAbilityNames.labelDataArray.findIndex((e) => e.wordDataArray[0].str === abilityString);

  if (abilityId === -1) throw Error(`Bad ability string: ${abilityString}`);
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

export { makeSmogonAbilityObject, getAbilityIdFromAbilityName, getAbilityString, getAbilityInfo };
