import { pokemonLocations, staticLocations, encounterLocations } from '../../../__gamedata';
import {
  ENC_TYPES,
  GREAT_MARSH_MAP,
  SURF_ENC,
  GRASS,
  ROD_ENC,
  TIME_OF_DAY_ENC,
  RADAR_ENC,
  SWARM_ENC,
  HONEY,
  INCENSE,
  SURF_INCENSE
} from './encountersConstants';
import { getPokemonName } from './name';

function getEncounterObject(encounter) {
  return {
    name: encounter.name,
    method: encounter.method,
    chance: parseFloat(encounter.chance),
    minLevel: encounter.minLevel,
    maxLevel: encounter.maxLevel,
    link: encounter.link ?? null,
  };
}

function containsAllTOD(todEncounters) {
  const desiredEncounterTypes = ["Morning", "Day", "Night"];

  const hasAllEncounterTypes = desiredEncounterTypes.every(type =>
    todEncounters.some(encounter => encounter.method === type)
  );
  return hasAllEncounterTypes;
}

function combineEncounterTypes(encounterData) {
  const combinedEncounters = {};
  const todEncounters = {};

  encounterData.forEach((encounter) => {
    const { isTOD, isBadArea } = checkIsBadArea(encounter);
    
    const key = `${encounter.name}_${encounter.method}`;
    if (isTOD && !isBadArea) {
      if (!todEncounters[encounter.name]) {
        todEncounters[encounter.name] = [getEncounterObject(encounter)]
      } else {
        todEncounters[encounter.name].push(getEncounterObject(encounter))
      }
    } else if (!combinedEncounters[key] && !isBadArea) {
      combinedEncounters[key] = getEncounterObject(encounter);
    } else if (!isBadArea) {
      combinedEncounters[key].chance += parseFloat(encounter.chance);
    }
  });

  addTODEncounters(todEncounters, combinedEncounters);
  return Object.values(combinedEncounters);;
}

function checkIsBadArea(encounter) {
  const isGreatMarsh = encounter.name.includes("Great Marsh");
  const isChateau = encounter.name.includes("Old Chateau");
  const isTCave = encounter.name.includes("Turnback Cave");
  const isTCaveEntrance = encounter.name.includes("Turnback Cave - Entrance");
  const isInside = /Mt\. Coronet(?! Summit|Snow Area)|Mine|Temple|Gate|Cave|Ravaged Path|Victory Road|Mountain|Lost Tower|Iron Island|Ruins|Tunnel|Chateau(?!.*\(Outside\)|\(Overworld\))/i.test(encounter.name);

  const isRadar = encounter.method.includes("Radar");
  const isMorning = encounter.method.includes("Morning");
  const isDay = encounter.method.includes("Day");
  const isNight = encounter.method.includes("Night");
  const isSwarm = encounter.method.includes("Swarm");
  const isStatic = encounter.method.includes("Static");

  const isDayOrNight = isDay || isNight;
  const isTOD = isDay || isNight || isMorning;
  const isMarshRadar = isGreatMarsh && isRadar;
  const isInsideRadar = isInside && isRadar;
  const isInsideSwarm = isInside && isSwarm;
  const isInsideDayOrNight = isInside && isDayOrNight;
  const isNotTCaveEntrance = isTCave && !isTCaveEntrance;
  const isBadArea = isMarshRadar || isInsideRadar || isInsideDayOrNight || isInsideSwarm || isNotTCaveEntrance;

  if (isGreatMarsh) {
    encounter.name = GREAT_MARSH_MAP[encounter.name];
    encounter.chance = parseInt(encounter.chance) / 2;
  }
  if (isChateau && !isStatic) {
    encounter.name = "Old Chateau";
    encounter.chance = parseFloat(encounter.chance) / 9;
  }
  if (isInside && isMorning) {
    encounter.method = "Walking";
  }
  return { isTOD, isBadArea };
}

function addTODEncounters(todEncounters, combinedEncounters) {
  for (const locationKey of Object.keys(todEncounters)) {
    const combinedValues = Object.values(combinedEncounters);
    const routeIndex = combinedValues.findLastIndex(
      (enc) => enc.name === locationKey
    );

    if (containsAllTOD(todEncounters[locationKey])) {
      if (!combinedEncounters[`${locationKey}_Walking`]) {
        combinedEncounters[`${locationKey}_Walking`] = { ...todEncounters[locationKey][0], method: "Walking" };
      } else {
        combinedEncounters[`${locationKey}_Walking`].chance += parseFloat(todEncounters[locationKey][0].chance);
      }
    } else if (routeIndex !== -1) {
      todEncounters[locationKey].forEach((encounter) => {
        const routeKey = `${encounter.name}_${encounter.method}`;
        if (!combinedEncounters[routeKey]) {
          combinedEncounters[routeKey] = encounter;
        } else {
          combinedEncounters[routeKey].chance += parseFloat(encounter.chance);
        }
      });
    } else {
      todEncounters[locationKey].forEach((encounter) => {
        const routeKey = `${encounter.name}_${encounter.method}`;
        if (!combinedEncounters[routeKey]) {
          combinedEncounters[routeKey] = encounter;
        } else {
          combinedEncounters[routeKey].chance += parseFloat(encounter.chance);
        }
      });
    }
  }
}

function getRoutesFromPokemonId(pokemonId) {
  const pokemonName = getPokemonName(pokemonId);
  let routes = [];
  if (pokemonLocations[pokemonId] && staticLocations[pokemonName]) {
    routes = pokemonLocations[pokemonId].concat(staticLocations[pokemonName])
  } else if (pokemonLocations[pokemonId]) {
    routes = pokemonLocations[pokemonId]
  } else {
    routes = staticLocations[pokemonName] || []
  }

  const locationRates = routes.map((route) => {
    let method = ENC_TYPES[route.encounterType] ?? route.encounterType;
    let chance = route.encounterRate;
    if (chance === "morning") {
      method = "Morning"
      chance = "10%"
    }
    return (
      {
        name: route.routeName,
        method: method,
        minLevel: route.minLevel,
        maxLevel: route.maxLevel,
        chance: chance,
        link: route.link ?? null,
      }
    );
  });

  return combineEncounterTypes(locationRates);
}

const NO_ENCOUNTERS = null;
const BAD_INPUT = null;

function getAreaEncounters(zoneId) {
  if(typeof zoneId !== 'number' || zoneId.length === 0) {
    return BAD_INPUT;
  }

  if (zoneId in encounterLocations) {
    const areaEncounters = encounterLocations[zoneId];
    const mappedEncounters = areaEncounters.map(encounter => ({
      ...encounter,
      encounterType: ENC_TYPES[encounter.encounterType] || encounter.encounterType,
    }));
    return mappedEncounters;
  }

  console.warn("No encounters were found for this area", zoneId)
  return NO_ENCOUNTERS;
};

function getAllGroundEncounters(areaEncounters) {
  const filteredEncounters = areaEncounters.filter(obj => obj.encounterType === GRASS);
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

function getMapperRoutesFromPokemonId(pokemonId) {
  const routeNames = [];
  const routes = pokemonLocations[pokemonId] || [];

  routes.forEach((route) => {
    if (!routeNames.includes(route.routeName)) {
      routeNames.push([route.routeName, route.zoneId]);
    }
  });

  return routeNames;
}

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
  getAllHoneyTreeEncounters,
  getRoutesFromPokemonId,
  getMapperRoutesFromPokemonId
}
