import { pokemonHeight, pokemonWeight } from '../../../__gamedata';

function getHeight(pokemonId = 0) {
  const heightString = pokemonHeight.labelDataArray[pokemonId]?.wordDataArray[0]?.str ?? null;

  if (heightString === null) return '0';

  const [feetString, inchesString] = heightString.split("'");
  const inches = parseFloat(inchesString.substring(0, inchesString.length - 1));
  const feet = parseInt(feetString);

  const feetInCentimeters = feet * 30.48;
  const inchesInCentimeters = inches * 2.54;
  return ((feetInCentimeters + inchesInCentimeters) / 100).toFixed(2);
}

function getWeight(pokemonId = 0) {
  const weightString = pokemonWeight.labelDataArray[pokemonId]?.wordDataArray[0]?.str || null;

  if (weightString === null) return '0';

  const [poundsString] = weightString.split(' ');
  const pounds = parseFloat(poundsString.trim());

  const poundsInKilogram = pounds * 0.453592;
  return poundsInKilogram.toFixed(2);
}

export { getHeight, getWeight };
