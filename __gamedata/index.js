// PersonalTable mapping.
const newGameData = require("./PersonalTable.json");
const keyMapping = {
  valid_flag: 0,
  id: 1,
  monsno: 2,
  form_index: 3,
  form_max: 4,
  color: 5,
  gra_no: 6,
  basic_hp: 7,
  basic_atk: 8,
  basic_def: 9,
  basic_agi: 10,
  basic_spatk: 11,
  basic_spdef: 12,
  type1: 13,
  type2: 14,
  get_rate: 15,
  rank: 16,
  exp_value: 17,
  item1: 18,
  item2: 19,
  item3: 20,
  sex: 21,
  egg_birth: 22,
  initial_friendship: 23,
  egg_group1: 24,
  egg_group2: 25,
  grow: 26,
  tokusei1: 27,
  tokusei2: 28,
  tokusei3: 29,
  give_exp: 30,
  height: 31,
  weight: 32,
  chihou_zukan_no: 33,
  machine1: 34,
  machine2: 35,
  machine3: 36,
  machine4: 37,
  hiden_machine: 38,
  egg_monsno: 39,
  egg_formno: 40,
  egg_formno_kawarazunoishi: 41,
  egg_form_inherit_kawarazunoishi: 42,
};
const PersonalTable = newGameData.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping) {
    newEntry[key] = entry[keyMapping[key]];
  }

  return newEntry;
});

// Trainer names mapping
const dpTrainersNames = require("./english_dp_trainers_name.json");
const keyMapping2 = {
  labelName: 0,
  str: 1,
};
const TrainerNames = dpTrainersNames.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// Item names mapping
const dpItemNames = require("./english_ss_itemname.json");
const itemNames = dpItemNames.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// Pokemon names mapping
const pokemonNames = require("./english_ss_monsname.json");
const basePokemonNames = pokemonNames.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// Form names mapping
const formNames = require("./english_ss_zkn_form.json");
const formPokemonNames = formNames.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// Nature names mapping
const natureNamesData = require("./english_ss_seikaku.json");
const natureNames = natureNamesData.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// Ability names mapping
const abilityNamesData = require("./english_ss_tokusei.json");
const abilityNames = abilityNamesData.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// Type names mapping
const typeNameData = require("./english_ss_typename.json");
const typeName = typeNameData.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// Move names mapping
const moveNamesData = require("./english_ss_wazaname.json");
const moveNames = moveNamesData.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// Weight mapping
const WeightData = require("./english_ss_zkn_weight.json");
const pokemonWeight = WeightData.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// Height mapping
const HeightData = require("./english_ss_zkn_height.json");
const pokemonHeight = HeightData.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// MoveInfo mapping
const moveInfoData = require("./english_ss_wazainfo.json");
const moveInfo = moveInfoData.map((entry) => {
  const newEntry = {};

  for (const key in keyMapping2) {
    newEntry[key] = entry[keyMapping2[key]];
  }

  return newEntry;
});

// EvolveTable mapping
const evolveData = require("./EvolveTable.json");
const EvolveTable = evolveData.map((entry) => {
  const newEntry = {
    id: entry.id,
    ar: entry.ar,
  };

  return newEntry;
});

// EggMovesTable mapping
const EggMovesTableData = require("./TamagoWazaTable.json");
const EggMovesTable = EggMovesTableData.map((entry) => {
  const newEntry = {
    no: entry.no,
    formNo: entry.formNo,
    wazaNo: entry.wazaNo,
  };

  return newEntry;
});

// ItemTable mapping
const ItemTableData = require("./ItemTable.json");
const ItemTable = ItemTableData.Item.map((entry) => {
  const newEntry = {
    no: entry[0],
    type: entry[1],
    iconid: entry[2],
    price: entry[3],
    bp_price: entry[4],
    eqp: entry[5],
    flags0: entry[6],
  };

  return newEntry;
});

// TrainerTable mapping
const trainerData = require("./TrainerTable.json");

const TrainerTable = trainerData.TrainerType.map((entry) => {
  const newEntry = {
    TrainerID: entry.ID,
    LabelTrType: entry.Class,
  };

  return newEntry;
});

// All the important numbers
const GrowTable = require("./GrowTable.json");
const LearnsetTable = require("./WazaOboeTable.json");
const MovesTable = require("./WazaTable.json");

// All the Pokemon English files
const pokemonDexType = require("./english_ss_zkn_type.json");
const pokemonPokedexInfo = require("./english_dp_pokedex_diamond.json");

// All the other English files
const abilityInfo = require("./english_ss_tokuseiinfo.json");
const itemInfo = require("./english_ss_iteminfo.json");

// Custom files
const moveEnum = require("./moveEnum.json");
const smogonMoves = require("./smogonMoves.json");
const trainerInfo = require("./trainer_info.json");
const evolutionData = require("./evolution.json");
const encounterData = require("./encounter_locations.json");

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
  trainerInfo,
  TrainerTable,
  TrainerNames,
  itemInfo,
  evolutionData,
  encounterData,
};
