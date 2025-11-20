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
import ModeSwitch from '../common/ModeSwitch';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { GAMEDATA2, GAMEDATA3, GAMEDATAV } from '../../../__gamedata';

export const PokemonListPageContent = ({ pokemonList, pokemonList3, pokemonListV }) => {
  const POKEMON_LIST_MODE_MAP = {
    [GAMEDATAV]: pokemonListV,
    [GAMEDATA2]: pokemonList,
    [GAMEDATA3]: pokemonList3,
  };

  const [globalState, updateMode] = useGlobalState();
  const allPokemons = POKEMON_LIST_MODE_MAP[globalState.mode];
  const [pokemons, setPokemons] = useState(allPokemons);

  useEffect(() => {
    const updatedPokemons = POKEMON_LIST_MODE_MAP[globalState.mode];
    setPokemons(updatedPokemons);
  }, [globalState.mode]);

  return (
    <Container sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" flexDirection="column" flex="1 1 auto">
        <Typography variant="h2" component="h1">
          Pokémon
        </Typography>

        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            gridTemplate: {
              xs: `"a b"
                   "c c"`,
              sm: "unset"
            },
            gap: { xs: ".5rem", sm: "unset" },
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <PokemonSearchInput allPokemons={allPokemons} setPokemons={setPokemons} />
          <PokemonInfoButton />
          <ModeSwitch />
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
              src={useBaseUrl(pokemon.imageSrc)}
              fallbackSrc={useBaseUrl(pokemon.forms[0].imageSrc)}
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
