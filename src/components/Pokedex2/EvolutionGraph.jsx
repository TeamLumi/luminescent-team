import * as React from 'react';
import { Box, Typography } from '@mui/material';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getEvolutionMethodDetail, getEvolutionTree } from '../../utils/dex/evolution';
import styles from './styles.module.css';

/**
 * @param {object} props
 * @param {number} props.pokemonID The ID of the Pokémon for which the evolution graph is shown.
 */
export default function EvolutionGraph(props) {
  const evolutionTree = getEvolutionTree(props.pokemonID);

  console.log(evolutionTree);
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
        <img src={useBaseUrl('/img/pm0133_00_00_00_L.webp')} alt="Stage 1 Evo" />
        <Box className={styles.firstEvolution}>
          <Box className={styles.methodContainer}>
            <Box className={styles.method}>
              Method 1 
              <img src={useBaseUrl('/img/Item_Water_Stone.webp')} width="40" />
              Or
              <img src={useBaseUrl('/img/Item_Water_Stone.webp')} width="40" />
              Method 1A
            </Box>
            <Box className={styles.method}>
              Method 2 
              <img src={useBaseUrl('/img/Item_Thunder_Stone.webp')} width="40" />
            </Box>
            <Box className={styles.method}>
              Method 3 
              <img src={useBaseUrl('/img/Item_Fire_Stone.webp')} width="40" />
            </Box>
            <Box className={styles.method}>
              Method 4
              <img src={useBaseUrl('/img/Item_Sun_Stone.webp')} width="40" />
            </Box>
            <Box className={styles.method}>
              Method 5
              <img src={useBaseUrl('/img/Item_Moon_Stone.webp')} width="40" />
            </Box>
            <Box className={styles.method}>
              Method 6
              <img src={useBaseUrl('/img/Item_Leaf_Stone.webp')} width="40" />
            </Box>
            <Box className={styles.method}>
              Method 7
              <img src={useBaseUrl('/img/Item_Ice_Stone.webp')} width="40" />
            </Box>
            <Box className={styles.method}>
              Method 8
              <img src={useBaseUrl('/img/Item_Shiny_Stone.webp')} width="40" />
            </Box>
          </Box>
          <Box className={styles.imageColumn}>
            <Box className={styles.imageRow}>
              <img src={useBaseUrl('/img/pm0134_00_00_00_L.webp')} alt="Stage 2 Evo" />
            </Box>
            <Box className={styles.imageRow}>
              <img src={useBaseUrl('/img/pm0135_00_00_00_L.webp')} alt="Stage 3 Evo" />
            </Box>
            <Box className={styles.imageRow}>
              <img src={useBaseUrl('/img/pm0136_00_00_00_L.webp')} alt="Stage 3 Evo" />
            </Box>
            <Box className={styles.imageRow}>
              <img src={useBaseUrl('/img/pm0196_00_00_00_L.webp')} alt="Stage 2 Evo" />
            </Box>
            <Box className={styles.imageRow}>
              <img src={useBaseUrl('/img/pm0197_00_00_00_L.webp')} alt="Stage 3 Evo" />
            </Box>
            <Box className={styles.imageRow}>
              <img src={useBaseUrl('/img/pm0470_00_00_00_L.webp')} alt="Stage 3 Evo" />
            </Box>
            <Box className={styles.imageRow}>
              <img src={useBaseUrl('/img/pm0471_00_00_00_L.webp')} alt="Stage 2 Evo" />
            </Box>
            <Box className={styles.imageRow}>
              <img src={useBaseUrl('/img/pm0700_00_00_00_L.webp')} alt="Stage 3 Evo" />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
