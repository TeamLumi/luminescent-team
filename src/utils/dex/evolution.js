import { EvolutionData } from '../../../__gamedata';
import { getPokemonIdFromMonsNoAndForm } from './functions';


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

function getEvolutionTree(pokemonId = 0) {
  const currentTree = EvolutionData[pokemonId];
  if(currentTree.path.length <= 1) return null;
  const evolutionTree = {
    id: currentTree.path[0],
    children: currentTree.targets.map((target) => createChildrenObject(target, currentTree.path[0]))
  }

  return evolutionTree;
}

function createChildrenObject(pokemonId, previousId) {
  const currentTargetEvolutionData = EvolutionData[pokemonId];
  const previousEvoData = EvolutionData[previousId];
  const {} = getPokemonIdFromMonsNoAndForm
  let methodProperties = [];
  for(let evoDetails of previousEvoData.ar) {
      for(let i = 0; i< evoDetails.length; i += 5) {
        const evoPokemonId = getPokemonIdFromMonsNoAndForm(evoDetails[i +2], evoDetails[i + 3])
          if(evoPokemonId === pokemonId) {
              methodProperties = evoDetails.slice(i, i + 5);
              break;
          }
      }
  }
  return {
    id: pokemonId,
    evolutionDetails: methodProperties,//[method, methodParameter, monsNo, formNo, level]
    children: currentTargetEvolutionData.targets.map(target => createChildrenObject(target, pokemonId))
  }
}

export default {
  getEvolutionMethodString,
  getEvolutionTree,
  getParameterTypeByMethodId,
  doesEvolutionMethodRequireLevel,

}