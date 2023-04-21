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
    itemNames
} = require('./__gamedata');


const POKEMON_MAP = basePokemonNames.labelDataArray.reduce((acc, curr, i) => {
    const name = curr.wordDataArray[0].str;
    acc[name] = i;
    return acc;
}, {});

const MsgEventIDEnum = {
    0: '',
    1: '\n',
    3: '\f',
    7: ''
}

const FORM_MAP = PersonalTable.Personal.reduce((acc, curr) => {
    if (!Array.isArray(acc[curr.monsno])) {
        acc[curr.monsno] = [];
    }

    acc[curr.monsno].push(curr.id);
    return acc;
}, {})

function getPokemonFormId(monsno = 0, id) {
    return FORM_MAP[monsno].findIndex(e => e === id);
}

function findEarlierEvoStages(monsno, formNo = 0, pokemonId) {
    return EvolveTable.Evolve.filter(e => {
        for (let i = 0; i < e.ar.length; i += 5) {
            if (e.ar[i + 2] === monsno && e.ar[i + 3] === formNo) {
                return true;
            }
        }
    });
}

function getEvolutionData(pokemonId = 0) {
    const evos = EvolveTable.Evolve.find(e => e.id === pokemonId);
    const evoPaths = [];

    if(!evos || evos.ar.length === 0) return evoPaths;

    for (let i = 0; i < evos.ar.length; i += 5) {
        evoPaths.push([...evos.ar.slice(i, i + 5)]);
    }

    return evoPaths;
}

const EVOLUTION_SETS = {};

function findMonsnoAsTargetInEvolutionSet(monsno, formNo) {
    const targets = [];
    for(let [key, value] of Object.entries(EVOLUTION_SETS)) {

        for(let i = 0; i < value.length; i++) {
            if(value[i][1] === monsno && value[i][2] == formNo) {
                targets.push(key);
            }
        }
    }

    return targets.length === 0 ? null : targets;
}

function addToEvolutionSet(id, monsno, formNo) {
    const keysOfExistingSet = findMonsnoAsTargetInEvolutionSet(monsno, formNo);
    const personalInfo = PersonalTable.Personal.find(e => e.id === id);

    if(keysOfExistingSet === null) {
        if(!Array.isArray(EVOLUTION_SETS[id])) {
            EVOLUTION_SETS[id] = [[personalInfo.monsno, formNo, personalInfo.rank]];
        }
        
        const rank = PersonalTable.Personal.find(e => e.id === getPokemonIdFromMonsNoAndForm(monsno, formNo))?.rank;
        EVOLUTION_SETS[id].push([monsno, formNo, rank]);
        if(id === 265) {
            console.log('Child evos 1', id, monsno, formNo, EVOLUTION_SETS[id]);
        }

        EVOLUTION_SETS[id].sort((a, b) => a[0] - b[0]);
        return;
    }

    for(let key of keysOfExistingSet) {
        const firstSet = EVOLUTION_SETS[key];
        const newSet = [].concat(firstSet);
        const rank = PersonalTable.Personal.find(e => e.id === getPokemonIdFromMonsNoAndForm(monsno, formNo))?.rank;
        newSet.push([monsno, formNo, rank]);

        EVOLUTION_SETS[id] = newSet;
        EVOLUTION_SETS[key] = newSet;
        if(id === 265) {
            console.log('Child Evos 2', id, monsno, formNo, key, firstSet);
        }
    }
}

function getPokemonIdFromMonsNoAndForm(monsno, formno) {
    return PersonalTable.Personal.find(
        e => e.monsno === monsno && FORM_MAP[e.monsno][formno] === e.id
    )?.id;
}

