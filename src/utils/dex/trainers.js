import { trainerLocations } from "../../../__gamedata";

function getTrainersFromZoneName(zoneName) {
  if (zoneName in trainerLocations) {
    return trainerLocations[zoneName];
  }
  console.warn(`${zoneName} is not in the Trainer List.`);
  return [];
};

export {
  getTrainersFromZoneName
}