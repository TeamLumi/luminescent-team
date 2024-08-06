import { TrainerLocations, GAMEDATA2 } from "../../../__gamedata";

function getTrainersFromZoneId(zoneId, mode = GAMEDATA2) {
  if (zoneId === null) {
    return [];
  }
  const zoneKey = zoneId.toString();
  if (zoneKey in TrainerLocations[GAMEDATA2]) {
    return TrainerLocations[GAMEDATA2][zoneKey];
  }
  console.warn(`${zoneKey} is not in the Trainer List.`);
  return [];
};

export {
  getTrainersFromZoneId
}