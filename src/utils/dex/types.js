const { typeName } = require('../../../__gamedata');

function getTypeName(typeId = 0) {
  return typeName.labelDataArray[typeId].wordDataArray[0].str;
}

function getTypes(pokemonObject) {
  return pokemonObject.type1 === pokemonObject.type2
    ? [getTypeName(pokemonObject.type1)]
    : [getTypeName(pokemonObject.type1), getTypeName(pokemonObject.type2)];
}

export { getTypeName, getTypes };
