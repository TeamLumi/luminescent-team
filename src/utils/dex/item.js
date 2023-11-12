import { getZoneCodeFromCSV } from './location';

const { itemNames, ShopTable, ItemTable } = require('../../../__gamedata');

function getItemIdFromItemName(itemName) {
  if (!itemName) throw Error(`Bad item name: ${itemName}`);
  if (itemName === "King's Rock")
    return itemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === 'King’s Rock');
  const index = itemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === itemName);
  if (index === -1) throw Error(`Bad item name: ${itemName}`);
  return index;
}

function getItemString(itemId = 0) {
  return itemNames.labelDataArray[itemId].wordDataArray[0].str;
}

function getItemPrice(itemId = 0) {
  return ItemTable.Item[itemId].price;
}

function getBattleItemPrice(itemId = 0) {
  return ItemTable.Item[itemId].bp_price;
}

function getRegularShopItems(zoneId, zoneMap) {
  const excludedZones = [473, 456, 422]
  const zoneCode = getZoneCodeFromCSV(zoneId + 1, zoneMap);
  if (
    zoneCode.startsWith("C") ||
    (zoneCode.startsWith("T") && !excludedZones.includes(zoneId))
    ) {
    const shopItems = ShopTable.FS.filter(obj => obj.ZoneID === zoneId || obj.ZoneID === -1)
    return shopItems
  }
  return null;
}

export {
  getItemIdFromItemName,
  getItemString,
  getRegularShopItems,
  getItemPrice,
  getBattleItemPrice
};
