import { pokemonLocations } from '../../../__gamedata';
import {
  ENC_TYPES, GREAT_MARSH_MAP,
} from './encountersConstants';

function combineEncounterTypes(encounterData) {
  const combinedEncounters = {};

  encounterData.forEach((encounter) => {
    const isGreatMarsh = encounter.name.includes("Great Marsh");
    const isChateau = encounter.name.includes("Old Chateau");
    const isTCave = encounter.name.includes("Turnback Cave")
    const isTCaveEntrance = encounter.name.includes("Turnback Cave - Entrance")
    const isInside = /Mt\. Coronet(?! Summit|Snow Area)|Mine|Temple|Gate|Cave|Ravaged Path|Victory Road|Mountain|Lost Tower|Iron Island|Ruins|Tunnel|Chateau(?!.*\(Outside\)|\(Overworld\))/i.test(encounter.name);

    const isRadar = encounter.method.includes("Radar");
    const isMorning = encounter.method.includes("Morning");
    const isDay = encounter.method.includes("Day");
    const isNight = encounter.method.includes("Night");
    const isSwarm = encounter.method.includes("Swarm");

    const isDayOrNight = isDay || isNight;
    const isMarshRadar = isGreatMarsh && isRadar;
    const isInsideRadar = isInside && isRadar;
    const isInsideSwarm = isInside && isSwarm;
    const isInsideDayOrNight = isInside && isDayOrNight;
    const isNotTCaveEntrance = isTCave && !isTCaveEntrance
    const isBadArea = isMarshRadar || isInsideRadar || isInsideDayOrNight  || isInsideSwarm || isNotTCaveEntrance

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
    if (!combinedEncounters[key] && !isBadArea) {
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