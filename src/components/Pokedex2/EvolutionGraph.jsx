import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import { getEvolutionMethodDetail, getEvolutionTree } from '../../../plugins/pokedex-data-plugin/dex/evolution';
import styles from './styles.module.css';
import { getPokemonImageFilename } from '../../core/pokemonFormSelector';
import { getPokemonMonsNoAndFormNoFromPokemonId, getPokemonName } from '../../utils/dex/name';
import { getItemImageUrl, getTMImageUrl } from '../../../plugins/pokedex-data-plugin/dex/item';
import { getMoveString, getMoveProperties } from '../../../plugins/pokedex-data-plugin/dex/moves';
import { getTypeName } from '../../utils/dex/types';
import { getPokemonIdFromMonsNoAndForm } from '../../utils/dex/functions';
import { getItemString } from '../../utils/dex/item';
import { useGlobalState } from '../common/GlobalState';
import { ImageWithFallback } from '../common/ImageWithFallback';
import * as EvoConstants from "../../../plugins/pokedex-data-plugin/dex/evolutionConstants";

export default function EvolutionGraph({ evolutionTree }) {
  const [globalState, updateMode] = useGlobalState();
  const [secondEvolvesInto, setSecondEvolvesInto] = React.useState(evolutionTree.evolvesInto);
  const [monsNo, formNo] = getPokemonMonsNoAndFormNoFromPokemonId(evolutionTree.pokemonId, globalState.mode);
  const firstPokemonPath = formNo === 0 ? monsNo : `${monsNo}_${formNo}`;
  const pokemonID = getPokemonIdFromMonsNoAndForm(monsNo, formNo, globalState.mode);
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

  const DoesNotEvolve = () => {
    return (
      <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
        <span className="col col-12">
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            Does Not Evolve
          </Typography>
        </span>
      </div>
    )
  }

  const AlcremieEvo = () => {
    return (
      <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
        <span className="col col-12">
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            <a href='https://luminescent.team/docs/special-evolutions#alcremie'>Alcremie Evolutions</a>
          </Typography>
        </span>
      </div>
    )
  }

  let fullEvolutionTree = (
    <div className="container">
      <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
        <span className="col col-12">
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            Evolutions
          </Typography>
        </span>
      </div>

      {monsNo !== 868 && monsNo !== 869
        ? (<DoesNotEvolve />)
        : (<AlcremieEvo />)
      }
    </div>
  );

  React.useEffect(() => {
    const newSecondEvolvesInto = evolutionTree.evolvesInto;
    if (newSecondEvolvesInto.length > 1) {
      if (
        newSecondEvolvesInto[0].evolvesInto.length > 0
        && newSecondEvolvesInto[0].evolvesInto.length < 2
      ) {
        newSecondEvolvesInto[0].evolvesInto.push(newSecondEvolvesInto[1].evolvesInto[0])
      } else if (
        newSecondEvolvesInto[newSecondEvolvesInto.length - 1].evolvesInto.length > 0
        && newSecondEvolvesInto[0].evolvesInto.length < 2
      ) {
        for (const index in newSecondEvolvesInto ) {
          if (parseInt(index) !== newSecondEvolvesInto.length - 1) {
            newSecondEvolvesInto[0].evolvesInto.push(defaultEvo)
          }
        }
        console.log("Adding a new one!")
        newSecondEvolvesInto[0].evolvesInto.push(newSecondEvolvesInto[newSecondEvolvesInto.length - 1].evolvesInto[0])
      }
    }
    setSecondEvolvesInto(newSecondEvolvesInto);
  }, [evolutionTree]);

  if (secondEvolvesInto.length === 0 || monsNo === 868 || monsNo === 869) {
    return fullEvolutionTree
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
    if (methodDetail.method.includes(EvoConstants.FRIENDSHIP)) {
      evoImages.push(getItemImageUrl("Soothe Bell"))
    }
    if (methodDetail.method.includes(EvoConstants.LEVEL)) {
      evoImages.push(getItemImageUrl("Rare Candy"));
    }
    if (methodDetail.method.includes(EvoConstants.CRITICAL_HITS)) {
      evoImages.push("/img/custom/criticalhits.webp")
    }
    if (methodDetail.method.includes(EvoConstants.RECEIVE_DAMAGE)) {
      evoImages.push("/img/custom/receivedamage.webp")
    }
    if (methodDetail.method.includes(EvoConstants.FOLLOWER)) {
      evoImages.push("/img/custom/followersteps.webp")
    }
    if (evoFunction === EvoConstants.ITEM_STRING_FUNCTION) {
      evoImages.push(getItemImageUrl(evoMethod));
    } else if (evoFunction === EvoConstants.MOVE_STRING_FUNCTION) {
      const moveType = getTypeName(getMoveProperties(methodParameter, globalState.mode).type);
      evoImages.push(getTMImageUrl(moveType));
    } else if (evoFunction === EvoConstants.POKEMON_NAME_FUNCTION) {
      evoImages.push(`/img/pkm/${getPokemonImageFilename(methodParameter, 0)}`);
    } else if (evoFunction === EvoConstants.TYPE_NAME_FUNCTION) {
      const moveType = getTypeName(methodParameter);
      evoImages.push(getTMImageUrl(moveType));
    }
    if (methodDetail.method.includes(EvoConstants.RNG)) {
      evoImages.push("/img/custom/randomchance.webp")
    }
    if (methodDetail.method.includes(EvoConstants.DAY)) {
      evoImages.push("/img/custom/sun.webp")
    } else if (methodDetail.method.includes(EvoConstants.NIGHT)) {
      evoImages.push("/img/custom/moon.webp")
    } else if (methodDetail.method.includes(EvoConstants.DUSK)) {
      evoImages.push("/img/custom/dusk.webp")
    }
    if (methodDetail.method.includes(EvoConstants.MOSS_ROCK)) {
      evoImages.push("/img/custom/mossyrock.webp")
    } else if (methodDetail.method.includes(EvoConstants.ICE_ROCK)) {
      evoImages.push("/img/custom/icyrock.webp")
    }
    if (methodDetail.method.includes(EvoConstants.MALE)) {
      evoImages.push("/img/custom/male.webp")
    } else if (methodDetail.method.includes(EvoConstants.FEMALE)) {
      evoImages.push("/img/custom/female.webp")
    }
    if (methodDetail.method.includes(EvoConstants.BEAUTY)) {
      evoImages.push(getItemImageUrl("Blue Scarf"))
    }
    return evoImages;
  };

  const renderSecondMethod = (methodId, methodParameter, level) => {
    const [methodDetail, evoMethod] = getEvolutionMethodDetail(methodId, methodParameter, globalState.mode, level);
    const evoImages = renderItemImage(evoMethod, methodParameter, methodDetail);

    return (
      <>
        Or
        <Box className={styles.evoImages} style={{ justifyContent: evoImages.length > 1 ? 'space-between' : 'center' }}>
          {evoImages.map((image, index) => (
            <img key={index} src={image} width="40" alt={image} title={image} />
          ))}
        </Box>
        {methodDetail.method}
      </>
    )
  };

  const renderMethods = (methodIds, methodParameters, levels, pokemonId) => {
    const firstMethodId = methodIds[0];
    if (firstMethodId === -1) {
      return (
        <Box className={styles.method}>
        </Box>
      )
    }
    const firstMethodParameter = parseInt(methodParameters[0]);
    const [
      firstMethodDetail,
      firstEvoMethod
    ] = getEvolutionMethodDetail(
      firstMethodId,
      firstMethodParameter,
      globalState.mode,
      levels[0],
      pokemonId
    );

    const evoImages = renderItemImage(firstEvoMethod, firstMethodParameter, firstMethodDetail);
    return (
      <Box className={styles.method}>
        {firstMethodDetail.method}
        <Box className={styles.evoImages} style={{ justifyContent: evoImages.length > 1 ? 'space-between' : 'center' }}>
          {evoImages.map((image, index) => (
            <img key={index} src={image} width="40" alt={image} title={image} />
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
    const { pokemonId, evolvesInto } = tree;

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
      const methods = renderMethods(methodIds, methodParameters, levels, pokemonId);
      allMethods.push(methods);

      if (methodIds[0] === -1) {
        const pokemonImages = (
          <Box className={styles.imageRow} key="Blank"></Box>
        );
        allImages.push(pokemonImages);
      } else {
        const pokemonImages = monsNos.map((monsno, index) => {
          const pokemonId = getPokemonIdFromMonsNoAndForm(monsno, formNos[index], globalState.mode);
          const pokemonName = getPokemonName(pokemonId, globalState.mode);
          const pokemonPath = formNos[index] === 0 ? monsno : `${monsno}_${formNos[index]}` ;
          return (
            index === 0 ? (
              <Box className={styles.imageRow} key={monsno}>
                <Link to={`/pokedex/${pokemonPath}`}>
                  <ImageWithFallback 
                    key={pokemonId}
                    src={`/img/pkm/${getPokemonImageFilename(monsno, formNos[index])}`}
                    fallbackSrc={`/img/pkm/${getPokemonImageFilename(monsno, 0)}`}
                    alt={pokemonName}
                    title={pokemonName}
                  />
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
                <ImageWithFallback
                  key={pokemonID}
                  src={`/img/pkm/${getPokemonImageFilename(monsNo, formNo)}`}
                  fallbackSrc={`/img/pkm/${getPokemonImageFilename(monsNo, 0)}`}
                  alt={getPokemonName(pokemonID, globalState.mode)}
                  title={getPokemonName(pokemonID, globalState.mode)}
                />
              </Link>
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
