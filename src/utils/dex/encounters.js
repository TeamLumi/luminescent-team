import { encounterLocations } from '../../../__gamedata';

const encounterTypes = {
  "ground_mons": "Grass",
  "tairyo": "Swarm",
  "day": "Day",
  "night": "Night",
  "swayGrass": "Radar",
  "water_mons": "Surfing",
  "boro_mons": "Old Rod",
  "ii_mons": "Good Rod",
  "sugoi_mons": "Super Rod",
}

function getAreaEncounters(zoneName) {
  if (zoneName in encounterLocations) {
    return encounterLocations[zoneName];
  }
  console.warn(`${zoneName} is not in the Encounter List.`);
  return null;
};

function getAllGroundEncounters(zoneName) {
  const areaEncounters = getAreaEncounters(zoneName);
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === "ground_mons");
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getAllRodEncounters(zoneName) {
  const areaEncounters = getAreaEncounters(zoneName);
  const rodEncounters = ["boro_mons", "ii_mons", "sugoi_mons"];
  const filteredEncounters = areaEncounters.filter(obj => rodEncounters.includes(obj.encounterType));
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getAllSurfingEncounters(zoneName) {
  const areaEncounters = getAreaEncounters(zoneName);
  const TODEncounters = ["water_mons", "Surfing Incense"];
  const filteredEncounters = areaEncounters.filter(obj => TODEncounters.includes(obj.encounterType));
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getAllIncenseEncounters(zoneName) {
  const areaEncounters = getAreaEncounters(zoneName);
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === "Incense");
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getTODEncounters(zoneName) {
  const areaEncounters = getAreaEncounters(zoneName);
  const TODEncounters = ["day", "night"];
  const filteredEncounters = areaEncounters.filter(obj => TODEncounters.includes(obj.encounterType));
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getOddEncounters(zoneName) {
  const areaEncounters = getAreaEncounters(zoneName);
  const OddEncounters = ["tairyo", "swayGrass"];
  const filteredEncounters = areaEncounters.filter(obj => OddEncounters.includes(obj.encounterType));
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getAllHoneyTreeEncounters(zoneName) {
  const areaEncounters = getAreaEncounters(zoneName);
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === "Honey Tree");
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

export {
  getAllGroundEncounters,
  getAllIncenseEncounters,
  getAllRodEncounters,
  getAllSurfingEncounters,
  getAreaEncounters,
  getOddEncounters,
  getTODEncounters,
  getAllHoneyTreeEncounters
}