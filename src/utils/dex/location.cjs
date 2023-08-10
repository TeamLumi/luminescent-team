const { encounterData } = require('../../../__gamedata');

const cityAndTownNames = [
  'Twinleaf Town',
  'Sandgem Town',
  'Jubilife City',
  'Oreburgh City',
  'Floaroma Town',
  'Eterna City',
  'Veilstone City',
  'Celestic Town',
  'Pastoria City',
  'Hearthome City',
  'Solaceon Town',
  'Canalave City',
  'Snowpoint City',
  'Sunyshore City',
  'Pokemon League',
];

const locationsToFilter = ['Lake Verity (Before)'];

function getEncounterLocations(monsNo) {
  if (!encounterData[monsNo]) {
    throw new Error(`Bad pokemon ID: ${monsNo}`);
  }

  const locations = [];
  const groupedCitiesAndTowns = [];

  for (const location of encounterData[monsNo]) {
    let enc_type = location['encounterType'];
    let enc_location = location['routeName'];
    const enc_level = location['maxLevel'];
    let enc_rate = location['encounterRate'];

    // Convert the encounter rate to a numerical value.
    if (enc_rate === 'morning') {
      enc_rate = 10;
      enc_type = 'Morning';
    } else {
      enc_rate = parseInt(enc_rate.split('%')[0]);
    }

    const isRouteLocation = enc_location.toLowerCase().startsWith('route');
    const isCityOrTownLocation = cityAndTownNames.includes(enc_location);

    const nameWithFloor = enc_location.match(/.*?(?=\s-)|.*/i);
    const mainLocationName = nameWithFloor ? nameWithFloor[0] : enc_location;
    const mainLocationNamePattern = new RegExp(mainLocationName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    // Compress locations with similar names, encounter types and levels.
    const similarLocation = locations.find((loc) =>
      loc.encounters.some(
        (enc) =>
          enc.type === enc_type &&
          enc.level === enc_level &&
          ((isRouteLocation && loc.location.toLowerCase().startsWith('route')) ||
            (!isRouteLocation && mainLocationNamePattern.test(loc.location))),
      ),
    );

    const existingEncounter = similarLocation
      ? similarLocation.encounters.find((enc) => enc.type === enc_type && enc.level === enc_level)
      : null;

    if (similarLocation && existingEncounter) {
      if (similarLocation.location === enc_location) {
        existingEncounter.rate += enc_rate;
      }
    } else {
      const targetArray = isCityOrTownLocation ? groupedCitiesAndTowns : locations;

      const existingLocation = targetArray.find((loc) => loc.location === enc_location);

      if (existingLocation) {
        existingLocation.encounters.push({
          type: enc_type,
          level: enc_level,
          rate: enc_rate,
        });
      } else {
        targetArray.push({
          location: enc_location,
          encounters: [
            {
              type: enc_type,
              level: enc_level,
              rate: enc_rate,
            },
          ],
        });
      }
    }
  }

  const groupedLocations = groupLocations(locations);
  const mergedLocations = mergeCitiesAndTowns(groupedCitiesAndTowns, groupedLocations);
  const cleanedLocations = cleanLocations(mergedLocations);
  const optimizedLocations = optimizeLocations(cleanedLocations);

  return optimizedLocations;
}

function groupLocations(locations) {
  // Group all locations that have the same locations names in the array.
  const groupedLocations = [];
  for (const location of locations) {
    const existingGroupedLocation = groupedLocations.find((loc) => loc.location === location.location);

    if (existingGroupedLocation) {
      existingGroupedLocation.encounters.push(...location.encounters);
    } else {
      groupedLocations.push(location);
    }
  }

  return groupedLocations;
}

function mergeCitiesAndTowns(groupedCitiesAndTowns, groupedLocations) {
  // Group all locations within the CitiesAndTowns array and merge with the previous array.
  const mergedCitiesAndTowns = [];
  const encounterMap = new Map();

  for (const location of groupedCitiesAndTowns) {
    const key = `${location.encounters[0].type}-${location.encounters[0].level}-${location.encounters[0].rate}`;

    if (encounterMap.has(key)) {
      const existingLocationIndex = encounterMap.get(key);
      mergedCitiesAndTowns[existingLocationIndex].location += `, ${location.location}`;
    } else {
      encounterMap.set(key, mergedCitiesAndTowns.length);
      mergedCitiesAndTowns.push(location);
    }
  }
  groupedLocations.unshift(...mergedCitiesAndTowns);

  return groupedLocations;
}

function cleanLocations(groupedLocations) {
  // Clean and compress location names for visability.
  const cleanedLocations = groupedLocations.map((location) => {
    const mainLocationName = location.location.match(/.*?(?=\s-)|.*/i)[0];
    let encounteredMainName = false;

    const cleanedName = location.location.replace(new RegExp(mainLocationName, 'g'), (match) => {
      if (
        !location.location.toLowerCase().startsWith('route') &&
        encounteredMainName &&
        match.trim() === mainLocationName.trim()
      ) {
        return '';
      } else {
        encounteredMainName = true;
        return match;
      }
    });

    // Clean up extra instances of the hyphen.
    const cleanedNameWithoutExtraHyphen = cleanedName.replace(/-\s?/g, (match, offset) => {
      if (offset > 0) {
        return '';
      } else {
        return match;
      }
    });

    // Clean up extra instances of the word 'Route'.
    const cleanedNameWithoutExtraRoute = cleanedNameWithoutExtraHyphen.replace(/Route\s/gi, (match, offset) => {
      if (offset > 0) {
        return '';
      } else {
        return match;
      }
    });

    const cleanedNameWithoutAfter = cleanedNameWithoutExtraRoute.replace(/\s?\(after\)/gi, '');

    return { ...location, location: cleanedNameWithoutAfter };
  });

  return cleanedLocations;
}

function optimizeLocations(cleanedLocations) {
  const optimizedLocations = [];
  // Separate the morning/day/night encounters from the other encounters and replace with 'ground_mons' if they all exist with the same rates.
  for (const location of cleanedLocations) {
    const { location: locName, encounters: originalEncounters } = location;

    const morningDayNightEncounters = originalEncounters.filter(
      (enc) => enc.type === 'Morning' || enc.type === 'day' || enc.type === 'night',
    );

    const otherEncounters = originalEncounters.filter(
      (enc) => enc.type !== 'Morning' && enc.type !== 'day' && enc.type !== 'night',
    );

    const sameRateAndLevel =
      morningDayNightEncounters.length === 3 &&
      morningDayNightEncounters.every((enc, index, arr) => enc.rate === arr[0].rate && enc.level === arr[0].level);

    if (sameRateAndLevel) {
      const groundMonsEncounter = {
        type: 'ground_mons',
        level: morningDayNightEncounters[0].level,
        rate: morningDayNightEncounters[0].rate,
      };

      const existingGroundMonsIndex = otherEncounters.findIndex(
        (enc) => enc.type === 'ground_mons' && enc.level === groundMonsEncounter.level,
      );

      if (existingGroundMonsIndex !== -1) {
        otherEncounters[existingGroundMonsIndex].rate += groundMonsEncounter.rate;
      } else {
        otherEncounters.push(groundMonsEncounter);
      }

      optimizedLocations.push({
        location: locName,
        encounters: otherEncounters,
      });
    } else {
      optimizedLocations.push(location);
    }
  }

  const filteredLocations = optimizedLocations.filter((location) => !locationsToFilter.includes(location.location));

  return filteredLocations;
}

module.exports = { getEncounterLocations };
