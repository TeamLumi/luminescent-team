import React, { useEffect, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import {
  Box,
  Container,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Button,
  Typography,
} from '@mui/material';

import {
  MoveIcon,
  PokemonMoveType,
  TYPE_COLOR_MAP
} from '../Pokedex2/PokemonMovesetList';
import MoveSearchInput from './MoveSearchInput';
import ModeSwitch from '../common/ModeSwitch';
import { MoveFilterDrawer } from './MoveFilterDrawer';
import { setNestedKey } from '../common/FilterDrawerFunction';
import { useGlobalState } from '../common/GlobalState';
import { GAMEDATA2, GAMEDATA3, GAMEDATAV } from '../../../__gamedata';

export const defaultMoveSearchTable = {
  name: { label: "", value: "" },
  id: {label: "", value: ""},
  type: { label: null, value: null },
  damageType: { label: null, value: null },
  power: { label: null, value: null },
  accuracy: { label: null, value: null },
  statusEffects: {
    status: { label: null, value: null },
    minDuration: { label: null, value: null },
    maxDuration: { label: null, value: null },
    rate: { label: null, value: null },
    sickCont: { label: null, value: null },
  },
  statChanges: {
    rate: { label: null, value: null },
    stages: { label: null, value: null },
    statType: { label: null, value: null },
  },
  critRatio: { label: null, value: null },
  moveClass: { label: null, value: null },
  priority: { label: null, value: null },
  minHitCount: { label: null, value: null },
  maxHitCount: { label: null, value: null },
  flinchChance: { label: null, value: null },
  healDamage: { label: null, value: null },
  hpRecover: { label: null, value: null },
  target: { label: null, value: null },
  moveFlags: [
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
    { label: null, value: null },
  ],
};

const MoveListPageContent = ({ movesListV, movesList3, movesList2 }) => {
  const MOVE_LIST_MODE_MAP = {
    [GAMEDATAV]: movesListV,
    [GAMEDATA2]: movesList2,
    [GAMEDATA3]: movesList3,
  };

  const [globalState, updateMode] = useGlobalState();
  const [moves, setMoves] = useState(MOVE_LIST_MODE_MAP[globalState.mode]);
  const [filteredMoves, setFilteredMoves] = useState(moves);
  const [searchTable, setSearchTable] = useState({
    ...defaultMoveSearchTable,
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
      ...defaultMoveSearchTable,
      statChanges: { // For some reason, React isn't able to see this deep into an object to tell it to default back to a state
        rate: { label: null, value: null },
        stages: { label: null, value: null },
        statType: { label: null, value: null },
      },
      statusEffects: {
        status: { label: null, value: null },
        minDuration: { label: null, value: null },
        maxDuration: { label: null, value: null },
        rate: { label: null, value: null },
        sickCont: { label: null, value: null },
      },
      moveFlags: [
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
        { label: null, value: null },
      ]
    });
  }

  useEffect(() => {
    const updatedPokemons = MOVE_LIST_MODE_MAP[globalState.mode];
    setMoves(updatedPokemons);
  }, [globalState.mode]);

  return (
    <>
      <Container sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" flexDirection="column" flex="1 1 auto">
          <Typography variant="h2" component="h1">
            Moves
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
            <MoveSearchInput
              movesList={moves}
              setMoves={setFilteredMoves}
              searchTable={searchTable}
              handleChange={handleChange}
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

          <Box flex="1 1 auto" paddingY="12px" minHeight={{ xs: '60vh', sm: '60vh' }}>
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList itemCount={filteredMoves.length} itemSize={60} height={height} width={width}>
                  {({ index, style }) => <MoveListEntry move={filteredMoves[index]} style={style} />}
                </FixedSizeList>
              )}
            </AutoSizer>
          </Box>
        </Box>
      </Container>
      <MoveFilterDrawer
        filterOpen={filterOpen}
        setFilterDrawerOpen={setFilterDrawerOpen}
        clearAllFilters={clearAllFilters}
        searchTable={searchTable}
        handleChange={handleChange}
      />
    </>
  );
};

const MoveListEntry = ({ move, style }) => {
  const { path } = usePluginData('luminescent-movedex-data-plugin');

  return (
    <a href={useBaseUrl(`${path}/${move.movePath}`)} style={{ ...style, textDecoration: 'none' }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <MoveIcon moveIconType={'tm'} moveTypeId={move.type} />
          </ListItemIcon>
          <Box display="flex" flexDirection="row" marginX="8px">
            <Box width="80px">
              <PokemonMoveType
                typeName={TYPE_COLOR_MAP[move.type].name}
                typeColor={TYPE_COLOR_MAP[move.type].color}
              />
            </Box>
          </Box>
          <Typography>{move.name}</Typography>
        </ListItemButton>
      </ListItem>
    </a>
  );
};


export default MoveListPageContent;