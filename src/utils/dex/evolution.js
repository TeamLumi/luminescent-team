import { EvolutionData } from '../../../__gamedata';
import { getPokemonIdFromMonsNoAndForm } from './functions';

function getEvolutionTree(pokemonId = 0) {
  const currentPokemon = EvolutionData[pokemonId];
  const rootId = currentPokemon.path[0];
  const currentTree = EvolutionData[rootId];

  if (currentTree.path.length <= 1) return null;

  const evolutionTree = {
    id: rootId,
    children: currentTree.targets.map((target) => createChildrenObject(target)),
  };

  return evolutionTree;
}

function createChildrenObject(pokemonId) {
  const currentTargetEvolutionData = EvolutionData[pokemonId];
  const previousEvoData = EvolutionData[currentTargetEvolutionData.path[0]];

  let methodProperties = [];
  for (let j = 0; j < previousEvoData.ar.length; j++) {
    const evoDetails = previousEvoData.ar[j];

    for (let i = 0; i < evoDetails.length; i += 5) {
      const evoPokemonId = getPokemonIdFromMonsNoAndForm(evoDetails[i + 2], evoDetails[i + 3]);
      if (evoPokemonId === pokemonId) {
        methodProperties = evoDetails.slice(i, i + 5);
        break;
      }
    }
  }

  return {
    id: pokemonId,
    evolutionDetails: methodProperties, //[method, methodParameter, monsNo, formNo, level]
    children: currentTargetEvolutionData.targets.map((target) => createChildrenObject(target, pokemonId)),
  };
}

export { getEvolutionTree };
