//All the constant numbers
const PersonalTable = require('../../../__3.0gamedata/PersonalTable.json');
const EvolveTable = require('../../../__3.0gamedata/EvolveTable.json');
const EggMovesTable = require('../../../__3.0gamedata/TamagoWazaTable.json');
const LearnsetTable = require('../../../__3.0gamedata/WazaOboeTable.json');
const MovesTable = require('../../../__3.0gamedata/WazaTable.json');
const ItemTable = require('../../../__3.0gamedata/ItemTable.json');

//All the Pokemon english files
const basePokemonNames = require('../../../__3.0gamedata/english_ss_monsname.json');
const formPokemonNames = require('../../../__3.0gamedata/english_ss_zkn_form.json');
const pokemonHeight = require('../../../__3.0gamedata/english_ss_zkn_height.json');
const pokemonWeight = require('../../../__3.0gamedata/english_ss_zkn_weight.json');
const pokemonDexType = require('../../../__3.0gamedata/english_ss_zkn_type.json');
const pokemonPokedexInfo = require('../../../__3.0gamedata/english_dp_pokedex_diamond.json');

//All the other english files
const natureNames = require('../../../__3.0gamedata/english_ss_seikaku.json');
const abilityNames = require('../../../__3.0gamedata/english_ss_tokusei.json');
const abilityInfo = require('../../../__3.0gamedata/english_ss_tokuseiinfo.json');
const typeName = require('../../../__3.0gamedata/english_ss_typename.json');
const moveNames = require('../../../__3.0gamedata/english_ss_wazaname.json');
const moveInfo = require('../../../__3.0gamedata/english_ss_wazainfo.json');
const itemNames = require('../../../__3.0gamedata/english_ss_itemname.json');

//Custom files
const moveEnum = require('../../../__3.0gamedata/moveEnum.json');
const smogonMoves = require('../../../__3.0gamedata/smogonMoves.json');
const tutorMoves = require('../../../__3.0gamedata/tutorMoves.json');

module.exports = {
  PersonalTable,
  EvolveTable,
  EggMovesTable,
  LearnsetTable,
  MovesTable,
  basePokemonNames,
  formPokemonNames,
  pokemonHeight,
  pokemonWeight,
  pokemonDexType,
  pokemonPokedexInfo,
  natureNames,
  abilityNames,
  abilityInfo,
  typeName,
  moveNames,
  moveInfo,
  ItemTable,
  itemNames,
  moveEnum,
  smogonMoves,
  tutorMoves
};
