import { encounterLocations } from '../../../__gamedata';
import { SURF_ENC, ENC_TYPES, GRASS, ROD_ENC, TOD_ENC, ODD_ENC, HONEY, INCENSE } from './encountersConstants';

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
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === GRASS);
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getAllRodEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => ROD_ENC.includes(obj.encounterType));
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getAllSurfingEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => SURF_ENC.includes(obj.encounterType));
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getAllIncenseEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === INCENSE);
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getTODEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => TOD_ENC.includes(obj.encounterType));
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getOddEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => ODD_ENC.includes(obj.encounterType));
  if (filteredEncounters) {
    return filteredEncounters;
  }
};

function getAllHoneyTreeEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === HONEY);
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