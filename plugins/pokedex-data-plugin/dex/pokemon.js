const { GAMEDATA2, PersonalTable } = require('../../../__gamedata');
const { getAbilityString } = require('./ability');
const { getTechMachineLearnset, getLevelLearnset, getEggMoves, getTutorMoves } = require('./moves');
const { getPokemonName, getPokemonMonsNoAndFormNoFromPokemonId } = require('./name');
const { getWeight, getHeight } = require('./details');
const { getTypeName } = require('./types');
const { getGrassKnotPower, getImage, getPokemonFormIndexById, getPokemonFormIds, getDexDescription } = require('./functions');
const { getEggGroupViaPokemonId, getEggGroupNameById } = require('./egggroup');
const { getItemString } = require('./item');
const { getEvolutionTree } = require('./evolution');
const { LUMI_TO_RELUMI_PIKACHU_FORMS } = require('./nameConstants');

function getPokemon(pokemonId, mode = GAMEDATA2) {
  const ModePersonalTable = PersonalTable[mode];
  const p = ModePersonalTable.Personal[pokemonId];
  const id = p.id;
  const monsno = p.monsno;
  let [_, formno] = getPokemonMonsNoAndFormNoFromPokemonId(p.id, mode);
  if (mode === GAMEDATA2 && monsno === 25) {
    const mapped_form_no = LUMI_TO_RELUMI_PIKACHU_FORMS[formno]
    if (mapped_form_no !== undefined) formno = mapped_form_no;
  }
  const name = getPokemonName(p.id, mode);
  const dexDescription = getDexDescription(p.id, mode)
  const baseStats = {
    hp: p.basic_hp,
    atk: p.basic_atk,
    def: p.basic_def,
    spa: p.basic_spatk,
    spd: p.basic_spdef,
    spe: p.basic_agi,
  };
  const baseStatsTotal = Object.values(baseStats).reduce((total, stat) => total + stat, 0);
  const weight = getWeight(pokemonId, mode);
  const height = getHeight(pokemonId, mode);
  const type1 = getTypeName(p.type1);
  const type2 = getTypeName(p.type2);
  const type1Id = p.type1;
  const type2Id = p.type2;
  const genderDecimalValue = p.sex;
  const imageSrc = getImage(p.monsno, getPokemonFormIndexById(p.monsno, p.id, mode));
  const grassKnotPower = getGrassKnotPower(weight);

  const ability1 = getAbilityString(p.tokusei1, mode);
  const ability2 = getAbilityString(p.tokusei2, mode);
  const abilityH = getAbilityString(p.tokusei3, mode);

  const evolutionTree = getEvolutionTree(pokemonId, true, mode);

  const learnset = {
    level: getLevelLearnset(pokemonId, mode),
    tm: getTechMachineLearnset(pokemonId, mode),
    egg: getEggMoves(pokemonId, mode),
    tutor: getTutorMoves(monsno, formno, mode)
  };
  const eggGroupNames = getEggGroupViaPokemonId(pokemonId, mode).map((eggId) => getEggGroupNameById(eggId));
  const _formIds = getPokemonFormIds(p.monsno, mode);
  const _generatedForms = _formIds.map((formId) => {
    return {
      formId,
      name: getPokemonName(formId, mode),
      imageSrc: getImage(p.monsno, getPokemonFormIndexById(p.monsno, formId, mode)),
    };
  });
  const forms = _generatedForms.filter((f) => f.formId !== -1)

  const isValid = p.valid_flag === 1;
  const isBaseForm = p.form_index === 0;

  const item1 = getItemString(p.item1, mode)
  const item2 = getItemString(p.item2, mode)
  const item3 = getItemString(p.item3, mode)

  return {
    id,
    monsno,
    formno,
    name,
    dexDescription,
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
    evolutionTree,
    learnset,
    eggGroupNames,
    forms,
    isValid,
    isBaseForm,
    item1,
    item2,
    item3,
  };
}

module.exports = { getPokemon };
