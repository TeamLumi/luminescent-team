const { getAbilityString } = require('./ability');
const { getTechMachineLearnset } = require('./moves');
const { getPokemonName } = require('./name');
const { getTypeName } = require('./types');
const { getWeight, getHeight } = require('./details');

const { getGrassKnotPower, getImage, formatBaseStats, getPokemonFormIndexById } = require('./functions');

const { PersonalTable } = require('../../../__gamedata');

function getPokemonInfo(monsno = 0, pokemonId = 0) {
  const p = PersonalTable.Personal[pokemonId];
  const weight = getWeight(pokemonId);

  return {
    monsno: monsno,
    name: getPokemonName(pokemonId),
    ability1: getAbilityString(p.tokusei1),
    ability2: getAbilityString(p.tokusei2),
    abilityH: getAbilityString(p.tokusei3),
    tmLearnset: getTechMachineLearnset(p.machine1, p.machine2, p.machine3, p.machine4),
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
    height: getHeight(pokemonId),
    grassKnotPower: getGrassKnotPower(weight),
    type1: getTypeName(p.type1),
    type2: getTypeName(p.type2),
    imageSrc: getImage(monsno, getPokemonFormIndexById(monsno, pokemonId)),
    genderDecimalValue: p.sex,
  };
}

module.exports = { getPokemonInfo };
