import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { getEvolutionPath, displayEvolutionData } from '../../utils/dex/evolution';
import { getImage, getPokemonMonsNoAndFormFromId } from '../../utils/dex/functions';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * WIP, styling and logic implementation is TBD
 */

function EvolutionStage(props) {
  const {pokemonId} = props;
  const data = displayEvolutionData(pokemonId);
  const {monsNo, formNo} = getPokemonMonsNoAndFormFromId(data.id);
  const methodString = `${data.method.text} ${data.method.param === 'None' ? '' : data.method.param} ${data.method.requiresLevel ? `at level ${data.method.level}` : ''}`
  return (
    <>
      <img src={getImage(monsNo, formNo)} title={data.name} alt={data.name} />
      <Typography variant="h6" title={data.method.text}>→ {methodString}</Typography>
    </>
  )
}
export default function EvolutionGraph(props) {
  const {dexId} = props;
  return (
    <div className="container">
      <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
        <span className="col col-12">
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            Evolutions
          </Typography>
        </span>
      </div>

      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <img src={useBaseUrl('/img/pm0001_00_00_00_L.webp')} alt="Stage 1 Evo" />
        <Typography variant="h6">→</Typography>
        <img src={useBaseUrl('/img/pm0002_00_00_00_L.webp')} alt="Stage 2 Evo" />
        <Typography variant="h6">→</Typography>
        <img src={useBaseUrl('/img/pm0003_00_00_00_L.webp')} width={90} alt="Stage 3 Evo" />
      </Box>
    </div>
  );
}
