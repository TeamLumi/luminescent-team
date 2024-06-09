import { trainerLocations } from "../../../__gamedata";

function getTrainersFromZoneName(zoneName) {
  if (zoneName in trainerLocations) {
    return trainerLocations[zoneName];
  }
  return null;
};

export {
  getTrainersFromZoneName
}