function addEarlierEvolutionsToSet(currentPokemonId = 0) {
    const personalInfo = PersonalTable.Personal.find(e => e.id === currentPokemonId);
    const formNo = getPokemonFormId(personalInfo.monsno, currentPokemonId);
    const earlierEvos = findEarlierEvoStages(personalInfo.monsno, formNo);

    if(earlierEvos.length === 0) {
        //This evolution has no child evolutions either
        EVOLUTION_SETS[currentPokemonId] = EVOLUTION_SETS[currentPokemonId] ?? [];
        return;
    }
    
    earlierEvos.forEach(evo => {
        const earlyInfo = PersonalTable.Personal.find(e => e.id === evo.id);
        const formNo = getPokemonFormId(earlyInfo.monsno, earlyInfo.id);
        const earlierEvos = findEarlierEvoStages(earlyInfo.monsno, getPokemonFormId(earlyInfo.monsno, earlyInfo.id));
        //This did not take into account any pokemon after the first evo 
        for(let i = 0; i < evo.ar.length; i += 5) {
            earlierEvos.forEach(e => {
                for(let j = 0; j < e.ar.length; j += 5) {
                    const eInfo = PersonalTable.Personal.find(p => p.id === e.id);
                    const eformNo = getPokemonFormId(eInfo.monsno, eInfo.id);
                    const pokemonId = getPokemonIdFromMonsNoAndForm(eInfo.monsno, eformNo)
                    addToEvolutionSet(evo.ar[i + 2], eInfo.monsno, eformNo);
                }
            })
    
            addToEvolutionSet(evo.ar[i + 2], earlyInfo.monsno, formNo);
        }
    })
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

const EVOLUTION_METHODS = [
    "", "On LvUp: high friendship", "On LvUp: high friendship & is day", "On LvUp: high friendship & is night",
    "On LvUp: Lv ≥ LvReq", "On Trade", "On Trade: holds item", "Karrablast/Shelmet Trade",
    "On UseItem", "On LvUp: Lv ≥ LvReq & Atk > Def", "On LvUp: Lv ≥ LvReq & Def > Atk", "On LvUp: Lv ≥ LvReq & Atk = Def",
    "On LvUp: Lv ≥ LvReq & rng(0-9) ≤ 4", "On LvUp: Lv ≥ LvReq & rng(0-9) > 4", "On LvUp: Lv ≥ LvReq → Get Shedinja", "SPECIAL_NUKENIN",
    "On LvUp: high beauty", "On UseItem: is male", "On UseItem: is female", "On LvUp: Lv ≥ LvReq & holds item & is day",
    "On LvUp: Lv ≥ LvReq & holds item & is night", "On LvUp: has move", "On LvUp: Pokémon in party", "On LvUp: Lv ≥ LvReq & is male",
    "On LvUp: Lv ≥ LvReq & is female", "On LvUp: is by magnetic field", "On LvUp: is by moss rock", "On LvUp: is by ice rock",
    "On LvUp: Lv ≥ LvReq & device upside down", "On LvUp: high friendship & has move of type", "On LvUp: Lv ≥ LvReq & Dark Pokémon in party", "On LvUp: Lv ≥ LvReq & is raining",
    "On LvUp: Lv ≥ LvReq & is day", "On LvUp: Lv ≥ LvReq & is night", "On LvUp: Lv ≥ LvReq & is female → set form to 1", "FRIENDLY",
    "On LvUp: Lv ≥ LvReq & is game version", "On LvUp: Lv ≥ LvReq & is game version & is day", "On LvUp: Lv ≥ LvReq & is game version & is night", "On LvUp: is by summit",
    "On LvUp: Lv ≥ LvReq & is dusk", "On LvUp: Lv ≥ LvReq & is outside region", "On UseItem: is outside region", "Galarian Farfetch'd Evolution",
    "Galarian Yamask Evolution", "Milcery Evolution", "On LvUp: Lv ≥ LvReq & has amped nature", "On LvUp: Lv ≥ LvReq & has low-key nature"
]

const EVOLUTION_METHOD_REQUIRES_LEVEL = [
    false, false, false, false, true, false, false, false, false, true, true, true, true, true, true, true,
    false, false, false, true, true, false, false, true, true, false, false, false, true, false, true, true,
    true, true, true, false, true, true, true, false, true, true, false, false, false, false, true, true
]

const None = 0, Item = 1, Move = 2, Pokemon = 3, Typing = 4, GameVersion = 5;
const EVOLUTION_METHOD_PARAM_TYPE = [
    None, None, None, None,
    None, None, Item, None,
    Item, None, None, None,
    None, None, None, None,
    None, Item, Item, Item,
    Item, Move, Pokemon, None,
    None, None, None, None,
    None, Typing, None, None,
    None, None, None, None,
    GameVersion, GameVersion, GameVersion, None,
    None, None, Item, None,
    None, None, None, None,
]
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

function parseTmLearnsetSection(dec) {
    return (dec >>> 0).toString(2).split('').reverse().join('').padStart(32, 0);
}

function getName(monsno = 0) {
    return basePokemonNames.labelDataArray[monsno]?.wordDataArray[0]?.str || 'Egg';
}

function getFormName(formId) {
    return formPokemonNames.labelDataArray[formId]?.wordDataArray[0]?.str || 'Egg';
}

function getImage(monsno = 0) {
    return `/img/pm${monsno.toString().padStart(4, 0) ?? '0000'
        }_00_00_00_L.webp`
};

function getHeight(monsno = 0) {
    const heightString = pokemonHeight.labelDataArray[monsno]?.wordDataArray[0]?.str || '0';
    const [feetString, inchesString] = heightString.split("'");
    const inches = parseFloat(inchesString.substring(0, inchesString.length - 1));
    const feet = parseInt(feetString);

    const feetInCentimeters = feet * 30.48;
    const inchesInCentimeters = inches * 2.54;
    return ((feetInCentimeters + inchesInCentimeters) / 100).toFixed(2);
}

function getWeight(monsno = 0) {
    const weightString = pokemonWeight.labelDataArray[monsno]?.wordDataArray[0]?.str || '0';

    const [poundsString] = weightString.split(" ");
    const pounds = parseFloat(poundsString.trim());

    const poundsInKilogram = pounds * 0.453592;
    return poundsInKilogram.toFixed(2);
}

function getType(typeId) {
    return typeName.labelDataArray[typeId]?.wordDataArray[0]?.str || 'None';
}

function getNature(id = 0) {
    return natureNames.labelDataArray[id]?.wordDataArray[0]?.str || 'None';
}

function formatBaseStats(p) {
    return `HP: ${p.basic_hp} / ATK: ${p.basic_atk} / DEF: ${p.basic_def} / SPA: ${p.basic_spatk} / SPD: ${p.basic_spdef} / SPE: ${p.basic_agi}`;
}

function getAbility(id) {
    return abilityNames.labelDataArray[id]?.wordDataArray[0]?.str || 'None';
}
function getAbilityInfo(id) {
    return abilityInfo.labelDataArray[id]?.wordDataArray[0]?.str || 'None';
}

function getTechMachineLearnset(m1, m2, m3, m4) {
    const learnset = [
        parseTmLearnsetSection(m1),
        parseTmLearnsetSection(m2),
        parseTmLearnsetSection(m3),
        parseTmLearnsetSection(m4),
    ].join('').split('').flatMap(e => parseInt(e));

    const canLearn = [];
    for (let i = 0; i < learnset.length; i++) {
        if (learnset[i] === 0) continue;

        const tm = ItemTable.WazaMachine[i];
        canLearn.push({level: 'tm', moveId: tm.wazaNo});
    }

    return canLearn;
}

function getGrassKnotPower(weightkg) {
    if (weightkg >= 200) return 120;
    if (weightkg >= 100) return 100;
    if (weightkg >= 50) return 80;
    if (weightkg >= 25) return 60;
    if (weightkg >= 10) return 40;
    return 20;
}

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
            hp: p.basic_hp, atk: p.basic_atk, def: p.basic_def, spa: p.basic_spatk, spd: p.basic_spdef, spe: p.basic_agi
        },
        baseStatsTotal: p.basic_hp + p.basic_atk + p.basic_def + p.basic_spatk + p.basic_spdef + p.basic_agi,
        weight: getWeight(monsno),
        height: getHeight(monsno),
        grassKnotPower: getGrassKnotPower(getWeight(monsno)),
        type1: getType(p.type1),
        type2: getType(p.type2),
        imageSrc: getImage(monsno)
    }
}

