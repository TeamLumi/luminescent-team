import React from 'react';
import { Box, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

export const PokemonListPageContent = ({ pokemonList }) => {
  return (
    <Container>
      <Typography variant="h1">Pokemons</Typography>
      <Box>
        <List>
          {pokemonList.map((pokemon) => (
            <PokemonListEntry key={`pokemon-${pokemon.id}`} pokemon={pokemon} />
          ))}
        </List>
      </Box>
    </Container>
  );
};

const PokemonListEntry = ({ pokemon }) => {
  return (
    <a href={`/dex/${pokemon.id}`}>
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
