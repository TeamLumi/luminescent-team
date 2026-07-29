import { TrainerLocations, GAMEDATA2 } from "../../../__gamedata";

function getTrainersFromZoneId(zoneId, mode = GAMEDATA2) {
  if (zoneId === null) {
    return [];
  }
  let zoneKey = zoneId.toString();
  if (zoneKey === "327") { // Put the Lake Valor Before trainers
    zoneKey = "326" // To be at the Lake Valor After for ease of use.
  }
  if (zoneKey in TrainerLocations[mode]) {
    return TrainerLocations[mode][zoneKey].map(t => ({ ...t, trainerId: t.trainer_id }));
  }
  console.warn(`${zoneKey} is not in the Trainer List.`);
  return [];
};

function getZoneIdFromTrainerId(trainerId, mode = GAMEDATA2) {
  if (!trainerId) return null;
  
  for (const zoneKey in TrainerLocations[mode]) {
    const trainers = TrainerLocations[mode][zoneKey];
    const trainer = trainers.find(t => t.trainer_id === parseInt(trainerId));
    if (trainer) {
      return parseInt(zoneKey);
    }
  }
  
  console.warn(`Trainer ID ${trainerId} not found in any zone.`);
  return null;
};

function getFullTrainerById(trainerId, mode = GAMEDATA2) {
  if (!trainerId) return null;

  for (const zoneKey in TrainerLocations[mode]) {
    const trainers = TrainerLocations[mode][zoneKey];
    const trainer = trainers.find(t => t.trainer_id === parseInt(trainerId));
    if (trainer) {
      return { ...trainer, trainerId: trainer.trainer_id, zoneId: parseInt(zoneKey) };
    }
  }

  return null;
};

function getAllTrainers(mode = GAMEDATA2) {
  const seen = new Set();
  const trainers = [];
  for (const zoneKey in TrainerLocations[mode]) {
    for (const trainer of TrainerLocations[mode][zoneKey]) {
      if (seen.has(trainer.trainer_id)) continue;
      seen.add(trainer.trainer_id);
      trainers.push({
        trainerId: trainer.trainer_id,
        zoneId: parseInt(zoneKey),
        name: trainer.name,
        route: trainer.route,
        team_name: trainer.team_name,
        trainerType: trainer.trainerType,
        label: `${trainer.team_name} (${trainer.trainer_id})`,
      });
    }
  }
  return trainers;
};

export {
  getTrainersFromZoneId,
  getZoneIdFromTrainerId,
  getFullTrainerById,
  getAllTrainers,
}
