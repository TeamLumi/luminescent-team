import * as React from 'react';
import { Box, Typography } from '@mui/material';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getEvolutionMethodDetail, getEvolutionTree } from '../../utils/dex/evolution';
import styles from './styles.module.css';
import { getPokemonImageFilename } from '../../core/pokemonFormSelector';
import { getPokemonMonsNoAndFormNoFromPokemonId } from '../../utils/dex/name';
import { evolutionFunctions } from '../../utils/dex/evolutionConstants';
import { getItemImageUrl, getTMImageUrl } from '../../../plugins/pokedex-data-plugin/dex/item';
import { getMoveProperties } from '../../utils/dex/moves';
import { getTypeName } from '../../utils/dex/types';

export default function EvolutionGraph(props) {
  const evolutionTree = getEvolutionTree(props.pokemonID);
  const [monsNo, formNo] = getPokemonMonsNoAndFormNoFromPokemonId(evolutionTree.pokemonId);
  const defaultEvo = {
    pokemonId: -1,
    evolutionDetails: {
      formNos: [-1],
      levels: [-1],
      methodIds: [-1],
      methodParameters: [-1],
      monsNos: [-1],
    },
    evolvesInto: [],
  };

  let fullEvolutionTree = (
    <div className="container">
      <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
        <span className="col col-12">
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            Evolutions
          </Typography>
        </span>
      </div>

      <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
        <span className="col col-12">
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            Does Not Evolve
          </Typography>
        </span>
      </div>
    </div>
  );

  const secondEvolvesInto = evolutionTree.evolvesInto;
  if (secondEvolvesInto.length === 0) {
    return fullEvolutionTree
  }

  if (secondEvolvesInto.length > 1) {
    if (secondEvolvesInto[0].evolvesInto.length > 0) {
      secondEvolvesInto[0].evolvesInto.push(secondEvolvesInto[1].evolvesInto[0])
    } else if (secondEvolvesInto[0].evolvesInto.length === 0 && secondEvolvesInto[1].evolvesInto.length > 0) {
      secondEvolvesInto[0].evolvesInto.push(defaultEvo)
      secondEvolvesInto[0].evolvesInto.push(secondEvolvesInto[1].evolvesInto[0])
    }
  }

  const renderItemImage = (evoMethod, methodId, methodParameter) => {
    const evoFunction = evolutionFunctions[methodId];
    let evoImage = "";
    if (evoMethod.includes("Level")) {
      evoImage = getItemImageUrl("Rare Candy");
    } else if (evoFunction === "getItemString") {
      evoImage = getItemImageUrl(evoMethod);
    } else if (evoFunction === "getMoveString") {
      const moveType = getTypeName(getMoveProperties(methodParameter).type);
      evoImage = getTMImageUrl(moveType);
    } else if (evoFunction === "getPokemonName") {
      evoImage = `img/${getPokemonImageFilename(methodParameter, 0)}`;
    } else if (evoFunction === "getMoveProperties") {
      const moveType = getTypeName(methodParameter);
      evoImage = getTMImageUrl(moveType);
    } else if (evoMethod.includes("Friendship")) {
      evoImage = getItemImageUrl("Soothe Bell")
    }
    return evoImage;
  };

  const renderSecondMethod = (methodId, methodParameter, level) => {
    const [methodDetail, evoMethod] = getEvolutionMethodDetail(methodId, methodParameter, level);
    const evoImage = renderItemImage(evoMethod, methodId, methodParameter);

    return (
      <>
        Or
        <img src={useBaseUrl(evoImage)} width="40" alt="" />
        {methodDetail.method}
      </>
    )
  };

  const renderMethods = (methodIds, methodParameters, levels) => {
    const firstMethodId = methodIds[0];
    const firstMethodParameter = parseInt(methodParameters[0]);
    if (firstMethodId === -1) {
      return (
        <Box className={styles.method}>
        </Box>
      )
    }
    const [ firstMethodDetail, firstEvoMethod ] = getEvolutionMethodDetail(firstMethodId, firstMethodParameter, levels[0]);

    const evoImage = renderItemImage(firstEvoMethod, firstMethodId, firstMethodParameter)
    return (
      <Box className={styles.method}>
        {firstMethodDetail.method}
        <img src={useBaseUrl(evoImage)} width="40" alt="" />
        {methodIds.length > 1 && (
          renderSecondMethod(methodIds[1], methodParameters[1], levels[1])
        )}
      </Box>
    );
  };

  const renderEvolutionTree = (tree, methodIndex) => {
    const { evolvesInto } = tree;

    // Collect data for methods and images from all evolutions
    const allMethods = [];
    const allImages = [];

    evolvesInto.forEach((evolution) => {
      const { methodIds, methodParameters, monsNos, formNos, levels } = evolution.evolutionDetails;
      const methods = renderMethods(methodIds, methodParameters, levels);
      allMethods.push(methods);

      if (methodIds[0] === -1) {
        const ImageComponents = (
          <Box className={styles.imageRow} key="Blank"></Box>
        );
        allImages.push(ImageComponents);
      } else {
        const imageComponents = monsNos.map((monsno, index) => (
          index === 0 ? (
            <Box className={styles.imageRow} key={monsno}>
              <img
                key={monsno}
                src={useBaseUrl(`/img/${getPokemonImageFilename(monsno, formNos[index])}`)}
                alt={`Stage ${formNos[index]} Evo`}
              />
            </Box>
          ) : <div key={monsno}></div>
        ));
        allImages.push(imageComponents);
      }
    });

    // Render a single firstEvolution component with all methods and images
    if (methodIndex === 1) {
      return (
        <Box className={styles.firstEvolution}>
          <Box className={styles.firstMethodContainer}>{allMethods}</Box>
          <Box className={styles.imageColumn}>{allImages}</Box>
        </Box>
      )
    } else if (methodIndex === 2) {
      return (
        <Box className={styles.secondEvolution}>
          <Box className={styles.secondMethodContainer}>{allMethods}</Box>
          <Box className={styles.imageColumn}>{allImages}</Box>
        </Box>
      )
    }
  };

  if (secondEvolvesInto.length > 0) {
    fullEvolutionTree = (
      <div className="container">
        <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
          <span className="col col-12">
            <Typography variant="h6" sx={{ margin: 'auto' }}>
              Evolutions
            </Typography>
          </span>
        </div>

        <div className={styles.evolutionContainer}>
          <div className={styles.scrollContent}>
            <div className={styles.startPokemon}>
              <img src={useBaseUrl(`/img/${getPokemonImageFilename(monsNo, formNo)}`)} alt="Stage 1 Evo" />
            </div>
            {renderEvolutionTree(evolutionTree, 1)}
            {secondEvolvesInto[0].evolvesInto.length >= 1 && (
              renderEvolutionTree(secondEvolvesInto[0], 2)
            )}
          </div>
        </div>
      </div>
    )
  }
  return (fullEvolutionTree);
}
