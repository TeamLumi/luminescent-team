function getHeight(monsno = 0) {
  const heightString = pokemonHeight.labelDataArray[monsno]?.wordDataArray[0]?.str || '0';
  const [feetString, inchesString] = heightString.split("'");
  const inches = parseFloat(inchesString.substring(0, inchesString.length - 1));
  const feet = parseInt(feetString);

  const feetInCentimeters = feet * 30.48;
  const inchesInCentimeters = inches * 2.54;
  return ((feetInCentimeters + inchesInCentimeters) / 100).toFixed(2);
}

function getWeight(monsno = 0) {
  const weightString = pokemonWeight.labelDataArray[monsno]?.wordDataArray[0]?.str || '0';

  const [poundsString] = weightString.split(' ');
  const pounds = parseFloat(poundsString.trim());

  const poundsInKilogram = pounds * 0.453592;
  return poundsInKilogram.toFixed(2);
}
