import React from 'react';
import { Box, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { PokemonMoveType, TYPE_COLOR_MAP } from '../Pokedex2/PokemonMovesetList';
import useBaseUrl from '@docusaurus/useBaseUrl';

export const PokemonListEntry = ({ pokemon, style }) => {

  return (
    <ListItem disablePadding>
      <ListItemButton >
        <ListItemIcon>
          <img src={useBaseUrl(`/img/${pokemon.imageSrc}`)} height={48} />
        </ListItemIcon>
        <Typography>{pokemon.name}</Typography>
        <Box display="flex" flexDirection="row" marginX="8px">
          <Box width="80px">
            <PokemonMoveType
              typeName={TYPE_COLOR_MAP[pokemon.type1].name}
              typeColor={TYPE_COLOR_MAP[pokemon.type1].color}
            />
          </Box>
          {pokemon.type1 !== pokemon.type2 && (
            <Box width="80px" marginLeft="8px">
              <PokemonMoveType
                typeName={TYPE_COLOR_MAP[pokemon.type2].name}
                typeColor={TYPE_COLOR_MAP[pokemon.type2].color}
              />
            </Box>
          )}
        </Box>
      </ListItemButton>
    </ListItem>
  );
};
