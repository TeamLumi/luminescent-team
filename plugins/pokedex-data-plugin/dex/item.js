const { itemNames, ItemTable, itemInfo } = require('./data');
const { itemNames3, ItemTable3, itemInfo3 } = require('./data3');
const { ITEM_POCKET_NAMES } = require('./itemConstants')

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

function getItemPocketId(itemId = 1, mode = "2.0") {
  const itemTable = mode === "2.0" ? ItemTable : ItemTable3;
  if (itemId > itemTable.Item.length) {
    throw Error(`Bad Item Number: ${itemId}`)
  }
  const itemObject = itemTable.Item[itemId];
  try {
    itemObject.fld_pocket
  } catch (error) {
    throw Error(`This item does not have a Field Pocket Id: ${itemId}  ${JSON.stringify(itemObject, undefined, 4)}`);
  }
  return itemObject.fld_pocket;
}

function getItemPocketName(pocketId = 0) {
  return ITEM_POCKET_NAMES[pocketId]
}

function getItemDescription(id, mode = "2.0") {
  const itemInfo = mode === "2.0" ? itemInfo : itemInfo3
  const wordData = itemInfo.labelDataArray[id]?.wordDataArray;
  if (wordData === null || wordData === undefined || wordData.length === 0) return 'None';
  const description = wordData.reduce((itemDescription, currentString) => {
    return itemDescription + currentString.str + ' ';
  }, '');

  return description.trim();
}

module.exports = {
  getItemIdFromItemName,
  getItemString,
  getItemImageUrl,
  getTMImageUrl,
  getItemPocketId,
  getItemPocketName,
  getItemDescription,
};
