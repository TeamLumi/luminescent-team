import { getItemIdFromItemName, getItemString } from './item';
import { itemNames, ShopTable, ItemTable, ItemMap, FixedShop } from '../../../__gamedata';
import { getZoneNameFromZoneCode } from './location';
import { getItemImageUrl } from '../../../plugins/pokedex-data-plugin/dex/item';
import { ConstructionOutlined } from '@mui/icons-material';

const fs = require('fs');
const path = require('path');

describe('Dex utils Item getter tests', () => {
  describe('getItemIdFromItemName', () => {
    test('should throw an error if no item name is given', () => {
      expect(() => getItemIdFromItemName()).toThrow('Bad item name: undefined');
    });

    test('should return the correct ID for a valid item name', () => {
      const itemName = 'Leftovers';
      const expected = 234;
      const actual = getItemIdFromItemName(itemName);
      expect(actual).toBe(expected);
    });

    test('should throw an error for an invalid item name', () => {
      const itemName = 'Fake Item';
      expect(() => getItemIdFromItemName(itemName)).toThrow(Error(`Bad item name: ${itemName}`));
    });
  });

  describe('getItemString', () => {
    test('should return the correct item name string for a given item ID', () => {
      const itemId = 234;
      const expected = 'Leftovers';
      const actual = getItemString(itemId);
      expect(actual).toBe(expected);
    });
  });
});

function getFieldItemImageData(mode = "2.0") {
  const itemImageData = {};
  const flattenedItemMap = {};

  Object.keys(ItemMap).forEach(key => {
    const flattenedArray = ItemMap[key].flat(Infinity);
    const uniqueArray = Array.from(new Set(flattenedArray));
    const zoneName = getZoneNameFromZoneCode(key);
    flattenedItemMap[zoneName] = uniqueArray;
  });

  Object.keys(flattenedItemMap).forEach(zoneName => {
    const itemArray = flattenedItemMap[zoneName];
    const itemUrls = itemArray.map((item) => (getItemImageUrl(getItemString(item))))
    itemImageData[zoneName] = itemUrls
  })

  return itemImageData;
}

Object.entries(getFieldItemImageData("2.0")).forEach(([zoneName, itemImageArray]) => {
  test.skip.each([...itemImageArray])(`2.0 Item Image %s does not exist in ${zoneName}`, (filename, done) => {
    if (filename.includes("_TM") || filename.includes("_TR")) {
      done()
    }
    const imgFilePath = path.join(__dirname, '../../../static', filename);
    fs.access(imgFilePath, fs.constants.F_OK, (err) => {
      let fileExists = true;
      if (err) {
        fileExists = false;
      }

      try {
        expect(fileExists).toBe(true);
        done();
      } catch (err) {
        done(err);
      }
    });  
  })
})
