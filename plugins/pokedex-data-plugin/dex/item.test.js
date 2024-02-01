const { getItemIdFromItemName, getItemString, getItemImageUrl } = require('./item');
const { getPokemonInfo } = require('./info');
const fs = require('fs');
const path = require('path');
const { getPokemon } = require('./pokemon');
const { FORM_MAP, FORM_MAP3 } = require('./functions');

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
      const expected = '/img/items/Item_Leftovers.webp';
      const actual = getItemImageUrl(itemName);
      expect(actual).toBe(expected);
    });

    test('should return the correct item image url for an item name that is split with a space', () => {
      const itemName = 'Macho Brace';
      const expected = '/img/items/Item_Macho_Brace.webp';
      const actual = getItemImageUrl(itemName);
      expect(actual).toBe(expected);
    });

    test('should return the correct item image url for an item name that is split with an apostrophe', () => {
      const itemName = "King’s Rock";
      const expected = '/img/items/Item_Kings_Rock.webp';
      const actual = getItemImageUrl(itemName);
      expect(actual).toBe(expected);
    });
  });
});

function getAllItemImageData(mode = "2.0") {
  const pokemonImageData = [];
  const form_map = mode === "2.0" ? FORM_MAP : FORM_MAP3;
  const pokemons = Object.values(form_map)

  for (const pokemon of pokemons) {
    for (let i = 0; i < pokemon.length; i++) {
      const pokemonId = pokemon[i];
      const pokemonInfo = getPokemon(pokemonId, mode);
      const itemImageUrl1 = pokemonInfo.item1 !== "None" ? getItemImageUrl(pokemonInfo.item1) : null;
      const itemImageUrl2 = pokemonInfo.item2 !== "None" ? getItemImageUrl(pokemonInfo.item2) : null;
      const itemImageUrl3 = pokemonInfo.item3 !== "None" ? getItemImageUrl(pokemonInfo.item3) : null;

      if (itemImageUrl1 !== null) {
        pokemonImageData.push([itemImageUrl1, pokemonInfo.name, "1"]);
      }
      if (itemImageUrl2 !== null) {
        pokemonImageData.push([itemImageUrl2, pokemonInfo.name, "2"]);
      }
      if (itemImageUrl3 !== null) {
        pokemonImageData.push([itemImageUrl3, pokemonInfo.name, "3"]);
      }
    }
  }

  return pokemonImageData;
}

test.skip.each([...getAllItemImageData("2.0")])('2.0 Item image %s for %s slot %s does not exist', (filename, formName, slot, done) => {
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
});

test.skip.each([...getAllItemImageData("3.0")])('3.0 Item image %s for %s slot %s does not exist', (filename, formName, slot, done) => {
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
});