function getPokemonNames(maxMonsno) {
    const pokemonNames = [];
    for (let nameObject of basePokemonNames.labelDataArray) {
        if (typeof maxMonsno === 'number' && nameObject.arrayIndex > maxMonsno) return pokemonNames;
        pokemonNames.push(nameObject.wordDataArray[0].str)
    }

    return pokemonNames;
}

function getPokemonIdFromName(name = 'Egg') {
    return POKEMON_MAP[name];
}

function getMoveProperties(moveId = 0) {
    const { type, damageType, power, hitPer, basePP } = MovesTable.Waza[moveId];
    const maxPP = (basePP ?? 0) * (8 / 5);
    return {
        name: moveNames.labelDataArray[moveId].wordDataArray[0]?.str ?? 'None',
        desc: getMoveDescription(moveId),
        type,
        damageType, //0 = Status, 1 = Physical, 2 = Special
        maxPP,
        power,
        accuracy: hitPer
    }
}

function getPokemonLearnset(monsno = 0) {
    return LearnsetTable.WazaOboe[monsno].ar;
}

function getMoveDescription(moveId = 0) {
    const wordData = moveInfo.labelDataArray[moveId].wordDataArray;
    let description = wordData.reduce(
        (moveDescription, currentString) => {
            return moveDescription + currentString.str + ' ';
        }, '')
    return description;
}

// function getEvolutionStages(monsno = 0) {
//     const evos = EVOLUTION_MAP[monsno];
// }

function getPastEvolutionStages(monsno = 0) {

}

function getEggMoves(dexId = 0) {
    const {monsno} = PersonalTable.Personal[dexId];
    const formNo = getPokemonFormId(monsno, dexId);
    const eggMoves = EggMovesTable.Data.find(e => e.no === monsno && e.formNo === formNo)?.wazaNo ?? [];
    return eggMoves.map(moveId => ({
        level: 'egg',
        moveId
    }))
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
    getEggMoves
}
