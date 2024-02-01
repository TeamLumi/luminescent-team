import { EvolutionData } from './data';
import { EvolutionData3 } from './data3';
import { EVOLUTION_METHOD_DETAILS, evolutionFunctions } from './evolutionConstants';
import { getPokemonIdFromMonsNoAndForm } from './functions';
import { REPLACE_STRING } from './evolutionConstants';

function getEvolutionMethodDetail(methodId, methodParameter = 0, level) {
  if (methodId === -1) {
    return -1;
  }
  if (!Number.isInteger(methodId) || methodId < 0 || methodId > 47) throw new Error(`Bad method: ${methodId}`);
  const evolutionDetails = { ...EVOLUTION_METHOD_DETAILS[methodId] };
  const evoFunction = evolutionDetails.function;
  let evoMethod = evolutionDetails.method;
  if (evolutionDetails.requiresLevel) {
    evoMethod = "Level"
    evolutionDetails.method = evolutionDetails.method.replace(REPLACE_STRING, level);
  } else if (methodParameter !== 0) {
    evoMethod = evoFunction(methodParameter);
    evolutionDetails.method = evolutionDetails.method.replace(REPLACE_STRING, evoFunction(methodParameter));
  }
  return [evolutionDetails, evoMethod];
}

function getEvolutionTree(pokemonId = 0, fromRoot = true, mode = "2.0") {
  if (!Number.isInteger(pokemonId) || pokemonId < 0) {
    throw new Error(`Bad pokemon ID: ${pokemonId}`);
  }

  const evolutionData = mode === "2.0" ? EvolutionData : EvolutionData3;

  const pokemon = evolutionData[pokemonId];
  if (!pokemon) {
    throw new Error(`Bad pokemon ID: ${pokemonId}`);
  }

  const startPokemonId = fromRoot ? pokemon.path[0] : pokemonId;

  const evolution = evolutionData[startPokemonId];

  const evolutionTree = {
    pokemonId: startPokemonId,
    evolutionDetails: getEvolutionDetails(startPokemonId, mode),
    evolvesInto: evolution.targets.map((nextStagePokemonId) => getEvolutionTree(nextStagePokemonId, false, mode)),
  };
  return evolutionTree;
}

function checkEvolutionPath(evolutionPath, originalPokemonId, mode = "2.0") {
  const evolutionData = mode === "2.0" ? EvolutionData : EvolutionData3
  const originalPath = evolutionData[originalPokemonId].path;

  function comparePath(treeNode, expectedId) {
  }

  comparePath(evolutionPath, originalPath[0]);
}

function getEvolutionDetails(pokemonId, mode = "2.0") {
  const evolutionData = mode === "2.0" ? EvolutionData : EvolutionData3
  const evolutionDetails = evolutionData[pokemonId].ar;

  if (!evolutionDetails) {
    return null;
  }

  for (let i = 0; i < evolutionDetails.length; i++) {
    const evolutionInfo = evolutionDetails[i];
    let methodIds = [];
    let methodParameters = [];
    let monsNos = [];
    let formNos = [];
    let levels = [];

    for (let j = 0; j < evolutionInfo.length; j += 5) {
      const methodId = evolutionInfo[j + 0];
      const methodParameter = evolutionInfo[j + 1];
      const monsNo = evolutionInfo[j + 2];
      const formNo = evolutionInfo[j + 3];
      const level = evolutionInfo[j + 4];

      const evolutionPokemonId = getPokemonIdFromMonsNoAndForm(monsNo, formNo, mode);
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