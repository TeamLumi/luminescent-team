import React, { useEffect, useState } from 'react';
import { Box, Button, Container, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
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
import { setNestedKey } from '../common/FilterDrawerFunction';
import { PokemonFilterDrawer } from './PokemonFilterDrawer';

export const defaultPokemonSearchTable = {
  name: { label: "", value: "" },
  monsno: {label: "", value: ""},
  types: {
    type1: { label: null, value: null },
    type2: { label: null, value: null },
  },
  ability: { label: "", value: "" },
  baseStats: {
    hp: { label: null, value: null },
    atk: { label: null, value: null },
    def: { label: null, value: null },
    spa: { label: null, value: null },
    spd: { label: null, value: null },
    spe: { label: null, value: null },
  },
  baseStatsTotal: { label: null, value: null },
  catchChance: { label: null, value: null },
  eggGroups: {
    eggGroup1: { label: null, value: null },
    eggGroup2: { label: null, value: null },
  },
  gender: { label: null, value: null },
  height: { label: null, value: null },
  weight: { label: null, value: null },
  item: { label: "", value: "" },
};

export const PokemonListPageContent = ({ pokemonList, pokemonList3, pokemonListV }) => {
  const POKEMON_LIST_MODE_MAP = {
    [GAMEDATAV]: pokemonListV,
    [GAMEDATA2]: pokemonList,
    [GAMEDATA3]: pokemonList3,
  };

  const [globalState, updateMode] = useGlobalState();
  const allPokemons = POKEMON_LIST_MODE_MAP[globalState.mode];
  const [pokemons, setPokemons] = useState(allPokemons);
  const [searchTable, setSearchTable] = useState({
    ...defaultPokemonSearchTable,
  });
  const [filterOpen, setFilterDrawerOpen] = useState(false);

  const handleChange = (path, value) => {
    setSearchTable((prevState) => {
      const updatedState = { ...prevState };
      setNestedKey(updatedState, path, value);
      return updatedState;
    });
  };

  const clearAllFilters = () => {
    setSearchTable({
      ...defaultPokemonSearchTable,
      types: {
        type1: { label: null, value: null },
        type2: { label: null, value: null },
      },
      baseStats: {
        hp: { label: null, value: null },
        atk: { label: null, value: null },
        def: { label: null, value: null },
        spa: { label: null, value: null },
        spd: { label: null, value: null },
        spe: { label: null, value: null },
      },
      eggGroups: {
        eggGroup1: { label: null, value: null },
        eggGroup2: { label: null, value: null },
      },
    });
  }

  useEffect(() => {
    const updatedPokemons = POKEMON_LIST_MODE_MAP[globalState.mode];
    setPokemons(updatedPokemons);
  }, [globalState.mode]);

  return (
    <>
      <Container sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        <Box
          display="grid"
          sx={{
            gridTemplate: `"a b"
                           "c c"
                           "d d"`
          }}
        >
          <Typography variant="h2" component="h1" gridArea="a">
            Pokémon
          </Typography>
          <PokemonInfoButton />

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
              gridArea: "c"
            }}
          >
            <PokemonSearchInput
              allPokemons={allPokemons}
              setPokemons={setPokemons}
              searchTable={searchTable}
              handleFilterChange={handleChange}
            />
            <ModeSwitch />
            <Button
              variant='outlined'
              onClick={() => setFilterDrawerOpen(true)}
              sx={{ marginLeft: { xs: "unset", sm: "0.25rem" }}}
              gridArea={"b"}
            >
              Filters
            </Button>
            
          </Box>

          <Box
            flex="1 1 auto"
            paddingY="12px"
            minHeight={{ xs: '60vh', sm: '60vh' }}
            gridArea="d"
          >
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
      <PokemonFilterDrawer
        filterOpen={filterOpen}
        setFilterDrawerOpen={setFilterDrawerOpen}
        clearAllFilters={clearAllFilters}
        searchTable={searchTable}
        handleChange={handleChange}
      />
    </>
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
                typeName={TYPE_COLOR_MAP[pokemon.types.type1].name}
                typeColor={TYPE_COLOR_MAP[pokemon.types.type1].color}
              />
            </Box>
            {pokemon.types.type1 !== pokemon.types.type2 && (
              <Box width="80px" marginLeft="8px">
                <PokemonMoveType
                  typeName={TYPE_COLOR_MAP[pokemon.types.type2].name}
                  typeColor={TYPE_COLOR_MAP[pokemon.types.type2].color}
                />
              </Box>
            )}
          </Box>
        </ListItemButton>
      </ListItem>
    </a>
  );
};
