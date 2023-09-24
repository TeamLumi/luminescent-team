const { PersonalTable } = require('./data');
const { getAbilityString } = require('./ability');
const { getTechMachineLearnset, getLevelLearnset, getEggMoves, getTutorMoves } = require('./moves');
const { getPokemonName, getPokemonMonsNoAndFormNoFromPokemonId } = require('./name');
const { getTypeName } = require('./types');
const { getWeight, getHeight } = require('./details');
const { getGrassKnotPower, getImage, getPokemonFormIndexById, getPokemonFormIds } = require('./functions');
const { getEggGroupViaPokemonId, getEggGroupNameById } = require('./egggroup');

function getPokemon(pokemonId) {
  const p = PersonalTable.Personal[pokemonId];
  const id = p.id;
  const monsno = p.monsno;
  const [_, formno] = getPokemonMonsNoAndFormNoFromPokemonId(p.id);
  const name = getPokemonName(p.id);
  const baseStats = {
    hp: p.basic_hp,
    atk: p.basic_atk,
    def: p.basic_def,
    spa: p.basic_spatk,
    spd: p.basic_spdef,
    spe: p.basic_agi,
  };
  const baseStatsTotal = Object.values(baseStats).reduce((total, stat) => total + stat, 0);
  const weight = getWeight(pokemonId);
  const height = getHeight(pokemonId);
  const type1 = getTypeName(p.type1);
  const type2 = getTypeName(p.type2);
  const type1Id = p.type1;
  const type2Id = p.type2;
  const genderDecimalValue = p.sex;
  const imageSrc = getImage(p.monsno, getPokemonFormIndexById(p.monsno, p.id));
  const grassKnotPower = getGrassKnotPower(weight);

  const ability1 = getAbilityString(p.tokusei1);
  const ability2 = getAbilityString(p.tokusei2);
  const abilityH = getAbilityString(p.tokusei3);

  const learnset = {
    level: getLevelLearnset(pokemonId),
    tm: getTechMachineLearnset(p.machine1, p.machine2, p.machine3, p.machine4),
    egg: getEggMoves(pokemonId),
    tutor: getTutorMoves(monsno, formno)
  };
  const eggGroupNames = getEggGroupViaPokemonId(p.id).map((eggId) => getEggGroupNameById(eggId));
  const forms = getPokemonFormIds(p.monsno).map((formId) => {
    return {
      name: getPokemonName(formId),
      imageSrc: getImage(p.monsno, getPokemonFormIndexById(p.monsno, formId)),
    };
  });

  const isValid = p.valid_flag === 1;
  const isBaseForm = p.form_index === 0;

  return {
    id,
    monsno,
    name,
    baseStats,
    baseStatsTotal,
    weight,
    height,
    type1,
    type2,
    type1Id,
    type2Id,
    genderDecimalValue,
    imageSrc,
    grassKnotPower,
    ability1,
    ability2,
    abilityH,
    learnset,
    eggGroupNames,
    forms,
    isValid,
    isBaseForm,
  };
}

module.exports = { getPokemon };
