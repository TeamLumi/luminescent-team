import { trainerLocations } from "../../../__gamedata";

function getTrainersFromZoneId(zoneId) {
  if (zoneId === null) {
    return [];
  }
  const zoneKey = zoneId.toString();
  if (zoneKey in trainerLocations) {
    return trainerLocations[zoneKey];
  }
  console.warn(`${zoneKey} is not in the Trainer List.`);
  return [];
};

export {
  getTrainersFromZoneId
}