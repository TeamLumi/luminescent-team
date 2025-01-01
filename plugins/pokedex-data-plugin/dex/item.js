const { GAMEDATA2, ItemNames, ItemTable, ItemInfo } = require('../../../__gamedata');
const { getMoveProperties } = require('./moves');

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

function getItemImageUrl(itemName="") {
  const splitItemName = itemName.replace("’", "").split(" ").join("_");
  return `/img/items/Item_${splitItemName}.webp`;
}

function getTMImageUrl(moveType="") {
  return `/img/tms/${moveType}.webp`
}

function getItemPocket(itemNo, mode = GAMEDATA2) {
  if (!itemNo) throw Error(`Bad item name: ${itemNo}`);
  const ModeItemTable = ItemTable[mode];
  console.log(ModeItemTable.Item[itemNo]);
  return ModeItemTable.Item[itemNo].fld_pocket;
}

function getTMInfoFromItemNo(itemNo, mode = GAMEDATA2) {
  const ModeItemTable = ItemTable[mode];
  const wazaMachine = ModeItemTable.WazaMachine.find(machine => machine.itemNo === itemNo);
  return wazaMachine ? {...getMoveProperties(wazaMachine.wazaNo, mode), tmNo: wazaMachine.machineNo} : null;
}

function getTMInfoFromTMNo(TMNo=0, mode = GAMEDATA2) {
  const ModeItemTable = ItemTable[mode];
  const { wazaNo } = ModeItemTable.WazaMachine[TMNo-1];
  return getMoveProperties(wazaNo, mode);
}

function getItemInfo(itemId = 0, mode = GAMEDATA2) {
  const ModeItemInfo = ItemInfo[mode];
  const wordData = ModeItemInfo.labelDataArray[itemId].wordDataArray;
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
  getTMInfoFromTMNo,
  getTMInfoFromItemNo,
  getItemPocket,
  getItemInfo,
};
