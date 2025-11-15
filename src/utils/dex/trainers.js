import { TrainerLocations, GAMEDATA2 } from "../../../__gamedata";

function getTrainersFromZoneId(zoneId, mode = GAMEDATA2) {
  if (zoneId === null) {
    return [];
  }
  let zoneKey = zoneId.toString();
  if (zoneId === 327) { // Put the Lake Valor Before trainers
    zoneKey = "326" // To be at the Lake Valor After for ease of use.
  }
  if (zoneKey in TrainerLocations[mode]) {
    return TrainerLocations[mode][zoneKey];
  }
  console.warn(`${zoneKey} is not in the Trainer List.`);
  return [];
};

export {
  getTrainersFromZoneId
}