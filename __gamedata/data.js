//All the constant numbers
const PersonalTable = require('./PersonalTable.json');
const GrowTable = require('./GrowTable.json');
const EvolveTable = require('./EvolveTable.json');
const EggMovesTable = require('./TamagoWazaTable.json');
const LearnsetTable = require('./WazaOboeTable.json');
const MovesTable = require('./WazaTable.json');
const ItemTable = require('./ItemTable.json');

//All the Pokemon english files
const basePokemonNames = require('./english_ss_monsname.json');
const formPokemonNames = require('./english_ss_zkn_form.json');
const pokemonHeight = require('./english_ss_zkn_height.json');
const pokemonWeight = require('./english_ss_zkn_weight.json');
const pokemonDexType = require('./english_ss_zkn_type.json');
const pokemonPokedexInfo = require('./english_dp_pokedex_diamond.json');

//All the other english files
const natureNames = require('./english_ss_seikaku.json');
const abilityNames = require('./english_ss_tokusei.json');
const abilityInfo = require('./english_ss_tokuseiinfo.json');
const typeName = require('./english_ss_typename.json');
const moveNames = require('./english_ss_wazaname.json');
const moveInfo = require('./english_ss_wazainfo.json');
const itemNames = require('./english_ss_itemname.json');

//Custom files
const moveEnum = require('./moveEnum.json');
const smogonMoves = require('./smogonMoves.json');

module.exports = {
  PersonalTable,
  GrowTable,
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
};
