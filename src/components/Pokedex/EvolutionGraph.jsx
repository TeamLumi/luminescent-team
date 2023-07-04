import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { getEvolutionTree, getEvolutionMethodDetail } from '../../utils/dex/evolution';
import { getImage, getMonsNoAndFormNoFromPokemonId } from '../../utils/dex/functions';
import useBaseUrl from '@docusaurus/useBaseUrl';

export const EvolutionGraph = ({ dexId }) => {
  const evolutionTree = getEvolutionTree(dexId);

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
        <EvolutionStage evolutionTree={evolutionTree} />
      </Box>
    </div>
  );
};

const EvolutionStage = ({ evolutionTree }) => {
  const { monsNo, formNo } = getMonsNoAndFormNoFromPokemonId(evolutionTree.pokemonId);
  const image = getImage(monsNo, formNo);
  const methodId = evolutionTree.evolutionDetails?.methodId;
  const level = evolutionTree.evolutionDetails?.level;
  const evoMethodDetail = methodId ? getEvolutionMethodDetail(methodId) : null;

  return (
    <div>
      <div>
        {methodId && <p>{evoMethodDetail.method}</p>}
        {level && <p>{level}</p>}
        <img src={useBaseUrl(image)} />
      </div>
      <Box paddingLeft={20}>
        {evolutionTree.evolvesInto.map((evoStage) => (
          <EvolutionStage key={evoStage.pokemonId} evolutionTree={evoStage} />
        ))}
      </Box>
    </div>
  );
};
