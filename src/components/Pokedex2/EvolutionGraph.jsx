import * as React from 'react';
import { Box, Typography } from '@mui/material';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getEvolutionMethodDetail, getEvolutionTree } from '../../utils/dex/evolution';
import styles from './styles.module.css';
import { getPokemonImageFilename } from '../../core/pokemonFormSelector';
import { getPokemonMonsNoAndFormNoFromPokemonId } from '../../utils/dex/name';

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

  const secondEvolvesInto = evolutionTree.evolvesInto;
  if (secondEvolvesInto.length > 1 && secondEvolvesInto[0].evolvesInto.length > 0) {
    evolutionTree.evolvesInto[0].evolvesInto.push(secondEvolvesInto[1].evolvesInto[0])
  } else if (secondEvolvesInto[0].evolvesInto.length === 0 && secondEvolvesInto[1].evolvesInto.length > 0) {
    evolutionTree.evolvesInto[0].evolvesInto.push(defaultEvo)
    evolutionTree.evolvesInto[0].evolvesInto.push(secondEvolvesInto[1].evolvesInto[0])
  }

  console.log(evolutionTree);

  const renderMethods = (methodIds, methodParameters, levels) => {
    const firstMethodId = methodIds[0];
    const firstMethodParameter = parseInt(methodParameters[0]);
    const firstMethodDetail = getEvolutionMethodDetail(firstMethodId, firstMethodParameter, levels[0]);
    if (firstMethodDetail === -1) {
      return (
        <Box className={styles.method}>
        </Box>
      )
    }
    return (
      <Box className={styles.method}>
        Method: {firstMethodDetail.method}
        <img src={useBaseUrl('/img/Item_Water_Stone.webp')} width="40" alt="Water Stone" />
        {methodIds.length > 1 && (
          <>
            Or
            <img src={useBaseUrl('/img/Item_Water_Stone.webp')} width="40" alt="Water Stone" />
            Method: {getEvolutionMethodDetail(methodIds[1], parseInt(methodParameters[1]), levels[1]).method}
          </>
        )}
      </Box>
    );
  };

  const renderEvolutionTree = (tree) => {
    const { evolvesInto } = tree;
    console.log(evolvesInto);

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
    return (
      <Box className={styles.firstEvolution}>
        <Box className={styles.methodContainer}>{allMethods}</Box>
        <Box className={styles.imageColumn}>{allImages}</Box>
      </Box>
    );
  };

  const renderEvolutionTreeSet = (tree) => {
    const { evolvesInto } = tree;
    console.log(evolvesInto.length);

    // Render the first evolvesInto
    const firstEvolutionSet = evolvesInto[0];
    const firstEvolutionComponent = renderEvolutionTree(firstEvolutionSet);

    // Render the second evolvesInto if available
    let secondEvolutionComponent = [];
    if (evolvesInto.length > 1) {
      const secondEvolutionSet = evolvesInto[1];
      secondEvolutionComponent = renderEvolutionTree(secondEvolutionSet);
    }

    return (
      <Box className={styles.firstEvolution}>
        {firstEvolutionComponent}
        {secondEvolutionComponent.length > 0 &&(
          secondEvolutionComponent
        )}
      </Box>
    );
  };

  return (
    <div className="container">
      <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
        <span className="col col-12">
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            Evolutions
          </Typography>
        </span>
      </div>

      <Box className={styles.evolutionContainer}>
        <img src={useBaseUrl(`/img/${getPokemonImageFilename(monsNo, formNo)}`)} alt="Stage 1 Evo" />
        {renderEvolutionTree(evolutionTree)}
        {secondEvolvesInto.length > 0 && (
          renderEvolutionTree(secondEvolvesInto[0])
        )}
      </Box>
    </div>
  );
}
