const { GAMEDATA2, ItemNames, ItemTable } = require('../../../__gamedata');

function getItemIdFromItemName(itemName, mode = GAMEDATA2) {
  if (!itemName) throw Error(`Bad item name: ${itemName}`);
  const ModeItemNames = ItemNames[mode];
  if (itemName === "King's Rock")
    return ModeItemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === 'King’s Rock');
  const index = ModeItemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === itemName);
  if (index === -1) throw Error(`Bad item name: ${itemName}`);
  return index;
}

function getItemString(itemId = 1, mode = GAMEDATA2) {
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

function getAllItems(mode = GAMEDATA2) {
  const ModeItemNames = ItemNames[mode];

  if (!ModeItemNames?.labelDataArray) {
    throw new Error(`Invalid ItemNames table for mode: ${mode}`);
  }

  
  return ModeItemNames.labelDataArray
    .map((label, itemId) => {
      const name = label?.wordDataArray?.[0]?.str;
      if (!name) return null;

      const itemProperties = getItemProperties(itemId, mode)
      if (is31stBitSet(itemProperties.flags0)) {
        return null;
      }
      return {
        id: itemId,
        name,
      };
    })
    .filter(Boolean) // remove null / invalid entries
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
}

function is31stBitSet(value) {
  return ((value >>> 31) & 1) === 1;
}

function getItemProperties(itemId = 1, mode = GAMEDATA2) {
  const ModeItemTable = ItemTable[mode];
  const itemTableArray = ModeItemTable.Item;

  if (itemId > itemTableArray.length) {
    throw Error(`Bad Item Number: ${itemId}`)
  }

  const itemPropertyObject = itemTableArray[itemId];
  return itemPropertyObject;
}

function getItemImageUrl(itemName="") {
  const splitItemName = itemName.replace("’", "").split(" ").join("_");
  return `/img/items/Item_${splitItemName}.webp`;
}

function getTMImageUrl(moveType="") {
  return `/img/tms/${moveType}.webp`
}
module.exports = { getItemIdFromItemName, getItemString, getItemImageUrl, getTMImageUrl, getAllItems };
