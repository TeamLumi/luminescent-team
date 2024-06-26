import {
  GAMEDATA2,
  ItemNames,
  ShopTable,
  ItemTable,
  ItemMap,
  FixedShop
} from '../../../__gamedata';

const { getZoneCodeFromCSV, getZoneNameFromZoneCode } = require('./location');

function getItemIdFromItemName(itemName, mode = GAMEDATA2) {
  if (!itemName) throw Error(`Bad item name: ${itemName}`);
  const ModeItemNames = ItemNames[mode];
  if (itemName === "King's Rock")
    return ModeItemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === 'King’s Rock');
  const index = ModeItemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === itemName);
  if (index === -1) throw Error(`Bad item name: ${itemName}`);
  return index;
}

function getItemString(itemId = 0, mode = GAMEDATA2) {
  const ModeItemNames = ItemNames[mode];
  if (itemId > ModeItemNames.labelDataArray.length) {
    throw Error(`Bad Item Number: ${itemId}`)
  }
  const itemObject = ModeItemNames.labelDataArray[itemId]
  try {
    itemObject.wordDataArray[0].str;
  } catch (error) {
    throw Error(`This Item does not have name data: ${itemId} ${JSON.stringify(itemObject, undefined, 4)}`);
  }
  return itemObject.wordDataArray[0].str;
}

function getItemPrice(itemId = 0, mode = GAMEDATA2) {
  const ModeItemTable = ItemTable[mode];
  return ModeItemTable.Item[itemId].price;
}

function getBattleItemPrice(itemId = 0, mode = GAMEDATA2) {
  const ModeItemTable = ItemTable[mode];
  return ModeItemTable.Item[itemId].bp_price;
}

function getRegularShopItems(zoneId) {
  const excludedZones = [473, 456, 422];
  const zoneCode = getZoneCodeFromCSV(zoneId + 1);
  if (
    zoneCode.startsWith("C") ||
    (zoneCode.startsWith("T") && !excludedZones.includes(zoneId))
    ) {
    const shopItems = ShopTable.FS.filter(obj => obj.ZoneID === zoneId || obj.ZoneID === -1);
    return shopItems;
  }
  return null;
}

function getScriptItems(zoneId) {
  const zoneCode = getZoneCodeFromCSV(zoneId);
  if (!zoneCode) {
    console.warn("Invalid zoneCode: ", zoneCode);
    return [];
  }
  const lookup = zoneCode.slice(0, 3).toLowerCase();
  const result = [];

  Object.keys(ItemMap).forEach(key => {
    if (key.startsWith(lookup)) {
      const flattenedArray = ItemMap[key].flat(Infinity);
      const uniqueArray = [...new Set(flattenedArray)];
      result.push(...uniqueArray);
    }
  });

  return result;
}

function getFixedShops(zoneId) {
  const zoneCode = getZoneCodeFromCSV(zoneId);
  const lookup = zoneCode.slice(0, 3).toLowerCase();
  const groupedData = {};

  Object.keys(FixedShop).forEach(key => {
    const prefix = key.slice(0, 3);
    
    if (!groupedData[prefix]) {
      groupedData[prefix] = {};
    }
  
    groupedData[prefix][key] = FixedShop[key];
  });

  const filteredData = groupedData[lookup] || {}
  const sections = Object.entries(filteredData).map(([key, value]) => ({
    sectionTitle: getZoneNameFromZoneCode(key),
    items: value,
  }));
  return sections;
}

function getFixedShopsItems(shopId, mode = GAMEDATA2) {
  const ModeShopTable = ShopTable[mode];
  const shopItems = ModeShopTable.FixedShop.filter(obj => obj.ShopID === parseInt(shopId))
  const itemNos = shopItems.map(item => item.ItemNo);
  return itemNos;
}

function getHeartScaleShopItems(zoneId, mode = GAMEDATA2) {
  if (zoneId !== 110) {
    return null;
  };
  const ModeShopTable = ShopTable[mode];
  return ModeShopTable.OtenkiShop
}

export {
  getItemIdFromItemName,
  getItemString,
  getRegularShopItems,
  getItemPrice,
  getBattleItemPrice,
  getScriptItems,
  getFixedShops,
  getFixedShopsItems,
  getHeartScaleShopItems
};
