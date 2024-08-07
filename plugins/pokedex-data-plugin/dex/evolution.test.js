const fs = require('fs');
const path = require('path');
const { FORM_MAP, isValidPokemon } = require('./functions');
const { getItemImageUrl, getItemString } = require('./item');
const { getEvolutionTree, getEvolutionMethodDetail } = require('./evolution');
const { getPokemonName } = require('./name');
const { getPokemon } = require('./pokemon');
const { GAMEDATA2 } = require('../../../__gamedata');

test("getEvolutionTree", () => {
  getEvolutionTree(25, false, "3.0")
})

function getAllEvoImageData(onlyValidPokemons = false, mode = GAMEDATA2) {
  const pokemonImageData = [];
  const ModeFormMap = FORM_MAP[mode];
  const pokemons = Object.values(ModeFormMap)

  for (const pokemon of pokemons) {
    for (let i = 0; i < pokemon.length; i++) {
      const pokemonId = pokemon[i];
      if (pokemonId === 0) {
        continue;
      }
      const validPokemon = isValidPokemon(pokemonId, mode);
      if (onlyValidPokemons && !validPokemon) {
        continue;
      }
      const evolutionInfo = getEvolutionTree(pokemonId, false, mode);
      const evolvesInto = evolutionInfo.evolvesInto;
      if (evolvesInto.length === 0) {
        continue;
      }
      for (let j = 0; j < evolvesInto.length; j++) {
        // Check if evolution has evolutionDetails property
        if (!evolvesInto[j].evolutionDetails) {
          continue;
        }
        for (let h = 0; h < evolvesInto[j].evolutionDetails.methodIds.length; h++) {
          const methodNo = evolvesInto[j].evolutionDetails.methodIds[h];
          const methodParameter = evolvesInto[j].evolutionDetails.methodParameters[h];
          const [result, evoMethod] = getEvolutionMethodDetail(methodNo, methodParameter, mode, null, pokemonId);
          if (result.parameterType !== "Item") {
            continue;
          }
          const itemNo = evolvesInto[j].evolutionDetails.methodParameters[h]
          const itemName = itemNo !== 0 ? getItemString(itemNo, mode) : null;
          const itemImageUrl = itemName !== null
            ? getItemImageUrl(itemName)
            : null;

          if (itemImageUrl !== null) {
            pokemonImageData.push([itemImageUrl, getPokemonName(evolutionInfo.pokemonId, mode), evolutionInfo.pokemonId]);
          }
        }
      }
    }
  }

  return pokemonImageData;
}

test.skip.each([...getAllEvoImageData(true, GAMEDATA2)])('2.0 Item image %s for %s (%s) does not exist', (filename, formName, pokemonId, done) => {
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

test.skip.each([...getAllEvoImageData(true, "3.0")])('3.0 Item image %s for %s (%s) does not exist', (filename, formName, pokemonId, done) => {
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
