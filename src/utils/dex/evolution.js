import { EvolutionData } from '../../../__gamedata';
import { EVOLUTION_METHOD_DETAILS } from './evolutionConstants';
import { getPokemonIdFromMonsNoAndForm } from './functions';

function getEvolutionMethodDetail(methodId) {
  if (!Number.isInteger(methodId) || methodId < 0) throw new Error(`Bad method: ${methodId}`);

  return EVOLUTION_METHOD_DETAILS[methodId];
}

function getEvolutionTree(pokemonId = 0, fromRoot = true) {
  const pokemon = EvolutionData[pokemonId];
  const startPokemonId = fromRoot ? pokemon.path[0] : pokemonId;

  const evolution = EvolutionData[startPokemonId];

  return {
    pokemonId: startPokemonId,
    evolutionDetails: getEvolutionDetails(startPokemonId),
    evolvesInto: evolution.targets.map((nextStagePokemonId) => getEvolutionTree(nextStagePokemonId, false)),
  };
}

function getEvolutionDetails(pokemonId) {
  const evolutionDetails = EvolutionData[pokemonId].ar;

  for (let i = 0; i < evolutionDetails.length; i++) {
    const evolutionData = evolutionDetails[i];

    const methodId = evolutionData[0];
    const methodParameter = evolutionData[1];
    const monsNo = evolutionData[2];
    const formNo = evolutionData[3];
    const level = evolutionData[4];

    const evolutionPokemonId = getPokemonIdFromMonsNoAndForm(monsNo, formNo);
    if (evolutionPokemonId === pokemonId) {
      return {
        methodId,
        methodParameter,
        monsNo,
        formNo,
        level,
      };
    }
  }

  return null;
}

export { getEvolutionTree };
