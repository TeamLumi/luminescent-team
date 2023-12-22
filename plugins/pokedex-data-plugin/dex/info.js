const { getAbilityString } = require('./ability');
const { getTechMachineLearnset } = require('./moves');
const { getPokemonName } = require('./name');
const { getTypeName } = require('./types');
const { getWeight, getHeight } = require('./details');
const { getItemString } = require('./item');
const { getGrassKnotPower, getImage, formatBaseStats, getPokemonFormIndexById } = require('./functions');

const { PersonalTable } = require('./data');
const { PersonalTable3 } = require('./data3');

function getPokemonInfo(monsno = 0, pokemonId = 0, mode = "2.0") {
  const personalTable = mode === "2.0" ? PersonalTable : PersonalTable3
  const p = personalTable.Personal[pokemonId];
  const weight = getWeight(pokemonId, mode);

  return {
    monsno: monsno,
    name: getPokemonName(pokemonId, mode),
    ability1: getAbilityString(p.tokusei1, mode),
    ability2: getAbilityString(p.tokusei2, mode),
    abilityH: getAbilityString(p.tokusei3, mode),
    tmLearnset: getTechMachineLearnset(p.machine1, p.machine2, p.machine3, p.machine4, mode),
    prettyBaseStats: formatBaseStats(p),
    baseStats: {
      hp: p.basic_hp,
      atk: p.basic_atk,
      def: p.basic_def,
      spa: p.basic_spatk,
      spd: p.basic_spdef,
      spe: p.basic_agi,
    },
    baseStatsTotal: p.basic_hp + p.basic_atk + p.basic_def + p.basic_spatk + p.basic_spdef + p.basic_agi,
    weight: weight,
    height: getHeight(pokemonId, mode),
    grassKnotPower: getGrassKnotPower(weight),
    type1: getTypeName(p.type1),
    type2: getTypeName(p.type2),
    imageSrc: getImage(monsno, getPokemonFormIndexById(monsno, pokemonId, mode)),
    genderDecimalValue: p.sex,
    held_item1: p.item1,
    held_item2: p.item2,
    held_item3: p.item3,
  };
}

module.exports = { getPokemonInfo };
