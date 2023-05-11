import React, { useState } from 'react';
import { Box, Container, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { PokemonSearchInput } from './PokemonSearchInput';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { PokemonMoveType, TYPE_COLOR_MAP } from './PokemonMovesetList';
import { PokemonAbilities } from './PokemonAbilities';

export const PokemonListPageContent = ({ pokemonList }) => {
  const [pokemons, setPokemons] = useState(pokemonList);

  return (
    <Container sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" flexDirection="column" flex="1 1 auto">
        <Typography variant="h2" component="h1">
          Pokemon
        </Typography>
        <PokemonSearchInput allPokemons={pokemonList} setPokemons={setPokemons} />

        <Box flex="1 1 auto" paddingY="12px" minHeight={{ xs: '60vh', sm: 0 }}>
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
    <a href={`/dex/${pokemon.id}`} style={{ ...style, textDecoration: 'none' }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <img src={`/img/${pokemon.imageSrc}`} height={48} width={48} />
          </ListItemIcon>
          <Typography>{pokemon.name}</Typography>
          <PokemonMoveType
            typeName={TYPE_COLOR_MAP[pokemon.type1].name}
            typeColor={TYPE_COLOR_MAP[pokemon.type1].color}
          />
          {pokemon.type1 !== pokemon.type2 && (
            <PokemonMoveType
              typeName={TYPE_COLOR_MAP[pokemon.type2].name}
              typeColor={TYPE_COLOR_MAP[pokemon.type2].color}
            />
          )}
          <PokemonAbilities
            abilityName1={pokemon.ability1}
            abilityName2={pokemon.ability2}
            abilityNameHidden={pokemon.abilityH}
          />
        </ListItemButton>
      </ListItem>
    </a>
  );
};
