const { getZoneCodeFromCSV, getZoneNameFromZoneCode } = require('./location');

const { itemNames, ShopTable, ItemTable, ItemMap, FixedShop } = require('./data');
const { itemNames3, ShopTable3, ItemTable3 } = require('./data3');

function getItemIdFromItemName(itemName, mode = "2.0") {
  if (!itemName) throw Error(`Bad item name: ${itemName}`);
  const ItemNames = mode === "2.0" ? itemNames : itemNames3
  if (itemName === "King's Rock")
    return ItemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === 'King’s Rock');
  const index = ItemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === itemName);
  if (index === -1) throw Error(`Bad item name: ${itemName}`);
  return index;
}

function getItemString(itemId = 0, mode = "2.0") {
  const ItemNames = mode === "2.0" ? itemNames : itemNames3
  return ItemNames.labelDataArray[itemId].wordDataArray[0].str;
}

function getItemPrice(itemId = 0, mode = "2.0") {
  const itemTable = mode === "2.0" ? ItemTable : ItemTable3;
  return itemTable.Item[itemId].price;
}

function getBattleItemPrice(itemId = 0, mode = "2.0") {
  const itemTable = mode === "2.0" ? ItemTable : ItemTable3;
  return itemTable.Item[itemId].bp_price;
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

function getFixedShopsItems(shopId, mode = "2.0") {
  const shopTable = mode === "2.0" ? ShopTable : ShopTable3;
  const shopItems = shopTable.FixedShop.filter(obj => obj.ShopID === parseInt(shopId))
  const itemNos = shopItems.map(item => item.ItemNo);
  return itemNos;
}

function getHeartScaleShopItems(zoneId, mode = "2.0") {
  if (zoneId !== 110) {
    return null;
  };
  const shopTable = mode === "2.0" ? ShopTable : ShopTable3;
  return shopTable.OtenkiShop
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
