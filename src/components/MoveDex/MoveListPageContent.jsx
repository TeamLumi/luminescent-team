import React, { useState } from 'react'
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

export const defaultSearchTable = {
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

const setNestedKey = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    // Handle array indices
    if (key.match(/^\d+$/)) {
      const index = parseInt(key, 10);
      if (!Array.isArray(current)) {
        throw new Error(`Expected an array at ${keys.slice(0, i).join(".")}`);
      }
      current = current[index];
    } else {
      if (!current[key]) current[key] = {}; // Ensure the path exists
      current = current[key];
    }
  }

  const lastKey = keys[keys.length - 1];

  // Handle array index for the last key
  if (lastKey.match(/^\d+$/)) {
    const index = parseInt(lastKey, 10);
    if (!Array.isArray(current)) {
      throw new Error(`Expected an array at ${keys.slice(0, -1).join(".")}`);
    }
    current[index] = value; // Update array element
  } else if (typeof value === "object" && !Array.isArray(value)) {
    // Replace the entire object at the last key
    current[lastKey] = value;
  } else {
    current[lastKey] = value; // Update specific property
  }
};

const MoveListPageContent = ({ movesList }) => {
  const [moves, setMoves] = useState(movesList);
  const [searchTable, setSearchTable] = useState({
    ...defaultSearchTable,
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
      ...defaultSearchTable,
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
              movesList={movesList}
              setMoves={setMoves}
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
                <FixedSizeList itemCount={moves.length} itemSize={60} height={height} width={width}>
                  {({ index, style }) => <MoveListEntry move={moves[index]} style={style} />}
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