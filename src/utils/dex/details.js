const { pokemonHeight, pokemonWeight } = require("../__gamedata");

const FEET_TO_CM = 30.48;
const INCHES_TO_CM = 2.54;
const POUNDS_TO_KG = 0.453592;

function getHeight(pokemonId = 0) {
  const heightString = pokemonHeight[pokemonId]?.str ?? null;

  if (heightString === null) return "0";

  const [feetString, inchesString] = heightString.split("'");
  const inches = parseFloat(inchesString.substring(0, inchesString.length - 1));
  const feet = parseInt(feetString);

  const feetInCentimeters = feet * FEET_TO_CM;
  const inchesInCentimeters = inches * INCHES_TO_CM;
  return ((feetInCentimeters + inchesInCentimeters) / 100).toFixed(2);
}

function getWeight(pokemonId = 0) {
  const weightString = pokemonWeight[pokemonId]?.str || null;

  if (weightString === null) return "0";

  const [poundsString] = weightString.split(" ");
  const pounds = parseFloat(poundsString.trim());

  const poundsInKilogram = pounds * POUNDS_TO_KG;
  return poundsInKilogram.toFixed(2);
}

module.exports = { getHeight, getWeight };
