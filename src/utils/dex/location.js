const {
  DisplayNames,
  AreaNames,
  MapInfo,
  FieldItems,
  HiddenItems,
  GAMEDATA2,
  GAMEDATA3
} = require('../../../__gamedata');
import { areasList3 } from '../../../__gamedata/gamedata3.0/areas';
import { areasList2 } from '../../../__gamedata/gamedata2.0/areas';
// This first section is using the areas_updated.csv for its data
const AreaMap = {
  [GAMEDATA2]: {},
  [GAMEDATA3]: {},
};

const lines = areasList2.split('\n');
const headers = lines[0].split(",");
lines.slice(1).forEach(line => {
  const values = line.split(",");
  const zoneId = parseInt(values[0]);
  AreaMap[GAMEDATA2][zoneId] = Object.fromEntries(headers.map((header, index) => [header, values[index]]));
});

const lines3 = areasList3.split('\n');
const headers3 = lines[0].split(",");
lines3.slice(1).forEach(line => {
  const values = line.split(",");
  const zoneId = parseInt(values[0]);
  AreaMap[GAMEDATA3][zoneId] = Object.fromEntries(headers3.map((header, index) => [header, values[index]]));
});

function getZoneCodeFromCSV(zoneId, mode = GAMEDATA2) {
  if (!zoneId) {
    console.warn("Invalid Zone Id", zoneId);
    return null;
  }
  return AreaMap[mode][zoneId]?.Zone_Code;
};

function getZoneIdFromZoneCode(zoneCode, mode = GAMEDATA2) {
  if (!zoneCode) {
    return null;
  }
  const zoneId = Object.keys(AreaMap[mode]).find(key => AreaMap[mode][key]?.Zone_Code === zoneCode);
  return parseInt(zoneId);
}

function getZoneNameFromZoneCode(zoneCode, mode = GAMEDATA2) {
  if (!zoneCode) {
    return null;
  }
  const zoneId = Object.keys(AreaMap[mode]).find(key => AreaMap[mode][key]?.Zone_Code === zoneCode.toUpperCase());
  if (!zoneId) {
    console.warn("This zoneCode doesn't have a zoneId", zoneCode);
  }
  const zoneName = AreaMap[mode][zoneId]?.Actual
  return zoneName;
}

// This next section uses the in game files for the zone names
function getZoneNameFromDisplayName(displayName, mode = GAMEDATA2) {
  if(displayName === undefined) return null;
  const ModeDisplayNames = DisplayNames[mode];

  const zoneName = ModeDisplayNames.labelDataArray
    .find(e => e.labelName === displayName)
    ?.wordDataArray[0].str;

  if (zoneName) {
    return zoneName;
  } else {
    return null;
  }
};

function getZoneNameFromAreaName(areaName, mode = GAMEDATA2) {
  if(areaName === undefined) return null;
  const ModeAreaNames = AreaNames[mode];
  const zoneName = ModeAreaNames.labelDataArray
    .find(e => e?.wordDataArray[0]?.str === areaName)
    ?.wordDataArray[0].str;

  if (zoneName !== -1) {
    return zoneName;
  } else {
    return null;
  }
};

function getZoneNameFromZoneId(zoneId, mode = GAMEDATA2) {
  const ModeMapInfo = MapInfo[mode];
  const mapInfoIndex = ModeMapInfo.ZoneData.findIndex((e) => e.ZoneId === zoneId);
  const zoneNameObjectLabel = ModeMapInfo.ZoneData[mapInfoIndex]?.MSLabel ?? "";

  const zoneName = zoneNameObjectLabel !== "" 
    ? getZoneNameFromDisplayName(ModeMapInfo.ZoneData[mapInfoIndex]?.MSLabel)
    : getZoneNameFromAreaName(ModeMapInfo.ZoneData[mapInfoIndex]?.PokePlaceName);

  return zoneName;
};

function getDisplayNameFromZoneName(zoneName, mode = GAMEDATA2) {
  if(zoneName === undefined) return null;
  const ModeDisplayNames = DisplayNames[mode];

  const displayName = ModeDisplayNames.labelDataArray
    .find(e => e?.wordDataArray[0]?.str === zoneName)
    ?.labelName;

  if (displayName) {
    return displayName;
  } else {
    return null;
  }
};

function getAreaNameFromZoneName(zoneName, mode = GAMEDATA2) {
  if(zoneName === undefined) return null;
  const ModeAreaNames = AreaNames[mode];

  const areaName = ModeAreaNames.labelDataArray
    .find(e => e?.wordDataArray[0]?.str === zoneName)
    ?.labelName;
    
  if (areaName) {
    return areaName;
  } else {
    return null;
  }
};

function getZoneIdFromZoneName(zoneName, mode = GAMEDATA2) {
  const displayName = getDisplayNameFromZoneName(zoneName, mode = GAMEDATA2);
  const areaName = getAreaNameFromZoneName(zoneName, mode = GAMEDATA2);
  const ModeMapInfo = MapInfo[mode];

  const mapInfoIndex = displayName 
    ? ModeMapInfo.ZoneData.findIndex((e) => e.MSLabel === displayName)
    : ModeMapInfo.ZoneData.findIndex((e) => e.PokePlaceName === areaName);

  const zoneId = ModeMapInfo.ZoneData[mapInfoIndex]?.ZoneID ?? -1;
  if (zoneId !== -1) {
    return zoneId;
  } else {
    return null;
  }
}

function getFieldItemsFromZoneID(zoneID, mode = GAMEDATA2) {
  if(typeof zoneID !== 'number' || zoneID < 0) {
    console.warn("Invalid zoneID", zoneID);
    return [];
  }
  const ModeFieldItems = FieldItems[mode];

  return ModeFieldItems[zoneID] ?? [];
}

function getHiddenItemsFromZoneID(zoneID, mode = GAMEDATA2) {
  if(typeof zoneID !== 'number' || zoneID < 0) {
    return [];
  }
  const ModeHiddenItems = HiddenItems[mode];

  return ModeHiddenItems[zoneID] ?? [];
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