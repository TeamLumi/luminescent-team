const { itemNames } = require("../__gamedata");

function getItemIdFromItemName(itemName) {
  if (!itemName) throw Error(`Bad item name: ${itemName}`);
  if (itemName === "King's Rock")
    return itemNames.findIndex((e) => e.str === "King’s Rock");
  const index = itemNames.findIndex((e) => e.str === itemName);
  if (index === -1) throw Error(`Bad item name: ${itemName}`);
  return index;
}

function getItemString(itemId = 0) {
  return itemNames[itemId].str;
}

module.exports = { getItemIdFromItemName, getItemString };
