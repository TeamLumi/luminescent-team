const { TypeName, GAMEDATA2 } = require('../../../__gamedata');

function getTypeName(typeId = 0, mode = GAMEDATA2) {
  const ModeTypeName = TypeName[mode];
  const type = ModeTypeName.labelDataArray[typeId]?.wordDataArray[0]?.str;
  if (!type) throw Error(`Bad typeId: ${typeId}`);
  return type;
}

function getTypes(pokemonObject, mode = GAMEDATA2) {
  return pokemonObject.type1 === pokemonObject.type2
    ? [getTypeName(pokemonObject.type1, mode)]
    : [getTypeName(pokemonObject.type1, mode), getTypeName(pokemonObject.type2, mode)];
}

module.exports = { getTypeName, getTypes };
