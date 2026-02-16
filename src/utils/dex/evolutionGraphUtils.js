import { getEvolutionMethodDetail } from '../../../plugins/pokedex-data-plugin/dex/evolution';
import { getItemImageUrl, getTMImageUrl } from '../../../plugins/pokedex-data-plugin/dex/item';
import { getMoveProperties } from '../../../plugins/pokedex-data-plugin/dex/moves';
import { getTypeName } from './types';
import { getPokemonImageFilename } from '../../core/pokemonFormSelector';
import * as EvoConstants from '../../../plugins/pokedex-data-plugin/dex/evolutionConstants';

/**
 * Get evolution method icon URLs for a given evolution method.
 * Extracted from the original renderItemImage logic.
 */
export function getEvolutionMethodIcons(evoMethod, methodParameter, methodDetail, mode) {
  const evoFunction = methodDetail.function.name;
  const evoImages = [];

  if (methodDetail.method.includes(EvoConstants.FRIENDSHIP)) {
    evoImages.push(getItemImageUrl('Soothe Bell'));
  }
  if (methodDetail.method.includes(EvoConstants.LEVEL)) {
    evoImages.push(getItemImageUrl('Rare Candy'));
  }
  if (methodDetail.method.includes(EvoConstants.CRITICAL_HITS)) {
    evoImages.push('/img/custom/criticalhits.webp');
  }
  if (methodDetail.method.includes(EvoConstants.RECEIVE_DAMAGE)) {
    evoImages.push('/img/custom/receivedamage.webp');
  }
  if (methodDetail.method.includes(EvoConstants.FOLLOWER)) {
    evoImages.push('/img/custom/followersteps.webp');
  }
  if (evoFunction === EvoConstants.ITEM_STRING_FUNCTION) {
    evoImages.push(getItemImageUrl(evoMethod));
  } else if (evoFunction === EvoConstants.MOVE_STRING_FUNCTION) {
    const moveType = getTypeName(getMoveProperties(methodParameter, mode).type);
    evoImages.push(getTMImageUrl(moveType));
  } else if (evoFunction === EvoConstants.POKEMON_NAME_FUNCTION) {
    evoImages.push(`/img/pkm/${getPokemonImageFilename(methodParameter, 0)}`);
  } else if (evoFunction === EvoConstants.TYPE_NAME_FUNCTION) {
    const moveType = getTypeName(methodParameter);
    evoImages.push(getTMImageUrl(moveType));
  }
  if (methodDetail.method.includes(EvoConstants.RNG)) {
    evoImages.push('/img/custom/randomchance.webp');
  }
  if (methodDetail.method.includes(EvoConstants.DAY)) {
    evoImages.push('/img/custom/sun.webp');
  } else if (methodDetail.method.includes(EvoConstants.NIGHT)) {
    evoImages.push('/img/custom/moon.webp');
  } else if (methodDetail.method.includes(EvoConstants.DUSK)) {
    evoImages.push('/img/custom/dusk.webp');
  }
  if (methodDetail.method.includes(EvoConstants.MOSS_ROCK)) {
    evoImages.push('/img/custom/mossyrock.webp');
  } else if (methodDetail.method.includes(EvoConstants.ICE_ROCK)) {
    evoImages.push('/img/custom/icyrock.webp');
  }
  if (methodDetail.method.includes(EvoConstants.MALE)) {
    evoImages.push('/img/custom/male.webp');
  } else if (methodDetail.method.includes(EvoConstants.FEMALE)) {
    evoImages.push('/img/custom/female.webp');
  }
  if (methodDetail.method.includes(EvoConstants.BEAUTY)) {
    evoImages.push(getItemImageUrl('Blue Scarf'));
  }
  return evoImages;
}

/**
 * Get the full evolution method label text for an edge.
 * Handles multiple method IDs (OR evolutions) on a single edge.
 */
export function getEdgeLabel(methodIds, methodParameters, levels, pokemonId, mode) {
  const labels = [];
  const iconSets = [];

  for (let i = 0; i < methodIds.length; i++) {
    const methodId = methodIds[i];
    if (methodId === -1) continue;

    const methodParameter = parseInt(methodParameters[i], 10);
    if (Number.isNaN(methodParameter)) continue;

    let result;
    try {
      result = getEvolutionMethodDetail(methodId, methodParameter, mode, levels[i], pokemonId);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[EvolutionGraph] Failed to get method detail for methodId=${methodId}:`, error);
      }
      continue;
    }
    if (result === -1) continue;

    const [methodDetail, evoMethod] = result;
    labels.push(methodDetail.method);
    iconSets.push(getEvolutionMethodIcons(evoMethod, methodParameter, methodDetail, mode));
  }

  if (labels.length === 0) return null;

  return {
    label: labels.join(' OR '),
    icons: iconSets.flat(),
    methods: labels.map((label, i) => ({ label, icons: iconSets[i] })),
  };
}

