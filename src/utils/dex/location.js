const { displayNames, areaNames,  mapInfo, field_items, hidden_items } = require('../../../__gamedata');

// This first section is using the areas_updated.csv for its data
const areasList = [];

function createZoneIdMap() {
  /** This needs to be initialized first in order to use the getZoneID function */
  const zoneMap = {};
  areasList.forEach((place, index) => {
    const zoneIndex = index - 1;
    const zoneName = areasList[zoneIndex][areasList[zoneIndex].length - 1];
    const zoneId = areasList[zoneIndex][0];
    zoneMap[zoneName] = zoneId;
  });
  return zoneMap
};

function getZoneIdFromCSV(zoneName, zoneMap) {
  if (zoneName in zoneMap) {
    return parseInt(zoneMap[zoneName])
  } else {
    return null
  };
};

function getZoneNameFromCSV(zoneId) {
  if (!zoneId) {
    return null
  }
  const zones = areasList[zoneId + 1]; //Adds 1 because this is the index of the csv rows which starts at -1 bc of the title
  const zoneName = zones[3] != "" ? zones[3] : zones[4];
  return zoneName
};


// This next section uses the in game files for the zone names
function getZoneNameFromDisplayName(displayName) {
  if(displayName === undefined) return null;

  const zoneName = displayNames.labelDataArray
    .find(e => e.labelName === displayName)
    ?.wordDataArray[0].str;

  if (zoneName) {
    return zoneName;
  } else {
    return null;
  }
};

function getZoneNameFromAreaName(areaName) {
  if(areaName === undefined) return null;
  const zoneName = areaNames.labelDataArray
    .find(e => e?.wordDataArray[0]?.str === areaName)
    ?.wordDataArray[0].str;

  if (zoneName !== -1) {
    return zoneName;
  } else {
    return null;
  }
};

function getZoneNameFromZoneId(zoneId) {
  const mapInfoIndex = mapInfo['ZoneData'].findIndex((e) => e.ZoneId === zoneId);
  const zoneNameObjectLabel = mapInfo['ZoneData'][mapInfoIndex]?.MSLabel ?? "";

  const zoneName = zoneNameObjectLabel !== "" 
    ? getZoneNameFromDisplayName(mapInfo.ZoneData[mapInfoIndex].MSLabel)
    : getZoneNameFromAreaName(mapInfo.ZoneData[mapInfoIndex].PokePlaceName);

  return zoneName;
};

function getDisplayNameFromZoneName(zoneName) {
  if(zoneName === undefined) return null;

  const displayName = displayNames.labelDataArray
    .find(e => e?.wordDataArray[0]?.str === zoneName)
    .labelName;

  if (displayName) {
    return displayName;
  } else {
    return null;
  }
};

function getAreaNameFromZoneName(zoneName) {
  if(zoneName === undefined) return null;

  const areaName = areaNames.labelDataArray
    .find(e => e?.wordDataArray[0]?.str === zoneName)
    ?.labelName;
    
  if (areaName) {
    return areaName;
  } else {
    return null;
  }
};

function getZoneIdFromZoneName(zoneName) {
  const displayName = getDisplayNameFromZoneName(zoneName);
  const areaName = getAreaNameFromZoneName(zoneName);
  
  const mapInfoIndex = displayName 
    ? mapInfo.ZoneData.findIndex((e) => e.MSLabel === displayName)
    : mapInfo.ZoneData.findIndex((e) => e.PokePlaceName === areaName);

  const zoneId = mapInfo.ZoneData[mapInfoIndex]?.ZoneID ?? -1;
  if (zoneId !== -1) {
    return zoneId;
  } else {
    return null;
  }
}

function getFieldItemsFromZoneID(zoneID) {
  if(typeof zoneID !== 'number' || zoneID < 0) {
    console.warn('Invalid ZoneID supplied', zoneID);
    return [];
  }

  return field_items[zoneID] ?? [];
}

function getHiddenItemsFromZoneID(zoneID) {
  if(typeof zoneID !== 'number' || zoneID < 0) {
    console.warn('Invalid ZoneID supplied');
    return [];
  }

  return hidden_items[zoneID] ?? [];
}

export {
  getZoneIdFromZoneName,
  getZoneNameFromZoneId,
  createZoneIdMap,
  getZoneIdFromCSV,
  getZoneNameFromCSV,
  getFieldItemsFromZoneID,
  getHiddenItemsFromZoneID
};