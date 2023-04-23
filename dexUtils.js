const {
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
} = require('./__gamedata');

const MsgEventIDEnum = {
  0: '',
  1: '\n',
  3: '\f',
  7: '',
};

function findEarlierEvoStages(monsno, formNo = 0, pokemonId) {
  return EvolveTable.Evolve.filter((e) => {
    for (let i = 0; i < e.ar.length; i += 5) {
      if (e.ar[i + 2] === monsno && e.ar[i + 3] === formNo) {
        return true;
      }
    }
  });
}

function getEvolutionData(pokemonId = 0) {
  const evos = EvolveTable.Evolve.find((e) => e.id === pokemonId);
  const evoPaths = [];

  if (!evos || evos.ar.length === 0) return evoPaths;

  for (let i = 0; i < evos.ar.length; i += 5) {
    evoPaths.push([...evos.ar.slice(i, i + 5)]);
  }

  return evoPaths;
}

const EVOLUTION_SETS = {};

function findMonsnoAsTargetInEvolutionSet(monsno, formNo) {
  const targets = [];
  for (let [key, value] of Object.entries(EVOLUTION_SETS)) {
    for (let i = 0; i < value.length; i++) {
      if (value[i][1] === monsno && value[i][2] == formNo) {
        targets.push(key);
      }
    }
  }

  return targets.length === 0 ? null : targets;
}

function addToEvolutionSet(id, monsno, formNo) {
  const keysOfExistingSet = findMonsnoAsTargetInEvolutionSet(monsno, formNo);
  const personalInfo = PersonalTable.Personal.find((e) => e.id === id);

  if (keysOfExistingSet === null) {
    if (!Array.isArray(EVOLUTION_SETS[id])) {
      EVOLUTION_SETS[id] = [[personalInfo.monsno, formNo, personalInfo.rank]];
    }

    const rank = PersonalTable.Personal.find((e) => e.id === getPokemonIdFromMonsNoAndForm(monsno, formNo))?.rank;
    EVOLUTION_SETS[id].push([monsno, formNo, rank]);
    if (id === 265) {
      console.log('Child evos 1', id, monsno, formNo, EVOLUTION_SETS[id]);
    }

    EVOLUTION_SETS[id].sort((a, b) => a[0] - b[0]);
    return;
  }

  for (let key of keysOfExistingSet) {
    const firstSet = EVOLUTION_SETS[key];
    const newSet = [].concat(firstSet);
    const rank = PersonalTable.Personal.find((e) => e.id === getPokemonIdFromMonsNoAndForm(monsno, formNo))?.rank;
    newSet.push([monsno, formNo, rank]);

    EVOLUTION_SETS[id] = newSet;
    EVOLUTION_SETS[key] = newSet;
    if (id === 265) {
      console.log('Child Evos 2', id, monsno, formNo, key, firstSet);
    }
  }
}

function getPokemonIdFromMonsNoAndForm(monsno, formno) {
  return PersonalTable.Personal.find((e) => e.monsno === monsno && FORM_MAP[e.monsno][formno] === e.id)?.id;
}

function addEarlierEvolutionsToSet(currentPokemonId = 0) {
  const personalInfo = PersonalTable.Personal.find((e) => e.id === currentPokemonId);
  const formNo = getPokemonFormId(personalInfo.monsno, currentPokemonId);
  const earlierEvos = findEarlierEvoStages(personalInfo.monsno, formNo);

  if (earlierEvos.length === 0) {
    //This evolution has no child evolutions either
    EVOLUTION_SETS[currentPokemonId] = EVOLUTION_SETS[currentPokemonId] ?? [];
    return;
  }

  earlierEvos.forEach((evo) => {
    const earlyInfo = PersonalTable.Personal.find((e) => e.id === evo.id);
    const formNo = getPokemonFormId(earlyInfo.monsno, earlyInfo.id);
    const earlierEvos = findEarlierEvoStages(earlyInfo.monsno, getPokemonFormId(earlyInfo.monsno, earlyInfo.id));
    //This did not take into account any pokemon after the first evo
    for (let i = 0; i < evo.ar.length; i += 5) {
      earlierEvos.forEach((e) => {
        for (let j = 0; j < e.ar.length; j += 5) {
          const eInfo = PersonalTable.Personal.find((p) => p.id === e.id);
          const eformNo = getPokemonFormId(eInfo.monsno, eInfo.id);
          const pokemonId = getPokemonIdFromMonsNoAndForm(eInfo.monsno, eformNo);
          addToEvolutionSet(evo.ar[i + 2], eInfo.monsno, eformNo);
        }
      });

      addToEvolutionSet(evo.ar[i + 2], earlyInfo.monsno, formNo);
    }
  });
}

// TODO
// - How do I represent branching evolutions where only one branch should be displayed at a time, dependent on selection?
// - How do I queue the list of evolutions correctly? Try rank

// EvolveTable.Evolve.forEach((curr) => {
//     const currentPokemonId = curr.id;
//     const evolutions = getEvolutionData(currentPokemonId);

//     if(evolutions.length === 0) {
//         //The Pokemon has no parent evolution, therefore assume it has children evolution, and search for them.
//        return addEarlierEvolutionsToSet(currentPokemonId);
//     }

//     for(let currentEvo of evolutions) {
//         const currentEvoPokemonId = getPokemonIdFromMonsNoAndForm(currentEvo[2], currentEvo[3]);

//         const parentEvolutionData = getEvolutionData(currentEvoPokemonId);
//         for(let parentEvo of parentEvolutionData) {
//             addToEvolutionSet(currentPokemonId, parentEvo[2], parentEvo[3]);
//         }

//         if(currentPokemonId === 265) {
//             console.log('Evos', currentEvo, parentEvolutionData, currentEvo[2], currentEvo[3]);
//         }

//         addToEvolutionSet(currentPokemonId, currentEvo[2], currentEvo[3]);
//     }

//     addEarlierEvolutionsToSet(currentPokemonId);
// });

/**
 Untouched properties:
 color
 gra_no
 get_rate
 exp_value
 item1
 item2
 item3
 sex
 egg_birth
 initial_friendship
 egg_group1
 egg_group2
 grow
 give_exp
 */

function getPokemonInfo(monsno = 0) {
  const p = PersonalTable.Personal[monsno];
  return {
    monsno: monsno,
    name: getName(monsno),
    ability1: getAbility(p.tokusei1),
    ability2: getAbility(p.tokusei2),
    abilityH: getAbility(p.tokusei3),
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
    weight: getWeight(monsno),
    height: getHeight(monsno),
    grassKnotPower: getGrassKnotPower(getWeight(monsno)),
    type1: getType(p.type1),
    type2: getType(p.type2),
    imageSrc: getImage(monsno),
  };
}

function getPokemonNames(maxMonsno) {
  const pokemonNames = [];
  for (let nameObject of basePokemonNames.labelDataArray) {
    if (typeof maxMonsno === 'number' && nameObject.arrayIndex > maxMonsno) return pokemonNames;
    pokemonNames.push(nameObject.wordDataArray[0].str);
  }

  return pokemonNames;
}

function getPokemonIdFromName(name = 'Egg') {
  return POKEMON_MAP[name];
}

module.exports = {
  getPokemonInfo,
  getAbilityInfo,
  getEvolutionData,
  getPokemonNames,
  getPokemonIdFromName,
  getMoveProperties,
  getPokemonLearnset,
  getType,
  getEggMoves,
};
