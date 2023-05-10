import React, { useState } from 'react';
import { Box, Container, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { PokemonSearchInput } from './PokemonSearchInput';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

export const PokemonListPageContent = ({ pokemonList }) => {
  const [pokemons, setPokemons] = useState(pokemonList);

  return (
    <Container sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" flexDirection="column" flex="1 1 auto">
        <Typography variant="h1">Pokemons</Typography>
        <PokemonSearchInput allPokemons={pokemonList} setPokemons={setPokemons} />

        <Box flex="1 1 auto">
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList itemCount={pokemons.length} itemSize={60} height={height} width={width}>
                {({ index, style }) => <PokemonListEntry pokemon={pokemons[index]} style={style} />}
              </FixedSizeList>
            )}
          </AutoSizer>
        </Box>
      </Box>
    </Container>
  );
};

const PokemonListEntry = ({ pokemon, style }) => {
  return (
    <a href={`/dex/${pokemon.id}`} style={style}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <img src={`/img/${pokemon.imageSrc}`} height={48} width={48} />
          </ListItemIcon>
          <ListItemText sx={{ marginLeft: '12px' }} primary={pokemon.name} />
        </ListItemButton>
      </ListItem>
    </a>
  );
};
