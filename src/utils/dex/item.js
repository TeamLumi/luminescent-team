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

function getItemString(itemId = 0, mode = "2.0") {
  const ItemNames = mode === "2.0" ? itemNames : itemNames3
  return ItemNames.labelDataArray[itemId].wordDataArray[0].str;
}

export { getItemIdFromItemName, getItemString };
