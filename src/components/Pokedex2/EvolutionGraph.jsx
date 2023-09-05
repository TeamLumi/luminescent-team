import * as React from 'react';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getEvolutionMethodDetail, getEvolutionTree } from '../../utils/dex/evolution';
import styles from './styles.module.css';
import { getPokemonImageFilename } from '../../core/pokemonFormSelector';
import { getPokemonMonsNoAndFormNoFromPokemonId, getPokemonName } from '../../utils/dex/name';
import { evolutionFunctions } from '../../utils/dex/evolutionConstants';
import { getItemImageUrl, getTMImageUrl } from '../../../plugins/pokedex-data-plugin/dex/item';
import { getMoveProperties } from '../../utils/dex/moves';
import { getTypeName } from '../../utils/dex/types';
import { getPokemonIdFromMonsNoAndForm } from '../../utils/dex/functions';

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

  const renderEvolutions = (methods, images, methodIndex) => {
    const methodStyle = methodIndex === 1 ? (
      styles.firstMethodContainer
      ) : (styles.secondMethodContainer)
    return methods.map((method, index) => (
      <Grid container className={styles.evolutionDetails} key={index}>
        <Grid item xs={6} sm={6} className={methodStyle}>
          {method}
        </Grid>
        <Grid item xs={6} sm={6} className={styles.imageColumn}>
          {images[index]}
        </Grid>
      </Grid>
    ));
  };

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
                alt={getPokemonName(getPokemonIdFromMonsNoAndForm(monsno, formNos[index]))}
                title={getPokemonName(getPokemonIdFromMonsNoAndForm(monsno, formNos[index]))}
              />
            </Box>
          ) : ""
        ));
        allImages.push(imageComponents);
      }
    });

    // Render a single firstEvolution component with all methods and images
    if (methodIndex === 1) {
      return (
        <Grid container className={styles.firstEvolution}>
          {renderEvolutions(allMethods, allImages, methodIndex)}
        </Grid>
      )
    } else if (methodIndex === 2) {
      return (
        <Grid container className={styles.secondEvolution}>
          {renderEvolutions(allMethods, allImages, methodIndex)}
        </Grid>
      )
    }
  };

  if (secondEvolvesInto.length > 0) {
    fullEvolutionTree = (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ margin: 'auto', textAlign: 'center' }}>
            Evolutions
          </Typography>
        </Grid>
  
        <Grid container className={styles.evolutionContainer}>
          <Grid item xs={12} className={styles.scrollContent}>
            <Grid item xs={12} sm={6} className={styles.startPokemon}>
              <img
                src={useBaseUrl(`/img/${getPokemonImageFilename(monsNo, formNo)}`)}
                alt={getPokemonName(getPokemonIdFromMonsNoAndForm(monsNo, formNo))}
                title={getPokemonName(getPokemonIdFromMonsNoAndForm(monsNo, formNo))}
              />
            </Grid>
            {renderEvolutionTree(evolutionTree, 1)}
            {secondEvolvesInto[0].evolvesInto.length >= 1 && (
              renderEvolutionTree(secondEvolvesInto[0], 2)
            )}  
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return (fullEvolutionTree);
}
