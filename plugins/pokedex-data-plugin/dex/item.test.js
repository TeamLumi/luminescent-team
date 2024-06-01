const { getItemIdFromItemName, getItemString, getItemImageUrl } = require('./item');
const { getPokemonInfo } = require('./info');
const fs = require('fs');

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

  describe('getItemImages', () => {
    test('should return the correct item image url for a given item string', () => {
      const itemName = 'Leftovers';
      const expected = '/img/Item_Leftovers.webp';
      const actual = getItemImageUrl(itemName);
      expect(actual).toBe(expected);
    });

    test('should return the correct item image url for an item name that is split with a space', () => {
      const itemName = 'Macho Brace';
      const expected = '/img/Item_Macho_Brace.webp';
      const actual = getItemImageUrl(itemName);
      expect(actual).toBe(expected);
    });

    test('should return the correct item image url for an item name that is split with an apostrophe', () => {
      const itemName = "King’s Rock";
      const expected = '/img/Item_Kings_Rock.webp';
      const actual = getItemImageUrl(itemName);
      expect(actual).toBe(expected);
    });

    test('should have an image for all wild held items', () => {
      const getFullPath = (itemUrl) => {
        return `./static${itemUrl}`;
      }
      const nonItemList = [];

      for (let pokemonId = 1; pokemonId < 1465; pokemonId++) {
        const pokemonInfo = getPokemonInfo(0, pokemonId);
        const held_item1 = getItemString(pokemonInfo.held_item1);
        const held_item2 = getItemString(pokemonInfo.held_item2);
        const held_item3 = getItemString(pokemonInfo.held_item3);

        const itemImageUrl1 = getItemImageUrl(held_item1);
        const itemImageUrl2 = getItemImageUrl(held_item2);
        const itemImageUrl3 = getItemImageUrl(held_item3);

        const itemImagePath1 = getFullPath(itemImageUrl1);
        const itemImagePath2 = getFullPath(itemImageUrl2);
        const itemImagePath3 = getFullPath(itemImageUrl3);

        const itemImageList = [itemImagePath1, itemImagePath2, itemImagePath3]

        itemImageList.forEach((itemImagePath) => {
          if (!itemImagePath.includes("None")) {
            fs.access(itemImagePath, fs.constants.F_OK, (err) => {
              if (err && !nonItemList.includes(itemImagePath)) {
                nonItemList.push(itemImagePath);
              }
            // Uncomment the line below to log any missing items.
            // console.log(nonItemList)
            });
          }
        });
      }
    });
  });
});
