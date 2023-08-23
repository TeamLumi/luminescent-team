import { EvolutionData } from '../../../__gamedata';
import { EVOLUTION_METHOD_DETAILS } from './evolutionConstants';
import { getPokemonIdFromMonsNoAndForm } from './functions';

function getEvolutionMethodDetail(methodId) {
  if (!Number.isInteger(methodId) || methodId < 0) throw new Error(`Bad method: ${methodId}`);

  return EVOLUTION_METHOD_DETAILS[methodId];
}

function getEvolutionTree(pokemonId = 0, fromRoot = true) {
  if (!Number.isInteger(pokemonId) || pokemonId < 0) {
    throw new Error(`Bad pokemon ID: ${pokemonId}`);
  }

  const pokemon = EvolutionData[pokemonId];
  if (!pokemon) {
    throw new Error(`Bad pokemon ID: ${pokemonId}`);
  }

  const startPokemonId = fromRoot ? pokemon.path[0] : pokemonId;

  const evolution = EvolutionData[startPokemonId];

  const evolutionTree = {
    pokemonId: startPokemonId,
    evolutionDetails: getEvolutionDetails(startPokemonId),
    evolvesInto: evolution.targets.map((nextStagePokemonId) => getEvolutionTree(nextStagePokemonId, false)),
  };
  return evolutionTree;
}

function checkEvolutionPath(evolutionData, originalPokemonId) {
  const originalPath = EvolutionData[originalPokemonId].path;

  function comparePath(treeNode, expectedId) {
  }

  comparePath(evolutionData, originalPath[0]);
}

function getEvolutionDetails(pokemonId) {
  const evolutionDetails = EvolutionData[pokemonId].ar;

  if (!evolutionDetails) {
    return null;
  }

  for (let i = 0; i < evolutionDetails.length; i++) {
    const evolutionData = evolutionDetails[i];
    let methodIds = [];
    let methodParameters = [];
    let monsNos = [];
    let formNos = [];
    let levels = [];

    for (let j = 0; j < evolutionData.length; j += 5) {
      const methodId = evolutionData[j + 0];
      const methodParameter = evolutionData[j + 1];
      const monsNo = evolutionData[j + 2];
      const formNo = evolutionData[j + 3];
      const level = evolutionData[j + 4];

      const evolutionPokemonId = getPokemonIdFromMonsNoAndForm(monsNo, formNo);
      if (evolutionPokemonId === pokemonId) {
        methodIds.push(methodId);
        methodParameters.push(methodParameter);
        monsNos.push(monsNo);
        formNos.push(formNo);
        levels.push(level);
      }
    }
    if (methodIds.length > 0) {
      return {
        methodIds,
        methodParameters,
        monsNos,
        formNos,
        levels,
      };
    }
  }
  return null;
}

export { getEvolutionTree, getEvolutionMethodDetail };