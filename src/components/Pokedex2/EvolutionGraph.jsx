import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getEvolutionMethodDetail, getEvolutionTree } from '../../utils/dex/evolution';
import styles from './styles.module.css';
import { getPokemonImageFilename } from '../../core/pokemonFormSelector';
import { getPokemonMonsNoAndFormNoFromPokemonId, getPokemonName } from '../../utils/dex/name';
import { getItemImageUrl, getTMImageUrl } from '../../../plugins/pokedex-data-plugin/dex/item';
import { getMoveString, getMoveProperties } from '../../utils/dex/moves';
import { getTypeName } from '../../utils/dex/types';
import { getPokemonIdFromMonsNoAndForm } from '../../utils/dex/functions';
import { getItemString } from '../../utils/dex/item';

const LEVEL = "Level"
const FRIENDSHIP = "Friendship"
const DAY = "Day"
const NIGHT = "Night"
const MOSS_ROCK = "Moss Rock"
const ICE_ROCK = "Ice Rock"
const FEMALE = "Female"
const MALE = "Male"

export default function EvolutionGraph(props) {
  const [monsNo, formNo] = getPokemonMonsNoAndFormNoFromPokemonId(props.evolutionTree.pokemonId, props.globalState.mode);
  const firstPokemonPath = formNo === 0 ? monsNo : `${monsNo}_${formNo}`;
  const pokemonID = getPokemonIdFromMonsNoAndForm(monsNo, formNo, props.globalState.mode);
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

  const secondEvolvesInto = props.evolutionTree.evolvesInto;
  if (secondEvolvesInto.length === 0) {
    return fullEvolutionTree
  }

  if (secondEvolvesInto.length > 1) {
    if (secondEvolvesInto[0].evolvesInto.length > 0) {
      secondEvolvesInto[0].evolvesInto.push(secondEvolvesInto[1].evolvesInto[0])
    } else if (secondEvolvesInto[secondEvolvesInto.length - 1].evolvesInto.length > 0) {
      for (const index in secondEvolvesInto ) {
        if (parseInt(index) !== secondEvolvesInto.length - 1) {
          secondEvolvesInto[0].evolvesInto.push(defaultEvo)
        }
      }
      secondEvolvesInto[0].evolvesInto.push(secondEvolvesInto[secondEvolvesInto.length - 1].evolvesInto[0])
    }
  }

  const renderEvolutions = (methods, pokemonImages, methodIndex) => {
    const methodStyle = methodIndex === 1 ? (
      styles.firstMethodContainer
      ) : (styles.secondMethodContainer)
    return methods.map((method, index) => (
      <Grid container className={styles.evolutionDetails} key={index}>
        <Grid item xs={6} sm={6} className={methodStyle}>
          {method}
        </Grid>
        <Grid item xs={6} sm={6} className={styles.imageColumn}>
          {pokemonImages[index]}
        </Grid>
      </Grid>
    ));
  };

  const renderItemImage = (evoMethod, methodParameter, methodDetail) => {
    const evoFunction = methodDetail.function.name;
    const evoImages = [];
    if (methodDetail.method.includes(LEVEL)) {
      evoImages.push(getItemImageUrl("Rare Candy"));
    } else if (evoFunction === getItemString.name) {
      evoImages.push(getItemImageUrl(evoMethod));
    } else if (evoFunction === getMoveString.name) {
      const moveType = getTypeName(getMoveProperties(methodParameter).type);
      evoImages.push(getTMImageUrl(moveType));
    } else if (evoFunction === getPokemonName.name) {
      evoImages.push(`img/${getPokemonImageFilename(methodParameter, 0)}`);
    } else if (evoFunction === getTypeName.name) {
      const moveType = getTypeName(methodParameter);
      evoImages.push(getTMImageUrl(moveType));
    }
    if (methodDetail.method.includes(FRIENDSHIP)) {
      evoImages.push(getItemImageUrl("Soothe Bell"))
    }
    if (methodDetail.method.includes(DAY)) {
      evoImages.push("/img/Sun.webp")
    } else if (methodDetail.method.includes(NIGHT)) {
      evoImages.push("/img/Moon.webp")
    }
    if (methodDetail.method.includes(MOSS_ROCK)) {
      evoImages.push("/img/Moss Rock.webp")
    } else if (methodDetail.method.includes(ICE_ROCK)) {
      evoImages.push("/img/Ice Rock.webp")
    }
    if (methodDetail.method.includes(MALE)) {
      evoImages.push("/img/male.webp")
    } else if (methodDetail.method.includes(FEMALE)) {
      evoImages.push("/img/female.webp")
    }
    return evoImages;
  };

  const renderSecondMethod = (methodId, methodParameter, level) => {
    const [methodDetail, evoMethod] = getEvolutionMethodDetail(methodId, methodParameter, level);
    const evoImages = renderItemImage(evoMethod, methodParameter, methodDetail);

    return (
      <>
        Or
        <Box className={styles.evoImages} style={{ justifyContent: evoImages.length > 1 ? 'space-between' : 'center' }}>
          {evoImages.map((image, index) => (
            <img key={index} src={useBaseUrl(image)} width="40" alt="" />
          ))}
        </Box>
        {methodDetail.method}
      </>
    )
  };

  const renderMethods = (methodIds, methodParameters, levels) => {
    const firstMethodId = methodIds[0];
    if (firstMethodId === -1) {
      return (
        <Box className={styles.method}>
        </Box>
      )
    }
    const firstMethodParameter = parseInt(methodParameters[0]);
    const [ firstMethodDetail, firstEvoMethod ] = getEvolutionMethodDetail(firstMethodId, firstMethodParameter, levels[0]);

    const evoImages = renderItemImage(firstEvoMethod, firstMethodParameter, firstMethodDetail);
    return (
      <Box className={styles.method}>
        {firstMethodDetail.method}
        <Box className={styles.evoImages} style={{ justifyContent: evoImages.length > 1 ? 'space-between' : 'center' }}>
          {evoImages.map((image, index) => (
            <img key={index} src={useBaseUrl(image)} width="40" alt="" />
          ))}
        </Box>
        {methodIds.length > 1 && (
          renderSecondMethod(methodIds[1], methodParameters[1], levels[1])
        )}
      </Box>
    );
  };

  const renderEvolutionTree = (tree, methodIndex) => {
    const evolutionStyle = methodIndex === 1 ? (
      styles.firstEvolution
      ) : (styles.secondEvolution)
    const { evolvesInto } = tree;

    // Collect data for methods and images from all evolutions
    const allMethods = [];
    const allImages = [];

    evolvesInto.forEach((evolution) => {
      const { 
        methodIds,
        methodParameters,
        monsNos,
        formNos,
        levels
      } = evolution.evolutionDetails;
      const methods = renderMethods(methodIds, methodParameters, levels);
      allMethods.push(methods);

      if (methodIds[0] === -1) {
        const pokemonImages = (
          <Box className={styles.imageRow} key="Blank"></Box>
        );
        allImages.push(pokemonImages);
      } else {
        const pokemonImages = monsNos.map((monsno, index) => {
          const pokemonId = getPokemonIdFromMonsNoAndForm(monsno, formNos[index], props.globalState.mode);
          const pokemonName = getPokemonName(pokemonId, props.globalState.mode);
          const pokemonPath = formNos[index] === 0 ? monsno : `${monsno}_${formNos[index]}` ;
          return (
            index === 0 ? (
              <Box className={styles.imageRow} key={monsno}>
                <Link to={`/pokedex/${pokemonPath}`}>
                  <img
                    key={pokemonId}
                    src={useBaseUrl(`/img/pkm/${getPokemonImageFilename(monsno, formNos[index])}`)}
                    alt={pokemonName}
                    title={pokemonName} />
                </Link>
              </Box>
            ) : ""
          );
        });
        allImages.push(pokemonImages);
      }
    });

    // Render a single firstEvolution component with all methods and images
    return (
      <Grid container className={evolutionStyle}>
        {renderEvolutions(allMethods, allImages, methodIndex)}
      </Grid>
    );
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
              <Link to={`/pokedex/${firstPokemonPath}`}>
                <img
                  key={pokemonID}
                  src={useBaseUrl(`/img/pkm/${getPokemonImageFilename(monsNo, formNo)}`)}
                  alt={getPokemonName(pokemonID, props.globalState.mode)}
                  title={getPokemonName(pokemonID, props.globalState.mode)}
                />
              </Link>
            </Grid>
            {renderEvolutionTree(props.evolutionTree, 1)}
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
