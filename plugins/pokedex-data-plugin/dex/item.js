const { itemNames } = require('./data');
const { itemNames3 } = require('./data3');

function getItemIdFromItemName(itemName, mode = "2.0") {
  if (!itemName) throw Error(`Bad item name: ${itemName}`);
  const ItemNames = mode === "2.0" ? itemNames : itemNames3
  if (itemName === "King's Rock")
    return ItemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === 'King’s Rock');
  const index = ItemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === itemName);
  if (index === -1) throw Error(`Bad item name: ${itemName}`);
  return index;
}

function getItemString(itemId = 1, mode = "2.0") {
  const ItemNames = mode === "2.0" ? itemNames : itemNames3
  if (itemId > ItemNames.labelDataArray.length) {
    throw Error(`Bad Item Number: ${itemId}`)
  }
  const itemObject = ItemNames.labelDataArray[itemId]
  try {
    itemObject.wordDataArray[0].str;
  } catch (error) {
    throw Error(`This Item does not have name data: ${itemId} ${JSON.stringify(itemObject, undefined, 4)}`);
  }
  return itemObject.wordDataArray[0].str;
}

function getItemImageUrl(itemName="") {
  const splitItemName = itemName.replace("’", "").split(" ").join("_");
  return `/img/items/Item_${splitItemName}.webp`;
}

function getTMImageUrl(moveType="") {
  return `/img/tms/${moveType}.webp`
}
module.exports = { getItemIdFromItemName, getItemString, getItemImageUrl, getTMImageUrl };
