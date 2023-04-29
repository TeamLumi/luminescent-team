import EvolutionData from '../../../__gamedata/evolution.json';
import { getPokemonIdFromMonsNoAndForm } from './functions';
import { getPokemonName } from './name';

const None = 0,
  Item = 1,
  Move = 2,
  Pokemon = 3,
  Typing = 4,
  GameVersion = 5;

const EVOLUTION_METHOD_REQUIRES_LEVEL = [
  false,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
  true,
  true,
  false,
  false,
  false,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
];

const EVOLUTION_METHODS = [
  '',
  'On LvUp: high friendship',
  'On LvUp: high friendship & is day',
  'On LvUp: high friendship & is night',
  'On LvUp: Lv ≥ LvReq',
  'On Trade',
  'On Trade: holds item',
  'Karrablast/Shelmet Trade',
  'On UseItem',
  'On LvUp: Lv ≥ LvReq & Atk > Def',
  'On LvUp: Lv ≥ LvReq & Def > Atk',
  'On LvUp: Lv ≥ LvReq & Atk = Def',
  'On LvUp: Lv ≥ LvReq & rng(0-9) ≤ 4',
  'On LvUp: Lv ≥ LvReq & rng(0-9) > 4',
  'On LvUp: Lv ≥ LvReq → Get Shedinja',
  'SPECIAL_NUKENIN',
  'On LvUp: high beauty',
  'On UseItem: is male',
  'On UseItem: is female',
  'On LvUp: Lv ≥ LvReq & holds item & is day',
  'On LvUp: Lv ≥ LvReq & holds item & is night',
  'On LvUp: has move',
  'On LvUp: Pokémon in party',
  'On LvUp: Lv ≥ LvReq & is male',
  'On LvUp: Lv ≥ LvReq & is female',
  'On LvUp: is by magnetic field',
  'On LvUp: is by moss rock',
  'On LvUp: is by ice rock',
  'On LvUp: Lv ≥ LvReq & device upside down',
  'On LvUp: high friendship & has move of type',
  'On LvUp: Lv ≥ LvReq & Dark Pokémon in party',
  'On LvUp: Lv ≥ LvReq & is raining',
  'On LvUp: Lv ≥ LvReq & is day',
  'On LvUp: Lv ≥ LvReq & is night',
  'On LvUp: Lv ≥ LvReq & is female → set form to 1',
  'FRIENDLY',
  'On LvUp: Lv ≥ LvReq & is game version',
  'On LvUp: Lv ≥ LvReq & is game version & is day',
  'On LvUp: Lv ≥ LvReq & is game version & is night',
  'On LvUp: is by summit',
  'On LvUp: Lv ≥ LvReq & is dusk',
  'On LvUp: Lv ≥ LvReq & is outside region',
  'On UseItem: is outside region',
  "Galarian Farfetch'd Evolution",
  'Galarian Yamask Evolution',
  'Milcery Evolution',
  'On LvUp: Lv ≥ LvReq & has amped nature',
  'On LvUp: Lv ≥ LvReq & has low-key nature',
];

const EVOLUTION_METHOD_PARAM_TYPE = [
  None,
  None,
  None,
  None,
  None,
  None,
  Item,
  None,
  Item,
  None,
  None,
  None,
  None,
  None,
  None,
  None,
  None,
  Item,
  Item,
  Item,
  Item,
  Move,
  Pokemon,
  None,
  None,
  None,
  None,
  None,
  None,
  Typing,
  None,
  None,
  None,
  None,
  None,
  None,
  GameVersion,
  GameVersion,
  GameVersion,
  None,
  None,
  None,
  Item,
  None,
  None,
  None,
  None,
  None,
];

const PARAM_TYPE = ['None', 'Item', 'Move', 'Pokemon', 'Typing', 'GameVersion'];

function getEvolutionPath(pokemonId = '0') {
  if (typeof pokemonId !== 'string' || isNaN(parseInt(pokemonId)) || pokemonId === '')
    throw new Error(`Bad pokemonId: ${pokemonId}`);

  return EvolutionData[pokemonId];
}

function getEvolutionMethodString(method = 0) {
  if (!Number.isInteger(method) || method < 0) throw new Error(`Bad method: ${method}`);
  return EVOLUTION_METHODS[method];
}

function doesEvolutionMethodRequireLevel(method = 0) {
  if (!Number.isInteger(method) || method < 0) throw new Error(`Bad method: ${method}`);
  return EVOLUTION_METHOD_REQUIRES_LEVEL[method];
}

function getParameterTypeByMethodId(method = 0) {
  if (!Number.isInteger(method) || method < 0) throw new Error(`Bad method: ${method}`);
  const paramType = EVOLUTION_METHOD_PARAM_TYPE[method];
  const paramTypeString = PARAM_TYPE[paramType];
  return paramTypeString;
}

/**
 *
 * @param {{path: number[], method: [], ar: number[][]]}} evolutionObject
 */
function displayEvolutionData(id = '156') {
  const evolutionObject = EvolutionData[id];
  const validPath = validIds(evolutionObject.path, evolutionObject.ar);
  console.log(evolutionObject.path, validPath);
  let stage1id = evolutionObject.path[0];
  let stage1data = evolutionObject.ar[0];
  const stageOneTargetId = getPokemonIdFromMonsNoAndForm(evolutionObject.ar[0][2], evolutionObject.ar[0][3]);
  const stageOneName = getPokemonName(stage1id);
  const stageOneTargetName = getPokemonName(stageOneTargetId);
  console.log(stageOneName, stageOneTargetName);
  const stageOne = {
    id: stage1id,
    target: stageOneTargetId,
    name: stageOneName,
    targetName: stageOneTargetName,
    method: {
      data: stage1data,
      text: getEvolutionMethodString(stage1data[0]),
      param: getParameterTypeByMethodId(stage1data[0]),
      requiresLevel: doesEvolutionMethodRequireLevel(stage1data[0]),
      level: stage1data[4],
    },
  };

  return stageOne;
}

function validIds(path, ar) {
  return path.filter((pokemonId, idx) => {
    if (idx === 0) return pokemonId;
    for (let currentArray of ar) {
      for (let i = 0; i < currentArray.length; i += 5) {
        const monsno = currentArray[i + 2];
        const formno = currentArray[i + 3];
        const targetId = getPokemonIdFromMonsNoAndForm(monsno, formno);
        if (pokemonId === targetId) return true;
      }
    }

    return false;
  });
}

/**
 For each index in path, the same index in ar is the evolution information 
 
 */
export { getEvolutionPath, displayEvolutionData };
