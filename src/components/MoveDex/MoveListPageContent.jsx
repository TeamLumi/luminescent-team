import React, { useState } from 'react'
import { Box, Container, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { MoveIcon, PokemonMove, PokemonMoveType, TYPE_COLOR_MAP } from '../Pokedex2/PokemonMovesetList';
import MoveSearchInput from './MoveSearchInput';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import { normalizePokemonName } from '../../utils/dex/name';

const MoveListPageContent = ({ movesList }) => {
  const [moves, setMoves] = useState(movesList);

  return (
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
          <MoveSearchInput movesList={movesList} setMoves={setMoves} />
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
  );
};

const MoveListEntry = ({ move, style }) => {
  const { path } = usePluginData('luminescent-movedex-data-plugin');
  const movePath = normalizePokemonName(move.name);

  return (
    <a href={useBaseUrl(`${path}/${movePath}`)} style={{ ...style, textDecoration: 'none' }}>
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