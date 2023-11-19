import { encounterLocations } from '../../../__gamedata';
import {
  SURF_ENC,
  ENC_TYPES,
  GRASS,
  ROD_ENC,
  TIME_OF_DAY_ENC,
  RADAR_ENC,
  SWARM_ENC,
  HONEY,
  INCENSE,
  SURF_INCENSE
} from './encountersConstants';

function getAreaEncounters(zoneName) {
  if (zoneName in encounterLocations) {
    const areaEncounters = encounterLocations[zoneName]
    const mappedEncounters = areaEncounters.map(encounter => ({
      ...encounter,
      encounterType: ENC_TYPES[encounter.encounterType] || encounter.encounterType,
    }));
    return mappedEncounters;
  }
  console.warn(`${zoneName} is not in the Encounter List.`);
  return null;
};

function getAllGroundEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === "Grass");
  if (filteredEncounters) {
    return filteredEncounters;
  }
  return []
};

function getAllRodEncounters(areaEncounters, rod=1) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === ROD_ENC[rod - 1]);
  if (filteredEncounters) {
    return filteredEncounters;
  }
  return []
};

function getAllSurfingEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === SURF_ENC);
  if (filteredEncounters) {
    return filteredEncounters;
  }
  return []
};

function getSurfingIncenseEncounter(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === SURF_INCENSE);
  if (filteredEncounters) {
    return filteredEncounters;
  }
  return []
}

function getAllIncenseEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === INCENSE);
  if (filteredEncounters) {
    return filteredEncounters;
  }
  return []
};

function getTimeOfDayEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => TIME_OF_DAY_ENC.includes(obj.encounterType));
  if (filteredEncounters) {
    return filteredEncounters;
  }
  return []
};

function getRadarEncounter(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === RADAR_ENC);
  if (filteredEncounters) {
    return filteredEncounters;
  }
  return []
};

function getSwarmEncounter(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === SWARM_ENC);
  if (filteredEncounters) {
    return filteredEncounters;
  }
  return []
};

function getAllHoneyTreeEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === HONEY);
  if (filteredEncounters) {
    return filteredEncounters;
  }
  return []
};

export {
  getAllGroundEncounters,
  getAllIncenseEncounters,
  getAllRodEncounters,
  getAllSurfingEncounters,
  getSurfingIncenseEncounter,
  getAreaEncounters,
  getRadarEncounter,
  getSwarmEncounter,
  getTimeOfDayEncounters,
  getAllHoneyTreeEncounters
}