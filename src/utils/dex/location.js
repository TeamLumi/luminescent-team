const { displayNames, areaNames,  mapInfo, field_items, hidden_items } = require('../../../__gamedata');
const { areasList } = require('../../../__gamedata/areas');

// This first section is using the areas_updated.csv for its data
const AreaMap = {}
const lines = areasList.split('\n');
const headers = lines[0].split(",");
lines.slice(1).forEach(line => {
  const values = line.split(",");
  const zoneId = parseInt(values[0]);
  AreaMap[zoneId] = Object.fromEntries(headers.map((header, index) => [header, values[index]]));
});

function getZoneCodeFromCSV(zoneId) {
  if (!zoneId) {
    return null;
  }
  return AreaMap[zoneId]?.Zone_Code;
};

function getZoneIdFromZoneCode(zoneCode) {
  if (!zoneCode) {
    return null;
  }
  const zoneId = Object.keys(AreaMap).find(key => AreaMap[key]?.Zone_Code === zoneCode);
  return parseInt(zoneId);
}

function getZoneNameFromZoneCode(zoneCode) {
  if (!zoneCode) {
    return null;
  }
  const zoneId = Object.keys(AreaMap).find(key => AreaMap[key]?.Zone_Code === zoneCode.toUpperCase());
  const zoneName = AreaMap[zoneId].Actual
  return zoneName;
}

// This next section uses the in game files for the zone names
function getZoneNameFromDisplayName(displayName) {
  if(displayName === undefined) return null;

  const zoneName = displayNames.labelDataAr
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
    ? getZoneNameFromDisplayName(mapInfo.ZoneData[mapInfoIndex]?.MSLabel)
    : getZoneNameFromAreaName(mapInfo.ZoneData[mapInfoIndex]?.PokePlaceName);

  return zoneName;
};

function getDisplayNameFromZoneName(zoneName) {
  if(zoneName === undefined) return null;

  const displayName = displayNames.labelDataArray
    .find(e => e?.wordDataArray[0]?.str === zoneName)
    ?.labelName;

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
  getZoneCodeFromCSV,
  getZoneIdFromZoneCode,
  getZoneNameFromZoneCode,
  getFieldItemsFromZoneID,
  getHiddenItemsFromZoneID
};