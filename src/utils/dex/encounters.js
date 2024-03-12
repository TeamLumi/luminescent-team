import { pokemonLocations } from '../../../__gamedata';
import {
  ENC_TYPES, GREAT_MARSH_MAP,
} from './encountersConstants';

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

    const isDayOrNight = isDay || isNight;
    const isTOD = isDay || isNight || isMorning;
    const isMarshRadar = isGreatMarsh && isRadar;
    const isInsideRadar = isInside && isRadar;
    const isInsideSwarm = isInside && isSwarm;
    const isInsideDayOrNight = isInside && isDayOrNight;
    const isNotTCaveEntrance = isTCave && !isTCaveEntrance;
    const isBadArea = isMarshRadar || isInsideRadar || isInsideDayOrNight  || isInsideSwarm || isNotTCaveEntrance;

    if (isGreatMarsh) {
      encounter.name = GREAT_MARSH_MAP[encounter.name];
      encounter.chance = parseInt(encounter.chance) / 2;
    }
    if (isChateau) {
      encounter.name = "Old Chateau";
      encounter.chance = parseFloat(encounter.chance) / 9;
    }
    if (isInside && isMorning) {
      encounter.method = "Walking"
    }
    
    const key = `${encounter.name}_${encounter.method}`;
    if (isTOD && !isBadArea) {
      if (!todEncounters[encounter.name]) {
        todEncounters[encounter.name] = [{
          name: encounter.name,
          method: encounter.method,
          chance: parseFloat(encounter.chance),
          minLevel: encounter.minLevel,
          maxLevel: encounter.maxLevel,
        }]
      } else {
        todEncounters[encounter.name].push({
          name: encounter.name,
          method: encounter.method,
          chance: parseFloat(encounter.chance),
          minLevel: encounter.minLevel,
          maxLevel: encounter.maxLevel,
        })
      }
    } else if (!combinedEncounters[key] && !isBadArea) {
      combinedEncounters[key] = {
        name: encounter.name,
        method: encounter.method,
        chance: parseFloat(encounter.chance),
        minLevel: encounter.minLevel,
        maxLevel: encounter.maxLevel,
      };
    } else if (!isBadArea) {
      combinedEncounters[key].chance += parseFloat(encounter.chance);
    }
  });

  for (const locationKey of Object.keys(todEncounters)) {
    const combinedValues = Object.values(combinedEncounters);
    const routeIndex = combinedValues.findLastIndex(
      (enc) => enc.name === locationKey
    );
    console.log(todEncounters[locationKey], locationKey, containsAllTOD(todEncounters[locationKey]))
    if (containsAllTOD(todEncounters[locationKey])) {
      console.log(locationKey);
      if (!combinedEncounters[`${locationKey}_Walking`]) {
        combinedEncounters[`${locationKey}_Walking`] = {...todEncounters[locationKey][0], method: "Walking"};
      } else {
        combinedEncounters[`${locationKey}_Walking`].chance += parseFloat(todEncounters[locationKey][0].chance);
      }
    } else if (routeIndex !== -1) {
      todEncounters[locationKey].forEach((encounter) => {
        const routeKey = `${encounter.name}_${encounter.method}`
        if (!combinedEncounters[routeKey]) {
          combinedEncounters[routeKey] = encounter
        } else {
          combinedEncounters[routeKey].chance += parseFloat(encounter.chance);
        }
      })
    } else {
      const currentEncounters = todEncounters[locationKey][0]
      const routeKey = `${currentEncounters.name}_${currentEncounters.method}`
      combinedEncounters[routeKey] = currentEncounters
    }
  }

  return Object.values(combinedEncounters);;
}

function getRoutesFromPokemonId(pokemonId) {
  const routes = pokemonLocations[pokemonId] || [];

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
      }
    );
  });

  return combineEncounterTypes(locationRates);
}

export {
  getRoutesFromPokemonId
}