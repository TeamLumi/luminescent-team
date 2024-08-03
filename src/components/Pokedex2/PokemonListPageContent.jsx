import React, { useEffect, useState } from 'react';
import { Box, Container, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { PokemonSearchInput } from './PokemonSearchInput';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { PokemonMoveType, TYPE_COLOR_MAP } from './PokemonMovesetList';
import { usePluginData } from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { PokemonInfoButton } from './PokedexInfoButton';
import { useGlobalState } from '../common/GlobalState';
import ModeSwitch from './ModeSwitch';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const PokemonListPageContent = ({ pokemonList, pokemonList3 }) => {
  const [globalState, updateMode] = useGlobalState();
  const allPokemons = globalState.mode === "2.0" ? pokemonList : pokemonList3;
  const [pokemons, setPokemons] = useState(allPokemons);

  useEffect(() => {
    const updatedPokemons = globalState.mode === "2.0" ? pokemonList : pokemonList3;
    setPokemons(updatedPokemons);
  }, [globalState.mode]);

  return (
    <Container sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" flexDirection="column" flex="1 1 auto">
        <Typography variant="h2" component="h1">
          Pokémon
        </Typography>

        <Box display="flex" marginTop="16px">
          <PokemonSearchInput allPokemons={allPokemons} setPokemons={setPokemons} />
          <PokemonInfoButton />
          {/* <ModeSwitch /> */}
          {/* Uncomment when 3.0 dex is ready to be released */}
        </Box>

        <Box flex="1 1 auto" paddingY="12px" minHeight={{ xs: '60vh', sm: '60vh' }}>
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
  const [globalState, updateMode] = useGlobalState();
  const { path } = usePluginData('luminescent-pokedex-data-plugin');
  const pokemonPath = pokemon.formno === 0 ? pokemon.monsno : `${pokemon.monsno}_${pokemon.formno}`;

  return (
    <a href={useBaseUrl(`${path}/${pokemonPath}`)} style={{ ...style, textDecoration: 'none' }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <ImageWithFallback
              src={useBaseUrl(`/img/pkm/${pokemon.imageSrc}`)}
              fallbackSrc={useBaseUrl(`/img/pkm/${pokemon.forms[0].imageSrc}`)}
              height={48}
              alt={pokemon.name}
              title={pokemon.name}
            />
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
    </a>
  );
};
