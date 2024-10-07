const { PokemonHeight, PokemonWeight, GAMEDATA2 } = require('../../../__gamedata');

const FEET_TO_CM = 30.48;
const INCHES_TO_CM = 2.54;
const POUNDS_TO_KG = 0.453592;

function getHeight(pokemonId = 0, mode = GAMEDATA2) {
  const ModePokemonHeight = PokemonHeight[mode];
  if (pokemonId === 0) return 0;
  
  const heightString = ModePokemonHeight?.labelDataArray[pokemonId]?.wordDataArray[0]?.str || '0';
  let feetString = '0';
  let inchesString = heightString;

  if (heightString.includes("'")) {
    [feetString, inchesString] = heightString.split("'");
  }

  const inches = parseFloat(inchesString.slice(0, -1)) || 0;
  const feet = parseInt(feetString) || 0;

  const feetInCentimeters = feet * FEET_TO_CM;
  const inchesInCentimeters = inches * INCHES_TO_CM;
  return ((feetInCentimeters + inchesInCentimeters) / 100).toFixed(2);
}

function getWeight(pokemonId = 0, mode = GAMEDATA2) {
  const ModePokemonWeight = PokemonWeight[mode];
  const weightString = ModePokemonWeight.labelDataArray[pokemonId]?.wordDataArray[0]?.str || null;

  if (weightString === null) return '0';

  const [poundsString] = weightString.split(' ');
  const pounds = parseFloat(poundsString.trim());

  const poundsInKilogram = pounds * POUNDS_TO_KG;
  return poundsInKilogram.toFixed(2);
}

module.exports = { getHeight, getWeight };
