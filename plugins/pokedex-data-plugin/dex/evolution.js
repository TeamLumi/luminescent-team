const { EvolutionData, GAMEDATA2 } = require('../../../__gamedata');
const { EVOLUTION_METHOD_DETAILS, REPLACE_STRING } = require('./evolutionConstants');
const { getPokemonIdFromMonsNoAndForm, isValidPokemon } = require('./functions');
const { getMoveLevelLearned, getMoveId } = require('./moves');

function getEvolutionMethodDetail(methodId, methodParameter = 0, mode = GAMEDATA2, level, pokemonId = 0) {
  if (methodId === -1) {
    return -1;
  }
  if (!EVOLUTION_METHOD_DETAILS[methodId]){
    throw Error(`This Method is currently not handled: ${methodId}`)
  }
  const evolutionDetails = { ...EVOLUTION_METHOD_DETAILS[methodId] };
  const evoFunction = evolutionDetails.function;
  let evoMethod = evolutionDetails.method;
  if (evolutionDetails.requiresLevel) {
    evoMethod = "Level"
    evolutionDetails.method = evolutionDetails.method.replace(REPLACE_STRING, level);
  } else {
    try {
      evoMethod = evoFunction(methodParameter, mode);
    } catch (error){
      throw Error(`This method parameter doesn't work for mode: ${mode}. ${error} ${methodId}, ${methodParameter}, ${evoFunction.name}`)
    }

    if (evolutionDetails.parameterType === "Move") {
      const levelLearned = getMoveLevelLearned(pokemonId, getMoveId(evoMethod, mode), mode);
      if (levelLearned === -1) {
        evolutionDetails.method = 
          evolutionDetails.method.replace(
            REPLACE_STRING,
            `${evoMethod} (Cannot Learn)`
          );
      }
      if (levelLearned === 1) {
        evolutionDetails.method = 
          evolutionDetails.method.replace(
            REPLACE_STRING,
            `${evoMethod} (Relearn)`
          );
      } else if (levelLearned > 1) {
        evolutionDetails.method = 
          evolutionDetails.method.replace(
            REPLACE_STRING,
            `${evoMethod} (Learns at Lv. ${levelLearned})`
          );
      } else {
        evolutionDetails.method = 
          evolutionDetails.method.replace(
            REPLACE_STRING,
            `${evoMethod} (On Evo)`
          );
      }
    } else {
      evolutionDetails.method = evolutionDetails.method.replace(REPLACE_STRING, evoMethod);
    }
  }
  return [evolutionDetails, evoMethod];
}

function getEvolutionTree(pokemonId = 0, fromRoot = true, mode = GAMEDATA2) {
  if (!Number.isInteger(pokemonId) || pokemonId < 0) {
    throw new Error(`Bad pokemon ID: ${pokemonId}`);
  }

  if (!isValidPokemon(pokemonId, mode)) {
    return [];
  }

  const ModeEvolutionData = EvolutionData[mode];

  const pokemon = ModeEvolutionData[pokemonId];
  if (!pokemon) {
    throw new Error(`Bad pokemon ID: ${pokemonId}. Mode: ${mode}`);
  }

  const startPokemonId = fromRoot ? pokemon.path[0] : pokemonId;

  const evolution = ModeEvolutionData[startPokemonId];
  const evolutionDetails = getEvolutionDetails(startPokemonId, mode);

  const evolutionTree = {
    pokemonId: startPokemonId,
    evolutionDetails: evolutionDetails,
    evolvesInto: evolution.targets.map((nextStagePokemonId) => getEvolutionTree(nextStagePokemonId, false, mode)),
  };
  return evolutionTree;
}

function checkEvolutionPath(evolutionPath, originalPokemonId, mode = GAMEDATA2) {
  const ModeEvolutionData = EvolutionData[mode];
  const originalPath = ModeEvolutionData[originalPokemonId].path;

  function comparePath(treeNode, expectedId) {
  }

  comparePath(evolutionPath, originalPath[0]);
}

function getEvolutionDetails(pokemonId, mode = GAMEDATA2) {
  const ModeEvolutionData = EvolutionData[mode];
  const evolutionDetails = ModeEvolutionData[pokemonId].ar;

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

module.exports = { getEvolutionTree, getEvolutionMethodDetail };