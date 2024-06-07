const { getAbilityString } = require('./ability');
const { getTechMachineLearnset } = require('./moves');
const { getPokemonName } = require('./name');
const { getTypeName } = require('./types');
const { getWeight, getHeight } = require('./details');
const { getGrassKnotPower, getImage, formatBaseStats, getPokemonFormIndexById } = require('./functions');
const { PersonalTable} = require('./data');
const {getPokemonInfo} = require('./info');
describe('Dex Pokémon info test', () => {
    test('Should return a valid Pokémon info object', () => {
        const {monsno, pokemonId} = {monsno: 1, pokemonId: 1};
        const pokemonInfo = getPokemonInfo(monsno, pokemonId);
        const p = PersonalTable.Personal[pokemonId];
        const weight = getWeight(pokemonId);
        const desiredResult = {
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
            held_item1: p.item1,
            held_item2: p.item2,
            held_item3: p.item3,
        };
        expect(pokemonInfo).toEqual(desiredResult);
    });
    test('Should return the default Pokémon with ID 0 and NO 0', () => {
      const {monsno, pokemonId} = {monsno: 0, pokemonId: 0};
      const pokemonInfo = getPokemonInfo();
      const p = PersonalTable.Personal[pokemonId];
      const weight = getWeight(pokemonId);
      const desiredResult = {
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
          held_item1: p.item1,
          held_item2: p.item2,
          held_item3: p.item3,
      };
      expect(pokemonInfo).toEqual(desiredResult);
    });

});
